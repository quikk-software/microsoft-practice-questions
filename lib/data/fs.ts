import "server-only";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { ExamConfig, Question } from "@/lib/types";
import type {
  AttemptSummary,
  ContentChunk,
  ContentUnit,
  DataRepository,
  ExamBundle,
  RetrievedChunk,
} from "./port";

// Datei-Treiber: liest/schreibt data/exams/<slug>/ wie bisher.
// Dient als Dev-Modus ohne Supabase, als Seed-Quelle und als Export-Format.
// Achtung: Schreiben funktioniert nur lokal (auf Vercel ist das FS read-only).

const DATA_DIR = path.join(process.cwd(), "data", "exams");
const ATTEMPTS_DIR = path.join(process.cwd(), "data", "attempts");

function questionsDir(slug: string) {
  return path.join(DATA_DIR, slug, "questions");
}

function readExam(slug: string): ExamBundle | null {
  const configPath = path.join(DATA_DIR, slug, "exam.json");
  if (!fs.existsSync(configPath)) return null;
  const config: ExamConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const questions: Question[] = [];
  const qDir = questionsDir(slug);
  if (fs.existsSync(qDir)) {
    for (const file of fs.readdirSync(qDir)) {
      if (!file.endsWith(".json")) continue;
      questions.push(
        ...JSON.parse(fs.readFileSync(path.join(qDir, file), "utf-8"))
      );
    }
  }
  return { config, questions };
}

/** Fragen, die über den Admin geändert werden, landen gesammelt in dieser Datei. */
const MANAGED_FILE = "_managed.json";

function readManaged(slug: string): Question[] {
  const p = path.join(questionsDir(slug), MANAGED_FILE);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf-8")) : [];
}

function writeManaged(slug: string, questions: Question[]) {
  fs.mkdirSync(questionsDir(slug), { recursive: true });
  fs.writeFileSync(
    path.join(questionsDir(slug), MANAGED_FILE),
    JSON.stringify(questions, null, 2)
  );
}

function filterBundle(
  bundle: ExamBundle | null,
  includeUnpublished: boolean
): ExamBundle | null {
  if (!bundle) return null;
  if (includeUnpublished) return bundle;
  if (bundle.config.published === false) return null;
  return {
    ...bundle,
    questions: bundle.questions.filter((q) => q.status !== "draft"),
  };
}

export class FsRepository implements DataRepository {
  async listExams(opts?: { includeUnpublished?: boolean }): Promise<ExamBundle[]> {
    if (!fs.existsSync(DATA_DIR)) return [];
    return fs
      .readdirSync(DATA_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => filterBundle(readExam(d.name), opts?.includeUnpublished ?? false))
      .filter((e): e is ExamBundle => e !== null);
  }

  async getExam(
    slug: string,
    opts?: { includeUnpublished?: boolean }
  ): Promise<ExamBundle | null> {
    return filterBundle(readExam(slug), opts?.includeUnpublished ?? false);
  }

  async getQuestion(
    examSlug: string,
    questionId: string
  ): Promise<Question | null> {
    const exam = readExam(examSlug);
    return exam?.questions.find((q) => q.id === questionId) ?? null;
  }

