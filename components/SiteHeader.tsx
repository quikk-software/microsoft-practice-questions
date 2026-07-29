"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  CircleUserRound,
  ClipboardList,
  LogIn,
  LogOut,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

// Schlanke, responsive Kopfzeile: links Logo, rechts Theme-Toggle + Benutzer-Menü.
// Alle User-Aktionen (Meine Prüfungen, AI-Setup, Admin, Abmelden) liegen im
// Dropdown, damit der Header auf allen Breakpoints einzeilig bleibt.

interface Props {
  user: { email: string; role: "user" | "editor" | "admin" } | null;
  authEnabled: boolean;
}

export function SiteHeader({ user, authEnabled }: Props) {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {process.env.NEXT_PUBLIC_SITE_URL ===
          "https://microsoft-practice-exams.quikk.de" ? (
            <>
              <img
                src="/quikk/logo_dark.svg"
                alt="QUIKK Software GmbH"
                className="h-7 w-auto shrink-0 block dark:hidden"
              />
              <img
                src="/quikk/logo_light.svg"
                alt="QUIKK Software GmbH"
                className="h-7 w-auto shrink-0 hidden dark:block"
              />
            </>
          ) : (
            <img
              src="/strategic-it/logo.svg"
              alt="Strategic IT GmbH"
              className="h-7 w-auto shrink-0"
            />
          )}
          <span className="hidden truncate border-l border-zinc-300 pl-3 text-sm font-semibold tracking-tight sm:inline dark:border-zinc-700">
            Practice Exams
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : authEnabled ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              Anmelden
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function UserMenu({
  user,
}: {
  user: { email: string; role: "user" | "editor" | "admin" };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const itemClass =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-300 px-2 text-sm text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
      >
        <CircleUserRound className="h-4 w-4" aria-hidden />
        <span className="hidden max-w-36 truncate md:inline" title={user.email}>
          {user.email}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <>
          {/* Klick außerhalb schließt das Menü */}
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p
              className="truncate border-b border-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800"
              title={user.email}
            >
              {user.email}
            </p>
            <div className="mt-1 space-y-0.5">
              <Link
                href="/my"
                className={itemClass}
                onClick={() => setOpen(false)}
              >
                <ClipboardList className="h-4 w-4" aria-hidden />
                Meine Prüfungen
              </Link>
              <Link
                href="/settings"
                className={itemClass}
                onClick={() => setOpen(false)}
              >
                <Settings2 className="h-4 w-4" aria-hidden />
                AI-Einstellungen
              </Link>
              {(user.role === "editor" || user.role === "admin") && (
                <Link
                  href="/admin"
                  className={itemClass}
                  onClick={() => setOpen(false)}
                >
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                disabled={busy}
                className={`${itemClass} text-red-700 hover:bg-red-50 disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/40`}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Abmelden
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
