# AB-100 Nachschlagewerk — Agentic AI Business Solutions Architect

Dieses Nachschlagewerk fasst den Lernpfad „Architect AI solutions for business productivity“ (Kurs AB-100T00, elf Module) zu einem zusammenhängenden Text zusammen. Der rote Faden folgt der Arbeit eines Solution Architects: zuerst das Gesamtbild (welche Plattformen, welche Entscheidungslogik), dann die Planung (Anforderungen, Daten, Strategie, Kosten), das Design (Agententypen, Copilot in Dynamics 365, Erweiterbarkeit, Orchestrierung vorgefertigter Agenten) und zuletzt die Bereitstellung (Monitoring, Testen, ALM, Sicherheit und Compliance). Am Ende stehen Entscheidungstabellen für die typischen „Welche Plattform, welcher Agent, welcher Prozess?“-Fragen der Prüfung.

Produktbegriffe bleiben englisch, Erklärungen sind deutsch. Die AB-100 ist eine Expert-Prüfung: Sie fragt selten nach Klickpfaden, fast immer nach der Entscheidung, die ein Architekt in einem Szenario trifft, und nach der Begründung aus dem Framework.

## Das Gesamtbild: Plattformen und Entscheidungslogik

Microsofts KI-Ökosystem für Geschäftslösungen besteht aus wenigen Schichten, die in jedem Modul wieder auftauchen.

```
   Geschäftsziel ──► KI-Strategie ──► Architektur ──► Implementierung ──► Monitoring & Optimierung
                                        │
        ┌───────────────────────────────┼────────────────────────────────┐
        │                               │                                │
   SaaS-Agenten                 Low-Code (SaaS)                  Pro-Code (PaaS/IaaS)
   Microsoft 365 Copilot        Copilot Studio                   Microsoft Foundry
   Copilot in Dynamics 365      Task-, Retrieval-, autonome      Connected Agents, Multi-Agent,
   Prebuilt Agents, Templates   Agenten, Agent Flows,            Custom Models, Model Router,
   Agent Builder (deklarativ)   Prompt Actions, Computer Use     GPUs & Container (BYO-Modell)
        │                               │                                │
        └───────────────────────────────┼────────────────────────────────┘
                                        │
   Daten & Grounding: Microsoft Graph / Semantic Index · Dataverse · SharePoint · Azure AI Search · Fabric
   Governance: CAF + Agent-Lebenszyklus · AI CoE · DLP & Sensitivity Labels · Managed Identities · ALM
```

Die Zusammenhänge, die man verinnerlicht haben sollte:

- **Business Outcome zuerst.** Jede Entscheidung beginnt mit messbaren Geschäftszielen, nicht mit einem Modell oder einer Plattform. Der AI Architect definiert Vision und Roadmap, sichert Datenbereitschaft und Governance, integriert KI in Workflows, verankert Responsible AI und überwacht KPIs.
- **SaaS agent first.** Erfüllt ein vorgefertigter Agent die funktionalen Anforderungen, wird er genutzt. Erst dann kommt Low-Code (Copilot Studio) und erst zuletzt Pro-Code (Foundry) oder eigenes Hosting (GPUs & Container) in Frage.
- **Grounding entscheidet über Qualität.** Agenten sind nur so gut wie die Daten, auf denen sie erden: Accuracy, Relevance, Timeliness, Cleanliness, Availability. Berechtigungen werden durchgereicht (Semantic Index, Retrieval API, SharePoint-Wissen).
- **Single-Agent, bis die Evidenz Multi-Agent verlangt.** Mehrere Agenten nur bei Sicherheits-/Compliance-Grenzen, getrennten Teams und Release-Zyklen, klarer Expansion oder abhängigen Workstreams.
- **Governance ist kein Nachgang.** DLP, Sensitivity Labels, Managed Identities, Least Privilege, Residency, Audit Trails und ein AI Center of Excellence gehören an den Anfang.
- **Ein Regelwerk, plattformspezifisch angewendet.** Copilot Studio erzwingt Governance über die Plattform (Risiko low-medium); Foundry verlangt architektengeführte Governance und Evaluationspipelines (Risiko medium-high).
- **Betrieb ist ein Kreislauf.** Monitor → Analyze → Tune → Validate → Release → Monitor; ALM mit Promotion Gates hält Daten, Prompts, Agenten und Modelle reproduzierbar.

## Planen: Anforderungen, Daten und Strategie

### Was Agenten leisten

Agenten automatisieren repetitive Arbeit (E-Mails und Berichte entwerfen, Threads zusammenfassen, Mehrschrittprozesse auslösen), liefern Analytik in natürlicher Sprache (Trends, Ausreißer, Visualisierungen) und unterstützen Entscheidungen (Szenario-Empfehlungen, Risikoerkennung, Kontext aus Dokumenten). Die Tool-Zuordnung der Lerninhalte: Kommunikation → Microsoft 365 Copilot; Dokumentation → Word, OneNote, Loop; Prozessautomatisierung → Copilot Studio und Power Automate; Wissensabruf → Copilot Search mit Graph Grounding. Best Practices: mit dem Business Outcome starten, Automatisierung für Wiederholarbeit statt als Ersatz für kritisches Denken, Responsible-AI-Prinzipien, Monitoring und Training.

### Grounding-Daten prüfen

Grounding lässt einen Agenten aus vertrauenswürdigen, domänenspezifischen Organisationsdaten antworten. Microsoft 365 Copilot und Copilot Studio nutzen **Semantic Indexing** über Microsoft Graph (lexikalische und semantische Repräsentationen, kontinuierlich aktualisiert); die **Copilot Retrieval API** holt Passagen aus SharePoint, OneDrive und verbundenen Quellen und respektiert Berechtigungen.

| Dimension | Bedeutung | Wirkung auf den Agenten |
|---|---|---|
| **Accuracy** | korrekt, von SMEs verifiziert, autoritativ | weniger Fehlinformation |
| **Relevance** | passt zum Use Case | sonst liefert die semantische Suche ähnliche, aber kontextuell falsche Inhalte |
| **Timeliness** | aktuell (Änderungsdaten, Refresh-Zyklen) | Antworten folgen den neuesten Policies |
| **Cleanliness** | klare Struktur, keine Duplikate, stabile Formatierung | höhere Retrieval-Präzision und bessere Embeddings |
| **Availability** | gespeichert, in Graph indexiert, Zugriffe klar | Agent erdet nur auf Daten, die der Nutzer sehen darf |

Praxis: Inhalte vor dem Upload bereinigen, autoritative Inhalte in SharePoint/OneDrive ablegen (damit sie in den Semantic Index gelangen), konsistent formatieren, Berechtigungen regelmäßig prüfen, mit SMEs validieren.

### Daten für KI-Systeme organisieren

Schlecht organisierte Daten führen zu schwachem Grounding und unzuverlässigen Entscheidungen. Eine **RAG-Pipeline** (Ingestion, Cleaning, Chunking, Embedding, Indexing, Retrieval, Prompt Assembly, Orchestrierung, Monitoring) bringt Echtzeitzugriff, Datenschutz und weniger falsche Informationen. Die Azure-Datenlandschaft für KI hat vier Schichten: **Operational Databases** (Azure SQL, Cosmos DB, PostgreSQL mit Vektor-/JSON-Fähigkeiten), **Analytical Stores** (Fabric Lakehouse/Warehouse), **Intelligence Layer** (Azure AI Search, Semantic Ranking, Embeddings, Vector Index) und **AI Apps + Agents**. Das CAF ergänzt zentrale Wissensquellen (SharePoint, OneDrive, Dataverse, Azure Storage), Semantic Indexing, eine Governance-Schicht (RBAC, Sensitivity Labels, Purview), APIs/Connectors und RAG-fähige Architektur.

Best Practices: zentralisieren (Azure, Dataverse, Fabric), normalisieren (Schema, Namen, Metadaten, Taxonomie), semantisch indexieren, mehrere Zugriffspfade (APIs, Suchindizes, RAG-Pipelines, Graph Connectors, SQL-Endpunkte), Governance früh (Purview: Zugriffsrichtlinien, Labels, Lineage, Qualitätsregeln), Daten aktuell halten.

### KI-Strategie nach dem Cloud Adoption Framework

Das **Cloud Adoption Framework** liefert das End-to-End-Rückgrat (Strategy, Plan, Ready, Govern, Secure, Manage); die **Agent-Adoption-Guidance** legt das Betriebsmodell für Agenten darüber (Plan agents, Govern & secure agents, Build agents, Operate agents). Die Vereinigung senkt Risiko, verhindert **Agent Sprawl** und beschleunigt die Wertrealisierung.

| CAF-Phase | Agent-Lebenszyklus | Kernaktivitäten | Outputs |
|---|---|---|---|
| **AI strategy** | Plan agents | Use Cases priorisieren, Erfolgsmetriken, Entscheidung ob Agent und welche Plattform (SaaS vs. custom), Data- und RAI-Strategie | AI Strategy Brief, **Agent Technology Plan** |
| **AI plan** | Plan agents | Skills, Ressourcen, PoC, **Agent Readiness Criteria** (Datenverfügbarkeit, Governance-Reife, Identitätsmodell, Connectors) | Adoption Plan, PoC-Report, Readiness Assessment |
| **AI ready** | Govern & secure (Foundation) | Landing Zones, Ressourcenorganisation, Governance-Grenzen, Datenarchitektur für Agenten | Landing Zones, Policies, **Governance Charter**, **Data Access Model** |
| **Govern + Secure** | Govern & secure (Enforcement) | Azure Policy, Risiko-Monitoring, Controls für Verhalten, Datenzugriff, Audit, Eskalation | Policy Set, Risk Register, Security Controls |
| **Build agents** | Build | Standardprozess für Copilot Studio und Foundry (Knowledge-/Action-Tools, Trigger, Evaluationen), Referenzarchitekturen | Templates, Evaluation Gates, Umgebungsstrategie, CI/CD mit Guardrails |
| **Manage AI** | Operate | Deployment-Autorität, Telemetrie, SLOs, Rollout, Verhaltensmonitoring, Lifecycle | Operations Baseline, **Agent Ops Playbook** (SLOs, Retraining, Deprecation) |

Dazu gehören ein RACI (Solution Architect accountable für Strategie, Tech-Plan, Build und Betrieb; Plattformteam für Landing Zones; Security für Policies; Data Owner für Grounding-Daten) und Checklisten je Phase.

### Agentenstrategie und Plattformwahl

