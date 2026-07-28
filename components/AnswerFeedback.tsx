"use client";

import { useState } from "react";
import { BookOpen, ExternalLink, Sparkles } from "lucide-react";
import type { Answer, Question } from "@/lib/types";

/**
 * Gemeinsames Feedback-Panel für eine bewertete Frage:
 * Richtig/Teilweise/Falsch-Banner, Antwort-Vergleich, Erklärung,
 * wörtliches Quellzitat und AI-Erklärung (Streaming).
 * Genutzt im Sofort-Feedback (PracticeRunner) und im End-Review (ResultView).
 */
export function AnswerFeedback({
  slug,
  question,
  answer,
  score,
  showBanner = true,
}: {
  slug: string;
  question: Question;
  answer: Answer | null;
  score: number;
  showBanner?: boolean;
}) {
  const partial = score > 0 && score < 1;
  const correct = score === 1;

  return (
    <div className="text-sm">
      {showBanner && (
        <div
          className={`rounded-lg border px-4 py-3 font-semibold ${
            correct
              ? "border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
              : partial
                ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                : "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {correct
            ? "✅ Richtig!"
            : partial
              ? `🟠 Teilweise richtig (${Math.round(score * 100)} %)`
              : "❌ Leider falsch"}
        </div>
      )}

      <div className="mt-3">
        <CorrectAnswerView question={question} answer={answer} />
      </div>

      <p className="mt-4 rounded-lg bg-zinc-100 p-3 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
        💡 {question.explanation}
      </p>

      {question.source?.quote && (
        <blockquote className="mt-3 border-l-4 border-brand-300 bg-brand-50/60 p-3 text-xs italic leading-relaxed text-zinc-700 dark:border-brand-800 dark:bg-brand-950/30 dark:text-zinc-300">
          „…{question.source.quote}…“
          <span className="mt-1 block not-italic text-zinc-500">
            — {question.source.title}
          </span>
        </blockquote>
      )}

      <div className="mt-2 flex flex-wrap gap-3">
        {question.source && (
          <a
            href={question.source.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            Lerninhalt: {question.source.title}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
        {question.reference && question.reference !== question.source?.url && (
          <a
            href={question.reference}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
          >
            Microsoft Learn Referenz
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        )}
      </div>

      <AiExplanation slug={slug} questionId={question.id} answer={answer} />
    </div>
  );
}

export function CorrectAnswerView({
  question: q,
  answer,
}: {
  question: Question;
  answer: Answer | null;
}) {
  const row = (label: string, user: string, correct: string, ok: boolean) => (
    <div key={label} className="flex flex-col gap-0.5 py-1.5">
      <span className="text-xs text-zinc-500">{label}</span>
      <span
        className={
          ok
            ? "text-green-700 dark:text-green-400"
            : "text-red-700 dark:text-red-400"
        }
      >
        Deine Antwort: {user || "—"}
      </span>
      {!ok && (
        <span className="text-green-700 dark:text-green-400">
          Richtig: {correct}
        </span>
      )}
    </div>
  );

  switch (q.type) {
    case "single-choice": {
      const text = (id: string | null) =>
        q.options.find((o) => o.id === id)?.text ?? "";
      const user = typeof answer === "string" ? answer : null;
      return row(q.topic, text(user), text(q.correct), user === q.correct);
    }
    case "multiple-choice": {
      const chosen = new Set(Array.isArray(answer) ? (answer as string[]) : []);
      const text = (ids: Iterable<string>) =>
        [...ids]
          .map((id) => q.options.find((o) => o.id === id)?.text ?? "")
          .join(" · ");
      const ok =
        chosen.size === q.correct.length &&
        q.correct.every((id) => chosen.has(id));
      return row(q.topic, text(chosen), text(q.correct), ok);
    }
    case "yes-no": {
      const a = (answer ?? {}) as Record<string, boolean>;
      return (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {q.statements.map((s) =>
            row(
              s.text,
              a[s.id] === undefined ? "" : a[s.id] ? "Ja" : "Nein",
              s.correct ? "Ja" : "Nein",
              a[s.id] === s.correct
            )
          )}
        </div>
      );
    }
    case "ordering": {
      const user = Array.isArray(answer) ? (answer as string[]) : [];
      const text = (ids: string[]) =>
        ids.map((id) => q.items.find((i) => i.id === id)?.text ?? "").join(" → ");
      const ok =
        user.length === q.correctOrder.length &&
        q.correctOrder.every((id, i) => user[i] === id);
      return row(q.topic, text(user), text(q.correctOrder), ok);
    }
    case "matching": {
      const a = (answer ?? {}) as Record<string, string>;
      const rightText = (id?: string) =>
        q.right.find((r) => r.id === id)?.text ?? "";
      return (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {q.left.map((l) =>
            row(
              l.text,
              rightText(a[l.id]),
              rightText(q.correct[l.id]),
              a[l.id] === q.correct[l.id]
            )
          )}
        </div>
      );
    }
    case "dropdown": {
      const a = (answer ?? {}) as Record<string, string>;
      const optText = (b: (typeof q.blanks)[number], id?: string) =>
        b.options.find((o) => o.id === id)?.text ?? "";
      return (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {q.blanks.map((b, i) =>
            row(
              `Lücke ${i + 1}`,
              optText(b, a[b.id]),
              optText(b, b.correct),
              a[b.id] === b.correct
            )
          )}
        </div>
      );
    }
  }
}

interface ExplainSource {
  title: string;
  heading: string | null;
  url: string;
  moduleTitle: string;
  excerpt?: string;
}

export function AiExplanation({
  slug,
  questionId,
  answer,
}: {
  slug: string;
  questionId: string;
  answer: Answer | null;
}) {
  const [text, setText] = useState("");
  const [sources, setSources] = useState<ExplainSource[]>([]);
  const [state, setState] = useState<"idle" | "streaming" | "done" | "error">(
    "idle"
  );

  const explain = async () => {
    setState("streaming");
    setText("");
    setSources([]);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examSlug: slug, questionId, answer }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const encoded = res.headers.get("x-sources");
      if (encoded) {
        try {
          setSources(JSON.parse(atob(encoded)) as ExplainSource[]);
        } catch {
          // Quellen sind optional
        }
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setText((prev) => prev + decoder.decode(value, { stream: true }));
      }
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="mt-4">
      {state === "idle" && (
        <button
          onClick={explain}
          className="inline-flex items-center gap-2 rounded-lg border border-brand-300 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 transition hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-300"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Von AI erklären lassen
        </button>
      )}
      {state === "error" && (
        <p className="text-sm text-red-600">
          Erklärung fehlgeschlagen — ist der <code>OPENAI_API_KEY</code> in{" "}
          <code>.env.local</code> gesetzt?{" "}
          <button onClick={explain} className="underline">
            Erneut versuchen
          </button>
        </p>
      )}
      {(state === "streaming" || state === "done") && (
        <div className="rounded-lg border border-brand-200 bg-brand-50/60 p-4 text-sm leading-relaxed dark:border-brand-900 dark:bg-brand-950/30">
          <CitedText
            text={text}
            sources={sources}
            streaming={state === "streaming"}
          />
          {sources.length > 0 && state === "done" && (
            <div className="mt-3 border-t border-brand-200 pt-3 dark:border-brand-900">
              <p className="mb-1 text-xs font-semibold text-brand-800 dark:text-brand-300">
                Quellen (Microsoft Learn):
              </p>
              <ul className="space-y-1">
                {sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
                    >
                      <span className="font-mono">[Q{i + 1}]</span> {s.title}
                      {s.heading ? ` — ${s.heading}` : ""}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface Citation {
  n: number;
  source: number;
  quote: string;
}

const TAIL_RE = /\n?-{3,}\s*QUELLEN\s*-{3,}/i;

/**
 * Rendert den Erklärungstext mit klickbaren Zitations-Chips [1], [2], …
 * Hinter jedem Chip liegt das wörtliche Text-Snippet aus dem Lerninhalt,
 * das die jeweilige Aussage belegt (vom Modell im ---QUELLEN----Anhang geliefert).
 */
function CitedText({
  text,
  sources,
  streaming,
}: {
  text: string;
  sources: ExplainSource[];
  streaming: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);

  // Anhang abtrennen (auch während des Streamings, sobald der Marker auftaucht)
  const splitIdx = text.search(TAIL_RE);
  const visible = splitIdx >= 0 ? text.slice(0, splitIdx).trimEnd() : text;
  const tail = splitIdx >= 0 ? text.slice(splitIdx).replace(TAIL_RE, "") : "";

  let citations: Citation[] = [];
  if (tail.trim()) {
    try {
      const cleaned = tail
        .trim()
        .replace(/^```(?:json)?/, "")
        .replace(/```$/, "");
      const parsed: unknown = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        citations = parsed.filter(
          (c): c is Citation =>
            typeof c === "object" &&
            c !== null &&
            typeof (c as Citation).n === "number" &&
            typeof (c as Citation).quote === "string"
        );
      }
    } catch {
      // Anhang noch unvollständig (Streaming) oder nicht parsebar — Chips
      // fallen dann auf den Quellen-Auszug zurück.
    }
  }
  const byN = new Map(citations.map((c) => [c.n, c]));

  const activeCitation = active != null ? (byN.get(active) ?? null) : null;
  const activeSource =
    active != null
      ? (sources[(activeCitation ? activeCitation.source : active) - 1] ?? null)
      : null;
  const activeSnippet = activeCitation?.quote ?? activeSource?.excerpt ?? null;

  const parts = visible.split(/(\[\d+\])/g);

  return (
    <div>
      <div className="whitespace-pre-wrap">
        {parts.map((part, i) => {
          const m = part.match(/^\[(\d+)\]$/);
          if (!m) return <span key={i}>{part}</span>;
          const n = Number(m[1]);
          return (
            <button
              key={i}
              onClick={() => setActive(active === n ? null : n)}
              title="Beleg aus dem Lerninhalt anzeigen"
              aria-expanded={active === n}
              className={`mx-0.5 inline-flex -translate-y-1 items-center justify-center rounded px-1 font-mono text-[10px] font-bold leading-4 transition ${
                active === n
                  ? "bg-brand-600 text-white"
                  : "bg-brand-200 text-brand-900 hover:bg-brand-300 dark:bg-brand-900 dark:text-brand-200 dark:hover:bg-brand-800"
              }`}
            >
              {n}
            </button>
          );
        })}
        {streaming && <span className="animate-pulse">▍</span>}
      </div>

      {active != null && (
        <div className="mt-3 rounded-lg border border-brand-300 bg-white p-3 text-xs dark:border-brand-800 dark:bg-zinc-900">
          <p className="mb-1 font-semibold text-brand-800 dark:text-brand-300">
            Beleg [{active}]
          </p>
          {activeSnippet ? (
            <blockquote className="italic leading-relaxed text-zinc-700 dark:text-zinc-300">
              „…{activeSnippet}…“
            </blockquote>
          ) : (
            <p className="text-zinc-500">
              {streaming
                ? "Beleg wird noch geladen …"
                : "Für diesen Marker wurde kein Beleg geliefert."}
            </p>
          )}
          {activeSource && (
            <a
              href={activeSource.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-brand-600 hover:underline dark:text-brand-400"
            >
              {activeSource.title}
              {activeSource.heading ? ` — ${activeSource.heading}` : ""}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
