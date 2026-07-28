"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import type { ExamConfig } from "@/lib/types";
import { safeParseExamConfig, type ValidationIssue } from "@/lib/validation";
import {
  btnDanger,
  btnPrimary,
  cardClass,
  errorBoxClass,
  inputClass,
  labelClass,
  successBoxClass,
} from "./ui";

interface FormState {
  slug: string;
  code: string;
  title: string;
  description: string;
  questionCount: string;
  durationMinutes: string;
  passScore: string;
  maxScore: string;
  published: boolean;
  skillAreas: { id: string; name: string; weight: string }[];
  curve: { easy: string; medium: string; hard: string };
}

function toFormState(config?: ExamConfig): FormState {
  return {
    slug: config?.slug ?? "",
    code: config?.code ?? "",
    title: config?.title ?? "",
    description: config?.description ?? "",
    questionCount: String(config?.questionCount ?? 40),
    durationMinutes: String(config?.durationMinutes ?? 45),
    passScore: String(config?.passScore ?? 700),
    maxScore: String(config?.maxScore ?? 1000),
    published: config?.published !== false,
    skillAreas: (config?.skillAreas ?? [{ id: "", name: "", weight: 1 }]).map((a) => ({
      id: a.id,
      name: a.name,
      weight: String(a.weight),
    })),
    curve: {
      easy: String(config?.difficultyCurve.easy ?? 0.35),
      medium: String(config?.difficultyCurve.medium ?? 0.4),
      hard: String(config?.difficultyCurve.hard ?? 0.25),
    },
  };
}

function toConfig(f: FormState): ExamConfig {
  return {
    slug: f.slug.trim(),
    published: f.published,
    code: f.code.trim(),
    title: f.title.trim(),
    description: f.description.trim(),
    questionCount: Number(f.questionCount),
    durationMinutes: Number(f.durationMinutes),
    passScore: Number(f.passScore),
    maxScore: Number(f.maxScore),
    skillAreas: f.skillAreas.map((a) => ({
      id: a.id.trim(),
      name: a.name.trim(),
      weight: Number(a.weight),
    })),
    difficultyCurve: {
      easy: Number(f.curve.easy),
      medium: Number(f.curve.medium),
      hard: Number(f.curve.hard),
    },
  };
}

function FieldError({ msgs }: { msgs: string[] }) {
  if (msgs.length === 0) return null;
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{msgs.join(" · ")}</p>;
}

function SumHint({ label, sum }: { label: string; sum: number }) {
  const ok = Math.abs(sum - 1) < 0.001;
  return (
    <p
      className={`mt-2 text-xs ${
        ok ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"
      }`}
    >
      {label}: {Number.isNaN(sum) ? "—" : sum.toFixed(3)}
      {ok ? " ✓" : " — sollte in Summe 1.0 ergeben"}
    </p>
  );
}

