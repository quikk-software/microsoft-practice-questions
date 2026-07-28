import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// GET /auth/callback — Ziel der Supabase-E-Mail-Links (Bestätigung, Passwort-Reset).
// Tauscht ?code=... gegen eine Session (PKCE) und leitet dann auf ?next= weiter.
// Bei AUTH_DRIVER=none gibt es hier nichts zu tun → redirect "/".

/** Nur relative Pfade zulassen (kein Open-Redirect). */
function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;

  if ((process.env.AUTH_DRIVER ?? "none") !== "supabase") {
    return NextResponse.redirect(new URL("/", origin));
  }

  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!code || !supabaseUrl || !anonKey) {
    return NextResponse.redirect(new URL("/login?error=callback", origin));
  }

  // Cookie-Adapter über Request/Response: die neue Session landet als
  // Set-Cookie direkt auf der Redirect-Response.
  const response = NextResponse.redirect(new URL(next, origin));
  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login?error=callback", origin));
  }
  return response;
}
