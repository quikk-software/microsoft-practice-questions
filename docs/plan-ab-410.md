# Implementierungsplan: AB-410 (Intelligent Applications Builder Associate)

Neues Examen nach demselben Muster wie AB-900, SC-401 und PL-900. Fragen
entstehen ausschließlich aus den tatsächlichen Lerninhalten (nicht aus dem
Study Guide); der Study Guide liefert nur Struktur und Gewichtung.

## Quellen (verifiziert am 31.08.2026)

- Zertifizierung: `certification.intelligent-applications-builder-associate`
  („Microsoft Certified: Intelligent Applications Builder Associate",
  role-based, Level Intermediate, Rolle developer)
- Prüfungsdauer laut Zertifizierungsseite: **120 Minuten**
- Lernpfade (alle vier von der Zertifizierungsseite, 17 Module / 147 Units):
  1. `learn.wwl.design-model-solutions-power-platform`
     — Get started with AI-first solutions in Microsoft Power Platform (3 Module)
  2. `learn.wwl.build-data-model-microsoft-dataverse`
     — Build your data model with Microsoft Dataverse (3 Module)
  3. `learn.wwl.build-apps-portals-power-apps`
     — Build intelligent apps and portals with Microsoft Power Apps (7 Module)
  4. `learn.wwl.automate-business-processes-power-automate`
     — Automate and extend your solutions with AI in Microsoft Power Automate (4 Module)
- Study Guide „Skills at a glance":
  - Create a foundation for intelligent applications (25–30 %)
  - Create intelligent applications (25–30 %)
  - Build business application logic and automation (40–45 %)

## Schritte

- [x] 1. Quellen verifizieren (Catalog API, Zertifizierungsseite, Study Guide)
- [x] 2. `data/exams/ab-410/exam.json` (3 Skill-Areas: foundation 0.28,
      applications 0.28, logic-automation 0.44; 40 Fragen, 120 min, 700/1000;
      Kurve easy 0.30 / medium 0.45 / hard 0.25; SEO-Intro + FAQ)
      und `data/exams/ab-410/sources.json`
- [x] 3. Ingest: 147 Units / 631.940 Zeichen, 0 Fehlschläge
- [x] 4. Fragen-Pool aus den Lerninhalten — 114 Fragen, alle 6 Fragetypen,
      jede mit wörtlichem Quellzitat
      - [x] batch-1: AI-first solutions / Plans / Prompts (15, foundation)
      - [x] batch-2: Dataverse-Datenmodell — Tabellen, Spalten (15, foundation)
      - [x] batch-3: Dataverse-Sicherheitsrollen (10, foundation)
      - [x] batch-4: Canvas Apps (14, applications)
      - [x] batch-5: Model-driven Apps + Power Pages (15, applications)
      - [x] batch-6: Dataverse-Trigger, Abfragen, Approvals, Agent Flows (15)
      - [x] batch-7: Geschäftslogik + AI-Builder-Prompts (15, logic-automation)
- [x] batch-8: Nachtrag leichte Fragen (15) — deckt die Schwierigkeitskurve
        je Skill-Area ab (logic-automation hatte nur 1 leichte Frage)
- [x] 5. Validiert: 114 Fragen, 0 Fehler, 114 wortgetreue Zitate
      (easy 26 / medium 52 / hard 36)
- [ ] 6. Embeddings: `export $(grep OPENAI .env.local | xargs) && node scripts/embed.mjs ab-410`
- [ ] 7. Seed nach Supabase: `node --env-file=.env.local scripts/seed.mjs ab-410`
- [ ] 8. Verifizieren: Startseite listet AB-410, `/exams/ab-410` (SEO-Text,
      FAQ, JSON-LD per SSR), Lern-Modus bietet AB-410 an, Sitemap-Eintrag,
      Test-Examen startet und bewertet
