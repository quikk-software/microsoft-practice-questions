"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

// /login — E-Mail+Passwort gegen POST /api/auth/login.
// ?next=<pfad> wird nach erfolgreichem Login respektiert (nur relative Pfade).

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-zinc-700 dark:bg-zinc-900";

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

function messageFor(code: string | undefined, fallback?: string): string {
  switch (code) {
    case "invalid-credentials":
      return "E-Mail oder Passwort ist falsch.";
    case "email-not-confirmed":
      return "Bitte bestätige zuerst deine E-Mail-Adresse — wir haben dir dazu eine E-Mail geschickt.";
    case "not-configured":
      return "Anmeldung ist auf diesem Server nicht konfiguriert (AUTH_DRIVER bzw. Supabase-Umgebungsvariablen fehlen).";
    default:
      return fallback || "Anmeldung fehlgeschlagen. Bitte versuche es erneut.";
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(() =>
    searchParams.get("error") === "callback"
      ? "Der Link ist ungültig oder abgelaufen. Bitte melde dich an oder fordere einen neuen an."
      : null
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        code?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(messageFor(data.code, data.error));
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Netzwerkfehler — bitte versuche es erneut.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <LogIn className="h-5 w-5 text-brand-600 dark:text-brand-400" aria-hidden />
          <h1 className="text-xl font-bold tracking-tight">Anmelden</h1>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Melde dich an, um deinen Prüfungs-Verlauf zu speichern.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            E-Mail
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block text-sm font-medium">
            Passwort
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {busy ? "Wird angemeldet …" : "Anmelden"}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-1 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
          <span className="text-zinc-500">
            Noch kein Konto?{" "}
            <Link
              href="/register"
              className="font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              Registrieren
            </Link>
          </span>
          <Link
            href="/reset-password"
            className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            Passwort vergessen?
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
