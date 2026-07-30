import type { Metadata } from "next";
import { getRepository } from "@/lib/data";
import { LearnRunner } from "@/components/LearnRunner";
import type { Difficulty } from "@/lib/types";

export const metadata: Metadata = {
  title: "Lern-Modus",
  description:
    "Alle Übungsfragen in zufälliger Reihenfolge — mehrere Examen kombinierbar, Schwierigkeitsstufen frei wählbar.",
  alternates: { canonical: "/lernen" },
};

export const dynamic = "force-dynamic";

export default async function LernenPage() {
  const exams = await getRepository().listExams();

  const options = exams.map(({ config, questions }) => {
    const counts: Record<Difficulty, number> = { easy: 0, medium: 0, hard: 0 };
    for (const q of questions) counts[q.difficulty]++;
    return {
      slug: config.slug,
      code: config.code,
      title: config.title,
      counts,
    };
  });

  return <LearnRunner exams={options} />;
}
