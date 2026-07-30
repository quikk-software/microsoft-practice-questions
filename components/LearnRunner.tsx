"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  RotateCcw,
  Shuffle,
  SlidersHorizontal,
} from "lucide-react";
import type { Answer, Difficulty, PublicQuestion, Question } from "@/lib/types";
import { QuestionView } from "./QuestionView";
import { AnswerFeedback } from "./AnswerFeedback";

// Lern-Modus: alle Fragen der gewählten Examen in zufälliger Reihenfolge,
// ohne Prüfungs-Umfang und ohne Schwierigkeitskurve. Auswahl (Examen +
// Schwierigkeiten) wird im localStorage gemerkt.

interface ExamOption {
  slug: string;
  code: string;
  title: string;
  counts: Record<Difficulty, number>;
}

interface LearnQuestion {
  examSlug: string;
  examCode: string;
  question: PublicQuestion;
}

interface CheckResult {
  score: number;
  correct: boolean;
  question: Question;
}

const DIFFICULTIES: { id: Difficulty; label: string; dot: string }[] = [
  { id: "easy", label: "leicht", dot: "🟢" },
  { id: "medium", label: "mittel", dot: "🟡" },
  { id: "hard", label: "schwer", dot: "🔴" },
];

const STORAGE_KEY = "learn-filter";

