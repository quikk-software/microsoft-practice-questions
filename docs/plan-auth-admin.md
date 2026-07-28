# Implementierungsplan: Authentication & Admin-Bereich

Stand: 2026-07-27 · Status: **in Umsetzung**

Entschieden (Joyce, 2026-07-27): Üben bleibt ohne Login möglich · Supabase-Default-SMTP reicht · Prüfungs-Verlauf (`attempts`) wird direkt mitgebaut.

## Ziele

1. **Authentication**: Registrierung + Login mit E-Mail/Passwort (inkl. Bestätigung & Passwort-Reset)
2. **Admin-Bereich** mit Rollen: Erstellung/Pflege von Lernmaterialien (Examen, Fragen, Content) pro Kurs
3. **Austauschbarkeit**: Supabase als Start-Backend, aber Architektur so, dass Datenhaltung (→ z. B. Microsoft Dataverse) und Identity (→ z. B. Microsoft Entra ID) später per Adapter getauscht werden können. OAuth 2/OIDC als gemeinsamer Nenner, Endpunkte konfigurierbar.

## Leitprinzip: Ports & Adapters

Die App spricht nie direkt mit Supabase, sondern nur mit zwei eigenen Interfaces. Supabase ist jeweils nur die erste Implementierung:

```
                    ┌──────────────────────┐
  App (Pages, API)  │  lib/auth/port.ts    │  AuthService-Interface
        ──────────▶ │  lib/data/port.ts    │  Repository-Interfaces
                    └─────────┬────────────┘
                              │ ENV: AUTH_DRIVER / DATA_DRIVER
              ┌───────────────┼────────────────────┐
              ▼               ▼                    ▼
      SupabaseAuth      SupabaseRepo         FsRepo (heute!)
      (Phase 2)         (Phase 1)            (bleibt für Dev/Seed)
              ▼               ▼
      später: EntraID   später: Dataverse
      (OIDC, MSAL)      (Dataverse Web API)
```

- **`lib/data/port.ts`** — `ExamRepository`, `QuestionRepository`, `ContentRepository`, `EmbeddingRepository`. Die heutige JSON-Datei-Logik (`lib/exams.ts`) wird zum `FsRepository` umgebaut — sie bleibt als Dev-/Seed-Modus erhalten (`DATA_DRIVER=fs`).
- **`lib/auth/port.ts`** — `AuthService` mit `getCurrentUser()`, `signUp()`, `signInWithPassword()`, `signOut()`, `resetPassword()`, `requireRole(role)`. Rückgabetyp ist ein eigenes `AppUser`-Objekt (`id`, `email`, `role`) — nie das Supabase-User-Objekt direkt.
- **OAuth 2/OIDC**: Supabase Auth ist OIDC-kompatibel (JWT, Refresh-Tokens, OAuth-Provider einhängbar). Der spätere Entra-Wechsel hat zwei Stufen: (a) Entra als zusätzlicher OAuth-Provider *in* Supabase (nur Konfiguration), (b) kompletter Tausch des Auth-Adapters gegen MSAL/OIDC (Code nur in `lib/auth/supabase.ts` → `lib/auth/entra.ts`).
- **Konfigurierbare Endpunkte**: alle URLs/Keys ausschließlich über ENV (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `AUTH_DRIVER`, `DATA_DRIVER`, `OPENAI_BASE_URL` optional). Keine Hardcodings.

## Warum die Daten in eine DB müssen

Aktuell liegen Fragen/Content als JSON/Markdown im Repo. Ein Admin-Bereich, der Materialien **bearbeitet**, kann auf Vercel nicht ins Dateisystem schreiben (read-only). Daher wandern die Daten nach Supabase Postgres; die bestehenden Dateien werden per Seed-Skript importiert und bleiben als Fixtures/Export-Format erhalten.

## Datenmodell (Postgres / Supabase)

```sql
-- Identity
profiles (
  id uuid PK -> auth.users,
  email text,
  role text CHECK (role IN ('user','editor','admin')) DEFAULT 'user',
  created_at timestamptz
)

-- Kurse/Examen (Mandanten)
exams (
  slug text PK, code text, title text, description text,
  question_count int, duration_minutes int, pass_score int, max_score int,
  skill_areas jsonb,        -- [{id,name,weight}]
  difficulty_curve jsonb,   -- {easy,medium,hard}
  published boolean DEFAULT false,
  created_at, updated_at
)

-- Fragen-Pool
questions (
  id text PK, exam_slug FK -> exams,
  type text, skill_area text, topic text, difficulty text,
  prompt text, explanation text, reference text,
  payload jsonb,            -- typspezifisch: options/correct/statements/…
  source jsonb,             -- {title,url,quote}
  status text CHECK (status IN ('draft','published')) DEFAULT 'published',
  created_by uuid, created_at, updated_at
)

-- Ingested Lerninhalte
content_units (
  uid text PK, exam_slug FK,
  module_slug text, module_title text, title text, url text,
  markdown text, position int, ingested_at
)

-- RAG (ersetzt embeddings.json; Supabase hat pgvector)
content_chunks (
  id text PK, exam_slug FK, unit_uid FK -> content_units,
  heading text, text text,
  embedding vector(1536)    -- text-embedding-3-small
)
```