Drei Kategorien: **SaaS (prebuilt)** Agenten (sofortiger Wert, minimale Anpassung), **Low-Code** (Copilot Studio) und **Pro-Code** (Foundry, eigenes Hosting). Entscheidungsprinzip **SaaS agent first**.

| Lösung | Ansatz | Agententypen | Am besten für |
|---|---|---|---|
| **SaaS agents** | Ready-to-use | Retrieval, Task | persönliche Produktivität, minimale Anpassung |
| **Copilot Studio** | Low/No-Code (SaaS) | Retrieval, Task, Autonomous | Prozesstransformation, schnelle Entwicklung, SaaS-Sicherheit, direkte Dynamics-365-Integration |
| **Microsoft Foundry** | Pro-Code und Low/No-Code (PaaS) | Retrieval, Task, Autonomous | strategische Transformation, tiefe Integration, komplexe Orchestrierung, Modellkatalog (OpenAI, Anthropic, Meta, Mistral), Activity Protocol, A2A |
| **GPUs & Container** | Pro-Code (PaaS/IaaS) | Retrieval, Task, Autonomous | compliance-sensitiv, volle Kontrolle, private isolierte Compute, BYO-Modell |

Architekturüberlegungen: mit einem Agenten starten (Multi-Agent erst bei Grenzüberschreitung, Teams oder Spezialisierung); Grounding-Quellen, Frische, Indizes und Least-Privilege definieren; Hosting nach Netzwerkisolation, Latenz, Monitoring und Change Management wählen (Foundry Standard Setup unterstützt privates Networking).

### Multi-Agent-Lösungen entwerfen

**Start simple, scale when the evidence requires it.** Single-Agent bündelt Logik, senkt Koordination und vereinfacht Governance; Multi-Agent trennt Verantwortung, kostet aber Orchestrierung, Latenz an Übergaben und Sicherheitsfläche. Multi-Agent zuerst bei: Sicherheits-/Compliance-Grenzen (Datenklassen, Separation of Duties), mehreren Teams mit eigenen Daten und Release-Zyklen, Roadmap über 3-5+ Funktionen, abhängigen Aktionen über mehrere Workstreams. Viele vermeintliche Multi-Agent-Bedarfe lösen **Persona Switching**, besseres Retrieval, Policy Controls oder ein größeres Kontextfenster.

Plattform-Rollen: Microsoft 365 Copilot (Domänenassistent, sofortiger Wert im Arbeitsfluss; Handoff/Group Chat), Copilot Studio (Business-Workflow-Agent; Sequential/Handoff), Foundry (Integrations-/Orchestrierungsagent mit Pro-Code-Tools und eigenen Evaluationen; Concurrent/Sequential/Magentic).

| Orchestrierungsmuster (Microsoft Agent Framework SDK) | Beschreibung |
|---|---|
| **Sequential** | deterministische Pipeline plan → enrich → verify → act |
| **Concurrent** | parallele Agenten für unabhängige Teilaufgaben, Ergebnisse aggregiert |
| **Group chat** | moderierte Diskussion, Moderator-Agent entscheidet |
| **Handoff** | Kontext und Kontrolle an Spezialist oder Mensch bei Schwellwert/Eskalation |
| **Magentic** | ein „Magnet“ zieht Expertenagenten dynamisch zur Laufzeit hinzu |

Orchestrierung ist als Workflow mit Zustand, Verzweigung und Fehlerbehandlung zu behandeln, nicht als brüchige Prompt-Kette. **Connected Agents** in Foundry: Hauptagent (Mission, Guardrails, Metriken, Tooling), Rollenagenten (Planner, Researcher, Reviewer, Actuator) mit minimalen Anweisungen und scoped Permissions, Schnittstellenverträge und State-Handoffs (IDs, Evidenz, Zitate), schnelles Prototyping, Iteration. Evaluations-Checkpoints: eine Verantwortung je Agent, Sicherheitsgrenzen je Agent, Graceful Degradation, Observability an jeder Übergabe, natürlichsprachliches Routing. Betrieb: Least Privilege je Agent (kleinerer Blast Radius), **Context Hygiene** (IDs statt Rohinhalt), Observability (Handoff-Latenz, Tool-Fehlerrate, Entscheidungsqualität), Human-in-the-loop und Break-Glass-Pfade.

### Prebuilt-Agenten, Regeln und Wissensquellen

**Prebuilt Microsoft 365 Copilot Agents** (Knowledge Q&A, Zusammenfassung, Reise-/Guidance-Agenten wie Safe Travels, Research, Produktivität) lohnen sich bei hoher Wiederholfrequenz, Wissensintensität, Pain Points und messbaren ROI-KPIs. Feasibility: Daten in Microsoft 365, konversationelles Interaktionsmodell, keine Multi-Agent-Orchestrierung, Genauigkeitserwartung passt zu Retrieval-first.

**Solution Rules and Constraints:** Copilot Studio (Low-Code, SaaS-Grenze, Connector-Scoping, Task-Grenzen, Safety-Filter) vs. Foundry (Pro-Code, explizite Governance für Tools/Modelle/Memory, Evaluationspipelines, Rollentrennung, VNet/Private Endpoints) vs. **Foundry Tools** (Least Privilege je Tool, Failure-Case-Tests, Eskalationsregeln, dokumentierte Integrationen). Datenregeln: nur nötige Daten, Maskierung, kuratierte Quellen, Memory-Policy (ephemer vs. persistent), keine domänenübergreifenden Zugriffe (HR, Finance, Legal), Human Review für hochriskante Aufgaben, Audit für Tool-Aufrufe. **Behavior Envelopes** („Agent may summarize“, „Agent may not decide“, „Agent may not execute financial transactions“). Umgebungen: Copilot Studio und Microsoft 365 Copilot innerhalb der Tenant-Grenze; Foundry mit architektierter Umgebung; Dev/Test/Prod getrennt; SLOs, Incident Response, Rollback.

**Wissensquellen in Copilot Studio** (Agenten-, Topic- oder Knotenebene): öffentliche Websites, Uploads (in Dataverse indexiert), SharePoint (berechtigungsgetreu), Dataverse-Tabellen, Enterprise Connectors (Microsoft Search), Azure OpenAI on your data (Knotenquellen vor Agentenquellen, Modellwahl), Azure AI Search (Vektor, Semantic Ranking, Key/Zertifikat/Entra-ID). Generative Orchestrierung erzeugt das System-Topic Conversational boosting, durchsucht bis zu **25 Wissensquellen** und kann allgemeines Wissen einbeziehen; unstrukturierte Daten: max. **500 Knowledge Objects** je Agent, **5 unstrukturierte Quellen** gleichzeitig im Retrieval.

| Behavior | Generative orchestration | Classic orchestration |
|---|---|---|
| Topics | nach Beschreibung gewählt | nach Trigger-Phrasen |
| Child/Connected Agents | nach Beschreibung | nicht verfügbar |
| Tools | Agent ruft nach Name/Beschreibung | nur explizit aus Topics |
| Knowledge | proaktiv durchsucht | Fallback ohne Topic-Treffer |
| Kombination | Topics, Tools, Wissen zusammen | ein Topic, ggf. Wissens-Fallback |
| Rückfragen/Antworten | automatisch generiert | Question-/Message-Knoten nötig |

Auswahl: strukturiert → Dataverse; semi-strukturiert/hohe Präzision/großes Volumen → Azure AI Search mit Semantic Ranking; unstrukturiert → SharePoint/OneDrive/KB via Dataverse; breite Abdeckung → generative Orchestrierung mit mehreren Quellen; sensible Dokumente → unstrukturierte Daten mit Berechtigungsvererbung; einfache Q&A → Public Site oder klassisches Topic.
### Erweitern, bauen oder eigenes Modell?

| Frage | Extend Microsoft 365 Copilot | Custom Agent |
|---|---|---|
| Szenario | Produktivität in Word, Excel, Teams, Outlook; einfache Retrieval-/Summarization-Aufgaben; Daten in Microsoft 365 | komplexe Mehrschritt-Workflows, hohes Volumen, Case Management, Field Operations, Branchenlösungen, Multi-Agent |
| Autonomie / Logik | gering / begrenzt | hoch / umfangreich |
| Daten | Microsoft 365 (Graph, Semantic Index) | beliebige Unternehmensdaten, strikte Grounding-Kontrolle, Vektorsuche |
| Aktionen / Orchestrierung | einfach (Kalender, Mail, Dateien) / keine bzw. implizit | komplex, mehrstufig / volle Orchestrierung |
| Governance | eingebaut (RAI-Guardrails) | eigene Governance, Monitoring, Evaluation |
| Team | Low-Code, schnelle Aktivierung | Azure-AI-, Orchestrierungs- und Architekturkompetenz |

**Custom AI Models** erst, wenn Prebuilt-/Katalogmodelle (Foundry-Katalog, Azure OpenAI) nicht reichen: domänenspezifische Sprache, unzureichende Genauigkeit trotz Prompt Engineering, Retrieval-Tuning, Fine-Tuning und fortgeschrittener Katalogmodelle (anhaltend niedrige Precision/Recall, hohe Fehlerkosten, Determinismus), volle Governance-Kontrolle (Explainability, Residency), sehr hohes Volumen (kleine Kostenvorteile skalieren) oder Multi-Agent-Reasoning. Voraussetzungen: große gelabelte Datenmengen, Governance, wiederholbare Pipeline, Taxonomie, Retraining, Data Scientists und MLOps. Fehlen sie, ist das Erweitern von Microsoft 365 Copilot der bessere Start. Balance: Business Fit + Model Fit + Data Fit + Cost Fit + Operational Fit.

**Small Language Models** (z. B. Phi-3) für niedrige Latenz, kostenoptimierte Inferenz, Edge/IoT/On-prem, eingeschränkte Konnektivität, Domänenpräzision, Datensouveränität und als günstige Planner in Multi-Agent-Systemen; angepasst über Domain Tuning, Behavior Tuning, Task-Optimierung. Kein Allheilmittel: Anti-Patterns sind SLM statt RAG über ein allgemeines Modell, unterschätzte Datenkuration, SLM als „Silver Bullet“ gegen Fehlinformation, breite kreative Aufgaben; Risiken Overfitting, schlechte Generalisierung, überhastetes Safety-Tuning. Scorecard: Task-Accuracy, Latenz, Kosten je 1.000 Requests, Safety-Incidents, Drift.

### Prompts: Engineering, Bibliothek, Training

