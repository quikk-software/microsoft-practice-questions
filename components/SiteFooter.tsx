import Link from "next/link";
import { getTenant } from "@/lib/tenants/config";

// Footer (Server-Komponente): Betreiber, Rechtliches, Hinweis auf die
// Markenrechte von Microsoft. Erscheint auf allen Seiten.

export function SiteFooter() {
  const tenant = getTenant();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-sm">
            <p className="font-semibold">{tenant.productName}</p>
            <p className="mt-1 text-zinc-500">
              Ein Angebot der {tenant.legal?.company ?? tenant.name}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Alle Examen
            </Link>
            <Link
              href="/rechtliches/impressum"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Impressum
            </Link>
            <Link
              href="/rechtliches/datenschutz"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Datenschutz
            </Link>
          </nav>
        </div>

        <p className="mt-6 border-t border-zinc-100 pt-4 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800">
          © {year} {tenant.legal?.company ?? tenant.name}. Microsoft, Microsoft
          365, Copilot und Microsoft Purview sind Marken der Microsoft
          Corporation. Dieses Angebot ist ein unabhängiges Lernwerkzeug und steht
          in keiner Verbindung zur Microsoft Corporation. Die Prüfungsfragen sind
          eigene Formulierungen und keine Original-Prüfungsfragen.
        </p>
      </div>
    </footer>
  );
}
