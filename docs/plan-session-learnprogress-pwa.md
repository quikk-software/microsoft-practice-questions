# Implementierungsplan: Stabile Sessions, Lern-Fortschritt & Offline-PWA

Stand: 2026-07-28 · Status: **Entwurf, noch nicht umgesetzt**

Drei unabhängig lieferbare Phasen. A ist ein Bugfix und sollte zuerst laufen,
B ist Voraussetzung für den Sync in C.

---

## Phase A — Dauerhaft angemeldet bleiben (30 Tage)

### Diagnose

Der Proxy läuft inzwischen auf allen Routen und erneuert die Session korrekt.
Es bleibt aber eine zweite Fehlerquelle, die genau das sporadische Ausloggen
erklärt: **`createSessionClient()` wird auch in Server Components benutzt**
(`app/layout.tsx` bei *jedem* Seitenaufruf, dazu `/my`, `/settings`,
`/admin`, `/reset-password`) und hat `autoRefreshToken` per Default aktiv.

Ablauf im Fehlerfall:

1. Access-Token ist abgelaufen → Proxy refresht, Supabase **rotiert** das
   Refresh-Token, neue Cookies gehen an Request + Response. ✅
2. Danach rendert das Root-Layout und ruft `supabase.auth.getUser()`. Hält der
   Client seinen Token für abgelaufen, startet er **einen zweiten Refresh** —
   in einer Umgebung, die keine Cookies schreiben darf. `setAll()` wirft, wir
   fangen den Fehler still ab: **die neuen Tokens sind weg.**
3. Supabase hat aber bereits erneut rotiert. Beim nächsten Request wird ein
   Refresh-Token gesendet, das serverseitig schon verbraucht ist → Reuse-
   Detection greift → **die gesamte Token-Familie wird invalidiert** → Logout.

Verschärfend: Der Lern-Modus feuert viele parallele API-Requests
(`/api/learn/check`), von denen jeder einen eigenen Session-Client baut.
Gleichzeitige Refresh-Versuche lösen dieselbe Reuse-Detection aus.

### Maßnahmen

1. **Lese-Clients dürfen nicht refreshen.** `createSessionClient()` in zwei
   Varianten aufteilen:
   - `createReadSessionClient()` → `auth: { autoRefreshToken: false, persistSession: false }`
     für alle Server Components und alle Route Handler, die nur `getCurrentUser()`
     brauchen. Der Proxy hat die Cookies unmittelbar vorher aktualisiert, ein
     eigener Refresh ist überflüssig und schädlich.
   - `createWritableSessionClient()` (heutiges Verhalten) nur noch für Routen,
     die bewusst Auth-Aktionen ausführen: `/api/auth/[action]` und
     `/auth/callback`.
   - `SupabaseAuthService.getCurrentUser()` nutzt künftig die Lese-Variante,
     `signIn/signUp/signOut/reset/updatePassword` die schreibende.
2. **Refresh-Fehler nicht mehr verschlucken.** Statt leerem `catch` in `setAll`
   eine Warnung loggen (nur serverseitig), damit so etwas künftig sichtbar ist.
3. **Supabase-Projekteinstellungen prüfen** (Dashboard → Authentication →
   Sessions): „Time-box user sessions" und „Inactivity timeout" müssen leer
   bzw. ≥ 30 Tage sein, sonst beendet Supabase die Session unabhängig vom Code.
   JWT-Expiry (Access-Token) kann bei 1 h bleiben — entscheidend ist das
   Refresh-Token.
4. **Verifikation:** Access-Token-Ablauf simulieren (JWT-Expiry im Dashboard
   testweise auf 60 s), dann über mehrere Minuten Seiten wechseln und parallele
   API-Aufrufe auslösen; die Session muss durchgehend bestehen bleiben.

Aufwand: ~2 h inkl. Test.

---

## Phase B — Lern-Fortschritt geräteübergreifend

Ziel: „Weiter lernen, wo ich aufgehört habe" — auch auf einem anderen Gerät.
Weil die Reihenfolge im Lern-Modus ohnehin zufällig ist, wird **keine
Queue gespeichert**, sondern pro Frage, ob und wie sie beantwortet wurde. Das
ist robuster (Pool kann wachsen) und ermöglicht gezieltes Wiederholen.

### Datenbank (Migration `0004_learn_progress.sql`)

```sql
create table public.learn_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  exam_slug text not null references public.exams (slug) on delete cascade,
  question_id text not null,
  last_score numeric not null,          -- 0..1 (Teilpunkte)
  times_seen int not null default 1,
  times_correct int not null default 0,
  last_answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);
create index learn_progress_user_idx on public.learn_progress (user_id, exam_slug);
alter table public.learn_progress enable row level security;  -- deny-all, nur Service Role
```

### Port & Adapter

`lib/data/port.ts` um drei Methoden erweitern (fs- und Supabase-Adapter):

- `getLearnProgress(userId, examSlugs)` → `LearnProgressEntry[]`
- `recordLearnAnswer(userId, entry)` → Upsert, erhöht `times_seen`/`times_correct`
- `resetLearnProgress(userId, examSlugs?)`

### API

- `GET /api/learn/progress?exams=ab-900,sc-401` → Fortschritt + Kennzahlen
- `POST /api/learn/progress` `{entries: [...]}` → **Batch-Upsert** (wichtig für
  den Offline-Sync in Phase C; einzelne Antworten werden gebündelt gesendet)
- `DELETE /api/learn/progress` `{examSlugs?}` → zurücksetzen
- `POST /api/learn/session` erweitern um `mode: "all" | "open" | "wrong"`:
  bereits richtig beantwortete Fragen weglassen bzw. nur falsche wiederholen.
  Ohne Login unverändert (kein Fortschritt, immer `all`).

