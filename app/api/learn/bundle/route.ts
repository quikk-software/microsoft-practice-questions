import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";

// GET /api/learn/bundle?exams=ab-900,sc-401
// Offline-Paket für den Lern-Modus: Fragen INKLUSIVE Lösungen und Erklärungen,
// damit ohne Netz bewertet werden kann.
//
// Bewusste Abwägung: Damit liegen die Lösungen auf dem Gerät. Deshalb
//  - nur für angemeldete Nutzer,
//  - nur für den Lern-Modus (die Prüfungs-Simulation bleibt serverseitig),
//  - nur auf ausdrückliche Aktion ("Für Offline-Nutzung herunterladen").
export async function GET(req: Request) {
  const user = await getAuthService().getCurrentUser();
  if (!user) {
    return NextResponse.json(
      {
        error: "Offline-Download nur für angemeldete Nutzer.",
        code: "unauthenticated",
      },
      { status: 401 }
    );
  }

  const slugs = new URL(req.url).searchParams
    .get("exams")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const exams = await getRepository().listExams();
  const wanted = slugs?.length
    ? exams.filter((e) => slugs.includes(e.config.slug))
    : exams;

  const bundle = wanted.map((exam) => ({
    slug: exam.config.slug,
    code: exam.config.code,
    title: exam.config.title,
    questions: exam.questions,
  }));

  return NextResponse.json(
    {
      version: new Date().toISOString(),
      exams: bundle,
      totalQuestions: bundle.reduce((s, e) => s + e.questions.length, 0),
    },
    { headers: { "cache-control": "no-store" } }
  );
}
