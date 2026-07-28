// Auth-Port: Die App spricht ausschließlich gegen dieses Interface.
// Treiber-Auswahl über ENV AUTH_DRIVER=none|supabase (siehe lib/auth/index.ts).
// Ein späterer Wechsel (z. B. Microsoft Entra ID via OIDC/MSAL) = neue Implementierung.
// Alle Methoden sind serverseitig gedacht (Route Handler / Server Components).

export type Role = "user" | "editor" | "admin";

export interface AppUser {
  id: string;
  email: string;
  role: Role;
}

export class AuthError extends Error {
  constructor(
    message: string,
    /** maschinenlesbar für die UI, z. B. "invalid-credentials" | "email-not-confirmed" */
    public code: string = "auth-error"
  ) {
    super(message);
  }
}

export interface AuthService {
  /** Aktuell eingeloggter User (aus Session-Cookie) oder null. Wirft nie. */
  getCurrentUser(): Promise<AppUser | null>;

  signUp(
    email: string,
    password: string
  ): Promise<{ needsEmailConfirmation: boolean }>;

  signInWithPassword(email: string, password: string): Promise<AppUser>;

  signOut(): Promise<void>;

  requestPasswordReset(email: string): Promise<void>;

  /** Neues Passwort setzen (im Reset-Flow nach Callback bzw. eingeloggt) */
  updatePassword(newPassword: string): Promise<void>;
}

export const ROLE_RANK: Record<Role, number> = { user: 0, editor: 1, admin: 2 };

export function hasRole(user: AppUser | null, min: Role): boolean {
  return user != null && ROLE_RANK[user.role] >= ROLE_RANK[min];
}
