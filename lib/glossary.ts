import type { GlossaryEntry, Question } from "@/lib/types";

// Glossar-Matching: Welche Glossar-Einträge kommen im Text einer Frage vor?
// Reine Funktion ohne Server-Abhängigkeiten, damit sie sowohl in den
// API-Routen (Check/Grade/Explain) als auch im Client (Offline-Lernmodus)
// identisch läuft.

/** Alle sichtbaren Texte einer Frage (Prompt, Antworten, Erklärung) als ein String. */
export function questionText(q: Question): string {
  const parts: string[] = [q.prompt, q.explanation];
  switch (q.type) {
    case "single-choice":
    case "multiple-choice":
      parts.push(...q.options.map((o) => o.text));
      break;
    case "yes-no":
      parts.push(...q.statements.map((s) => s.text));
      break;
    case "ordering":
      parts.push(...q.items.map((i) => i.text));
      break;
    case "matching":
      parts.push(...q.left.map((l) => l.text), ...q.right.map((r) => r.text));
      break;
    case "dropdown":
      parts.push(
        ...q.textParts,
        ...q.blanks.flatMap((b) => b.options.map((o) => o.text))
      );
      break;
  }
  return parts.join("\n");
}

const patternCache = new Map<string, RegExp>();

/**
 * Regex für einen Begriff: case-insensitiv, an Wortgrenzen, Leerzeichen und
 * Bindestriche austauschbar ("cloud flow" matcht "cloud-flow"), optionaler
 * englischer Plural ("lookup columns").
 */
function patternFor(term: string): RegExp {
  const cached = patternCache.get(term);
  if (cached) return cached;
  const escaped = term
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/[\s-]+/g, "[\\s-]+");
  const t = term.trim();
  const lead = /^\w/.test(t) ? "(?<![\\w])" : "";
  const tail = /\w$/.test(t) ? "(?:e?s)?(?![\\w])" : "";
  const re = new RegExp(`${lead}${escaped}${tail}`, "i");
  patternCache.set(term, re);
  return re;
}

export function entryMatches(entry: GlossaryEntry, text: string): boolean {
  return [entry.term, ...(entry.aliases ?? [])].some((t) =>
    patternFor(t).test(text)
  );
}

/** Glossar-Einträge, deren Begriff (oder Alias) im Fragetext vorkommt — alphabetisch. */
export function matchGlossary(
  q: Question,
  glossary: GlossaryEntry[] | undefined
): GlossaryEntry[] {
  if (!glossary || glossary.length === 0) return [];
  const text = questionText(q);
  return glossary
    .filter((entry) => entryMatches(entry, text))
    .sort((a, b) => a.term.localeCompare(b.term, "en"));
}
