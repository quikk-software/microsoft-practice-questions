import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getRepository } from "@/lib/data";
import { QuestionEditor } from "@/components/admin/QuestionEditor";
import { TYPE_LABEL } from "@/components/admin/ui";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug, { includeUnpublished: true });
  if (!exam) notFound();
  const question = await repo.getQuestion(slug, decodeURIComponent(id));
  if (!question) notFound();

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
        Frage bearbeiten ·{" "}
        <span className="font-mono text-xl text-zinc-500">{question.id}</span>
      </h1>
      <p className="mt-1 text-sm text-zinc-500">{TYPE_LABEL[question.type]}</p>
      <div className="mt-6">
        <QuestionEditor slug={slug} config={exam.config} initial={question} isNew={false} />
      </div>
    </main>
  );
}
