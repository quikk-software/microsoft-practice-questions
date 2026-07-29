// Zentrale Mandanten-Definition (client-safe — keine Server-Imports!).
//
// Ein Mandant bündelt Branding (Logo, Farben, Schrift) und Texte.
// Auswahl zur Laufzeit über ENV NEXT_PUBLIC_TENANT_ID; ohne Angabe wird
// anhand von NEXT_PUBLIC_SITE_URL (Host) aufgelöst, sonst DEFAULT_TENANT_ID.
//
// Neuen Mandanten anlegen = ein Eintrag in TENANTS + Logo(s) unter public/<id>/.

export type FontId = "sora" | "inter";

export interface TenantTheme {
  /** Schriftfamilie (in app/layout.tsx als next/font geladen) */
  font: FontId;
  /** Tailwind-Palette `brand-*` — überschreibt die Defaults aus globals.css */
  brand: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  };
}

/** Pflichtangaben für Impressum & Datenschutz (pro Mandant) */
export interface TenantLegal {
  /** Vollständige Firmierung inkl. Rechtsform */
  company: string;
  street: string;
  zip: string;
  city: string;
  country?: string;
  /** Geschäftsführung / vertretungsberechtigte Person(en) */
  representedBy: string;
  email: string;
  phone?: string;
  register?: { court: string; number: string };
  vatId?: string;
  /** Verantwortlich i. S. d. § 18 Abs. 2 MStV (falls abweichend) */
  contentResponsible?: string;
}

export interface Tenant {
  id: string;
  /** Anzeigename des Betreibers (Logo-Alt, Footer, …) */
  name: string;
  /** Ohne Angabe zeigen die Rechtstexte einen Platzhalter-Hinweis */
  legal?: TenantLegal;
  /** Hosts, die diesen Mandanten aktivieren (ohne Protokoll) */
  hosts: string[];
  logo: {
    /** Pfad unter public/ — für helle Oberflächen */
    light: string;
    /** optional abweichendes Logo für Dark Mode */
    dark?: string;
  };
  /** Titel-Zusatz neben dem Logo */
  productName: string;
  siteTitle: string;
  siteDescription: string;
  theme: TenantTheme;
}

const STRATEGIC_IT: Tenant = {
  id: "strategic-it",
  name: "Strategic IT GmbH",
  hosts: [],
  logo: { light: "/strategic-it/logo.svg" },
  productName: "Practice Exams",
  siteTitle: "Microsoft Practice Exams — kostenlose Test-Examen",
  siteDescription:
    "Kostenlose Test-Examen für Microsoft-Zertifizierungen mit realistischen Fragetypen, Sofort-Feedback, Quellen-Belegen aus Microsoft Learn und AI-Erklärungen.",
  theme: {
    font: "sora",
    brand: {
      50: "#fef8ee",
      100: "#fdeed7",
      200: "#fadaae",
      300: "#f7c07a",
      400: "#f4a944",
      500: "#f19720",
      600: "#dd7f14",
      700: "#b76313",
      800: "#934e17",
      900: "#784116",
      950: "#411f09",
    },
  },
};

const QUIKK: Tenant = {
  id: "quikk",
  name: "QUIKK Software GmbH",
  hosts: ["microsoft-practice-exams.quikk.de"],
  logo: { light: "/quikk/logo_dark.svg", dark: "/quikk/logo_light.svg" },
  legal: {
    company: "QUIKK Software GmbH",
    street: "Hahler Straße 285",
    zip: "32427",
    city: "Minden",
    country: "Deutschland",
    representedBy: "Joyce Marvin Rafflenbeul",
    email: "info@quikk.de",
    register: { court: "Amtsgericht Bad Oeynhausen", number: "HRB 17559" },
    vatId: "DE339709992",
    contentResponsible: "Joyce Marvin Rafflenbeul",
  },
  productName: "Practice Exams",
  siteTitle: "Microsoft Practice Exams — kostenlose Test-Examen",
  siteDescription:
    "Kostenlose Test-Examen für Microsoft-Zertifizierungen mit realistischen Fragetypen, Sofort-Feedback, Quellen-Belegen aus Microsoft Learn und AI-Erklärungen.",
  theme: {
    // quikk.de: Inter + Korallrot #ff584f (--primary)
    font: "inter",
    brand: {
      50: "#fef1f0",
      100: "#fde3e2",
      200: "#fcc3c0",
      300: "#ff9994",
      400: "#ff6e66",
      500: "#ff584f",
      600: "#f5382d",
      700: "#d81f14",
      800: "#b31a11",
      900: "#8f1a13",
      950: "#4e0906",
    },
  },
};

export const TENANTS: Record<string, Tenant> = {
  [STRATEGIC_IT.id]: STRATEGIC_IT,
  [QUIKK.id]: QUIKK,
};

export const DEFAULT_TENANT_ID = STRATEGIC_IT.id;

/** Host aus NEXT_PUBLIC_SITE_URL ziehen (ohne Port/Protokoll). */
function hostFromSiteUrl(siteUrl: string | undefined): string | null {
  if (!siteUrl) return null;
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return null;
  }
}

/**
 * Aktiver Mandant. Auflösung:
 * 1. NEXT_PUBLIC_TENANT_ID (explizit)
 * 2. Host aus NEXT_PUBLIC_SITE_URL gegen Tenant.hosts
 * 3. DEFAULT_TENANT_ID
 * Beide ENV-Variablen sind NEXT_PUBLIC_*, also auch im Client verfügbar.
 */
export function getTenant(): Tenant {
  const explicit = process.env.NEXT_PUBLIC_TENANT_ID;
  if (explicit && TENANTS[explicit]) return TENANTS[explicit];

  const host = hostFromSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (host) {
    const match = Object.values(TENANTS).find((t) => t.hosts.includes(host));
    if (match) return match;
  }
  return TENANTS[DEFAULT_TENANT_ID];
}

/** CSS-Variablen für die Brand-Palette (Tailwind v4 liest `--color-brand-*`). */
export function brandCssVariables(tenant: Tenant): string {
  return Object.entries(tenant.theme.brand)
    .map(([step, value]) => `--color-brand-${step}: ${value};`)
    .join("");
}
