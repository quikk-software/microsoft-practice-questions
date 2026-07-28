import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import { decryptApiKey, encryptApiKey, keyHint } from "@/lib/ai/crypto";
import { getProvider } from "@/lib/ai/providers";

// BYOK-Selbstverwaltung: GET liefert die eigenen Einstellungen (ohne Key),
// PUT speichert Provider/Modell/Key (Key verschlüsselt), DELETE entfernt alles.

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

/** Server-Fehler nie als nackter 500 — immer mit verständlicher Beschreibung. */
function serverError(e: unknown): NextResponse {
  const message = e instanceof Error ? e.message : "Unbekannter Fehler";
  const tableMissing =
    /ai_settings/.test(message) &&
    /could not find|does not exist|schema cache/i.test(message);
  return NextResponse.json(
    {
      error: tableMissing
        ? "Die Tabelle ai_settings fehlt — bitte die Migration supabase/migrations/0002_ai_settings.sql im Supabase SQL Editor ausführen."
        : message,
      code: tableMissing ? "migration-missing" : "server-error",
    },
    { status: 500 }
  );
}

export async function GET() {
  const { user, denied } = await requireUser();
  if (denied) return denied;
  try {
    const settings = await getRepository().getAiSettings(user.id);
    return NextResponse.json(
      settings
        ? {
            provider: settings.provider,
            model: settings.model,
            apiKeyHint: settings.apiKeyHint,
          }
        : null
    );
  } catch (e) {
    return serverError(e);
  }
}

interface PutBody {
  provider?: string;
  model?: string;
  apiKey?: string;
}

export async function PUT(req: Request) {
  const { user, denied } = await requireUser();
  if (denied) return denied;

  const body = (await req.json().catch(() => ({}))) as PutBody;
  const provider = getProvider(body.provider ?? "");
  if (!provider) {
    return NextResponse.json(
      { error: "Unbekannter Anbieter.", code: "invalid-provider" },
      { status: 400 }
    );
  }
  if (!body.model || typeof body.model !== "string") {
    return NextResponse.json(
      { error: "Kein Modell ausgewählt.", code: "invalid-model" },
      { status: 400 }
    );
  }

  const repo = getRepository();
  let plainKey: string;
  try {
    const existing = await repo.getAiSettings(user.id);

    // Key: neu mitgeschickt ODER vorhandenen weiterverwenden (nur bei gleichem Anbieter)
    if (body.apiKey && body.apiKey.trim()) {
      plainKey = body.apiKey.trim();
    } else if (existing && existing.provider === provider.id) {
      plainKey = decryptApiKey(existing.apiKeyEncrypted);
    } else {
      return NextResponse.json(
        { error: "Bitte einen API-Key angeben.", code: "missing-key" },
        { status: 400 }
      );
    }
  } catch (e) {
    return serverError(e);
  }

  // Key-Validierung = Live-Modell-Liste abrufen
  try {
    const models = await provider.listModels(plainKey);
    if (!models.some((m) => m.id === body.model)) {
      return NextResponse.json(
        {
          error: `Modell "${body.model}" ist mit diesem Key nicht verfügbar.`,
          code: "invalid-model",
        },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Key-Prüfung fehlgeschlagen.",
        code: "invalid-key",
      },
      { status: 400 }
    );
  }

  try {
    await repo.saveAiSettings(user.id, {
      provider: provider.id,
      model: body.model,
      apiKeyEncrypted: encryptApiKey(plainKey),
      apiKeyHint: keyHint(plainKey),
    });
  } catch (e) {
    return serverError(e);
  }

  return NextResponse.json({
    ok: true,
    provider: provider.id,
    model: body.model,
    apiKeyHint: keyHint(plainKey),
  });
}

export async function DELETE() {
  const { user, denied } = await requireUser();
  if (denied) return denied;
  try {
    await getRepository().deleteAiSettings(user.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}
