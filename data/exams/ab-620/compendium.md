# AB-620 Nachschlagewerk — AI Agent Builder Associate

Dieses Nachschlagewerk fasst die Lerninhalte zur AB-620 zu einem zusammenhängenden Text zusammen: die drei Lernpfade des Kurses AB-620T00 (Topics und Antworten, Multi-Agent-Lösungen, Integration mit Unternehmenssystemen) sowie die ergänzenden Module zu Agent Flows, Computer Use, Evaluation, Veröffentlichung und Verwaltung. Der rote Faden folgt der Architektur eines Agenten: erst das Grundgerüst (Orchestrierung, Topics, Tools, Wissen, Agenten), dann die Konversationsschicht (Topics, generative Antworten, Prompts, Adaptive Cards), dann die Integrationsschicht (Connectors, REST, MCP, Agent Flows, Computer Use), das Wissen (Copilot Connectors, Real-time Connectors, Azure AI Search), die Multi-Agent-Architektur (Child Agents, Connected Agents, Foundry, Fabric, A2A) und zuletzt Betrieb und Lebenszyklus (Evaluation, Monitoring, Publishing, ALM, Sicherheit, Kosten). Am Ende stehen Entscheidungstabellen für die typischen „Welches Muster passt?“-Fragen.

Produktbegriffe bleiben englisch, Erklärungen sind deutsch. Alles stammt aus den Microsoft-Learn-Inhalten; wo etwas Preview ist, steht es dabei – das fragt die Prüfung gern.

## Die Architektur: Wie ein Copilot-Studio-Agent aufgebaut ist

Ein Agent in Microsoft Copilot Studio besteht aus wenigen Bausteinen, die immer wieder auftauchen. Wer ihre Rollen sauber trennt, kann fast jede Prüfungsfrage einordnen.

```
        Nutzer (Teams, Microsoft Copilot, Web, Custom Website, Konversation oder autonom)
                                  │
   ┌──────────────────────────────┴───────────────────────────────┐
   │  Orchestrierung (generative orchestration)                    │
   │  liest Namen + BESCHREIBUNGEN und wählt zur Laufzeit:         │
   │  Topic · Tool · Wissensquelle · Child/Connected Agent         │
   └──────┬───────────────┬───────────────┬───────────────┬───────┘
          │               │               │               │
   ┌──────┴─────┐  ┌──────┴──────┐  ┌─────┴──────┐  ┌─────┴──────────┐
   │ Topics     │  │ Tools       │  │ Knowledge  │  │ Agents         │
   │ Canvas mit │  │ Connectors, │  │ SharePoint,│  │ Child Agents   │
   │ Knoten:    │  │ REST, MCP,  │  │ Dataverse, │  │ (im Agenten)   │
   │ Frage, Be- │  │ Agent Flows,│  │ Copilot    │  │ Connected      │
   │ dingung,   │  │ Prompts,    │  │ Connectors,│  │ Agents (extern:│
   │ Nachricht, │  │ Computer    │  │ Real-time, │  │ Copilot Studio,│
   │ Karte, Tool│  │ Use, Skills │  │ AI Search  │  │ Foundry, Fabric│
   │ HTTP, Redi-│  │             │  │            │  │ Agents SDK,A2A)│
   └────────────┘  └─────────────┘  └────────────┘  └────────────────┘
          │               │               │               │
   ┌──────┴───────────────┴───────────────┴───────────────┴───────┐
   │ Plattform: Power-Platform-Umgebung · Lösungen (ALM) · DLP ·    │
   │ Sicherheitsrollen · Authentifizierung · Copilot Credits        │
   └──────────────────────────────────────────────────────────────┘
```

Die Zusammenhänge, die man verinnerlicht haben sollte:

- **Drei Integrationskategorien, nach Zweck gewählt.** *Tools* lassen den Agenten etwas *tun* (Datensatz abrufen, Ticket aktualisieren, Nachricht senden). *Knowledge sources* lassen ihn *Fragen beantworten* aus autoritativen Inhalten. *Agents* lassen ihn *Reasoning delegieren*. Die Kategorien sind additiv – ein Agent nutzt typischerweise alle drei.
- **Beschreibungen sind das Routing-Signal.** Bei generativer Orchestrierung entscheidet der Orchestrator anhand von Name und Beschreibung, wann er ein Tool, eine Wissensquelle oder einen Agenten aufruft. Die häufigste Ursache für ausbleibende oder falsche Aufrufe ist eine vage Beschreibung. Gute Beschreibungen sind spezifisch (Domäne, Anfragetypen), abgrenzend (keine Begriffe angrenzender Domänen) und in der Sprache der Nutzer formuliert.
- **Agentenebene vs. Topic-Ebene.** Tools auf der Tools-Seite des Agenten kann der Orchestrator jederzeit automatisch aufrufen; Tools in einem Topic-Knoten laufen an einem definierten, kontrollierten Punkt. Dasselbe gilt für Agenten: automatisch per Beschreibung oder explizit per Redirect-Knoten.
- **Generativ vs. klassisch.** Generative Orchestrierung ist Standard und Voraussetzung für MCP. Der klassische Modus reagiert auf Trigger-Phrasen und ruft Aktionen nur aus Topics.
- **Governance ist eine Designentscheidung.** DLP-Richtlinien bestimmen je Umgebung, welche Connectors erlaubt sind; der Anmeldemodus (Nutzer- oder Maker-Anmeldedaten) bestimmt, auf welche Kanäle veröffentlicht werden kann; das Anbinden eines fremden Agenten erweitert die Vertrauensgrenze. All das gehört an den Anfang, nicht ans Ende eines Projekts.
- **Lebenszyklus.** Agenten, Agent Flows und Prompts leben in Lösungen und wandern per Export/Import oder Pipelines zwischen Umgebungen; Environment variables und Connection references halten umgebungsspezifische Werte heraus. Child Agents teilen den Lebenszyklus ihres Parents, Connected Agents haben einen eigenen.
- **Kosten.** Copilot Credits sind die Abrechnungseinheit für Laufzeitaktivitäten – Gespräche, Wissensabruf, Agent-Flow-Aktionen, Prompt-Modelle, Computer-Use-Schritte, Evaluationsläufe. Modellwahl und Testfrequenz sind deshalb auch Kostenentscheidungen.

## Konversation: Topics, Antworten und Karten

### Topics und Knoten

Ein **Topic** ist ein diskreter Gesprächspfad, ohne Code auf dem **Authoring-Canvas** modelliert: Trigger, **Question**-Knoten (ein Wert je Turn, erzwingt eine erkannte Auswahl), **Condition**-Knoten (Verzweigung anhand von Variablen), **Message**-Knoten, Tool-Knoten, **Send HTTP request**, **Generative answers**, **Ask with Adaptive Card** und Agent-Redirects. Ein Agent startet mit sieben Custom- und neun System-Topics (Kernfunktionen wie *Conversational boosting*, *On Error*, *Require user to sign in* – nicht abschaltbar). Topics sind je Agent isoliert; migriert wird nur der ganze Agent über eine Lösung. Der **Topic checker** zeigt Fehler direkt auf dem Canvas; die Topics-Liste zeigt Status, Fehlerzahl und wer gerade bearbeitet.

**Variablen:** Topic-Variablen (`Topic.OrderNumber`) gelten im Topic und nehmen Tool-Outputs, HTTP-Antworten, Karteneingaben und Child-Agent-Outputs auf; globale Variablen gelten über Topics hinweg; Systemvariablen wie `System.User.DisplayName`, `User.Id`, `User.IsLoggedIn` liefert die Plattform. Eingefügt per `{x}`, geprüft in Bedingungen, transformiert mit Power Fx.

### Zwei Wege zu KI-Antworten: Generative answers und Custom prompts

| | Generative answers node | Custom prompt (Prompt builder) |
|---|---|---|
| Frage | „Was sagen unsere Inhalte dazu?“ | „Welche Aufgabe soll die KI auf diesen Daten ausführen?“ |
| Arbeitsweise | durchsucht Wissensquellen, synthetisiert geerdete Antwort mit Zitaten | führt Instruktionen auf Eingaben aus: klassifizieren, extrahieren, zusammenfassen – sucht nichts |
| Ort | Knoten im Topic (Add node > Advanced) | Tool (Tools > Add a tool > New tool > Prompt), im Topic als Tool-Knoten |
| Steuerung | Custom instructions (Ton, Format, Umfang) | Instructions + Input-Variablen + Modellwahl |
| Modell | vorgegeben | Mini / General / Deep oder Foundry-Modell |

