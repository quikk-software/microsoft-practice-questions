import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { safeParseQuestion } from "@/lib/validation";
import { guardRole } from "../../../../guard";

// PUT /api/admin/exams/[slug]/questions/[id] — Frage anlegen/aktualisieren (Rolle editor)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug, id } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug, { includeUnpublished: true });
  if (!exam) {
    return NextResponse.json({ error: "Examen nicht gefunden" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request-Body ist kein gültiges JSON" }, { status: 400 });
  }

  const result = safeParseQuestion(exam.config, body);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Validierung fehlgeschlagen", issues: result.issues },
      { status: 400 }
    );
  }
  if (result.data.id !== id) {
    return NextResponse.json(
      {
        error: "Validierung fehlgeschlagen",
        issues: [{ path: "id", message: "id im Body muss zur URL passen" }],
      },
      { status: 400 }
    );
  }

  await repo.upsertQuestion(slug, result.data);
  return NextResponse.json({ ok: true, question: result.data });
}

// DELETE /api/admin/exams/[slug]/questions/[id] — Frage löschen (Rolle editor)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug, id } = await params;
  const repo = getRepository();
  const question = await repo.getQuestion(slug, id);
  if (!question) {
    return NextResponse.json({ error: "Frage nicht gefunden" }, { status: 404 });
  }
  await repo.deleteQuestion(slug, id);
  return NextResponse.json({ ok: true });
}
