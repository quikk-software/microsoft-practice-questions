# Implementierungsplan: Bring Your Own Key (BYOK)

Stand: 2026-07-28 · Status: in Umsetzung

## Ziel

Jeder angemeldete User hinterlegt seinen **eigenen AI-Key** (Provider + Modell frei wählbar: OpenAI, Anthropic, Mistral — erweiterbar). AI-Erklärungen laufen auf dem Key des Users, nicht auf dem App-Key. Ohne Login oder ohne hinterlegten Key: keine AI-Erklärung (mit klarer Aufforderung). Die Modell-Auswahl pro Anbieter wird **live von der Provider-API** geladen — dadurch immer aktuell und gleichzeitig Key-Validierung.

## Sicherheit / Key-Handling

- Keys werden **verschlüsselt at rest** gespeichert: AES-256-GCM, Schlüssel aus ENV `AI_KEY_ENCRYPTION_SECRET` (32-Byte-Ableitung via SHA-256), Format `base64(iv | authTag | ciphertext)` — `lib/ai/crypto.ts`
- Der Klartext-Key verlässt den Server nie wieder: API liefert nur einen **Hint** (`sk-…abcd`, letzte 4 Zeichen)
- Kein Fallback auf den App-Key für Erklärungen (Kosten bleiben beim User); der App-`OPENAI_API_KEY` wird nur noch für RAG-Query-Embeddings (Cent-Bruchteile) und Admin-Embeddings genutzt
- RLS: `ai_settings` hat keine Policies (deny-all für Anon/User-Tokens) — Zugriff ausschließlich serverseitig über Service-Role, Autorisierung in den Routen

## Datenbank (Migration `0002_ai_settings.sql` — im SQL Editor ausführen!)

```sql
create table public.ai_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  provider text not null,
  model text not null,
  api_key_encrypted text not null,
  api_key_hint text not null,
  updated_at timestamptz not null default now()
);
alter table public.ai_settings enable row level security; -- keine Policies = deny all
```

Fs-Treiber (Dev): `data/ai-settings/<userId>.json` (gitignored).

## Backend

- **Port** (`lib/data/port.ts`): `getAiSettings(userId)`, `saveAiSettings(userId, record)`, `deleteAiSettings(userId)` mit `AiSettingsRecord {provider, model, apiKeyEncrypted, apiKeyHint}` — Fs- + Supabase-Adapter
- **Provider-Registry** (`lib/ai/providers.ts`): pro Anbieter `createModel(model, apiKey)` (AI-SDK-Provider-Factories) und `listModels(apiKey)` (Live-Fetch: OpenAI `/v1/models`, Anthropic `/v1/models`, Mistral `/v1/models`; gefiltert auf Chat-Modelle, absteigend sortiert). Neuer Anbieter = ein Eintrag in der Registry.
- **Routen** (alle login-pflichtig):
  - `GET /api/ai/settings` → `{provider, model, apiKeyHint} | null`
  - `PUT /api/ai/settings` `{provider, model, apiKey?}` → Key validieren (listModels-Call), verschlüsseln, speichern; ohne `apiKey` bleibt der gespeicherte Key erhalten (nur Provider/Modell-Wechsel)
  - `DELETE /api/ai/settings`
  - `POST /api/ai/models` `{provider, apiKey?}` → Live-Modell-Liste (nutzt mitgeschickten oder gespeicherten Key)
- **Explain-Route**: 401 ohne Login · 428 `no-ai-settings` ohne Key · sonst `streamText` mit dem entschlüsselten User-Key und dessen Provider/Modell. Status-Event „generate“ nennt Provider/Modell.

## Frontend

- **`/settings`** (login-pflichtig, auch im Proxy-Matcher): Provider-Auswahl, Key-Eingabe (Passwortfeld, zeigt gespeicherten Hint), „Modelle laden“ (= Key-Test) → Modell-Select mit Live-Liste, Speichern/Entfernen
- **Header**: „AI-Setup“-Link für eingeloggte User
- **AI-Erklärung** (`AnswerFeedback`): Fehlercodes gemappt — nicht angemeldet → Login-Link, kein Key → Link zu `/settings`

## Offene Punkte / Notizen

- Migration 0002 muss manuell im Supabase SQL Editor laufen (wie 0001)
- `AI_KEY_ENCRYPTION_SECRET` in `.env.local` nötig (Beispiel-Datei ergänzt); Rotation invalidiert gespeicherte Keys (User tragen neu ein)
- Query-Embedding beim RAG bleibt auf App-Key (kein User-Provider bietet einheitliche Embeddings; Kosten ~0,00002 $/Frage)
