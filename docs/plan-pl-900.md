# Implementierungsplan: PL-900 (Power Platform Fundamentals)

Neues Examen nach demselben Muster wie AB-900 und SC-401. Fragen entstehen
ausschließlich aus den tatsächlichen Lerninhalten (nicht aus dem Study Guide);
der Study Guide liefert nur Struktur und Gewichtung.

## Quellen (verifiziert am 07.08.2026)

- Zertifizierung: `certification.power-platform-fundamentals`
- Lernpfad: `learn.wwl.pl-900-power-platform-fundamentals`
  („Explore the fundamentals of Microsoft Power Platform", 6 Module, 55 Units):
  1. Describe the business value of Microsoft Power Platform (11 Units)
  2. Describe Microsoft Dataverse (9 Units)
  3. Describe Power Platform governance and administration (8 Units)
  4. Identify basic Microsoft Power Apps capabilities (8 Units)
  5. Identify Microsoft Power Automate components (10 Units)
  6. Understand features of Copilot Studio agents (9 Units)
- Study Guide „Skills at a glance" (aktuelle Fassung):
  - Describe the business value of Microsoft Power Platform (5–10 %)
  - Manage the Microsoft Power Platform environment (20–25 %) — umfasst
    Dataverse UND Administration/Governance
  - Demonstrate the capabilities of Power Apps (20–25 %)
  - Demonstrate the capabilities of Power Automate (20–25 %)
  - Describe features and capabilities of agents in Copilot Studio (20–25 %)
  - Hinweis: Power BI und Power Pages sind NICHT mehr Teil der Prüfung.

## Schritte

- [x] 1. Quellen verifizieren (Catalog API, Study Guide)
- [x] 2. `data/exams/pl-900/exam.json` — 5 Skill-Areas (business-value 0.08,
      environment 0.23, power-apps 0.23, power-automate 0.23,
      copilot-studio 0.23), 40 Fragen, 45 min, 700/1000,
      Kurve easy 0.35 / medium 0.40 / hard 0.25, SEO-Intro + FAQ
      und `data/exams/pl-900/sources.json`
- [x] 3. Ingest: `node scripts/ingest.mjs pl-900` → `content/` (55 Units,
      290.673 Zeichen)
- [x] 4. Fragen-Pool aus den Lerninhalten — 84 Fragen, alle 6 Fragetypen
      - [x] batch-1: business value (11, business-value)
      - [x] batch-2: Dataverse (14, environment)
      - [x] batch-3: governance & administration (15, environment)
      - [x] batch-4: Power Apps (14, power-apps)
      - [x] batch-5: Power Automate (15, power-automate)
      - [x] batch-6: Copilot Studio (15, copilot-studio)
- [x] 5. Validiert: 84 Fragen, 0 Fehler, 84 wortgetreue Zitate
      (easy 21 / medium 44 / hard 19)
- [x] 6. Embeddings: 238 Chunks aus 55 Units → embeddings.json + Supabase
- [x] 7. Seed nach Supabase: exams 1, questions 84, content_units 55,
      content_chunks 238
- [x] 8. Verifizieren: Startseite listet PL-900, `/exams/pl-900` (SEO-Text,
      FAQ, JSON-LD per SSR), Lern-Modus bietet PL-900 an, Sitemap enthält
      den Eintrag (dafür `app/sitemap.ts` auf revalidate 3600 gestellt),
      Test-Examen startet und bewertet
