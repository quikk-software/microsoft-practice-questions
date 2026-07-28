// Zod-Schemas für ExamConfig und alle 6 Fragetypen.
// Regeln übernommen aus scripts/validate.mjs — genutzt von Admin-API (Server)
// und Admin-Formularen (Client). Bewusst KEIN "server-only"-Import.

import { z } from "zod";
import type { ExamConfig, Question } from "@/lib/types";

export const ID_PATTERN = /^[a-z0-9-]+$/;

const idSchema = z
  .string()
  .min(1, "id fehlt")
  .regex(ID_PATTERN, "nur Kleinbuchstaben, Ziffern und Bindestriche erlaubt");

const optionSchema = z.object({
  id: z.string().min(1, "Option-id fehlt"),
  text: z.string().min(1, "Optionstext fehlt"),
});

/** Liefert die erste doppelte id in einer Liste, sonst null. */
function findDuplicateId(list: { id: string }[]): string | null {
  const seen = new Set<string>();
  for (const item of list) {
    if (seen.has(item.id)) return item.id;
    seen.add(item.id);
  }
  return null;
}

// ---- ExamConfig ----

const skillAreaSchema = z.object({
  id: idSchema,
  name: z.string().min(1, "Name fehlt"),
  weight: z
    .number({ message: "Gewicht muss eine Zahl sein" })
    .min(0, "Gewicht muss >= 0 sein")
    .max(1, "Gewicht muss <= 1 sein (Anteil, z. B. 0.35)"),
});

export const examConfigSchema = z
  .object({
    slug: idSchema,
    published: z.boolean().optional(),
    code: z.string().min(1, "Code fehlt"),
    title: z.string().min(1, "Titel fehlt"),
    description: z.string().min(1, "Beschreibung fehlt"),
    questionCount: z
      .number({ message: "questionCount muss eine Zahl sein" })
      .int("questionCount muss ganzzahlig sein")
      .positive("questionCount muss > 0 sein"),
    durationMinutes: z
      .number({ message: "durationMinutes muss eine Zahl sein" })
      .int("durationMinutes muss ganzzahlig sein")
      .positive("durationMinutes muss > 0 sein"),
    passScore: z
      .number({ message: "passScore muss eine Zahl sein" })
      .int("passScore muss ganzzahlig sein")
      .positive("passScore muss > 0 sein"),
    maxScore: z
      .number({ message: "maxScore muss eine Zahl sein" })
      .int("maxScore muss ganzzahlig sein")
      .positive("maxScore muss > 0 sein"),
    skillAreas: z.array(skillAreaSchema).min(1, "mindestens eine Skill-Area"),
    difficultyCurve: z.object({
      easy: z.number().min(0).max(1),
      medium: z.number().min(0).max(1),
      hard: z.number().min(0).max(1),
    }),
  })
  .superRefine((c, ctx) => {
    if (c.passScore > c.maxScore) {
      ctx.addIssue({
        code: "custom",
        path: ["passScore"],
        message: "passScore darf maxScore nicht überschreiten",
      });
    }
    const dup = findDuplicateId(c.skillAreas);
    if (dup) {
      ctx.addIssue({
        code: "custom",
        path: ["skillAreas"],
        message: `doppelte Skill-Area-id "${dup}"`,
      });
    }
  });

// ---- Fragen ----

const sourceSchema = z.object({
  title: z.string().min(1, "source.title fehlt"),
  url: z.url("source.url muss eine gültige URL sein"),
  // optional, aber empfohlen (wörtlicher Beleg-Ausschnitt aus dem Lerninhalt)
  quote: z.string().optional(),
});

