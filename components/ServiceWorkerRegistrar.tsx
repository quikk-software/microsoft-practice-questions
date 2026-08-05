"use client";

import { useEffect } from "react";

// Registriert den Service Worker (public/sw.js) — nur in Produktion, damit
// Caching die lokale Entwicklung nicht stört.
//
// Die Skript-URL trägt die Build-Kennung (/sw.js?v=<build>): public/sw.js ist
// über Deploys hinweg byte-gleich, der Browser würde sonst nie einen neuen
// Worker installieren und die App-Shell bliebe für immer auf dem Stand der
// Erstinstallation — offline liefe dann dauerhaft veralteter Code.

export function ServiceWorkerRegistrar({ version }: { version: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
      return;

    // Beim Wechsel auf einen neuen Worker einmalig neu laden, damit die
    // laufende Seite nicht mit dem alten JavaScript weiterarbeitet. Nur wenn
    // vorher schon ein Worker aktiv war — bei der Erstinstallation nicht.
    const hadController = navigator.serviceWorker.controller != null;
    let reloading = false;
    const onControllerChange = () => {
      if (!hadController || reloading) return;
      reloading = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange
    );

    const register = () => {
      navigator.serviceWorker
        .register(`/sw.js?v=${encodeURIComponent(version)}`)
        .then((registration) => {
          // Sofort nach einer neuen Fassung sehen, statt auf die Prüfung des
          // Browsers zu warten
          void registration.update();
        })
        .catch(() => {
          // Registrierung ist optional — die App funktioniert auch ohne PWA
        });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange
      );
    };
  }, [version]);

  return null;
}