Vier Säulen: **Clarity** (explizit, handlungsorientiert, Domänenbegriffe), **Context** (Zweck, Zielgruppe, Quellen, Constraints), **Constraints** (Ton, Compliance, Ausschlüsse, „Do not include“), **Output format** (Tabelle, Liste, JSON, Schritte). Muster: Instruction + Context + Output, Few-shot, Role Prompting („Act as a compliance analyst“), Multi-step (Extract → Analyze → Recommend → Summarize), Chain-of-thought (für Analyse und Troubleshooting, nicht übernutzen). Iteration: Prompt → Review → Refine → Reprompt mit Versionskontrolle und KPI-Bewertung (Accuracy, Completeness, Compliance). Pitfalls: überlange Prompts, widersprüchliche Anweisungen, fehlender Kontext, zu viel Chain-of-thought, Leaks sensibler Daten.

**Prompt Library**: Templates (Summaries, Klassifikation, Transformation, Empfehlung, Troubleshooting, Decision Support), Domänen-Prompts (HR, Finance, IT, Security, Sales, Operations), Governance-Metadaten je Prompt (Purpose, Owner, Version, Last updated, Applicable systems, Risk classification, Required grounding sources), Qualitätsstandards, Ablage (SharePoint, GitHub Enterprise, Azure DevOps, Copilot Studio). Governance: Versionskontrolle, Review durch Domain Experts, RAI-Reviewer und Security/Compliance, Tests über Inputs, Edge Cases und Modellversionen, Lifecycle (Retire, Update, Drift-Monitoring). **Prompt Maturity Model**: Basic → Guided → Structured → Optimized → Enterprise.

**User Prompt Training** nach Personas: Everyday Users (Basis, Grenzen, verantwortungsvolle Nutzung), Power Users/AI Champions (Advanced, Multi-Step, Templates, Coaching), Manager (Insights prüfen, Governance, Monitoring), Accessibility (Voice, inklusives Design). Programm: Awareness → Prompt Literacy → Workflow-integriert → Reinforcement (Office Hours, Champions, Library, In-App-Guidance); Assets: Playbooks, Library, Szenario-Übungen, barrierefreie Materialien.

### Organisation: Rollen, Regulierung, Center of Excellence

**Rollen**: Executive Sponsor (Richtung, Funding – sonst stockende Adoption), AI-CoE-Lead (Koordination, Governance), Product Owner (Outcome, Roadmap – sonst richtungslose, disparate Lösungen und technische Schulden), Business Domain Specialist (Grounding, Validierung, Labels – sonst unzuverlässige Workloads), Data Owner/Steward (Qualität, Zugriff, Lineage), RAI-/Compliance-Officer (Ethik, Risiko, Bias), Change-Management-/Skilling-Lead (Adoption). Technische Personas (Azure WAF): AI Engineer, Data Scientist, Data Engineer, Application Developer, MLOps/AIOps Engineer. Empfehlung: Role-Mapping-Workshop, Gap-Analyse, RACI.

**Regulierung**: Datenschutz (CCPA/CPRA, Colorado, LGPD, DPDP), KI-Gesetze (EU AI Act, Canada AIDA, Singapore Framework, US Executive Orders), Branche (HIPAA, FINRA/SEC/PCI DSS, FERPA, NIST), lokale Regeln (Biometrie, automatisierte Entscheidungen, Mitarbeiterüberwachung, Transparenz). Sieben Schritte: Jurisdiktionen → Regelungen → Risikoklasse (Low intern, Medium kundenorientiert, High automatisierte Entscheidungen/reguliert) → Datenanforderungen (Residency, Sovereignty, Zugriff, Verschlüsselung, Logging) → KI-Pflichten (Transparenz, Oversight, Evaluation, Fairness, Safety) → Microsoft-Controls (regionale Datengrenzen, Purview, RAI-Dashboards, Content Safety, Azure Policy) → Dokumentation und Freigabe.

**AI Center of Excellence**: Zweck (Reife, Governance, Standards, Alignment, weniger Doppelarbeit, Expertenhub); Elemente (Executive Sponsorship, accountable Leitung, multidisziplinäres Team: Strategie, Daten, ML, Governance, Security, Operations, Business); Verortung im Cloud CoE oder der Data-/Enterprise-Architecture-Gruppe, Standalone nur ohne unterstützendes Team; Progression **Centralized → Hybrid → Advisory** (Berater statt Gatekeeper, Governance in Plattformen eingebettet); Funktionen (Strategie, Skilling inkl. Prompt-/Agent-Bibliotheken, Standards, Intake/Priorisierung, Delivery-Support, Betrieb); Maturity Assessment. Failure Modes: Überzentralisierung → Bottlenecks, Untergovernance → Shadow AI, kein Sponsor, keine Data Governance, Gatekeeper, fehlendes Change Management.

**Mehrere Dynamics-365-Apps**: gemeinsamer Geschäftskontext, Prozesskontinuität (Sales → Service → Finance → Field Service), harmonisierte Dataverse-Tabellen, Event-getriebene Flüsse. Multi-Session-Apps brauchen zeitpersistenten Kontext (Session-Metadaten, Insights in Entitäten, keine volatilen Inhalte in Prompts). Single-Agent für lineare Ein-Domänen-Workflows; Multi-Agent mit **Planner → Worker → Reviewer** für domänenübergreifende Prozesse. **Intent-driven**: Intent Parsing, Context Routing, Adaptive Actions, Dataverse-Events statt Point-to-Point.

### Kosten und Nutzen bewerten

**ROI** umfasst Produktivität (Zeit je Task, weniger manuelle Eingabe), Kosteneinsparung (Arbeitsstunden, Tickets), Umsatz, Risikoreduktion und strategischen Wert; in der Zusammenfassung drei Kategorien: financial (hard), strategic/intangible (soft), time-based. KI-ROI muss messbar, wiederholbar, outcome-aligned und in realer Nutzungsanalytik verankert sein. **TCO** und ROI beantworten unterschiedliche Fragen und werden getrennt ausgewiesen.

| TCO-Kategorie | Beispiele |
|---|---|
| Development | Datenvorbereitung, Prompt Engineering, Design/Test, Integration |
| Deployment | Infrastruktur, Lizenzen, Security-/Compliance-Setup, API-Nutzung |
| Operational | Monitoring/Evaluation, Retraining, Prompt-Library-Pflege, Support, Training |
| Change Management | Skilling, Kommunikation, Prozessredesign |
| Decommissioning | Modelle stilllegen, Migration |

Alternativ die **fünf Kostendomänen**: Infrastructure, Development & Integration, Data Quality & Preparation, Expertise & Staffing, Operations & Licensing.

**Copilot Studio ROI Analytics**: Usage (Sessions, aktive Nutzer, Dauer), Automation (Completion, Abandonment, Task Success), Cost Savings (Zeit, Kosten je Task, weniger manuelle Arbeit), Quality (Feedback, Fehler, Eskalationen). **Savings Calculator**: per run (vorhersehbar) oder per tool (granular bei mehreren Tools); Inputs Minuten je Run, erfolgreiche (gelöste) Runs, voll belasteter Stundensatz. Beispiel: 6 Min × 20.000 Runs × 60 $/h = 120.000 $/Monat. Formeln: Annual_Benefit = (Minutes/60) × Runs_per_Year × Labor_Rate (+ vermiedene Fehlerkosten); Net_Benefit = Annual_Benefit − Annual_TCO; ROI % = Net_Benefit / Annual_TCO × 100; Payback = einmalige Kosten / monatlicher Nettonutzen. Worked Example: 486.000 $ Nutzen, 300.000 $ TCO → ROI ≈ 62 %, Payback ≈ 7,4 Monate. **Sensitivity Bands** (optimistisch/erwartet/konservativ über Adoption, Minuten, Stundensätze, Qualität); Executive One-Slide: Problem, Intervention, gemessener Impact, Finanzen, Konfidenz, Entscheidung (Pilot → Scale).

| | Build | Buy | Extend |
|---|---|---|---|
| Wann | Differenzierung, Compliance, Datensensitivität, starke AI/ML-Kompetenz | Time-to-Value, Standardprozesse, geringe Reife, Vendor-Support | gutes Basismodell plus Unternehmenswissen über Grounding, Connectors, Plugins |
| Risiken | hohe Vorabkosten, lange Dauer, Wartung | Lock-in, begrenzte Erweiterbarkeit, Feature-Lücken | – (ausgewogen) |
| TCO | Infrastructure/Development/Data/Expertise/Operations **High** | Low (Operations Medium) | Medium, **Data Preparation High** |

Entscheidungsfluss: Anforderungen → strategische Bedeutung → Vendor-Lösungen → Extend-Machbarkeit → Custom-Machbarkeit → TCO (5 Domänen) → ROI → gewichtetes Scoring → bester Value-to-Cost.

**Model Router** (Azure AI Foundry): ein Endpunkt für mehrere Modelle, Routing nach Task-Typ, Fähigkeiten, Kosten, Latenz und Regeln; zentrale Governance (Versionierung, Monitoring, Analytics, Safety). Komplexität: Simple → SLM, Moderate → Fine-tuned, Complex → LLM. Regeltypen: Static („If task = classification → use SLM“), Weighted (A/B, Rollout), Fallback (Backup), Version-based. Implementierung: Strategie (Kosten/Performance/Accuracy/Hybrid) → Modelle registrieren → Regeln → Integration (Agenten, Copilot-Erweiterungen, Backends, Multi-Agent) → Monitoring (Latenz, Kosten, Accuracy, Verteilung); Routing-Workshop je Organisation.
## Designen: Agenten und KI-Funktionen

### Responsible AI als Rahmen

Sechs Tenets: **Fairness** (gerechte Ergebnisse), **Reliability & Safety** (validiert, überwacht, keine unsicheren Outputs), **Privacy & Security**, **Inclusiveness** (barrierefrei), **Transparency** (Logik, Datennutzung, Grenzen verständlich), **Accountability** (Menschen bleiben verantwortlich; Guardrails, Governance, Oversight). Anwendung über den Lebenszyklus: Design (Risiken, Nutzer, Safety-Szenarien), Development (Fairness-Tests, Security Reviews, Transparenz-Doku), Deployment (Human Oversight, Pre-Prod-Validierung, Monitoring), Operations (kontinuierliche Verbesserung, Retraining, Policy-Änderungen).

### Copilot in Dynamics 365 Customer Service und Sales

