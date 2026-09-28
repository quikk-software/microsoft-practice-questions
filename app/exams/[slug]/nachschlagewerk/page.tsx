import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getRepository } from "@/lib/data";
import { Compendium, CompendiumToc, tableOfContents } from "@/components/Compendium";

// Nachschlagewerk zu einem Examen: die Lerninhalte als zusammenhängende,
// strukturierte Übersicht (Markdown aus data/exams/<slug>/compendium.md).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  if (!exam?.config.compendium) return { title: "Nachschlagewerk nicht gefunden" };
  const title = `${exam.config.code} Nachschlagewerk — ${exam.config.title}`;
  return {
    title,
    description: `Die Lerninhalte zur ${exam.config.code} als zusammenhängende Übersicht: Architektur, Begriffe und Zusammenhänge zum Nachschlagen.`,
    alternates: { canonical: `/exams/${slug}/nachschlagewerk` },
  };
}

export default async function CompendiumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  const compendium = exam?.config.compendium;
  if (!exam || !compendium) notFound();
  const { config } = exam;
  const toc = tableOfContents(compendium);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <Link
        href={`/exams/${config.slug}`}
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Zurück zu {config.code}
      </Link>

      <div className="mt-8 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-4">
          <CompendiumToc entries={toc} />
        </aside>
        <article className="min-w-0">
          <Compendium markdown={compendium} />
        </article>
      </div>
    </main>
  );
}