**Generative answers node:** Er läuft dort, wo Wissensabruf im bekannten Ablauf stattfinden soll – anders als *Conversational boosting*, das agentenweit feuert, wenn kein Topic passt (generative Antworten als Fallback). Quellen am Knoten (**Data sources > Edit**) haben Vorrang vor den Agentenquellen, die nur Fallback sind, wenn der Knoten keine eigenen hat; zu viele Knotenquellen verwässern die Relevanz. Quellentypen: AI general knowledge, SharePoint (Graph Search, Entra-Auth), Documents (Dataverse-Uploads) und – hinter **Classic data** – Azure OpenAI on your data, Bing Web Search, Bing Custom Search, **Custom data**. Findet der Knoten nichts, antwortet er „keine Information gefunden“ statt auf allgemeines Wissen zurückzufallen (außer AI general knowledge ist Quelle); für Topics, die immer weiterhelfen müssen, folgt ein Condition-Knoten mit Fallback oder Eskalation.

**Custom data** ist der Weg zu proprietären APIs und Legacy-Systemen: Daten selbst abrufen (HTTP-Request-Knoten oder Power-Automate-Flow) und als Power-Fx-Tabelle mit den Spalten `Content` (Pflicht), `ContentLocation` (Zitat-URL) und `Title` übergeben – andere Strukturen akzeptiert der Knoten nicht. Ein Set-variable-Knoten mit `ForAll` mappt die JSON-Felder. **Nur die ersten drei Datensätze werden verwendet, positionsbasiert** – die Abfrage muss vorher filtern und ranken (z. B. Nutzerfrage als Query-Parameter). Faustregel: HTTP-Request bei einem einfachen Aufruf mit einer ForAll-Formel; Flow bei Aggregation über mehrere Quellen, Pagination oder Geschäftsregeln.

**Custom instructions** stehen im Data-source-Panel des Knotens (bis 8.000 Zeichen, mit Topic-Variablen und Power Fx) und steuern **Ton**, **Format** und **Umfang** – etwa „formal, Aufzählungspunkte bei mehreren Schritten, nicht über die Quellen hinaus spekulieren“. Sie gelten nur für diesen Knoten, nicht für andere Knoten, Topics oder Conversational boosting. Wirksam sind nur beobachtbare, messbare Verhaltensvorgaben: „Be helpful and professional“ ändert nichts; inkonsistente Formate bedeuten, dass das Format nicht spezifiziert ist. Immer mit *Test your agent* über die Bandbreite der Fragen prüfen.

**Custom prompts** brauchen drei Signale: eine feste Ausgabestruktur (Label, Anzahl Stichpunkte, extrahierte Felder), Reasoning getrennt vom Wissensabruf, ggf. ein besonderes Modell. Im **Prompt builder**: Instructions mit Platzhaltern (`{clauseText}`), *Add input*, *Test your prompt* mit Beispielen und Randfällen, *Save*. Im Topic als Tool-Knoten Eingaben aus Topic-Variablen mappen, Ausgabe benennen (`Topic.ClassificationResult`) und mit einem Condition-Knoten verzweigen. Modellkategorien: **Mini** (GPT-4.1 mini, Standard, Basisrate – schnelle, moderat komplexe Aufgaben), **General** (GPT-4.1, Standardrate – komplex/multimodal, Bild- und Dokumentanalyse), **Deep** (GPT-5 reasoning, Premiumrate – reasoning-intensiv). Über **Connect a model from Microsoft Foundry** (+ im Modell-Dropdown) lässt sich eines von über 1.800 Modellen anbinden: **Model deployment name** und **Base model name** exakt wie in Foundry; Foundry-Kosten und DLP beachten.

### Tools, Agent Flows und HTTP-Aufrufe aus Topics

Ein Topic kann von sich aus kein externes System erreichen – das leisten Tools. Tool-Typen: Connectors (vorgefertigt/custom), Agent Flows, Prompts, REST APIs (Preview), MCP, Computer Use (Preview). Zwei Tools gibt es nur im Topic: **Create search query** (schreibt die letzte Nutzernachricht mit Kontext in eine strukturierte Suchanfrage um) und **Perform custom search** (liefert Rohtreffer der konfigurierten Quellen als Variable – ein Verarbeitungsschritt zwischen Abruf und Antwort, den der Generative-answers-Knoten nicht hat).

Das Ein-/Ausgabemuster ist bei allen Tools gleich: Inputs aus Topic-Variablen füllen, nur die benötigten Outputs in klar benannte Variablen speichern, danach verzweigen. **Authentifizierung:** *End user authentication* (Standard – Nutzer meldet sich beim ersten Aufruf an, sieht nur seine Daten) oder *Maker-provided credentials* (alle agieren als Maker; für geteilte Ressourcen; setzt einen authentifizierten Kanal voraus). Der Dataverse-Connector ist Premium.

| Muster | Wann | Kernregel |
|---|---|---|
| **Connector-Tool** | ein Schritt: Lookup, Statusprüfung, Update | vorgefertigt sofort nutzbar; Custom Connector über dieselben Schritte |
| **Agent Flow** | mehrere koordinierte Schritte, Verzweigung, aus mehreren Topics aufrufbar | Trigger *When an agent calls the flow*, Aktion *Respond to the agent* mit **Asynchronous response = Off**, deklarierte Parameter, Solution-Flow – sonst fehlt der Flow im Tool-Picker |
| **Send HTTP request** | Ad-hoc-REST-Aufruf in einem Topic, kein Connector/OpenAPI/MCP | nicht teilbar, schwerer wartbar |

**100-Sekunden-Grenze:** Ein Agent Flow muss innerhalb von 100 Sekunden antworten; das Topic wartet am Action-Knoten. *Respond to the agent* markiert die synchrone Grenze, muss aber nicht der letzte Knoten sein: Aktionen danach laufen asynchron bis zu 30 Tage. Für lange Vorgänge deshalb sofort eine Job-ID zurückgeben und das Ergebnis über ein Polling-Topic nachreichen.

**Send HTTP request** (Add node > Advanced): URL statisch oder per Power Fx (`"https://api…/tracking/" & Topic.TrackingNumber`), Methoden GET/POST/PATCH/PUT/DELETE, Header (Anmeldedaten nie als Literal – **Environment variables** referenzieren, sonst sieht sie jeder Maker auf dem Canvas), Body *No Content* / *JSON Content* / *Raw content* (fehlender `Content-Type: application/json` ist die typische Ursache stillschweigend verworfener Bodies). Antwortschema über **From Sample Data > Get schema from sample JSON**, Speichern unter *Save user response as*, Zugriff per Punktnotation mit IntelliSense. Fehlerbehandlung: Standard **Raise an error** (System-Topic *On Error*, Ablauf stoppt) – für kundenseitige Topics **Continue on error**, Statuscode und Fehlerantwort in Variablen, Condition auf `200`, sonst Fallback-Nachricht. *Request timeout* 30.000 ms, bei langsamen APIs erhöhen.

### Nachrichten formatieren

Der **Message-Knoten** bietet Formatierungsleiste (fett, kursiv, Listen), Variableneinfügung `{x}`, Bilder und Videos (nur öffentliche URLs – interne oder authentifizierte Ablagen kann der Agent nicht laden), **Message variations** (zufällige Auswahl mehrerer Formulierungen mit gleichem Inhalt) und **Quick replies** (Vorschlagsbuttons mit Title/Text/Type). Quick Replies *führen*, der Question-Knoten *zwingt* – wer eine Auswahl erzwingen muss, nimmt den Question-Knoten. Manche Kanäle zeigen Quick Replies nicht oder gekürzt; die Nachricht braucht immer einen Textpfad.

### Adaptive Cards

**Adaptive Cards** sind ein offenes JSON-Kartenformat, das Teams, Outlook, Power Apps und andere Hosts nativ rendern. In Copilot Studio baut man sie im visuellen Designer (Vorschau, Element-Toolbox, Eigenschaften) und feilt in der JSON-Ansicht nach (`wrap`, `spacing`, `style: emphasis`, `minHeight`). Zwei Rollen:

