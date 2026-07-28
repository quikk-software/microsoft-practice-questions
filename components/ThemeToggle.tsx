"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Umschalter für den klassenbasierten Dark Mode (.dark auf <html>).
// Initialzustand kommt aus dem Inline-Script im Root-Layout (localStorage),
// Default ist Light.

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Einmalig nach der Hydration den vom Inline-Script gesetzten DOM-Zustand lesen
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage kann blockiert sein — Toggle funktioniert dann nur pro Seite
    }
    setDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Zu Light Mode wechseln" : "Zu Dark Mode wechseln"}
      title={dark ? "Light Mode" : "Dark Mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
    >
      {/* Bis zur Hydration neutral rendern, um Mismatches zu vermeiden */}
      {dark === null ? (
        <Sun className="h-4 w-4 opacity-0" aria-hidden />
      ) : dark ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
