import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthService } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import { providerOptions } from "@/lib/ai/providers";
import { AiSettingsForm } from "./AiSettingsForm";

export const metadata: Metadata = {
  title: "AI-Einstellungen",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getAuthService().getCurrentUser();
  if (!user) redirect("/login?next=/settings");

  const settings = await getRepository().getAiSettings(user.id);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">AI-Einstellungen</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Bring your own Key: AI-Erklärungen laufen über deinen eigenen API-Key —
        du wählst Anbieter und Modell, die Kosten bleiben bei dir. Der Key wird
        verschlüsselt gespeichert und nie wieder im Klartext angezeigt.
      </p>
      <div className="mt-8">
        <AiSettingsForm
          providers={providerOptions()}
          initial={
            settings
              ? {
                  provider: settings.provider,
                  model: settings.model,
                  apiKeyHint: settings.apiKeyHint,
                }
              : null
          }
        />
      </div>
    </main>
  );
}