### UI

- **Setup-Bildschirm**: Fortschrittsbalken je Examen („142 von 256 beantwortet ·
  118 richtig"), drei Start-Optionen: *Weiter lernen (nur offene)* ·
  *Falsch beantwortete wiederholen* · *Alles neu mischen*; „Fortschritt
  zurücksetzen" mit Rückfrage.
- **Runner**: nach jedem „Antwort prüfen" den Eintrag speichern (debounced,
  gebündelt). Ohne Login weiterhin rein lokal — dann Hinweis, dass Anmelden den
  Fortschritt sichert.
- **`/my`**: Lern-Fortschritt neben dem Prüfungsverlauf anzeigen.

Aufwand: ~1 Tag.

---

## Phase C — Offline-Modus als PWA

### Wichtige Vorab-Entscheidung: Lösungen müssen auf das Gerät

Offline-Bewertung heißt zwangsläufig, dass **Fragen inklusive korrekter
Antworten, Erklärungen und Quellzitate lokal gespeichert** werden. Bisher
strippen wir Lösungen strikt serverseitig. Folgen und Abgrenzung:

- Nur für **angemeldete** Nutzer und **nur für den Lern-Modus** — die
  Prüfungs-Simulation (`/exams/*/practice`) bleibt online-only mit
  serverseitiger Bewertung.
- Der Download ist eine bewusste Aktion („Für Offline-Nutzung herunterladen"),
  kein Automatismus.
- Faktisch bedeutet das: Wer angemeldet ist, kann den kompletten Pool inkl.
  Lösungen extrahieren. Für ein kostenloses Lernwerkzeug mit eigenem Content
  vertretbar — die Entscheidung sollte aber bewusst getroffen werden.

### Technik

1. **Service Worker via Serwist** (`@serwist/next`; der Nachfolger von
   `next-pwa`, das für Next 16 nicht mehr gepflegt wird).
   - Precache: App-Shell, `/lernen`, Icons, Fonts, CSS/JS-Chunks
   - Runtime: `NetworkFirst` für Seiten, `StaleWhileRevalidate` für Assets
   - `/api/**` **nie** cachen (außer dem expliziten Bundle-Download)
   - Offline-Fallback-Seite `/offline`
2. **`manifest.json`** ist vorhanden — ergänzen um `id`, `scope`,
   `theme_color` je Mandant und Screenshots (für den Installations-Dialog).
3. **Offline-Bundle**: neuer Endpoint `GET /api/learn/bundle?exams=…`
   (login-pflichtig) liefert die vollständigen Fragen inkl. Lösungen plus einen
   `version`-Stempel. Speicherung in **IndexedDB** (`idb`-Wrapper), Größe grob
   geschätzt: 256 Fragen ≈ 1–2 MB, unkritisch.
4. **Offline-Bewertung**: `gradeQuestion()` aus `lib/engine.ts` ist bereits eine
   reine Funktion ohne Server-Abhängigkeit → kann direkt im Client laufen. Der
   Runner nutzt online weiterhin `/api/learn/check`, offline die lokale
   Bewertung; die UI bleibt identisch.
5. **Sync-Queue**: Offline beantwortete Fragen landen in einem IndexedDB-Store
   `pending-progress`. Flush bei `online`-Event, beim Öffnen der App und per
   Background Sync (sofern unterstützt), gegen den Batch-Endpoint aus Phase B.
   Konfliktregel: serverseitig gewinnt der jüngere `last_answered_at`,
   `times_seen`/`times_correct` werden addiert.
6. **UI**: Auf `/lernen` eine Offline-Karte mit Status („256 Fragen verfügbar,
   Stand von heute 14:20"), Buttons *Herunterladen* / *Aktualisieren* /
   *Löschen*, dazu ein Offline-Banner im Runner. KI-Erklärungen sind offline
   deaktiviert (mit Hinweis) — sie brauchen zwingend Netz.
7. **Installierbarkeit**: „Zum Startbildschirm hinzufügen"-Hinweis, wenn das
   `beforeinstallprompt`-Event verfügbar ist (Android/Desktop; iOS nur manuell
   über „Teilen → Zum Home-Bildschirm").

### Fallstricke

- `public/sw.js` (Rest aus dem Favicon-Generator) vor dem Einbau löschen,
  sonst kollidiert sie mit dem generierten Service Worker.
- Service Worker nur in Produktion registrieren, sonst behindert er die
  Dev-Entwicklung (Serwist macht das per Default richtig).
- Auth-Cookies niemals cachen; bei Logout IndexedDB-Bundle löschen.
- Nach Deploys muss der SW zuverlässig aktualisieren (`skipWaiting` +
  Update-Hinweis in der UI), sonst hängen Nutzer auf einer alten Version fest.

Aufwand: ~1,5–2 Tage.

---

## Reihenfolge & Abhängigkeiten

1. **A** (Bugfix, sofort) — unabhängig
2. **B** (Fortschritt) — braucht A nicht zwingend, profitiert aber davon
3. **C** (Offline) — setzt den Batch-Endpoint aus B voraus

## Offene Fragen an den Betreiber

1. Offline-Bundle mit Lösungen: bewusst freigeben? (siehe Vorab-Entscheidung)
2. Soll der Lern-Fortschritt auch **ohne Login** lokal erhalten bleiben
   (localStorage), oder bleibt das ein reines Anmelde-Feature?
3. Reichen die drei Start-Optionen (offen / falsch / alles), oder soll später
   ein echtes Spaced-Repetition-Intervall dazukommen?
