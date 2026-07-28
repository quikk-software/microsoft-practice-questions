import type { ExamConfig, Option, Question, QuestionType } from "@/lib/types";

// Leere Frage-Gerüste für "Neue Frage" im Editor.

const LETTERS = "abcdefghij";

function emptyOptions(count: number): Option[] {
  return Array.from({ length: count }, (_, i) => ({ id: LETTERS[i] ?? `o${i + 1}`, text: "" }));
}

export const QUESTION_TYPES: QuestionType[] = [
  "single-choice",
  "multiple-choice",
  "yes-no",
  "ordering",
  "matching",
  "dropdown",
];

export function isQuestionType(value: string | undefined): value is QuestionType {
  return value != null && (QUESTION_TYPES as string[]).includes(value);
}

export function newQuestion(type: QuestionType, config: ExamConfig): Question {
  const base = {
    id: "",
    skillArea: config.skillAreas[0]?.id ?? "",
    topic: "",
    difficulty: "medium" as const,
    prompt: "",
    explanation: "",
    reference: "",
    source: { title: "", url: "", quote: "" },
    status: "draft" as const,
  };

  switch (type) {
    case "single-choice":
      return { ...base, type, options: emptyOptions(4), correct: "a" };
    case "multiple-choice":
      return { ...base, type, options: emptyOptions(4), correct: [] };
    case "yes-no":
      return {
        ...base,
        type,
        statements: [
          { id: "s1", text: "", correct: false },
          { id: "s2", text: "", correct: false },
          { id: "s3", text: "", correct: false },
        ],
      };
    case "ordering": {
      const items = Array.from({ length: 4 }, (_, i) => ({ id: `i${i + 1}`, text: "" }));
      return { ...base, type, items, correctOrder: items.map((i) => i.id) };
    }
    case "matching": {
      const left = Array.from({ length: 3 }, (_, i) => ({ id: `l${i + 1}`, text: "" }));
      const right = Array.from({ length: 3 }, (_, i) => ({ id: `r${i + 1}`, text: "" }));
      return {
        ...base,
        type,
        left,
        right,
        correct: Object.fromEntries(left.map((l, i) => [l.id, right[i].id])),
      };
    }
    case "dropdown":
      return {
        ...base,
        type,
        textParts: ["", "", ""],
        blanks: [
          { id: "b1", options: emptyOptions(3), correct: "a" },
          { id: "b2", options: emptyOptions(3), correct: "a" },
        ],
      };
  }
}
