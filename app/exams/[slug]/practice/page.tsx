import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/data";
import { PracticeRunner } from "@/components/PracticeRunner";

// Laufende Prüfungs-Sessions sollen nicht im Index landen
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  return {
    title: exam ? `${exam.config.code} Test-Examen üben` : "Test-Examen üben",
    robots: { index: false },
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  if (!exam) notFound();

  return <PracticeRunner slug={slug} examCode={exam.config.code} />;
}
