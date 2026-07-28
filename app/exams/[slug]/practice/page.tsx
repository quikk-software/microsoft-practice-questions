import { notFound } from "next/navigation";
import { getRepository } from "@/lib/data";
import { PracticeRunner } from "@/components/PracticeRunner";

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
