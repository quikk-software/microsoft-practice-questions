import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { safeParseQuestion, type ValidationIssue } from "@/lib/validation";
import { guardRole } from "../../../guard";

interface ImportFailure {
  id: string;
  issues: ValidationIssue[];
}

// POST /api/admin/exams/[slug]/import
// JSON-Array von Fragen validieren + upserten. Antwort: Report ok/fehlerhaft je id.
export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const { slug } = await params;
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
  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "Erwartet: JSON-Array von Fragen" },
      { status: 400 }
    );
  }

  const ok: string[] = [];
  const failed: ImportFailure[] = [];

  for (const [index, item] of body.entries()) {
    const rawId =
      typeof item === "object" && item !== null && "id" in item
        ? String((item as { id: unknown }).id)
        : `#${index}`;
    const result = safeParseQuestion(exam.config, item);
    if (!result.ok) {
      failed.push({ id: rawId, issues: result.issues });
      continue;
    }
    await repo.upsertQuestion(slug, result.data);
    ok.push(result.data.id);
  }

  return NextResponse.json({
    total: body.length,
    imported: ok.length,
    ok,
    failed,
  });
}
