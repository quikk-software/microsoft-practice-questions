import "server-only";
import type { User } from "@supabase/supabase-js";
import type { AppUser, AuthService, Role } from "./port";
import { AuthError } from "./port";
import { createServiceClient, createSessionClient } from "@/lib/supabase/server";

// Supabase-Treiber für den Auth-Port (AUTH_DRIVER=supabase).
// Session via Cookies (@supabase/ssr); Rollen kommen aus public.profiles.

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

const VALID_ROLES: Role[] = ["user", "editor", "admin"];

/** Rolle aus public.profiles lesen — per Service-Role, damit RLS nicht im Weg ist. */
async function fetchRole(userId: string): Promise<Role> {
  try {
    const service = createServiceClient();
    const { data, error } = await service
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();
    if (error || !data) return "user";
    const role = (data as { role: string }).role as Role;
    return VALID_ROLES.includes(role) ? role : "user";
  } catch {
    return "user";
  }
}

async function toAppUser(user: User): Promise<AppUser> {
  return {
    id: user.id,
    email: user.email ?? "",
    role: await fetchRole(user.id),
  };
}

export class SupabaseAuthService implements AuthService {
  async getCurrentUser(): Promise<AppUser | null> {
    try {
      const supabase = await createSessionClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return null;
      return await toAppUser(data.user);
    } catch {
      return null;
    }
  }

  async signUp(
    email: string,
    password: string
  ): Promise<{ needsEmailConfirmation: boolean }> {
    const supabase = await createSessionClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${siteUrl()}/auth/callback` },
    });
    if (error) throw new AuthError(error.message, error.code ?? "auth-error");
    // Ohne Session ist eine E-Mail-Bestätigung ausstehend.
    return { needsEmailConfirmation: !data.session };
  }

  async signInWithPassword(email: string, password: string): Promise<AppUser> {
    const supabase = await createSessionClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.code === "email_not_confirmed") {
        throw new AuthError(
          "Bitte bestätige zuerst deine E-Mail-Adresse.",
          "email-not-confirmed"
        );
      }
      throw new AuthError(
        "E-Mail oder Passwort ist falsch.",
        "invalid-credentials"
      );
    }
    return toAppUser(data.user);
  }

  async signOut(): Promise<void> {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message, error.code ?? "auth-error");
  }

  async requestPasswordReset(email: string): Promise<void> {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl()}/auth/callback?next=/reset-password`,
    });
    if (error) throw new AuthError(error.message, error.code ?? "auth-error");
  }

  async updatePassword(newPassword: string): Promise<void> {
    const supabase = await createSessionClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new AuthError(error.message, error.code ?? "auth-error");
  }
}
