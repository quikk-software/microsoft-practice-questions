// Seedet die lokalen Exam-Daten (data/exams/**) nach Supabase.
//
// Aufruf:  node --env-file=.env.local scripts/seed.mjs [<exam-slug>]
//          ohne Argument werden alle Examen unter data/exams/ geseedet.
// Braucht: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// Idempotent: alle Schreibvorgänge sind Upserts (onConflict auf dem Primary Key).

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "ENV fehlt: SUPABASE_URL (oder NEXT_PUBLIC_SUPABASE_URL) und SUPABASE_SERVICE_ROLE_KEY " +
      "müssen gesetzt sein.\nAufruf: node --env-file=.env.local scripts/seed.mjs [<exam-slug>]"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const DATA_DIR = path.join(process.cwd(), "data", "exams");
const BATCH_SIZE = 100;

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/** YAML-Frontmatter am Dateianfang entfernen. */
function stripFrontmatter(raw) {
  return raw.replace(/^---\n[\s\S]*?\n---\n/, "");
}

async function upsertBatched(table, rows, onConflict) {
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from(table).upsert(batch, { onConflict });
    if (error) {
      throw new Error(`Supabase-Fehler beim Upsert in "${table}": ${error.message}`);
    }
  }
}

async function seedExam(slug) {
  const examDir = path.join(DATA_DIR, slug);
  const configPath = path.join(examDir, "exam.json");
  if (!fs.existsSync(configPath)) {
    throw new Error(`Kein exam.json unter ${configPath}`);
  }

  console.log(`\n=== Seede Examen "${slug}" ===`);

  // --- exams ---
  const config = readJson(configPath);
  await upsertBatched(
    "exams",
    [
      {
        slug: config.slug,
        published: config.published ?? true,
        config,
        updated_at: new Date().toISOString(),
      },
    ],
    "slug"
  );
  console.log(`exams: "${config.slug}" upserted`);

  // --- questions ---
  const qDir = path.join(examDir, "questions");
  const questions = [];
  if (fs.existsSync(qDir)) {
    for (const file of fs.readdirSync(qDir)) {
      if (!file.endsWith(".json")) continue;
      questions.push(...readJson(path.join(qDir, file)));
    }
  }
  if (questions.length > 0) {
    await upsertBatched(
      "questions",
      questions.map((q) => ({
        id: q.id,
        exam_slug: slug,
        type: q.type,
        skill_area: q.skillArea,
        difficulty: q.difficulty,
        topic: q.topic,
        status: q.status ?? "published",
        data: q,
        updated_at: new Date().toISOString(),
      })),
      "id"
    );
  }
  console.log(`questions: ${questions.length} upserted`);

  // --- content_units ---
  const indexPath = path.join(examDir, "content", "index.json");
  if (fs.existsSync(indexPath)) {
    const index = readJson(indexPath);
    const units = index.map((u, i) => ({
      uid: u.uid,
      exam_slug: slug,
      module_slug: u.module,
      module_title: u.moduleTitle,
      title: u.title,
      url: u.url,
      position: i + 1,
      markdown: stripFrontmatter(fs.readFileSync(path.join(examDir, u.file), "utf8")),
      ingested_at: new Date().toISOString(),
    }));
    await upsertBatched("content_units", units, "uid");
    console.log(`content_units: ${units.length} upserted`);
  } else {
    console.log("content_units: kein content/index.json — übersprungen");
  }

  // --- content_chunks (optional) ---
  const embeddingsPath = path.join(examDir, "embeddings.json");
  if (fs.existsSync(embeddingsPath)) {
    const chunks = readJson(embeddingsPath).map((c) => ({
      id: c.id,
      exam_slug: slug,
      unit_uid: c.id.split("#")[0],
      heading: c.heading ?? null,
      text: c.text,
      embedding: c.embedding,
    }));
    await upsertBatched("content_chunks", chunks, "id");
    console.log(`content_chunks: ${chunks.length} upserted`);
  } else {
    console.log("content_chunks: kein embeddings.json — übersprungen (npm run embed)");
  }
}

const argSlug = process.argv[2];
const slugs = argSlug
  ? [argSlug]
  : fs.existsSync(DATA_DIR)
    ? fs
        .readdirSync(DATA_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

if (slugs.length === 0) {
  console.error(argSlug ? `Examen "${argSlug}" nicht gefunden.` : "Keine Examen unter data/exams/ gefunden.");
  process.exit(1);
}

try {
  for (const slug of slugs) {
    await seedExam(slug);
  }
  console.log(`\nFertig: ${slugs.length} Examen geseedet (${slugs.join(", ")}).`);
} catch (err) {
  console.error(`\nSeed fehlgeschlagen: ${err.message}`);
  process.exit(1);
}
