"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DownloadCloud, Loader2, Sparkles } from "lucide-react";
import {
  btnPrimary,
  cardClass,
  errorBoxClass,
  inputClass,
  labelClass,
  successBoxClass,
} from "./ui";

interface IngestResult {
  units: number;
  modules: number;
  moduleTitles?: string[];
  warnings?: string[];
}

interface EmbedResult {
  units: number;
  chunks: number;
  model: string;
}

export function ContentIngest({ slug }: { slug: string }) {
  const router = useRouter();
  const [uids, setUids] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<IngestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const learningPaths = uids
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  async function start() {
    setError(null);
    setResult(null);
    if (learningPaths.length === 0) {
      setError("Mindestens eine Learning-Path-UID angeben (eine pro Zeile).");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/exams/${encodeURIComponent(slug)}/ingest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learningPaths }),
      });
      const body = (await res.json().catch(() => null)) as
        | (IngestResult & { error?: string })
        | null;
      if (!res.ok || !body) {
        setError(body?.error ?? `Ingest fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      setResult(body);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Netzwerkfehler beim Ingest");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-sm font-semibold">Ingest von Microsoft Learn</h2>
      <label className={labelClass}>Learning-Path-UIDs (eine pro Zeile)</label>
      <textarea
        className={`${inputClass} min-h-24 font-mono`}
        placeholder={"learn.wwl.explore-microsoft-365-administration"}
        value={uids}
        onChange={(e) => setUids(e.target.value)}
      />
      <button
        type="button"
        className={`${btnPrimary} mt-3`}
        disabled={busy}
        onClick={start}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <DownloadCloud className="h-4 w-4" aria-hidden />
        )}
        {busy ? "Ingest läuft — das kann einige Minuten dauern …" : "Ingest starten"}
      </button>

      <EmbedButton slug={slug} disabled={busy} />

      {error && <div className={`${errorBoxClass} mt-4`}>{error}</div>}
      {result && (
        <div className={`${successBoxClass} mt-4`}>
          <p className="font-semibold">
            {result.units} Units aus {result.modules} Modulen importiert.
          </p>
          {result.moduleTitles && result.moduleTitles.length > 0 && (
            <ul className="mt-1 list-inside list-disc">
              {result.moduleTitles.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          {result.warnings && result.warnings.length > 0 && (
            <div className="mt-2 text-amber-800 dark:text-amber-300">
              <p className="font-semibold">Hinweise:</p>
              <ul className="list-inside list-disc">
                {result.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/** Erzeugt die RAG-Embeddings für die gespeicherten Lerninhalte (pgvector bzw. embeddings.json). */
function EmbedButton({ slug, disabled }: { slug: string; disabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<EmbedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const res = await fetch(
        `/api/admin/exams/${encodeURIComponent(slug)}/embed`,
        { method: "POST" }
      );
      const body = (await res.json().catch(() => null)) as
        | (EmbedResult & { error?: string })
        | null;
      if (!res.ok || !body) {
        setError(body?.error ?? `Embedding fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      setResult(body);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Netzwerkfehler beim Embedding");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
      <h3 className="mb-1 text-sm font-semibold">RAG-Embeddings</h3>
      <p className="mb-3 text-xs text-zinc-500">
        Nach jedem Ingest einmal ausführen — chunked die Lerninhalte und erzeugt
        die Embeddings für Quellen-Retrieval bei AI-Erklärungen.
      </p>
      <button
        type="button"
        className={btnPrimary}
        disabled={busy || disabled}
        onClick={start}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        {busy ? "Embeddings werden erzeugt …" : "Embeddings erzeugen"}
      </button>
      {error && <div className={`${errorBoxClass} mt-3`}>{error}</div>}
      {result && (
        <div className={`${successBoxClass} mt-3`}>
          {result.chunks} Chunks aus {result.units} Units embedded ({result.model}).
        </div>
      )}
    </div>
  );
}
