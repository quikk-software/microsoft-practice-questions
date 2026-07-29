"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Answer, ExamResult, PublicQuestion, Question } from "@/lib/types";
import { QuestionView } from "./QuestionView";
import { ResultView } from "./ResultView";
import { AnswerFeedback } from "./AnswerFeedback";

interface SessionData {
  exam: {
    slug: string;
    code: string;
    title: string;
    durationMinutes: number;
    passScore: number;
    maxScore: number;
    questionCount: number;
  };
  questions: PublicQuestion[];
}

interface CheckResult {
  score: number;
  correct: boolean;
  question: Question;
}

type Phase = "loading" | "running" | "grading" | "done" | "error";

export function PracticeRunner({
  slug,
  examCode,
}: {
  slug: string;
  examCode: string;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [session, setSession] = useState<SessionData | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer | null>>({});
  const [checks, setChecks] = useState<Record<string, CheckResult>>({});
  const [checking, setChecking] = useState(false);
  const [restored, setRestored] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  // Fortschritts-Sync (nur wenn der Server die Session persistiert = Login)
  const persistedRef = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistProgress = useCallback(
    (next: {
      answers: Record<string, Answer | null>;
      checkedIds: string[];
      currentIndex: number;
    }) => {
      if (!persistedRef.current) return;
      // Debounce: schnelle Folge-Änderungen (z. B. Auswahl ändern) bündeln
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        void fetch(`/api/exams/${slug}/session`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        }).catch(() => {});
      }, 600);
    },
    [slug]
  );

  // Nur Laden (alle setState-Aufrufe erst nach dem await -> effektsicher)
  const fetchSession = useCallback(
    async (fresh: boolean) => {
      try {
        const res = await fetch(`/api/exams/${slug}/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fresh }),
        });
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as SessionData & {
          persisted?: boolean;
          progress?: {
            answers: Record<string, Answer | null>;
            currentIndex: number;
            checks: CheckResult[];
          };
        };
        persistedRef.current = data.persisted ?? false;
        setSession(data);
        if (data.progress) {
          setAnswers(data.progress.answers ?? {});
          setIndex(data.progress.currentIndex ?? 0);
          setChecks(
            Object.fromEntries(
              (data.progress.checks ?? []).map((c) => [c.question.id, c])
            )
          );
          setRestored(true);
        }
        setPhase("running");
      } catch {
        setPhase("error");
      }
    },
    [slug]
  );

  // Neustart: Zustand zurücksetzen + neu ziehen (verwirft die gespeicherte Session)
  const startSession = useCallback(async () => {
    setPhase("loading");
    setIndex(0);
    setAnswers({});
    setChecks({});
    setResult(null);
    setRestored(false);
    await fetchSession(true);
  }, [fetchSession]);

  useEffect(() => {
    // Fetch-on-Mount: setState passiert erst nach dem await der Server-Antwort
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchSession(false);
  }, [fetchSession]);

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    persistProgress({
      answers,
      checkedIds: Object.keys(checks),
      currentIndex: nextIndex,
    });
  };

  const checkAnswer = async (questionId: string) => {
    setChecking(true);
    try {
      const res = await fetch(`/api/exams/${slug}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          answer: answers[questionId] ?? null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const check = (await res.json()) as CheckResult;
      setChecks((prev) => {
        const next = { ...prev, [questionId]: check };
        persistProgress({
          answers,
          checkedIds: Object.keys(next),
          currentIndex: index,
        });
        return next;
      });
    } catch {
      // beim nächsten Klick erneut versuchen
    } finally {
      setChecking(false);
    }
  };

  const submit = async () => {
    if (!session) return;
    setPhase("grading");
    try {
      const res = await fetch(`/api/exams/${slug}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionIds: session.questions.map((q) => q.id),
          answers,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult((await res.json()) as ExamResult);
      setPhase("done");
    } catch {
      setPhase("error");
    }
  };

  if (phase === "loading") {
    return (
      <Centered>
        <p className="animate-pulse text-zinc-500">
          Examen wird zusammengestellt …
        </p>
      </Centered>
    );
  }

  if (phase === "error") {
    return (
      <Centered>
        <p className="text-red-600">Da ist etwas schiefgelaufen.</p>
        <button
          onClick={startSession}
          className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Erneut versuchen
        </button>
      </Centered>
    );
  }

  if (phase === "done" && result && session) {
    return (
      <ResultView
        slug={slug}
        examCode={examCode}
        result={result}
        onRestart={startSession}
      />
    );
  }

  if (!session) return null;

  const question = session.questions[index];
  const check = checks[question.id] ?? null;
  const hasAnswer = answers[question.id] != null;
  const answered = Object.keys(checks).length;
  const isLast = index === session.questions.length - 1;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between text-sm text-zinc-500">
        <Link
          href={`/exams/${slug}`}
          className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <X className="h-4 w-4" aria-hidden />
          {examCode} abbrechen
        </Link>
        <span>
          Frage {index + 1} / {session.questions.length} · {answered} geprüft
        </span>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{
            width: `${((index + 1) / session.questions.length) * 100}%`,
          }}
        />
      </div>

      {restored && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-brand-300 bg-brand-50 px-4 py-2.5 text-sm text-brand-900 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-200">
          <span>
            Deine laufende Prüfung wurde wiederhergestellt — mach einfach
            weiter, wo du warst.
          </span>
          <button
            onClick={startSession}
            className="shrink-0 font-semibold underline"
          >
            Neu starten
          </button>
        </div>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <QuestionView
          question={question}
          answer={answers[question.id] ?? null}
          solution={check?.question ?? null}
          onChange={(a) =>
            setAnswers((prev) => {
              const next = { ...prev, [question.id]: a };
              persistProgress({
                answers: next,
                checkedIds: Object.keys(checks),
                currentIndex: index,
              });
              return next;
            })
          }
        />
      </div>

      {check && (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <AnswerFeedback
            slug={slug}
            question={check.question}
            answer={answers[question.id] ?? null}
            score={check.score}
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => goTo(Math.max(0, index - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 py-2 pl-2 pr-4 text-sm font-medium disabled:opacity-40 dark:border-zinc-700"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Zurück
        </button>

        {!check ? (
          <div className="flex items-center gap-3">
            {!hasAnswer && !isLast && (
              <button
                onClick={() => goTo(index + 1)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                Überspringen
              </button>
            )}
            <button
              onClick={() => checkAnswer(question.id)}
              disabled={!hasAnswer || checking}
              className="rounded-lg bg-brand-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
            >
              {checking ? "Wird geprüft …" : "Antwort prüfen"}
            </button>
          </div>
        ) : isLast ? (
          <button
            onClick={submit}
            disabled={phase === "grading"}
            className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {phase === "grading" ? "Wird ausgewertet …" : "Zur Auswertung"}
          </button>
        ) : (
          <button
            onClick={() => goTo(index + 1)}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-600 py-2 pl-6 pr-4 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Weiter
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>

      {isLast && !check && (
        <p className="mt-3 text-right text-xs text-zinc-500">
          Letzte Frage — nach dem Prüfen geht es zur Auswertung.
        </p>
      )}
    </main>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      {children}
    </main>
  );
}