**Business Terms** sind das standardisierte Vokabular (Produkt-/Servicenamen, SLA-Stufen, Teams, Fallklassifikationen, Ergebnisbegriffe), in Customer Service in Dataverse-Feldern, Option Sets und Klassifikationsmetadaten gespeichert; Copilot liest sie direkt für Konversations- und Fallzusammenfassungen, Insights und Empfehlungen. Ohne saubere Terms: vage Summaries, falsche Kategorien, veraltete Begriffe, falsche nächste Schritte. Konfiguration: Copilot aktivieren (Customer Service admin center > Copilot; Lizenz, Rollen, Workspace, Daten), Felder für Summaries wählen und Legacy-Felder ausschließen, Konversations-Summaries anpassen (**Paragraph Format** für narrative Schnellübersicht vs. **Structured Format** mit Abschnitten wie Customer Issue, Actions Taken, Pending Items, Next Steps, Resolution Status – ideal für strenge Dokumentationsstandards und regulierte Branchen), Phrasing für nächste Schritte, Ausgabe auf Custom Case Forms, Dashboards und rollenspezifischen Formularen. Best Practices: konsistente Namen, keine unklaren Abkürzungen, CRM-Felder ausrichten, regelmäßig pflegen, Kundensprache, Ownership.

**Customization** in vier Bereichen: Business Terms & Domain Language, Prompt & Output (Ton, Struktur, Pflichtfelder, zu vermeidende Begriffe), Data Scope & Field Configuration (Felder, Entitäten, Wissensquellen, Timeline), Surface Integration (Case Forms, Konversationsfenster, Timelines, Knowledge Views, Dashboards). Datenumfang auf nötige Felder begrenzen, Outputs prüfen, Prompts aktualisieren, menschliche Validierung.

**Custom Connectors für Copilot in Dynamics 365 Sales** (Production-ready Preview): Connector in Power Apps/Power Automate in einer Umgebung **mit Dynamics 365** (Default-Umgebung nicht unterstützt), OpenAPI-Definition, **OAuth 2.0 mit Microsoft Entra ID**, zwei App-Registrierungen für den Token-Austausch, für automatisierte Anmeldung **Enable onbehalfoflogin = true**; Copilot Action in Copilot Studio erstellen, publishen, Admin schaltet frei; Actions brauchen bis zu **7 Tage** (Sign-out/Sign-in beschleunigt); Drittanbieter-Terms prüfen; Zertifizierung optional für organisationsweite Verfügbarkeit.

**Dynamics 365 Contact Center**: Kanäle Voice (Echtzeit-Zusammenfassung, Transkription, Intent, Aktionen), Live Chat (Antwortvorschläge, Wissensartikel, Eskalation), Digital Messaging (automatisierte Flows, Routing, Sentiment), Omnichannel Widget (eingebetteter Assistent). **Agent Context** (Identität, Fallhistorie, Kanal, Transkript, Queues, Skills; Felder CaseID, CustomerType, Channel, IssueCategory, SentimentScore) nur mit benötigten Attributen; Copilot-Features (Summaries, Suggested Actions, Knowledge Retrieval, Customer Insights, Drafting) je Umgebung und Rolle; Omnichannel-Bewusstsein, Workstreams (Voice, Messaging, Persistent Chat), Guardrails, Least Privilege.

### Agententypen in Copilot Studio

| Typ | Komponenten | Merkmal |
|---|---|---|
| **Task agent** | Goals (actionable, observable, testable), Skills (Language Understanding, Data Interpretation, Planning, Execution), Actions (Connectors, Custom Connectors, APIs, Dataverse, Cloud Flows – mit Inputs, Output-Schema, Auth, Fehlerregeln), Knowledge, Context, Safety & Rules | führt konkrete Aktionen aus („Create a case“, „Update a lead“); Regeln wie „Always ask before submitting an order“ |
| **Autonomous agent** | Goals, Triggers (Nutzereingabe, Systemänderung, Zeitplan), Instructions („If the customer is VIP, escalate“), Knowledge, Actions, Publishing (Teams) | arbeitet eigenständig; Best Practices: einfacher Use Case, saubere Anweisungen, wenige Wissensquellen, Tests, Monitoring |
| **Prompt-driven agent** | Generative Answers (NLU Boost) als Fallback und Wissensantwort, System Topics (Greeting, Escalation, Fallback, End, Disambiguation, Errors), Condition Nodes (Vergleiche, AND/OR, if/elseif/else, Power Fx), Event Triggers (Datei, Task, Dataverse-Zeile, Zeitplan; Payload mit Daten, Anweisungen, Kontext; explizit autorisieren, Billing-Wirkung) | kombiniert NLU, Topic-Logik und Ereignisse |

**Topics**: Trigger-Phrasen, Message-/Question-Knoten, Conditions, Actions. Typen: Instructional, Action, Informational, System, Reusable (Authentifizierung, FAQs). Design: Intents gruppieren, echte Nutzersprache, kurze Flows, Variablen, Wiederverwendung. **Fallback**: Missverständnis bestätigen, Alternativen anbieten, optional Übergabe an Menschen, Feedback erfassen; nicht überbeanspruchen – häufige Szenarien gehören in Topics.

**Standard NLU vs. Azure CLU vs. Generative Orchestration**: NLU für strukturierte Befehle und regulatorisch vorhersehbare Ergebnisse (deterministisch, „Reset password“); CLU für moderate bis hohe sprachliche Variabilität in klaren Topic-Grenzen, Entity-Extraktion (Gerätetyp, Modell, Ort), Retraining, mehrsprachig; generativ für unstrukturierte Sprache, Grounding, Reasoning, Zusammenfassung, Generierung, Multi-Turn (rechenintensiver). Regel: mit NLU/CLU starten, generativ nur bei Bedarf, Grounding immer, Guardrails (Instructions, Actions, Topic Trigger).

**Agent Flows**: Trigger (manuell, Zeitplan, Systemereignis, anderer Agent) und Actions; natürlichsprachlich oder im visuellen Designer; verbinden Forms, Dynamics 365, Dataverse, Mail, APIs. Vs. Cloud Flows: Copilot-Studio-Nachrichtenkapazität statt Power-Automate-Lizenz, KI-gestützte konversationelle Automatisierung vs. Enterprise-Integration. Modular: ein Flow je Hauptaufgabe; Agent und Flow gemeinsam testen. Agent-Fähigkeiten: Code Interpreter, Image Generator, Adaptive Cards.

**Prompt Actions** (Transform, Summarize, Extract, Generate, Classify) als wiederverwendbare Instruktionsblöcke mit **Prompt Coach**-Struktur: Goal, Context, Instructions/Rules, Examples (optional), Output Format; Constraints (Wortlimit, Pflichtfelder, Ausschlüsse: keine Spekulation); einsetzbar in Topics, Agent Flows, Fallback, Geschäftsprozessen; modular, getestet, dokumentiert.

### Foundry Tools, Generative Pages, Grounding-Pipelines

**Foundry Tools** nach Kategorie: Retrieval & Grounding (Vektor-/Hybridsuche, SharePoint-Ingestion) für Policies und Wissen; Data & Application Connectors (Dynamics, SAP, ServiceNow, REST/Graph) für Geschäftssysteme; Workflow & Action (Power Automate, Custom Actions) für Mehrschritt-Workflows; Compute (Azure Functions, ML-Modelle) für Transformation/Scoring; Reasoning (Planner, Regel-Evaluatoren, Context Evaluators) für Zerlegung und nächste Schritte. Ziel: minimale Komplexität, Sicherheit, bestehende Systeme, weniger Integrationsaufwand, geerdete Outputs.

**Generative Pages** erzeugen Model-driven-App-Seiten aus natürlicher Sprache (Layout, Bindings, Formulare aus Dataverse); **Code-first** erweitert mit JavaScript, PCF-Controls, Dataverse-Logik, Services und sicheren Pipelines (komplexe Regeln, UI, Integration, Performance, Compliance); der **Agent Feed** liefert in der App Summaries, Handlungsvorschläge, Anomalie-Hinweise, Insights und Trigger. Kombination für High-Volume-Workflows.

**Grounding-Pipeline**: Ingestion & Preparation (Korpus scopen, normalisieren, anreichern, Labels und Residency respektieren) → Chunking (Kontextfenster und semantische Grenzen; schlechtes Chunking kostet Qualität und Geld) und Embeddings (Hybrid aus Vektor + Keyword + Semantic Ranker) → Indexing (externalisieren statt Live-Abfragen; Feld-Capabilities nur bei Nutzung; ein Index als Default, Split bei Zielgruppen/Compliance; SLO-basierte Frische mit Side-by-Side-Rebuilds) → Retrieval & Orchestrierung (Top K gefiltert, Prompt mit Zitaten). Plattformen: Azure AI Search als Retrieval-Backbone (Azure WAF Grounding-Data-Design), Foundry RAG mit eigenen Daten, **AI Builder grounded prompts** über Dataverse (Power Apps, Power Automate, Copilot Studio). Betrieb: minimales Schema, Top-K-/Token-Budgets, Labels und Zugriffe bis in den Index, „Right to be forgotten“, Evaluation mit echten Queries.

**Canvas Apps mit KI**: Copilot in Power Apps Studio ändert Logik und Daten per natürlicher Sprache (Felder, Validierung, Screens, Beziehungen); Plans strukturieren den Prozess vor dem Bau. Methode: Workflow mappen → KI-Chancen (Wiederholung, Interpretation, Guidance, natürliche Sprache, Automatisierung) → Copilot-Interaktionen (Panel, Vorschlagsleiste, Text, Datensätze, Validierung) → Studio-Features → Security/Governance (Datenzugriff, erlaubte Aktionen, DLP, Compliance). Platzierung: Data Capture → AI-Felder; Entscheidung → Vorschläge; Dokumente → AI-Text; Navigation/Hilfe → Copilot-Assistent; Updates → Natural-Language-Edit; Workflow → AI-initiierte Aktionen.

**Power Platform Well-Architected**: Reliability (Retries, Failover, resilientes Dataverse), Security (Least Privilege via Entra ID, DLP, sichere Connectors), Operational Excellence (Admin-Center-Analytics, ALM mit Azure DevOps/GitHub, Alerts), Performance Efficiency (Dataverse für Volumen, Azure Functions, Concurrency), Experience Optimization (UX-Konsistenz, Copilot-Workflows, Barrierefreiheit). Azure WAF kennt stattdessen Cost Optimization (im Power-Platform-Mapping: Lizenzierung, Compute-Offloading).

**Success Criteria** (business-aligned, messbar, outcome-driven, zeitlich begrenzt, machbar): Business Value (−40 % Bearbeitungszeit), Operational Efficiency (−30 % manuelle Tasks), UX (+20 % schneller), Quality (≥ 85 % Accuracy), Risk & Compliance (100 % auditiert), Scalability (10k Requests/Tag). **Adoption Goals**: organisatorische, Daten- und technische Readiness, Nutzeradoption; CAF-AI-Plan: Business Outcomes, messbare Szenarien, Feasibility, Programm-Governance.

