"use client";

import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Question } from "@/lib/types";

// Offline-Speicher für den Lern-Modus (IndexedDB):
//  - "bundle": heruntergeladene Fragen inkl. Lösungen
//  - "pending": offline beantwortete Fragen, die noch synchronisiert werden

export interface OfflineExam {
  slug: string;
  code: string;
  title: string;
  questions: Question[];
}

export interface OfflineBundle {
  id: "current";
  version: string;
  downloadedAt: string;
  exams: OfflineExam[];
  totalQuestions: number;
}

export interface PendingAnswer {
  key: string; // questionId (eine Antwort pro Frage genügt)
  examSlug: string;
  questionId: string;
  score: number;
  answeredAt: string;
}

interface LearnDB extends DBSchema {
  bundle: { key: string; value: OfflineBundle };
  pending: { key: string; value: PendingAnswer };
}

const DB_NAME = "practice-exams-offline";
const DB_VERSION = 1;

function dbPromise(): Promise<IDBPDatabase<LearnDB>> {
  return openDB<LearnDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("bundle")) {
        db.createObjectStore("bundle", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("pending")) {
        db.createObjectStore("pending", { keyPath: "key" });
      }
    },
  });
}

export async function saveBundle(
  data: Omit<OfflineBundle, "id" | "downloadedAt">
): Promise<OfflineBundle> {
  const db = await dbPromise();
  const bundle: OfflineBundle = {
    ...data,
    id: "current",
    downloadedAt: new Date().toISOString(),
  };
  await db.put("bundle", bundle);
  return bundle;
}

export async function loadBundle(): Promise<OfflineBundle | null> {
  try {
    const db = await dbPromise();
    return (await db.get("bundle", "current")) ?? null;
  } catch {
    return null;
  }
}

export async function clearBundle(): Promise<void> {
  const db = await dbPromise();
  await db.delete("bundle", "current");
}

export async function queueAnswer(entry: Omit<PendingAnswer, "key">): Promise<void> {
  const db = await dbPromise();
  await db.put("pending", { ...entry, key: entry.questionId });
}

export async function takePendingAnswers(): Promise<PendingAnswer[]> {
  try {
    const db = await dbPromise();
    return await db.getAll("pending");
  } catch {
    return [];
  }
}

export async function clearPending(keys: string[]): Promise<void> {
  const db = await dbPromise();
  const tx = db.transaction("pending", "readwrite");
  await Promise.all(keys.map((k) => tx.store.delete(k)));
  await tx.done;
}

/** Offline gespeicherte Antworten an den Server nachreichen. */
export async function syncPendingAnswers(): Promise<number> {
  const pending = await takePendingAnswers();
  if (pending.length === 0) return 0;
  try {
    const res = await fetch("/api/learn/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entries: pending.map((p) => ({
          examSlug: p.examSlug,
          questionId: p.questionId,
          score: p.score,
        })),
      }),
    });
    if (!res.ok) return 0;
    await clearPending(pending.map((p) => p.key));
    return pending.length;
  } catch {
    return 0;
  }
}
