import type { Metadata } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import { getAuthService, isAuthEnabled } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";
import { SessionMarker } from "@/components/SessionMarker";
import { brandCssVariables, getTenant } from "@/lib/tenants/config";
import "./globals.css";

// Schriften aller Mandanten laden; aktiv ist die des Mandanten (tenant.theme.font).
const sora = Sora({
  variable: "--font-tenant-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-tenant-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tenant = getTenant();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Kennung des aktuellen Builds für die Service-Worker-Registrierung. Auf Vercel
// der Commit-SHA, lokal ein Platzhalter (dort ist der Worker ohnehin aus).
const buildId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? "dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: tenant.siteTitle,
    template: `%s · ${tenant.productName}`,
  },
  description: tenant.siteDescription,
  applicationName: tenant.productName,
  openGraph: {
    type: "website",
    siteName: tenant.productName,
    locale: "de_DE",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon-180x180.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Header-Einbindung: User serverseitig holen und als Prop an die
  // Client-Kopfzeile durchreichen (Logout-Klick passiert dort).
  const user = await getAuthService().getCurrentUser();

  // Mandanten-Theme: Schrift-Variable auf die gewählte Familie mappen,
  // Brand-Palette als CSS-Variablen überschreiben (Tailwind v4 liest --color-brand-*).
  const fontVar =
    tenant.theme.font === "inter"
      ? "var(--font-tenant-inter)"
      : "var(--font-tenant-sora)";
  const tenantStyle = `:root{--font-sans:${fontVar};${brandCssVariables(tenant)}}`;

  return (
    <html
      lang="de"
      className={`${sora.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: tenantStyle }} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Theme vor dem ersten Paint setzen (Default: light) — verhindert Flackern */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <SiteHeader
          user={user ? { email: user.email, role: user.role } : null}
          authEnabled={isAuthEnabled()}
          tenant={{
            name: tenant.name,
            productName: tenant.productName,
            logo: tenant.logo,
          }}
        />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        {/* Vercel Web Analytics — anonymisierte Seitenaufrufe, keine Cookies */}
        <Analytics />
        <ServiceWorkerRegistrar version={buildId} />
        <SessionMarker email={user?.email ?? null} />
      </body>
    </html>
  );
}
