import "server-only";
import { NextResponse } from "next/server";
import { getAuthService } from "@/lib/auth";
import { hasRole, type Role } from "@/lib/auth/port";

/**
 * Rollen-Check für alle /api/admin-Routen.
 * Gibt bei fehlender Berechtigung eine fertige Fehler-Response zurück, sonst null.
 *
 *   const denied = await guardRole("editor");
 *   if (denied) return denied;
 */
export async function guardRole(min: Role = "editor"): Promise<NextResponse | null> {
  const user = await getAuthService().getCurrentUser();
  if (hasRole(user, min)) return null;
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }
  return NextResponse.json(
    { error: `Keine Berechtigung (Rolle "${min}" erforderlich)` },
    { status: 403 }
  );
}
