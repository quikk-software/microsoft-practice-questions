# Microsoft Practice Exams

Kostenlose Test-Examen für Microsoft-Zertifizierungen (aktuell: **AB-900 – Copilot and Agent Administration Fundamentals**) mit realistischen Fragetypen, Schwierigkeitskurve und AI-Erklärungen.

## Features

- **Realistische Fragetypen** wie im echten Examen: Single Choice, Multiple Choice, Ja/Nein-Serien, Reihenfolge (Build List), Zuordnung (Drag-and-Drop-Äquivalent), Satzergänzung (Dropdown)
- **Schwierigkeitskurve**: 40 Fragen pro Test, zufällig aus dem Pool gezogen — leichte zuerst, schwere später; Verteilung über die Skill-Bereiche folgt den offiziellen Gewichtungen des Study Guides
- **Microsoft-Scoring**: 1000-Punkte-Skala, bestanden ab 700, Auswertung pro Skill-Bereich
- **AI-Erklärungen**: Jede Antwort kann per AI erklärt werden (Vercel AI SDK + OpenAI, Streaming) — warum richtig, warum die Distraktoren falsch sind, plus Merksatz und wörtlichem Quellen-Beleg
- **Mandantenfähig**: Jedes Examen ist ein eigener Ordner mit eigenem Fragen-Pool — neue Examen ohne Code-Änderung hinzufügbar

## Setup

```bash
npm install
cp .env.local.example .env.local   # OPENAI_API_KEY eintragen (Erklärungen + Embeddings)
npm run dev
```

## Content-Pipeline (RAG)

Die Lerninhalte werden direkt von Microsoft Learn geladen und lokal gespeichert:

```bash
npm run ingest -- ab-900   # Learning Paths aus sources.json crawlen -> data/exams/ab-900/content/*.md
npm run embed -- ab-900    # Chunks + Embeddings erzeugen -> embeddings.json (braucht OPENAI_API_KEY)
```

- `data/exams/<slug>/sources.json` listet die Learning-Path-UIDs (Learn Catalog API)
- Jede Content-Datei trägt Frontmatter mit Titel + Quell-URL
- Die AI-Erklärung macht Retrieval über die Embeddings (top-4) und **belegt jede Aussage mit klickbaren Zitations-Chips `[n]`** — dahinter liegt das wörtliche Text-Snippet aus dem Lerninhalt plus Link zur Unit. Ohne `OPENAI_API_KEY`/Embeddings funktioniert die Erklärung trotzdem — nur ohne Belege.
- Speicherort der Embeddings folgt dem Daten-Treiber: `DATA_DRIVER=supabase` → Tabelle `content_chunks` (pgvector, Suche per `match_content_chunks`-RPC); `fs` → `embeddings.json`. Erzeugen wahlweise per CLI (`npm run embed -- <slug>`) oder im Admin unter Lerninhalte → „Embeddings erzeugen".
- Embedding-Modell: OpenAI `text-embedding-3-small` (in `lib/rag.ts`/`scripts/embed.mjs` austauschbar, z. B. gegen Voyage)

## Neues Examen hinzufügen

```
data/exams/<slug>/
├── exam.json          # Konfiguration: Titel, Skill-Areas + Gewichte, Bestehensgrenze, difficultyCurve
└── questions/
    ├── <beliebig>.json  # Array von Fragen (Question[]), beliebig viele Dateien
    └── ...
```

Fragetypen und Felder: siehe [lib/types.ts](lib/types.ts). Jede Frage braucht `id`, `type`, `skillArea` (muss zu einer Area in `exam.json` passen), `difficulty` (`easy`/`medium`/`hard`), `prompt`, `explanation` und die typspezifischen Lösungsfelder.

## Auth & Admin (Ports & Adapters)

Die App spricht nur eigene Interfaces ([lib/data/port.ts](lib/data/port.ts), [lib/auth/port.ts](lib/auth/port.ts)); Treiber per ENV:

- `DATA_DRIVER=fs` (Default, JSON-Dateien) oder `supabase` · `AUTH_DRIVER=none` (Default) oder `supabase`
- Spätere Wechsel (z. B. Microsoft Dataverse / Entra ID) = neue Adapter, kein App-Umbau. Details: [docs/plan-auth-admin.md](docs/plan-auth-admin.md)

**Supabase aktivieren:**

1. Supabase-Projekt anlegen, [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) im SQL-Editor ausführen
2. Keys in `.env.local` eintragen (siehe `.env.local.example`), `DATA_DRIVER=supabase`, `AUTH_DRIVER=supabase`
3. `npm run seed` — importiert die JSON-Daten (Examen, Fragen, Content, ggf. Embeddings)
4. Registrieren, dann in Supabase: `update public.profiles set role = 'admin' where email = '...';`

**Rollen:** `user` (üben + Verlauf unter `/my`), `editor` (Lernmaterialien pflegen), `admin` (+ Examen/Löschen). Üben geht auch ohne Login.

**Admin-Bereich** (`/admin`): Examen-CRUD, Fragen-Editor für alle 6 Typen mit Live-Preview und Zod-Validierung, Content-Ingest per Button, JSON-Export/Import. Lokal ohne Supabase testbar mit `DEV_FAKE_ROLE=admin` (nur development).

## Architektur

- **Next.js App Router** (Next 16), Serverless Functions als Route Handlers
- `POST /api/exams/[slug]/session` — zieht ein Examen aus dem Pool (Lösungen werden serverseitig entfernt)
- `POST /api/exams/[slug]/grade` — bewertet serverseitig, Teilpunkte bei zusammengesetzten Fragen
- `POST /api/explain` — streamt eine AI-Erklärung (Vercel AI SDK + `@ai-sdk/openai`, Modell per `OPENAI_EXPLAIN_MODEL` übersteuerbar)
