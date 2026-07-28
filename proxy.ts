import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Proxy (Next 16: Nachfolger von middleware.ts) — zwei Aufgaben:
// 1. Zugriffsschutz für /admin/** und /my/**: ohne Login → /login?next=<pfad>.
//    (Der Rollen-Check für /admin passiert serverseitig in dessen Layout —
//    hier wird nur "eingeloggt ja/nein" geprüft.)
// 2. Bei AUTH_DRIVER=supabase: Session-Refresh nach dem @supabase/ssr-Muster
//    (abgelaufene Access-Tokens werden per Cookie erneuert).

const PROTECTED_PREFIXES = ["/admin", "/my", "/settings"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function redirectToLogin(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set(
    "next",
    request.nextUrl.pathname + request.nextUrl.search
  );
  return NextResponse.redirect(url);
}

export async function proxy(request: NextRequest) {
  const driver = process.env.AUTH_DRIVER ?? "none";
  const { pathname } = request.nextUrl;

  if (driver !== "supabase") {
    // AUTH_DRIVER=none: /my und /admin nur mit DEV_FAKE_ROLE in development.
    if (isProtected(pathname)) {
      const devBypass =
        process.env.NODE_ENV === "development" &&
        Boolean(process.env.DEV_FAKE_ROLE);
      if (!devBypass) return redirectToLogin(request);
    }
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    // Supabase gewählt, aber ENVs fehlen: geschützte Bereiche dicht machen.
    return isProtected(pathname)
      ? redirectToLogin(request)
      : NextResponse.next();
  }

  // @supabase/ssr-Muster: Cookies aus dem Request lesen, erneuerte Tokens
  // sowohl in den weitergereichten Request als auch in die Response schreiben.
  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Wichtig: getUser() validiert das Token und stößt ggf. den Refresh an.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtected(pathname)) {
    const redirect = redirectToLogin(request);
    // Evtl. erneuerte Session-Cookies auf die Redirect-Response übernehmen.
    for (const cookie of response.cookies.getAll()) {
      redirect.cookies.set(cookie);
    }
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/my/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/reset-password",
  ],
};
