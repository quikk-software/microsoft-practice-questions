import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { getRepository } from "@/lib/data";
import type { ContentUnit } from "@/lib/data/port";
import { ContentIngest } from "@/components/admin/ContentIngest";

export default async function ExamContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug, { includeUnpublished: true });
  if (!exam) notFound();
  const units = await repo.listContentUnits(slug);

  // Nach Modul gruppieren (Reihenfolge der ersten Vorkommen beibehalten)
  const byModule = new Map<string, { title: string; units: ContentUnit[] }>();
  for (const unit of units) {
    const entry = byModule.get(unit.moduleSlug) ?? { title: unit.moduleTitle, units: [] };
    entry.units.push(unit);
    byModule.set(unit.moduleSlug, entry);
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <Link
        href={`/admin/exams/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Zurück zu {exam.config.code}
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Lerninhalte · {exam.config.code}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Inhalte von Microsoft Learn laden — sie sind die Quelle für Fragen und Zitate.
      </p>

      <div className="mt-6">
        <ContentIngest slug={slug} />
      </div>

      <div className="mt-4 rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-900 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-200">
        Hinweis: Embeddings für die AI-Erklärungen werden noch nicht automatisch aktualisiert —
        nach dem Ingest weiterhin <code className="font-mono">npm run embed -- {slug}</code>{" "}
        ausführen (Phase 4 folgt).
      </div>

      <h2 className="mt-10 text-lg font-semibold">
        Vorhandene Content-Units ({units.length})
      </h2>
      {units.length === 0 && (
        <p className="mt-3 rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          Noch keine Inhalte vorhanden.
        </p>
      )}
      <div className="mt-3 space-y-6">
        {[...byModule.entries()].map(([moduleSlug, mod]) => (
          <div key={moduleSlug}>
            <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              {mod.title}{" "}
              <span className="font-normal text-zinc-400">({mod.units.length} Units)</span>
            </h3>
            <ul className="space-y-1.5">
              {mod.units.map((unit) => (
                <li
                  key={unit.uid}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="w-6 shrink-0 text-center font-mono text-xs text-zinc-400">
                    {unit.position}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{unit.title}</span>
                  <span className="shrink-0 text-xs text-zinc-500">
                    {unit.markdown.length.toLocaleString("de-DE")} Zeichen
                  </span>
                  <a
                    href={unit.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${unit.title} auf Microsoft Learn öffnen`}
                    className="shrink-0 text-zinc-400 hover:text-brand-600"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