### Erweiterbarkeit: Foundry, Microsoft 365 Copilot, Copilot Studio, MCP, Computer Use

**Custom Models in Foundry** bei domänenspezifischer Sprache/Logik (Legal, Healthcare, Finance), hochwirksamen Entscheidungen, Souveränitätsmandaten, einzigartigen Workflows, Kostenoptimierung bei hohem Volumen. Foundry: Modellkatalog, Trainings-/Fine-Tuning-Pipelines, Agent-Integration, RAI-Controls (Content Filter, Safety-Evaluation, Transparenz, Audit), Deployment (gehostet, Private Networking, AKS). Vorgehen: Ziele → Daten (Lücken, Governance) → Pfad (**Fine-Tuning**, **domänenspezifische kleine Modelle**, **Hybrid** mit Prebuilt Copilots) → Integration (Dynamics 365, Functions/Logic Apps, Agent-Workflows, AI Search) → Validierung (Szenarien, Safety/Bias, Last/Latenz, ROI). Betrieb: Monitoring (Drift, Degradation, Friction, Latenz), Governance, Versionierung/Rollback, MLOps/GenAIOps.

**Microsoft 365 Copilot Agents** (Teams, Outlook, Loop, SharePoint, LOB-Apps): Design-Framework A Kernproblem (eine hochwertige Aufgabe: Lead-Vorbereitung, Case Triage, Policy Q&A, Cross-App-Summaries, Routing), B Verhalten (Rolle, erlaubte/verbotene Fähigkeiten, Guardrails, Eskalation), C Daten und Tools (Graph, SharePoint/OneDrive/Teams, Connectors, Custom APIs; Least Privilege, Zero Trust). Kollaborationsmuster: Sequential, Parallel evaluation, Feedback-loop iteration, Orchestrated interaction. **Agent Builder** als einfachster Weg zu deklarativen Agenten (Zweck, Anweisungen, Datenquellen, Actions, Test, Publishing). Betrieb: Qualität und Feedback, Anweisungen aktualisieren, Zugriffe, Logs, Versionierung.

**Copilot Studio Extensibility** auf vier Ebenen: Instruction-level (Zweck, Rolle, Constraints, Action-Muster, Eskalation; Prompt Modification), Skill/Capability (Retrieval-, Action-, Workflow-Skills, Domänenwissen; modular), Integration (Dynamics 365, Microsoft 365, Flows, APIs, Events; Governance, Standardisierung, Entity-Mapping), Pro-Code in Visual Studio Code (Code-Tools, Orchestrierung, Source Control). Muster: modulare Agenten, Multi-Agent-Kollaboration (Research-, Workflow-, Kommunikationsagent), Domain-Context. Microsofts **Architecting agent solutions**: Fit for purpose, Operability, Trust/Traceability/Transparency (ohne Überschneidung mit Azure WAF, Power Platform WAF, NIST).

**MCP in Copilot Studio** (Fokus Dynamics 365 Finance & Operations): strukturierter Vertrag für Kontextzugriff und -interpretation; exponiert Datenentitäten (Kunden, Lieferanten, Produkte), Prozessmetadaten (Workflows, Status, Genehmigungsketten), Domänenmodelle (Finanzdimensionen, Ledger), Lokalisierung/Taxonomien. Instruktionsebenen: Purpose, Role, Behavior Rules, Context Consumption Logic, Action Boundaries. Patterns: Context-driven reasoning (Compliance, Finance, Procurement), Workflow-integrated (Approvals, Eskalation, Status), Multi-agent via MCP (HR + Finance + Supply Chain). Governance: Least Privilege nach Identität, Kontextgrenzen, Logging, RAI-Anweisungen, AI-CoE-Ownership.

**Computer Use**: Agent bedient Apps und Websites (klicken, tippen, scrollen, Text lesen, Mehrschritt) über Vision und Reasoning (Anfrage → UI-Analyse → Plan → Aktionen → Validierung). Szenarien: kein API/Connector (Legacy, Vendor-Portale, Desktop), repetitive UI-Aufgaben, App-übergreifend, menschenähnliches Reasoning. Design: klare, zielorientierte Aufgabe; Kontext und Constraints (erlaubte Apps/Sites, Daten, verbotene Aktionen, Zeit-/Retry-Limits); Schritte; Variabilität (beschreibende Anweisungen „Click the blue 'Submit' button“, Validierung je Schritt, Fehlerbehandlung). Konfiguration: aktivieren, Berechtigungen/Apps, Aktionen, Reasoning-Modus, Test-Canvas. Governance: Least Privilege, keine sensiblen Eingaben ohne Not, Transparenz, Logging; UI-Änderungen brechen Automation → Monitoring, Fallback, nur ohne API.

**Agentenverhalten**: Instructions, Knowledge, Actions/Tools, Policies/Constraints; Prinzipien (Rolle, erlaubt/verboten, Eskalation, Formatregeln, Fehlerbehandlung); Instruktionsstruktur (Purpose, Scope, Tone, Data boundaries, Quality, Error handling, Escalation). **Standard Reasoning** (Konversation, Summaries, einfache Berechnung; schnell, hohes Volumen) vs. **Deep Reasoning** (Preview; Multi-Step, komplexe Regeln, Analysen, Szenarioplanung, Constraints). **Voice/IVR**: kurze Sätze, Bestätigungen, Unterbrechungen, Confidence Checks vor Aktionen.

**Microsoft 365 Teams/SharePoint-Agenten**: SharePoint-Agent kennt seine Site und nutzt sie als primäre Grounding-Quelle (Seiten, Bibliotheken, Listen, News, Policies), hilft Site-Ownern (Inhalte, Metadaten, Barrierefreiheit); Teams-Agent beantwortet Fragen in Chats/Kanälen, Gruppenkonversationen, Task-Automatisierung. Grounding über Graph respektiert Berechtigungen (kein Zugriff über den Nutzer hinaus; App-Registrierung und Consent). Patterns: SharePoint Knowledge Assistant, Teams Project Assistant, Policy Assistant, Site Owner Support. Governance: Versionskontrolle, Monitoring, periodische Content-Reviews, AI CoE.

### Orchestrierung vorgefertigter Agenten und Apps

**Dynamics 365 Customer Service / Contact Center**: drei KI-Kategorien – **Agent Hub** (Admins/Supervisoren führen autonome Agenten sicher ein, überwachen Wirkung), **autonome Service-Agenten** (Customer Intent Agent: entdeckt Intents aus Fällen/Gesprächen; Case Management Agent: Create/Update/Resolve/Close; Customer Knowledge Management Agent; Quality Evaluation Agent), **Copilot in Contact Center** (Fragen, E-Mail, Fall-/Konversations-Summary). Erlebnismodelle: Conversational Sidecar, Embedded (Case Forms, Timelines, Knowledge; proaktive Vorschläge), Automated (Routing, Sentiment, Eskalation). Orchestrierung: Case-centric, Interaction-centric, Multi-System (Field Service, Finance, Power Automate). Extensibility: Custom Prompts, Flows, Plugins, Azure OpenAI, Knowledge Retrieval; modularisieren.

**Microsoft 365 Agents vorschlagen**: Agent = Mission und Scope, Grounding und Tools, Guardrails (Identität, Autorisierung, DLP, Reviewability), Telemetrie – „Treat an agent like a product, not a prompt“. **Readiness Checklist**: Business Value (Owner, Nutzer, Outcome, Definition of Done), Identity & Access (Runs-as, Least Privilege), Data Scope (Corpus, Labels), Actions & Tools (Fehlerpfade, Freigaben), Security & Compliance (DLP, eDiscovery, Logging), Change Control (Versionen, Rings, Rollback, Sunset), Measurement, Support (Runbook, Ethik-Review); dazu **Agent Management Essentials** (Prerequisites, Blueprint, Checklist, Visual Guide, Admin Guide, FAQ) und Lizenzkosten. Fünf Schritte: Job to be done → Inputs/Wissen/Aktionen → Guardrails → Prototyp des Critical Path → Operationalisieren. Katalog pilotierbarer Agenten (Executive Briefing Pack, Portfolio Risk Insights, Localization Workpack, Compliance-Aware Redactor, Alignment Checker, Lab Designer, Research Brief, Telemetry Report) mit Entry Point, Inputs, Guardrails, KPIs. **RACI**: genau ein Accountable je Aufgabe; Product Owner accountable für Triage, Data Scoping, Guardrails, Telemetrie, Change Control; Architekt responsible für Triage, Tool-Setup, Telemetrie; Security responsible für Labels, Guardrails; Support/Ops accountable für Tool-/Connector-Setup. **Starter-KPIs** (Pilot): Adoption ≥ 30 %, Akzeptanz ≥ 70 %, Zeitersparnis ≥ 25 %, Verstöße ≤ 1/1.000 Runs, Kosten Baseline ± 10 %.

**Copilot for Sales / Service**: Verhalten (Kontext abrufen, zusammenfassen, generieren, Workflows über Power Platform). Sales-Voraussetzungen: CRM verbunden und synchronisiert, vollständige standardisierte Felder, Sensitivity Labels auf Dokumenten, Rollen-Sichtbarkeit; Konfiguration (aktivieren, Connectors, Feld-Mapping, Least Privilege, Content Sources für Mail-Summary, Opportunity Review, Proposal, Meeting Prep). Service: Case Engine, Knowledge-Repositories prüfen, Actions (Summary, Lookup, Guided Resolution), Power-Automate-Flows (Eskalation, Routing, Approvals), rollenbasierter Zugriff. AI Builder: Case-Klassifikation, Extraktion, Lead-/Sentiment-Prediction. Guardrails: Labels, DLP, Audit Trails, Residency, menschliche Prüfung vor externem Versand, eingeschränkte Aktionen für risikoreiche Daten, Versionierung/Rollback, Telemetrie. KPIs: Vorbereitungszeit, Lead-Qualifizierung, Handle Time, First-Contact Resolution, Adoption, Rework.

**Power Platform AI**: **AI Hub** (zentral: Modelle, Connectors, Copilots, geführte Pfade), **Copilot** in Power Apps (Screens, Tabellen, Logik), Power Automate (Flows aus Intent, Erklärungen), Power Pages (Seiten, Formulare), **AI Builder** (Prebuilt: Dokumentverarbeitung, Objekterkennung, Klassifikation, Sentiment, Rechnungen/Belege, Visitenkarten; Custom: Prediction, Klassifikation, Entity Extraction; Lifecycle: Daten/Labels, Training, Deployment, Drift, Retraining), **Copilot Studio**. Matrix: Textgenerierung → Copilot/AI Hub/Copilot Studio; Prediction und Dokumentextraktion → AI Builder/AI Hub; Conversational Agent → Copilot Studio; Automation-Erstellung → Copilot/AI Hub. Architektenaufgaben: Umgebungsstrategie, Labels/DLP, Rollen, Connector-Validierung, Datenstrategie, Integration, Monitoring.

