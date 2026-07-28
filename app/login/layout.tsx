import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmelden",
  description:
    "Melde dich an, um deinen Prüfungs-Verlauf zu speichern und Lernmaterialien zu verwalten.",
  robots: { index: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