const questionBase = {
  id: idSchema,
  skillArea: z.string().min(1, "skillArea fehlt"),
  topic: z.string().min(1, "topic fehlt"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  prompt: z.string().min(1, "prompt fehlt"),
  explanation: z.string().min(1, "explanation fehlt"),
  reference: z.string().optional(),
  source: sourceSchema,
  status: z.enum(["draft", "published"]).optional(),
};

const singleChoiceSchema = z
  .object({
    ...questionBase,
    type: z.literal("single-choice"),
    options: z.array(optionSchema).min(3, "zu wenige options (mindestens 3)"),
    correct: z.string().min(1, "correct fehlt"),
  })
  .superRefine((q, ctx) => {
    const dup = findDuplicateId(q.options);
    if (dup)
      ctx.addIssue({ code: "custom", path: ["options"], message: `doppelte Option-id "${dup}"` });
    if (!q.options.some((o) => o.id === q.correct))
      ctx.addIssue({ code: "custom", path: ["correct"], message: "correct zeigt auf keine option" });
  });

const multipleChoiceSchema = z
  .object({
    ...questionBase,
    type: z.literal("multiple-choice"),
    options: z.array(optionSchema).min(3, "zu wenige options (mindestens 3)"),
    correct: z.array(z.string()).min(2, "correct braucht mindestens 2 ids"),
  })
  .superRefine((q, ctx) => {
    const dup = findDuplicateId(q.options);
    if (dup)
      ctx.addIssue({ code: "custom", path: ["options"], message: `doppelte Option-id "${dup}"` });
    const ids = new Set(q.options.map((o) => o.id));
    if (!q.correct.every((c) => ids.has(c)))
      ctx.addIssue({
        code: "custom",
        path: ["correct"],
        message: "correct enthält unbekannte option-id",
      });
    if (new Set(q.correct).size !== q.correct.length)
      ctx.addIssue({ code: "custom", path: ["correct"], message: "correct enthält doppelte ids" });
    if (q.correct.length >= q.options.length)
      ctx.addIssue({
        code: "custom",
        path: ["correct"],
        message: "correct darf nicht alle options umfassen",
      });
  });

const yesNoSchema = z
  .object({
    ...questionBase,
    type: z.literal("yes-no"),
    statements: z
      .array(
        z.object({
          id: z.string().min(1, "Statement-id fehlt"),
          text: z.string().min(1, "Statement-Text fehlt"),
          correct: z.boolean(),
        })
      )
      .min(2, "zu wenige statements (mindestens 2)"),
  })
  .superRefine((q, ctx) => {
    const dup = findDuplicateId(q.statements);
    if (dup)
      ctx.addIssue({
        code: "custom",
        path: ["statements"],
        message: `doppelte Statement-id "${dup}"`,
      });
  });

const orderingSchema = z
  .object({
    ...questionBase,
    type: z.literal("ordering"),
    items: z.array(optionSchema).min(2, "zu wenige items (mindestens 2)"),
    correctOrder: z.array(z.string()),
  })
  .superRefine((q, ctx) => {
    const dup = findDuplicateId(q.items);
    if (dup)
      ctx.addIssue({ code: "custom", path: ["items"], message: `doppelte Item-id "${dup}"` });
    const ids = new Set(q.items.map((i) => i.id));
    if (
      q.correctOrder.length !== q.items.length ||
      new Set(q.correctOrder).size !== q.correctOrder.length
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["correctOrder"],
        message: "correctOrder passt nicht zu items",
      });
    } else if (!q.correctOrder.every((i) => ids.has(i))) {
      ctx.addIssue({
        code: "custom",
        path: ["correctOrder"],
        message: "correctOrder enthält unbekannte item-id",
      });
    }
  });

const matchingSchema = z
  .object({
    ...questionBase,
    type: z.literal("matching"),
    left: z.array(optionSchema).min(2, "zu wenige left-Einträge (mindestens 2)"),
    right: z.array(optionSchema).min(2, "zu wenige right-Einträge (mindestens 2)"),
    correct: z.record(z.string(), z.string()),
  })
  .superRefine((q, ctx) => {
    for (const [side, list] of [
      ["left", q.left],
      ["right", q.right],
    ] as const) {
      const dup = findDuplicateId(list);
      if (dup)
        ctx.addIssue({ code: "custom", path: [side], message: `doppelte id "${dup}" in ${side}` });
    }
    const l = new Set(q.left.map((o) => o.id));
    const r = new Set(q.right.map((o) => o.id));
    const entries = Object.entries(q.correct);
    if (entries.length !== q.left.length) {
      ctx.addIssue({
        code: "custom",
        path: ["correct"],
        message: "correct deckt nicht alle left-Einträge ab",
      });
    } else if (!entries.every(([lk, rv]) => l.has(lk) && r.has(rv))) {
      ctx.addIssue({
        code: "custom",
        path: ["correct"],
        message: "correct enthält unbekannte ids",
      });
    }
  });

