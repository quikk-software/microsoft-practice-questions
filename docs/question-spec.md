# Frage-Spezifikation für den Pool

Fragen liegen als JSON-Array in `data/exams/<slug>/questions/*.json`. TypeScript-Typen: `lib/types.ts`.

## Grundregeln

- **Nur aus den Lerninhalten ableiten** (`data/exams/<slug>/content/`), nichts dazuerfinden. Jede Frage muss durch den Inhalt der referenzierten Unit belegbar sein.
- Fragen und Antwortoptionen auf **Englisch** (wie das echte Examen), `explanation` auf **Deutsch**.
- Stil wie Microsoft-Prüfungen: Szenario-basiert wo möglich ("You need to …", "Your organization wants to …"), präzise Distraktoren, die plausibel klingen, aber klar falsch sind.
- Die offiziellen "Module assessment"-Units zeigen den Stil — **nicht wörtlich kopieren**, sondern eigene Fragen im selben Stil bauen.
- Jede Frage bekommt:
  - `source`: `{ "title": "<Unit-Titel>", "url": "<Unit-URL>", "quote": "<wörtlicher Textausschnitt>" }` — die Unit, aus der sie stammt
  - `source.quote`: der **exakte, wörtliche Textausschnitt** (1–3 Sätze, unverändert aus dem Unit-Markdown kopiert), der die richtige Antwort belegt
  - `reference`: die Unit-URL (oder eine spezifischere Microsoft-Learn-Doku-URL, wenn im Inhalt verlinkt)
  - `explanation`: 1–3 Sätze — warum richtig, ggf. warum die Distraktoren falsch sind

## Felder (alle Typen)

```json
{
  "id": "<prefix>-NNN",
  "type": "single-choice | multiple-choice | yes-no | ordering | matching | dropdown",
  "skillArea": "<area-id aus exam.json>",
  "topic": "Kurzes Thema (2-4 Wörter, Englisch)",
  "difficulty": "easy | medium | hard",
  "prompt": "Fragetext (Englisch)",
  "explanation": "Deutsch",
  "reference": "https://learn.microsoft.com/…",
  "source": { "title": "…", "url": "…" }
}
```

## Typ-spezifische Felder

- **single-choice**: `options: [{id, text}]` (4 Optionen, ids a–d), `correct: "<optionId>"`
- **multiple-choice**: `options` (4–5), `correct: ["<id>", "<id>"]` — im Prompt "Each correct answer presents a complete solution." bzw. "… part of the solution."
- **yes-no**: `statements: [{id: "s1", text, correct: true|false}]` (3 Statements)
- **ordering**: `items: [{id, text}]`, `correctOrder: ["i1", …]` (4–5 Schritte)
- **matching**: `left: [{id, text}]`, `right: [{id, text}]`, `correct: {"l1": "r1", …}` (4 Paare)
- **dropdown**: `textParts: ["…", "…", "…"]` (n+1 Teile bei n Lücken), `blanks: [{id, options: [{id, text}] (3), correct}]` (2 Lücken)

## Schwierigkeitsgrade

- **easy**: Definition/Zweck eines einzelnen Konzepts wiedererkennen ("What is the purpose of X?")
- **medium**: Konzept auf ein einfaches Szenario anwenden oder zwei ähnliche Konzepte abgrenzen ("You need to … which tool?")
- **hard**: Mehrschrittige Szenarien, feine Abgrenzungen (z. B. App Registration vs. Enterprise App), Kombination mehrerer Konzepte

## Mix pro Modul (~24 Fragen)

- Schwierigkeit: ~8 easy, ~10 medium, ~6 hard
- Typen: ~10 single-choice, ~4 multiple-choice, ~4 yes-no, ~2 ordering, ~2 matching, ~2 dropdown
- Themen breit über alle Units des Moduls streuen (nicht alles aus einer Unit)
