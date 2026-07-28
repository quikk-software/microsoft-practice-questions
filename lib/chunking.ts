import type { ContentChunk, ContentUnit } from "./data/port";

// Chunking der Lerninhalte für Embeddings: an ##-Überschriften splitten,
// zu große Abschnitte an Absatzgrenzen teilen, Mini-Chunks mergen.
// (Spiegel der Logik in scripts/embed.mjs für den CLI-Weg.)

const MAX_CHUNK = 3500; // Zeichen
const MIN_CHUNK = 400;

export function chunkMarkdown(
  body: string
): { heading: string | null; text: string }[] {
  const sections = body.split(/\n(?=## )/);
  const chunks: { heading: string | null; text: string }[] = [];
  for (const section of sections) {
    const headingMatch = section.match(/^##\s+(.+)/);
    const heading = headingMatch ? headingMatch[1].trim() : null;
    let text = section.trim();
    while (text.length > MAX_CHUNK) {
      let cut = text.lastIndexOf("\n\n", MAX_CHUNK);
      if (cut < MIN_CHUNK) cut = MAX_CHUNK;
      chunks.push({ heading, text: text.slice(0, cut).trim() });
      text = text.slice(cut).trim();
    }
    if (text.length > 0) chunks.push({ heading, text });
  }
  return chunks.reduce<{ heading: string | null; text: string }[]>((acc, c) => {
    const prev = acc[acc.length - 1];
    if (
      prev &&
      c.text.length < MIN_CHUNK &&
      prev.text.length + c.text.length <= MAX_CHUNK
    ) {
      prev.text += "\n\n" + c.text;
    } else {
      acc.push(c);
    }
    return acc;
  }, []);
}

/** Alle Units eines Examens in embedding-fertige Chunks zerlegen (ohne Vektoren). */
export function chunkUnits(
  units: ContentUnit[]
): (Omit<ContentChunk, "embedding"> & { embedText: string })[] {
  return units.flatMap((unit) =>
    chunkMarkdown(unit.markdown).map((c, i) => ({
      id: `${unit.uid}#${i}`,
      examSlug: unit.examSlug,
      unitUid: unit.uid,
      heading: c.heading,
      text: c.text,
      embedText: `${unit.title}${c.heading ? " — " + c.heading : ""}\n${c.text}`,
    }))
  );
}
