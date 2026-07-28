import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ExamConfigForm } from "@/components/admin/ExamConfigForm";

export default function NewExamPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Neues Examen</h1>
      <div className="mt-6">
        <ExamConfigForm isNew />
      </div>
    </main>
  );
}
