import { BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import type { ContentUnit } from "@/lib/data/port";
import type { ExamConfig, Question } from "@/lib/types";
import {
  correctAnswerText,
  modulesFromUnits,
  pickSampleQuestions,
  topicsBySkillArea,
} from "@/lib/seo/examContent";

// Öffentliche, indexierbare Inhalte der Examen-Seite (reine Server-Komponente,
// alles im SSR-HTML). Quellen: eigener Fragen-Pool + Konfiguration; Lernpfade
// werden nur verlinkt, kein fremder Text wird reproduziert.

const TYPE_LABEL: Record<string, string> = {
  "single-choice": "Single Choice",
  "multiple-choice": "Multiple Choice",
  "yes-no": "Ja/Nein-Serie",
  ordering: "Reihenfolge",
  matching: "Zuordnung",
  dropdown: "Satzergänzung",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "leicht",
  medium: "mittel",
  hard: "schwer",
};

export function ExamSeoContent({
  config,
  questions,
  units,
}: {
  config: ExamConfig;
  questions: Question[];
  units: ContentUnit[];
}) {
  const areaIds = config.skillAreas.map((a) => a.id);
  const samples = pickSampleQuestions(questions, areaIds);
  const topics = topicsBySkillArea(questions, areaIds);
  const modules = modulesFromUnits(units);

  return (
    <div className="mt-16 space-y-14">
      {config.seo?.intro && config.seo.intro.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">
            Über die {config.code}-Zertifizierung
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {config.seo.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {samples.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">
            Beispielfragen aus dem {config.code}-Pool
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            So sehen die Fragen aus. Im Test-Examen bekommst du zusätzlich eine
            KI-Erklärung und den belegenden Textausschnitt aus dem Lernpfad.
          </p>
          <ol className="mt-4 space-y-4">
            {samples.map((q, i) => (
              <li
                key={q.id}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                    {TYPE_LABEL[q.type] ?? q.type}
                  </span>
                  <span>·</span>
                  <span>{DIFFICULTY_LABEL[q.difficulty]}</span>
                  <span>·</span>
                  <span>{q.topic}</span>
                </div>
                <p className="font-medium">
                  {i + 1}. {q.prompt}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {q.options.map((o) => {
                    const correct =
                      q.type === "single-choice"
                        ? q.correct === o.id
                        : q.correct.includes(o.id);
                    return (
                      <li
                        key={o.id}
                        className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${
                          correct
                            ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                            : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        {correct ? (
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
                            aria-hidden
                          />
                        ) : (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        )}
                        <span>{o.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <strong className="font-semibold">Richtige Antwort:</strong>{" "}
                  {correctAnswerText(q)}
                </p>
                <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {q.explanation}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">
          Themen im {config.code}-Fragenpool
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Diese Themen deckt unser Pool aus {questions.length} Fragen ab —
          gruppiert nach den offiziellen Skill-Bereichen.
        </p>
        <div className="mt-4 space-y-5">
          {config.skillAreas.map((area) => (
            <div key={area.id}>
              <h3 className="text-sm font-semibold">
                {area.name}{" "}
                <span className="font-normal text-zinc-500">
                  (~{Math.round(area.weight * 100)} %)
                </span>
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {topics[area.id]?.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {modules.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">
            Offizielle Lernpfade zur {config.code}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Unsere Fragen sind aus diesen {modules.length} Modulen von Microsoft
            Learn abgeleitet. Die Inhalte selbst findest du kostenlos bei
            Microsoft:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {modules.map((m) => (
              <li key={m.slug}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full items-start gap-2 rounded-lg border border-zinc-200 p-3 text-sm transition hover:border-brand-400 dark:border-zinc-800"
                >
                  <BookOpen
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                    aria-hidden
                  />
                  <span className="flex-1">
                    {m.title}
                    <span className="mt-0.5 block text-xs text-zinc-500">
                      {m.unitCount} Lerneinheiten
                    </span>
                  </span>
                  <ExternalLink
                    className="mt-0.5 h-3 w-3 shrink-0 text-zinc-400"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {config.seo?.faq && config.seo.faq.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">
            Häufige Fragen zur {config.code}
          </h2>
          <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            {config.seo.faq.map((item, i) => (
              <div key={i} className="py-4">
                <h3 className="text-sm font-semibold">{item.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/** Strukturierte Daten: Course + FAQPage (+ Quiz für die Beispielfragen). */
export function ExamStructuredData({
  config,
  questions,
  siteUrl,
  providerName,
}: {
  config: ExamConfig;
  questions: Question[];
  siteUrl: string;
  providerName: string;
}) {
  const areaIds = config.skillAreas.map((a) => a.id);
  const samples = pickSampleQuestions(questions, areaIds);
  const url = `${siteUrl}/exams/${config.slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Course",
      name: `${config.code} Test-Examen — ${config.title}`,
      description: config.seo?.intro?.[0] ?? config.description,
      url,
      inLanguage: "de",
      isAccessibleForFree: true,
      provider: { "@type": "Organization", name: providerName },
      about: config.skillAreas.map((a) => a.name),
    },
  ];

  if (config.seo?.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: config.seo.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (samples.length > 0) {
    graph.push({
      "@type": "Quiz",
      name: `${config.code} Beispielfragen`,
      url,
      about: { "@type": "Thing", name: config.title },
      hasPart: samples.map((q) => ({
        "@type": "Question",
        eduQuestionType: "Multiple choice",
        text: q.prompt,
        acceptedAnswer: { "@type": "Answer", text: correctAnswerText(q) },
        suggestedAnswer: q.options
          .filter((o) =>
            q.type === "single-choice"
              ? o.id !== q.correct
              : !q.correct.includes(o.id)
          )
          .map((o) => ({ "@type": "Answer", text: o.text })),
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
