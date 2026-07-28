import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { guardRole } from "../../../guard";

// GET /api/admin/exams/[slug]/export
// Komplettes ExamBundle (Config + alle Fragen inkl. Lösungen) als JSON-Download.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug } = await params;
  const exam = await getRepository().getExam(slug, { includeUnpublished: true });
  if (!exam) {
    return NextResponse.json({ error: "Examen nicht gefunden" }, { status: 404 });
  }

  return new NextResponse(JSON.stringify(exam, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}-bundle.json"`,
    },
  });
}