export function LearnRunner({ exams }: { exams: ExamOption[] }) {
  const [phase, setPhase] = useState<"setup" | "loading" | "running" | "error">(
    "setup"
  );
  const [selectedExams, setSelectedExams] = useState<string[]>(
    exams.map((e) => e.slug)
  );
  const [selectedDiffs, setSelectedDiffs] = useState<Difficulty[]>([
    "easy",
    "medium",
    "hard",
  ]);
  const [questions, setQuestions] = useState<LearnQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer | null>>({});
  const [checks, setChecks] = useState<Record<string, CheckResult>>({});
  const [checking, setChecking] = useState(false);

  // Gemerkte Auswahl laden
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        exams?: string[];
        diffs?: Difficulty[];
      };
      const validExams = saved.exams?.filter((s) =>
        exams.some((e) => e.slug === s)
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (validExams?.length) setSelectedExams(validExams);
       
      if (saved.diffs?.length) setSelectedDiffs(saved.diffs);
    } catch {
      // ohne gemerkte Auswahl starten
    }
  }, [exams]);

  const persistFilter = (nextExams: string[], nextDiffs: Difficulty[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ exams: nextExams, diffs: nextDiffs })
      );
    } catch {
      // localStorage kann blockiert sein — dann eben nicht merken
    }
  };

  const availableCount = exams
    .filter((e) => selectedExams.includes(e.slug))
    .reduce(
      (sum, e) => sum + selectedDiffs.reduce((s, d) => s + e.counts[d], 0),
      0
    );

  const start = useCallback(async () => {
    setPhase("loading");
    try {
      const res = await fetch("/api/learn/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examSlugs: selectedExams,
          difficulties: selectedDiffs,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { questions: LearnQuestion[] };
      setQuestions(data.questions);
      setIndex(0);
      setAnswers({});
      setChecks({});
      setPhase("running");
    } catch {
      setPhase("error");
    }
  }, [selectedExams, selectedDiffs]);

  const checkAnswer = async (item: LearnQuestion) => {
    setChecking(true);
    try {
      const res = await fetch("/api/learn/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examSlug: item.examSlug,
          questionId: item.question.id,
          answer: answers[item.question.id] ?? null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const check = (await res.json()) as CheckResult;
      setChecks((prev) => ({ ...prev, [item.question.id]: check }));
    } catch {
      // beim nächsten Klick erneut versuchen
    } finally {
      setChecking(false);
    }
  };

  // ---------- Setup ----------
  if (phase === "setup" || phase === "loading" || phase === "error") {
    const toggleExam = (slug: string) => {
      const next = selectedExams.includes(slug)
        ? selectedExams.filter((s) => s !== slug)
        : [...selectedExams, slug];
      setSelectedExams(next);
      persistFilter(next, selectedDiffs);
    };
    const toggleDiff = (d: Difficulty) => {
      const next = selectedDiffs.includes(d)
        ? selectedDiffs.filter((x) => x !== d)
        : [...selectedDiffs, d];
      setSelectedDiffs(next);
      persistFilter(selectedExams, next);
    };

    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <GraduationCap className="h-6 w-6 text-brand-600" aria-hidden />
          Lern-Modus
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Alle Fragen in zufälliger Reihenfolge — ohne Prüfungslänge und ohne
          Zeitdruck. Du kannst mehrere Examen mischen und Schwierigkeitsstufen
          ausblenden.
        </p>

        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Examen
          </h2>
          <div className="space-y-2">
            {exams.map((e) => {
              const active = selectedExams.includes(e.slug);
              const count = selectedDiffs.reduce((s, d) => s + e.counts[d], 0);
              return (
                <label
                  key={e.slug}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                    active
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                      : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={active}
                    onChange={() => toggleExam(e.slug)}
                  />
                  <span className="flex-1">
                    <span className="font-mono text-xs font-semibold">
                      {e.code}
                    </span>{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {e.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-500">
                      {count} Fragen mit aktueller Auswahl
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold">Schwierigkeit</h2>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => {
              const active = selectedDiffs.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDiff(d.id)}
                  aria-pressed={active}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    active
                      ? "border-brand-500 bg-brand-50 font-medium dark:bg-brand-950/40"
                      : "border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:border-zinc-800"
                  }`}
                >
                  {d.dot} {d.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Standard: alle Stufen. Abwählen blendet die Stufe komplett aus.
          </p>
        </section>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={start}
            disabled={
              availableCount === 0 ||
              selectedExams.length === 0 ||
              phase === "loading"
            }
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-brand-700 disabled:opacity-40"
          >
            <Shuffle className="h-4 w-4" aria-hidden />
            {phase === "loading"
              ? "Fragen werden gemischt …"
              : `Lernen starten (${availableCount} Fragen)`}
          </button>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Abbrechen
          </Link>
        </div>
        {phase === "error" && (
          <p className="mt-4 text-sm text-red-600">
            Fragen konnten nicht geladen werden. Bitte erneut versuchen.
          </p>
        )}
        {availableCount === 0 && (
          <p className="mt-4 text-sm text-amber-700 dark:text-amber-400">
            Mit dieser Auswahl gibt es keine Fragen — bitte Examen oder
            Schwierigkeit anpassen.
          </p>
        )}
      </main>
    );
  }

  // ---------- Runner ----------
  const item = questions[index];
  const check = item ? checks[item.question.id] : null;
  const hasAnswer = item ? answers[item.question.id] != null : false;
  const done = Object.keys(checks).length;
  const correct = Object.values(checks).filter((c) => c.correct).length;
  const isLast = index === questions.length - 1;

  if (!item) return null;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-500">
        <button
          onClick={() => setPhase("setup")}
          className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Auswahl ändern
        </button>
        <span>
          Frage {index + 1} / {questions.length} · {done} geprüft
          {done > 0 && (
            <>
              {" "}
              · <span className="text-green-700 dark:text-green-400">
                {correct} richtig
              </span>
            </>
          )}
        </span>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <p className="mb-3 inline-block rounded bg-zinc-100 px-2 py-0.5 font-mono text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {item.examCode}
        </p>
        <QuestionView
          question={item.question}
          answer={answers[item.question.id] ?? null}
          solution={check?.question ?? null}
          onChange={(a) =>
            setAnswers((prev) => ({ ...prev, [item.question.id]: a }))
          }
        />
      </div>

      {check && (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <AnswerFeedback
            slug={item.examSlug}
            question={check.question}
            answer={answers[item.question.id] ?? null}
            score={check.score}
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 py-2 pl-2 pr-4 text-sm font-medium disabled:opacity-40 dark:border-zinc-700"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Zurück
        </button>

        {!check ? (
          <div className="flex items-center gap-3">
            {!isLast && (
              <button
                onClick={() => setIndex((i) => i + 1)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                Überspringen
              </button>
            )}
            <button
              onClick={() => checkAnswer(item)}
              disabled={!hasAnswer || checking}
              className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
            >
              {checking ? "Wird geprüft …" : "Antwort prüfen"}
            </button>
          </div>
        ) : isLast ? (
          <button
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Neu mischen
          </button>
        ) : (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 py-2 pl-6 pr-4 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Weiter
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {isLast && check && (
        <p className="mt-3 text-right text-xs text-zinc-500">
          Letzte Frage — {correct} von {done} richtig beantwortet.
        </p>
      )}
    </main>
  );
}
