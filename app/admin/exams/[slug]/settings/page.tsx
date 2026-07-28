import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getRepository } from "@/lib/data";
import { ExamConfigForm } from "@/components/admin/ExamConfigForm";

export default async function ExamSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug, { includeUnpublished: true });
  if (!exam) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href={`/admin/exams/${slug}`}
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Zurück zu {exam.config.code}
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Einstellungen · {exam.config.code}
      </h1>
      <div className="mt-6">
        <ExamConfigForm initial={exam.config} isNew={false} />
      </div>
    </main>
  );
}
