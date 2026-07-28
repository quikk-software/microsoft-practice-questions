import Link from "next/link";
import { FolderOpen, Plus, Settings } from "lucide-react";
import { getRepository } from "@/lib/data";
import type { Question } from "@/lib/types";
import { DIFFICULTY_LABEL, TYPE_LABEL } from "@/components/admin/ui";

function countBy(questions: Question[], fn: (q: Question) => string): [string, number][] {
  const acc = new Map<string, number>();
  for (const q of questions) {
    const key = fn(q);
    acc.set(key, (acc.get(key) ?? 0) + 1);
  }
  return [...acc.entries()];
}

function StatChips({ title, entries }: { title: string; entries: [string, number][] }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-500">{title}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {entries.length === 0 && <span className="text-xs text-zinc-400">—</span>}
        {entries.map(([label, count]) => (
          <span
            key={label}
            className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {label}: {count}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const exams = await getRepository().listExams({ includeUnpublished: true });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Examen und Fragen-Pools verwalten — auch unveröffentlichte.
          </p>
        </div>
        <Link
          href="/admin/exams/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Neues Examen
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {exams.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 md:col-span-2 dark:border-zinc-700">
            Noch keine Examen vorhanden.
          </p>
        )}
        {exams.map(({ config, questions }) => {
          const areaName = new Map(config.skillAreas.map((a) => [a.id, a.name]));
          return (
            <div
              key={config.slug}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-brand-100 px-2 py-0.5 font-mono text-sm font-semibold text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  {config.code}
                </span>
                {config.published === false && (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Unveröffentlicht
                  </span>
                )}
                <span className="ml-auto text-sm text-zinc-500">
                  {questions.length} Fragen im Pool
                </span>
              </div>
              <h2 className="mt-2 font-semibold leading-snug">{config.title}</h2>

              <div className="mt-4 space-y-3">
                <StatChips
                  title="Nach Typ"
                  entries={countBy(questions, (q) => TYPE_LABEL[q.type] ?? q.type)}
                />
                <StatChips
                  title="Nach Schwierigkeit"
                  entries={countBy(questions, (q) => DIFFICULTY_LABEL[q.difficulty] ?? q.difficulty)}
                />
                <StatChips
                  title="Nach Skill-Area"
                  entries={countBy(questions, (q) => areaName.get(q.skillArea) ?? q.skillArea)}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={`/admin/exams/${config.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  <FolderOpen className="h-4 w-4" aria-hidden />
                  Öffnen
                </Link>
                <Link
                  href={`/admin/exams/${config.slug}/settings`}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <Settings className="h-4 w-4" aria-hidden />
                  Einstellungen
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
