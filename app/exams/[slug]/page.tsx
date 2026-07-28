import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getRepository } from "@/lib/data";

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  if (!exam) notFound();

  const { config, questions } = exam;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Alle Examen
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span className="rounded bg-brand-100 px-2 py-0.5 font-mono text-sm font-semibold text-brand-800 dark:bg-brand-950 dark:text-brand-300">
          {config.code}
        </span>
      </div>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">{config.title}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {config.description}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Fragen pro Test", value: String(config.questionCount) },
          { label: "Zeit", value: `${config.durationMinutes} min` },
          { label: "Bestehensgrenze", value: `${config.passScore}/${config.maxScore}` },
          { label: "Fragen im Pool", value: String(questions.length) },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="text-xl font-bold">{s.value}</div>
            <div className="mt-1 text-xs text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Skill-Bereiche</h2>
      <ul className="mt-3 space-y-2">
        {config.skillAreas.map((area) => {
          const count = questions.filter((q) => q.skillArea === area.id).length;
          return (
            <li
              key={area.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span>{area.name}</span>
              <span className="ml-4 shrink-0 text-zinc-500">
                ~{Math.round(area.weight * 100)} % · {count} Fragen
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Link
          href={`/exams/${config.slug}/practice`}
          className="inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-brand-700"
        >
          Test-Examen starten ({config.questionCount} Fragen)
        </Link>
      </div>
    </main>
  );
}
