import "server-only";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getRepository } from "./data";
import type { RetrievedChunk } from "./data/port";

// RAG-Retrieval über den Daten-Port: fs-Treiber sucht in embeddings.json,
// Supabase-Treiber per pgvector (match_content_chunks). Die Query wird mit
// demselben Modell embedded wie die Chunks.

export const EMBEDDING_MODEL = "text-embedding-3-small";

export async function embedText(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.textEmbeddingModel(EMBEDDING_MODEL),
    value: text,
  });
  return embedding;
}

/** Top-k relevanteste Content-Chunks zum Query ([] ohne Embeddings/Key). */
export async function retrieve(
  slug: string,
  query: string,
  k = 4
): Promise<RetrievedChunk[]> {
  if (!process.env.OPENAI_API_KEY) return [];
  const repo = getRepository();
  if (!(await repo.hasContentChunks(slug))) return [];
  const queryEmbedding = await embedText(query);
  return repo.searchContentChunks(slug, queryEmbedding, k);
}
