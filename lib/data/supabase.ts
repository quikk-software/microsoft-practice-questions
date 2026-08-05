import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamConfig, Question } from "@/lib/types";
import type {
  AiSettingsRecord,
  AttemptSummary,
  ContentChunk,
  ContentUnit,
  DataRepository,
  ExamBundle,
  ExamSessionRecord,
  LearnProgressEntry,
  ReadOptions,
  RetrievedChunk,
} from "./port";
import { createServiceClient } from "@/lib/supabase/server";

// Supabase-Treiber für den Daten-Port (DATA_DRIVER=supabase).
// Schema: supabase/migrations/0001_init.sql
// Nutzt den Service-Role-Client — Zugriffskontrolle passiert serverseitig in
// den Routen (RLS ist zweite Verteidigungslinie für direkte API-Zugriffe).

interface ExamRow {
  slug: string;
  published: boolean;
  config: ExamConfig;
}

interface QuestionRow {
  id: string;
  exam_slug: string;
  data: Question;
}

interface ContentUnitRow {
  uid: string;
  exam_slug: string;
  module_slug: string;
  module_title: string;
  title: string;
  url: string;
  position: number;
  markdown: string;
}

interface AttemptRow {
  id: string;
  user_id: string;
  exam_slug: string;
  scaled_score: number;
  max_score: number;
  pass_score: number;
  passed: boolean;
  per_skill_area: AttemptSummary["perSkillArea"];
  created_at: string;
}

function fail(context: string, error: { message: string }): never {
  throw new Error(`Supabase (${context}): ${error.message}`);
}

/** published-Spalte in die Config spiegeln, damit die App eine Quelle hat. */
function toConfig(row: ExamRow): ExamConfig {
  return { ...row.config, published: row.published };
}

function toAttempt(row: AttemptRow): AttemptSummary {
  return {
    id: row.id,
    userId: row.user_id,
    examSlug: row.exam_slug,
    scaledScore: row.scaled_score,
    maxScore: row.max_score,
    passScore: row.pass_score,
    passed: row.passed,
    perSkillArea: row.per_skill_area,
    createdAt: row.created_at,
  };
}

