import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Supabase-Client-Helper (nur serverseitig).
//
// - createServiceClient(): Service-Role-Key, umgeht RLS bewusst.
//   Für Datenpflege (DataRepository) und Rollen-Lookup (profiles).
// - createSessionClient(): Cookie-basierte User-Session via @supabase/ssr.
//   Für Auth-Flows (AuthService).

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

/** Client mit Anon-Key + Session-Cookies des aktuellen Requests (Next 16: cookies() ist async). */
export async function createSessionClient(): Promise<SupabaseClient> {
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
        } catch {
          // In Server Components darf nicht geschrieben werden — Middleware/Route
          // Handler übernehmen das Session-Refresh; hier bewusst ignorieren.
        }
      },
    },
  });
}
