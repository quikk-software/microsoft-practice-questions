import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import { getAuthService } from "@/lib/auth";
import { drawExam, gradeQuestion, stripAnswers } from "@/lib/engine";
import type { Answer, Question } from "@/lib/types";

// POST /api/exams/[slug]/session
// Zieht ein Test-Examen — bzw. stellt bei angemeldeten Usern die laufende
// Session wieder her (Fragen-Reihenfolge, Antworten, geprüfte Ergebnisse,
// Position). body.fresh = true erzwingt einen Neustart.
//
// PATCH /api/exams/[slug]/session
// Speichert den Fortschritt der laufenden Session (nur mit Login).

interface SessionResponsePayload {
  exam: {
    slug: string;
    code: string;
    title: string;
    durationMinutes: number;
    passScore: number;
    maxScore: number;
    questionCount: number;
  };
  questions: ReturnType<typeof stripAnswers>[];
  /** true = Fortschritt wird serverseitig gespeichert (User ist angemeldet) */
  persisted: boolean;
  /** vorhanden, wenn eine laufende Session wiederhergestellt wurde */
  progress?: {
    answers: Record<string, Answer | null>;
    currentIndex: number;
    checks: { score: number; correct: boolean; question: Question }[];
  };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const repo = getRepository();
  const exam = await repo.getExam(slug);
  if (!exam) {
    return NextResponse.json({ error: "Exam not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => ({}))) as { fresh?: boolean };
  const user = await getAuthService().getCurrentUser();

  const examMeta = (questionCount: number) => ({
    slug: exam.config.slug,
    code: exam.config.code,
    title: exam.config.title,
    durationMinutes: exam.config.durationMinutes,
    passScore: exam.config.passScore,
    maxScore: exam.config.maxScore,
    questionCount,
  });

  // Wiederherstellen, falls angemeldet und eine Session existiert
  if (user && !body.fresh) {
    const stored = await repo.getExamSession(user.id, slug).catch(() => null);
    if (stored) {
      const byId = new Map(exam.questions.map((q) => [q.id, q]));
      // Fragen, die es inzwischen nicht mehr im Pool gibt, still auslassen
      const questions = stored.questionIds
        .map((id) => byId.get(id))
        .filter((q): q is Question => q != null);

      if (questions.length > 0) {
        const checkedSet = new Set(stored.checkedIds);
        const checks = questions
          .filter((q) => checkedSet.has(q.id))
          .map((q) => {
            const score = gradeQuestion(q, stored.answers[q.id] ?? null);
            return { score, correct: score === 1, question: q };
          });
        const payload: SessionResponsePayload = {
          exam: examMeta(questions.length),
          questions: questions.map(stripAnswers),
          persisted: true,
          progress: {
            answers: stored.answers,
            currentIndex: Math.min(stored.currentIndex, questions.length - 1),
            checks,
          },
        };
        return NextResponse.json(payload);
      }
      // Session zeigt nur noch auf gelöschte Fragen -> verwerfen und neu ziehen
      await repo.deleteExamSession(user.id, slug).catch(() => {});
    }
  }

  // Neu ziehen
  const questions = drawExam(exam.config, exam.questions);
  if (user) {
    await repo
      .saveExamSession({
        userId: user.id,
        examSlug: slug,
        questionIds: questions.map((q) => q.id),
        answers: {},
        checkedIds: [],
        currentIndex: 0,
        updatedAt: new Date().toISOString(),
      })
      .catch(() => {
        // Persistenz ist Komfort (z. B. Migration 0003 fehlt) — Ziehung nicht blockieren
      });
  }

  const payload: SessionResponsePayload = {
    exam: examMeta(questions.length),
    questions: questions.map(stripAnswers),
    persisted: user != null,
  };
  return NextResponse.json(payload);
}

interface PatchBody {
  answers?: Record<string, Answer | null>;
  checkedIds?: string[];
  currentIndex?: number;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const user = await getAuthService().getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, code: "unauthenticated" }, { status: 401 });
  }

  const repo = getRepository();
  const stored = await repo.getExamSession(user.id, slug).catch(() => null);
  if (!stored) {
    return NextResponse.json({ ok: false, code: "no-session" }, { status: 404 });
  }

  const body = (await req.json().catch(() => ({}))) as PatchBody;
  try {
    await repo.saveExamSession({
      ...stored,
      answers: body.answers ?? stored.answers,
      checkedIds: body.checkedIds ?? stored.checkedIds,
      currentIndex: body.currentIndex ?? stored.currentIndex,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Speichern fehlgeschlagen" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
