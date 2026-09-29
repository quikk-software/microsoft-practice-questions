# Implementierungsplan: AB-620 (AI Agent Builder Associate)

Neues Examen nach dem Muster von AB-410: Fragen entstehen ausschließlich aus
den tatsächlichen Lerninhalten; der Study Guide liefert Struktur, Gewichtung
und die Abdeckungs-Checkliste. Anforderung von Joyce: realistische
Prüfungsszenarien, Erklärungen und Glossar wie bei AB-410.

## Quellen (verifiziert am 29.09.2026)

- Zertifizierung: `certification.ai-agent-builder-associate`
  („Microsoft Certified: AI Agent Builder Associate", Level Intermediate,
  Rollen App Maker/Developer, Produkte Azure, Microsoft 365 Copilot,
  Copilot Studio, Power Platform). Prüfungsdauer laut Seite: **120 Minuten**.
- Die Zertifizierungsseite verlinkt unter „Prepare for the exam" nur den
  Kurs `course.ab-620t00` („Design and build integrated AI agent solutions
  in Copilot Studio", verfügbar ab 30.09.2026). Der Catalog-Eintrag des
  Kurses nennt drei Lernpfade:
  1. `learn.wwl.design-agent-conversations-responses-topics-copilot-studio`
     — Adaptive Cards, Topics/Tools, Generative Answers (3 Module)
  2. `learn.wwl.design-build-multi-agent-solutions-copilot-studio`
     — Multi-Agent-Design, Child Agents, Connected Agents, A2A (4 Module)
  3. `learn.wwl.integrate-agents-enterprise-systems-copilot-studio`
     — Integrationsstrategie, Connector/REST-Tools, Wissen + Azure AI
     Search, MCP (4 Module)
- Ergänzt, weil der Study Guide sie ausdrücklich prüft, die Kurs-Pfade
  sie aber nicht enthalten:
  4. `learn.wwl.automate-tasks-workflows-copilot-studio` — Agent Flows,
     Computer Use (2 zusätzliche Module; das Integrationsstrategie-Modul
     ist identisch mit Pfad 3 und wird nur einmal geladen)
  5. Modul `learn.wwl.evaluate-publish-manage-agents-copilot-studio`
     — Evaluationen, Monitoring, Publish/Kanäle, Lifecycle/Kosten
     (Teil des Lernpfads zum GitHub-Copilot-Harness)
  6. Modul `learn-bizapps.implement-power-virtual-agents` — Umgebungen,
     Berechtigungen, Monitor/Diagnose, Export/Import, Authentifizierung
- Study Guide „Skills at a glance" (Stand 21.04.2026):
  - Plan and configure agent solutions (30–35 %)
  - Integrate and extend agents in Copilot Studio (40–45 %)
  - Test and manage agents (20–25 %)

## Study-Guide-Checkliste (je Punkt ≥ 3 Fragen anstreben)

Plan and configure agent solutions
- [x] Plan an agent solution: enterprise systems · identity · channels/deployment · responsible AI · security/governance · reusable components · internal vs. external audiences
- [x] Agent flows: create · human-in-the-loop · actions/connectors · monitor · input/output parameters · error handling
- [x] Topics: agent flows in topic · response formatting · tools in topic · custom prompts · custom knowledge · API/Send HTTP request · generative answers node · adaptive cards · variables

Integrate and extend agents
- [x] Knowledge: Copilot connectors · Power Platform connectors · Azure AI Search
- [x] Tools: computer use (configure/monitor) · MCP tools · existing custom connector · REST APIs
- [x] Multi-agent: design · Foundry agent · existing agent · Fabric data agent · A2A
- [x] Azure: generative answers with Azure AI Search · custom prompts with Foundry model catalog · Application Insights (nur eine Erwähnung im Material → 1 Frage)

Test and manage agents
- [x] Evaluate: test set · evaluation method · review results
- [x] ALM: solution · add existing agents · environment variables · pipelines

## Schritte

- [x] 1. Quellen verifizieren
- [x] 2. `exam.json` (3 Skill-Areas 0.33/0.42/0.25, 40 Fragen, 120 min,
      700/1000, Kurve 0.20/0.45/0.35, SEO-Intro + FAQ), `sources.json`
- [x] 3. Ingest (Ingest-Skript unterstützt jetzt zusätzlich `modules`)
- [x] 4. Alle 91 inhaltlichen Units gelesen; Fragen-Pool **153 Fragen** in 8
      Batches (plan-configure 64 / integrate-extend 54 / test-manage 35;
      easy 33 / medium 92 / hard 28; single-choice 135, yes-no 7, matching 7,
      multiple-choice 2, ordering 2), alle mit wörtlichem Quellzitat
- [x] 5. Glossar: 124 Begriffe aus allen Modulen, 153/153 Fragen mit Treffern,
      Ø 4,8 je Frage
- [x] 6. Validiert (0 Fehler), 428 Embeddings, Seed nach Supabase,
      Probe-Ziehung 3× (je Area alle drei Stufen gedeckt)

## Ergebnis (29.09.2026)

- Antwort-Längen-Tell bereinigt: richtige Antwort strikt längste 11 %,
  strikt kürzeste 15 %, Rangverteilung 15/51/44/25 (1 = längste);
  Absolutwörter nur in Distraktoren 9/135; keine Gedankenstrich-Begründungen
- Alle Study-Guide-Punkte mit ≥ 3 Fragen außer „Monitor agents by using
  Application Insights“ (im Material nur ein Satz → 1 Frage) und „Configure
  generative answers by using Azure AI Search with Foundry“ (Material behandelt
  Azure AI Search als Wissensquelle und Foundry-Modelle im Prompt builder
  getrennt → je 3+ Fragen, aber keine kombinierte Foundry-Search-Frage)
- Nicht im Material: Details zu „Plan identity strategy“ jenseits der
  Authentifizierungsoptionen/Anmeldemodi; „Design agents for internal or
  external audiences“ nur implizit über Kanal-/Auth-Entscheidungen
- Kein Nachschlagewerk (compendium.md) angelegt — auf Wunsch wie bei AB-410
