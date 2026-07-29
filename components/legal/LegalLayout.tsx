import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Gemeinsames Layout für Rechtstexte: schmale Spalte, gute Lesbarkeit.

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Zur Startseite
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">{title}</h1>
      {updated && (
        <p className="mt-1 text-xs text-zinc-500">Stand: {updated}</p>
      )}

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

/** Hinweis, wenn für den Mandanten keine Rechtsangaben hinterlegt sind. */
export function MissingLegalNotice({ tenantName }: { tenantName: string }) {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
      Für den Mandanten <strong>{tenantName}</strong> sind noch keine
      rechtlichen Angaben hinterlegt. Sie werden in{" "}
      <code>lib/tenants/config.ts</code> im Feld <code>legal</code> gepflegt.
    </div>
  );
}
