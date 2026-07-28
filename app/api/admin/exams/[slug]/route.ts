import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { safeParseExamConfig } from "@/lib/validation";
import { guardRole } from "../../guard";

// PUT /api/admin/exams/[slug] — ExamConfig anlegen/aktualisieren (Rolle editor)
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request-Body ist kein gültiges JSON" }, { status: 400 });
  }

  const result = safeParseExamConfig(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen", issues: result.issues },
      { status: 400 }
    );
  }
  if (result.data.slug !== slug) {
    return NextResponse.json(
      {
        error: "Validierung fehlgeschlagen",
        issues: [{ path: "slug", message: "slug im Body muss zur URL passen" }],
      },
      { status: 400 }
    );
  }

  await getRepository().upsertExam(result.data);
  return NextResponse.json({ ok: true, config: result.data });
}

// DELETE /api/admin/exams/[slug] — komplettes Examen löschen (nur Rolle admin)
export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("admin");
  if (denied) return denied;

  const { slug } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug, { includeUnpublished: true });
  if (!exam) {
    return NextResponse.json({ error: "Examen nicht gefunden" }, { status: 404 });
  }
  await repo.deleteExam(slug);
  return NextResponse.json({ ok: true });
}