export function ExamConfigForm({ initial, isNew }: { initial?: ExamConfig; isNew: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(initial));
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const patch = (p: Partial<FormState>) => setForm((f) => ({ ...f, ...p }));

  const errAt = (path: string) =>
    issues
      .filter((i) => i.path === path || i.path.startsWith(`${path}.`))
      .map((i) => i.message);

  const weightSum = useMemo(
    () => form.skillAreas.reduce((s, a) => s + Number(a.weight), 0),
    [form.skillAreas]
  );
  const curveSum = useMemo(
    () => Number(form.curve.easy) + Number(form.curve.medium) + Number(form.curve.hard),
    [form.curve]
  );

  async function save() {
    setServerError(null);
    setSaved(false);
    const result = safeParseExamConfig(toConfig(form));
    if (!result.ok) {
      setIssues(result.issues);
      return;
    }
    setIssues([]);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/exams/${encodeURIComponent(result.data.slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await res.json().catch(() => null)) as {
        error?: string;
        issues?: ValidationIssue[];
      } | null;
      if (!res.ok) {
        if (body?.issues) setIssues(body.issues);
        setServerError(body?.error ?? `Speichern fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      setSaved(true);
      if (isNew) {
        router.push(`/admin/exams/${result.data.slug}`);
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function deleteExam() {
    if (!initial) return;
    if (!confirm(`Examen "${initial.code}" mit allen Fragen und Inhalten löschen?`)) return;
    setServerError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/exams/${encodeURIComponent(initial.slug)}`, {
        method: "DELETE",
      });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setServerError(body?.error ?? `Löschen fehlgeschlagen (HTTP ${res.status})`);
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className={cardClass}>
        <h2 className="mb-4 text-sm font-semibold">Stammdaten</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Slug (URL-Kennung)</label>
            <input
              className={`${inputClass} font-mono ${isNew ? "" : "opacity-60"}`}
              value={form.slug}
              readOnly={!isNew}
              placeholder="z. B. ab-900"
              onChange={(e) => patch({ slug: e.target.value })}
            />
            {!isNew && (
              <p className="mt-1 text-xs text-zinc-500">Slug ist nach dem Anlegen fest.</p>
            )}
            <FieldError msgs={errAt("slug")} />
          </div>
          <div>
            <label className={labelClass}>Code</label>
            <input
              className={inputClass}
              value={form.code}
              placeholder="z. B. AB-900"
              onChange={(e) => patch({ code: e.target.value })}
            />
            <FieldError msgs={errAt("code")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Titel</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
            <FieldError msgs={errAt("title")} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Beschreibung</label>
            <textarea
              className={`${inputClass} min-h-20`}
              value={form.description}
              onChange={(e) => patch({ description: e.target.value })}
            />
            <FieldError msgs={errAt("description")} />
          </div>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => patch({ published: e.target.checked })}
          />
          Veröffentlicht (in der Practice-App sichtbar)
        </label>
      </section>

      <section className={cardClass}>
        <h2 className="mb-4 text-sm font-semibold">Prüfungs-Parameter</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          {(
            [
              ["questionCount", "Fragen pro Test"],
              ["durationMinutes", "Dauer (min)"],
              ["passScore", "Bestehensgrenze"],
              ["maxScore", "Max. Punkte"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                type="number"
                className={inputClass}
                value={form[key]}
                onChange={(e) => patch({ [key]: e.target.value } as Partial<FormState>)}
              />
              <FieldError msgs={errAt(key)} />
            </div>
          ))}
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="mb-4 text-sm font-semibold">Skill-Areas</h2>
        <div className="space-y-2">
          {form.skillAreas.map((area, i) => (
            <div key={i} className="flex flex-wrap items-start gap-2">
              <input
                className={`${inputClass} basis-32 font-mono`}
                value={area.id}
                placeholder="id"
                onChange={(e) => {
                  const skillAreas = [...form.skillAreas];
                  skillAreas[i] = { ...area, id: e.target.value };
                  patch({ skillAreas });
                }}
              />
              <input
                className={`${inputClass} min-w-40 flex-1`}
                value={area.name}
                placeholder="Name"
                onChange={(e) => {
                  const skillAreas = [...form.skillAreas];
                  skillAreas[i] = { ...area, name: e.target.value };
                  patch({ skillAreas });
                }}
              />
              <input
                type="number"
                step="0.025"
                min="0"
                max="1"
                className={`${inputClass} basis-24`}
                value={area.weight}
                placeholder="Gewicht"
                onChange={(e) => {
                  const skillAreas = [...form.skillAreas];
                  skillAreas[i] = { ...area, weight: e.target.value };
                  patch({ skillAreas });
                }}
              />
              <button
                type="button"
                aria-label="Skill-Area entfernen"
                className="mt-2 text-zinc-400 hover:text-red-600"
                onClick={() =>
                  patch({ skillAreas: form.skillAreas.filter((_, j) => j !== i) })
                }
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ))}
        </div>
        <FieldError msgs={errAt("skillAreas")} />
        <SumHint label="Summe der Gewichte" sum={weightSum} />
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline dark:text-brand-400"
          onClick={() =>
            patch({ skillAreas: [...form.skillAreas, { id: "", name: "", weight: "0" }] })
          }
        >
          <Plus className="h-4 w-4" aria-hidden />
          Skill-Area hinzufügen
        </button>
      </section>

      <section className={cardClass}>
        <h2 className="mb-4 text-sm font-semibold">Schwierigkeits-Kurve</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              ["easy", "🟢 leicht"],
              ["medium", "🟡 mittel"],
              ["hard", "🔴 schwer"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                className={inputClass}
                value={form.curve[key]}
                onChange={(e) => patch({ curve: { ...form.curve, [key]: e.target.value } })}
              />
              <FieldError msgs={errAt(`difficultyCurve.${key}`)} />
            </div>
          ))}
        </div>
        <SumHint label="Summe der Anteile" sum={curveSum} />
      </section>

      {issues.length > 0 && (
        <div className={errorBoxClass}>
          <p className="font-semibold">Bitte Eingaben prüfen:</p>
          <ul className="mt-1 list-inside list-disc">
            {issues.map((i, idx) => (
              <li key={idx}>
                {i.path ? <span className="font-mono">{i.path}</span> : "Formular"}: {i.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      {serverError && <div className={errorBoxClass}>{serverError}</div>}
      {saved && <div className={successBoxClass}>Gespeichert.</div>}

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className={btnPrimary} disabled={busy} onClick={save}>
          <Save className="h-4 w-4" aria-hidden />
          {isNew ? "Examen anlegen" : "Speichern"}
        </button>
        {!isNew && initial && (
          <button type="button" className={btnDanger} disabled={busy} onClick={deleteExam}>
            <Trash2 className="h-4 w-4" aria-hidden />
            Examen löschen (nur Admin)
          </button>
        )}
      </div>
    </div>
  );
}
