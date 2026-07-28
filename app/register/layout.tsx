import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrieren",
  description:
    "Kostenloses Konto anlegen, um deinen Prüfungs-Verlauf zu speichern.",
  robots: { index: false },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
