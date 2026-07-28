"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, KeyRound, Loader2, RefreshCw, Trash2 } from "lucide-react";

interface ProviderOption {
  id: string;
  label: string;
  keyPlaceholder: string;
}

interface ModelInfo {
  id: string;
  label: string;
}

interface Initial {
  provider: string;
  model: string;
  apiKeyHint: string;
}

export function AiSettingsForm({
  providers,
  initial,
}: {
  providers: ProviderOption[];
  initial: Initial | null;
}) {
  const router = useRouter();
  const [provider, setProvider] = useState(initial?.provider ?? providers[0]?.id ?? "");
  const [apiKey, setApiKey] = useState("");
  const [models, setModels] = useState<ModelInfo[]>(
    initial ? [{ id: initial.model, label: initial.model }] : []
  );
  const [model, setModel] = useState(initial?.model ?? "");
  const [savedHint, setSavedHint] = useState(initial?.apiKeyHint ?? null);
  const [savedFor, setSavedFor] = useState(initial?.provider ?? null);
  const [loadingModels, setLoadingModels] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const providerDef = providers.find((p) => p.id === provider);
  const hasStoredKeyForProvider = savedHint != null && savedFor === provider;

  async function loadModels() {
    setMessage(null);
    if (!apiKey.trim() && !hasStoredKeyForProvider) {
      setMessage({ kind: "error", text: "Bitte zuerst einen API-Key eingeben." });
      return;
    }
    setLoadingModels(true);
    try {
      const res = await fetch("/api/ai/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, apiKey: apiKey.trim() || undefined }),
      });
      const body = (await res.json()) as { models?: ModelInfo[]; error?: string };
      if (!res.ok || !body.models) {
        setMessage({ kind: "error", text: body.error ?? "Modell-Liste fehlgeschlagen." });
        return;
      }
      setModels(body.models);
      if (!body.models.some((m) => m.id === model)) {
        setModel(body.models[0]?.id ?? "");
      }
      setMessage({
        kind: "ok",
        text: `Key gültig — ${body.models.length} Modelle geladen (live von ${providerDef?.label}).`,
      });
    } catch {
      setMessage({ kind: "error", text: "Netzwerkfehler beim Laden der Modelle." });
    } finally {
      setLoadingModels(false);
    }
  }

  async function save() {
    setMessage(null);
    if (!model) {
      setMessage({ kind: "error", text: "Bitte ein Modell auswählen (erst „Modelle laden“)." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/ai/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          model,
          apiKey: apiKey.trim() || undefined,
        }),
      });
      const body = (await res.json()) as {
        ok?: boolean;
        apiKeyHint?: string;
        error?: string;
      };
      if (!res.ok || !body.ok) {
        setMessage({ kind: "error", text: body.error ?? "Speichern fehlgeschlagen." });
        return;
      }
      setSavedHint(body.apiKeyHint ?? null);
      setSavedFor(provider);
      setApiKey("");
      setMessage({ kind: "ok", text: "Gespeichert — AI-Erklärungen laufen jetzt über deinen Key." });
      router.refresh();
    } catch {
      setMessage({ kind: "error", text: "Netzwerkfehler beim Speichern." });
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("AI-Einstellungen inkl. gespeichertem Key wirklich löschen?")) return;
    await fetch("/api/ai/settings", { method: "DELETE" });
    setSavedHint(null);
    setSavedFor(null);
    setModels([]);
    setModel("");
    setApiKey("");
    setMessage({ kind: "ok", text: "AI-Einstellungen entfernt." });
    router.refresh();
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <label className="mb-1 block text-xs font-medium text-zinc-500">Anbieter</label>
      <select
        className={inputClass}
        value={provider}
        onChange={(e) => {
          setProvider(e.target.value);
          setModels([]);
          setModel("");
          setMessage(null);
        }}
      >
        {providers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>

      <label className="mb-1 mt-4 block text-xs font-medium text-zinc-500">
        API-Key{" "}
        {hasStoredKeyForProvider && (
          <span className="text-green-700 dark:text-green-400">
            (gespeichert: {savedHint} — leer lassen, um ihn zu behalten)
          </span>
        )}
      </label>
      <div className="flex gap-2">
        <input
          type="password"
          className={inputClass}
          placeholder={providerDef?.keyPlaceholder ?? "API-Key"}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={loadModels}
          disabled={loadingModels}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium disabled:opacity-50 dark:border-zinc-700"
        >
          {loadingModels ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <RefreshCw className="h-4 w-4" aria-hidden />
          )}
          Modelle laden
        </button>
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        „Modelle laden“ prüft den Key direkt beim Anbieter und holt die aktuell
        verfügbaren Modelle.
      </p>

      <label className="mb-1 mt-4 block text-xs font-medium text-zinc-500">Modell</label>
      <select
        className={inputClass}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={models.length === 0}
      >
        {models.length === 0 && <option value="">— erst Modelle laden —</option>}
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>

      {message && (
        <p
          className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
            message.kind === "ok"
              ? "border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
              : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : savedHint ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <KeyRound className="h-4 w-4" aria-hidden />
          )}
          Speichern
        </button>
        {savedHint && (
          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Entfernen
          </button>
        )}
      </div>
    </div>
  );
}
