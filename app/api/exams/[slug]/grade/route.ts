import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { getAuthService } from "@/lib/auth";
import { gradeExam } from "@/lib/engine";
import type { Answer } from "@/lib/types";

interface GradeRequest {
  questionIds: string[];
  answers: Record<string, Answer | null>;
}

// POST /api/exams/[slug]/grade
// Bewertet die abgegebenen Antworten serverseitig und liefert das volle Ergebnis
// inkl. Lösungen und statischer Erklärungen für den Review.
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const exam = await getRepository().getExam(slug);
  if (!exam) {
    return NextResponse.json({ error: "Exam not found" }, { status: 404 });
  }

  const body = (await req.json()) as GradeRequest;
  if (!Array.isArray(body.questionIds) || typeof body.answers !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const byId = new Map(exam.questions.map((q) => [q.id, q]));
  const questions = body.questionIds
    .map((id) => byId.get(id))
    .filter((q): q is NonNullable<typeof q> => q != null);

  const result = gradeExam(exam.config, questions, body.answers ?? {});

  // Verlauf speichern, falls eingeloggt (Üben bleibt auch ohne Login möglich)
  const user = await getAuthService().getCurrentUser();
  if (user) {
    await getRepository()
      .saveAttempt({
        userId: user.id,
        examSlug: slug,
        scaledScore: result.scaledScore,
        maxScore: result.maxScore,
        passScore: result.passScore,
        passed: result.passed,
        perSkillArea: result.perSkillArea,
      })
      .catch(() => {
        // Verlauf ist Komfort — Grading-Antwort nicht daran scheitern lassen
      });
  }

  return NextResponse.json(result);
}
