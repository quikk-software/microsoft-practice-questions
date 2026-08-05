import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";

// Lern-Fortschritt (nur mit Login). Wird pro geprüfter Antwort gebündelt
// gespeichert und ermöglicht "weiter lernen" auch auf einem anderen Gerät.

async function requireUser() {
  const user = await getAuthService().getCurrentUser();
  if (!user) {
    return {
      user: null,
      denied: NextResponse.json(
        { error: "Bitte zuerst anmelden.", code: "unauthenticated" },
        { status: 401 }
      ),
    };
  }
  return { user, denied: null };
}

export async function GET(req: Request) {
  const { user, denied } = await requireUser();
  if (denied) return denied;

  const examSlugs = new URL(req.url).searchParams
    .get("exams")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const entries = await getRepository().getLearnProgress(user.id, examSlugs);
    return NextResponse.json({ entries });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Fortschritt nicht lesbar",
        code: "server-error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { user, denied } = await requireUser();
  if (denied) return denied;

  const body = (await req.json().catch(() => ({}))) as {
    entries?: { examSlug: string; questionId: string; score: number }[];
  };
  const entries = (body.entries ?? []).filter(
    (e) =>
      typeof e?.examSlug === "string" &&
      typeof e?.questionId === "string" &&
      typeof e?.score === "number"
  );
  if (entries.length === 0) {
    return NextResponse.json({ ok: true, saved: 0 });
  }

  try {
    await getRepository().recordLearnAnswers(user.id, entries);
    return NextResponse.json({ ok: true, saved: entries.length });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Speichern fehlgeschlagen",
        code: "server-error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { user, denied } = await requireUser();
  if (denied) return denied;

  const body = (await req.json().catch(() => ({}))) as { examSlugs?: string[] };
  try {
    await getRepository().resetLearnProgress(user.id, body.examSlugs);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Zurücksetzen fehlgeschlagen",
        code: "server-error",
      },
      { status: 500 }
    );
  }
}
