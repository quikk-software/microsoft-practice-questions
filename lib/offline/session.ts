"use client";

// Offline-Kenntnis über den Anmeldestatus.
//
// Problem: Seiten werden serverseitig gerendert; der Anmeldestatus steckt fest
// im HTML. Offline liefert der Service Worker einen zwischengespeicherten
// Snapshot — der kann "nicht angemeldet" zeigen, obwohl der Nutzer ein Konto
// hat und die Fragen längst heruntergeladen sind.
//
// Deshalb merken wir uns clientseitig, dass jemand angemeldet war, und nutzen
// das offline als Ersatz. Die Session-Cookies selbst bleiben unangetastet —
// dieser Marker steuert ausschließlich die Darstellung und das lokale Lernen.

const KEY = "offline-session";

export interface CachedSession {
  email: string;
  /** Zeitpunkt der letzten bestätigten Anmeldung (ISO) */
  seenAt: string;
}

export function markSignedIn(email: string): void {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ email, seenAt: new Date().toISOString() })
    );
  } catch {
    // localStorage kann blockiert sein — dann eben ohne Offline-Komfort
  }
}

export function getCachedSession(): CachedSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CachedSession) : null;
  } catch {
    return null;
  }
}

export function clearCachedSession(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignorieren
  }
}

/** Fortschritt lokal spiegeln, damit "weiter lernen" auch offline funktioniert. */
const PROGRESS_KEY = "offline-progress";

export interface CachedProgressEntry {
  examSlug: string;
  questionId: string;
  lastScore: number;
}

export function cacheProgress(entries: CachedProgressEntry[]): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(entries));
  } catch {
    // ignorieren
  }
}

export function getCachedProgress(): CachedProgressEntry[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as CachedProgressEntry[]) : [];
  } catch {
    return [];
  }
}

/**
 * Zwei Fortschritts-Stände zusammenführen. Nötig, weil der Server hinterher
 * hinken kann (offline beantwortete Fragen hängen noch in der Sync-Queue) —
 * ein leerer Server-Stand darf den lokalen nicht auslöschen. Bei Dopplungen
 * gewinnt der zuerst übergebene Stand.
 */
export function mergeProgress(
  preferred: CachedProgressEntry[],
  fallback: CachedProgressEntry[]
): CachedProgressEntry[] {
  const byId = new Map(fallback.map((e) => [e.questionId, e]));
  for (const entry of preferred) byId.set(entry.questionId, entry);
  return [...byId.values()];
}

/** Laufende Lern-Sitzung, damit ein Neustart nicht neu mischt. */
const LEARN_SESSION_KEY = "learn-session";

export interface CachedLearnSession {
  /** Reihenfolge der Fragen (ohne Lösungen — die kommen vom Server oder aus IndexedDB) */
  questions: unknown[];
  answers: Record<string, unknown>;
  checks: Record<string, unknown>;
  index: number;
  mode: string;
  usingOffline: boolean;
  savedAt: string;
}

export function saveLearnSession(session: CachedLearnSession): void {
  try {
    localStorage.setItem(LEARN_SESSION_KEY, JSON.stringify(session));
  } catch {
    // Bei vollem Speicher lieber ohne das bereits gegebene Feedback sichern
    // (das ist der große Teil) als die Sitzung ganz zu verlieren.
    try {
      localStorage.setItem(
        LEARN_SESSION_KEY,
        JSON.stringify({ ...session, checks: {} })
      );
    } catch {
      // dann eben ohne Fortsetzen
    }
  }
}

export function getLearnSession(): CachedLearnSession | null {
  try {
    const raw = localStorage.getItem(LEARN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedLearnSession;
    return Array.isArray(parsed.questions) && parsed.questions.length > 0
      ? parsed
      : null;
  } catch {
    return null;
  }
}

export function clearLearnSession(): void {
  try {
    localStorage.removeItem(LEARN_SESSION_KEY);
  } catch {
    // ignorieren
  }
}
