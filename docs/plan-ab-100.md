# Implementierungsplan: AB-100 (Agentic AI Business Solutions Architect Expert)

Neues Examen nach dem Muster von AB-410/AB-620: Fragen entstehen ausschließlich
aus den tatsächlichen Lerninhalten; der Study Guide liefert Struktur, Gewichtung
und die Abdeckungs-Checkliste. Anforderung von Joyce: Fragen, Erklärungen,
Glossar und Nachschlagewerk wie bei AB-620.

## Quellen (verifiziert am 07.10.2026)

- Zertifizierung: `certification.agentic-ai-business-solutions-architect`
  („Microsoft Certified: Agentic AI Business Solutions Architect Expert",
  Level Advanced, Rolle Solution Architect). Prüfung `exam.ab-100`, Kurs
  `course.ab-100t00` („Architecting agentic AI business solutions").
  Expert-Voraussetzung: zusätzlich eine Associate-Zertifizierung (z. B.
  MB-280, PL-200).
- Der Catalog-Eintrag der Zertifizierung, der Prüfung und des Kurses nennen
  denselben einen Lernpfad:
  `learn.wwl.architect-agentic-ai-business-solutions`
  („Architect AI solutions for business productivity", 11 Module, 684 min,
  zuletzt geändert 2026-04-10):
  1. Introduction to agentic AI business solutions
  2. Analyze requirements for AI-powered business solutions
  3. Design overall AI strategy for business solutions (19 Units)
  4. Evaluate costs and benefits of AI solutions
  5. Design AI agents for business solutions (21 Units)
  6. Design extensibility of AI solutions
  7. Orchestrate configuration of prebuilt agents and apps
  8. Monitor, analyze, and tune AI agents
  9. Manage testing AI-powered business solutions
  10. Design ALM process for AI-powered business solutions
  11. Design responsible AI security, governance, risk management, and compliance
- Study Guide „Skills measured as of October 14, 2026":
  - Plan AI-powered business solutions (25–30 %)
  - Design AI-powered business solutions (25–30 %)
  - Deploy AI-powered business solutions (40–45 %)
- Die Units des Lernpfads decken die Study-Guide-Punkte nahezu 1:1 ab
  (die Unit-Titel entsprechen den Skill-Bullets).

## Study-Guide-Checkliste (je Punkt ≥ 2–3 Fragen)

Plan
- [x] Analyze requirements: agents in automation/analytics/decision-making · grounding data (5 Dimensionen) · organize data for AI systems
- [x] AI strategy: CAF adoption process · agent strategy/platform choice · multi-agent design · prebuilt agent use cases · rules & constraints · generative AI & knowledge sources · build custom vs. extend Copilot · custom models · prompt library · SLMs · prompt engineering · AI CoE · multiple Dynamics 365 apps (+ Rollen, Regulierung, Prompt-Training)
- [x] Costs and benefits: ROI criteria/TCO · ROI analysis · build/buy/extend · model router

Design
- [x] AI and agents: business terms · Copilot customizations · connectors for Sales · Contact Center channels · task/autonomous/prompt-and-response agents · Foundry Tools · generative pages/agent feed · topics & fallback · data processing/grounding · canvas apps · Power Platform WAF · NLU/CLU/generative · agent flows · prompt actions (+ RAI tenets, success criteria)
- [x] Extensibility: custom models in Foundry · agents in Microsoft 365 Copilot · Copilot Studio extensibility · MCP · Computer Use · behaviors (reasoning, voice) · Teams/SharePoint agents
- [x] Orchestrate prebuilt: D365 finance/supply chain · D365 CX/service · Microsoft 365 agents · Copilot for Sales/Service · Power Platform AI/AI hub · F&O interoperability · in-app help knowledge

Deploy
- [x] Monitor/tune: process & tools · backlog/feedback · AI-based tuning · performance metrics · telemetry
- [x] Testing: process & metrics · validation criteria custom models · prompt best practices · E2E multi-app · test cases with Copilot
- [x] ALM: data · Copilot Studio agents/connectors/actions · Foundry Agents · custom models · D365 F&SCM · D365 CX/service
- [x] RAI/security/GRC: security · governance · model security · vulnerabilities/prompt manipulation · RAI review · data residency · access controls · audit trails

## Schritte

- [x] 1. Quellen verifizieren (Catalog API, Hierarchy API, Study-Guide-Seite)
- [x] 2. `exam.json` (3 Skill-Areas plan 0.28 / design 0.28 / deploy 0.44,
      40 Fragen, 120 min, 700/1000, Kurve 0.20/0.45/0.35, SEO-Intro + FAQ),
      `sources.json`
- [x] 3. Ingest: 117 Units (106 inhaltliche) in 11 Modulen
- [x] 4. Alle inhaltlichen Units gelesen; Fragen-Pool **197 Fragen** in 7
      Batches (plan 65 / design 67 / deploy 65; easy 42 / medium 117 /
      hard 38; single-choice 138, matching 37, ordering 8, yes-no 8,
      multiple-choice 6), alle mit wörtlichem Quellzitat
- [x] 5. Antwort-Längen-Tell bereinigt (3 Edit-Durchläufe, 579 Optionstexte):
      richtige Antwort strikt längste 25/138 (18 %), strikt kürzeste 15,
      Rangverteilung 39/68/16/15; Absolutwörter nur in Distraktoren 2/138;
      keine Gedankenstrich-Begründungen
- [x] 6. Glossar: 139 Begriffe aus allen Modulen, 191/197 Fragen mit Treffer,
      Ø 3,3 je Frage (max 9); generischer Alias „instructions" entfernt
- [x] 7. Nachschlagewerk `compendium.md` (~7.800 Wörter): Gesamtbild
      (Plattformen, Entscheidungslogik, ASCII-Diagramm) → Planen
      (Anforderungen, Grounding, Daten, CAF, Plattformwahl, Multi-Agent,
      Prebuilt/Regeln/Wissen, Extend/Build/Modelle, Prompts, Organisation,
      Kosten) → Designen (RAI, Copilot in D365, Agententypen, Foundry Tools,
      Grounding-Pipelines, WAF, Erweiterbarkeit, Orchestrierung) →
      Bereitstellen (Monitoring/Tuning/Testen, ALM, Sicherheit/Governance/
      Compliance) → Entscheidungshilfen (Plattform/Agent, Prozess/Kontrolle,
      Stolperfallen). SSR-Render geprüft.
- [x] 8. Validiert (0 Fehler, 197 verbatim-Zitate), 607 Embeddings, Seed nach
      Supabase, Probe-Ziehung 3× (40 Fragen, je Area alle drei Stufen)

## Ergebnis (07.10.2026)

- Alle Study-Guide-Punkte mit ≥ 2 Fragen; die meisten mit 3+. Dünner belegt
  (je 1–2 Fragen, weil das Material nur kurze Absätze liefert): „Design
  connectors for Copilot in Dynamics 365 Sales" (2 + 1 yes-no), „Orchestrate
  AI features in D365 finance and supply chain" (2), „Design agents for
  Dynamics 365 Contact Center" (2).
- Nicht im Material und daher nicht gefragt: konkrete Preise/Lizenz-SKUs,
  Foundry-Portal-Klickpfade, Details zu Agent 365/Foundry IQ (nur Verweis).
- Glossar: 4 Begriffe ohne Frage (scenario-library, ai-regulations,
  hyperparameters, a2a) bewusst behalten, weil sie im Nachschlagewerk und
  in Erklärungen vorkommen.
