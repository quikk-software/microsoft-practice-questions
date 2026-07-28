import type {
  Answer,
  Difficulty,
  ExamConfig,
  ExamResult,
  PublicQuestion,
  Question,
  QuestionResult,
} from "./types";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Zieht ein Examen aus dem Pool:
 * 1. Quoten pro Skill-Area anhand der Gewichte
 * 2. Innerhalb einer Area Schwierigkeiten gemäß difficultyCurve mischen
 * 3. Gesamtreihenfolge: leicht -> mittel -> schwer (mit Shuffle innerhalb der Stufe),
 *    so wie gewünscht: am Anfang eher leichte Fragen, später schwerere.
 */
export function drawExam(config: ExamConfig, pool: Question[]): Question[] {
  const total = Math.min(config.questionCount, pool.length);
  const byArea = new Map<string, Question[]>();
  for (const q of pool) {
    const list = byArea.get(q.skillArea) ?? [];
    list.push(q);
    byArea.set(q.skillArea, list);
  }

  // Quoten pro Area (Reste der Reihe nach verteilen)
  const areas = config.skillAreas;
  const quotas = areas.map((a) => Math.floor(a.weight * total));
  let remainder = total - quotas.reduce((s, n) => s + n, 0);
  for (let i = 0; remainder > 0; i = (i + 1) % quotas.length) {
    quotas[i]++;
    remainder--;
  }

  const picked: Question[] = [];
  const leftovers: Question[] = [];

  areas.forEach((area, i) => {
    const areaPool = shuffle(byArea.get(area.id) ?? []);
    const quota = Math.min(quotas[i], areaPool.length);

    // Schwierigkeits-Sollwerte innerhalb der Area
    const targets = DIFFICULTY_ORDER.map((d) =>
      Math.round(config.difficultyCurve[d] * quota)
    );
    const byDiff: Record<Difficulty, Question[]> = {
      easy: areaPool.filter((q) => q.difficulty === "easy"),
      medium: areaPool.filter((q) => q.difficulty === "medium"),
      hard: areaPool.filter((q) => q.difficulty === "hard"),
    };

    const areaPicked: Question[] = [];
    DIFFICULTY_ORDER.forEach((d, di) => {
      areaPicked.push(...byDiff[d].splice(0, targets[di]));
    });
    // Auffüllen, falls eine Stufe zu dünn besetzt war
    const rest = shuffle([...byDiff.easy, ...byDiff.medium, ...byDiff.hard]);
    while (areaPicked.length < quota && rest.length > 0) {
      areaPicked.push(rest.shift()!);
    }
    picked.push(...areaPicked);
    leftovers.push(...rest);
  });

  // Falls einzelne Areas zu wenig Fragen hatten: mit Resten anderer Areas auffüllen
  const spare = shuffle(leftovers);
  while (picked.length < total && spare.length > 0) {
    picked.push(spare.shift()!);
  }

  // Schwierigkeitskurve über das gesamte Examen: leicht zuerst
  const ordered: Question[] = [];
  for (const d of DIFFICULTY_ORDER) {
    ordered.push(...shuffle(picked.filter((q) => q.difficulty === d)));
  }
  return ordered;
}

/** Entfernt alle Lösungen, bevor Fragen an den Client gehen. */
export function stripAnswers(q: Question): PublicQuestion {
  const base = {
    id: q.id,
    type: q.type,
    skillArea: q.skillArea,
    topic: q.topic,
    difficulty: q.difficulty,
    prompt: q.prompt,
    reference: q.reference,
  };
  switch (q.type) {
    case "single-choice":
      return { ...base, type: "single-choice", options: shuffle(q.options) };
    case "multiple-choice":
      return {
        ...base,
        type: "multiple-choice",
        options: shuffle(q.options),
        selectCount: q.correct.length,
      };
    case "yes-no":
      return {
        ...base,
        type: "yes-no",
        statements: q.statements.map((s) => ({ id: s.id, text: s.text })),
      };
    case "ordering":
      return { ...base, type: "ordering", items: shuffle(q.items) };
    case "matching":
      return {
        ...base,
        type: "matching",
        left: q.left,
        right: shuffle(q.right),
      };
    case "dropdown":
      return {
        ...base,
        type: "dropdown",
        textParts: q.textParts,
        blanks: q.blanks.map((b) => ({ id: b.id, options: shuffle(b.options) })),
      };
  }
}

/** Bewertet eine Frage; liefert 0..1 (Teilpunkte bei zusammengesetzten Fragen). */
export function gradeQuestion(q: Question, answer: Answer | null): number {
  if (answer == null) return 0;
  switch (q.type) {
    case "single-choice":
      return answer === q.correct ? 1 : 0;
    case "multiple-choice": {
      if (!Array.isArray(answer)) return 0;
      const chosen = new Set(answer);
      if (chosen.size !== q.correct.length) return 0;
      return q.correct.every((id) => chosen.has(id)) ? 1 : 0;
    }
    case "yes-no": {
      if (typeof answer !== "object" || Array.isArray(answer)) return 0;
      const a = answer as Record<string, boolean>;
      const hits = q.statements.filter((s) => a[s.id] === s.correct).length;
      return hits / q.statements.length;
    }
    case "ordering": {
      if (!Array.isArray(answer)) return 0;
      if (answer.length !== q.correctOrder.length) return 0;
      return q.correctOrder.every((id, i) => answer[i] === id) ? 1 : 0;
    }
    case "matching": {
      if (typeof answer !== "object" || Array.isArray(answer)) return 0;
      const a = answer as Record<string, string>;
      const keys = Object.keys(q.correct);
      const hits = keys.filter((k) => a[k] === q.correct[k]).length;
      return hits / keys.length;
    }
    case "dropdown": {
      if (typeof answer !== "object" || Array.isArray(answer)) return 0;
      const a = answer as Record<string, string>;
      const hits = q.blanks.filter((b) => a[b.id] === b.correct).length;
      return hits / q.blanks.length;
    }
  }
}

export function gradeExam(
  config: ExamConfig,
  questions: Question[],
  answers: Record<string, Answer | null>
): ExamResult {
  const results: QuestionResult[] = questions.map((q) => {
    const answer = answers[q.id] ?? null;
    const score = gradeQuestion(q, answer);
    return { questionId: q.id, score, correct: score === 1, question: q, answer };
  });

  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const scaledScore =
    questions.length > 0
      ? Math.round((totalScore / questions.length) * config.maxScore)
      : 0;

  const perSkillArea = config.skillAreas.map((area) => {
    const areaResults = results.filter((r) => r.question.skillArea === area.id);
    return {
      id: area.id,
      name: area.name,
      score: areaResults.reduce((s, r) => s + r.score, 0),
      total: areaResults.length,
    };
  });

  return {
    scaledScore,
    maxScore: config.maxScore,
    passScore: config.passScore,
    passed: scaledScore >= config.passScore,
    perSkillArea,
    results,
  };
}
