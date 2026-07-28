"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList, LogIn, LogOut, Settings2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// Schlanke Kopfzeile. Den User holt das Server-Layout (app/layout.tsx) über
// getAuthService().getCurrentUser() und reicht ihn hier als Prop herein —
// diese Client-Komponente kümmert sich nur um Darstellung + Logout-Klick.
// Bei AUTH_DRIVER=none ohne DEV_FAKE_ROLE: authEnabled=false und user=null
// → es bleibt nur der Titel.

interface Props {
  user: { email: string } | null;
  authEnabled: boolean;
}

export function SiteHeader({ user, authEnabled }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo strategic IT (Vektor, funktioniert hell + dunkel) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="strategic IT" className="h-7 w-auto" />
          <span className="hidden border-l border-zinc-300 pl-3 text-sm font-semibold tracking-tight sm:inline dark:border-zinc-700">
            Practice Exams
          </span>
        </Link>

        <div className="flex items-center gap-3">
        {user ? (
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/my"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              Meine Prüfungen
            </Link>
            <Link
              href="/settings"
              title="AI-Einstellungen (Bring your own Key)"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <Settings2 className="h-4 w-4" aria-hidden />
              <span className="hidden md:inline">AI-Setup</span>
            </Link>
            <span
              className="hidden max-w-48 truncate text-zinc-400 sm:inline"
              title={user.email}
            >
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Abmelden
            </button>
          </nav>
        ) : authEnabled ? (
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <LogIn className="h-4 w-4" aria-hidden />
            Anmelden
          </Link>
        ) : null}
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
