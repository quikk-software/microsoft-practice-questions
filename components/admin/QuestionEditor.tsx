"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Eye, EyeOff, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import type {
  Answer,
  DropdownQuestion,
  ExamConfig,
  MatchingQuestion,
  MultipleChoiceQuestion,
  Option,
  OrderingQuestion,
  Question,
  SingleChoiceQuestion,
  YesNoQuestion,
} from "@/lib/types";
import { stripAnswers } from "@/lib/engine";
import { QuestionView } from "@/components/QuestionView";
import { safeParseQuestion, type ValidationIssue } from "@/lib/validation";
import {
  TYPE_LABEL,
  btnPrimary,
  btnSecondary,
  cardClass,
  errorBoxClass,
  iconBtn,
  inputClass,
  labelClass,
  selectClass,
  successBoxClass,
} from "./ui";

// ---- id-Helfer für neue Listeneinträge ----

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

function nextLetterId(list: { id: string }[]): string {
  const used = new Set(list.map((o) => o.id));
  for (const c of LETTERS) if (!used.has(c)) return c;
  return `o${list.length + 1}`;
}

function nextPrefixedId(list: { id: string }[], prefix: string): string {
  const used = new Set(list.map((o) => o.id));
  let n = list.length + 1;
  while (used.has(`${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}

function replaceAt<T>(list: T[], index: number, value: T): T[] {
  const next = [...list];
  next[index] = value;
  return next;
}

type ErrFn = (path: string) => string[];

/** Für useSyncExternalStore als Hydration-Detektor: nie Updates, nur Server/Client-Snapshot. */
const subscribeNoop = () => () => {};

function FieldError({ msgs }: { msgs: string[] }) {
  if (msgs.length === 0) return null;
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{msgs.join(" · ")}</p>;
}

function IdBadge({ id }: { id: string }) {
  return (
    <span className="w-8 shrink-0 text-center font-mono text-xs text-zinc-400">{id}</span>
  );
}

// ---- Haupt-Editor ----

export function QuestionEditor({
  slug,
  config,
  initial,
  isNew,
}: {
  slug: string;
  config: ExamConfig;
  initial: Question;
  isNew: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Question>(initial);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  // Live-Preview: Public-Variante ohne Lösungen (wie in der Practice-App).
  // stripAnswers mischt die Optionen — deshalb erst nach der Hydration rendern,
  // sonst weicht die Server-HTML vom Client ab (Hydration-Mismatch).
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
  const previewKey = JSON.stringify(draft);
  const publicQuestion = useMemo(() => {
    if (!mounted) return null;
    try {
      return stripAnswers(draft);
    } catch {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, previewKey]);
  // Antwort-State der Vorschau; wird beim Ändern der Frage automatisch verworfen
  // (Key-Vergleich statt useEffect, vermeidet kaskadierende Renders).
  const [answerState, setAnswerState] = useState<{ key: string; answer: Answer | null }>({
    key: previewKey,
    answer: null,
  });
  const answer = answerState.key === previewKey ? answerState.answer : null;
  const setAnswer = (a: Answer | null) => setAnswerState({ key: previewKey, answer: a });
  const [showSolution, setShowSolution] = useState(false);

  const patch = (p: object) => setDraft((d) => ({ ...d, ...p }) as Question);

  const errAt: ErrFn = (path) =>
    issues.filter((i) => i.path === path || i.path.startsWith(`${path}.`)).map((i) => i.message);

  async function save() {
    setServerError(null);
    setSaved(false);
    const result = safeParseQuestion(config, draft);
    if (!result.ok) {
      setIssues(result.issues);
      return;
    }
    setIssues([]);
    setBusy(true);
    try {
      const res = await fetch(
        `/api/admin/exams/${encodeURIComponent(slug)}/questions/${encodeURIComponent(result.data.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        }
      );
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
      router.refresh();
      if (isNew) {
        router.replace(
          `/admin/exams/${slug}/questions/${encodeURIComponent(result.data.id)}`
        );
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      {/* ---- Formular ---- */}
      <div className="space-y-6">
        <section className={cardClass}>
          <h2 className="mb-4 text-sm font-semibold">
            Allgemein ·{" "}
            <span className="rounded bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-950 dark:text-brand-300">
              {TYPE_LABEL[draft.type]}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>id</label>
              <input
                className={`${inputClass} font-mono ${isNew ? "" : "opacity-60"}`}
                value={draft.id}
                readOnly={!isNew}
                placeholder="z. B. core-025"
                onChange={(e) => patch({ id: e.target.value })}
              />
              <FieldError msgs={errAt("id")} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={`${selectClass} w-full`}
                value={draft.status ?? "published"}
                onChange={(e) => patch({ status: e.target.value })}
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Topic</label>
              <input
                className={inputClass}
                value={draft.topic}
                placeholder="z. B. Admin roles"
                onChange={(e) => patch({ topic: e.target.value })}
              />
              <FieldError msgs={errAt("topic")} />
            </div>
            <div>
              <label className={labelClass}>Schwierigkeit</label>
              <select
                className={`${selectClass} w-full`}
                value={draft.difficulty}
                onChange={(e) => patch({ difficulty: e.target.value })}
              >
                <option value="easy">🟢 leicht</option>
                <option value="medium">🟡 mittel</option>
                <option value="hard">🔴 schwer</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Skill-Area</label>
              <select
                className={`${selectClass} w-full`}
                value={draft.skillArea}
                onChange={(e) => patch({ skillArea: e.target.value })}
              >
                {config.skillAreas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.id})
                  </option>
                ))}
              </select>
              <FieldError msgs={errAt("skillArea")} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Prompt (Englisch)</label>
              <textarea
                className={`${inputClass} min-h-20`}
                value={draft.prompt}
                onChange={(e) => patch({ prompt: e.target.value })}
              />
              <FieldError msgs={errAt("prompt")} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Erklärung (Deutsch)</label>
              <textarea
                className={`${inputClass} min-h-20`}
                value={draft.explanation}
                onChange={(e) => patch({ explanation: e.target.value })}
              />
              <FieldError msgs={errAt("explanation")} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Referenz-URL (optional)</label>
              <input
                className={inputClass}
                value={draft.reference ?? ""}
                placeholder="https://learn.microsoft.com/…"
                onChange={(e) => patch({ reference: e.target.value || undefined })}
              />
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="mb-4 text-sm font-semibold">Quelle (Lerninhalt-Unit)</h2>
          <div className="grid gap-4">
            <div>
              <label className={labelClass}>Titel</label>
              <input
                className={inputClass}
                value={draft.source?.title ?? ""}
                onChange={(e) =>
                  patch({ source: { ...(draft.source ?? { url: "" }), title: e.target.value } })
                }
              />
              <FieldError msgs={errAt("source.title")} />
            </div>
            <div>
              <label className={labelClass}>URL</label>
              <input
                className={inputClass}
                value={draft.source?.url ?? ""}
                placeholder="https://learn.microsoft.com/…"
                onChange={(e) =>
                  patch({ source: { ...(draft.source ?? { title: "" }), url: e.target.value } })
                }
              />
              <FieldError msgs={errAt("source.url")} />
            </div>
            <div>
              <label className={labelClass}>Zitat (wörtlich, optional aber empfohlen)</label>
              <textarea
                className={`${inputClass} min-h-16`}
                value={draft.source?.quote ?? ""}
                onChange={(e) =>
                  patch({
                    source: {
                      ...(draft.source ?? { title: "", url: "" }),
                      quote: e.target.value || undefined,
                    },
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="mb-4 text-sm font-semibold">Antwort &amp; Lösung</h2>
          <TypeFields draft={draft} set={setDraft} errAt={errAt} />
        </section>

        {issues.length > 0 && (
          <div className={errorBoxClass}>
            <p className="font-semibold">Bitte Eingaben prüfen:</p>
            <ul className="mt-1 list-inside list-disc">
              {issues.map((i, idx) => (
                <li key={idx}>
                  {i.path ? <span className="font-mono">{i.path}</span> : "Frage"}: {i.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        {serverError && <div className={errorBoxClass}>{serverError}</div>}
        {saved && <div className={successBoxClass}>Gespeichert.</div>}

        <button type="button" className={btnPrimary} disabled={busy} onClick={save}>
          <Save className="h-4 w-4" aria-hidden />
          {isNew ? "Frage anlegen" : "Speichern"}
        </button>
      </div>

      {/* ---- Live-Preview ---- */}
      <div className="lg:sticky lg:top-6">
        <div className={cardClass}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">Live-Vorschau</h2>
            <div className="flex gap-2">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setAnswer(null);
                  setShowSolution(false);
                }}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Zurücksetzen
              </button>
              <button
                type="button"
                className={btnSecondary}
                onClick={() => setShowSolution((s) => !s)}
              >
                {showSolution ? (
                  <EyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden />
                )}
                {showSolution ? "Lösung ausblenden" : "Lösung anzeigen"}
              </button>
            </div>
          </div>
          {publicQuestion ? (
            <QuestionView
              question={publicQuestion}
              answer={answer}
              onChange={setAnswer}
              solution={showSolution ? draft : null}
            />
          ) : (
            <p className="text-sm text-zinc-500">
              {mounted ? "Vorschau derzeit nicht möglich — Eingaben unvollständig." : "Vorschau lädt …"}
            </p>
          )}
          {showSolution && draft.explanation && (
            <div className="mt-6 rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm dark:border-brand-900 dark:bg-brand-950/40">
              <p className="mb-1 text-xs font-semibold text-brand-800 dark:text-brand-300">
                Erklärung
              </p>
              {draft.explanation}
            </div>
          )}
          <p className="mt-4 text-xs text-zinc-400">
            So sieht die Frage in der Practice-App aus (Antwortoptionen werden dort gemischt).
            Frage durchspielen, dann „Lösung anzeigen“ für das Feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Typspezifische Formulare ----

function TypeFields({
  draft,
  set,
  errAt,
}: {
  draft: Question;
  set: (q: Question) => void;
  errAt: ErrFn;
}) {
  switch (draft.type) {
    case "single-choice":
      return <SingleChoiceFields q={draft} set={set} errAt={errAt} />;
    case "multiple-choice":
      return <MultipleChoiceFields q={draft} set={set} errAt={errAt} />;
    case "yes-no":
      return <YesNoFields q={draft} set={set} errAt={errAt} />;
    case "ordering":
      return <OrderingFields q={draft} set={set} errAt={errAt} />;
    case "matching":
      return <MatchingFields q={draft} set={set} errAt={errAt} />;
    case "dropdown":
      return <DropdownFields q={draft} set={set} errAt={errAt} />;
  }
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 hover:underline dark:text-brand-400"
      onClick={onClick}
    >
      <Plus className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="shrink-0 text-zinc-400 hover:text-red-600"
      onClick={onClick}
    >
      <Trash2 className="h-4 w-4" aria-hidden />
    </button>
  );
}

function SingleChoiceFields({
  q,
  set,
  errAt,
}: {
  q: SingleChoiceQuestion;
  set: (q: SingleChoiceQuestion) => void;
  errAt: ErrFn;
}) {
  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">Radio-Button = richtige Antwort.</p>
      <div className="space-y-2">
        {q.options.map((o, i) => (
          <div key={o.id} className="flex items-center gap-2">
            <input
              type="radio"
              name="sc-correct"
              aria-label={`Option ${o.id} als richtig markieren`}
              checked={q.correct === o.id}
              onChange={() => set({ ...q, correct: o.id })}
            />
            <IdBadge id={o.id} />
            <input
              className={inputClass}
              value={o.text}
              placeholder="Antworttext (Englisch)"
              onChange={(e) =>
                set({ ...q, options: replaceAt(q.options, i, { ...o, text: e.target.value }) })
              }
            />
            <RemoveButton
              label={`Option ${o.id} entfernen`}
              onClick={() =>
                set({
                  ...q,
                  options: q.options.filter((x) => x.id !== o.id),
                  correct: q.correct === o.id ? "" : q.correct,
                })
              }
            />
          </div>
        ))}
      </div>
      <FieldError msgs={[...errAt("options"), ...errAt("correct")]} />
      <AddButton
        label="Option hinzufügen"
        onClick={() =>
          set({ ...q, options: [...q.options, { id: nextLetterId(q.options), text: "" }] })
        }
      />
    </div>
  );
}

function MultipleChoiceFields({
  q,
  set,
  errAt,
}: {
  q: MultipleChoiceQuestion;
  set: (q: MultipleChoiceQuestion) => void;
  errAt: ErrFn;
}) {
  const toggle = (id: string) => {
    const next = q.correct.includes(id)
      ? q.correct.filter((c) => c !== id)
      : [...q.correct, id];
    set({ ...q, correct: next });
  };
  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">Checkboxen = richtige Antworten (mindestens 2).</p>
      <div className="space-y-2">
        {q.options.map((o, i) => (
          <div key={o.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              aria-label={`Option ${o.id} als richtig markieren`}
              checked={q.correct.includes(o.id)}
              onChange={() => toggle(o.id)}
            />
            <IdBadge id={o.id} />
            <input
              className={inputClass}
              value={o.text}
              placeholder="Antworttext (Englisch)"
              onChange={(e) =>
                set({ ...q, options: replaceAt(q.options, i, { ...o, text: e.target.value }) })
              }
            />
            <RemoveButton
              label={`Option ${o.id} entfernen`}
              onClick={() =>
                set({
                  ...q,
                  options: q.options.filter((x) => x.id !== o.id),
                  correct: q.correct.filter((c) => c !== o.id),
                })
              }
            />
          </div>
        ))}
      </div>
      <FieldError msgs={[...errAt("options"), ...errAt("correct")]} />
      <AddButton
        label="Option hinzufügen"
        onClick={() =>
          set({ ...q, options: [...q.options, { id: nextLetterId(q.options), text: "" }] })
        }
      />
    </div>
  );
}

function YesNoFields({
  q,
  set,
  errAt,
}: {
  q: YesNoQuestion;
  set: (q: YesNoQuestion) => void;
  errAt: ErrFn;
}) {
  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">Pro Statement den korrekten Wert (Ja/Nein) wählen.</p>
      <div className="space-y-2">
        {q.statements.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <IdBadge id={s.id} />
            <input
              className={inputClass}
              value={s.text}
              placeholder="Statement (Englisch)"
              onChange={(e) =>
                set({
                  ...q,
                  statements: replaceAt(q.statements, i, { ...s, text: e.target.value }),
                })
              }
            />
            <div className="flex shrink-0 gap-3 text-sm">
              {(
                [
                  ["Ja", true],
                  ["Nein", false],
                ] as const
              ).map(([label, value]) => (
                <label key={label} className="flex cursor-pointer items-center gap-1">
                  <input
                    type="radio"
                    name={`yn-${s.id}`}
                    checked={s.correct === value}
                    onChange={() =>
                      set({
                        ...q,
                        statements: replaceAt(q.statements, i, { ...s, correct: value }),
                      })
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
            <RemoveButton
              label={`Statement ${s.id} entfernen`}
              onClick={() =>
                set({ ...q, statements: q.statements.filter((x) => x.id !== s.id) })
              }
            />
          </div>
        ))}
      </div>
      <FieldError msgs={errAt("statements")} />
      <AddButton
        label="Statement hinzufügen"
        onClick={() =>
          set({
            ...q,
            statements: [
              ...q.statements,
              { id: nextPrefixedId(q.statements, "s"), text: "", correct: false },
            ],
          })
        }
      />
    </div>
  );
}

function OrderingFields({
  q,
  set,
  errAt,
}: {
  q: OrderingQuestion;
  set: (q: OrderingQuestion) => void;
  errAt: ErrFn;
}) {
  const byId = new Map(q.items.map((it) => [it.id, it]));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= q.correctOrder.length) return;
    const next = [...q.correctOrder];
    [next[index], next[target]] = [next[target], next[index]];
    set({ ...q, correctOrder: next });
  };
  const updateText = (id: string, text: string) => {
    const idx = q.items.findIndex((it) => it.id === id);
    if (idx < 0) return;
    set({ ...q, items: replaceAt(q.items, idx, { ...q.items[idx], text }) });
  };
  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">
        Die Reihenfolge hier ist die korrekte Lösung — in der App wird gemischt angezeigt.
      </p>
      <ol className="space-y-2">
        {q.correctOrder.map((id, i) => (
          <li key={id} className="flex items-center gap-2">
            <span className="w-5 shrink-0 text-center font-mono text-xs text-zinc-400">
              {i + 1}
            </span>
            <input
              className={inputClass}
              value={byId.get(id)?.text ?? ""}
              placeholder="Schritt (Englisch)"
              onChange={(e) => updateText(id, e.target.value)}
            />
            <button
              type="button"
              className={iconBtn}
              aria-label="Nach oben"
              disabled={i === 0}
              onClick={() => move(i, -1)}
            >
              <ChevronUp className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className={iconBtn}
              aria-label="Nach unten"
              disabled={i === q.correctOrder.length - 1}
              onClick={() => move(i, 1)}
            >
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            <RemoveButton
              label={`Schritt ${id} entfernen`}
              onClick={() =>
                set({
                  ...q,
                  items: q.items.filter((x) => x.id !== id),
                  correctOrder: q.correctOrder.filter((x) => x !== id),
                })
              }
            />
          </li>
        ))}
      </ol>
      <FieldError msgs={[...errAt("items"), ...errAt("correctOrder")]} />
      <AddButton
        label="Schritt hinzufügen"
        onClick={() => {
          const id = nextPrefixedId(q.items, "i");
          set({
            ...q,
            items: [...q.items, { id, text: "" }],
            correctOrder: [...q.correctOrder, id],
          });
        }}
      />
    </div>
  );
}

function MatchingFields({
  q,
  set,
  errAt,
}: {
  q: MatchingQuestion;
  set: (q: MatchingQuestion) => void;
  errAt: ErrFn;
}) {
  const setCorrect = (leftId: string, rightId: string) =>
    set({ ...q, correct: { ...q.correct, [leftId]: rightId } });
  const removeLeft = (l: Option) =>
    set({
      ...q,
      left: q.left.filter((x) => x.id !== l.id),
      correct: Object.fromEntries(Object.entries(q.correct).filter(([k]) => k !== l.id)),
    });
  const removeRight = (r: Option) =>
    set({
      ...q,
      right: q.right.filter((x) => x.id !== r.id),
      correct: Object.fromEntries(Object.entries(q.correct).filter(([, v]) => v !== r.id)),
    });
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold text-zinc-500">
          Rechte Seite (Zuordnungs-Ziele)
        </h3>
        <div className="space-y-2">
          {q.right.map((r, i) => (
            <div key={r.id} className="flex items-center gap-2">
              <IdBadge id={r.id} />
              <input
                className={inputClass}
                value={r.text}
                placeholder="Text (Englisch)"
                onChange={(e) =>
                  set({ ...q, right: replaceAt(q.right, i, { ...r, text: e.target.value }) })
                }
              />
              <RemoveButton label={`${r.id} entfernen`} onClick={() => removeRight(r)} />
            </div>
          ))}
        </div>
        <FieldError msgs={errAt("right")} />
        <AddButton
          label="Ziel hinzufügen"
          onClick={() =>
            set({ ...q, right: [...q.right, { id: nextPrefixedId(q.right, "r"), text: "" }] })
          }
        />
      </div>
      <div>
        <h3 className="mb-2 text-xs font-semibold text-zinc-500">
          Linke Seite + korrekte Zuordnung
        </h3>
        <div className="space-y-2">
          {q.left.map((l, i) => (
            <div key={l.id} className="flex flex-wrap items-center gap-2">
              <IdBadge id={l.id} />
              <input
                className={`${inputClass} min-w-40 flex-1`}
                value={l.text}
                placeholder="Text (Englisch)"
                onChange={(e) =>
                  set({ ...q, left: replaceAt(q.left, i, { ...l, text: e.target.value }) })
                }
              />
              <select
                className={selectClass}
                aria-label={`Zuordnung für ${l.id}`}
                value={q.correct[l.id] ?? ""}
                onChange={(e) => setCorrect(l.id, e.target.value)}
              >
                <option value="" disabled>
                  Zuordnung wählen …
                </option>
                {q.right.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.text || r.id}
                  </option>
                ))}
              </select>
              <RemoveButton label={`${l.id} entfernen`} onClick={() => removeLeft(l)} />
            </div>
          ))}
        </div>
        <FieldError msgs={[...errAt("left"), ...errAt("correct")]} />
        <AddButton
          label="Paar hinzufügen"
          onClick={() =>
            set({ ...q, left: [...q.left, { id: nextPrefixedId(q.left, "l"), text: "" }] })
          }
        />
      </div>
    </div>
  );
}

