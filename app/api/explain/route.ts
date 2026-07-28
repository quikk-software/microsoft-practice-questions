import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getRepository } from "@/lib/data";
import { retrieve } from "@/lib/rag";
import type { Answer, Question } from "@/lib/types";

export const maxDuration = 60;

interface ExplainRequest {
  examSlug: string;
  questionId: string;
  answer: Answer | null;
}

function describeQuestion(q: Question): string {
  switch (q.type) {
    case "single-choice":
      return [
        `Frage (Single Choice): ${q.prompt}`,
        ...q.options.map((o) => `- [${o.id}] ${o.text}`),
        `Korrekte Antwort: ${q.correct}`,
      ].join("\n");
    case "multiple-choice":
      return [
        `Frage (Multiple Choice, ${q.correct.length} Antworten): ${q.prompt}`,
        ...q.options.map((o) => `- [${o.id}] ${o.text}`),
        `Korrekte Antworten: ${q.correct.join(", ")}`,
      ].join("\n");
    case "yes-no":
      return [
        `Frage (Ja/Nein-Serie): ${q.prompt}`,
        ...q.statements.map(
          (s) => `- [${s.id}] ${s.text} -> Korrekt: ${s.correct ? "Ja" : "Nein"}`
        ),
      ].join("\n");
    case "ordering":
      return [
        `Frage (Reihenfolge): ${q.prompt}`,
        `Elemente: ${q.items.map((i) => `[${i.id}] ${i.text}`).join("; ")}`,
        `Korrekte Reihenfolge: ${q.correctOrder.join(" -> ")}`,
      ].join("\n");
    case "matching":
      return [
        `Frage (Zuordnung): ${q.prompt}`,
        `Links: ${q.left.map((l) => `[${l.id}] ${l.text}`).join("; ")}`,
        `Rechts: ${q.right.map((r) => `[${r.id}] ${r.text}`).join("; ")}`,
        `Korrekte Zuordnung: ${Object.entries(q.correct)
          .map(([l, r]) => `${l}->${r}`)
          .join(", ")}`,
      ].join("\n");
    case "dropdown":
      return [
        `Frage (Satzergänzung): ${q.textParts.join(" [LÜCKE] ")}`,
        ...q.blanks.map(
          (b) =>
            `Lücke [${b.id}]: ${b.options
              .map((o) => `[${o.id}] ${o.text}`)
              .join("; ")} -> Korrekt: ${b.correct}`
        ),
      ].join("\n");
  }
}

