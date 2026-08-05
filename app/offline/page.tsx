import type { Metadata } from "next";
import Link from "next/link";
import { CloudOff, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
      <CloudOff className="mx-auto h-10 w-10 text-zinc-400" aria-hidden />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Keine Internetverbindung
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Diese Seite ist offline nicht verfügbar. Wenn du den Lern-Modus
        heruntergeladen hast, kannst du trotzdem weiterlernen — deine Antworten
        werden gespeichert und später automatisch synchronisiert.
      </p>
      <Link
        href="/lernen"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        <GraduationCap className="h-4 w-4" aria-hidden />
        Zum Lern-Modus
      </Link>
    </main>
  );
}
