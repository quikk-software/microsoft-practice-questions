"use client";

import { useEffect } from "react";
import { markSignedIn } from "@/lib/offline/session";

// Spiegelt den serverseitigen Anmeldestatus in den lokalen Speicher, damit die
// PWA offline weiß, dass ein Konto existiert (siehe lib/offline/session.ts).
//
// Bewusst nur setzen, nie löschen: Eine Seite ohne Benutzer ist für den Client
// nicht von einem zwischengespeicherten Snapshot zu unterscheiden — und
// navigator.onLine lügt (WLAN verbunden, aber ohne Internet meldet es "online").
// Ein Löschen an dieser Stelle würde den Marker also genau dann entfernen, wenn
// er gebraucht wird. Zurückgesetzt wird er ausschließlich beim echten Abmelden
// (siehe components/SiteHeader.tsx).

export function SessionMarker({ email }: { email: string | null }) {
  useEffect(() => {
    if (email) markSignedIn(email);
  }, [email]);

  return null;
}
