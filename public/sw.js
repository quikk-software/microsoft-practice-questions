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

const VERSION = "v1";
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const OFFLINE_URL = "/offline";

const SHELL_URLS = ["/", "/lernen", OFFLINE_URL, "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Einzeln hinzufügen: ein fehlender Eintrag darf die Installation nicht kippen
      await Promise.all(
        SHELL_URLS.map((url) => cache.add(url).catch(() => undefined))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== SHELL_CACHE && k !== ASSET_CACHE)
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

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