- **Informativ** im Send-a-message-Knoten: Anzeige, Konversation läuft weiter. Layout-Elemente Container, ColumnSet, Column; Inhaltselemente TextBlock, Image. Regel: **drei bis fünf Datenpunkte je Karte**, vergleichbare Werte per ColumnSet nebeneinander. Werte werden per Power Fx aus Topic-Variablen gebunden; Transformationen (z. B. Einheit anhängen) vorher in eine Variable rechnen, nicht inline. Mehrere Karten als **Carousel** (nebeneinander, eine nach der anderen – eigenständige Elemente) oder **List** (vertikal – zum Vergleichen, bei zwei bis drei Karten).
- **Interaktiv** im **Ask with Adaptive Card**-Knoten: Eingabeelemente `Input.Text`, `Input.Number`, `Input.Date` (YYYY-MM-DD), `Input.Time` (HH:MM), `Input.Toggle`, `Input.ChoiceSet` plus **Action.Submit**. Mehrere Werte in einem Turn statt mehrerer Question-Knoten. Je Element entsteht eine Topic-Variable aus der ID – deshalb beschreibende camelCase-IDs (`leaveType` → `Topic.leaveType`). Pflichtfelder über *Required*. Dynamische Auswahllisten: `"choices": "=Topic.AvailableLeaveTypes"` mit einer Tabelle aus `title` und `value`. **Immer** direkt danach ein Condition-Knoten, der leere Pflichtvariablen abfängt (nicht abgesendete Karte). Bei mehreren Karten hintereinander eine eindeutige ID im `data`-Payload von Action.Submit mitschicken und beim Verarbeiten prüfen.

**Kanäle und Schemaversionen:** Teams und Live Chat rendern maximal **v1.5**, der Web-Kanal **v1.6**. Elemente neuerer Versionen scheitern stillschweigend oder die Karte fällt auf Text zurück – der Designer warnt nicht. Der Test-Bereich rendert mit der Web-Engine (v1.6) und taugt nicht als Teams-Test; der Authoring-Canvas rendert v1.6 gar nicht. Empfehlung: Bei Teams-Einsatz **alle Karten auf v1.5** designen (Option 1); Kanal-Erkennung mit zwei Kartenvarianten nur, wenn die v1.6-Vorteile den Pflegeaufwand rechtfertigen. Der Web-Kanal unterstützt kein `Action.Execute` – `Action.Submit` verwenden. Immer im echten Zielkanal testen (Teams braucht Publish).
## Integration: Handeln in externen Systemen

### Die Aktionsmuster im Vergleich

| Muster | Am besten für | Kern-Trade-off |
|---|---|---|
| **Prebuilt connector** | gängige Microsoft- und Drittdienste (Teams, SharePoint, Dataverse, ServiceNow …) | große Ergebnismengen verlangsamen Antworten; Drittanbieter fragen Nutzer nach Anmeldedaten |
| **Custom connector** | eigene REST-API, die **mehrere** Agenten (und Flows, Apps, Logic Apps) nutzen | Einrichtungsaufwand für Einzelfälle; muss mit Makern geteilt sein (Can view/Can edit) |
| **REST API tool** (Preview) | Einzelintegration einer proprietären API ohne Connector-Verpackung | nur in Copilot Studio (Umgebungs-Tools-Seite), nicht für Power Automate/Power Apps/Logic Apps; OpenAPI v2 (v3 wird konvertiert), Auth None/API key/OAuth 2.0; nur benötigte Endpunkte auswählen |
| **Agent flow** | deterministische Mehrschrittsequenzen, Genehmigungen, parallele Zweige, große Dateien | Fehlerpfade explizit entwerfen; Rate-Limits der APIs; Payload-Größenlimits; Copilot-Credits statt Power-Automate-Lizenz |
| **MCP server** | zentral verwaltete Tools für viele Agenten | nur generative Orchestrierung; Topics können MCP nicht aufrufen; Beschreibungen serverseitig; Streamable HTTP |
| **Send HTTP request** | schneller Einzelaufruf in einem Topic | nicht teilbar, schwer wartbar |
| **Computer use** (Preview) | nur eine Oberfläche, keine API | nicht deterministisch; zuerst RPA prüfen |
| **Bot Framework skills** | bestehende Pro-Code-Komponenten wiederverwenden | C#, Azure-Bot-Service-Kosten, ALM außerhalb der Power Platform |

Entscheidungsweg: Zuerst den Connector-Katalog prüfen. Kein Connector → brauchen mehrere Agenten die API? Ja → Custom Connector; nein (und nicht produktiv) → REST-API-Tool. Feste Schrittfolge oder Genehmigung → Agent Flow. Zentraler Tool-Server vorhanden oder geplant → MCP; explorativ → erst Connector/REST. Keine API → Computer Use (nach RPA-Prüfung). Muster sind kombinierbar: Ticket-Connector + Teams-Connector + Agent Flow im selben Agenten.

**Tool-Konfiguration:** Name (erscheint in Logs), **Beschreibung** (Routing-Signal – „Use this tool to submit IT service requests … including incident reports and hardware replacement“ statt „Creates records in Dynamics 365“), Inputs standardmäßig *Dynamically fill with AI* (alternativ fester Wert, Variable, Power Fx). **AI prompts** als Tool geben – anders als der Orchestrator mit festem System-Prompt – volle Kontrolle über Modell, Ausgabeformat und Grounding.

**Connectors in zwei Rollen:** als Tool (Aktion ausführen) und als Wissensquelle (Live-Daten abfragen, Preview). „Bestand ändern“ → Tool; „aktuellen Bestand beantworten“ → Real-time-Wissensquelle.

### Authentifizierung und Governance

**Anmeldemodus je Tool:** *User-provided* (Standard; Agent handelt als jeweiliger Nutzer, Datenzugriff folgt seinen Rechten – z. B. Teams-Nachricht kommt von der Person) oder *Maker-provided* (alle unter einer Identität; für Systeme mit geteiltem Servicekonto). Maker-Anmeldedaten setzen einen **authentifizierten Kanal** voraus – auf anonyme Kanäle lässt sich ein solcher Agent nicht veröffentlichen, und die Option erscheint bei anonymer Konfiguration gar nicht (Details > Additional details > Credentials to use). Beide Modi können im selben Agenten koexistieren. Verbindungen teilt man in Power Apps unter Connections mit *Can use + share*.

| Integrationstyp | Auth-Optionen |
|---|---|
| Power Platform connectors | Entra-ID-Verbindungen; user- oder maker-provided |
| REST API tools | None, API key (Header oder Query), OAuth 2.0 |
| MCP servers | None, API key, OAuth 2.0 (Dynamic discovery / Dynamic / Manual) |
| Azure AI Search | Access key, Client certificate, Service principal, Microsoft Entra ID Integrated |
| Copilot connectors (Wissen) | Scope `ExternalItem.Read.All` in authentifizierten Kanälen |

**DLP** (Data Loss Prevention): Admins klassifizieren Connectors je Umgebung als **Business**, **Non-business** oder **Blocked**. Blocked ist nirgends nutzbar; Business und Non-business dürfen nicht kombiniert werden. Durchsetzung in Echtzeit beim Hinzufügen – ein in Dev erlaubter Connector kann in Prod blockiert sein, deshalb vor dem Design prüfen; sonst Admin einbinden oder anderes Muster (REST-Tool, MCP) prüfen. Zweiter Hebel: **Control maker-provided credentials** – erzwungen, müssen alle Tools vom Endnutzer authentifiziert werden. **Teams-Besonderheit:** Bei benutzerdefinierter AD-Authentifizierung gibt es kein SSO für Connector-Tools; Nutzer melden sich je Connector manuell an.

### MCP: zentrale Tool-Server

**Model Context Protocol** standardisiert, wie Tools und Ressourcen beschrieben, entdeckt und aufgerufen werden. Ein Server veröffentlicht seine Fähigkeiten einmal; verbundene Agenten entdecken sie automatisch, und Änderungen des Betreibers propagieren ohne Neuveröffentlichung – ideal, wenn viele Agenten dieselben Tools brauchen und ein Plattformteam den Server besitzt. Komponenten: **Tools** (aufrufbare Funktionen) und **Resources** (dateiähnliche Daten – nicht eigenständig aufrufbar, sondern nur als Ausgabe eines Tools); **Prompts** unterstützt Copilot Studio nicht.

Einschränkungen, die die Prüfung liebt: nur **generative Orchestrierung** (kein klassischer Modus); **Topics können MCP-Server nicht aufrufen**; Tool-Beschreibungen kommen vom Server und sind in Copilot Studio **nicht editierbar** (bei vagen Beschreibungen hilft nur der Betreiber); nur **Streamable HTTP** (SSE seit August 2025 nicht mehr unterstützt); ohne bestehenden Server ist der direkte API-Weg schneller.

**Anbindung** (Tools > Add a tool > New tool > Model Context Protocol): Servername (Label für Maker), **Serverbeschreibung** (liest der Orchestrator zur Laufzeit – als Routing-Regel schreiben, das primäre Signal für den Server), Server-URL. Alternativ der Katalog **vorgefertigter Microsoft-MCP-Connectors** (Dataverse, Dynamics 365, Outlook, GitHub, Teams) ohne URL und Beschreibung, darunter **Work IQ** (Mail, Calendar, Teams; Preview; Microsoft-365-Copilot-Lizenz und Admin-Freischaltung nötig).

