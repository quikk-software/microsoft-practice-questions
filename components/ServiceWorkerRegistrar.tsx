"use client";

import { useEffect } from "react";

// Registriert den Service Worker (public/sw.js) — nur in Produktion, damit
// Caching die lokale Entwicklung nicht stört.

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
      return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registrierung ist optional — die App funktioniert auch ohne PWA
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