// POST /api/explain
// Streamt die AI-Erklärung als NDJSON-Events, damit die UI live anzeigen kann,
// woran gerade gearbeitet wird:
//   {type:"status", stage:"rag"|"generate"|"norag", detail?}  Phasen-Wechsel
//   {type:"sources", sources:[...]}                            RAG-Treffer
//   {type:"text", delta:"..."}                                 Erklärungs-Text
//   {type:"done"} | {type:"error", message}
export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      "OPENAI_API_KEY ist nicht gesetzt (.env.local)",
      { status: 500 }
    );
  }
  const body = (await req.json()) as ExplainRequest;
  const question = await getRepository().getQuestion(
    body.examSlug,
    body.questionId
  );
  if (!question) {
    return new Response("Question not found", { status: 404 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

      try {
        // Phase 1: RAG — Frage embedden + passende Lerninhalt-Chunks suchen
        send({
          type: "status",
          stage: "rag",
          detail: "Passende Lerninhalte werden gesucht …",
        });
        const hits = await retrieve(
          body.examSlug,
          `${question.topic}: ${question.prompt}`,
          4
        ).catch(() => []);

        const sources = hits.map((chunk) => ({
          title: chunk.title,
          heading: chunk.heading,
          url: chunk.url,
          moduleTitle: chunk.moduleTitle,
          excerpt:
            chunk.text.length > 600
              ? chunk.text.slice(0, 600) + " …"
              : chunk.text,
          score: Math.round(chunk.similarity * 1000) / 1000,
        }));
        send({ type: "sources", sources });
        if (hits.length === 0) {
          send({
            type: "status",
            stage: "norag",
            detail: "Keine Embeddings vorhanden — Erklärung ohne Quellen-Belege",
          });
        }

        // Phase 2: Antwort-Generierung
        send({
          type: "status",
          stage: "generate",
          detail:
            hits.length > 0
              ? `Erklärung wird generiert (${hits.length} Quellen als Kontext) …`
              : "Erklärung wird generiert …",
        });

        const contextBlock =
          hits.length > 0
            ? [
                "Auszüge aus den offiziellen Microsoft-Learn-Lerninhalten (nutze sie als primäre Quelle und zitiere die Unit-Titel):",
                ...hits.map(
                  (chunk, i) =>
                    `[Quelle ${i + 1}: ${chunk.title}${
                      chunk.heading ? " — " + chunk.heading : ""
                    }]\n${chunk.text.slice(0, 2500)}`
                ),
              ].join("\n\n")
            : "";

        const result = streamText({
          // Modell bei Bedarf per Env übersteuern (OPENAI_EXPLAIN_MODEL)
          model: openai(process.env.OPENAI_EXPLAIN_MODEL ?? "gpt-5.1"),
          system: [
            "Du bist ein Trainer für Microsoft-Zertifizierungsprüfungen (aktuell: AB-900, Copilot and Agent Administration Fundamentals).",
            "Erkläre auf Deutsch, präzise und lernorientiert. Beziehe dich konkret auf die Microsoft-365-/Copilot-/Purview-Konzepte hinter der Frage.",
            "Struktur: 1) Kurz: War die Antwort des Users richtig/teilweise richtig/falsch? 2) Warum ist die korrekte Antwort korrekt? 3) Warum sind die Distraktoren falsch bzw. wo lag der Denkfehler? 4) Ein Merksatz für die Prüfung.",
            hits.length > 0
              ? [
                  "ZITATIONSPFLICHT: Belege jede inhaltliche Aussage (jeden Stichpunkt in 2 und 3) mit einem Zitations-Marker [1], [2], [3], … direkt am Ende der Aussage. Nummeriere die Marker fortlaufend; derselbe Marker darf mehrfach vorkommen, wenn dieselbe Belegstelle mehrere Aussagen stützt.",
                  "Ganz am Ende deiner Antwort gib eine Zeile ---QUELLEN--- aus, gefolgt von einem JSON-Array (ohne Code-Fence, keine weiteren Zeichen danach):",
                  '[{"n":1,"source":2,"quote":"<wörtliches, unverändertes Zitat aus dem Quellen-Auszug, 1-2 Sätze>"}, …]',
                  "Dabei ist source die Nummer des Quellen-Auszugs ([Quelle N]), aus dem das Zitat stammt. Das quote MUSS wörtlich im angegebenen Auszug vorkommen. Nur Aussagen markieren, die du tatsächlich mit einem Zitat belegen kannst.",
                ].join("\n")
              : "Es wurden keine Lerninhalt-Auszüge bereitgestellt — verwende keine Zitations-Marker.",
            "Halte dich kompakt (max. ~280 Wörter vor dem QUELLEN-Block). Keine Floskeln.",
          ].join("\n"),
          prompt: [
            describeQuestion(question),
            question.explanation
              ? `Hinterlegte Kurz-Erklärung: ${question.explanation}`
              : "",
            question.reference ? `Referenz: ${question.reference}` : "",
            contextBlock,
            `Antwort des Users (Roh-Format): ${JSON.stringify(body.answer)}`,
          ]
            .filter(Boolean)
            .join("\n\n"),
        });

        for await (const delta of result.textStream) {
          send({ type: "text", delta });
        }
        send({ type: "done" });
      } catch (e) {
        send({
          type: "error",
          message: e instanceof Error ? e.message : "Unbekannter Fehler",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-cache",
    },
  });
}
