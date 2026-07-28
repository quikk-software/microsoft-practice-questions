import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { AuthError } from "@/lib/auth/port";

// POST /api/auth/[action] — einziger Auth-Zugang für die Client-UI.
// action ∈ login | register | logout | reset | update-password
// Body: { email?, password? } — so bleibt der Auth-Treiber (Port) austauschbar.

interface AuthBody {
  email?: string;
  password?: string;
}

/** Fehlercodes, die als 401 (statt 400) beantwortet werden. */
const UNAUTHORIZED_CODES = new Set([
  "invalid-credentials",
  "email-not-confirmed",
]);

function badRequest(message: string, code = "invalid-request") {
  return NextResponse.json({ error: message, code }, { status: 400 });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ action: string }> }
) {
  const { action } = await params;

  let body: AuthBody = {};
  try {
    body = (await req.json()) as AuthBody;
  } catch {
    // Leerer Body ist z. B. für logout in Ordnung.
  }
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const auth = getAuthService();

  try {
    switch (action) {
      case "login": {
        if (!email || !password) {
          return badRequest("E-Mail und Passwort sind erforderlich.");
        }
        const user = await auth.signInWithPassword(email, password);
        return NextResponse.json({ ok: true, user });
      }
      case "register": {
        if (!email || !password) {
          return badRequest("E-Mail und Passwort sind erforderlich.");
        }
        const { needsEmailConfirmation } = await auth.signUp(email, password);
        return NextResponse.json({ ok: true, needsEmailConfirmation });
      }
      case "logout": {
        await auth.signOut();
        return NextResponse.json({ ok: true });
      }
      case "reset": {
        if (!email) {
          return badRequest("E-Mail ist erforderlich.");
        }
        await auth.requestPasswordReset(email);
        return NextResponse.json({ ok: true });
      }
      case "update-password": {
        if (!password) {
          return badRequest("Passwort ist erforderlich.");
        }
        await auth.updatePassword(password);
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json(
          { error: "Unbekannte Aktion", code: "unknown-action" },
          { status: 404 }
        );
    }
  } catch (err) {
    if (err instanceof AuthError) {
      const status = UNAUTHORIZED_CODES.has(err.code) ? 401 : 400;
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status }
      );
    }
    console.error(`[api/auth/${action}]`, err);
    return NextResponse.json(
      { error: "Interner Fehler", code: "internal-error" },
      { status: 500 }
    );
  }
}
