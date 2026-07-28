import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import { decryptApiKey } from "@/lib/ai/crypto";
import { getProvider } from "@/lib/ai/providers";

// Live-Modell-Liste eines Anbieters — immer aktuell direkt von der Provider-API.
// Nutzt den mitgeschickten Key (Eingabe-Feld) oder den gespeicherten des Users.
// Dient gleichzeitig als Key-Test in der Settings-UI.

export async function POST(req: Request) {
  const user = await getAuthService().getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Bitte zuerst anmelden.", code: "unauthenticated" },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    provider?: string;
    apiKey?: string;
  };
  const provider = getProvider(body.provider ?? "");
  if (!provider) {
    return NextResponse.json(
      { error: "Unbekannter Anbieter.", code: "invalid-provider" },
      { status: 400 }
    );
  }

  let apiKey = body.apiKey?.trim();
  if (!apiKey) {
    // Gespeicherten Key nutzen; DB-Fehler (z. B. fehlende Migration) hier nicht
    // fatal werden lassen — dann greift unten "missing-key".
    const settings = await getRepository()
      .getAiSettings(user.id)
      .catch(() => null);
    if (settings && settings.provider === provider.id) {
      apiKey = decryptApiKey(settings.apiKeyEncrypted);
    }
  }
  if (!apiKey) {
    return NextResponse.json(
      { error: "Kein API-Key vorhanden.", code: "missing-key" },
      { status: 400 }
    );
  }

  try {
    const models = await provider.listModels(apiKey);
    return NextResponse.json({ models });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Modell-Liste fehlgeschlagen.",
        code: "invalid-key",
      },
      { status: 400 }
    );
  }
}
