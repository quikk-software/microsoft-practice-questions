// Gemeinsame Tailwind-Klassen für den Admin-Bereich (Stil wie die Practice-App).

export const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-900";

export const selectClass =
  "rounded-lg border border-zinc-300 bg-white px-2 py-2 text-sm outline-none focus:border-brand-500 dark:border-zinc-700 dark:bg-zinc-900";

export const labelClass =
  "mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400";

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50";

export const btnSecondary =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800";

export const btnDanger =
  "inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-950/40";

export const iconBtn =
  "rounded border border-zinc-300 p-1.5 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800 disabled:opacity-30 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200";

export const cardClass =
  "rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900";

export const errorBoxClass =
  "rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300";

export const successBoxClass =
  "rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300";

export const infoBoxClass =
  "rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm text-brand-900 dark:border-brand-900 dark:bg-brand-950/40 dark:text-brand-200";

export const TYPE_LABEL: Record<string, string> = {
  "single-choice": "Single Choice",
  "multiple-choice": "Multiple Choice",
  "yes-no": "Ja/Nein",
  ordering: "Reihenfolge",
  matching: "Zuordnung",
  dropdown: "Dropdown-Lücken",
};

export const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "🟢 leicht",
  medium: "🟡 mittel",
  hard: "🔴 schwer",
};
