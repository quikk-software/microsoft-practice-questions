import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { gradeQuestion } from "@/lib/engine";
import { matchGlossary } from "@/lib/glossary";
import type { Answer } from "@/lib/types";

interface CheckRequest {
  questionId: string;
  answer: Answer | null;
}

// POST /api/exams/[slug]/check
// Bewertet EINE Frage sofort und gibt erst jetzt die volle Frage
// (inkl. Lösung, Erklärung, Quellzitat und passendem Glossar) an den Client zurück.
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = (await req.json()) as CheckRequest;
  const exam = await getRepository().getExam(slug);
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
