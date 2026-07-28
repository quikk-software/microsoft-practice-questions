import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getRepository } from "@/lib/data";
import { QuestionEditor } from "@/components/admin/QuestionEditor";
import { isQuestionType, newQuestion } from "@/components/admin/questionSkeleton";
import { TYPE_LABEL } from "@/components/admin/ui";

export default async function NewQuestionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { slug } = await params;
  const { type } = await searchParams;
  const exam = await getRepository().getExam(slug, { includeUnpublished: true });
  if (!exam) notFound();

  const requested = Array.isArray(type) ? type[0] : type;
  const questionType = isQuestionType(requested) ? requested : "single-choice";
  const initial = newQuestion(questionType, exam.config);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <Link
        href={`/admin/exams/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Fragen-Liste {exam.config.code}
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Neue Frage · {TYPE_LABEL[questionType]}
      </h1>
      <div className="mt-6">
        <QuestionEditor slug={slug} config={exam.config} initial={initial} isNew />
      </div>
    </main>
  );
}