**Authentifizierung als Vertrauenshierarchie:** *None* (Netzwerkperimeter; nicht für sensible Daten), *API key* (Type Header/Query, Parameter name wie `x-cs-apikey`; der Wert ist nicht Teil der Konfiguration – jeder Nutzer gibt beim ersten Aufruf seinen Schlüssel ein), *OAuth 2.0* mit Sub-Typen **Dynamic discovery** (DCR mit Discovery-Endpunkt – bevorzugt), **Dynamic** (DCR ohne Discovery; Authorization-/Token-URL manuell), **Manual** (kein DCR; Client-ID, Secret, alle URLs, Scopes; Callback-URL beim IdP registrieren).

**Tool-Scoping:** Standardmäßig ist **Allow all** an – alle Tools verfügbar, neue automatisch. Aus = Einzelschalter, neue Tools bleiben deaktiviert bis zur Prüfung; kleinerer Entscheidungsraum für den Orchestrator und Least Privilege. Eine Governance-Entscheidung, keine reine Bedienoption.

### Agent Flows: deterministische Automatisierung

Ein **Agent Flow** ist eine strukturierte, deterministische Schrittfolge (gleiche Eingaben → gleiche Ausgaben), gebaut und verwaltet in Copilot Studio, abgerechnet über **Copilot Credits nach ausgeführten Aktionen** – keine Power-Automate-Lizenz. Gleiches Connector-Ökosystem wie Cloud-Flows, lebt in Lösungen (Versionierung, Export/Import), kann aber nicht kopiert, geteilt oder mit Co-Ownern/Run-only-Rechten versehen werden. Passend, wenn ein Prozess repetitiv, mehrstufig, vorhersagbar und ereignisgesteuert ist; braucht er echtes Urteilsvermögen, ist KI-Reasoning besser.

**Trigger:** *Instant* (manuell oder von Agent/Flow/App; Eingabeparameter Text, Yes/No, File, Email, Number, Date – per Ellipsen-Menü optional, Text mit Werteliste; *Run a flow from Copilot* macht den Flow direkt zum Agenten-Tool), *Scheduled* (Zeitplan), *Automated* (Ereignis). Trigger-Einstellungen: Concurrency control, **Trigger conditions** (Ausdrücke, die wahr sein müssen, bevor der Flow überhaupt startet – Filter ohne Aktionsverbrauch), Retry policy.

**Aktionen:** Built-in tools (Control: Schleifen, Verzweigung, Datenoperationen, Child Flows), Connectors, AI capabilities (Text generieren, Prompt ausführen, Dokumente verarbeiten), **Human in the loop** (Approval, Request for Information – pausieren bis zur menschlichen Eingabe). Jede Aktion sofort beschreibend umbenennen („Get requester profile“ statt „Get user profile (V2)“) – die Namen erscheinen im Dynamic-Content-Picker aller Folgeschritte.

**Erstellen:** per natürlicher Sprache (Copilot schlägt Trigger und Aktionen vor; „When X happens, do Y“, Connectors nennen; *Keep it and continue*, Verbindungen prüfen, *Create*, *Save draft*, *Publish*) oder im visuellen Designer (+ New agent flow, Trigger wählen); beide landen im selben Designer mit Copilot-Pane. Der Flow-Name wird beim Einsatz als Tool der Standard-Toolname – ein klarer Name (Trigger + Zweck) verbessert das Routing.

**Logik:** **Dynamic content** (Blitz oder `/`) = Ausgaben vorheriger Schritte; **Expressions** (fx) für Verkettung, Formatierung, Berechnung (Copilot erzeugt sie aus Beschreibungen); **Condition** (True/False), **Switch** bei mehr als zwei Pfaden; **parallele Zweige** für unabhängige Aktionen, zusammengeführt über **Run after** – das auch Fehlerpfade ermöglicht (Zweig scheitert → Fallback statt Abbruch); **Apply to each** (endliche Liste, sicher) und **Until** (immer Iterations-/Zeitlimit setzen, sonst Endlosschleife). Im Settings-Tab jeder Aktion: Timeout, Retry, Run after; bei *Respond to agent* der Asynchronous-Modus.

**Betrieb:** **Version history** (Snapshot je Save in Dataverse, Restore ohne Verlust späterer Arbeit); **Flow checker** (Fehler blockieren Publish, Warnungen nicht – aber prüfen); **Test** (Manually oder Automatically mit echtem Ereignis; beide Zweige jeder Bedingung testen – der False-Zweig fällt in Produktion am häufigsten still aus; Standardaktionen verbrauchen im Test keine Credits, Prompt Builder schon). Monitoring-Tabs: **Overview** (Stammdaten, Verbindungen, Flow ein/aus, **Savings rule** – Zeit-/Kostenersparnis je erfolgreichem Produktionslauf; nur lösungsbasierte Flows, Testläufe zählen nicht), **Activity** (jeder Lauf mit Drill-through), **Analytics** (Trends: Läufe, Fehlerrate, Dauer). **Cloud-Flow konvertieren:** Flow in Lösung, Credits in der Umgebung, im Power-Automate-Portal Plan auf Copilot Studio – dauerhaft, nicht umkehrbar.

### Computer Use: Bedienen statt Integrieren

**Computer use** lässt einen Agenten Web- und Desktop-Anwendungen wie ein Mensch bedienen: Screenshot → Reasoning → Aktion, in einer Schleife bis zum Abschluss oder bis menschliche Eingabe nötig ist. Weil jeder Zyklus frisch vom Bildschirm ausgeht, passt sich der Agent an verschobene Layouts und unerwartete Dialoge an. Läuft auf einer Windows-Maschine, meist **autonom** (bei Konversation werden Reasoning und Screenshots im Chat geteilt). Nur wenn kein API/Connector existiert – Legacy-ERP/CRM, Webformulare ohne API, interne Portale, installierte Windows-Apps (WinForms/WPF/Win32; Citrix/Java eingeschränkt), Cross-System-Workflows. **Vorher RPA prüfen:** Desktop-Flows sind besser bei stabiler Oberfläche und regelbasierter Logik; Computer Use, wenn Oberflächen variieren, Entscheidungen vom Bildschirminhalt abhängen oder Selbstkorrektur nötig ist.

Grenzen: **nicht deterministisch** (ca. 80 % Erfolg web, 35 % desktop; komplexe UI-Elemente sind typische Fehlerquellen), **nicht idempotent** (Vorab-Check in die Anweisungen bei schreibenden Aufgaben; Human Supervision als Gate vor irreversiblen Submits), **Prompt Injection** durch Bildschirminhalte (primäre Verteidigung: **Access control allow list**).

**Konfiguration** (Tools > Add tool > New tool > Computer use): aufgabenorientierter Name; Beschreibung für den Orchestrator; **Modell** (Kosten: 5 Credits je Schritt Standard, 15 Premium – ein Vier-Schritt-Task 20 bzw. 60); **Instructions** (jeden Screen, Button, Schritt benennen; volle URL/App-Name; nummerierte Liste; variable Werte als **Inputs** `{employeeId}`; „Proceed with each step without asking for confirmation“; Fallback-Sätze wie „If the Submit button is not visible, scroll down“); **Machine**: *Hosted browser* (Experimente, nur Edge-Web), **Cloud PC pool** (Windows 365 for Agents – empfohlen; automatisch provisioniert, Entra-joined, Intune; Preview; bis zu zwei Pools und 50 Freistunden; Provisionierung bis 30 Min.), *Bring your own machine* (Power Automate for desktop ≥ 2.61, „Enable for computer use“ – **deaktiviert Desktop-Flows** auf der Maschine; Läufe sequenziell); *Credentials to use* Maker-provided (Standard) oder End user. **Stored credentials** (nie im Anweisungstext): Power Platform internal storage oder **Azure Key Vault** (produktiv: zentrale Verwaltung, Rotation). **Access control**: Allowlist von URLs (Wildcards `*.contoso.com`) und Apps – beschränkt die Interaktion, nicht die Navigation.

**Monitoring:** Activity-Bereich > Lauf > **Activity map** und **Transcript** (Reasoning + Screenshots je Schritt). Seitenpanel (bei Dataverse-Logging): **Session replay**, **Activity** (Aktionstyp, Koordinaten, Zeitstempel, Screenshot – zeigt, welches Element getroffen wurde), **Summary** (Dauer, Aktionszahl, Eskalationen, Maschine), **Websites and applications**, **Credentials used**, **Export session logs**. **Human supervision:** Review-Anfrage per Outlook-Mail (Link zur Activity Map) oder inline – probabilistisch, kein Sicherheitsgarant; Reviewer geben nie Anmeldedaten ein; häufige Anfragen = unklare Anweisungen. **Logging** (Power Platform admin center > Settings > Products > Features > Computer Use): *Store logs in Dataverse* (Standard an), Verbosity *All data* / *Data without screenshots* / *Minimal*, Aufbewahrung Standard **sieben Tage** (0 oder -1 = unbegrenzt – vor Go-live an Compliance anpassen), **Send audit logs to Microsoft Purview** (Aktivität `CUAOperation`).
## Wissen: Agenten in Unternehmensdaten erden

