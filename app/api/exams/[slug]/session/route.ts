import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { drawExam, stripAnswers } from "@/lib/engine";

// POST /api/exams/[slug]/session
// Zieht ein neues Test-Examen aus dem Pool und liefert die Fragen ohne Lösungen.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  if (!exam) {
    return NextResponse.json({ error: "Exam not found" }, { status: 404 });
  }

  const questions = drawExam(exam.config, exam.questions);
  return NextResponse.json({
    exam: {
      slug: exam.config.slug,
      code: exam.config.code,
      title: exam.config.title,
      durationMinutes: exam.config.durationMinutes,
      passScore: exam.config.passScore,
      maxScore: exam.config.maxScore,
      questionCount: questions.length,
    },
    questions: questions.map(stripAnswers),
  });
}
