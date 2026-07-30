import { NextResponse } from "next/server";
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

interface Body {
  examSlugs?: string[];
  difficulties?: Difficulty[];
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

  const pool: LearnQuestion[] = wanted.flatMap((exam) =>
    exam.questions
      .filter((q) => difficulties.includes(q.difficulty))
      .map((q) => ({
        examSlug: exam.config.slug,
        examCode: exam.config.code,
        question: stripAnswers(q),
      }))
  );

  return NextResponse.json({
    questions: shuffle(pool),
    total: pool.length,
    exams: wanted.map((e) => ({ slug: e.config.slug, code: e.config.code })),
  });
}