**Row Level Security** (zweite Verteidigungslinie neben den Server-Checks):
- `exams`/`questions`/`content_*`: SELECT für alle (bzw. `published`), INSERT/UPDATE/DELETE nur `role IN ('editor','admin')`
- `profiles`: SELECT self; UPDATE `role` nur `admin`
- Wichtig: `questions.payload` enthält Lösungen → der Practice-Client bekommt weiterhin nur die per Server gestrippten Fragen (bestehende `stripAnswers`-Logik bleibt; RLS schützt zusätzlich vor direktem Tabellenzugriff mit Anon-Key)

## Rollen

| Rolle | Rechte |
|---|---|
| `user` | Prüfungen absolvieren (Standard nach Registrierung) |
| `editor` | Lernmaterialien pflegen (Fragen, Content) |
| `admin` | wie editor + Examen anlegen/löschen, Rollen verwalten |

Rolle wird beim Login in die Session/JWT-Claims gemappt (`AppUser.role`). Erster Admin wird per Seed/SQL gesetzt.

## Phasen

### Phase 1 — Daten-Port & Supabase-Grundlage (~½ Tag)
- Supabase-Projekt, `@supabase/supabase-js` + `@supabase/ssr`
- Migrations als SQL-Dateien in `supabase/migrations/` (versioniert im Repo)
- `lib/data/port.ts` + `FsRepository` (Refactor von `lib/exams.ts`, verhaltensgleich) + `SupabaseRepository`
- `scripts/seed.mjs`: importiert bestehende `exam.json`/`questions/*.json`/`content/*.md` nach Supabase
- Umschalter `DATA_DRIVER=fs|supabase`; alle bestehenden Routen auf den Port umgestellt
- **Akzeptanz**: App läuft unverändert in beiden Modi

### Phase 2 — Authentication (~½–1 Tag)
- Supabase Auth (E-Mail/Passwort, E-Mail-Bestätigung, Passwort-Reset — alles built-in)
- `lib/auth/port.ts` + `SupabaseAuthService`; Session-Handling über `@supabase/ssr`-Cookies
- Seiten: `/login`, `/register`, `/reset-password` (+ Bestätigungs-Callback `/auth/callback`)
- `middleware.ts`: schützt `/admin/**` (Login + Rolle), Practice bleibt öffentlich
- `profiles`-Trigger: bei Signup automatisch Profil mit `role='user'`
- **Akzeptanz**: Registrieren → bestätigen → einloggen → `/admin` nur mit Rolle sichtbar

### Phase 3 — Admin-Bereich (~1–2 Tage)
- `/admin` Dashboard: Kurse mit Pool-Statistiken
- `/admin/exams` CRUD: Examen anlegen/bearbeiten (Skill-Areas, Gewichte, Kurve, publish)
- `/admin/exams/[slug]/questions`: Liste (Filter nach Typ/Schwierigkeit/Area/Status), Editor pro Fragetyp mit Zod-Validierung (Spiegel von `scripts/validate.mjs`) und **Live-Preview** (rendert `QuestionView`), Quell-Zitat-Feld mit Verbatim-Check gegen Content
- `/admin/exams/[slug]/content`: Learning-Path-UIDs pflegen (`sources`), Ingest & Re-Embed als Server-Aktionen mit Fortschritt (heutige Scripts werden zu serverseitigen Jobs; CLI bleibt als Alternative)
- JSON-Import/Export (kompatibel zum heutigen Dateiformat → Roundtrip mit `FsRepository`)
- **Akzeptanz**: Frage im Admin anlegen → erscheint (nach publish) im gezogenen Examen

### Phase 4 — RAG auf pgvector ✅ (umgesetzt 2026-07-28)
- Chunk-Methoden im Daten-Port (`replaceContentChunks`/`searchContentChunks`/`hasContentChunks`); Supabase via `match_content_chunks`-RPC, fs via `embeddings.json`
- `lib/rag.ts` adapter-agnostisch; Chunking geteilt in `lib/chunking.ts`
- Admin: „Embeddings erzeugen"-Button auf der Lerninhalte-Seite; CLI `npm run embed` schreibt je nach Treiber nach Supabase oder Datei
- Zusätzlich (Joyce-Wunsch): AI-Erklärungen belegen jede Aussage mit Zitations-Chips `[n]` → wörtliches Snippet + Quell-Link (Protokoll: `---QUELLEN---`-JSON-Anhang, UI parst und versteckt ihn)

### Phase 5 — Vorbereiteter Austausch (Doku, kein Code)
- `docs/adapter-guide.md`: Was ein `DataverseRepository` (Dataverse Web API, OAuth2 Client Credentials) und ein `EntraAuthService` (OIDC Authorization Code + PKCE via MSAL) implementieren müssen
- Checkliste: keine Supabase-Typen außerhalb der Adapter, keine RLS-Abhängigkeit in Geschäftslogik (Server prüft Rollen immer selbst), IDs/Slugs backend-neutral

## Ergebnis-Historie (Bonus, klein)
Sobald Auth da ist, fast geschenkt: `attempts`-Tabelle (user_id, exam_slug, score, per_area jsonb, answers jsonb, created_at) → „Meine Prüfungen"-Seite mit Verlauf. Kann in Phase 3 mitgenommen werden.

## Offene Entscheidungen
1. Muss man für das Üben eingeloggt sein? (Vorschlag: nein — öffentlich üben, Login nur für Verlauf/Admin)
2. E-Mail-Versand: Supabase-Default-SMTP reicht zum Start; eigener SMTP (z. B. Resend) für Produktion
3. `editor`-Rolle von Anfang an oder erst mal nur `user`/`admin`? (Vorschlag: Spalte + Checks direkt einbauen, UI erst bei Bedarf)
