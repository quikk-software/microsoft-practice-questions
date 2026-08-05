// Service Worker für die PWA (handgeschrieben, kein Build-Schritt nötig).
//
// Aufgabenteilung:
//  - Dieser SW cacht nur die App-Shell und statische Assets, damit die App
//    ohne Netz startet.
//  - Die eigentlichen Offline-Daten (Fragen inkl. Lösungen) verwaltet die App
//    selbst in IndexedDB (lib/offline/db.ts).
//
// Bewusst NIE gecacht: /api/** (Auth, Prüfungsdaten, KI) — sonst würden
// veraltete oder fremde Antworten ausgeliefert.

// Version kommt aus der Registrierung (/sw.js?v=<Build>). Dadurch ändert sich
// bei jedem Deploy die Skript-URL, der Browser installiert einen neuen Worker
// und die alten Caches werden verworfen. Ohne das bliebe die App-Shell für
// immer auf dem Stand der Erstinstallation stehen — inklusive veraltetem
// JavaScript, das offline weiterlaufen würde.
const VERSION =
  new URL(self.location.href).searchParams.get("v") || "v1";
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const OFFLINE_URL = "/offline";

const SHELL_URLS = ["/", "/lernen", OFFLINE_URL, "/manifest.json"];

/** Shell-Seiten frisch aus dem Netz in den Cache legen. */
async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  // Einzeln hinzufügen: ein fehlender Eintrag darf die Installation nicht kippen
  await Promise.all(
    SHELL_URLS.map((url) =>
      fetch(url, { cache: "no-store" })
        .then((res) => (res.ok ? cache.put(url, res) : undefined))
        .catch(() => undefined)
    )
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await precacheShell();
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Alte Caches nur räumen, wenn der neue Shell-Cache wirklich gefüllt ist —
      // sonst stünde die App nach einer fehlgeschlagenen Installation ohne
      // Offline-Bestand da.
      const shell = await caches.open(SHELL_CACHE);
      if ((await shell.keys()).length > 0) {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE)
            .map((k) => caches.delete(k))
        );
      }
      await self.clients.claim();
    })()
  );
});

/** Shell nur einmal pro Worker-Leben nachziehen (siehe fetch-Handler). */
let shellRefreshed = false;

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    /\.(?:css|js|woff2?|png|jpg|jpeg|svg|webp|ico)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // API-Antworten niemals cachen
  if (url.pathname.startsWith("/api/")) return;

  // Seiten: Netz zuerst, bei Ausfall Cache bzw. Offline-Seite
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(SHELL_CACHE);
          cache.put(request, fresh.clone()).catch(() => undefined);
          // Der App Router navigiert intern ohne Dokument-Request, deshalb
          // würde /lernen sonst nie aktualisiert. Einmal pro Worker-Leben die
          // komplette Shell nachziehen, solange Netz da ist.
          if (!shellRefreshed) {
            shellRefreshed = true;
            event.waitUntil(precacheShell());
          }
          return fresh;
        } catch {
          const cached = await caches.match(request);
          return cached ?? (await caches.match(OFFLINE_URL)) ?? Response.error();
        }
      })()
    );
    return;
  }

  // Statische Assets: Cache zuerst, im Hintergrund aktualisieren
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const network = fetch(request)
          .then(async (response) => {
            if (response.ok) {
              const cache = await caches.open(ASSET_CACHE);
              cache.put(request, response.clone()).catch(() => undefined);
            }
            return response;
          })
          .catch(() => cached);
        return cached ?? network;
      })()
    );
  }
});
