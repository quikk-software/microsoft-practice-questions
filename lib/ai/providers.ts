import "server-only";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import type { LanguageModel } from "ai";

// BYOK-Provider-Registry (Vercel AI SDK).
// Neuer Anbieter = ein Eintrag: Provider-Factory + Live-Modell-Liste.
// listModels dient gleichzeitig als Key-Validierung.

export interface ModelInfo {
  id: string;
  label: string;
}

export interface ProviderDef {
  id: string;
  label: string;
  keyPlaceholder: string;
  createModel(model: string, apiKey: string): LanguageModel;
  listModels(apiKey: string): Promise<ModelInfo[]>;
}

async function fetchJson(
  url: string,
  headers: Record<string, string>
): Promise<unknown> {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(
      res.status === 401 || res.status === 403
        ? "Der API-Key wurde vom Anbieter abgelehnt."
        : `Modell-Liste konnte nicht geladen werden (HTTP ${res.status}).`
    );
  }
  return res.json();
}

interface ModelListResponse {
  data?: { id: string; display_name?: string; created?: number; created_at?: string }[];
}

const EXCLUDE_OPENAI =
  /embed|whisper|tts|audio|dall-e|image|moderation|realtime|transcribe|search|babbage|davinci|codex/i;

export const PROVIDERS: ProviderDef[] = [
  {
    id: "openai",
    label: "OpenAI",
    keyPlaceholder: "sk-…",
    createModel: (model, apiKey) => createOpenAI({ apiKey })(model),
    async listModels(apiKey) {
      const json = (await fetchJson("https://api.openai.com/v1/models", {
        Authorization: `Bearer ${apiKey}`,
      })) as ModelListResponse;
      return (json.data ?? [])
        .filter(
          (m) =>
            /^(gpt-|o\d|chatgpt)/i.test(m.id) && !EXCLUDE_OPENAI.test(m.id)
        )
        .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
        .map((m) => ({ id: m.id, label: m.id }));
    },
  },
  {
    id: "anthropic",
    label: "Anthropic",
    keyPlaceholder: "sk-ant-…",
    createModel: (model, apiKey) => createAnthropic({ apiKey })(model),
    async listModels(apiKey) {
      const json = (await fetchJson("https://api.anthropic.com/v1/models?limit=100", {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      })) as ModelListResponse;
      return (json.data ?? []).map((m) => ({
        id: m.id,
        label: m.display_name ?? m.id,
      }));
    },
  },
  {
    id: "mistral",
    label: "Mistral",
    keyPlaceholder: "…",
    createModel: (model, apiKey) => createMistral({ apiKey })(model),
    async listModels(apiKey) {
      const json = (await fetchJson("https://api.mistral.ai/v1/models", {
        Authorization: `Bearer ${apiKey}`,
      })) as ModelListResponse;
      const seen = new Set<string>();
      return (json.data ?? [])
        .filter((m) => !/embed|moderation|ocr/i.test(m.id))
        .filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
        .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
        .map((m) => ({ id: m.id, label: m.id }));
    },
  },
];

export function getProvider(id: string): ProviderDef | null {
  return PROVIDERS.find((p) => p.id === id) ?? null;
}

/** Für die UI: Provider-Liste ohne Server-Funktionen */
export function providerOptions(): { id: string; label: string; keyPlaceholder: string }[] {
  return PROVIDERS.map(({ id, label, keyPlaceholder }) => ({
    id,
    label,
    keyPlaceholder,
  }));
}