**Dynamics 365 Finance & Operations**: Erlebnismodelle **Sidecar** (Generative Help, Workflow-Summaries, Chat mit Daten; Prompts mit Domänenvokabular, RBAC, Entity-Metadaten), **Embedded** (PO-Änderungsanalyse, Collections-Summaries, Demand Planning, Supplier Communication; autoritative Entitäten, Business Rules), **Outside** (externe Agenten über Dataverse/APIs; Residency, Approval-Constraints). Erweiterung: Custom Scripts/Extensions, Prompt-definiertes Verhalten, Custom Data Sources, Business Event Trigger (Power Automate, Azure Functions), Custom Actions, **Application Context**, **Client Plugins** (Client-Code über den Copilot-Chatbot mit X++-Methode; respektieren Sicherheitsrollen). **Interoperabilität** der Agent-Chats: F&O-Daten („Kreditlimit?“), SharePoint („Compliance-Zertifikat?“), Plugin-Aktion („Zahlungsbedingungen aktualisieren“); Plugins überbrücken Systemlücken, kombinierte Antworten, Validierung externer Daten, Logging. **In-App-Hilfe**: unterstützt PDF/RTF/Word, Knowledge Articles, Task Guides, Policies; nicht Dataverse Virtual Entities, produktfremde oder sensible unklassifizierte Inhalte; Prozess Vorbereiten → Ingest via Copilot Studio (Agents > Knowledge > Add knowledge > Ready) → Testen → Publish → Governance (Versionen, Labels/DLP, Quartals-Review, Test je Release Wave); General Knowledge nur bei Nutzen und bewerteten Risiken, einschränken bei regulatorischer/finanzieller Präzision.
## Bereitstellen: Monitoring, Tuning und Testen

### Monitoring-Framework

Fünf Ebenen: **Operational Health** (Uptime, Fehler, Throttling, Verzögerungen), **Performance** (Antwortzeiten, Erfolgsraten, Tool-Zuverlässigkeit, Workflow-Abschluss), **Quality & Output Accuracy** (Business-Regeln, Abweichungen), **Usage Insights** (Volumen, Adoption, Feature-Nutzung), **Risk/Compliance/Security** (Guardrail-Verstöße, sensible Daten, Anomalien). Prozesse: **Monitoring Operating Model** (Rollen, Incident-Workflows, standardisierte Metriken mit Baseline, Log-Review-Kadenz, Change Management, dokumentierte Erwartungen), Guardrails und Schwellen-Alerts (Latenz, Exceptions, ungewöhnliche Prompts), regelmäßige Qualitätsevaluationen (Human-in-the-loop, Szenarien, Low-Confidence-Outputs), kontinuierliche Verbesserung.

| Tool | Stärke |
|---|---|
| **Azure Monitor** (+ Log Analytics, KQL) | Telemetrie, Dashboards, Alerts, Fehler/Latenz/Connector-Diagnose |
| **Microsoft 365 Admin Analytics** | Nutzung, Adoption, Abteilungen mit geringer Nutzung, Wochentrends |
| **Copilot & Agent Dashboards** | Aufruffrequenz, Task-Trends, häufige Queries, Guardrail-Events |
| **Power Platform Admin Center** | Umgebungsgesundheit, Connector-Limits, Flow-Telemetrie, DLP-Wirkung |
| **Foundry-/Observability-Plattformen** | Single Pane of Glass über Systeme, Traces, Modellausführung |
| **Eigene Dashboards (Power BI)** | KPIs, Heatmaps, Drift, Compliance-Trends |

Best Practices: Logs zentralisieren, Namenskonventionen, SLAs für Antwortzeit, Alerts automatisieren, Monitoring in monatliche Reviews.

### Backlog, Feedback, Transkripte, Tuning

Backlog-Kategorien: Accuracy & Reasoning, Knowledge, Performance, UX, Integration, Governance & Compliance; Priorisierung per Impact-Effort-Matrix; Feedback-Signale (Häufigkeit, Schwere, Sentiment, verfehlte Erwartungen). **Transkripte** zeigen Missverständnisse, Abbrüche, falsche Reasoning-Schritte, fehlendes Wissen, nötige Eingriffe → Failure Paths, Root Causes, Guardrail-Anpassungen. Pipeline: konsolidieren → an Strategie ausrichten → messbare Outcomes → Releases → validieren → Drift/Regression.

Root-Cause-Kategorien: Model/Prompt, Knowledge Gaps, Integration, Configuration (Env-Variablen, Toggles, Rollen), Governance (DLP, Labels). Transcript Review: Nutzerziel → Interpretation → Output vs. Erwartung → Friction → Verbesserung. Scorecard: Success Rate, Latency, Error Volume, Knowledge Accuracy, Guardrail Compliance, User Satisfaction.

| Issue | Ursache | Tuning |
|---|---|---|
| falsche Antworten | Wissenslücke | Inhalte ergänzen/aktualisieren (**Knowledge Tuning**) |
| langsam | Workflow-Komplexität | Schritte optimieren, Connectors, Payloads (**Performance Tuning**) |
| blockierte Aktionen | Governance | Rollen/Labels anpassen, Logging intakt halten (**Governance-aligned Tuning**) |
| unerwartetes Verhalten | Modelllogik | Anweisungen schärfen, Fallbacks (**Behavioral Tuning**) |
| häufige Restarts | Integration | API-/Connector-Einstellungen |

### Metriken und Telemetrie

Baseline-Metriken: **Operational** (Latenz, Throughput, Fehlerrate, Ressourcen/Token), **Quality & Reasoning** (Response Accuracy, Knowledge Coverage, Action Effectiveness), **User-Centered** (Satisfaction, Abandonment, **Task Completion Rate** als bester Indikator für Nutzererfolg). Modellverhalten driftet auch bei stabiler Logik: **Model Drift** (Antwortmuster, sinkende Genauigkeit, mehr Halluzination), Token-Verbrauch (Kosten/Performance, dicke vs. dünne Prompts), Reliability (Latenzsprünge, Modellwahl, externe Abhängigkeiten). Tuning: Prompts, Wissen, Aktionssequenzen, Umgebung/Connectors, Versionierung/Rollback.

Telemetrie-Kategorien: Operational, Model-level (Token, Konsistenz, Drift), Behavioral (Zufriedenheit, Abschluss, Prompt-Muster), Governance (Guardrails, blockierte Aktionen, Label-Konflikte). Muster statt Einzelereignisse. Signal Map: Latenz → Workflow/Cache; Token → Prompt-Muster; Fehlerspitze → Abhängigkeiten; Qualitätsabfall → Wissen; Guardrail-Trigger → Governance. Diagnose: Baseline → Anomalien → Korrelation → Root Cause (Modell, Integration, Prompt) → Tuning → Validierung (vorher/nachher). KPIs: Responsiveness, Accuracy & Relevance, Reliability, Cost-Effectiveness, User Outcome Completion.

### Testen von Agenten, Modellen, Prompts und Prozessen

KI-Systeme liefern probabilistische Outputs aus dynamischen Daten – klassisches deterministisches Testen reicht nicht. **Testing Framework**: Ziel (Outcome, Konsistenz, Guardrails, Baseline), Testplan (Scope, Daten, Rollen, messbare Erfolgskriterien), Testarten **Scenario-based** (reale Workflows, mehrdeutige/unvollständige Eingaben, Multi-Turn), **Performance/Reliability** (Volumen, lange Interaktionen, Concurrency), **Safety/Compliance** (sensible Daten, RBAC, DLP, Ablehnung verbotener Anweisungen), **Usability**. Metriken: Accuracy/Relevance, Response Time, Success/Failure Rate, Token Efficiency, Satisfaction, Conversation Quality, Knowledge Coverage, Stability, Load, Guardrail Compliance. Lifecycle: Planning → Scenario Design → Execution → Measurement → Analysis → Tuning → Re-Test → Approval → Deployment; Testing Blueprint, zentrales Ergebnis-Log, Automatisierung, Governance-Checkpoints.

**Validation Criteria für Custom Models**: quantitativ (Accuracy, Latenz, Throughput, Fehlerrate, Token Efficiency, Drift), qualitativ (Relevance & Completeness, Consistency of Reasoning, **Grounding Integrity**, UX), Safety (RBAC, DLP, verbotene Inhalte, Audit; Human-in-the-loop, Guardrail-Tests, nur autorisierte Quellen), operativ (Scalability, **Resilience**, Integration Reliability, Monitoring Support). Beispielschwellen: Latenz < 2 s, Throughput p95 stabil, Accuracy ≥ 90 %, Incorrect Information ≤ 3 %, Guardrail Violations 0, Sensitive Output Detection 100 %, Token auf Baseline, Satisfaction ≥ 4,5/5.

**Prompt Validation**: Komponenten Goal, Context, Instructions, Examples; Lifecycle Define Goal → Add Context → Apply Structure → Run → Evaluate → Refine → Approve → Document; Schritte (Outcome, Klarheit „Would two different users interpret this the same way?“, Grounding, Constraints, Safety, Multi-Szenario); Metriken (Accuracy, Consistency, Relevance, Format Compliance, Tone Alignment; weniger Re-Prompts). Muster: Goal + Context + Constraints, Aktionsverben, strukturierte Anweisungen, „what not to include“, knappe Beispiele. Methoden: **A/B Prompt Testing**, Szenario-Tests über Nutzertypen, Checkliste; Refinement (modularisieren, Constraints ergänzen, Rauschen entfernen, Copilot nach Verbesserungen fragen, Cross-functional Review).

**E2E-Tests über mehrere Dynamics-365-Apps** (Order-to-Cash: Sales → Finance → Customer Service; Case-to-Resolution: Customer Service → Field Service): gesamter Prozess statt Module; Integrationspunkte (Entity-Sync, Multi-App-Predictions, Automationen, Connectors, Sicherheitsrollen); Readiness (Mappings, Refresh-Latenz, Abhängigkeiten, Grounding-Quellen); Szenariostruktur (Preconditions, Schritte, AI-Aktion, Datenbewegung, Post-Condition, Ausnahme-/Negativtests); Validierung funktional, nicht-funktional (Latenz, Recovery, Konsistenz), Outcome (Relevanz, Scoring, Summaries, Zeitgewinn). Best Practices: realistische Prozesse, Formulierungsvarianten, strukturierte und unstrukturierte Daten, Normal- und Stresslast, Ausnahmen und Regulierung, wiederholbare Templates.

