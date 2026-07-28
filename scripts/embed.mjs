// Erzeugt Embeddings für die gespeicherten Lerninhalte eines Examens.
//
// Aufruf:  node scripts/embed.mjs <exam-slug>
// Braucht: OPENAI_API_KEY (Embedding-Modell: text-embedding-3-small)
// Output:  data/exams/<slug>/embeddings.json  [{ id, title, heading, url, module, text, embedding }]

import fs from "node:fs";
import path from "node:path";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

const EMBEDDING_MODEL = "text-embedding-3-small";
const MAX_CHUNK = 3500; // Zeichen
const MIN_CHUNK = 400;

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/embed.mjs <exam-slug>");
  process.exit(1);
}
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY fehlt (in .env.local setzen und exportieren, z. B. `export $(grep OPENAI .env.local)`).");
  process.exit(1);
}

const examDir = path.join(process.cwd(), "data", "exams", slug);
const contentDir = path.join(examDir, "content");
const index = JSON.parse(
  fs.readFileSync(path.join(contentDir, "index.json"), "utf8")
);

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^(\w+):\s*"(.*)"$/);
      if (kv) meta[kv[1]] = kv[2];
    }
  }
  return { meta, body: m ? raw.slice(m[0].length) : raw };
}

// Chunking: an ##-Überschriften splitten, große Abschnitte weiter teilen, kleine mergen.
function chunkMarkdown(body) {
  const sections = body.split(/\n(?=## )/);
  const chunks = [];
  for (const section of sections) {
    const headingMatch = section.match(/^##\s+(.+)/);
    const heading = headingMatch ? headingMatch[1].trim() : null;
    let text = section.trim();
    while (text.length > MAX_CHUNK) {
      // an Absatzgrenze in der Nähe von MAX_CHUNK schneiden
      let cut = text.lastIndexOf("\n\n", MAX_CHUNK);
      if (cut < MIN_CHUNK) cut = MAX_CHUNK;
      chunks.push({ heading, text: text.slice(0, cut).trim() });
      text = text.slice(cut).trim();
    }
    if (text.length > 0) chunks.push({ heading, text });
  }
  // Mini-Chunks an den Vorgänger hängen
  return chunks.reduce((acc, c) => {
    const prev = acc[acc.length - 1];
    if (prev && c.text.length < MIN_CHUNK && prev.text.length + c.text.length <= MAX_CHUNK) {
      prev.text += "\n\n" + c.text;
    } else {
      acc.push(c);
    }
    return acc;
  }, []);
}

const allChunks = [];
for (const unit of index) {
  const raw = fs.readFileSync(path.join(examDir, unit.file), "utf8");
  const { body } = parseFrontmatter(raw);
  for (const [i, c] of chunkMarkdown(body).entries()) {
    allChunks.push({
      id: `${unit.uid}#${i}`,
      title: unit.title,
      heading: c.heading,
      url: unit.url,
      module: unit.module,
      moduleTitle: unit.moduleTitle,
      text: c.text,
    });
  }
}
console.log(`${allChunks.length} Chunks aus ${index.length} Units`);

const BATCH = 100;
const out = [];
for (let i = 0; i < allChunks.length; i += BATCH) {
  const batch = allChunks.slice(i, i + BATCH);
  const { embeddings } = await embedMany({
    model: openai.textEmbeddingModel(EMBEDDING_MODEL),
    values: batch.map((c) => `${c.title}${c.heading ? " — " + c.heading : ""}\n${c.text}`),
  });
  batch.forEach((c, j) => out.push({ ...c, embedding: embeddings[j] }));
  console.log(`  ${Math.min(i + BATCH, allChunks.length)}/${allChunks.length} embedded`);
}

// Ziel je nach Treiber: Supabase (content_chunks, pgvector) oder embeddings.json
if (
  process.env.DATA_DRIVER === "supabase" &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
  const { error: delError } = await supabase
    .from("content_chunks")
    .delete()
    .eq("exam_slug", slug);
  if (delError) throw new Error(`Supabase delete: ${delError.message}`);
  for (let i = 0; i < out.length; i += BATCH) {
    const { error } = await supabase.from("content_chunks").insert(
      out.slice(i, i + BATCH).map((c) => ({
        id: c.id,
        exam_slug: slug,
        unit_uid: c.id.split("#")[0],
        heading: c.heading,
        text: c.text,
        embedding: c.embedding,
      }))
    );
    if (error) throw new Error(`Supabase insert: ${error.message}`);
  }
  console.log(`-> ${out.length} Chunks nach Supabase (content_chunks) geschrieben`);
} else {
  fs.writeFileSync(path.join(examDir, "embeddings.json"), JSON.stringify(out));
  console.log(`-> ${path.join(examDir, "embeddings.json")}`);
}
