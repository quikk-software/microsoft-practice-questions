import "server-only";
import { headers } from "next/headers";
import { getTenant, resolveTenantByHost, type Tenant } from "./config";

// Mandanten-Auflösung mit Request-Kontext (nur Server).
//
// lib/tenants/config.ts ist bewusst client-safe und kennt nur die ENV. Der
// tatsächlich aufgerufene Host steht aber erst im Request — und genau den
// brauchen wir, damit eine Bereitstellung mehrere Domains mit je eigenem
// Mandanten bedienen kann (z. B. eine Vorschau-/Zweitdomain mit anderem
// Branding als die Hauptdomain).

/**
 * Aktiver Mandant für den laufenden Request:
 * 1. Host aus dem Request gegen Tenant.hosts (feste Zuordnung, schlägt die ENV)
 * 2. sonst getTenant() — NEXT_PUBLIC_TENANT_ID, dann NEXT_PUBLIC_SITE_URL,
 *    dann Standard-Mandant
 */
export async function getRequestTenant(): Promise<Tenant> {
  try {
    const headerList = await headers();
    // Hinter Proxys (Vercel) steht der ursprüngliche Host in x-forwarded-host.
    const host =
      headerList.get("x-forwarded-host") ?? headerList.get("host");
    const pinned = resolveTenantByHost(host);
    if (pinned) return pinned;
  } catch {
    // Kein Request-Kontext (z. B. beim Prerendering) — dann zählt die ENV.
  }
  return getTenant();
}
