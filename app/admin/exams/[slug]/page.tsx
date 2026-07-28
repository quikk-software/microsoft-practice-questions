import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ChevronLeft, Settings } from "lucide-react";
import { getRepository } from "@/lib/data";
import { QuestionTable } from "@/components/admin/QuestionTable";

export default async function AdminExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug, { includeUnpublished: true });
  if (!exam) notFound();
  const { config, questions } = exam;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded bg-brand-100 px-2 py-0.5 font-mono text-sm font-semibold text-brand-800 dark:bg-brand-950 dark:text-brand-300">
          {config.code}
        </span>
        {config.published === false && (
          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            Unveröffentlicht
          </span>
        )}
        <div className="ml-auto flex gap-2">
          <Link
            href={`/admin/exams/${slug}/content`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Lerninhalte
          </Link>
          <Link
            href={`/admin/exams/${slug}/settings`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Settings className="h-4 w-4" aria-hidden />
            Einstellungen
          </Link>
        </div>
      </div>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">{config.title}</h1>

      <div className="mt-8">
        <QuestionTable slug={slug} config={config} questions={questions} />
      </div>
    </main>
  );
}
