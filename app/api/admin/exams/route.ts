import { NextResponse } from "next/server";
import { getRepository } from "@/lib/data";
import type { Question } from "@/lib/types";
import { guardRole } from "../guard";

function countBy(questions: Question[], fn: (q: Question) => string): Record<string, number> {
  const acc: Record<string, number> = {};
  for (const q of questions) {
    const key = fn(q);
    acc[key] = (acc[key] ?? 0) + 1;
  }
  return acc;
}

// GET /api/admin/exams
// Alle Examen (inkl. unveröffentlichte) als Summaries mit Pool-Zählwerten.
export async function GET() {
  const denied = await guardRole("editor");
  if (denied) return denied;

  const exams = await getRepository().listExams({ includeUnpublished: true });
  return NextResponse.json({
    exams: exams.map(({ config, questions }) => ({
      config,
      questionCount: questions.length,
      byType: countBy(questions, (q) => q.type),
      byDifficulty: countBy(questions, (q) => q.difficulty),
      bySkillArea: countBy(questions, (q) => q.skillArea),
      byStatus: countBy(questions, (q) => q.status ?? "published"),
    })),
  });
}
