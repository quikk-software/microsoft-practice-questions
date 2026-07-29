// Zentrale Typen für Exams, Fragen-Pool und Antworten.
// Neue Fragetypen hier ergänzen und in engine.ts + den Frage-Komponenten behandeln.

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "yes-no"
  | "ordering"
  | "matching"
  | "dropdown";

export interface Option {
  id: string;
  text: string;
}

export interface SkillArea {
  id: string;
  name: string;
  /** Anteil am Examen, z.B. 0.35 für 35 % */
  weight: number;
}

/** Redaktionelle Inhalte für die öffentliche Examen-Seite (SEO) */
export interface ExamSeo {
  /** Eigener Einleitungstext (2–4 Absätze, kein fremder Content) */
  intro?: string[];
  /** FAQ-Einträge; werden zusätzlich als FAQPage-JSON-LD ausgegeben */
  faq?: { question: string; answer: string }[];
}

export interface ExamConfig {
  slug: string;
  /** Unveröffentlichte Examen sind nur im Admin sichtbar; fehlend = veröffentlicht */
  published?: boolean;
  seo?: ExamSeo;
  code: string;
  title: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
  passScore: number;
  maxScore: number;
  skillAreas: SkillArea[];
  /** Zielverteilung der Schwierigkeiten im gezogenen Examen */
  difficultyCurve: Record<Difficulty, number>;
}

interface QuestionBase {
  id: string;
  type: QuestionType;
  skillArea: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  /** Statische Kurz-Erklärung; die AI-Erklärung baut darauf auf */
  explanation: string;
  reference?: string;
  /** Lerninhalt-Unit, aus der die Frage abgeleitet wurde; quote = wörtlicher Beleg-Ausschnitt */
  source?: { title: string; url: string; quote?: string };
  /** Entwurfs-Status (Admin); fehlend = published */
  status?: "draft" | "published";
  /** Als öffentliche Beispielfrage auf der Examen-Seite zeigen (SEO) */
  sample?: boolean;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single-choice";
  options: Option[];
  correct: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: Option[];
  correct: string[];
}

export interface YesNoQuestion extends QuestionBase {
  type: "yes-no";
  statements: { id: string; text: string; correct: boolean }[];
}

export interface OrderingQuestion extends QuestionBase {
  type: "ordering";
  items: Option[];
  correctOrder: string[];
}

export interface MatchingQuestion extends QuestionBase {
  type: "matching";
  left: Option[];
  right: Option[];
  /** leftId -> rightId */
  correct: Record<string, string>;
}

export interface DropdownQuestion extends QuestionBase {
  type: "dropdown";
  /** Satzteile; zwischen je zwei Teilen sitzt eine Lücke (blanks[i]) */
  textParts: string[];
  blanks: { id: string; options: Option[]; correct: string }[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | YesNoQuestion
  | OrderingQuestion
  | MatchingQuestion
  | DropdownQuestion;

// ---- Client-Varianten (ohne Lösungen) ----

export type PublicQuestion =
  | (Omit<SingleChoiceQuestion, "correct" | "explanation">)
  | (Omit<MultipleChoiceQuestion, "correct" | "explanation"> & {
      /** Wie viele Antworten auszuwählen sind */
      selectCount: number;
    })
  | (Omit<YesNoQuestion, "statements" | "explanation"> & {
      statements: Option[];
    })
  | (Omit<OrderingQuestion, "correctOrder" | "explanation">)
  | (Omit<MatchingQuestion, "correct" | "explanation">)
  | (Omit<DropdownQuestion, "blanks" | "explanation"> & {
      blanks: { id: string; options: Option[] }[];
    });

/** Antwortformat je Fragetyp */
export type Answer =
  | string // single-choice: optionId
  | string[] // multiple-choice: optionIds; ordering: itemIds in Reihenfolge
  | Record<string, boolean> // yes-no: statementId -> ja/nein
  | Record<string, string>; // matching: leftId -> rightId; dropdown: blankId -> optionId

export interface QuestionResult {
  questionId: string;
  /** 0..1, Teilpunkte möglich */
  score: number;
  correct: boolean;
  question: Question;
  answer: Answer | null;
}

export interface ExamResult {
  scaledScore: number;
  maxScore: number;
  passScore: number;
  passed: boolean;
  perSkillArea: {
    id: string;
    name: string;
    score: number;
    total: number;
  }[];
  results: QuestionResult[];
}
