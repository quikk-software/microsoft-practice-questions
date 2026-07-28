"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, Pencil, Plus, Trash2, Upload } from "lucide-react";
import type { ExamConfig, Question } from "@/lib/types";
import type { ValidationIssue } from "@/lib/validation";
import {
  DIFFICULTY_LABEL,
  TYPE_LABEL,
  btnPrimary,
  btnSecondary,
  errorBoxClass,
  inputClass,
  selectClass,
  successBoxClass,
} from "./ui";
import { QUESTION_TYPES } from "./questionSkeleton";

interface ImportReport {
  total: number;
  imported: number;
  ok: string[];
  failed: { id: string; issues: ValidationIssue[] }[];
}

export function QuestionTable({
  slug,
  config,
  questions,
}: {
  slug: string;
  config: ExamConfig;
  questions: Question[];
}) {
  const router = useRouter();
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [skillArea, setSkillArea] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [newType, setNewType] = useState("single-choice");
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [importReport, setImportReport] = useState<ImportReport | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return questions.filter((q) => {
      if (deletedIds.has(q.id)) return false;
      if (type && q.type !== type) return false;
      if (difficulty && q.difficulty !== difficulty) return false;
      if (skillArea && q.skillArea !== skillArea) return false;
      if (status && (q.status ?? "published") !== status) return false;
      if (
        needle &&
        ![q.id, q.prompt, q.topic].some((s) => s.toLowerCase().includes(needle))
      )
        return false;
      return true;
    });
  }, [questions, deletedIds, type, difficulty, skillArea, status, search]);

  async function deleteQuestion(q: Question) {
    if (!confirm(`Frage "${q.id}" wirklich löschen?`)) return;
    setError(null);
    const res = await fetch(
      `/api/admin/exams/${encodeURIComponent(slug)}/questions/${encodeURIComponent(q.id)}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? `Löschen fehlgeschlagen (HTTP ${res.status})`);
      return;
    }
    setDeletedIds((s) => new Set(s).add(q.id));
    router.refresh();
  }

  async function importFile(file: File) {
    setError(null);
    setImportReport(null);
    setImporting(true);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        setError("Datei ist kein gültiges JSON.");
        return;
      }
      if (!Array.isArray(parsed)) {
        setError("Erwartet wird ein JSON-Array von Fragen.");
        return;
      }
      const res = await fetch(`/api/admin/exams/${encodeURIComponent(slug)}/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const body = (await res.json().catch(() => null)) as
        | (ImportReport & { error?: string })
        | null;
      if (!res.ok || !body) {
        setError(body?.error ?? `Import fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      setImportReport(body);
      router.refresh();
    } finally {
      setImporting(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <div>
      {/* Aktionen */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={selectClass}
          value={newType}
          aria-label="Typ für neue Frage"
          onChange={(e) => setNewType(e.target.value)}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <Link
          href={`/admin/exams/${slug}/questions/new?type=${newType}`}
          className={btnPrimary}
        >
          <Plus className="h-4 w-4" aria-hidden />
          Neue Frage
        </Link>
        <span className="mx-1 hidden h-6 w-px bg-zinc-200 sm:block dark:bg-zinc-800" />
        <a href={`/api/admin/exams/${slug}/export`} className={btnSecondary} download>
          <Download className="h-4 w-4" aria-hidden />
          Export (Bundle)
        </a>
        <button
          type="button"
          className={btnSecondary}
          disabled={importing}
          onClick={() => fileInput.current?.click()}
        >
          <Upload className="h-4 w-4" aria-hidden />
          {importing ? "Importiere …" : "Import (Fragen-JSON)"}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void importFile(f);
          }}
        />
      </div>

      {error && <div className={`${errorBoxClass} mt-4`}>{error}</div>}
      {importReport && (
        <div
          className={`mt-4 ${importReport.failed.length === 0 ? successBoxClass : errorBoxClass}`}
        >
          <p className="font-semibold">
            Import: {importReport.imported} von {importReport.total} Fragen übernommen.
          </p>
          {importReport.failed.length > 0 && (
            <ul className="mt-1 list-inside list-disc">
              {importReport.failed.map((f) => (
                <li key={f.id}>
                  <span className="font-mono">{f.id}</span>:{" "}
                  {f.issues.map((i) => `${i.path ? `${i.path}: ` : ""}${i.message}`).join(" · ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Filter */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <input
          className={`${inputClass} max-w-56`}
          placeholder="Suche (id, Prompt, Topic) …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Alle Typen</option>
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Alle Schwierigkeiten</option>
          {(["easy", "medium", "hard"] as const).map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABEL[d]}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={skillArea}
          onChange={(e) => setSkillArea(e.target.value)}
        >
          <option value="">Alle Skill-Areas</option>
          {config.skillAreas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Alle Status</option>
          <option value="draft">Entwurf</option>
          <option value="published">Veröffentlicht</option>
        </select>
        <span className="ml-auto text-sm text-zinc-500">
          {filtered.length} von {questions.length - deletedIds.size} Fragen
        </span>
      </div>

      {/* Liste */}
      <div className="mt-4 space-y-2">
        {filtered.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
            Keine Fragen gefunden.
          </p>
        )}
        {filtered.map((q) => (
          <div
            key={q.id}
            className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-zinc-500">{q.id}</span>
                <span className="rounded bg-brand-100 px-1.5 py-0.5 font-medium text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                  {TYPE_LABEL[q.type]}
                </span>
                <span className="text-zinc-500">{DIFFICULTY_LABEL[q.difficulty]}</span>
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {q.skillArea}
                </span>
                {(q.status ?? "published") === "draft" && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Entwurf
                  </span>
                )}
              </div>
              <p className="mt-1.5 truncate text-sm">{q.prompt}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{q.topic}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/exams/${slug}/questions/${encodeURIComponent(q.id)}`}
                aria-label={`Frage ${q.id} bearbeiten`}
                className="rounded border border-zinc-300 p-1.5 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              >
                <Pencil className="h-4 w-4" aria-hidden />
              </Link>
              <button
                type="button"
                aria-label={`Frage ${q.id} löschen`}
                className="rounded border border-zinc-300 p-1.5 text-zinc-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-red-950/40"
                onClick={() => void deleteQuestion(q)}
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
