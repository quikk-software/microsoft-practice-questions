import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Supabase-Client-Helper (nur serverseitig).
//
// - createServiceClient(): Service-Role-Key, umgeht RLS bewusst.
//   Für Datenpflege (DataRepository) und Rollen-Lookup (profiles).
// - createReadSessionClient(): NUR LESEN, refresht bewusst nicht (s. u.).
// - createWritableSessionClient(): für echte Auth-Aktionen (Login, Logout, …).
//
// WARUM DIE TRENNUNG — sonst fliegt man sporadisch aus der Session:
// Refresh-Tokens werden von Supabase bei jedem Refresh rotiert. Server
// Components dürfen keine Cookies schreiben; refresht dort ein Client, geht das
// neue Token verloren, während Supabase bereits rotiert hat. Der nächste
// Request sendet dann ein verbrauchtes Token -> Reuse-Detection -> die ganze
// Token-Familie wird invalidiert -> Logout. Deshalb refresht ausschließlich der
// Proxy (proxy.ts), der die rotierten Cookies auch wirklich speichern kann.

function requireEnv(name: string, fallbackName?: string): string {
  const value =
    process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined);
  if (!value) {
    const names = fallbackName ? `${name} (oder ${fallbackName})` : name;
    throw new Error(
      `Supabase-Konfiguration fehlt: ENV ${names} ist nicht gesetzt. ` +
        `Bitte in .env.local eintragen (siehe Supabase-Projekt > Settings > API).`
    );
  }
  return value;
}

/** Client mit Service-Role-Key (umgeht RLS). Niemals an den Client leaken! */
export function createServiceClient(): SupabaseClient {
  const url = requireEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Nur-Lese-Client für Server Components und Routen, die lediglich den
 * aktuellen User brauchen. Refresht NICHT — die Cookies wurden unmittelbar
 * vorher vom Proxy aktualisiert (siehe Kommentar oben).
 */
export async function createReadSessionClient(): Promise<SupabaseClient> {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
  const anonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      // Absichtlich leer: dieser Client soll keine Session-Cookies verändern.
      setAll() {},
    },
  });
}

/**
 * Schreibender Client für echte Auth-Aktionen (Login, Registrierung, Logout,
 * Passwort-Reset, OAuth-Callback). Nur in Route Handlern verwenden — dort
 * dürfen Cookies gesetzt werden.
 */
export async function createWritableSessionClient(): Promise<SupabaseClient> {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
  const anonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch (e) {
          // Sollte in Route Handlern nicht passieren — wenn doch, ist eine
          // Session-Rotation verloren gegangen: sichtbar machen statt schlucken.
          console.warn(
            "[supabase] Session-Cookies konnten nicht geschrieben werden:",
            e instanceof Error ? e.message : e
          );
        }
      },
    },
  });
}
