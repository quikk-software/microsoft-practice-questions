import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { gradeQuestion } from "@/lib/engine";
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

  const question = await getRepository().getQuestion(
    body.examSlug,
    body.questionId
  );
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const score = gradeQuestion(question, body.answer ?? null);
  return NextResponse.json({ score, correct: score === 1, question });
}
