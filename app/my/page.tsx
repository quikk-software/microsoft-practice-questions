import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import type { AttemptSummary } from "@/lib/data/port";

// /my — „Meine Prüfungen": Verlauf der abgeschlossenen Test-Examen.
// Zugriffsschutz doppelt: Proxy (proxy.ts) + serverseitiger Redirect hier.

export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function MyAttemptsPage() {
  const user = await getAuthService().getCurrentUser();
  if (!user) redirect("/login?next=/my");

  const repo = getRepository();
  const [attempts, exams] = await Promise.all([
    repo.listAttempts(user.id),
    repo.listExams(),
  ]);
  const codeBySlug = new Map(
    exams.map(({ config }) => [config.slug, config.code])
  );
  const sorted = [...attempts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <div className="flex items-center gap-2">
        <ClipboardList
          className="h-6 w-6 text-brand-600 dark:text-brand-400"
          aria-hidden
        />
        <h1 className="text-2xl font-bold tracking-tight">Meine Prüfungen</h1>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Deine bisherigen Test-Examen, neueste zuerst.
      </p>

      <div className="mt-8 space-y-4">
        {sorted.map((attempt) => (
          <AttemptCard
            key={attempt.id}
            attempt={attempt}
            code={codeBySlug.get(attempt.examSlug) ?? attempt.examSlug}
          />
        ))}

        {sorted.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              Noch keine Test-Examen absolviert. Ergebnisse werden hier
              gespeichert, sobald du eingeloggt ein Examen abschließt.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Zu den Examen
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function AttemptCard({
  attempt,
  code,
}: {
  attempt: AttemptSummary;
  code: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/exams/${attempt.examSlug}`}
            className="rounded bg-brand-100 px-2 py-0.5 font-mono text-sm font-semibold text-brand-800 hover:bg-brand-200 dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-900"
          >
            {code}
          </Link>
          <span className="text-xs text-zinc-500">
            {dateFormat.format(new Date(attempt.createdAt))} Uhr
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">
            {attempt.scaledScore}
            <span className="text-sm font-normal text-zinc-500">
              {" "}
              / {attempt.maxScore}
            </span>
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              attempt.passed
                ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
            }`}
          >
            {attempt.passed ? "Bestanden" : "Nicht bestanden"}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {attempt.perSkillArea.map((area) => {
          const pct = area.total > 0 ? (area.score / area.total) * 100 : 0;
          return (
            <div key={area.id}>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">
                  {area.name}
                </span>
                <span className="ml-4 shrink-0 text-zinc-500">
                  {area.score.toFixed(1)} / {area.total}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
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
    </div>
  );
}
