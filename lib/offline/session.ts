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