const dropdownSchema = z
  .object({
    ...questionBase,
    type: z.literal("dropdown"),
    textParts: z.array(z.string()),
    blanks: z
      .array(
        z.object({
          id: z.string().min(1, "Blank-id fehlt"),
          options: z.array(optionSchema).min(2, "zu wenige Optionen pro Lücke (mindestens 2)"),
          correct: z.string().min(1, "blank.correct fehlt"),
        })
      )
      .min(1, "mindestens eine Lücke"),
  })
  .superRefine((q, ctx) => {
    if (q.textParts.length !== q.blanks.length + 1) {
      ctx.addIssue({
        code: "custom",
        path: ["textParts"],
        message: "textParts muss blanks.length + 1 Teile haben",
      });
    }
    const dup = findDuplicateId(q.blanks);
    if (dup)
      ctx.addIssue({ code: "custom", path: ["blanks"], message: `doppelte Blank-id "${dup}"` });
    q.blanks.forEach((b, i) => {
      const dupOpt = findDuplicateId(b.options);
      if (dupOpt)
        ctx.addIssue({
          code: "custom",
          path: ["blanks", i, "options"],
          message: `doppelte Option-id "${dupOpt}"`,
        });
      if (!b.options.some((o) => o.id === b.correct))
        ctx.addIssue({
          code: "custom",
          path: ["blanks", i, "correct"],
          message: "blank.correct zeigt auf keine option",
        });
    });
  });

export const questionSchema = z.discriminatedUnion("type", [
  singleChoiceSchema,
  multipleChoiceSchema,
  yesNoSchema,
  orderingSchema,
  matchingSchema,
  dropdownSchema,
]);

/** Fragen-Schema inkl. skillArea-Prüfung gegen die Areas des Examens. */
export function questionSchemaFor(config: ExamConfig) {
  const areaIds = new Set(config.skillAreas.map((a) => a.id));
  return questionSchema.superRefine((q, ctx) => {
    if (!areaIds.has(q.skillArea)) {
      ctx.addIssue({
        code: "custom",
        path: ["skillArea"],
        message: `unbekannte skillArea "${q.skillArea}" (erlaubt: ${[...areaIds].join(", ")})`,
      });
    }
  });
}

// ---- Parse-Helfer ----

export interface ValidationIssue {
  /** Pfad im Objekt, z. B. "blanks.0.correct" ("" = Wurzel) */
  path: string;
  message: string;
}

export type SafeResult<T> = { ok: true; data: T } | { ok: false; issues: ValidationIssue[] };

export function issuesOf(error: z.ZodError): ValidationIssue[] {
  return error.issues.map((i) => ({
    path: i.path.map(String).join("."),
    message: i.message,
  }));
}

/** Wirft z.ZodError bei ungültigen Daten. */
export function parseExamConfig(json: unknown): ExamConfig {
  return examConfigSchema.parse(json) as ExamConfig;
}

export function safeParseExamConfig(json: unknown): SafeResult<ExamConfig> {
  const r = examConfigSchema.safeParse(json);
  return r.success
    ? { ok: true, data: r.data as ExamConfig }
    : { ok: false, issues: issuesOf(r.error) };
}

/** Wirft z.ZodError bei ungültigen Daten (inkl. skillArea-Prüfung gegen das Examen). */
export function parseQuestion(examConfig: ExamConfig, json: unknown): Question {
  return questionSchemaFor(examConfig).parse(json) as Question;
}

export function safeParseQuestion(examConfig: ExamConfig, json: unknown): SafeResult<Question> {
  const r = questionSchemaFor(examConfig).safeParse(json);
  return r.success
    ? { ok: true, data: r.data as Question }
    : { ok: false, issues: issuesOf(r.error) };
}
