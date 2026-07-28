import type { Metadata } from "next";
import { getAuthService } from "@/lib/auth";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Passwort zurücksetzen",
  robots: { index: false },
};

// /reset-password — zweistufig:
// - Ohne Session: E-Mail eingeben → Reset-Mail anfordern.
// - Mit Session (nach dem Redirect aus /auth/callback?next=/reset-password):
//   neues Passwort setzen.

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const user = await getAuthService().getCurrentUser();
  return <ResetPasswordForm hasSession={user != null} />;
}
