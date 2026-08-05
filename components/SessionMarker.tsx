"use client";

import { useEffect } from "react";
import { clearCachedSession, markSignedIn } from "@/lib/offline/session";

// Spiegelt den serverseitigen Anmeldestatus in den lokalen Speicher, damit die
// PWA offline weiß, dass ein Konto existiert (siehe lib/offline/session.ts).
// Wird nur bei bestehender Verbindung aktualisiert — offline gilt der letzte
// bekannte Stand, sonst würde ein zwischengespeicherter Snapshot den Marker
// fälschlich löschen.

export function SessionMarker({ email }: { email: string | null }) {
  useEffect(() => {
    if (typeof navigator !== "undefined" && !navigator.onLine) return;
    if (email) markSignedIn(email);
    else clearCachedSession();
  }, [email]);

  return null;
}
