import type { Metadata } from "next";
import { Geist_Mono, Sora } from "next/font/google";
import { getAuthService, isAuthEnabled } from "@/lib/auth";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Schrift nach strategic-it.de: Sora (400/600/700/800)
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Microsoft Practice Exams",
  description:
    "Kostenlose Test-Examen für Microsoft-Zertifizierungen mit AI-Erklärungen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Header-Einbindung: User serverseitig holen und als Prop an die
  // Client-Kopfzeile durchreichen (Logout-Klick passiert dort).
  const user = await getAuthService().getCurrentUser();
  return (
    <html
      lang="de"
      className={`${sora.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Theme vor dem ersten Paint setzen (Default: light) — verhindert Flackern */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <SiteHeader
          user={user ? { email: user.email } : null}
          authEnabled={isAuthEnabled()}
        />
        {children}
      </body>
    </html>
  );
}
