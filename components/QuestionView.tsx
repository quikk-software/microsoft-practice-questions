"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { Answer, PublicQuestion, Question } from "@/lib/types";

const DIFFICULTY_BADGE: Record<string, string> = {
  easy: "🟢 leicht",
  medium: "🟡 mittel",
  hard: "🔴 schwer",
};

interface Props {
  question: PublicQuestion;
  answer: Answer | null;
  onChange: (answer: Answer) => void;
  /** Nach dem Prüfen: volle Frage inkl. Lösung -> Inputs gesperrt + grün/rot markiert */
  solution?: Question | null;
}

export function QuestionView({ question, answer, onChange, solution }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500">
        <span>{DIFFICULTY_BADGE[question.difficulty]}</span>
        <span>·</span>
        <span>{question.topic}</span>
      </div>
      <p className="text-lg font-medium leading-relaxed">{question.prompt}</p>
      <div className="mt-6">
        <QuestionBody
          question={question}
          answer={answer}
          onChange={onChange}
          solution={solution}
        />
      </div>
    </div>
  );
}

// Rahmenfarbe für Options-Karten im Feedback-Modus
function feedbackClass(isCorrectOption: boolean, isSelected: boolean): string {
  if (isCorrectOption)
    return "border-green-500 bg-green-50 dark:bg-green-950/40";
  if (isSelected) return "border-red-500 bg-red-50 dark:bg-red-950/40";
  return "border-zinc-200 bg-white opacity-60 dark:border-zinc-800 dark:bg-zinc-900";
}