export class SupabaseRepository implements DataRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createServiceClient();
  }

  private questionsQuery(includeUnpublished: boolean) {
    const query = this.supabase.from("questions").select("id, exam_slug, data");
    return includeUnpublished ? query : query.eq("status", "published");
  }

  async listExams(opts?: ReadOptions): Promise<ExamBundle[]> {
    const includeUnpublished = opts?.includeUnpublished ?? false;

    let examsQuery = this.supabase.from("exams").select("slug, published, config");
    if (!includeUnpublished) examsQuery = examsQuery.eq("published", true);
    const { data: examRows, error: examsError } = await examsQuery.order("slug");
    if (examsError) fail("listExams/exams", examsError);

    const exams = (examRows ?? []) as ExamRow[];
    if (exams.length === 0) return [];

    const { data: questionRows, error: questionsError } = await this.questionsQuery(
      includeUnpublished
    ).in(
      "exam_slug",
      exams.map((e) => e.slug)
    );
    if (questionsError) fail("listExams/questions", questionsError);

    const bySlug = new Map<string, Question[]>(exams.map((e) => [e.slug, []]));
    for (const row of (questionRows ?? []) as QuestionRow[]) {
      bySlug.get(row.exam_slug)?.push(row.data);
    }

    return exams.map((row) => ({
      config: toConfig(row),
      questions: bySlug.get(row.slug) ?? [],
    }));
  }

  async getExam(slug: string, opts?: ReadOptions): Promise<ExamBundle | null> {
    const includeUnpublished = opts?.includeUnpublished ?? false;

    let examQuery = this.supabase
      .from("exams")
      .select("slug, published, config")
      .eq("slug", slug);
    if (!includeUnpublished) examQuery = examQuery.eq("published", true);
    const { data: examRow, error: examError } = await examQuery.maybeSingle();
    if (examError) fail("getExam/exam", examError);
    if (!examRow) return null;

    const { data: questionRows, error: questionsError } = await this.questionsQuery(
      includeUnpublished
    ).eq("exam_slug", slug);
    if (questionsError) fail("getExam/questions", questionsError);

    return {
      config: toConfig(examRow as ExamRow),
      questions: ((questionRows ?? []) as QuestionRow[]).map((r) => r.data),
    };
  }

  async getQuestion(examSlug: string, questionId: string): Promise<Question | null> {
    const { data, error } = await this.supabase
      .from("questions")
      .select("data")
      .eq("exam_slug", examSlug)
      .eq("id", questionId)
      .maybeSingle();
    if (error) fail("getQuestion", error);
    return data ? (data as Pick<QuestionRow, "data">).data : null;
  }

  async upsertExam(config: ExamConfig): Promise<void> {
    const { error } = await this.supabase.from("exams").upsert(
      {
        slug: config.slug,
        published: config.published ?? true,
        config,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) fail("upsertExam", error);
  }

  async deleteExam(slug: string): Promise<void> {
    const { error } = await this.supabase.from("exams").delete().eq("slug", slug);
    if (error) fail("deleteExam", error);
  }

  async upsertQuestion(examSlug: string, question: Question): Promise<void> {
    const { error } = await this.supabase.from("questions").upsert(
      {
        id: question.id,
        exam_slug: examSlug,
        type: question.type,
        skill_area: question.skillArea,
        difficulty: question.difficulty,
        topic: question.topic,
        status: question.status ?? "published",
        data: question,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (error) fail("upsertQuestion", error);
  }

  async deleteQuestion(examSlug: string, questionId: string): Promise<void> {
    const { error } = await this.supabase
      .from("questions")
      .delete()
      .eq("exam_slug", examSlug)
      .eq("id", questionId);
    if (error) fail("deleteQuestion", error);
  }

  async listContentUnits(examSlug: string): Promise<ContentUnit[]> {
    const { data, error } = await this.supabase
      .from("content_units")
      .select("uid, exam_slug, module_slug, module_title, title, url, position, markdown")
      .eq("exam_slug", examSlug)
      .order("position");
    if (error) fail("listContentUnits", error);
    return ((data ?? []) as ContentUnitRow[]).map((row) => ({
      uid: row.uid,
      examSlug: row.exam_slug,
      moduleSlug: row.module_slug,
      moduleTitle: row.module_title,
      title: row.title,
      url: row.url,
      position: row.position,
      markdown: row.markdown,
    }));
  }

  async replaceContentUnits(examSlug: string, units: ContentUnit[]): Promise<void> {
    // Replace = alles zum Examen löschen (cascaded auf content_chunks) + neu einfügen.
    const { error: deleteError } = await this.supabase
      .from("content_units")
      .delete()
      .eq("exam_slug", examSlug);
    if (deleteError) fail("replaceContentUnits/delete", deleteError);

    if (units.length === 0) return;
    const { error: insertError } = await this.supabase.from("content_units").insert(
      units.map((u) => ({
        uid: u.uid,
        exam_slug: examSlug,
        module_slug: u.moduleSlug,
        module_title: u.moduleTitle,
        title: u.title,
        url: u.url,
        position: u.position,
        markdown: u.markdown,
        ingested_at: new Date().toISOString(),
      }))
    );
    if (insertError) fail("replaceContentUnits/insert", insertError);
  }

  // ---- Laufende Prüfungs-Sessions (exam_sessions) ----

  async getExamSession(
    userId: string,
    examSlug: string
  ): Promise<ExamSessionRecord | null> {
    const { data, error } = await this.supabase
      .from("exam_sessions")
      .select("question_ids, answers, checked_ids, current_index, updated_at")
      .eq("user_id", userId)
      .eq("exam_slug", examSlug)
      .maybeSingle();
    if (error) fail("getExamSession", error);
    if (!data) return null;
    const row = data as {
      question_ids: string[];
      answers: ExamSessionRecord["answers"];
      checked_ids: string[];
      current_index: number;
      updated_at: string;
    };
    return {
      userId,
      examSlug,
      questionIds: row.question_ids,
      answers: row.answers ?? {},
      checkedIds: row.checked_ids ?? [],
      currentIndex: row.current_index ?? 0,
      updatedAt: row.updated_at,
    };
  }

  async saveExamSession(record: ExamSessionRecord): Promise<void> {
    const { error } = await this.supabase.from("exam_sessions").upsert(
      {
        user_id: record.userId,
        exam_slug: record.examSlug,
        question_ids: record.questionIds,
        answers: record.answers,
        checked_ids: record.checkedIds,
        current_index: record.currentIndex,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,exam_slug" }
    );
    if (error) fail("saveExamSession", error);
  }

  async deleteExamSession(userId: string, examSlug: string): Promise<void> {
    const { error } = await this.supabase
      .from("exam_sessions")
      .delete()
      .eq("user_id", userId)
      .eq("exam_slug", examSlug);
    if (error) fail("deleteExamSession", error);
  }

  // ---- Lern-Fortschritt (learn_progress) ----

  async getLearnProgress(
    userId: string,
    examSlugs?: string[]
  ): Promise<LearnProgressEntry[]> {
    let query = this.supabase
      .from("learn_progress")
      .select(
        "exam_slug, question_id, last_score, times_seen, times_correct, last_answered_at"
      )
      .eq("user_id", userId);
    if (examSlugs?.length) query = query.in("exam_slug", examSlugs);
    const { data, error } = await query;
    if (error) fail("getLearnProgress", error);
    return (
      (data ?? []) as {
        exam_slug: string;
        question_id: string;
        last_score: number;
        times_seen: number;
        times_correct: number;
        last_answered_at: string;
      }[]
    ).map((r) => ({
      examSlug: r.exam_slug,
      questionId: r.question_id,
      lastScore: Number(r.last_score),
      timesSeen: r.times_seen,
      timesCorrect: r.times_correct,
      lastAnsweredAt: r.last_answered_at,
    }));
  }

  async recordLearnAnswers(
    userId: string,
    entries: { examSlug: string; questionId: string; score: number }[]
  ): Promise<void> {
    if (entries.length === 0) return;

    // Bestehende Zähler laden, um timesSeen/timesCorrect zu addieren
    const ids = entries.map((e) => e.questionId);
    const { data: existingRows, error: readError } = await this.supabase
      .from("learn_progress")
      .select("question_id, times_seen, times_correct")
      .eq("user_id", userId)
      .in("question_id", ids);
    if (readError) fail("recordLearnAnswers/read", readError);

    const existing = new Map(
      ((existingRows ?? []) as {
        question_id: string;
        times_seen: number;
        times_correct: number;
      }[]).map((r) => [r.question_id, r])
    );

    const now = new Date().toISOString();
    const rows = entries.map((e) => {
      const prev = existing.get(e.questionId);
      return {
        user_id: userId,
        exam_slug: e.examSlug,
        question_id: e.questionId,
        last_score: e.score,
        times_seen: (prev?.times_seen ?? 0) + 1,
        times_correct: (prev?.times_correct ?? 0) + (e.score === 1 ? 1 : 0),
        last_answered_at: now,
      };
    });

    const { error } = await this.supabase
      .from("learn_progress")
      .upsert(rows, { onConflict: "user_id,question_id" });
    if (error) fail("recordLearnAnswers/upsert", error);
  }

  async resetLearnProgress(
    userId: string,
    examSlugs?: string[]
  ): Promise<void> {
    let query = this.supabase
      .from("learn_progress")
      .delete()
      .eq("user_id", userId);
    if (examSlugs?.length) query = query.in("exam_slug", examSlugs);
    const { error } = await query;
    if (error) fail("resetLearnProgress", error);
  }

  // ---- BYOK: ai_settings ----

  async getAiSettings(userId: string): Promise<AiSettingsRecord | null> {
    const { data, error } = await this.supabase
      .from("ai_settings")
      .select("provider, model, api_key_encrypted, api_key_hint")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) fail("getAiSettings", error);
    if (!data) return null;
    const row = data as {
      provider: string;
      model: string;
      api_key_encrypted: string;
      api_key_hint: string;
    };
    return {
      provider: row.provider,
      model: row.model,
      apiKeyEncrypted: row.api_key_encrypted,
      apiKeyHint: row.api_key_hint,
    };
  }

  async saveAiSettings(userId: string, record: AiSettingsRecord): Promise<void> {
    const { error } = await this.supabase.from("ai_settings").upsert(
      {
        user_id: userId,
        provider: record.provider,
        model: record.model,
        api_key_encrypted: record.apiKeyEncrypted,
        api_key_hint: record.apiKeyHint,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    if (error) fail("saveAiSettings", error);
  }

  async deleteAiSettings(userId: string): Promise<void> {
    const { error } = await this.supabase
      .from("ai_settings")
      .delete()
      .eq("user_id", userId);
    if (error) fail("deleteAiSettings", error);
  }

  // ---- RAG: content_chunks (pgvector) ----

  async replaceContentChunks(
    examSlug: string,
    chunks: ContentChunk[]
  ): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from("content_chunks")
      .delete()
      .eq("exam_slug", examSlug);
    if (deleteError) fail("replaceContentChunks/delete", deleteError);

    const BATCH = 100;
    for (let i = 0; i < chunks.length; i += BATCH) {
      const { error } = await this.supabase.from("content_chunks").insert(
        chunks.slice(i, i + BATCH).map((c) => ({
          id: c.id,
          exam_slug: examSlug,
          unit_uid: c.unitUid,
          heading: c.heading,
          text: c.text,
          embedding: c.embedding,
        }))
      );
      if (error) fail("replaceContentChunks/insert", error);
    }
  }

  async searchContentChunks(
    examSlug: string,
    queryEmbedding: number[],
    k: number
  ): Promise<RetrievedChunk[]> {
    const { data, error } = await this.supabase.rpc("match_content_chunks", {
      p_exam_slug: examSlug,
      p_query: queryEmbedding,
      p_count: k,
    });
    if (error) fail("searchContentChunks", error);
    const rows = (data ?? []) as {
      id: string;
      unit_uid: string;
      heading: string | null;
      text: string;
      similarity: number;
    }[];
    if (rows.length === 0) return [];

    // Unit-Metadaten (Titel/URL/Modul) dazuladen
    const uids = [...new Set(rows.map((r) => r.unit_uid))];
    const { data: unitRows, error: unitsError } = await this.supabase
      .from("content_units")
      .select("uid, title, url, module_title")
      .in("uid", uids);
    if (unitsError) fail("searchContentChunks/units", unitsError);
    const units = new Map(
      ((unitRows ?? []) as {
        uid: string;
        title: string;
        url: string;
        module_title: string;
      }[]).map((u) => [u.uid, u])
    );

    return rows.map((r) => ({
      id: r.id,
      unitUid: r.unit_uid,
      heading: r.heading,
      text: r.text,
      title: units.get(r.unit_uid)?.title ?? r.unit_uid,
      url: units.get(r.unit_uid)?.url ?? "",
      moduleTitle: units.get(r.unit_uid)?.module_title ?? "",
      similarity: r.similarity,
    }));
  }

  async hasContentChunks(examSlug: string): Promise<boolean> {
    const { count, error } = await this.supabase
      .from("content_chunks")
      .select("id", { count: "exact", head: true })
      .eq("exam_slug", examSlug);
    if (error) fail("hasContentChunks", error);
    return (count ?? 0) > 0;
  }

  async saveAttempt(
    attempt: Omit<AttemptSummary, "id" | "createdAt">
  ): Promise<AttemptSummary> {
    const { data, error } = await this.supabase
      .from("attempts")
      .insert({
        user_id: attempt.userId,
        exam_slug: attempt.examSlug,
        scaled_score: attempt.scaledScore,
        max_score: attempt.maxScore,
        pass_score: attempt.passScore,
        passed: attempt.passed,
        per_skill_area: attempt.perSkillArea,
      })
      .select()
      .single();
    if (error) fail("saveAttempt", error);
    return toAttempt(data as AttemptRow);
  }

  async listAttempts(userId: string): Promise<AttemptSummary[]> {
    const { data, error } = await this.supabase
      .from("attempts")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) fail("listAttempts", error);
    return ((data ?? []) as AttemptRow[]).map(toAttempt);
  }
}
