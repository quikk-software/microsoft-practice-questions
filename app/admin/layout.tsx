import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getAuthService } from "@/lib/auth";
import { hasRole } from "@/lib/auth/port";

// Zugriffsschutz für den gesamten Admin-Bereich: mindestens Rolle "editor".
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthService().getCurrentUser();
  if (!user || !hasRole(user, "editor")) redirect("/login?next=/admin");

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
          <Link href="/admin" className="inline-flex items-center gap-2 font-bold tracking-tight">
            <ShieldCheck className="h-5 w-5 text-brand-600" aria-hidden />
            Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/admin" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Dashboard
            </Link>
            <Link
              href="/admin/exams/new"
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Neues Examen
            </Link>
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Zur App
            </Link>
          </nav>
          <span className="ml-auto rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs text-brand-800 dark:border-brand-900 dark:bg-brand-950 dark:text-brand-300">
            {user.email} · Rolle: {user.role}
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}
