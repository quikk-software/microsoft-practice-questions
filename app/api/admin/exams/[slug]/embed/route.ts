import { NextResponse } from "next/server";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getRepository } from "@/lib/data";
import { chunkUnits } from "@/lib/chunking";
import { EMBEDDING_MODEL } from "@/lib/rag";
import { guardRole } from "../../../guard";

export const maxDuration = 300;

// POST /api/admin/exams/[slug]/embed
// Chunked die gespeicherten Lerninhalte und erzeugt Embeddings (RAG).
// Ersetzt den kompletten Chunk-Bestand des Examens.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY ist nicht gesetzt (.env.local)" },
      { status: 400 }
    );
  }

  const { slug } = await params;
  const repo = getRepository();
  const units = await repo.listContentUnits(slug);
  if (units.length === 0) {
    return NextResponse.json(
      { error: "Keine Lerninhalte vorhanden — zuerst Ingest ausführen." },
      { status: 400 }
    );
  }

  const chunks = chunkUnits(units);

  const BATCH = 100;
  const withEmbeddings = [];
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    const { embeddings } = await embedMany({
      model: openai.textEmbeddingModel(EMBEDDING_MODEL),
      values: batch.map((c) => c.embedText),
    });
    withEmbeddings.push(
      ...batch.map((c, j) => ({
        id: c.id,
        examSlug: c.examSlug,
        unitUid: c.unitUid,
        heading: c.heading,
        text: c.text,
        embedding: embeddings[j],
      }))
    );
  }

  await repo.replaceContentChunks(slug, withEmbeddings);

  return NextResponse.json({
    ok: true,
    units: units.length,
    chunks: withEmbeddings.length,
    model: EMBEDDING_MODEL,
  });
}