function QuestionBody({ question, answer, onChange, solution }: Props) {
  const locked = solution != null;

  switch (question.type) {
    case "single-choice": {
      const selected = typeof answer === "string" ? answer : null;
      const correctId =
        solution?.type === "single-choice" ? solution.correct : null;
      return (
        <div className="space-y-2">
          {question.options.map((o) => (
            <label
              key={o.id}
              className={`flex items-start gap-3 rounded-lg border p-3 text-sm transition ${
                locked
                  ? feedbackClass(o.id === correctId, selected === o.id)
                  : selected === o.id
                    ? "cursor-pointer border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                    : "cursor-pointer border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <input
                type="radio"
                className="mt-0.5"
                disabled={locked}
                checked={selected === o.id}
                onChange={() => onChange(o.id)}
              />
              <span className="flex-1">{o.text}</span>
              {locked && o.id === correctId && <span>✅</span>}
              {locked && o.id !== correctId && selected === o.id && (
                <span>❌</span>
              )}
            </label>
          ))}
        </div>
      );
    }

    case "multiple-choice": {
      const selected = new Set(Array.isArray(answer) ? answer : []);
      const correctIds = new Set(
        solution?.type === "multiple-choice" ? solution.correct : []
      );
      const toggle = (id: string) => {
        const next = new Set(selected);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onChange([...next]);
      };
      return (
        <div>
          <p className="mb-3 text-sm italic text-zinc-500">
            Wähle {question.selectCount} Antworten aus.
          </p>
          <div className="space-y-2">
            {question.options.map((o) => (
              <label
                key={o.id}
                className={`flex items-start gap-3 rounded-lg border p-3 text-sm transition ${
                  locked
                    ? feedbackClass(correctIds.has(o.id), selected.has(o.id))
                    : selected.has(o.id)
                      ? "cursor-pointer border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                      : "cursor-pointer border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  disabled={locked}
                  checked={selected.has(o.id)}
                  onChange={() => toggle(o.id)}
                />
                <span className="flex-1">{o.text}</span>
                {locked && correctIds.has(o.id) && <span>✅</span>}
                {locked && !correctIds.has(o.id) && selected.has(o.id) && (
                  <span>❌</span>
                )}
              </label>
            ))}
          </div>
        </div>
      );
    }

    case "yes-no": {
      const values = (answer ?? {}) as Record<string, boolean>;
      const solutionMap = new Map(
        solution?.type === "yes-no"
          ? solution.statements.map((s) => [s.id, s.correct])
          : []
      );
      return (
        <div className="space-y-3">
          {question.statements.map((s) => {
            const correctVal = solutionMap.get(s.id);
            const ok = locked && values[s.id] === correctVal;
            return (
              <div
                key={s.id}
                className={`rounded-lg border p-3 ${
                  locked
                    ? ok
                      ? "border-green-500 bg-green-50 dark:bg-green-950/40"
                      : "border-red-500 bg-red-50 dark:bg-red-950/40"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <p className="text-sm">
                  {s.text}
                  {locked && <span className="ml-2">{ok ? "✅" : "❌"}</span>}
                </p>
                <div className="mt-2 flex gap-4 text-sm">
                  {[
                    { label: "Ja", value: true },
                    { label: "Nein", value: false },
                  ].map((opt) => (
                    <label
                      key={opt.label}
                      className={`flex items-center gap-1.5 ${
                        locked ? "" : "cursor-pointer"
                      } ${
                        locked && correctVal === opt.value
                          ? "font-semibold text-green-700 dark:text-green-400"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        disabled={locked}
                        checked={values[s.id] === opt.value}
                        onChange={() =>
                          onChange({ ...values, [s.id]: opt.value })
                        }
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    case "ordering": {
      const order = Array.isArray(answer)
        ? (answer as string[])
        : question.items.map((i) => i.id);
      const byId = new Map(question.items.map((i) => [i.id, i]));
      const correctOrder =
        solution?.type === "ordering" ? solution.correctOrder : null;
      const move = (index: number, dir: -1 | 1) => {
        const next = [...order];
        const target = index + dir;
        if (target < 0 || target >= next.length) return;
        [next[index], next[target]] = [next[target], next[index]];
        onChange(next);
      };
      return (
        <div>
          {!locked && (
            <p className="mb-3 text-sm italic text-zinc-500">
              Bringe die Schritte mit ↑/↓ in die richtige Reihenfolge.
            </p>
          )}
          <ol className="space-y-2">
            {order.map((id, i) => {
              const ok = correctOrder ? correctOrder[i] === id : null;
              return (
                <li
                  key={id}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-sm ${
                    locked
                      ? ok
                        ? "border-green-500 bg-green-50 dark:bg-green-950/40"
                        : "border-red-500 bg-red-50 dark:bg-red-950/40"
                      : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <span className="w-5 shrink-0 text-center font-mono text-zinc-400">
                    {i + 1}
                  </span>
                  <span className="flex-1">{byId.get(id)?.text}</span>
                  {locked ? (
                    <span>{ok ? "✅" : "❌"}</span>
                  ) : (
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label="Nach oben"
                        className="rounded border border-zinc-300 px-2 py-1 disabled:opacity-30 dark:border-zinc-700"
                      >
                        <ChevronUp className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === order.length - 1}
                        aria-label="Nach unten"
                        className="rounded border border-zinc-300 px-2 py-1 disabled:opacity-30 dark:border-zinc-700"
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      );
    }

    case "matching": {
      const values = (answer ?? {}) as Record<string, string>;
      const correctMap =
        solution?.type === "matching" ? solution.correct : null;
      return (
        <div className="space-y-3">
          {question.left.map((l) => {
            const ok = correctMap ? values[l.id] === correctMap[l.id] : null;
            return (
              <div
                key={l.id}
                className={`flex flex-col gap-2 rounded-lg border p-3 text-sm sm:flex-row sm:items-center ${
                  locked
                    ? ok
                      ? "border-green-500 bg-green-50 dark:bg-green-950/40"
                      : "border-red-500 bg-red-50 dark:bg-red-950/40"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <span className="flex-1">
                  {l.text}
                  {locked && <span className="ml-2">{ok ? "✅" : "❌"}</span>}
                </span>
                <select
                  className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm sm:w-72 dark:border-zinc-700 dark:bg-zinc-800"
                  disabled={locked}
                  value={values[l.id] ?? ""}
                  onChange={(e) => onChange({ ...values, [l.id]: e.target.value })}
                >
                  <option value="" disabled>
                    Zuordnung wählen …
                  </option>
                  {question.right.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.text}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      );
    }

    case "dropdown": {
      const values = (answer ?? {}) as Record<string, string>;
      const blanksSolution =
        solution?.type === "dropdown"
          ? new Map(solution.blanks.map((b) => [b.id, b.correct]))
          : null;
      return (
        <p className="leading-loose">
          {question.textParts.map((part, i) => {
            const blank = i < question.blanks.length ? question.blanks[i] : null;
            const ok =
              blank && blanksSolution
                ? values[blank.id] === blanksSolution.get(blank.id)
                : null;
            return (
              <span key={i}>
                {part}
                {blank && (
                  <select
                    className={`mx-1 rounded border px-2 py-1 text-sm ${
                      locked
                        ? ok
                          ? "border-green-500 bg-green-50 dark:bg-green-950/40"
                          : "border-red-500 bg-red-50 dark:bg-red-950/40"
                        : "border-brand-300 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/40"
                    }`}
                    disabled={locked}
                    value={values[blank.id] ?? ""}
                    onChange={(e) =>
                      onChange({ ...values, [blank.id]: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      — auswählen —
                    </option>
                    {blank.options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.text}
                      </option>
                    ))}
                  </select>
                )}
              </span>
            );
          })}
        </p>
      );
    }
  }
}
