import { ImageResponse } from "next/og";

// Standard-OG-Image (1200x630) im Brand-Design — gilt für alle Seiten,
// die kein eigenes opengraph-image definieren. Ersetzt das Vercel-Default-Preview.

export const runtime = "edge";
export const alt = "Microsoft Practice Exams — kostenlose Test-Examen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0a0a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#f19720",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          STRATEGIC IT
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Microsoft Practice Exams
          </div>
          <div style={{ color: "#8a8a8a", fontSize: 36, lineHeight: 1.4 }}>
            Kostenlose Test-Examen mit realistischen Fragetypen,
            Quellen-Belegen und AI-Erklärungen
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 220,
            height: 12,
            background: "#f19720",
            borderRadius: 6,
          }}
        />
      </div>
    ),
    size
  );
}