**Test Cases mit Copilot**: Strategie um Copilot herum (Prompts, Kriterien, Governance); Ziele (Testkategorien, Regeln, Risiken, Compliance); **Test Case Blueprint** (Test ID, Purpose, Preconditions, Inputs, Steps, Expected Results, Edge Case Variations, Dependencies) im Prompt; Prompt-Muster (Goal, Context, Constraints, Quality Expectations wie „zwei Negativtests je Szenario“); Review (Completeness, Accuracy, Clarity, Maintainability); Skalierung (Prompt-Bibliothek, Versionskontrolle, CI/CD, Regression-Trigger); Reifeleiter Ad-hoc → Templates → Pipelines in CI/CD → risikobasiert kontinuierlich → Enterprise-Governance.

## Bereitstellen: ALM

### ALM für KI-Daten

Als versionierte Artefakte behandeln: Trainings-/Fine-Tuning-Datasets, Evaluations-/**Golden Sets**, Grounding-Wissen, Prompt-Assets, Policies/Guardrails, Run-Telemetrie und Feedback. Umgebungsstrategie Dev → Test → Pre-Prod → Prod mit eigenen Datenebenen, Least Privilege, **Red-Gold-Pattern** (Red veränderlich/experimentell, Gold eingefroren/promoviert; Prod nur Gold), Promotion Gates mit Evidenz.

| Phase | Kern | Gate |
|---|---|---|
| A Plan & Catalog | Data Contracts, Sensitivity Labels, Katalog, KPIs, Risiko | A→B: Contract freigegeben, Asset auffindbar mit Owner |
| B Ingest & Prepare | Profiling, Lineage, Schema-Versionen, Hashes, kuratierte Sets, Embeddings | B→C: Qualitäts-/Lineage-Report, Reproduzierbarkeit |
| C Develop & Evaluate | Dev/Test-Daten, **nie auf Produktionswissen trainieren**, Suites auf Golden Sets, Model/Data Cards | C→D: Schwellen erfüllt, Safety-Findings behoben |
| D Stage & Approve | Privacy/Security/Compliance-Reviews, **Canary Runs** mit maskierten Daten, Gold einfrieren, Immutability-Attestierung | D→E: CAB-Freigabe, Runbooks, Rollback |
| E Deploy & Serve | Gold-Korpora/Indizes promoten, Residency und Connector-Listen, Katalog-Release | E→F: Dashboards, Alarme, Rollback, Budget Guard |
| F Operate & Monitor | Latenz, Kosten/Token, Erfolg, Safety, Zugriffsverweigerungen; Drift → Incident, Data Owner, Aktionen pausieren; Re-Evaluation | – |
| G Evolve & Retire | Retraining auf neuen Gold-Sets, Retest, Retention/Löschung, Audit-Erhalt | – |

**Residency**: dokumentieren, wo Prompts/Outputs verarbeitet werden; in regulierten Szenarien In-Region als Default, Overflow nur mit expliziter Freigabe (Entscheidungsbaum: Kapazität? → Overflow erlaubt für Workload-Stufe? → sonst blockieren/verschieben); Mailbox-Region und Umgebungs-Geo abstimmen. RACI: Data Owner accountable für Contract, Klassifikation, Retention; AI Architect accountable für Evaluation, Deployment, Monitoring; Security/Platform responsible für Residency; Go/No-Go- und Retirement-Checklisten.

### ALM je Plattform

| Plattform | Umgebungen | Besonderheiten |
|---|---|---|
| **Copilot Studio** (Agenten, Connectors, Actions) | mind. Dev (unmanaged) → Test (managed) → Prod (managed) | keine Direktbearbeitung in Prod, Solution Layering, Wissensquellen nur in Dev, Regressionstests aller Topics; Connector-Flow Author → Validate Auth → Apply DLP → Approve Security → Publish; Action-Lifecycle Design → Build → Validate → Promote → Monitor; Export in Source Control, Release-Kadenz, Patch-Prozess, Rollback; Governance-Checkliste (DLP, Security, Wissen, Residency, Risk, Monitoring) |
| **Foundry Agents** | Dev → Test → Prod über den **Control Plane** | Komponenten (Logik, Prompts, Action Handler, Grounding, Permissions, Connectors, Policies) als versionierte, unveränderliche Bundles; Gate 1 (funktional, Safety, Mappings, Connector-Review, Prompt-Qualität), Gate 2 (Regression, Compliance, Performance/Kosten, menschliche Validierung des Reasonings, Dokumentation); Residency, RBAC, Secrets getrennt, Pipelines, Rollback, Release-Kalender |
| **Custom Models** | Dev → (Gate 1: Evaluation & Safety) → Test → (Gate 2: Performance, Governance, Kosten) → Prod | Lifecycle Plan → Data (Contracts, Golden Sets) → Development (Fine-Tuning, BYOM, Metadaten) → Evaluation (**Model Card**) → Deployment (Registry, Version-Lock, Audit) → Monitor (Drift, Retraining) → Retirement (archivieren, Übergangsplan) |
| **D365 Finance & Supply Chain** | DEV → TEST (anonymisiert) → PROD | **Environment Variables** für Endpunkte/Modelle/Connection Strings, synthetische Testdaten, Data Contract (Entitäten, Regeln, Labels, Schema-Versionen), Prompts mit ERP-Terminologie, Hyperparameter dokumentieren; Guardrails für Journale/PO-Freigaben, DLP, Residency |
| **D365 Customer Experience & Service** | DEV → TEST → PRE-PROD/UAT → PROD | Assets: Prompts, Wissen/Index, Modellkonfigurationen, Flows/Plugins, Data Contracts, Routing/Context Rules, Conversation Boosters, Env-Variablen; semantische Versionierung, Pipelines (Azure DevOps, GitHub Actions), **CAB** für risikoreiche Releases, Audit (Prompt-Versionen, Decision Logs), Residency, Release-Readiness-Checkliste |

## Bereitstellen: Sicherheit, Governance und Compliance

### Sicherheit für Agenten (Defense in Depth)

**Identität**: eigene Cloud-Identität je Agent und Umgebung mit Ownership/Version; **Managed Identities** statt Secrets; Least Privilege auf engster Scope-Ebene; im Namen des Nutzers dessen Rechte propagieren, als Agent selbst eine Service-Rolle; Separation of Duties (Maker, Publisher, Environment Admin, Security Admin) mit Freigaben für Prod und risikoreiche Fähigkeiten. **Daten**: interne vs. öffentliche Workloads trennen, Residency für Wissen/Logs/Memory, DLP für Connectors/Aktionen/Bewegung, Sensitivity Labels (höchstes Label anzeigen), Retention und Minimierung, Transparenz und Löschmechanismen. **Observability & Kosten**: zentrale Telemetrie (Prompts, Tool-Calls, Fehler, Safety), Business-Metriken, Agent-Inventar, Tagging, Spend-Alerts. **Threat Protection**: KI-bewusste Erkennung (Prompt-Manipulation, Leakage), Input-/Output-Filter, **Red Teaming** vor Prod und nach Änderungen (Release-Gate), Incident Response (deaktivieren, Logs sichern, informieren, Drills). **Standards**: Agent-Framework mit Governance-Hooks, **MCP** für Tool-/Datenzugriff, **A2A** für Delegation, Environment Routing, Change Control mit automatisierten Prüfungen.

### Governance-Modell

Accountability (Agent Owner, **Agent Registry** mit Zweck, Umgebung, Risiko, Datenzugriff, Publishing-Freigaben für sensible Daten), Identität (Managed Identities, Least Privilege, Rollen für Maker/Approver/Admins/Security), Daten (Klassifikation, DLP, Residency, Labels), Observability (Prompts, Aktionen, Fehler, Eskalationen; Dashboards; Alerts für Token-Spitzen und ungewöhnliche Zugriffe), Kosten (Tagging, Schwellen), Sicherheit (Runtime Protection, Pre-Publish-Checks, Filter, SOC-Integration; externe Integrationen nur über freigegebene Connectors/Endpunkte mit validierter Auth und Vertragskonformität), Entwicklung/Lifecycle (Templates, Versionskontrolle für Prompts/Wissen/Workflows, Pflichtprüfungen vor Publish, geplante Reviews, Archivierungs-/Retirement-Kriterien, kontrollierte Pipelines).

### Modellsicherheit und Schwachstellen

**Model Hardening Blueprint**: 1 Secure Compute, 2 Private Endpoints, 3 Threat Protection, 4 Validation Pipeline, 5 Monitoring and Drift Detection. Dazu Managed Identities und RBAC (Rechte nach Funktion, resource-scoped), getrennte Dev/Test/Prod-Endpunkte, mehrstufige Freigaben, Datenminimierung/Redaktion, Verschlüsselung und Residency, DLP auf Antworten, Lineage und Validierung neuer Daten (**Poisoning**), Logging zum SOC, Incident Response (Endpunkt deaktivieren, Logs/Artefakte bewahren, Rollback), Policy-driven Lifecycle.

Schwachstellenkategorien: **Prompt Manipulation** (Anweisungen überschreiben, täuschender Kontext, Koerzion, versteckte Anweisungen in Text/HTML/Dateien → Datenabfluss, unbeabsichtigte Aktionen, manipulierte Automationen), **Model Behavior** (Fabrikation, Toxizität, schwache Grenzen, Bias, Überverallgemeinerung → Safety, Correctness, Consistency, Drift evaluieren), **Data Exposure** (Logs/Memory/Transkripte, überzogene Rechte, bösartige Dateien → Minimierung, RBAC, intent-basierter Zugriff), **Identity/RBAC Gaps** (Privilegien über Connectors/Plugins → Least Privilege, Managed Identities, Segmentierung, Log-Review), **Agent/Workflow** (autonome Tools ohne Guardrails, Fehlinterpretation, fehlendes Audit/Rollback, ungesicherte externe Endpunkte). Mitigation: AI-Activity-Monitoring, regelmäßige Evaluation (Prompt-Resilienz, Modellversionen), strikte Identität/RBAC, Input-/Output-Filter (Code blockieren, HTML/Prompts entfernen, Safety-Filter, Dateitypen), **Layered Defense**.

### Responsible-AI-Review, Residency, Zugriff, Audit

**RAI-Review** (interdisziplinär, wiederholbar): Zweck/Intended Use, Daten/Privacy/Security (Klassifikation, Minimierung, Retention, PII, Least Privilege), Modell-/Agentenverhalten (Fabrikation, Prompt-Adhärenz, Edge Cases, Fallback), Fairness/Bias (Disparate Impact, Repräsentativität, Tests), Transparenz/UX (KI-Offenlegung, Grenzen, Doku, Eskalation, Feedback-Logging), RAI-Tools (Validierung deklarativer Agenten, Bias-/Safety-Tools, Lineage/Provenance), operative Oversight (Incident Plan, Drift, Governance Board, Sunset-Kriterien).

**Data Residency**: Speicher- und Verarbeitungsort je Dienst (Prompts, Kontext, Logs, Telemetrie); Copilot Studio nach Umgebungskonfiguration – prüfen, wo Prompts verarbeitet werden, ob unveröffentlichte/Preview-Features anders behandelt werden, wie Connector-/Plugin-Daten gespeichert werden, ob Cross-Region-Interaktionen bei Inferenz/Orchestrierung auftreten; Datenbewegung für generative Features notwendig vs. optional, Umgebungseinstellungen, Blockieren für sensible Workloads; **Purview** (Labels gegen Cross-Tenant/Cross-Region, DLP gegen sensible Daten in Prompts/Outputs, Auditing, Policy Insights, Interaktionslogs); Architektur: Tenant-Regionen, Umgebungen, Connectors ohne Umgehung, dokumentierte Datenflüsse, Backup/Logging konform.

**Zugriff auf Grounding-Daten und Tuning**: Least Privilege by default, rollenbezogene Partitionen, Ownership, Auditierbarkeit; **Retrieval Access Flow** Prompt → Policy Check → Search Index → Sanitization Layer → Model Context Injection (Connector-Autorisierung, Query-Filter, DLP/Labels, Regionsregeln); Tuning: getrennte Umgebungen, Freigabe neuer Trainingsdaten, Lineage, Security-Scanning, eingeschränkte Promotion; Guardrails (Blocklists, Sanitization-Pipelines, automatische Reviews, Anomalie-Alerts); Monitoring (Logs, RBAC-Reviews, Dashboards).

**Audit Trails**: kontinuierlich, unveränderlich, in die Control Plane integriert. Modellereignisse (Registrierung, Tuning, Promotion, Rollback, Deployment/Endpunkt/Skalierung, Zugriffsversuche inkl. unautorisiert); Datenereignisse (Ingestion, Schema, Refresh, Label-Änderungen, Sanitization, Cross-Region, Zugriffe/Freigaben); Logs mit **Metadaten statt Inhalt**, Zeitstempel, Rollenattribution, JSON, Separation of Duties. **Foundry Control Plane**: Activity Logs (Export Azure Monitor, Log Analytics, Sentinel), Diagnostics/Tracing (Modellaufrufe, Pipelines, Tools, Fehler); Tracing-Felder Correlation ID, Modellversion, Input-Metadaten, Prompt-Kategorie, Latenz, Tool-Nutzung, Safety-Ergebnis. Prozesse: Freigabe-Workflows, Pflicht-Logging für Tuning, periodische Reviews, automatische Evidenz, Immutable Storage; Retention 90 Tage (low risk), 12-24 Monate (reguliert), unbegrenzt für Incidents.

## Entscheidungshilfen für die Prüfung

### Welche Plattform, welcher Agent?

| Anforderung | Wahl | Begründung |
|---|---|---|
| Produktivität in Word/Teams/Outlook, Daten in Microsoft 365, einfache Logik | **Microsoft 365 Copilot erweitern** / Prebuilt Agent / Agent Builder | eingebaute Guardrails, geringe Autonomie reicht |
| Geschäftsprozess, Connectors, schnelle Iteration, Business-Team | **Copilot Studio** (Task-/autonomer Agent, Agent Flows) | Prozesstransformation, SaaS-Sicherheit |
| komplexe Orchestrierung, Custom Tools, Multi-Agent, Modellkatalog | **Microsoft Foundry** | Pro-Code, Connected Agents, Evaluationspipelines |
| private isolierte Compute, BYO-Modell, strenge Compliance | **GPUs & Container** | volle Kontrolle über den Stack |
| Katalogmodell versagt trotz Prompting, Retrieval, Fine-Tuning; hohe Fehlerkosten | **Custom Model** (Foundry) | Domänenspezifik, Governance, Volumen |
| niedrige Latenz, Edge, Kostendruck, Domänenpräzision | **Customized SLM** | aber kein Ersatz für RAG, kein Safety-Allheilmittel |
| mehrere Modelle, Kosten/Latenz optimieren, Fallback, A/B | **Model Router** | ein Endpunkt, Regeln, Governance |
| Domänengrenze, eigene Teams, Compliance-Trennung | **Multi-Agent** (Sequential/Concurrent/Group chat/Handoff/Magentic) | sonst Single-Agent mit Persona Switching |
| Prozess über Sales, Service, Finance | **Planner → Worker → Reviewer**, intent-driven, Dataverse-Events | Kontinuität, keine Point-to-Point-Integration |
| kein API, UI-Automatisierung | **Computer Use** | nur ohne API, mit Monitoring und Fallback |
| F&O-Kontext mit konsistenter Semantik | **MCP** | Entitäten, Prozessmetadaten, Domänenmodelle |
| Fragen aus Policies/Dokumenten | Generative Answers mit SharePoint/Uploads; große Mengen, Präzision → **Azure AI Search** | Semantic Ranking, Vektor |
| Dataverse-Daten in Low-Code-Prompts | **AI Builder grounded prompts** | wiederverwendbar in Apps, Flows, Copilot Studio |
| Prediction/Dokumentextraktion | **AI Builder** | Prebuilt oder Custom Model |
| Konversationsagent | **Copilot Studio** | NLU/CLU/generativ je Variabilität |

### Welcher Prozess, welche Kontrolle?

| Situation | Maßnahme |
|---|---|
| KI-Programm ohne Roadmap/KPIs | AI-Transformation-Framework: Goals → Strategie → Architektur → Implementierung → Monitoring; CAF + Agent-Lebenszyklus |
| Agent Sprawl, unklare Ownership | Agent Registry, Agent Owner, Publishing-Freigaben, CoE |
| CoE als Bottleneck | Centralized → Hybrid → Advisory |
| ROI-Zweifel | Savings Calculator (per run/per tool, nur gelöste Runs), TCO getrennt, Sensitivity Bands, Pilot → Scale |
| Build/Buy/Extend | Differenzierung → Build; Standard + Time-to-Value → Buy; gutes Basismodell + Unternehmenswissen → Extend |
| Copilot-Summaries vage | Business Terms in Dataverse pflegen, Felder mappen, Legacy ausschließen, Structured Format |
| externe Daten in Sales-Copilot | Custom Connector (D365-Umgebung, OAuth/Entra, zwei App-Registrierungen, OBO), Action in Copilot Studio, Admin, bis 7 Tage |
| sinkende Genauigkeit ohne Änderung | Model Drift: Baseline, Incident, Data Owner, Aktionen pausieren, Golden-Set-Re-Evaluation |
| Abbrüche unerklärt | Transkripte: Intent, Abbruchstelle, Reasoning, Wissen |
| Tests für probabilistische Outputs | Scenario/Performance/Safety/Usability, Blueprint, Golden Sets, A/B-Prompts, E2E über Apps |
| Deployment ohne Disziplin | Dev/Test/(Pre-Prod)/Prod, Managed Solutions, Env-Variablen, Promotion Gates, Model Card, CAB, Rollback |
| Secrets im Agenten | Managed Identity je Agent/Umgebung, Least Privilege, OBO vs. Service-Rolle |
| Prompt Injection | Input-/Output-Filter, Dateitypen, Monitoring, Red Teaming, Layered Defense |
| Residency-Konflikt | In-Region Default, Overflow nur mit Freigabe, Purview-Labels/DLP, Datenflüsse dokumentieren |
| Audit-Anforderung | Metadaten statt Inhalt, immutable, Correlation ID, Modellversion; 90 Tage / 12-24 Monate / unbegrenzt |

### Häufige Stolperfallen

- Mit dem Modell statt mit dem Business Outcome beginnen; Prebuilt-Agenten überspringen (SaaS agent first).
- Multi-Agent „für die Zukunft“ ohne strukturellen Treiber; Prompt-zu-Prompt-Ketten statt Orchestrierungsmuster; Rohinhalte statt IDs übergeben.
- Grounding-Dimensionen verwechseln: Relevance (ähnlich, aber falsch) vs. Accuracy; Availability = Berechtigungen (Retrieval API gibt nichts außerhalb des Zugriffs zurück).
- Limits: 25 Wissensquellen (generativ), 500 Knowledge Objects, 5 unstrukturierte Quellen; Knotenquellen vor Agentenquellen bei Azure OpenAI on your data.
- Custom Model ohne gelabelte Daten und MLOps; SLM als Sicherheitsgarantie; Chain-of-thought überall.
- TCO und ROI vermischen; abgebrochene Runs als Ersparnis zählen; Extend ohne Data-Preparation-Budget.
- CoE als Gatekeeper oder gar nicht; Standalone-CoE trotz CCoE.
- Copilot Studio vs. Foundry: Governance plattformerzwungen vs. architektengeführt; Foundry braucht Evaluationspipelines und VNet.
- Dynamics 365 Sales Connector in der Default-Umgebung; Zertifizierung als Pflicht missverstehen; 7-Tage-Latenz ignorieren.
- Fallback-Topic als Intent-Ersatz; generative Orchestrierung ohne Grounding und Guardrails; NLU/CLU bei strukturierten Aufgaben übersehen.
- Agent Flows mit Power-Automate-Lizenz verwechseln; ein Riesenflow statt modularer Flows.
- Power Platform WAF hat Experience Optimization statt Cost Optimization.
- Computer Use als Standardintegration; MCP als Speicher oder UI-Kanal missverstehen.
- In-App-Hilfe mit Dataverse Virtual Entities aus F&O; General Knowledge in regulierten Workflows.
- Pilot-KPIs: ≥ 70 % Akzeptanz, ≤ 1 Verstoß je 1.000 Runs; genau ein Accountable je RACI-Aufgabe.
- Task Completion Rate ist der beste Nutzererfolgs-Indikator; Transkripte zeigen, was Telemetrie nicht zeigt.
- Nie auf Produktionswissen trainieren; Gold-Sets einfrieren; Managed Solutions nur in Test/Prod; Env-Variablen statt Hardcoding.
- Logs mit Inhalt statt Metadaten; Secrets statt Managed Identities; Overflow ohne Freigabe; Red Teaming ohne Release-Gate.
