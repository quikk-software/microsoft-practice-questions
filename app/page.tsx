import Link from "next/link";
import { getRepository } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const exams = await getRepository().listExams();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        Microsoft Practice Exams
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Kostenlose Test-Examen mit realistischen Fragetypen, Schwierigkeitskurve
        und AI-Erklärungen für jede Antwort.
      </p>

      <div className="mt-10 grid gap-4">
        {exams.map(({ config, questions }) => {
          const byDiff = {
            easy: questions.filter((q) => q.difficulty === "easy").length,
            medium: questions.filter((q) => q.difficulty === "medium").length,
            hard: questions.filter((q) => q.difficulty === "hard").length,
          };
          return (
            <Link
              key={config.slug}
              href={`/exams/${config.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-brand-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="rounded bg-brand-100 px-2 py-0.5 font-mono text-sm font-semibold text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  {config.code}
                </span>
                <span className="text-sm text-zinc-500">
                  {questions.length} Fragen im Pool
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-400">
                {config.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {config.description}
              </p>
            </Link>
          );
        })}
        {exams.length === 0 && (
          <p className="text-zinc-500">
            Noch keine Examen vorhanden. Lege einen Ordner unter{" "}
            <code>data/exams/&lt;slug&gt;/</code> an.
          </p>
        )}
      </div>
    </main>
  );
}
