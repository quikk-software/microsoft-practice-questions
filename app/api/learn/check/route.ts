import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { gradeQuestion } from "@/lib/engine";
import { matchGlossary } from "@/lib/glossary";
import type { Answer } from "@/lib/types";

// POST /api/learn/check
// Wie /api/exams/[slug]/check, nur examen-übergreifend (der Lern-Modus mischt
// Fragen mehrerer Examen, deshalb kommt der Slug pro Frage mit).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    examSlug?: string;
    questionId?: string;
    answer?: Answer | null;
  };
  if (!body.examSlug || !body.questionId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const exam = await getRepository().getExam(body.examSlug);
  const question = exam?.questions.find((q) => q.id === body.questionId);
  if (!exam || !question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const score = gradeQuestion(question, body.answer ?? null);
  return NextResponse.json({
    score,
    correct: score === 1,
    question,
    glossary: matchGlossary(question, exam.config.glossary),
  });
}
