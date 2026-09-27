// Validiert den Fragen-Pool eines Examens gegen das Schema aus lib/types.ts.
// Aufruf: node scripts/validate.mjs <exam-slug>

import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/validate.mjs <exam-slug>");
  process.exit(1);
}

const examDir = path.join(process.cwd(), "data", "exams", slug);
const config = JSON.parse(
  fs.readFileSync(path.join(examDir, "exam.json"), "utf8")
);
const areaIds = new Set(config.skillAreas.map((a) => a.id));
const questionsDir = path.join(examDir, "questions");

const errors = [];
const all = [];
const seenIds = new Set();

const TYPES = ["single-choice", "multiple-choice", "yes-no", "ordering", "matching", "dropdown"];
const DIFFS = ["easy", "medium", "hard"];

function err(id, msg) {
  errors.push(`  ${id}: ${msg}`);
}

for (const file of fs.readdirSync(questionsDir).filter((f) => f.endsWith(".json"))) {
  let batch;
  try {
    batch = JSON.parse(fs.readFileSync(path.join(questionsDir, file), "utf8"));
  } catch (e) {
    errors.push(`  ${file}: kein valides JSON (${e.message})`);
    continue;
  }
  if (!Array.isArray(batch)) {
    errors.push(`  ${file}: kein Array`);
    continue;
  }
  for (const q of batch) {
    const id = q.id ?? `${file}#?`;
    if (!q.id) err(id, "id fehlt");
    else if (seenIds.has(q.id)) err(id, "doppelte id");
    seenIds.add(q.id);
    if (!TYPES.includes(q.type)) err(id, `unbekannter type: ${q.type}`);
    if (!areaIds.has(q.skillArea)) err(id, `unbekannte skillArea: ${q.skillArea}`);
    if (!DIFFS.includes(q.difficulty)) err(id, `unbekannte difficulty: ${q.difficulty}`);
    if (!q.prompt) err(id, "prompt fehlt");
    if (!q.explanation) err(id, "explanation fehlt");
    if (!q.source?.url || !q.source?.title) err(id, "source fehlt/unvollständig");
    if (!q.source?.quote) err(id, "source.quote fehlt");

    const optIds = (opts) => new Set((opts ?? []).map((o) => o.id));
    switch (q.type) {
      case "single-choice":
        if ((q.options?.length ?? 0) < 3) err(id, "zu wenige options");
        if (!optIds(q.options).has(q.correct)) err(id, "correct zeigt auf keine option");
        break;
      case "multiple-choice":
        if (!Array.isArray(q.correct) || q.correct.length < 2) err(id, "correct braucht >= 2 ids");
        else if (!q.correct.every((c) => optIds(q.options).has(c))) err(id, "correct enthält unbekannte option-id");
        break;
      case "yes-no":
        if ((q.statements?.length ?? 0) < 2) err(id, "zu wenige statements");
        else if (!q.statements.every((s) => typeof s.correct === "boolean")) err(id, "statement ohne boolean correct");
        break;
      case "ordering": {
        const items = optIds(q.items);
        if (!Array.isArray(q.correctOrder) || q.correctOrder.length !== q.items?.length)
          err(id, "correctOrder passt nicht zu items");
        else if (!q.correctOrder.every((i) => items.has(i))) err(id, "correctOrder enthält unbekannte item-id");
        break;
      }
      case "matching": {
        const l = optIds(q.left), r = optIds(q.right);
        const entries = Object.entries(q.correct ?? {});
        if (entries.length !== q.left?.length) err(id, "correct deckt nicht alle left-Einträge ab");
        else if (!entries.every(([lk, rv]) => l.has(lk) && r.has(rv))) err(id, "correct enthält unbekannte ids");
        break;
      }
      case "dropdown":
        if ((q.textParts?.length ?? 0) !== (q.blanks?.length ?? 0) + 1)
          err(id, "textParts muss blanks.length + 1 Teile haben");
        else if (!q.blanks.every((b) => optIds(b.options).has(b.correct)))
          err(id, "blank.correct zeigt auf keine option");
        break;
    }
    all.push(q);
  }
}

// Zitate stichprobenartig gegen den Content prüfen (normalisierter Substring-Match)
const contentDir = path.join(examDir, "content");
let contentText = "";
if (fs.existsSync(contentDir)) {
  for (const dir of fs.readdirSync(contentDir)) {
    const p = path.join(contentDir, dir);
    if (!fs.statSync(p).isDirectory()) continue;
    for (const f of fs.readdirSync(p).filter((f) => f.endsWith(".md"))) {
      contentText += fs.readFileSync(path.join(p, f), "utf8");
    }
  }
}
// Satzweise prüfen: Agents dürfen mehrere wörtliche Sätze kombinieren,
// aber jeder einzelne Satz muss verbatim im Content vorkommen.
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
// Markdown-Links auf ihren sichtbaren Text reduzieren — Zitate sind aus
// Leser-Sicht wörtlich, auch wenn im Quelltext [text](url) steht.
const normContent = normalize(
  contentText.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
);
let quoteMisses = 0;
for (const q of all) {
  if (q.source?.quote && contentText) {
    const sentences = q.source.quote
      .split(/(?<=[.!?])\s+/)
      .map(normalize)
      .filter((s) => s.length > 20);
    const missing = sentences.filter((s) => !normContent.includes(s));
    if (missing.length > 0) {
      quoteMisses++;
      err(q.id, `source.quote: ${missing.length} Satz/Sätze nicht wörtlich im Content`);
    }
  }
}