function DropdownFields({
  q,
  set,
  errAt,
}: {
  q: DropdownQuestion;
  set: (q: DropdownQuestion) => void;
  errAt: ErrFn;
}) {
  const removeBlank = (index: number) => {
    const textParts = [...q.textParts];
    // Textteil vor und nach der Lücke zusammenführen
    textParts.splice(index, 2, `${textParts[index] ?? ""}${textParts[index + 1] ?? ""}`);
    set({ ...q, blanks: q.blanks.filter((_, i) => i !== index), textParts });
  };
  return (
    <div>
      <p className="mb-3 text-xs text-zinc-500">
        Satzteile und Lücken wechseln sich ab: Teil 1, Lücke 1, Teil 2, … (n Lücken = n+1 Teile).
      </p>
      <div className="space-y-3">
        {q.textParts.map((part, i) => (
          <div key={i} className="space-y-3">
            <div>
              <label className={labelClass}>Textteil {i + 1}</label>
              <textarea
                className={`${inputClass} min-h-12`}
                value={part}
                onChange={(e) =>
                  set({ ...q, textParts: replaceAt(q.textParts, i, e.target.value) })
                }
              />
            </div>
            {i < q.blanks.length && (
              <div className="rounded-lg border border-brand-200 bg-brand-50/50 p-3 dark:border-brand-900 dark:bg-brand-950/20">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-800 dark:text-brand-300">
                    Lücke {i + 1} ({q.blanks[i].id}) — Radio = korrekte Option
                  </span>
                  <RemoveButton
                    label={`Lücke ${q.blanks[i].id} entfernen`}
                    onClick={() => removeBlank(i)}
                  />
                </div>
                <div className="space-y-2">
                  {q.blanks[i].options.map((o, oi) => (
                    <div key={o.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`blank-${q.blanks[i].id}`}
                        aria-label={`Option ${o.id} als korrekt markieren`}
                        checked={q.blanks[i].correct === o.id}
                        onChange={() =>
                          set({
                            ...q,
                            blanks: replaceAt(q.blanks, i, { ...q.blanks[i], correct: o.id }),
                          })
                        }
                      />
                      <IdBadge id={o.id} />
                      <input
                        className={inputClass}
                        value={o.text}
                        placeholder="Optionstext"
                        onChange={(e) =>
                          set({
                            ...q,
                            blanks: replaceAt(q.blanks, i, {
                              ...q.blanks[i],
                              options: replaceAt(q.blanks[i].options, oi, {
                                ...o,
                                text: e.target.value,
                              }),
                            }),
                          })
                        }
                      />
                      <RemoveButton
                        label={`Option ${o.id} entfernen`}
                        onClick={() =>
                          set({
                            ...q,
                            blanks: replaceAt(q.blanks, i, {
                              ...q.blanks[i],
                              options: q.blanks[i].options.filter((x) => x.id !== o.id),
                              correct: q.blanks[i].correct === o.id ? "" : q.blanks[i].correct,
                            }),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <FieldError msgs={errAt(`blanks.${i}`)} />
                <AddButton
                  label="Option hinzufügen"
                  onClick={() =>
                    set({
                      ...q,
                      blanks: replaceAt(q.blanks, i, {
                        ...q.blanks[i],
                        options: [
                          ...q.blanks[i].options,
                          { id: nextLetterId(q.blanks[i].options), text: "" },
                        ],
                      }),
                    })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <FieldError msgs={[...errAt("textParts"), ...errAt("blanks")].filter((m, i, a) => a.indexOf(m) === i)} />
      <AddButton
        label="Lücke hinzufügen"
        onClick={() =>
          set({
            ...q,
            textParts: [...q.textParts, ""],
            blanks: [
              ...q.blanks,
              {
                id: nextPrefixedId(q.blanks, "b"),
                options: [
                  { id: "a", text: "" },
                  { id: "b", text: "" },
                  { id: "c", text: "" },
                ],
                correct: "a",
              },
            ],
          })
        }
      />
    </div>
  );
}
