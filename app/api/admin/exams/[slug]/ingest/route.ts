import { NextResponse } from "next/server";
import { z } from "zod";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { getRepository } from "@/lib/data";
import type { ContentUnit } from "@/lib/data/port";
import { guardRole } from "../../../guard";

// POST /api/admin/exams/[slug]/ingest
// Lädt die Lerninhalte der übergebenen Learning-Path-UIDs von Microsoft Learn
// (Catalog API + HTML-Scrape -> Markdown) und schreibt sie via replaceContentUnits
// in den Daten-Port. Portiert aus scripts/ingest.mjs.

export const runtime = "nodejs";
export const maxDuration = 300;

const CATALOG = "https://learn.microsoft.com/api/catalog/";

const bodySchema = z.object({
  learningPaths: z.array(z.string().min(1)).min(1, "mindestens eine Learning-Path-UID"),
});

interface CatalogResponse {
  learningPaths?: { uid: string; title: string; modules: string[] }[];
  modules?: { uid: string; title: string; url: string; units: string[] }[];
  units?: { uid: string; title: string }[];
}

async function catalog(params: Record<string, string>): Promise<CatalogResponse> {
  const url = `${CATALOG}?${new URLSearchParams({ locale: "en-us", ...params })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Learn Catalog API ${res.status}: ${url}`);
  return (await res.json()) as CatalogResponse;
}

function createTurndown(): TurndownService {
  const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
  turndown.remove(["script", "style", "nav", "aside", "button"]);
  return turndown;
}

async function fetchUnitMarkdown(turndown: TurndownService, unitUrl: string): Promise<string | null> {
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug, { includeUnpublished: true });
  if (!exam) {
    return NextResponse.json({ error: "Examen nicht gefunden" }, { status: 404 });
  }

  // Früher Abbruch, bevor minutenlang gescraped wird: der Fs-Treiber
  // unterstützt replaceContentUnits nicht (schreibt direkt via Skript).
  if ((process.env.DATA_DRIVER ?? "fs") === "fs") {
    return NextResponse.json(
      {
        error:
          "Der Datei-Treiber unterstützt den Web-Ingest nicht — im Fs-Modus bitte `npm run ingest -- " +
          slug +
          "` auf der Kommandozeile nutzen.",
      },
      { status: 400 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Request-Body ist kein gültiges JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Erwartet: { learningPaths: string[] } mit mindestens einer UID" },
      { status: 400 }
    );
  }

  const turndown = createTurndown();
  const units: ContentUnit[] = [];
  const moduleTitles: string[] = [];
  const warnings: string[] = [];

  try {
    for (const pathUid of parsed.data.learningPaths) {
      const pathData = (await catalog({ uid: pathUid })).learningPaths?.[0];
      if (!pathData) {
        warnings.push(`Learning Path nicht gefunden: ${pathUid}`);
        continue;
      }

      const moduleData = (await catalog({ uid: pathData.modules.join(",") })).modules ?? [];

      for (const mod of moduleData) {
        const moduleUrl = mod.url.split("?")[0];
        const moduleSlug = moduleUrl.replace(/\/$/, "").split("/").pop() ?? mod.uid;
        moduleTitles.push(mod.title);

        // Unit-Titel nachladen (Batch)
        const unitInfo = new Map(
          ((await catalog({ uid: mod.units.join(",") })).units ?? []).map((u) => [u.uid, u.title])
        );

        for (const [i, unitUid] of mod.units.entries()) {
          const unitSlug = unitUid.split(".").pop() ?? unitUid;
          const unitUrl = `${moduleUrl}${i + 1}-${unitSlug}`;
          const title = unitInfo.get(unitUid) ?? unitSlug;
          const markdown = await fetchUnitMarkdown(turndown, unitUrl);
          if (markdown == null) {
            warnings.push(`Unit übersprungen (kein Inhalt): ${title} (${unitUrl})`);
            continue;
          }
          units.push({
            uid: unitUid,
            examSlug: slug,
            moduleSlug,
            moduleTitle: mod.title,
            title,
            url: unitUrl,
            position: i + 1,
            markdown,
          });
          // MS Learn nicht hämmern
          await sleep(200);
        }
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Ingest fehlgeschlagen: ${msg}` }, { status: 502 });
  }

  if (units.length === 0) {
    return NextResponse.json(
      { error: "Keine Units gefunden — Learning-Path-UIDs prüfen", warnings },
      { status: 400 }
    );
  }

  try {
    await repo.replaceContentUnits(slug, units);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        error: `Content konnte nicht gespeichert werden: ${msg} — im Fs-Modus bitte \`npm run ingest -- ${slug}\` nutzen.`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    units: units.length,
    modules: moduleTitles.length,
    moduleTitles,
    warnings,
  });
}