### Quellentypen im Überblick

| Quelle | Am besten für |
|---|---|
| SharePoint, Dataverse, Dateiuploads, öffentliche Websites | Inhalte, die bereits dort liegen |
| **Copilot connectors** | Nicht-Microsoft-Inhalte (ITSM, Wikis, Projekttools, Repos), semantisch in Microsoft Graph indexiert, **zitierbar** |
| **Power Platform connectors als Real-time-Wissen** (Preview) | Live-Daten zur Laufzeit ohne Replikation |
| **Azure AI Search** | organisationseigener Vektorindex für semantische/hybride Suche |
| Unstrukturierte Daten | OneDrive/SharePoint-Dateien in Dataverse vektorisiert; Drittanbieter-Wissensartikel über Connectors |

Jede Wissensquelle bekommt Name und **Beschreibung** – der Orchestrator nutzt sie, um Fragen der richtigen Quelle zuzuordnen („Woodgrove Bank's IT knowledge base, including IT procedures, escalation guides, and service resolution articles“).

### Copilot connector vs. Real-time connector

| Dimension | Copilot connector | Real-time Power Platform connector |
|---|---|---|
| Muster | „search and index“ – Inhalte einmal ingestiert, in Graph indexiert | Live-API-Aufruf je Frage; nur Metadaten (Tabellen/Spalten) indexiert |
| Am besten für | Wissensdatenbanken, Dokumentation, Wikis, Ticketarchive – statisch bis langsam veränderlich | Kontostände, Bestände, Ticketstatus – häufig wechselnd; wenn Replikation verboten ist |
| Aktualität | indexiert (Sync-Verzögerung) | live |
| Zitate | ja, einzelne Elemente | nicht inhärent |
| Replikation | ja, in Microsoft Graph | nein, Daten bleiben in der Quelle |
| Admin-Abhängigkeit | Admin konfiguriert im Microsoft 365 admin center; Maker wählen nur aus | Maker/Admin legen Verbindungen an; DLP entscheidet |
| Identität | – | Abruf unter der Identität des Fragenden; Quellrechte gelten |

Typische Falle: falsche Quelle für die Datennatur – Copilot Connector für häufig wechselnde Daten → veraltete Antworten; Real-time für große Referenzbestände → langsam und ohne Zitate. Über 100 vorgefertigte Copilot Connectors; eigene per Agents Toolkit, SDK oder APIs. **Publishing-Schritt:** In Kanälen mit manueller Authentifizierung (Teams, authentifizierter Web-Chat) den Graph-Scope **`ExternalItem.Read.All`** eintragen – sonst liefert der Connector zur Laufzeit nichts. Mit Microsoft-365-Copilot-Lizenz kann der Admin *Tenant graph grounding with semantic search* aktivieren. Real-time-Quellen: Status *In progress* → *Ready*; Premium-Connectors brauchen Lizenz; wird ein Connector per DLP blockiert, funktionieren darauf basierende Quellen nicht mehr.

### Azure AI Search

Für Dokumentsammlungen, die im eigenen Index bleiben müssen (z. B. Compliance-Tresor) mit Kontrolle über Embedding-Pipeline und Relevanz-Tuning. **Immer über „Create new connection“** anbinden – manuelle Eingabe von Endpoint und API-Key erzeugt eine fehlerhafte **Umgebungsverbindung**, die den Azure-AI-Search-Dialog für alle Agenten der Umgebung blockieren kann und sich im Produkt nicht löschen lässt (Recovery: externen Zugriff zurücksetzen oder Agent neu anlegen). Authentifizierung: **Microsoft Entra ID Integrated** (empfohlen – Identität des Nutzers, keine Schlüsselrotation), Access Key (nicht produktiv), Client Certificate, Service principal. Ein Index je Verbindung; integrierte Vektorisierung (Index-Erstellung ist Aufgabe des Azure-Admins); **Semantic ranker** für natürlichsprachliche Anfragen (erst in Azure AI Search aktivieren, tierabhängig). **Zitate:** Copilot Studio prüft zuerst `metadata_storage_path`, sonst ein anderes Feld mit vollständiger URL; Nutzer brauchen Zugriff auf die Ziel-URLs. Private Endpunkte über VNet-Unterstützung im Power Platform admin center.

## Multi-Agent-Lösungen

### Wann mehrere Agenten?

Das zuverlässigste Signal ist nachlassende **Routing-Genauigkeit**: ab etwa **30–40 Aktionen** (Topics, Tools, Agenten) beginnt der Orchestrator zu straucheln. Weitere strukturelle Gründe: mehrere Teams pflegen Teile unabhängig; getrennte Authentifizierung, Sicherheit oder Modellkonfiguration; unterschiedliche ALM-Prozesse; Wiederverwendung als Shared-Service-Agent; separate Veröffentlichung auf eigenen Kanälen. Schon eine klare organisatorische Grenze reicht. Ein fokussierter FAQ-Agent bleibt dagegen ein einzelner Agent – Multi-Agent bringt **Orchestrierungs-Hops** (Latenz) und eine größere Governance-Oberfläche (eigene Transkripte, Richtlinien, Korrelation beim Debugging). Praxis: mit einem Agenten starten und erst bei einer strukturellen Grenze aufteilen.

### Child Agents vs. Connected Agents

| | Child agent | Connected agent |
|---|---|---|
| Wo | im Parent (Agents > Add an agent > New child agent) | separat veröffentlicht; Copilot Studio (gleiche Umgebung), Foundry, Fabric, Agents SDK, A2A |
| Ownership | dasselbe Team | ggf. anderes Team, andere Plattform, andere Organisation |
| Lebenszyklus | mit dem Parent gespeichert, getestet, veröffentlicht – kein eigenes ALM | eigener Publish-Zyklus, eigene Einstellungen; für mehrere Orchestratoren nutzbar |
| Kontext | teilt Kontext und Lösung; Inputs/Outputs direkt | Gesprächsverlauf wird standardmäßig mitgegeben (abschaltbar) |
| Latenz | keine zusätzlichen Hops | Orchestrierungs-Hops |
| Limits | eigene Tool-Limits je Orchestrierungsebene | eigene Orchestrierung, evtl. andere Rechte als der Parent |
| Wann | ein Team besitzt alles, nichts wird separat veröffentlicht, Tools/Wissen logisch gruppieren | Fähigkeit existiert bereits, gehört anderem Team, braucht eigenen Zyklus oder Wiederverwendung |

Beide lassen sich kombinieren: Connected Agents pro Fachbereich, die intern Child Agents nutzen. „Ein Topic behandelt ein Skript, ein Child Agent eine Domäne.“

### Child Agents konfigurieren

- **Name** spezifisch („Order Status Agent“), **Beschreibung** als Routing-Signal – konkrete Domäne, Anfragetypen, keine Begriffe angrenzender Agenten; vage → fängt Falsches, zu eng → verpasst Richtiges. Boundary-Fälle testen.
- **When will this be used?**: **The agent chooses – Based on description** (Standard, dynamisch, robust gegen Formulierungen) oder **explizite Trigger** für Determinismus: An activity occurs, A message is received, A custom client event occurs, The conversation changes, It's invoked, **It's redirected to**, **The user is inactive for a while** (proaktives Nachfragen – per Beschreibung nicht möglich), A plan completes, An AI-generated response is about to be sent. Dazu **Condition** (z. B. nur in Teams; Builder oder Power Fx) und **Priority**. Reihenfolge: Activity-Trigger → Message/Client-Event/Conversation/Invoked → The agent chooses; innerhalb einer Stufe Erstellungsreihenfolge, sofern keine Priority (kleiner = höher).
- **Instructions** steuern die Ausführung (die Beschreibung das Routing); mit `/` Tools, Variablen, Formeln referenzieren. **Tool-Konflikt:** Ist ein Tool auch dem Orchestrator sichtbar, ruft er es evtl. direkt auf und umgeht die Child-Instructions – *Allow agent to decide dynamically when to use this tool* deaktivieren, dann nur explizite Aufrufe. Wissen und Tools beim spezifischsten Agenten halten.
- **Inputs** (Display name, Description, Data type, Required) – standardmäßig bekommt der Child nur die Nutzernachricht; Advanced: **Should prompt user** (Child fragt selbst), Condition/Condition not met prompt (Validierung), How many reprompts, Action if no entity found. **Outputs** (Name, Beschreibung, Typ); bei Redirect landen sie automatisch in Topic-Variablen.
- **After running**: *Don't respond* (Standard – Outputs fließen weiter), *Write the response with generative AI*, *Send specific response*, *Send an adaptive card* (tabellarische Outputs).
- **Testen:** *Show activity map when testing* zeigt Plan, gewählten Agenten, Inputs und Outputs; Fehlleitung = Beschreibungen anpassen, testen, wiederholen. **Agent redirect node** (Add node > Add an agent) ruft einen Child unbedingt auf, übergibt Inputs aus dem Topic; das Topic setzt danach fort (Hybrid: Topic sammelt/verifiziert, Child verarbeitet). **Enabled**-Schalter für Wartungsfenster und gestaffelte Rollouts (Konfiguration bleibt); **Delete** ist endgültig – Redirect-Knoten vorher prüfen.

### Koordinationsmuster für Connected Agents

| Faktor | Orchestrator/Subagent | Workflow-oriented |
|---|---|---|
| Prozess | offen, dynamisch | vordefiniert, deterministisch |
| Routing | Agent entscheidet zur Laufzeit | Workflow-Engine (Power Automate, Logic Apps, Foundry-Workflows, Topics) legt fest |
| Varianz | akzeptabel | gering – strikte Reihenfolge |
| Auditierbarkeit | moderat | stark – jeder Schritt explizit |
| Typisch | Routing, Beratung, Sales-Copilot | Genehmigungen, Compliance-Audits, Vertragsprüfung in fester Reihenfolge |
| Human-in-the-loop | optional | über Genehmigungsgates |
| Formen | – | seriell (Quality Gates) oder parallel (Quorum/Voting) |

Orchestrator/Subagent ist falsch, wenn jeder Schritt vor dem nächsten gelingen muss (der Orchestrator könnte Schritte überspringen oder umsortieren) oder Subagenten lange Antwortfenster brauchen (Timeouts).

### Verbindungsoptionen

| Option | Wann | Voraussetzungen / Besonderheiten |
|---|---|---|
| **Existing Copilot Studio agent** | anderes Team, eigener Zyklus, gleiche Umgebung | gleiche Umgebung, veröffentlicht, **Let other agents connect to and use this one** (Settings > General), Besitz/Freigabe. Der Orchestrator speichert eine **lokale Kopie der Beschreibung**, die nicht synchronisiert – bei Scope-Änderungen manuell aktualisieren |
| **Microsoft Foundry agent** (Preview) | spezialisierte Modelle/Reasoning | Agent im **neuen** Foundry-Portal (Legacy Azure AI Studio → 404), **Project endpoint URL** + **Agent ID**; Agent ID später ohne Neuanlage änderbar; Datenverarbeitung und Responsible-AI-Review klären |
| **Microsoft Fabric Data agent** (Preview) | konversationelle Abfragen über OneLake (SQL/DAX/KQL) | Fabric-Verbindung, **F2+** (oder P1+) mit Fabric, veröffentlichter Agent; erzwingt Nutzer-Berechtigungen und Purview; **nur generative Orchestrierung – kein Topic-Redirect**; nicht in Microsoft 365 Copilot |
| **Microsoft 365 Agents SDK agent** (Preview) | codebasierte Agenten | Anbindung über Messaging-Endpunkt |
| **A2A protocol agent** | Partner-/Fremdplattform-Agent mit eigenem Reasoning | Endpoint-URL; Agent Card wird automatisch geladen |

**Governance beim Verbinden:** Der Maker des Orchestrators verantwortet die Datenflüsse (inkl. Gesprächsverlauf), Qualitäts-/Responsible-AI-Standards, Berechtigungen und Freigaben des Besitzerteams sowie Observability (eigene Transkripte je Agent – Korrelation früh planen). Vor Aufrufen eines Agenten mit **Schreibzugriff** auf ein System of Record: Genehmigungskontrollen, Data-Sharing-Vereinbarungen, Sicherheitsreviews. Routing-Diagnose: Activity Map zeigt Fehlleitung → Beschreibungsproblem, kein Verbindungsproblem; überlappende Wörter („compliance“) durch spezifische, nicht überlappende Formulierungen ersetzen; bei hartnäckiger Mehrdeutigkeit ergänzend Routing-Hinweise in den Orchestrator-Instructions (Agenten namentlich nennen). **Enabled** für Wartung (Konfiguration bleibt), **Disconnect agent** endgültig (Reconnect = komplett neu anlegen; der Zielagent selbst bleibt unberührt).

### A2A: Agent-zu-Agent über Plattformgrenzen

Das **Agent2Agent-Protokoll** ist ein offener Standard für Delegation an einen externen, **opaken** Agenten: kein Funktionsaufruf mit Rückgabewert, sondern eine Aufgabe, die der Partneragent mit eigenem Reasoning und eigenen Tools bearbeitet und als agentengenerierte, kontextbezogene Antwort zurückgibt. Konzepte: **Agent card** (JSON unter `{endpoint}/.well-known/agent.json` – Name, Zweck, Fähigkeiten, Endpunkt; wird beim Eingeben der URL automatisch geladen), **Tasks** (Arbeitseinheit), **Context ID** (Gesprächskontinuität über Turns), **Message content parts** (Text, Tool-Ergebnisse, Metadaten, Verlauf).

| | Connector | MCP | A2A |
|---|---|---|---|
| Was wird aufgerufen | API-Endpunkt | Tools/Daten eines Servers | ein Agent |
| Was kommt zurück | Rohdaten | Einzelergebnisse, vom Orchestrator synthetisiert | agentengenerierte Antwort |
| Kontrolle | – | Orchestrator wählt Tools | externer Agent orchestriert selbst (opak) |
| Multi-Turn | einzelne Anfrage | begrenzt | voll (contextId) |
| Discovery | – | – | Agent Card, dynamische Fähigkeitsverhandlung |

Anbindung: Agents > Add an agent > Connect to an external agent > Agent2Agent, Endpoint-URL (öffentlich oder über On-premises data gateway), Name/Beschreibung prüfen und schärfen („Handles live shipment tracking for orders fulfilled by Northwind Traders …“ statt „Handles shipment queries“), Authentifizierung **None** (nur Sandbox), **API key** (Header-/Query-Name plus Wert) oder **OAuth 2.0** (Client-ID, Secret, Authorization-, Token-, Refresh-URL). Bleiben Name/Beschreibung leer: Agent-Card-URL im Browser prüfen, ggf. manuell eintragen. **Testen** mit Prompts, die delegiert werden sollen, solchen, die intern bleiben sollen, und Randfällen; die Activity Map bestätigt die Delegation. **Responsible use:** Der komplette Gesprächsverlauf geht standardmäßig mit – enthält er z. B. Kontonummern aus früheren Schritten, mit dem Partner klären, was er verarbeitet und behält, die Datenverarbeitungsvereinbarung prüfen und die Entscheidung dokumentieren; Observability und ein Eskalationspfad zu Menschen für hochriskante Delegationen. Troubleshooting: keine Delegation oder unerwartete Antworten → Beschreibung schärfen; Auth-Fehler → Header/Key/OAuth prüfen; Card nicht gefunden → URL; Verbindungsfehler → Netzwerk/Gateway.
## Betrieb: Testen, Veröffentlichen, Verwalten

### Preview, Evaluate, Monitor

| Tab | Zweck | Merkmale |
|---|---|---|
| **Preview** | schnelle, informelle Checks beim Bauen | interaktiver Chat; keine Metriken, nicht wiederholbar |
| **Evaluate** (produktionsreife Preview, GitHub-Copilot-Harness) | Qualitäts-Baseline vor dem Release, Regressionen nach Änderungen | gespeichertes **Test set** aus **Conversations**, Testmethode **General quality**, **Authenticated user profile**; jeder Lauf wird separat gespeichert und verglichen |
| **Monitor** (Preview, nach Publish) | Trends aus echten Gesprächen | Sitzungen, Engagement, Laufdauer, Erfolgsrate, Reaktionen, Tool-Nutzung, abgerechnete Credits |

**Testset-Design:** je Interaktionstyp mindestens eine Konversation – In-scope-Antwort, Mehrdeutigkeit/Klärung, Out-of-scope-Grenze, Eskalation, **Delegation an einen Connected Agent** und **Delegationsgrenze** (ähnliche Anfrage, die der Hauptagent selbst behandelt) – also positive *und* negative Routing-Tests. Erwartete Antworten sind nur Referenz für die manuelle Prüfung: **General quality vergleicht nicht mit ihnen**, sondern bewertet Relevanz, Vollständigkeit usw. Das **Authenticated user profile** muss die Rechte der Zielnutzer widerspiegeln, sonst bleiben Berechtigungsfehler unsichtbar.

**Ergebnisse lesen:** Muster statt Einzelfälle suchen; Antwort, Zitate, gewähltes Tool, Tool-Ergebnis und Fehler prüfen (kein Einblick in das private Reasoning).

| Signal | Prüfen |
|---|---|
| geringe Relevanz | Instructions zu breit/eng oder ohne Kontext |
| geringe Vollständigkeit | Wissen fehlt oder wurde nicht abgerufen |
| nicht gestützte Antwort | Instructions und Wissen |
| falsche Fähigkeit | Tool-Name/Beschreibung passt nicht |
| falscher Agent | überlappende Beschreibungen, Konflikt mit Instructions |
| Delegationsfehler | Connected Agent nicht veröffentlicht, nicht geteilt, nicht verfügbar, andere Umgebung |
| Capability-Fehler | Verbindung, Berechtigung, Konfiguration |

**Monitor-Probleme nach Typ trennen, bevor man etwas ändert:** **Quality defect** (Instructions/Wissen – auf Preview reproduzieren, in Evaluate aufnehmen), **Runtime failure** (Verbindung, Konfiguration, externer Dienst), **Permission failure** (Nutzer ohne Zugriff – mit typischem Nutzer testen), **Capacity failure** (Credits/Agentenlimit – Admin im Power Platform admin center). „Instructions bearbeiten behebt keine fehlenden Berechtigungen, und eine Verbindung zu ändern ergänzt kein fehlendes Wissen.“ Nach jeder Korrektur das Testset erneut ausführen; unerwartete Szenarien aus Monitor als neue Konversationen aufnehmen. Evaluationen verbrauchen Credits – zu Meilensteinen ausführen, Preview für Zwischenchecks.

### Veröffentlichen und validieren

**Publish** auf dem Build-Tab, dann Kanal hinzufügen; nach Inhaltsänderungen erneut veröffentlichen. Vorher: Evaluation abgeschlossen, Wissen/Tools/Workflows konfiguriert, Nutzerrechte auf die Ressourcen bekannt, Organisationsrichtlinien für Kanäle/Admin-Freigabe bekannt. **Teams and Microsoft Copilot**: mit *Make agent available in Microsoft Copilot* in beiden verfügbar, ohne nur in Teams; *Edit details* (Icon, Beschreibungen, Datenschutz, Nutzungsbedingungen). Verteilung je Tenant-Richtlinie: **Installationslink**, **Shared-user discovery** (Built with Power Platform im App Store), **organisationsweite Verfügbarkeit** nach Admin-Freigabe (Submit to org catalog; Teams App Store und Microsoft 365 Agent Store), **Preinstallation** per Teams-App-Setup-Richtlinie (installiert und gepinnt).

**Validieren als veröffentlichter Nutzer** – nicht als Autor oder Admin: Authentifizierung, Wissensabruf, Zitate (Links erreichbar), Tool-/Workflow-Ausführung, Scope-Grenzen, Eskalation. Fehlerklassen: **Permission failures** (SharePoint/Dataverse nicht zugänglich), **Connection failures** (Connector braucht Re-Authentifizierung für andere Identität), **Configuration gaps** (andere Umgebung, Datenregion, Lizenzstufe). Verhindert die Tenant-Richtlinie Installation/Katalog, gilt Publish nicht als Verfügbarkeit.

### Klassische Verwaltung: Umgebungen, Rollen, Sicherheit, Analytics

- **Umgebungen:** Agenten werden in der gewählten Umgebung erstellt; für den Bau braucht man die Rolle **Agent author** (Copilot-Studio-Rollen: Agent author, Agent contributor, Agent transcript viewer; im Power Platform admin center unter Security roles > Members). Beim Teilen eines Agenten mit einem Nutzer ohne Rechte wird **Environment maker** zugewiesen (mit Hinweis). Zum Chatten braucht niemand eine Freigabe.
- **Zugriff:** *All agent managers* oder *Everyone in my organization*. **Authentifizierung** (Settings > Security > Authentication; wirksam nach Publish): **No authentication** (jeder mit Link; nur öffentliche Ressourcen), **Authenticate with Microsoft** (Entra ID für Teams automatisch – **nur Teams-Kanal**; Standard neuer Agenten), **Authenticate manually** (jeder OAuth2-Anbieter: Entra ID, Microsoft-Konto, Google, Facebook, eigener Dienst – für alle Kanäle). **Require users to sign in** erzeugt ein System-Topic, das zu Beginn anmeldet und `User.Id`, `User.DisplayName`, `User.Email`, `User.IsLoggedIn` u. a. liefert; sonst die Authenticate-Aktion an beliebiger Stelle (einmal pro Sitzung). Manuelle Einrichtung mit Entra ID: App-Registrierung mit Redirect URI `https://token.botframework.com/.auth/web/redirect` (Web), Client Secret, Application (client) ID; in Copilot Studio Service Provider *Azure Active Directory v2*, optional Token exchange URL (SSO) und Scopes.
- **Web channel security:** Demo- und Custom-Website-Kanal sind sofort für jeden mit der Agent-ID erreichbar; **Require secured access** erzwingt Direct-Line-Secrets oder daraus erzeugte Tokens (Deaktivieren dauert bis zu zwei Stunden).
- **Analytics** (klassisch): **Summary** (Sitzungen, Engagement-, Resolution-, Escalation-, Abandon-Rate), **Customer Satisfaction**, **Sessions** (Rohdaten mit Transkripten), **Billing**. Eine **abgerechnete Sitzung** beginnt mit einem Nutzer-Topic und endet nach 30 Minuten ohne Nachricht, nach 60 Minuten Gesamtdauer oder nach mehr als 100 Turns.
- **Generative-AI-Einstellungen:** Modus *Classic* vs. *Generative*; **Content moderation** Low (kreativer) / Medium / High (präziser, öfter keine Antwort); Image input; Enhanced search results (Microsoft-365-Copilot-Tenants).
- **Monitor and diagnose:** Topics-Liste zeigt Status, Fehler und Bearbeiter; Klick auf die Fehlerzahl öffnet den Canvas mit dem Topic checker.
- **Entities und Flows (klassisch):** vorgefertigte Entities erkennen Alter, Farben, Zahlen, Namen; Dataverse-Tabellen erreicht ein Agent nur über Flows (*Call an action*; nur Flows der Lösung sichtbar).

### ALM und Kosten

- **Lösungen** tragen den Agenten samt Subkomponenten (Topics, Entities, Flows) zwischen Dev, Test und Prod: *Add existing > Agent*, neue Topics später per **Add required objects**; Subkomponenten nicht in Power Apps manuell ändern (Export scheitert). Export als **managed** für Test/Produktion; Import über *Import solution*. Topics allein lassen sich nicht migrieren. Agent Flows und Prompts sind ebenfalls lösungsfähig.
- **Umgebungsstrategie:** Dev/Test/Prod trennen; **Environment variables** (Werte wie Site-URLs, API-Keys) und **Connection references** (Connector-Konten je Umgebung) früh anlegen.
- **Power Platform Pipelines** bewegen Lösungen mit optionaler Genehmigung; Maker stellen Deployment-Anfragen, Admins konfigurieren.
- **DLP**, **rollenbasierter Zugriff/Sharing** (Maker teilen auf Agentenebene, Admins über Umgebungsrollen und Sicherheitsgruppen) und **Auditing** (Erstellung, Änderung, Freigabe, Löschung im admin center) gehören zur Governance.
- **Copilot Credits:** verbraucht durch Gespräche mit Modellaufruf, Wissensabruf mit semantischer Suche, modellgestützte Tool-/Workflow-Aufrufe, Evaluationsläufe, Agent-Flow-Aktionen, Prompt-Modelle (Basis/Standard/Premium), Computer-Use-Schritte (5/15). Reines Authoring nicht. Admins überwachen Kapazität im admin center; erschöpfte Kapazität → Kapazitätsfehler; Testsets fokussiert halten.

## Entscheidungshilfen für die Prüfung

### Welche Integration?

| Anforderung | Wahl | Warum nicht die anderen |
|---|---|---|
| Fragen aus statischen Artikeln mit Zitaten | **Copilot connector** | Real-time hat keine Zitate; Azure AI Search nur bei eigenem Index |
| Live-Daten, Replikation verboten | **Real-time Power Platform connector** | Copilot Connector kopiert nach Graph und hinkt |
| eigener Vektorindex, Relevanz-Tuning | **Azure AI Search** (Create new connection, Entra ID Integrated) | Connectors bieten keine Pipeline-Kontrolle |
| Aktion mit vorhandenem Connector | **Prebuilt connector tool** | kein Entwicklungsaufwand nötig |
| eigene API für mehrere Agenten/Flows/Apps | **Custom connector** | REST-Tool nur in Copilot Studio |
| eigene API, ein Agent, nicht produktiv | **REST API tool** | Custom Connector = Overhead |
| feste Schrittfolge, Genehmigung, parallele Schritte | **Agent flow** | Connector-Tool = ein Schritt; Flow muss aufrufbar konfiguriert sein |
| Einzelaufruf in einem Topic ohne Connector/OpenAPI/MCP | **Send HTTP request** | nicht teilbar |
| viele Agenten teilen Tools, zentrales Team | **MCP server** | aber nicht aus Topics aufrufbar |
| M365-Kontext (Mail, Kalender, Teams) ohne eigenen Server | **Work IQ MCP** | braucht M365-Copilot-Lizenz + Admin |
| keine API, stabile UI, regelbasiert | **RPA / Desktop flow** | Computer Use ist nicht deterministisch |
| keine API, variable UI, visuelle Entscheidungen | **Computer use** | Allowlist, Key Vault, Vorab-Check nicht vergessen |
| Partneragent auf fremder Plattform mit eigenem Reasoning | **A2A** | Connector liefert nur Daten, MCP nur Tools |
| Reasoning delegieren, gleiche Umgebung, anderes Team | **Connected Copilot Studio agent** | Child Agent teilt Lebenszyklus |
| Domänen gruppieren, ein Team, kein separates Publish | **Child agent** | Connected Agent = Hops und Governance |
| spezialisiertes Modell für eine Prompt-Aufgabe | **Foundry-Modell im Prompt builder** | Deployment- und Basismodellname |
| ganzer Agent mit Foundry-Reasoning | **Foundry agent** (Preview) | neues Portal, Endpoint + Agent ID |
| konversationelle Abfragen über OneLake | **Fabric Data agent** (Preview) | nur generative Orchestrierung |

### Welcher Knoten oder Mechanismus im Topic?

| Anforderung | Wahl |
|---|---|
| Antwort aus Wissensquellen an definierter Stelle | Generative answers node (Knotenquellen scopen, Condition für „nichts gefunden“) |
| Antwort formen (Ton, Format, Umfang) | Custom instructions am Knoten |
| Klassifizieren/extrahieren mit fester Struktur | Custom prompt als Tool-Knoten |
| Suche mit Nachbearbeitung vor der Antwort | Create search query + Perform custom search |
| API ohne Connector einbinden (Custom data) | HTTP request + Set variable (ForAll) → Content/ContentLocation/Title |
| ein Wert erzwingen | Question node |
| mehrere Werte in einem Turn | Ask with Adaptive Card (+ Condition auf leere Variablen) |
| Vorschläge, keine Pflicht | Quick replies |
| strukturierte Anzeige | informative Adaptive Card (3–5 Datenpunkte, ColumnSet, v1.5 bei Teams) |
| garantierte Übergabe an einen Child Agent | Agent redirect node mit Inputs |
| Fehler eines HTTP-Aufrufs abfangen | Continue on error + Condition auf Statuscode |
| lange laufender Flow | Job-ID zurückgeben, Rest asynchron nach Respond to the agent |

### Welche Stellschraube bei Fehlverhalten?

| Symptom | Ursache | Maßnahme |
|---|---|---|
| Tool wird nie aufgerufen | vage Beschreibung | Beschreibung aus Nutzersicht mit Domäne, Daten, Synonymen |
| falscher Child/Connected Agent | überlappende Beschreibungen | nicht überlappend formulieren; Activity Map; ggf. Orchestrator-Instructions |
| Orchestrator umgeht Child Agent | Tool auch für Orchestrator sichtbar | „Allow agent to decide dynamically“ deaktivieren |
| Flow fehlt im Tool-Picker | Trigger/Solution fehlt | When an agent calls the flow, Respond to the agent (async off), Solution-Flow |
| Flow-Timeout | > 100 s | Job-ID-Muster |
| Karte fehlt in Teams | Schema v1.6 | auf v1.5 designen, im Kanal testen |
| Copilot-Connector liefert nichts in Teams | Scope fehlt | ExternalItem.Read.All in manueller Auth |
| Connected Agent fehlt in Liste | Setting aus / andere Umgebung / unveröffentlicht | Let other agents connect…; gleiche Umgebung; publishen |
| Foundry 404 | Legacy-Portal | im neuen Foundry-Portal neu anlegen |
| Fabric-Redirect ohne Wirkung | Redirect nicht unterstützt | Beschreibung schärfen, generatives Routing |
| Azure-AI-Search-Dialog blockiert | manuelle Verbindung | externen Zugriff zurücksetzen / Agent neu anlegen; künftig Create new connection |
| MCP-Verbindung scheitert | SSE-Transport | auf Streamable HTTP migrieren |
| Premium-Connector in Prod blockiert | DLP | Admin/Reklassifizierung oder anderes Muster |
| Maker-Anmeldedaten nicht wählbar | anonymer Kanal | Authentifizierung konfigurieren |
| Nutzer meldet sich je Connector an (Teams) | custom AD Auth | kein SSO für Connectors – einplanen |
| Evaluation grün, Nutzer Access denied | Profil mit zu vielen Rechten | Authenticated user profile = Zielnutzer; als Standardnutzer validieren |
| Monitor: Erfolgsrate sinkt, Tool scheitert | Runtime failure | Verbindung/Dienst prüfen, nicht Instructions |
| Fehler ohne Tool-Bezug, Kapazitätsmeldungen | Credits erschöpft | Admin: Kapazität/Limits |
| Computer Use dupliziert Einträge | nicht idempotent | Vorab-Check, Supervision als Gate |
| Computer Use: viele Review-Anfragen | unklare Anweisungen | Anweisungen präzisieren |
| Desktop-Flows stoppen | Maschine für Computer Use aktiviert | dedizierte Maschine |

### Häufige Stolperfallen

- Generative answers node ≠ Conversational boosting; Knotenquellen schlagen Agentenquellen; nur die ersten drei Custom-data-Datensätze zählen.
- Custom instructions gelten nur am Knoten und nur mit beobachtbaren Vorgaben; Custom prompts suchen nichts.
- Agent Flows: 100 Sekunden; Asynchronous response aus; keine Copy/Share/Co-Owner; Credits statt Lizenz; Konvertierung von Cloud-Flows ist endgültig.
- HTTP-Request: Anmeldedaten in Environment variables; Raise an error ist Standard; Content-Type-Header bei POST.
- Adaptive Cards: Teams/Live Chat v1.5, Web v1.6; Test-Bereich ≠ Teams; kein Action.Execute im Web; leere Variablen bei nicht abgesendeter Karte.
- Child Agent: Beschreibung = Routing, Instructions = Ausführung; Trigger-Reihenfolge und Priority; Enabled vs. Delete.
- Connected Agent: lokale Beschreibungskopie; Verlauf standardmäßig mit; eigene Transkripte; Trust Boundary.
- Foundry/Fabric/Agents SDK sind Preview; Fabric ohne Redirect und nicht in M365 Copilot; Foundry-Agent aus neuem Portal.
- Copilot Connector: Admin richtet ein, ExternalItem.Read.All; Real-time: keine Zitate, DLP, Premium-Lizenz; Azure AI Search: Create new connection, metadata_storage_path zuerst.
- MCP: nur generativ, nicht aus Topics, Beschreibungen serverseitig, Streamable HTTP, Allow all als Governance-Entscheidung; Work IQ braucht M365-Copilot-Lizenz.
- REST API tool nur in Copilot Studio; Custom connector muss geteilt sein; nur benötigte Endpunkte.
- Computer Use: ~80/35 %, nicht idempotent, Prompt Injection → Allowlist; Cloud PC pool empfohlen; BYO-Maschine verliert Desktop-Flows; 5/15 Credits je Schritt; Logs sieben Tage Standard.
- Evaluate: General quality vergleicht nicht mit erwarteten Antworten; positive und negative Routing-Tests; Läufe kosten Credits.
- Publish ≠ verfügbar: Tenant-Freigabe; als Standardnutzer validieren; „Make agent available in Microsoft Copilot“.
- Authenticate with Microsoft = nur Teams; manuell für andere Kanäle; Require users to sign in = System-Topic; Redirect URI token.botframework.com.
- Sitzung endet nach 30 Minuten Stille, 60 Minuten Dauer oder 100 Turns.