  async upsertExam(config: ExamConfig): Promise<void> {
    const dir = path.join(DATA_DIR, config.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "exam.json"),
      JSON.stringify(config, null, 2)
    );
  }

  async deleteExam(slug: string): Promise<void> {
    fs.rmSync(path.join(DATA_DIR, slug), { recursive: true, force: true });
  }

  async upsertQuestion(examSlug: string, question: Question): Promise<void> {
    // Falls die Frage aus einer Generierungs-Datei stammt, dort ersetzen; sonst in _managed.json
    const qDir = questionsDir(examSlug);
    if (fs.existsSync(qDir)) {
      for (const file of fs.readdirSync(qDir)) {
        if (!file.endsWith(".json")) continue;
        const p = path.join(qDir, file);
        const batch: Question[] = JSON.parse(fs.readFileSync(p, "utf-8"));
        const idx = batch.findIndex((q) => q.id === question.id);
        if (idx >= 0) {
          batch[idx] = question;
          fs.writeFileSync(p, JSON.stringify(batch, null, 2));
          return;
        }
      }
    }
    const managed = readManaged(examSlug);
    managed.push(question);
    writeManaged(examSlug, managed);
  }

  async deleteQuestion(examSlug: string, questionId: string): Promise<void> {
    const qDir = questionsDir(examSlug);
    if (!fs.existsSync(qDir)) return;
    for (const file of fs.readdirSync(qDir)) {
      if (!file.endsWith(".json")) continue;
      const p = path.join(qDir, file);
      const batch: Question[] = JSON.parse(fs.readFileSync(p, "utf-8"));
      const next = batch.filter((q) => q.id !== questionId);
      if (next.length !== batch.length) {
        fs.writeFileSync(p, JSON.stringify(next, null, 2));
        return;
      }
    }
  }

  async listContentUnits(examSlug: string): Promise<ContentUnit[]> {
    const indexPath = path.join(DATA_DIR, examSlug, "content", "index.json");
    if (!fs.existsSync(indexPath)) return [];
    const index = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as {
      uid: string;
      title: string;
      url: string;
      module: string;
      moduleTitle: string;
      file: string;
    }[];
    return index.map((u, i) => {
      const raw = fs.readFileSync(
        path.join(DATA_DIR, examSlug, u.file),
        "utf-8"
      );
      const body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
      return {
        uid: u.uid,
        examSlug,
        moduleSlug: u.module,
        moduleTitle: u.moduleTitle,
        title: u.title,
        url: u.url,
        position: i + 1,
        markdown: body,
      };
    });
  }

  async replaceContentUnits(): Promise<void> {
    // Ingest schreibt beim Fs-Treiber direkt über scripts/ingest.mjs — hier nichts zu tun.
    throw new Error(
      "FsRepository: Content-Ingest bitte über `npm run ingest` ausführen"
    );
  }

  // ---- RAG: embeddings.json als Datei-Backend ----
  // Format kompatibel zu scripts/embed.mjs: Einträge tragen Unit-Metadaten inline.

  private embeddingsPath(examSlug: string) {
    return path.join(DATA_DIR, examSlug, "embeddings.json");
  }

  private readEmbeddings(examSlug: string): (ContentChunk & {
    title: string;
    url: string;
    moduleTitle: string;
  })[] {
    const p = this.embeddingsPath(examSlug);
    if (!fs.existsSync(p)) return [];
    const raw = JSON.parse(fs.readFileSync(p, "utf-8")) as {
      id: string;
      title: string;
      heading: string | null;
      url: string;
      moduleTitle: string;
      text: string;
      embedding: number[];
    }[];
    return raw.map((e) => ({
      id: e.id,
      examSlug,
      unitUid: e.id.split("#")[0],
      heading: e.heading,
      text: e.text,
      embedding: e.embedding,
      title: e.title,
      url: e.url,
      moduleTitle: e.moduleTitle,
    }));
  }

  async replaceContentChunks(
    examSlug: string,
    chunks: ContentChunk[]
  ): Promise<void> {
    // Unit-Metadaten anreichern, damit die Datei selbsterklärend bleibt
    const units = await this.listContentUnits(examSlug);
    const byUid = new Map(units.map((u) => [u.uid, u]));
    const out = chunks.map((c) => {
      const unit = byUid.get(c.unitUid);
      return {
        id: c.id,
        title: unit?.title ?? c.unitUid,
        heading: c.heading,
        url: unit?.url ?? "",
        module: unit?.moduleSlug ?? "",
        moduleTitle: unit?.moduleTitle ?? "",
        text: c.text,
        embedding: c.embedding,
      };
    });
    fs.writeFileSync(this.embeddingsPath(examSlug), JSON.stringify(out));
  }

  async searchContentChunks(
    examSlug: string,
    queryEmbedding: number[],
    k: number
  ): Promise<RetrievedChunk[]> {
    const chunks = this.readEmbeddings(examSlug);
    if (chunks.length === 0) return [];
    const cosine = (a: number[], b: number[]) => {
      let dot = 0,
        na = 0,
        nb = 0;
      for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
      }
      return dot / (Math.sqrt(na) * Math.sqrt(nb));
    };
    return chunks
      .map((c) => ({
        id: c.id,
        unitUid: c.unitUid,
        heading: c.heading,
        text: c.text,
        title: c.title,
        url: c.url,
        moduleTitle: c.moduleTitle,
        similarity: cosine(queryEmbedding, c.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, k);
  }

  async hasContentChunks(examSlug: string): Promise<boolean> {
    return fs.existsSync(this.embeddingsPath(examSlug));
  }

  async saveAttempt(
    attempt: Omit<AttemptSummary, "id" | "createdAt">
  ): Promise<AttemptSummary> {
    fs.mkdirSync(ATTEMPTS_DIR, { recursive: true });
    const full: AttemptSummary = {
      ...attempt,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    fs.writeFileSync(
      path.join(ATTEMPTS_DIR, `${full.id}.json`),
      JSON.stringify(full, null, 2)
    );
    return full;
  }

  async listAttempts(userId: string): Promise<AttemptSummary[]> {
    if (!fs.existsSync(ATTEMPTS_DIR)) return [];
    return fs
      .readdirSync(ATTEMPTS_DIR)
      .filter((f) => f.endsWith(".json"))
      .map(
        (f) =>
          JSON.parse(
            fs.readFileSync(path.join(ATTEMPTS_DIR, f), "utf-8")
          ) as AttemptSummary
      )
      .filter((a) => a.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}
