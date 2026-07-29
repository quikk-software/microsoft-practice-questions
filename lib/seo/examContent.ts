import type { ContentUnit } from "@/lib/data/port";
import type { Question, SingleChoiceQuestion, MultipleChoiceQuestion } from "@/lib/types";

// Aufbereitung der öffentlichen Examen-Inhalte (SEO). Alles leitet sich aus
// eigenen Daten ab (Fragen-Pool, Konfiguration) bzw. verlinkt nur nach außen —
// es wird kein fremder Lerninhalt reproduziert.

export type SampleQuestion = SingleChoiceQuestion | MultipleChoiceQuestion;

/**
 * Beispielfragen für die öffentliche Seite: bevorzugt manuell markierte
 * (`sample: true`), sonst eine deterministische Auswahl — je Skill-Bereich
 * eine gut lesbare Choice-Frage, stabil über Renders hinweg.
 */
export function pickSampleQuestions(
  questions: Question[],
  skillAreaIds: string[],
  limit = 4
): SampleQuestion[] {
  const isChoice = (q: Question): q is SampleQuestion =>
    q.type === "single-choice" || q.type === "multiple-choice";

  const marked = questions.filter((q) => q.sample && isChoice(q));
  if (marked.length > 0) return marked.slice(0, limit) as SampleQuestion[];

  const pool = questions
    .filter(isChoice)
    .filter((q) => q.status !== "draft")
    .sort((a, b) => a.id.localeCompare(b.id));

  const picked: SampleQuestion[] = [];
  // Erst je Skill-Bereich eine Frage (leichte zuerst), dann auffüllen
  for (const area of skillAreaIds) {
    const candidate =
      pool.find((q) => q.skillArea === area && q.difficulty === "easy") ??
      pool.find((q) => q.skillArea === area);
    if (candidate && !picked.includes(candidate)) picked.push(candidate);
    if (picked.length >= limit) break;
  }
  for (const q of pool) {
    if (picked.length >= limit) break;
    if (!picked.includes(q)) picked.push(q);
  }
  return picked.slice(0, limit);
}

/** Themen (aus dem eigenen Fragen-Pool) je Skill-Bereich, alphabetisch. */
export function topicsBySkillArea(
  questions: Question[],
  skillAreaIds: string[]
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const area of skillAreaIds) {
    const topics = new Set(
      questions.filter((q) => q.skillArea === area).map((q) => q.topic.trim())
    );
    out[area] = [...topics].sort((a, b) => a.localeCompare(b, "en"));
  }
  return out;
}

export interface ModuleSummary {
  slug: string;
  title: string;
  url: string;
  unitCount: number;
}

/** Module aus den Content-Units ableiten (Titel + Link auf Microsoft Learn). */
export function modulesFromUnits(units: ContentUnit[]): ModuleSummary[] {
  const map = new Map<string, ModuleSummary>();
  for (const unit of units) {
    const existing = map.get(unit.moduleSlug);
    if (existing) {
      existing.unitCount++;
      continue;
    }
    map.set(unit.moduleSlug, {
      slug: unit.moduleSlug,
      title: unit.moduleTitle,
      url: `https://learn.microsoft.com/en-us/training/modules/${unit.moduleSlug}/`,
      unitCount: 1,
    });
  }
  return [...map.values()];
}

/** Text der korrekten Antwort(en) einer Beispielfrage. */
export function correctAnswerText(q: SampleQuestion): string {
  const ids = q.type === "single-choice" ? [q.correct] : q.correct;
  return q.options
    .filter((o) => ids.includes(o.id))
    .map((o) => o.text)
    .join(" · ");
}
