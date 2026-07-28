"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, UserPlus } from "lucide-react";

// /register — Konto anlegen gegen POST /api/auth/register.
// Je nach Supabase-Einstellung: direkt eingeloggt oder Bestätigungs-E-Mail.

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-zinc-700 dark:bg-zinc-900";

function messageFor(code: string | undefined, fallback?: string): string {
  switch (code) {
    case "not-configured":
      return "Registrierung ist auf diesem Server nicht konfiguriert (AUTH_DRIVER bzw. Supabase-Umgebungsvariablen fehlen).";
    default:
      return fallback || "Registrierung fehlgeschlagen. Bitte versuche es erneut.";
  }
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        code?: string;
        error?: string;
        needsEmailConfirmation?: boolean;
      };
      if (!res.ok) {
        setError(messageFor(data.code, data.error));
        return;
      }
      if (data.needsEmailConfirmation) {
        setConfirmationSent(true);
      } else {
        // Direkt eingeloggt (E-Mail-Bestätigung deaktiviert)
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("Netzwerkfehler — bitte versuche es erneut.");
    } finally {
      setBusy(false);
    }
  }

  if (confirmationSent) {
    return (
      <main className="mx-auto w-full max-w-md px-6 py-16">
        <div className="rounded-xl border border-green-300 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30">
          <Mail
            className="mx-auto h-8 w-8 text-green-700 dark:text-green-400"
            aria-hidden
          />
          <h1 className="mt-3 text-xl font-bold tracking-tight">
            Bestätigungs-E-Mail verschickt
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Wir haben eine E-Mail an <strong>{email}</strong> geschickt. Klicke
            auf den Link darin, um dein Konto zu aktivieren — danach kannst du
            dich anmelden.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Zur Anmeldung
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <UserPlus
            className="h-5 w-5 text-brand-600 dark:text-brand-400"
            aria-hidden
          />
          <h1 className="text-xl font-bold tracking-tight">Registrieren</h1>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Mit einem Konto wird dein Prüfungs-Verlauf gespeichert.
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
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-zinc-500">
              Mindestens 6 Zeichen
            </span>
          </label>
          <label className="block text-sm font-medium">
            Passwort wiederholen
            <input
              type="password"
              required
              autoComplete="new-password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
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
            {busy ? "Konto wird angelegt …" : "Konto anlegen"}
          </button>
        </form>

        <div className="mt-6 border-t border-zinc-100 pt-4 text-sm text-zinc-500 dark:border-zinc-800">
          Bereits ein Konto?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            Anmelden
          </Link>
        </div>
      </div>
    </main>
  );
}
