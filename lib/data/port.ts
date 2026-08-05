import type { ExamConfig, Question } from "@/lib/types";

// Daten-Port: Die App spricht ausschließlich gegen dieses Interface.
// Treiber-Auswahl über ENV DATA_DRIVER=fs|supabase (siehe lib/data/index.ts).
// Ein späterer Wechsel (z. B. Microsoft Dataverse) = neue Implementierung dieses Interfaces.

export interface ExamBundle {
  config: ExamConfig;
  questions: Question[];
}

export interface ContentUnit {
  uid: string;
  examSlug: string;
  moduleSlug: string;
  moduleTitle: string;
  title: string;
  url: string;
  /** Reihenfolge innerhalb des Moduls (1-basiert) */
  position: number;
  markdown: string;
}

export interface ContentChunk {
  id: string;
  examSlug: string;
  unitUid: string;
  heading: string | null;
  text: string;
  embedding: number[];
}

/** Treffer aus der semantischen Suche, angereichert mit Unit-Metadaten */
export interface RetrievedChunk {
  id: string;
  unitUid: string;
  heading: string | null;
  text: string;
  title: string;
  url: string;
  moduleTitle: string;
  similarity: number;
}

import type { Answer } from "@/lib/types";

/** Laufende Prüfung eines Users (Resume nach Reload); eine pro User+Exam */
export interface ExamSessionRecord {
  userId: string;
  examSlug: string;
  questionIds: string[];
  answers: Record<string, Answer | null>;
  checkedIds: string[];
  currentIndex: number;
  updatedAt: string;
}

/** Lern-Fortschritt zu genau einer Frage (Lern-Modus, nur mit Login) */
export interface LearnProgressEntry {
  examSlug: string;
  questionId: string;
  lastScore: number;
  timesSeen: number;
  timesCorrect: number;
  lastAnsweredAt: string;
}

/** BYOK: AI-Einstellungen eines Users; der Key liegt nur verschlüsselt vor */
export interface AiSettingsRecord {
  provider: string;
  model: string;
  apiKeyEncrypted: string;
  apiKeyHint: string;
}

export interface AttemptSummary {
  id: string;
  userId: string;
  examSlug: string;
  scaledScore: number;
  maxScore: number;
  passScore: number;
  passed: boolean;
  perSkillArea: { id: string; name: string; score: number; total: number }[];
  createdAt: string;
}

export interface ReadOptions {
  /** true = auch Drafts/unveröffentlichte Examen liefern (Admin-Ansicht) */
  includeUnpublished?: boolean;
}

export interface DataRepository {
  // Lesen (Practice-App liefert nur Veröffentlichtes; Admin setzt includeUnpublished)
  listExams(opts?: ReadOptions): Promise<ExamBundle[]>;
  getExam(slug: string, opts?: ReadOptions): Promise<ExamBundle | null>;
  getQuestion(examSlug: string, questionId: string): Promise<Question | null>;

  // Pflege (Admin)
  upsertExam(config: ExamConfig): Promise<void>;
  deleteExam(slug: string): Promise<void>;
  upsertQuestion(examSlug: string, question: Question): Promise<void>;
  deleteQuestion(examSlug: string, questionId: string): Promise<void>;

  // Lerninhalte (Ingest)
  listContentUnits(examSlug: string): Promise<ContentUnit[]>;
  replaceContentUnits(examSlug: string, units: ContentUnit[]): Promise<void>;

  // RAG (Embeddings der Lerninhalt-Chunks)
  replaceContentChunks(examSlug: string, chunks: ContentChunk[]): Promise<void>;
  /** Cosine-Suche über die Chunks; [] wenn keine Embeddings vorhanden sind */
  searchContentChunks(
    examSlug: string,
    queryEmbedding: number[],
    k: number
  ): Promise<RetrievedChunk[]>;
  hasContentChunks(examSlug: string): Promise<boolean>;

  // Laufende Prüfungs-Session (Resume; nur mit Login)
  getExamSession(
    userId: string,
    examSlug: string
  ): Promise<ExamSessionRecord | null>;
  saveExamSession(record: ExamSessionRecord): Promise<void>;
  deleteExamSession(userId: string, examSlug: string): Promise<void>;

  // Lern-Fortschritt (Lern-Modus; nur mit Login)
  getLearnProgress(
    userId: string,
    examSlugs?: string[]
  ): Promise<LearnProgressEntry[]>;
  /** Batch-Upsert: addiert timesSeen/timesCorrect auf vorhandene Einträge */
  recordLearnAnswers(
    userId: string,
    entries: { examSlug: string; questionId: string; score: number }[]
  ): Promise<void>;
  resetLearnProgress(userId: string, examSlugs?: string[]): Promise<void>;

  // BYOK: AI-Einstellungen pro User
  getAiSettings(userId: string): Promise<AiSettingsRecord | null>;
  saveAiSettings(userId: string, record: AiSettingsRecord): Promise<void>;
  deleteAiSettings(userId: string): Promise<void>;

  // Prüfungs-Verlauf (nur mit Login; Fs-Treiber speichert lokal)
  saveAttempt(
    attempt: Omit<AttemptSummary, "id" | "createdAt">
  ): Promise<AttemptSummary>;
  listAttempts(userId: string): Promise<AttemptSummary[]>;
}
