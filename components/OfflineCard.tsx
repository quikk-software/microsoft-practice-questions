"use client";

import { useCallback, useEffect, useState } from "react";
import { CloudDownload, CloudOff, Loader2, RefreshCw, Trash2 } from "lucide-react";
import {
  clearBundle,
  loadBundle,
  saveBundle,
  syncPendingAnswers,
  takePendingAnswers,
  type OfflineBundle,
} from "@/lib/offline/db";

// Offline-Verwaltung für den Lern-Modus: Fragen herunterladen, aktualisieren,
// löschen. Zeigt außerdem, ob noch Antworten auf die Synchronisierung warten.

export function OfflineCard({
  examSlugs,
  signedIn,
  onBundleChange,
}: {
  examSlugs: string[];
  signedIn: boolean;
  onBundleChange?: (bundle: OfflineBundle | null) => void;
}) {
  const [bundle, setBundle] = useState<OfflineBundle | null>(null);
  const [pending, setPending] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState(true);

  const refreshState = useCallback(async () => {
    const stored = await loadBundle();
    setBundle(stored);
    onBundleChange?.(stored);
    setPending((await takePendingAnswers()).length);
  }, [onBundleChange]);

  useEffect(() => {
    // Initialer Zustand + Sync-Versuch; setState folgt erst nach await/Event
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOnline(navigator.onLine);
    void refreshState();

    const goOnline = async () => {
      setOnline(true);
      const synced = await syncPendingAnswers();
      if (synced > 0) void refreshState();
    };
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    // Beim Öffnen ebenfalls versuchen zu synchronisieren
    void goOnline();
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [refreshState]);

  async function download() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/learn/bundle?exams=${encodeURIComponent(examSlugs.join(","))}`
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(body?.error ?? `Download fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      const data = (await res.json()) as {
        version: string;
        exams: OfflineBundle["exams"];
        totalQuestions: number;
      };
      const saved = await saveBundle(data);
      setBundle(saved);
      onBundleChange?.(saved);
    } catch {
      setError("Download fehlgeschlagen — bist du online?");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Offline gespeicherte Fragen löschen?")) return;
    await clearBundle();
    setBundle(null);
    onBundleChange?.(null);
  }

  // Sichtbar, sobald ein Konto bekannt ist ODER lokal Fragen liegen — offline
  // darf der (zwischengespeicherte) Anmeldestatus die Karte nicht verstecken.
  if (!signedIn && !bundle) return null;

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        {online ? (
          <CloudDownload className="h-4 w-4" aria-hidden />
        ) : (
          <CloudOff className="h-4 w-4 text-amber-600" aria-hidden />
        )}
        Offline lernen
      </h2>

      {bundle ? (
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {bundle.totalQuestions} Fragen verfügbar · Stand{" "}
          {new Date(bundle.downloadedAt).toLocaleString("de-DE", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      ) : (
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Lade die Fragen einmalig herunter, um auch ohne Internet weiterlernen
          zu können. Antworten werden lokal gespeichert und später
          synchronisiert.
        </p>
      )}

      {!online && (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Du bist offline. KI-Erklärungen sind nicht verfügbar.
        </p>
      )}
      {pending > 0 && (
        <p className="mt-2 text-xs text-zinc-500">
          {pending} Antwort(en) warten auf die Synchronisierung.
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={download}
          disabled={busy || !online}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:border-zinc-400 disabled:opacity-40 dark:border-zinc-700"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : bundle ? (
            <RefreshCw className="h-4 w-4" aria-hidden />
          ) : (
            <CloudDownload className="h-4 w-4" aria-hidden />
          )}
          {bundle ? "Aktualisieren" : "Für Offline-Nutzung herunterladen"}
        </button>
        {bundle && (
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Löschen
          </button>
        )}
      </div>
    </section>
  );
}
