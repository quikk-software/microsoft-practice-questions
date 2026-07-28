import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { guardRole } from "../../../guard";

// GET /api/admin/exams/[slug]/questions
// Volle Fragen INKLUSIVE Lösungen/Erklärungen — deshalb nur für Rolle editor+.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug } = await params;
  const exam = await getRepository().getExam(slug, { includeUnpublished: true });
  if (!exam) {
    return NextResponse.json({ error: "Examen nicht gefunden" }, { status: 404 });
  }
  return NextResponse.json({ questions: exam.questions });
}