// Glossar (glossary.json): Schema, Eindeutigkeit, Quellen-URLs, Abdeckung der Fragen
const glossaryPath = path.join(examDir, "glossary.json");
let glossary = [];
if (fs.existsSync(glossaryPath)) {
  try {
    glossary = JSON.parse(fs.readFileSync(glossaryPath, "utf8"));
  } catch (e) {
    errors.push(`  glossary.json: kein valides JSON (${e.message})`);
  }
  const unitUrls = new Set(
    fs.existsSync(path.join(contentDir, "index.json"))
      ? JSON.parse(fs.readFileSync(path.join(contentDir, "index.json"), "utf8")).map((u) => u.url)
      : []
  );
  const seenGlossaryIds = new Set();
  const seenTerms = new Map();
  for (const g of Array.isArray(glossary) ? glossary : []) {
    const gid = g.id ?? "glossary#?";
    if (!g.id || !/^[a-z0-9-]+$/.test(g.id)) err(gid, "glossar-id fehlt/ungültig");
    else if (seenGlossaryIds.has(g.id)) err(gid, "doppelte glossar-id");
    seenGlossaryIds.add(g.id);
    if (!g.term) err(gid, "term fehlt");
    if (!g.definition || g.definition.length < 40) err(gid, "definition fehlt oder zu kurz");
    if (!g.source?.title || !g.source?.url) err(gid, "source fehlt/unvollständig");
    else if (unitUrls.size && !unitUrls.has(g.source.url)) err(gid, `source.url ist keine Lerninhalt-Unit: ${g.source.url}`);
    for (const t of [g.term, ...(g.aliases ?? [])]) {
      const key = String(t).toLowerCase();
      if (seenTerms.has(key) && seenTerms.get(key) !== g.id)
        err(gid, `Begriff "${t}" bereits bei ${seenTerms.get(key)}`);
      seenTerms.set(key, g.id);
    }
  }
}

// Abdeckung: gleiche Matching-Regel wie lib/glossary.ts
const patternFor = (term) => {
  const t = String(term).trim();
  const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[\\s-]+");
  const lead = /^\w/.test(t) ? "(?<![\\w])" : "";
  const tail = /\w$/.test(t) ? "(?:e?s)?(?![\\w])" : "";
  return new RegExp(`${lead}${escaped}${tail}`, "i");
};
const textOf = (q) =>
  [
    q.prompt,
    q.explanation,
    ...(q.options ?? []).map((o) => o.text),
    ...(q.statements ?? []).map((s) => s.text),
    ...(q.items ?? []).map((i) => i.text),
    ...(q.left ?? []).map((l) => l.text),
    ...(q.right ?? []).map((r) => r.text),
    ...(q.textParts ?? []),
    ...(q.blanks ?? []).flatMap((b) => b.options.map((o) => o.text)),
  ].join("\n");
const glossaryHits = {};
const unmatchedQuestions = [];
if (glossary.length) {
  const patterns = glossary.map((g) => ({
    id: g.id,
    res: [g.term, ...(g.aliases ?? [])].map(patternFor),
  }));
  for (const q of all) {
    const text = textOf(q);
    let n = 0;
    for (const p of patterns) {
      if (p.res.some((re) => re.test(text))) {
        n++;
        glossaryHits[p.id] = (glossaryHits[p.id] ?? 0) + 1;
      }
    }
    if (n === 0) unmatchedQuestions.push(q.id);
  }
}

// Zusammenfassung
const count = (fn) =>
  all.reduce((acc, q) => ((acc[fn(q)] = (acc[fn(q)] ?? 0) + 1), acc), {});
console.log(`Pool: ${all.length} Fragen`);
console.log("  nach Typ:        ", JSON.stringify(count((q) => q.type)));
console.log("  nach Schwierigkeit:", JSON.stringify(count((q) => q.difficulty)));
console.log("  nach Skill-Area: ", JSON.stringify(count((q) => q.skillArea)));
if (glossary.length) {
  const unused = glossary.filter((g) => !glossaryHits[g.id]).map((g) => g.id);
  console.log(`Glossar: ${glossary.length} Begriffe`);
  console.log(`  Fragen ohne Glossar-Treffer: ${unmatchedQuestions.length}${unmatchedQuestions.length ? " (" + unmatchedQuestions.join(", ") + ")" : ""}`);
  console.log(`  Begriffe ohne Frage:         ${unused.length}${unused.length ? " (" + unused.join(", ") + ")" : ""}`);
}
if (errors.length) {
  console.error(`\n${errors.length} Problem(e):`);
  errors.forEach((e) => console.error(e));
  process.exit(1);
}
console.log("\n✓ Alle Prüfungen bestanden" + (contentText ? ` (inkl. ${all.length - quoteMisses} verbatim-Zitate)` : ""));
