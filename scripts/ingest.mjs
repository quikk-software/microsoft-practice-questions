// Lädt die Lerninhalte eines Examens von Microsoft Learn und speichert sie als
// Markdown mit Quell-Metadaten unter data/exams/<slug>/content/.
//
// Aufruf: node scripts/ingest.mjs <exam-slug>
// Quelle: data/exams/<slug>/sources.json  ->  { "learningPaths": ["learn.wwl. ..."] }

import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const CATALOG = "https://learn.microsoft.com/api/catalog/";
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/ingest.mjs <exam-slug>");
  process.exit(1);
}

const examDir = path.join(process.cwd(), "data", "exams", slug);
const sources = JSON.parse(
  fs.readFileSync(path.join(examDir, "sources.json"), "utf8")
);
const contentDir = path.join(examDir, "content");

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});
turndown.remove(["script", "style", "nav", "aside", "button"]);

async function catalog(params) {
  const url = `${CATALOG}?${new URLSearchParams({ locale: "en-us", ...params })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Catalog API ${res.status}: ${url}`);
  return res.json();
}

async function fetchUnitMarkdown(unitUrl) {
  const res = await fetch(unitUrl);
  if (!res.ok) return null;
  const $ = cheerio.load(await res.text());
  const el = $("#unit-inner-section");
  if (el.length === 0) return null;
  // UI-Elemente raus, die kein Lerninhalt sind
  el.find(
    ".xp-tag, .metadata, [data-progress-uid], .visually-hidden, .next-section, #next-section-button"
  ).remove();
  return turndown.turndown(el.html() ?? "");
}

const index = [];

for (const pathUid of sources.learningPaths) {
  const pathData = (await catalog({ uid: pathUid })).learningPaths?.[0];
  if (!pathData) {
    console.error(`Learning path not found: ${pathUid}`);
    continue;
  }
  console.log(`# ${pathData.title} (${pathData.modules.length} Module)`);

  const moduleData = (
    await catalog({ uid: pathData.modules.join(",") })
  ).modules;

  for (const mod of moduleData) {
    const moduleUrl = mod.url.split("?")[0];
    const moduleSlug = moduleUrl.replace(/\/$/, "").split("/").pop();
    const modDir = path.join(contentDir, moduleSlug);
    fs.mkdirSync(modDir, { recursive: true });

    // Unit-Titel nachladen (Batch)
    const unitInfo = new Map(
      (await catalog({ uid: mod.units.join(",") })).units.map((u) => [
        u.uid,
        u.title,
      ])
    );

    console.log(`\n## ${mod.title} (${mod.units.length} Units)`);

    for (const [i, unitUid] of mod.units.entries()) {
      const unitSlug = unitUid.split(".").pop();
      const unitUrl = `${moduleUrl}${i + 1}-${unitSlug}`;
      const title = unitInfo.get(unitUid) ?? unitSlug;
      const md = await fetchUnitMarkdown(unitUrl);
      if (md == null) {
        console.log(`  ✗ ${title} (${unitUrl})`);
        continue;
      }
      const fileName = `${String(i + 1).padStart(2, "0")}-${unitSlug}.md`;
      const frontmatter = [
        "---",
        `title: "${title.replaceAll('"', "'")}"`,
        `url: "${unitUrl}"`,
        `uid: "${unitUid}"`,
        `module: "${moduleSlug}"`,
        `moduleTitle: "${mod.title.replaceAll('"', "'")}"`,
        `learningPath: "${pathUid}"`,
        "---",
        "",
      ].join("\n");
      fs.writeFileSync(path.join(modDir, fileName), frontmatter + md + "\n");
      index.push({
        uid: unitUid,
        title,
        url: unitUrl,
        module: moduleSlug,
        moduleTitle: mod.title,
        file: path.join("content", moduleSlug, fileName),
        chars: md.length,
      });
      console.log(`  ✓ ${title} (${md.length} Zeichen)`);
      // MS Learn nicht hämmern
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

fs.writeFileSync(
  path.join(contentDir, "index.json"),
  JSON.stringify(index, null, 2)
);
console.log(`\n${index.length} Units gespeichert -> ${contentDir}`);
