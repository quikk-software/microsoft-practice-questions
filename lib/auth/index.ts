import "server-only";
import type { AppUser, AuthService } from "./port";
import { AuthError } from "./port";

// Treiber-Factory. AUTH_DRIVER=none (Default) | supabase
// Supabase-Implementierung: lib/auth/supabase.ts
//
// "none": kein Login möglich (Üben bleibt öffentlich). Für lokale Admin-Entwicklung
// ohne Supabase kann DEV_FAKE_ROLE=admin gesetzt werden (nur in development wirksam).

class NoneAuthService implements AuthService {
  async getCurrentUser(): Promise<AppUser | null> {
    const fakeRole = process.env.DEV_FAKE_ROLE;
    if (process.env.NODE_ENV === "development" && fakeRole) {
      return {
        id: "dev-user",
        email: "dev@local",
        role: fakeRole as AppUser["role"],
      };
    }
    return null;
  }
  async signUp(): Promise<{ needsEmailConfirmation: boolean }> {
    throw new AuthError("Auth ist nicht konfiguriert (AUTH_DRIVER=none)", "not-configured");
  }
  async signInWithPassword(): Promise<AppUser> {
    throw new AuthError("Auth ist nicht konfiguriert (AUTH_DRIVER=none)", "not-configured");
  }
  async signOut(): Promise<void> {}
  async requestPasswordReset(): Promise<void> {
    throw new AuthError("Auth ist nicht konfiguriert (AUTH_DRIVER=none)", "not-configured");
  }
  async updatePassword(): Promise<void> {
    throw new AuthError("Auth ist nicht konfiguriert (AUTH_DRIVER=none)", "not-configured");
  }
}

let service: AuthService | null = null;

export function getAuthService(): AuthService {
  if (service) return service;
  const driver = process.env.AUTH_DRIVER ?? "none";
  switch (driver) {
    case "supabase": {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { SupabaseAuthService } = require("./supabase") as {
        SupabaseAuthService: new () => AuthService;
      };
      service = new SupabaseAuthService();
      break;
    }
    case "none":
    default:
      service = new NoneAuthService();
  }
  return service;
}

export function isAuthEnabled(): boolean {
  return (process.env.AUTH_DRIVER ?? "none") !== "none";
}
