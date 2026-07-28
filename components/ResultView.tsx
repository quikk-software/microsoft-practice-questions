"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import type { ExamResult, QuestionResult } from "@/lib/types";
import { AnswerFeedback } from "./AnswerFeedback";

interface Props {
  slug: string;
  examCode: string;
  result: ExamResult;
  onRestart: () => void;
}

export function ResultView({ slug, examCode, result, onRestart }: Props) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6 text-sm text-zinc-500">
        <Link
          href={`/exams/${slug}`}
          className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Zurück zu {examCode}
        </Link>
      </div>

      <div
        className={`rounded-xl border p-8 text-center ${
          result.passed
            ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
            : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
        }`}
      >
        <div className="text-5xl font-bold">
          {result.scaledScore}
          <span className="text-2xl font-normal text-zinc-500">
            {" "}
            / {result.maxScore}
          </span>
        </div>
        <div
          className={`mt-3 text-lg font-semibold ${
            result.passed
              ? "text-green-700 dark:text-green-400"
              : "text-red-700 dark:text-red-400"
          }`}
        >
          {result.passed ? "Bestanden 🎉" : "Nicht bestanden"}
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Bestehensgrenze: {result.passScore} Punkte
        </p>
        <button
          onClick={onRestart}
          className="mt-6 rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Neues Test-Examen starten
        </button>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Ergebnis nach Skill-Bereich</h2>
      <div className="mt-3 space-y-3">
        {result.perSkillArea.map((area) => {
          const pct = area.total > 0 ? (area.score / area.total) * 100 : 0;
          return (
            <div key={area.id}>
              <div className="flex justify-between text-sm">
                <span>{area.name}</span>
                <span className="ml-4 shrink-0 text-zinc-500">
                  {area.score.toFixed(1)} / {area.total}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className={`h-full rounded-full ${
                    pct >= 70
                      ? "bg-green-500"
                      : pct >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Review aller Fragen</h2>
      <div className="mt-3 space-y-4">
        {result.results.map((r, i) => (
          <ReviewCard key={r.questionId} index={i} slug={slug} result={r} />
        ))}
      </div>
    </main>
  );
}

function ReviewCard({
  index,
  slug,
  result,
}: {
  index: number;
  slug: string;
  result: QuestionResult;
}) {
  const [open, setOpen] = useState(false);
  const q = result.question;
  const partial = result.score > 0 && result.score < 1;
  const icon = result.correct ? "✅" : partial ? "🟠" : "❌";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <span>{icon}</span>
        <span className="flex-1 text-sm font-medium">
          {index + 1}. {q.prompt}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-zinc-400">
          {partial ? `${Math.round(result.score * 100)} %` : ""}
          {open ? (
            <ChevronUp className="h-4 w-4" aria-hidden />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden />
          )}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-100 p-4 dark:border-zinc-800">
          <AnswerFeedback
            slug={slug}
            question={q}
            answer={result.answer}
            score={result.score}
            showBanner={false}
          />
        </div>
      )}
    </div>
  );
}
