import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import { stripAnswers } from "@/lib/engine";
import type { Difficulty, PublicQuestion } from "@/lib/types";

// POST /api/learn/session
// Lern-Modus: ALLE Fragen der gewählten Examen (optional gefiltert nach
// Schwierigkeit) in zufälliger Reihenfolge — kein Examens-Umfang, keine
// Schwierigkeitskurve. Lösungen werden wie überall serverseitig entfernt.

export interface LearnQuestion {
  examSlug: string;
  examCode: string;
  question: PublicQuestion;
}

/**
 * all   = alle Fragen (Standard, auch ohne Login)
 * open  = noch nie richtig beantwortete (weiterlernen)
 * wrong = zuletzt falsch/teilweise beantwortete (gezielt wiederholen)
 */
export type LearnMode = "all" | "open" | "wrong";

interface Body {
  examSlugs?: string[];
  difficulties?: Difficulty[];
  mode?: LearnMode;
}

const ALL_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const difficulties =
    body.difficulties?.filter((d) => ALL_DIFFICULTIES.includes(d)) ??
    ALL_DIFFICULTIES;
  if (difficulties.length === 0) {
    return NextResponse.json(
      { error: "Mindestens eine Schwierigkeit wählen." },
      { status: 400 }
    );
  }

  const repo = getRepository();
  const exams = await repo.listExams();
  const wanted =
    body.examSlugs && body.examSlugs.length > 0
      ? exams.filter((e) => body.examSlugs!.includes(e.config.slug))
      : exams;

  if (wanted.length === 0) {
    return NextResponse.json(
      { error: "Mindestens ein Examen wählen." },
      { status: 400 }
    );
  }

  // Fortschritts-Filter (nur mit Login sinnvoll)
  const mode: LearnMode = body.mode ?? "all";
  let excludeIds = new Set<string>();
  let onlyIds: Set<string> | null = null;

  if (mode !== "all") {
    const user = await getAuthService().getCurrentUser();
    if (user) {
      const progress = await getRepository()
        .getLearnProgress(
          user.id,
          wanted.map((e) => e.config.slug)
        )
        .catch(() => []);
      if (mode === "open") {
        // Bereits einmal vollständig richtig beantwortete überspringen
        excludeIds = new Set(
          progress.filter((p) => p.lastScore === 1).map((p) => p.questionId)
        );
      } else {
        onlyIds = new Set(
          progress.filter((p) => p.lastScore < 1).map((p) => p.questionId)
        );
      }
    }
  }

  const pool: LearnQuestion[] = wanted.flatMap((exam) =>
    exam.questions
      .filter((q) => difficulties.includes(q.difficulty))
      .filter((q) => !excludeIds.has(q.id))
      .filter((q) => (onlyIds ? onlyIds.has(q.id) : true))
      .map((q) => ({
        examSlug: exam.config.slug,
        examCode: exam.config.code,
        question: stripAnswers(q),
      }))
  );

  return NextResponse.json({
    questions: shuffle(pool),
    total: pool.length,
    mode,
    exams: wanted.map((e) => ({ slug: e.config.slug, code: e.config.code })),
  });
}
