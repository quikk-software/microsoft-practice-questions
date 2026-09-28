# AB-410 Nachschlagewerk — Intelligent Applications Builder Associate

Dieses Nachschlagewerk fasst die vier offiziellen Lernpfade der AB-410 zu einem zusammenhängenden Text zusammen. Es ist bewusst als **roter Faden** aufgebaut: erst die Architektur (wie hängen die Bausteine zusammen), dann die Datenschicht (Dataverse), darauf die Anwendungen (Canvas-Apps, modellgesteuerte Apps, Power Pages), dann die Automatisierung (Power Automate, Geschäftsprozessflüsse) und zuletzt die KI-Schicht (Plans, AI Builder, Copilot Studio) sowie die Erweiterungspunkte für Entwickler. Am Ende stehen Entscheidungstabellen für die typischen „Welche Komponente passt?“-Fragen der Prüfung.

Alle Definitionen stammen aus den Microsoft-Learn-Inhalten der Lernpfade; Produktbegriffe bleiben englisch (so wie sie in der Prüfung vorkommen), Erklärungen sind deutsch.

## Die Architektur: Wie alles zusammenhängt

Die Power Platform besteht aus **sechs Komponenten**: **Power Apps** (Benutzeroberflächen), **Power Automate** (Prozessautomatisierung), **Power Pages** (externe Websites), **Microsoft Copilot Studio** (Agenten), **AI Builder** (KI-Modelle und Prompts) und **Power BI** (Analysen). Darunter liegt **Microsoft Dataverse** als gemeinsame, einheitliche Datenschicht. Microsoft beschreibt die Plattform heute als **AI-first**: KI ist nicht angeflanscht, sondern in jede Komponente eingebaut – sowohl beim Bauen (Copilot in den Designern, Plans) als auch beim Benutzen (Copilot-Chat in Apps, Agenten auf Websites).

```
                 Nutzer intern                     Nutzer extern
        ┌──────────────┬──────────────┐        ┌──────────────────┐
        │ Canvas-App   │ Model-driven │        │ Power Pages Site │
        │ (Power Apps) │ App          │        │ (+ Web Agent)    │
        └──────┬───────┴──────┬───────┘        └────────┬─────────┘
               │              │                         │
   ┌───────────┴──────────────┴─────────────────────────┴───────────┐
   │  Automatisierung & KI: Power Automate (Cloud-/Desktop-/Agent-   │
   │  Flows, Approvals) · Copilot Studio (Agenten, Topics, Tools)    │
   │  · AI Builder (Prompts, Modelle) · Business Rules · Plug-ins    │
   └───────────────────────────────┬─────────────────────────────────┘
                                   │
   ┌───────────────────────────────┴─────────────────────────────────┐
   │  Microsoft Dataverse: Tabellen · Spalten · Beziehungen · Keys    │
   │  Sicherheitsrollen · Teams · Auditing · Lösungen (ALM)          │
   └───────────────────────────────┬─────────────────────────────────┘
                                   │  Connectors (Standard/Premium/Custom)
   ┌───────────────────────────────┴─────────────────────────────────┐
   │  Externe Systeme: SharePoint, Excel, SQL, Dynamics 365 F&O,      │
   │  Azure AI Foundry, REST-APIs, MCP-Dienste, On-Premises (Gateway) │
   └─────────────────────────────────────────────────────────────────┘
```

Die wichtigsten Zusammenhänge, die man für die Prüfung verinnerlicht haben sollte:

- **Dataverse ist der Kern.** Modellgesteuerte Apps und Power Pages setzen Dataverse zwingend voraus; Canvas-Apps können es nutzen, aber auch SharePoint, Excel, SQL oder hunderte Connectors. Alles, was in Dataverse als Metadaten definiert ist (Tabellen, Spalten, Beziehungen, Geschäftsregeln, Sicherheitsrollen), gilt automatisch für jede App, jeden Flow und jeden Agenten, der diese Daten nutzt.
- **Eine Umgebung ist der Container.** Apps, Flows, Sites, Daten und Sicherheitsrollen leben in einer *environment*. Erst mit Dataverse-Datenbank gibt es Dataverse-Sicherheitsrollen; ohne Datenbank gibt es nur die Umgebungsrollen Environment Admin und Environment Maker.
- **Lösungen transportieren alles.** *Solutions* verpacken Tabellen, Apps, Flows, Agenten, Pläne, Seiten usw., damit sie zwischen Umgebungen (Entwicklung → Test → Produktion) bewegt werden können (ALM, Pipelines, Git-Integration).
- **Sicherheit hat Schichten.** Lizenz und Entra-ID-Konto → Zugriff auf die Umgebung → Dataverse-Sicherheitsrolle (Tabellenprivilegien × Zugriffsebenen) → optional Spaltensicherheit, Teams, Hierarchie → zusätzlich das Teilen der App. Für Power Pages gilt ein eigenes Modell aus Web Roles, Seiten- und Tabellenrechten.
- **Logik gibt es auf mehreren Ebenen.** In der Datenschicht (Business Rules, Formel-/Rollup-/Prompt-Spalten, Plug-ins, klassische Workflows), in der App (Power Fx, JavaScript in Formularen, Commanding), in der Prozessführung (Business Process Flows) und in der Automatisierung (Cloud-Flows, Agent-Flows, Agenten). Die Prüfung fragt ständig, *welche* Ebene für eine Anforderung richtig ist.
- **KI liegt quer über allem.** Plans generieren aus einer Beschreibung Datenmodell, Apps, Flows und Agenten. AI Builder liefert Prompts und Modelle, die Apps, Flows und Agenten aufrufen. Copilot Studio baut Agenten, die auf Dataverse-Wissen zugreifen, Flows als Tools nutzen und in Apps (Agent Feed, Copilot-Chat) und auf Power-Pages-Sites (Web Agents) erscheinen.

## Plattform, Umgebungen und Rollen

### Umgebungen (environments)

Eine *environment* ist ein Container für Apps, Flows, Verbindungen, Daten und Sicherheitsrollen. Organisationen trennen typischerweise nach Zweck (Entwicklung, Test, Produktion); Lösungen werden zwischen den Umgebungen transportiert. Beim Erstellen eines Cloud-Flows mit dem Dataverse-Connector wählt man deshalb möglichst *current environment*, damit derselbe Flow nach dem Deployment automatisch die Daten der jeweiligen Umgebung nutzt.

Besonderheiten:

- Jeder neue Power-Apps-Nutzer wird automatisch **Environment Maker der Standardumgebung** (*default environment*).
- Wer einer Umgebung hinzugefügt wird, bekommt automatisch die Rolle **Environment Maker**.
- Ein **On-premises data gateway** kann nur in der Standardumgebung installiert werden.
- Power-Pages-Sites, Plans und Copilot-Funktionen setzen eine Umgebung **mit Dataverse-Datenbank** voraus.

### Rollentypen

Dataverse-Sicherheit kennt Rollen auf verschiedenen Ebenen. Für die Prüfung ist entscheidend, dass eine Rolle auf höherer Ebene **nicht** automatisch Datenzugriff auf niedrigerer Ebene bedeutet.

| Rollentyp | Reichweite | Beispiele |
|---|---|---|
| Tenant-Adminrollen | ganzer Tenant | Global Administrator, Power Platform administrator, Dynamics 365 administrator |
| Umgebungsrollen | eine Umgebung ohne Dataverse-DB | Environment Admin, Environment Maker |
| Dataverse-Sicherheitsrollen | eine Umgebung mit Dataverse-DB | System Administrator, System Customizer, Basic User, App Opener |
| App-spezifische Rollen | eine App | Dynamics 365 Sales, Customer Service, Field Service |

Wichtige Regeln:

- Tenant-Adminrollen (Global Admin, Power Platform Admin) können Umgebungen verwalten, erhalten aber **keinen Zugriff auf Dataverse-Daten** – dafür muss je Umgebung explizit System Administrator zugewiesen werden.
- **Environment Admin** (ohne Datenbank): Nutzer zu Admin/Maker-Rollen hinzufügen, Dataverse-Datenbank bereitstellen, Ressourcen verwalten, DLP-Richtlinien setzen. Sobald eine Datenbank existiert, braucht man für volle Adminrechte **System Administrator**.
- **Environment Maker**: darf Apps, Verbindungen, Custom Connectors, Gateways und Flows erstellen und Apps teilen – hat aber **keinerlei Privilegien auf Daten**. Wer Tabellen anlegen soll, braucht zusätzlich **System Customizer**.
- **System Customizer**: volle Anpassungsrechte und Zugriff auf alle Daten *benutzerdefinierter* Tabellen; bei Account, Contact und Activity nur die selbst erstellten Zeilen.
- **Basic User**: nur eigene Zeilen (User-Ebene) und nur auf Standardtabellen wie Account/Contact – für benutzerdefinierte Tabellen sind eigene Rollen nötig.
- **App Opener**: geschützte Minimalrolle, die als Vorlage zum Kopieren dient und die Berechtigung enthält, modellgesteuerte Apps überhaupt zu öffnen.
- **Delegate**: enthält das Privileg *Act on Behalf of Another User* (nötig für die *Run as*-Option in Flows).

Was die Standardrollen anlegen dürfen (Auszug): Canvas-App – alle vier; Dataverse-Tabellen – nur System Customizer und System Admin; modellgesteuerte App – Maker, Customizer, Admin (nicht Environment Admin); Desktop-Flows und AI Builder – nur Customizer und Admin.

### Lizenzen, Connectors und DLP

- Ein Nutzer lässt sich einer Umgebung nur hinzufügen, wenn seine **Lizenz** Dataverse erlaubt. Rollen werden im **Power Platform admin center** verwaltet, Lizenzen im **Microsoft 365 admin center** – das Entfernen einer Rolle entfernt keine Lizenz.
- **Standard connectors** (SharePoint, OneDrive, Excel Online, Teams, Outlook, Azure Blob) sind in den meisten Lizenzen enthalten; **Premium connectors** (Dataverse, SQL Server, Salesforce, SAP, ServiceNow, HTTP mit Entra ID) brauchen eine **Per App**- oder **Per User**-Lizenz. Ein **Custom connector** verpackt eine beliebige REST-API (OpenAPI-Definition) und steht danach in Power Apps, Power Automate, Copilot Studio und Logic Apps zur Verfügung.
- **DLP-Richtlinien** (data loss prevention) legen fest, welche Connectors zusammen in Apps und Flows genutzt werden dürfen – gesetzt von Environment- bzw. Tenant-Admins.
- Der **On-premises data gateway** verbindet die Cloud sicher mit lokalen Datenquellen (z. B. SQL Server im eigenen Rechenzentrum).

### Lösungen und ALM

**Application Lifecycle Management** ist der bewusst gesteuerte Zyklus Konzept → Planung → Entwicklung → Test → Bereitstellung → Wartung. Die Werkzeuge:

- **Solutions** sind der Verpackungsmechanismus: Apps, Flows, Tabellen, Verbindungsreferenzen, Agenten, Pläne, Seiten usw. werden gebündelt exportiert und importiert. Komponenten außerhalb einer Lösung haben kaum ALM-Unterstützung. **Unmanaged** (nicht verwaltet) ist für die Entwicklung und direkt bearbeitbar; **managed** (verwaltet) ist für die Verteilung und nur über eine neue Version änderbar (z. B. sind Ansichten in einer verwalteten Lösung nicht editierbar; ein aus einer verwalteten Lösung erzeugter Plan landet in einer neuen unverwalteten Lösung).
- Der **Publisher** einer Lösung gibt das Präfix für Schemanamen vor (z. B. `cref2_Pet`) – deshalb Tabellen innerhalb einer Lösung anlegen.
- **Pipelines in Power Platform** sind das eingebaute Low-Code-Deployment: Dev-, Test- und Prod-Umgebung werden verbunden, eine Lösung wird mit wenigen Klicks aus Power Apps bereitgestellt, jeder Lauf ist protokolliert (wer, was, wann).
- **Power Platform Git integration** synchronisiert Lösungen mit einem Git-Repository für Branching und Pull Requests.
- Für Power Pages gibt es zusätzlich die **Power Platform CLI** (Site-Konfiguration herunterladen/hochladen) plus Azure Pipelines.
## Dataverse: Das Datenmodell

**Microsoft Dataverse** ist die Cloud-Datenplattform der Power Platform: compliant, sicher, skalierbar, global verfügbar. Es ist mehr als eine Datenbank – ein *governed, schema-driven* Datenplattform mit Metadaten, Sicherheitsrollen, Geschäftsregeln, Beziehungen, Auditing und Prozessautomatisierung. Vorteile laut Lernpfad: Metadaten beschleunigen die App-Entwicklung, granulare Zugriffskontrolle auf Tabellen/Zeilen/Spalten, eingebaute Logik auf Spaltenebene, Import/Export (Excel, Power Query), Auditing, von Microsoft verwaltete Infrastruktur, Verschlüsselung at rest und in transit, Basis von Dynamics 365.

Das Datenmodell hat drei zentrale Elemente: **Tabelle**, **Spalte** und **Beziehung**. Wer diese drei sauber modelliert, bekommt modellgesteuerte Apps fast geschenkt – denn deren Oberfläche wird aus den Metadaten generiert.

### Tabellen (tables)

Eine **Tabelle** ist eine logische Struktur aus Zeilen (Datensätzen) und Spalten. Eine Dataverse-Tabelle bringt zusätzlich mit: **Beziehungen**, **Schlüssel**, **Formulare**, **Ansichten**, **Diagramme**, **Dashboards**, **Geschäftsregeln**, **Metadaten** und **Befehle** (Commands). Genau diese Komponenten werden später zu den Bausteinen der modellgesteuerten App.

**Standard vs. custom:** Dataverse liefert Standardtabellen (Account, Contact, Activity …) mit vordefinierten Metadaten. Regel: wann immer möglich Standardtabellen nutzen (ggf. umbenennen oder erweitern); Standardtabellen können nicht gelöscht, aber per Sicherheitsrolle ausgeblendet werden. Eigene Tabellen (custom tables) nur, wenn Standard nicht reicht.

**Erstellen:** im Power Apps maker portal unter Tables → New table. Der moderne Weg ist der visuelle Designer *Create new tables* (auch mit Copilot: Tabelle in Alltagssprache beschreiben, aus SharePoint-Liste, Excel/CSV importieren). *Set advanced properties* braucht man für Einstellungen, die es beim visuellen Anlegen nicht gibt.

**Eigenschaften, die nach dem Erstellen NICHT mehr änderbar sind:**

- **Schema name** (interner Systemname mit Publisher-Präfix, ohne Leerzeichen) – der *Display name* ist dagegen jederzeit änderbar.
- **Table type**: *Standard* (Regelfall), *Activity* (zeitgebundene Interaktionen wie Aufgaben, Anrufe, E-Mails), *Virtual* (externe Daten wie native Tabellen), *Elastic* (Azure Cosmos DB, zig Millionen Zeilen).
- **Ownership**: *User or team owned* (zeilenbezogene Rechte – Zugriffsebenen User/Business Unit/… greifen, Assign und Share möglich) oder *Organization-owned* (Zugriff nur auf Organisationsebene; keine Owner-Spalte, kein Assign/Share, Zugriffsebenen nur None/Organization).

Weitere Optionen: Plural name, Description, *Enable attachments* (Dateiupload je Zeile), Auditing (siehe unten), *Business process flows (fields will be created)* – muss gesetzt sein, damit die Tabelle in einem BPF nutzbar ist.

#### Primärschlüssel, Primärspalte und alternate keys

- Jede Zeile hat einen **Primärschlüssel** als **GUID** (z. B. `123e4567-e89b-…`), automatisch erzeugt. Die Spalte heißt wie die Tabelle („Pet“) und ist für Menschen nicht sprechend. Externe Systeme kennen die GUID meist nicht.
- Die **primary column** (Standardname „Name“) ist die lesbare Textspalte, mit der Zeilen in Lookups, Formularköpfen und Browsertiteln dargestellt werden. Schemaname nur bis zur Erstellung änderbar, Anzeigename jederzeit; der Datentyp kann später auf Autonumber umgestellt werden. Sie ist *nicht* automatisch eindeutig.
- Ein **alternate key** macht eine oder mehrere Spalten (Decimal, Whole Number, Text, Date Time, Lookup, Choice) zum eindeutigen, indizierten Schlüssel – z. B. eine Bestellnummer aus einem ERP. Dataverse erzwingt Pflicht und Eindeutigkeit; das Anlegen scheitert bei vorhandenen Duplikaten. Bis zu 10 Schlüssel je Tabelle; mehrspaltig = *compound key*. Nutzen: Integration ohne GUID (Upsert), schnellere Suche/Filterung, Eindeutigkeit der Primärspalte.

#### Virtuelle Tabellen und Dual-write

Beide verbinden Dataverse mit externen Daten, aber grundverschieden:

| | Virtual tables | Dual-write |
|---|---|---|
| Daten | bleiben in der Quelle, keine Kopie | werden repliziert (bidirektional, nahezu Echtzeit) |
| Operationen | volle CRUD direkt auf der Quelle | Änderungen auf beiden Seiten synchronisiert |
| Beziehungen | zu nativen Tabellen (1:N/N:1) und anderen virtuellen Tabellen | Teil des gemeinsamen Datenlayers mit F&O |
| Wann | Echtzeitzugriff, große Datenmengen, wenig Dataverse-Speicher, leseintensiv | Offline-Fähigkeit, enge Kopplung, replizierter Datensatz |

Alle OData-Tabellen der Finance-and-Operations-Apps stehen als virtuelle Tabellen bereit; Power Pages kann damit externe Websites speisen.

#### Daten importieren

*Import > Import data* öffnet **Power Query**: Quelle wählen (SharePoint-Liste, Excel, SQL …), Daten im Editor formen (Choose/Remove columns, Datentypen; jeder Schritt in *Applied steps*), *Load to existing table* oder neue Tabelle, Spaltenzuordnung (*Auto map*, ggf. manuell), Aktualisierung (*Refresh manually*), Publish. „Import data from Excel“ ist die Legacy-Funktion.

### Spalten (columns)

Eine Spalte speichert eine einzelne Information je Zeile und hat **genau einen Datentyp**. Der Typ lässt sich nachträglich nicht ändern (Ausnahme: Text ↔ Autonumber); sonst heißt es löschen und neu anlegen – mit Datenverlust. Mehr als einige hundert Spalten sind ein Zeichen für ein Strukturproblem. Standardspalten von Standardtabellen können nicht gelöscht werden.

Beim Anlegen: Display name, Description, **Data type**, **Format**, **Behavior** (Simple oder Calculated/Rollup), **Required** (Optional / Business recommended / Business required), **Searchable** (nur durchsuchbare Spalten erscheinen in Advanced Find und beim Anpassen von Ansichten), Maximum character count bzw. Min/Max, **Allow form fill assistance** (Copilot-Vorschläge in Formularen – für sensible Spalten abschalten).

#### Spaltentypen im Überblick

| Kategorie | Typ | Merkmale |
|---|---|---|
| Text | Single line of text | bis 4.000 Zeichen (Standard 100); Formate Plain text, Text area, Email, Phone number, Ticker Symbol, URL |
| Text | Multiple lines of text | bis 1.048.576 Zeichen (Standard 2.000); Plain oder Rich text |
| Text | Autonumber | automatisch erzeugte Zeichenfolge (siehe unten) |
| Zahl | Whole number | Ganzzahl ±2,1 Mrd. (Big: ±9,2 Trillionen); Formate None, Duration (Minuten), Time zone, Language code (LCID) |
| Zahl | Decimal | bis 10 Nachkommastellen, exakt gespeichert |
| Zahl | Float | bis 5 Nachkommastellen, nur Näherung – nicht in berechneten Spalten nutzbar; nur wenn nötig |
| Zahl | Currency | erzeugt vier Spalten: Betrag, Currency(Base) (schreibgeschützt, Basiswährung), Währungs-Lookup, Exchange rate; in Formeln mit `Decimal()` umwandeln |
| Datum | Date and time | Format *Date and time* oder *Date only*; Time zone adjustment *User local* oder *Time zone independent* |
| Beziehung | Lookup | Verweis auf eine Zeile einer anderen Tabelle → erzeugt N:1-Beziehung |
| Beziehung | Customer | Lookup wahlweise auf Account oder Contact (zwei N:1-Beziehungen) |
| Auswahl | Choice | eine Option aus fester Liste (Ganzzahl + Label); *global* (wiederverwendbar über Tabellen) oder *local* |
| Auswahl | Choices | Mehrfachauswahl; **nicht** in Workflows, BPFs, Geschäftsregeln, Diagrammen, Rollup-/berechneten Spalten; nicht in Legacy-/Bulk-Edit-Formularen |
| Auswahl | Yes/no | boolesch, Labels frei benennbar |
| Datei | File | bis 131.072 KB (Standard 32.768) |
| Datei | Image | ein Bild je Zeile, bis 30.720 KB; kann Primärbild oben links im Formular sein |
| Berechnet | Formula | Power-Fx-Formel, schreibgeschützt, z. B. `Decimal('Contract Amount') * (Probability / 100)` |
| Berechnet | Rollup | aggregiert Kindzeilen (siehe unten) |
| KI | Prompt | speichert das Ergebnis eines KI-Prompts (siehe unten) |

**Systemspalten** (nicht selbst anlegbar): Unique Identifier (GUID), **Owner** (Lookup auf Nutzer/Team bei user-or-team-owned), PartyList (mehrere Verweise auf mehrere Tabellen, z. B. E-Mail To/Cc), Regarding (ein Verweis auf mehrere Tabellen, in Aktivitäten), **Status** (bei eigenen Tabellen nur Active/Inactive) und **Status Reason** (Detailoptionen je Status, erweiterbar).

**Faustregel Choice vs. Lookup:** Choice für Kategorien mit überschaubarer, fester Liste. Sobald die Werte eigenständige Datensätze sind (hunderte Hersteller), gehört eine eigene Tabelle plus Lookup her – zu viele Optionen sind unbrauchbar und erlauben keinen Standardwert.

#### Autonumber

Erzeugt beim Anlegen einer Zeile automatisch einen alphanumerischen Wert. Typen: **String prefixed number** (`Contoso-1000`, `-1001` …), **Date prefixed number** (UTC-Datum + laufende Nummer), **Custom** (Konstanten, `{SEQNUM:n}`, Datum, Zufallszeichen). Der **seed value** ist der Startwert der Nummer (Standard 1000). Eine bestehende Textspalte lässt sich jederzeit auf Autonumber umstellen und zurück.

#### Rollup-Spalten

Aggregieren Werte verknüpfter Kindzeilen (Sum, Count, Min, Max …), periodisch vom System berechnet. Grenzen: max. **10 je Tabelle, 100 je Organisation**; nur **1:N**-Beziehungen (keine N:N, nicht mit ActivityPointer/ActivityParty); keine Referenz auf andere Rollup- oder komplexe Formelspalten; lösen **keine Workflows/Flows** aus; aktualisieren ModifiedOn/ModifiedBy **nicht**.

#### Prompt-Spalten und Row summaries

Eine **Prompt column** führt beim Speichern einer Zeile einen natürlichsprachlichen Prompt gegen andere Spalten derselben Zeile aus und speichert das Ergebnis asynchron (schreibgeschützt). Voraussetzungen: *Copilot* und *AI Prompts* in den Feature settings der Umgebung; Lizenzmodell wie AI-Builder-Prompts. Max. **fünf** je Tabelle; Eingabespalten dürfen **keine** Formel-, File-, Image- oder andere Prompt-Spalten sein; **Filter conditions** begrenzen, für welche Zeilen der Prompt läuft (spart AI-Credits); je Prompt-Spalte entstehen `_PromptColumnStatus` und `_PromptColumnDetails`. Testen mit *Filter knowledge* auf einen Testdatensatz.

Ein **Row summary** ist dagegen eine Copilot-Zusammenfassung, die *bei Bedarf* oben im Hauptformular (einklappbare Leiste) oder aus Ansichten erzeugt und **nicht gespeichert** wird. Konfiguration auf Tabellenebene (Customizations > Row summary), gilt für alle Hauptformulare; braucht die Umgebungseinstellung *AI insight cards*; lösungsfähig als Komponente *AI Skill Config*. Nicht verfügbar für Case/Lead/Opportunity (eigene Dynamics-Zusammenfassungen).

### Beziehungen (relationships)

Beziehungen definieren, wie Zeilen verschiedener (oder derselben) Tabellen zusammenhängen, und sind die Basis von Datennormalisierung. Zwei Typen:

- **One-to-many (1:N)**: viele Zeilen der verweisenden Tabelle (Kinder) zeigen auf eine Zeile der referenzierten Tabelle (Elternteil). **Many-to-one (N:1)** ist *dieselbe* Beziehung aus Sicht der Kindtabelle – im Portal erscheint sie unter Tabelle A als 1:N und unter Tabelle B als N:1. Eine **Lookup-Spalte** erzeugt automatisch eine N:1-Beziehung; umgekehrt legt eine manuell erstellte 1:N-Beziehung automatisch eine Lookup-Spalte in der Kindtabelle an.
- **Many-to-many (N:N)**: Zeilen sind gleichberechtigte Peers ohne Hierarchie. Relationale Datenbanken kennen das nicht direkt – Dataverse nutzt eine **verborgene Intersect-Tabelle**, die keine eigenen Spalten oder Formulare erlaubt. Sichtbar werden N:N-Daten über **Subgrids** in Formularen.

Konsequenzen an anderen Stellen: Rollup-Spalten können nur 1:N auswerten; das Privileg **Append** ist bei N:N auf beiden Tabellen nötig; in Power Automate lassen sich N:N-Beziehungen nur mit *Relate rows* herstellen (keine Seite hat eine Lookup-Spalte); ein BPF-Tabellenwechsel setzt eine 1:N-Beziehung voraus.

### Auditing

Protokolliert Änderungen an Zeilen und Nutzerzugriffe. Aktivierung auf **drei Ebenen**, hierarchisch: **Umgebung → Tabelle → Spalte** (Spalten-Auditing braucht Tabellen- und Umgebungs-Auditing). Einsicht: **Audit History**-Tab am Datensatz (modellgesteuerte App) oder **Audit Summary View** für die ganze Umgebung (admin center); auch per Web API/SDK. Braucht System Administrator oder System Customizer; Logs verbrauchen Log-Speicherkapazität.

Davon getrennt: **Activity logging** über die Umgebungseinstellung **Read logs** sendet Aktivitätsprotokolle an das **Microsoft Purview compliance portal** – für zentrale Compliance-Auswertung über Microsoft 365 und Power Platform hinweg. Für In-App-Szenarien genügt die Dataverse-Audit-History.

## Dataverse: Logik in der Datenschicht

Logik, die in Dataverse selbst definiert wird, gilt **kanalunabhängig** – egal ob eine Canvas-App, eine modellgesteuerte App, ein Flow oder ein API-Aufruf die Daten anfasst. Das reduziert redundanten Code in Apps.

| Mechanismus | Wann | Läuft wo |
|---|---|---|
| **Business rules** | Validierung, Pflichtfelder, Werte setzen, Ein-/Ausblenden – ohne Code | Formular und/oder Server (je Scope) |
| **Formula / Rollup / Prompt columns** | berechnete bzw. KI-generierte Werte | Server (Spalte) |
| **Business process flows** | Nutzer Schritt für Schritt durch einen Prozess führen | nur modellgesteuerte Apps |
| **Real-time workflows** (klassisch) | Automatisierung ohne Nutzerinteraktion, synchron | Server |
| **Plug-ins (C#)** | komplexe, transaktionale Regeln, die immer gelten müssen | Server, Ereignishandler |
| **Custom API** | benannte Geschäftsoperation als Endpunkt (`CalculateInvoiceRisk`) | Dataverse API |
| **Cloud flows** | asynchrone Automatisierung über Connectors | Power Automate |

### Business rules

Deklarative Regeln (Drag-and-drop-Designer mit Bedingungen und Aktionen) auf **Tabellenebene**. Aktionen: Werte setzen/leeren, **Pflichtgrad ändern**, Spalten **ein-/ausblenden**, **aktivieren/sperren**, Eingaben **validieren mit Fehlermeldung**, Empfehlungen anzeigen. Sie ersetzen viel JavaScript in Formularen.

Der **Scope** entscheidet über die Reichweite:

- **Individual form** – nur ein bestimmtes Formular der modellgesteuerten App
- **All forms** – alle Formulare der modellgesteuerten App
- **Entity** (Standard) – alle Formulare **und** serverseitige Create/Update-Operationen, also auch Importe, Flows, API-Aufrufe

Canvas-Apps übernehmen Regeln auf Tabellenebene ebenfalls, aber **ohne** Ein-/Ausblenden, Aktivieren/Sperren und Empfehlungen. Eine Regel muss nach dem Speichern **aktiviert** werden.

### Plug-ins, Custom APIs und JavaScript

- **Dataverse plug-ins** sind in C# geschriebene Ereignishandler für Datenoperationen (Create, Update, Delete). Für den Endnutzer unsichtbar, garantieren sie Konsistenz über alle Kanäle. Gebaut von Entwicklern.
- **Custom APIs** erweitern die Dataverse-API um eigene Endpunkte, die Flows oder externe Systeme als benannte Operation aufrufen.
- **JavaScript client-side code** (Web Resources) übernimmt in modellgesteuerten Formularen UI-Verhalten, das Business Rules und Power Fx nicht ausdrücken können (komplexe dynamische Sichtbarkeit, Integration eines Kartendienstes). Faustregel der Lernpfade: erst Business Rule oder anderes Formular, Skripte nur, wenn es nicht anders geht; per Skript versteckte Elemente standardmäßig verbergen.

## Dataverse: Sicherheit

Dataverse nutzt **rollenbasierte Zugriffskontrolle (RBAC)**: Nutzer erhalten eine oder mehrere **Sicherheitsrollen**; jede Rolle ist eine Sammlung von **Privilegien** mit **Zugriffsebenen** je Tabelle. Ohne mindestens eine Rolle: kein Zugriff auf Dataverse, keine App-Ausführung. Standardrollen sind nicht editierbar – für eigene Apps kopiert man eine Standardrolle oder erstellt eine eigene (Prinzip der minimalen Rechte). Verwaltung im Power Platform admin center unter Settings > Users + permissions > Security roles; beim Anlegen sind Rollenname und **Business unit** Pflicht, außerdem *Member's privilege inheritance* und der Schalter *Include App Opener privileges* (für modellgesteuerte Apps anlassen).

### Privilegien

| Privileg | Bedeutung |
|---|---|
| Create | neue Zeile anlegen |
| Read | Zeile öffnen/lesen |
| Write | Zeile ändern |
| Delete | Zeile endgültig löschen |
| Append | die aktuelle Zeile an eine andere anhängen (Notiz an Opportunity anhängen – Append auf Notiz) |
| Append To | an die aktuelle Zeile etwas anhängen lassen (Append To auf Opportunity) |
| Assign | Besitz an anderen Nutzer übertragen |
| Share | Zugriff gewähren und eigenen behalten |

Organisationseigene Tabellen haben **kein Assign und Share**. Bei N:N-Beziehungen braucht man Append auf **beiden** Tabellen. Dazu kommen **Privacy-Privilegien** (Export to Excel) und **Miscellaneous-Privilegien** (Bulk Edit, Merge, Export/Import Customizations, View Audit History), meist nur None oder Organization.

### Zugriffsebenen

Jedes Privileg hat eine Ebene, die bestimmt, wie tief in der **Business-Unit-Hierarchie** es gilt:

| Ebene | Reichweite |
|---|---|
| None | kein Zugriff |
| User | eigene Zeilen + mit dem Nutzer, seinem Team oder der Organisation geteilte – typisch für Endnutzer |
| Business Unit | alle Zeilen der eigenen Business Unit (schließt User ein) |
| Parent: Child Business Unit | eigene und alle untergeordneten Business Units |
| Organization | alle Zeilen, unabhängig von der Hierarchie |

Organisationseigene Tabellen kennen nur None oder Organization. Schnellere Konfiguration über **Permission settings**: No Access, Full Access, Collaborate (alles sehen, nur Eigenes bearbeiten), Private (nur Eigenes sehen und bearbeiten), Reference (nur lesen), Custom.

### Teams

Teams gehören zu einer Business Unit, können aber Nutzer aus anderen Business Units enthalten; ein Nutzer kann in mehreren Teams sein.

| Team-Typ | Besitzt Zeilen | Hat Rollen | Mitglieder |
|---|---|---|---|
| **Owner team** | ja | ja | manuell |
| **Access team** | nein | nein – Zeilen werden mit dem Team **geteilt** (Read, Write, Append) | manuell |
| **Microsoft Entra ID group team** (Security oder Microsoft 365) | ja | ja | **dynamisch** aus der Entra-Gruppe (Assigned oder Dynamic User; nicht Dynamic Device) |

Gruppenteams sind der Weg zur automatischen Provisionierung: Nutzer in die Entra-Gruppe aufnehmen + Lizenz → sofort Zugriff; aus der Gruppe entfernen → Zugriff beim nächsten Aufruf weg, ohne manuelle Rollenzuweisung. Je Entra-Gruppe lassen sich Teams für Members, Owners und Guests mit eigenen Rollen anlegen; an Gruppenteams geteilte Apps sind sofort nutzbar.

**Member's privilege inheritance:** Eine Rolle mit *Direct User (Basic) access level and Team privileges* gibt Teammitgliedern die Rechte, als wären sie direkt zugewiesen – sie können eigene Zeilen erstellen und besitzen. Mit *Team privileges only* braucht jedes Mitglied für eigene Zeilen zusätzlich eine eigene Rolle.

### Weitere Sicherheitsbausteine

- **Column-level security** über **Column Security Profiles** schützt einzelne sensible Spalten (Gehalt, Ausweisnummer). Der Nutzer muss *sowohl* die Rolle (Tabelle/Zeile) *als auch* das Profil (Spalte) erfüllen.
- **Hierarchy security** (Manager-/Positionshierarchie) gibt Vorgesetzten Zugriff auf Zeilen ihrer Untergebenen – nur wenn für Organisation und Tabelle aktiviert.
- **Access Checker** (Befehl in modellgesteuerten Apps) zeigt je Zeile, woher der Zugriff eines Nutzers stammt: Ownership, Security role access, Shared access, Hierarchy access.
- **Run diagnostics** (Nutzerbereich im admin center) prüft: in Entra ID aktiviert, gültige Lizenz, Mitglied der Entra-Gruppe der Umgebung, mindestens eine Rolle (direkt oder per Gruppenteam).
- **Zugriff auf Formulare** per Rolle ist *kein* Datenschutz: Daten bleiben über Advanced Find oder Hintergrundautomatisierung erreichbar.

### Sicherheit und App-Freigabe: zwei Schritte

Das Teilen einer **modellgesteuerten App** ist ein Zwei-Schritt-Prozess: (1) Zugriff auf die Dataverse-Tabellen über eine Sicherheitsrolle, (2) die App selbst teilen. Wer die App ohne passende Rolle erhält, kann sie nicht nutzen. Zum Teilen braucht man Environment Admin oder System Admin. Bei Canvas-Apps mit Dataverse-Quelle wird die nötige Rolle direkt im Share-Dialog mit zugewiesen.
## Power Apps: Die drei App-Typen

**Power Apps** ist eine Suite aus Apps, Diensten und Connectors zum Bauen eigener Business-Apps ohne Code, gestartet über das **maker portal** (make.powerapps.com). Es gibt drei App-Typen:

| | Canvas-App | Modellgesteuerte App | Power-Pages-Site |
|---|---|---|---|
| Layout | pixelgenau, freie Leinwand | aus dem Datenmodell generiert | Website-Templates, Design Studio |
| Daten | beliebige Quellen (Excel, SharePoint, SQL, Dataverse, Connectors) | nur Dataverse | Dataverse |
| Logik | Power Fx | Formulare, Ansichten, BPFs, Business Rules, Power Fx-Commands, JavaScript | Liquid, JavaScript, Flows |
| Typisch für | aufgabenorientierte, mobile Oberflächen | datenintensive, verknüpfte Datensätze (Fallmanagement) | Kunden, Partner, Öffentlichkeit |
| Wo bauen | Power Apps Studio | App Designer | Power Pages design studio |

Beide App-Typen lassen sich in Microsoft Teams einbetten; Canvas-Apps laufen auch in **Power Apps Mobile**. Der Weg zur ersten App: *Start with data* (aus Quelle, Excel-Upload oder Beschreibung mit Copilot – Copilot-Wege brauchen Dataverse), *Start from blank* oder ein **Template** (zeigt Muster, nicht für eigene Daten out of the box gedacht).

## Canvas-Apps

### Datenquellen und Connectors

| Quelle | Kosten | Eigenschaften |
|---|---|---|
| **SharePoint** (Listen, Bibliotheken) | Standard | wie Tabellen, aber ohne Beziehungen (Schlüsselfelder manuell), Delegationslimit, einfache Spaltentypen/-namen empfohlen, Pflichtfelder besser in der App |
| **Excel** (als Tabelle formatiert, z. B. OneDrive) | Standard | Lernen und kleine Mengen; Bildspalten mit „[image]“; gesperrt, wenn jemand die Datei offen hat – nicht für Mehrbenutzer |
| **Dataverse** | Premium | mächtigste Quelle: nativer Zugriff ohne API-Konfiguration, große Mengen, Beziehungen, Copilot-Funktionen |
| **SQL** | Premium | große relationale Datenmengen; lokal über On-premises data gateway |

**Delegation** bedeutet serverseitiges Filtern/Sortieren durch die Quelle. Nicht delegierbare Abfragen liefern bei großen Mengen unvollständige Ergebnisse (Warnsymbol). Bewertungsraster für Connectors: Datenort, Lizenz, Volumen/Performance (Delegation), Lesen vs. Schreiben, Sicherheit/Compliance.

### Steuerelemente, Galerien, Formulare

Ein **Control** ist ein UI-Element (Label, Text input, Dropdown, Button, Icon, Form, Gallery, Media wie Kamera/Barcode/Add picture, Charts inkl. Power BI). Alles wird über *+ Insert* eingefügt; **jede Eigenschaft jedes Steuerelements kann eine Power-Fx-Formel sein**.

- **Gallery**: Layout-Container, der Datensätze der *Items*-Eigenschaft wiederholt. Innerhalb verweist **`ThisItem`** auf den jeweiligen Datensatz (`ThisItem.'Machine Name'`); **`Gallery1.Selected`** ist der ausgewählte Datensatz; **`ThisItem.IsSelected`** ist nur für ihn true (z. B. für ein Markierungsrechteck). Steuerelemente in der Galerie haben standardmäßig `OnSelect = Select(Parent)`.
- **Edit form**: zeigt, erstellt und bearbeitet einen Datensatz. Wichtigste Eigenschaften **DataSource** (wohin geschrieben wird) und **Item** (was angezeigt wird, z. B. `Gallery1.Selected`). Speichern mit **`SubmitForm(Form1)`**; danach **OnSuccess** (z. B. `Navigate(ListScreen, ScreenTransition.Slide)`) bzw. OnFailure.
- **Data card**: Container je Feld im Formular mit `DataCardKey` (Label), `DataCardValue` (Eingabe), `StarVisible` (Pflichtstern), `ErrorMessage`. **Default** nennt die Quellspalte, **Update** das Steuerelement, dessen Wert zurückgeschrieben wird – die Datentypen müssen passen. Zum Ändern der Steuerelemente muss die Karte **entsperrt** werden; Formulare sind absichtlich weniger flexibel als Galerien.

### Power Fx: die Formelsprache

**Power Fx** ist die Excel-ähnliche, deklarative Formelsprache der Power Platform (Canvas-Apps, Formelspalten, Commanding in modellgesteuerten Apps, Copilot Studio). Formeln steuern Verhalten: welche Datensätze erscheinen, Navigation, Reaktion auf Aktionen, Schreiben in Datenquellen.

| Formel | Zweck | Typische Eigenschaft |
|---|---|---|
| `Filter(DataSource, Condition)` | nur passende Datensätze | Gallery **Items** |
| `LookUp(Table, Condition, Column)` | erster passender Datensatz/Wert | beliebig |
| `If(Condition, True, False)` | Fallunterscheidung (verschachtelbar) | Text, Color, Visible |
| `IsBlank(Value)` | leer? | If-Bedingung |
| `Navigate(Screen, Transition, {Kontext})` | Bildschirmwechsel (Slide, Fade, None) | Button **OnSelect** |
| `Back()` | zurück zum vorherigen Bildschirm (nur nach Navigate) | Button **OnSelect** |
| `Patch(DataSource, BaseRecord, Changes)` | Datensatz ändern (BaseRecord = `Gallery1.Selected`) oder anlegen (`Defaults(DataSource)`) | Button **OnSelect** |
| `SubmitForm(Form)` | Formulardaten speichern | Button **OnSelect** |
| `User().FullName` / `User().Email` | angemeldeter Nutzer | Textwerte, Filter |
| `Set(Var, Value)` | **globale Variable** (ganze App, Sitzungsdauer) | OnSelect, **App.OnStart** |
| `UpdateContext({Var: Value})` | **Kontextvariable** (nur dieser Bildschirm) | OnSelect |
| `Collect` / `ClearCollect` | **Collection** (In-Memory-Tabelle) aufbauen, z. B. Nachschlagedaten in App.OnStart vorladen | OnSelect, App.OnStart |
| `IfError(Value, Fallback)` | Fehler abfangen (z. B. abgelehnter Patch) | beliebig |
| `Notify(Message, NotificationType)` | Banner: Success (grün), Error (rot), Warning (gelb), Information (blau) | OnSelect |
| `Text(Value, "$ ##.00")`, `Value()` | Zahl/Datum formatieren bzw. Text zu Zahl | Label Text |
| `ColorValue("Purple")`, `RGBA(…)`, `Color.Purple` | Farbwerte, auch datengetrieben | Color, Fill, BorderColor |
| `Confirm("…", {ConfirmButton, CancelButton})` | Bestätigungsdialog (true/false) | OnSelect |

Mehrere Anweisungen werden mit **Semikolon** verkettet (`SubmitForm(Form1); Notify(…); Navigate(…)`). In Regionen mit Komma als Dezimalzeichen wird das Semikolon zum Listentrenner. **Startbildschirm** ist der oberste in der Tree view, sofern `App.StartScreen` nichts anderes sagt; `Back()` funktioniert nur, wenn man per `Navigate()` gekommen ist.

**Variablen im Vergleich:** `Set()` für Werte, die mehrere Bildschirme teilen (Rolle, Bearbeitungsmodus, gewählter Datensatz); `UpdateContext()` für temporären Zustand eines Bildschirms (Dialog ein-/ausblenden); Collections für lokale Tabellen, ohne nach Dataverse zu schreiben. In **modellgesteuerten Commands** sind `Set()`, `Collect()` und `UpdateContext()` **nicht** verfügbar.

**Copilot in der Formelleiste:** *Create a formula* (Menü neben fx) erzeugt Formeln aus einer Beschreibung; ein Kommentar `// …` direkt in der Formelleiste schlägt inline vor – aber nur für allgemeine Funktionen wie `Filter()`, `If()`, `LookUp()`, nicht für `Navigate()`, `SubmitForm()`, `Back()`. *Explain this formula* erklärt bestehende Formeln. Copilot ist kontextbewusst (kennt Tabelle und Steuerelemente).

### Wiederverwendung: Named formulas, UDFs, Component libraries

| Werkzeug | Wann |
|---|---|
| **Named formula** (in `App.Formulas`, z. B. `EspressoColor = RGBA(…);`, `CurrentUserRole = LookUp(…)`) | ein Wert/Ausdruck ohne Parameter, an vielen Stellen genutzt – einmal ändern, überall wirksam |
| **User-defined function** (`TypeColor(machineType: Text): Color = If(…);`) | Logik mit Eingaben und berechneter Ausgabe, mehrfach gebraucht |
| **Component library** (Header, Navigationsleiste, Karten mit eigenen *custom properties*) | visuelle Bausteine, die über mehrere Apps derselben Umgebung konsistent sein sollen; Updates werden in allen Apps übernommen; typischerweise vom Center of Excellence gepflegt |

### KI in Canvas-Apps

- **Microsoft 365 Copilot in canvas apps** wird auf App-Ebene aktiviert (Settings > Upcoming features > Preview > *Copilot component*), erscheint als Copilot-Button und öffnet einen Chatbereich, in dem Nutzer Fragen zu den Daten der App stellen – ohne Steuerelement im Layout. Muss vom Admin je Umgebung erlaubt sein (Preview).
- **AI-Builder-Prompts** sind dagegen vom Maker gesteuerte KI-Aufrufe aus Formeln (`'Prompt'.Predict(Text)`) oder Flows, deren Ausgabe frei platziert wird.
- Das ältere **Copilot control** gibt Nutzern eine Chat-Oberfläche auf die App-Daten als eingefügtes Steuerelement.

### Veröffentlichen, Teilen, Warten

- **Save vs. Publish:** Speichern sichert eine neue Version als Entwurf; Veröffentlichen schaltet sie live. Laufende Nutzer bekommen zwei Hinweise („new version coming“, „Refresh“) – nicht bei Einbettung in Teams, Power BI oder SharePoint. **AutoSave** alle zwei Minuten (Settings > General). Save-Optionen: *Save with version notes*, *Save as*, *Download a copy* (.msapp). In Managed Environments kann Copilot die App-Beschreibung generieren.
- **Teilen:** Berechtigung **User** (nur ausführen) oder **Co-owner** (bearbeiten, teilen, löschen; nicht den Originalbesitzer entfernen). Bei Dataverse-Quelle Sicherheitsrolle im Dialog mit zuweisen. Optional **app-level security roles** (App reader / App user / App maker / App admin). **Everyone-Gruppe vermeiden** (deaktiviert, enthält alle jemals angemeldeten inkl. Gäste); ab 100 Nutzern Entra-Sicherheitsgruppen. Ein Link funktioniert nur, wenn die App geteilt ist.
- **Coauthoring:** bis zu 10 Maker gleichzeitig (Co-owner), je App unter Settings > Updates > New aktivieren.
- **Versionen:** Details > Versions; die zuletzt veröffentlichte ist „Live“; Versionen der letzten sechs Monate lassen sich wiederherstellen – es entsteht eine **neue Version als Kopie**, die dann veröffentlicht wird. Details zeigt außerdem Connections, Flows und Analytics (30 Tage).

### Design-Grundsätze

Ziel vor Bau klären: Was soll die App tun, ersetzt sie einen analogen Prozess, mobil, Datenmenge? Anforderungen (Sicherheit, Compliance, Auth) früh sammeln. Datenquelle nach Infrastruktur, Volumen, Mehrfachquellen, Lizenz wählen. UX einfach halten (Slider statt Tippen, Bestätigungsdialoge, Buttons nach Rechten ein-/ausblenden, Performance auf Mobilgeräten). UI per **Mockup** (Papier, PowerPoint, leere Canvas-App) validieren. **Accessibility** und **Localization** (Dezimalzeichen!) mitdenken.

## Modellgesteuerte Apps

### Der Ansatz

Modellgesteuerte Apps sind „datenmodell-getrieben“: Man ordnet zuerst die Daten, entscheidet, was damit passieren soll, und fügt dann Dashboards, Formulare, Ansichten und Diagramme hinzu. Die Komponenten bestimmen das Layout, nicht der Maker – dafür entstehen komplexe Apps mit wenig oder keinem Code, und Beziehungen erlauben die Navigation zwischen Tabellen ohne doppelte Daten. Die Architektur ist **metadatengetrieben**: das Design folgt dem Datenmodell; Anpassungen brauchen keinen Code.

Fünf Phasen: **1. Daten modellieren** (wichtigster Schritt – Tabellen, Spalten, Beziehungen in Dataverse), **2. Geschäftsprozesse definieren**, **3. App komponieren** (App Designer, automatische Sitemap), **4. Sicherheitsrollen konfigurieren**, **5. App teilen** (zwei Schritte: Rolle, dann App).

Designfaktoren: Business requirements (inkl. Sicherheitsmodell, Offline-Modus – unterstützt auf iOS/Android, MFA), Data model, Business logic (Business Rules oder BPFs), Output (Dashboards mit Filtern und Drilldown, nicht überladen). **Industry accelerators** liefern branchenspezifische Datenmodelle.

### Komponenten

| Kategorie | Komponenten | Designer |
|---|---|---|
| **Daten** | Table, Column, Relationship (1:N, N:1, N:N), Choice column | Table designer |
| **UI** | App (Einstellungen, URL), **Site map** (Navigation), **Form**, **View**, **Custom page** (Canvas-Technik), **Generative page** (KI, React) | App designer, Form/View designer, Power Apps Studio |
| **Logik** | **Business process flow**, Workflow (klassisch, nur modellgesteuert), Actions, **Business rule**, Power Automate flow (appübergreifend) | jeweilige Designer |
| **Visualisierung** | **Chart**, **Dashboard**, **Embedded Power BI** | Chart/Dashboard designer, Power BI |

Der **App Designer** stellt die App zusammen: Seiten hinzufügen (Dataverse table, Dashboard, Custom page, *Describe a page*), Sitemap anordnen, Formulare/Ansichten/Diagramme wählen, Einstellungen (z. B. *Copilot control* unter Upcoming) und **Publish** (speichert und veröffentlicht). Der **Agent Feed** erscheint oben in der Sitemap.

### Formulare

Vier Typen je Tabelle:

- **Main**: Hauptoberfläche zum Anzeigen/Bearbeiten, responsiv („einmal entwerfen, überall nutzen“ – Web, Outlook, Tablet), AutoSave standardmäßig an. Ziel: möglichst *ein* Main-Formular je Tabelle.
- **Quick Create**: schlankes Anlegen neuer Zeilen aus *+ New* in der Navigationsleiste, aus Lookups oder Subgrids; unterstützt Skripte und Business Rules; nur **eines** aktiv (per Form order), **keine** Rollenbindung, kein Formularwechsel, muss für die Tabelle aktiviert sein; Mobile-Apps generieren sonst eines aus dem Main-Formular.
- **Quick View**: zeigt schreibgeschützt Daten einer per **Lookup** verknüpften Zeile innerhalb eines anderen Formulars (Quick view control); unsichtbar, wenn der Lookup leer ist; keine Skripte; mit Primärspalte wird es zum Link.
- **Card**: kompakt für Mobilgeräte; wird nicht als App-Komponente, sondern über die **Read-only Grid**-Steuerung in Ansichten eingebunden.

**Aufbau eines Main-Formulars:** Header, Body, Footer; der Body ist in **Tabs** mit **Sections** gegliedert, die Spalten von Feldern enthalten. Der erste Tab trägt die wichtigsten Daten; zu viele Tabs schaden Bedienbarkeit und Performance (mobil). Tabs, Sections, Spalten, iFrames und Web Resources lassen sich per Eigenschaft, Business Rule oder Skript ein-/ausblenden.

**Form designer:** Canvas in der Mitte, *Table columns* links (ungenutzte oder alle), *Properties* rechts. Spalten werden zu Feldern; Entfernen vom Formular löscht keine Daten. Ohne Sonderkonfiguration rendert jede Spalte das Standard-Steuerelement ihres Typs (Choice → Dropdown). Über **Components** kommen Layout-, Grid-, Anzeige- und Eingabesteuerelemente hinzu – je Formfaktor (Web/Tablet/Phone) wählbar; sie brauchen eine passende Tabellenspalte.

**Form settings:**

- **Security roles** je Formular (Everyone oder bestimmte Rollen) – z. B. ein Vertriebsformular mit LinkedIn-Widgets nur für Vertrieb.
- **Form order**: Reihenfolge innerhalb der erlaubten Formulare; das erste ist der Standard. Bei mehreren erlaubten erscheint ein Formularwähler.
- **Fallback forms**: Pflicht je Tabelle – das Hauptformular für Nutzer, deren Rolle zu keinem rollenspezifischen passt; nur für Main-Formulare.
- Ein Main-Formular kann **inaktiv** gesetzt werden (für niemanden sichtbar).

**Event handlers** (Entwicklerlogik): Form **OnLoad/OnSave**, Tab **TabStateChange**, Column **OnChange**, IFrame **OnReadyStateComplete**. Ein Handler = JavaScript-Web-Resource (vorher als **Form library** hinzufügen) + Funktion; bis zu 50 je Element.

**Spezialkomponenten:**

- **Power Apps grid control** (empfohlen für alle Grids): standardmäßig read-only, *Enable editing* für **Inline-Bearbeitung**; verschachtelte Grids, Gruppierung, Aggregation (Sum/Min/Max/Avg), Infinite Scrolling, konfigurierbare Filter/Sortierung/Farben. **Editable Grid** und **Read-Only Grid** sind seit März 2026 veraltet.
- **Display controls**: Calendar, **External website (iframe)**, Web resource, **eingebettete Canvas-App**, Knowledge search (braucht Dynamics 365 Customer Service), Quick view, **Timeline** (Aktivitätsverlauf: Notizen, Termine, E-Mails, Anrufe, Aufgaben; Aktivitäten direkt erstellen).
- **Input controls**: Checkbox, Toggle, Number input, Option set, Pen input (Unterschrift), Rich text editor, Star rating; außerdem Business card reader, Power BI report; *Get more components* zeigt PCF-Komponenten der Umgebung.

### Ansichten (views)

Eine View definiert, wie eine Liste von Zeilen erscheint: Spalten, Breiten, Sortierung, Standardfilter. Drei Typen:

- **Personal view**: vom Nutzer erstellt (z. B. per Advanced Find), nur für ihn – teilbar.
- **System view**: von der App benötigt, automatisch je Tabelle angelegt; nur System Administrator/Customizer editieren; nicht löschbar, nicht im View-Selector, nicht in Subgrids/Dashboards.
- **Public view**: allgemein, anpassbar, für alle App-Nutzer im View-Selector; in Subgrids und Dashboard-Listen nutzbar. Systemdefinierte Public Views sind nicht löschbar; in verwalteten Lösungen nicht editierbar.

Im **View designer**: Spalten hinzufügen/verschieben/breiter, *Filter by* über Spaltenkopf (Equals, Contains, Begins with …) oder *Edit filters…*; **Publish** macht die Ansicht für alle verfügbar. Eine View ist die *Default view* der App.

### Diagramme und Dashboards

Ein **Chart** (Balken, Kreis …) gehört zu einer Tabelle und erscheint in Ansichten (*Show Chart*), Formularen oder Dashboards. Definition: **Legend Entries (Series)** = Spalte + Aggregat (Average, Count:All, Count:Non-empty, Max, Min, Sum), **Horizontal (Category) Axis Labels** = Gruppierungsspalte.

**Dashboards** zeigen mehrere Bereiche in einer Ansicht (Chart, List, Assistant – nur einmal –, IFrame, Web Resource; auch Power BI embedded). **Interaktive Dashboards** sind rollenbasiert und echtzeitfähig: **Multi-stream** (beliebig viele Streams je Tabelle/Ansicht, **Visual filters** oben – interaktive Diagramme, die filtern –, umschaltbar in **Tile view** mit Zeilenanzahl je Stream) und **Single-stream** (ein Stream mit angewandten Filtern, Kacheln rechts, für kleinere, komplexere Daten). **Interactive tiles** zeigen aggregierte Zahlen und öffnen per Klick die Zeilen. Dashboards werden per *+ Add page > Dashboard* in die App aufgenommen.

Der **Data exploration agent** erlaubt Nutzern, Daten in Ansichten per natürlicher Sprache zu filtern und sofort Diagramme zu erzeugen („Orders processed by location as a bar chart“) – ohne Copilot-Studio-Lizenz.

### Custom pages und Generative pages

- **Custom page**: bringt Canvas-Fähigkeiten (Power Fx, Connectors, PCF) in die modellgesteuerte App – als **Full page**, **Center dialog** oder **Side dialog / app side pane**. Enger integriert und performanter als eine eingebettete Canvas-App (die nur auf einem Formular liegt) – in den meisten Fällen der empfohlene Weg. Nicht mehr als **25** je App; muss aus einer Lösung erstellt werden.
- **Generative page**: KI-generierte, React-basierte Seite – *Add a page > Describe a page*, Beschreibung (optional Skizze, bis zu **6** Dataverse-Tabellen), *Generate page*, Verfeinern per Chat, Code-Tab (Edit, Compare-Diff), Accessibility assistant mit Auto fix, *Save and Publish*. Lösungsfähig; Maker-Erfahrung zunächst in US, UK, Australien, Singapur. Der Maker bleibt für die Prüfung des Codes verantwortlich.

### Commanding mit Power Fx

Eigene Buttons in der **Befehlsleiste** (oben an Formularen und Ansichten) werden im **command designer** mit Power Fx statt JavaScript definiert: **OnSelect** (z. B. `Patch(Accounts, Self.Selected.Item, {'Account Name': "Contoso"})`, `Navigate(Accounts)`, mit `Confirm(...)` absichern, `Notify("Record updated")`) und **Visible** (z. B. `CountRows(Self.Selected.AllItems) > 0`, `Self.Selected.Item.'Account Rating' > 20`). **`Self.Selected.Item`** = einzelner ausgewählter Datensatz (leer bei keiner/mehreren Auswahlen), **`Self.Selected.AllItems`** = alle ausgewählten, **`Self.Selected.State`** = Edit (0), New (1), View (2). Nicht unterstützt: `Set()`, `Collect()`, `UpdateContext()`.

### Copilot und Agenten in der App

- **Copilot chat**: KI-Chatbereich für Nutzer („Show me all active cases created this week“, „Take me to online cases“) – **schreibgeschützt**. Admin aktiviert je Umgebung (Features), Maker kann je App abschalten (Settings > Upcoming > Copilot control). In Umgebungen ohne Dynamics 365 wird es zugunsten von Microsoft 365 Copilot abgelöst.
- **Autonome Agenten** (aus Copilot Studio, verbunden mit dem **Power Apps MCP server**, veröffentlicht) arbeiten im Hintergrund auf Dataverse-Daten und stellen Aufgaben in den **Agent Feed** (oben in der Sitemap): **Needs Attention** (erledigen, Datenvorschläge übernehmen, verwerfen) und **Completed**. Hinzufügen über App Designer > Agents > *Add to feed*; Vorschau nur nach Publish und Play. Standardmäßig sehen nur System Administrator/Customizer den Feed; andere brauchen Rechte auf Agent Task, Agent Hub Goal/Insight/Metric und Copilot.
- **App assistant agent**: der Agent hinter dem Copilot-Chat der App – in Copilot Studio mit Topics, Wissensquellen und Verhalten für genau diese App konfigurierbar.
## Power Pages

**Power Pages** ist die sichere, unternehmenstaugliche Low-Code-Plattform für **externe, datengetriebene Websites** (Kunden, Partner, Bürger) – für Maker per Design Studio, für Pro-Entwickler per Visual Studio Code und Power Platform CLI. Es ist die Weiterentwicklung der Power Apps portals und **auf Dataverse gebaut**: Alle Dataverse-Stärken (zentrale Verwaltung, Metadaten, Sicherheit und Audit, Formulare und Ansichten, Geschäftslogik, Mehrsprachigkeit, Erweiterbarkeit) gelten auch für die Website. Struktur, Layout, Inhalt und Funktion der Site liegen in Dataverse.

### Bereitstellen

Eine Site wird in einer Umgebung **mit Dataverse-Datenbank** provisioniert; man braucht die Rolle **System Administrator**. Ablauf: Template wählen (generisch oder – bei installierten Dynamics-365-Apps – Dynamics-365-Templates wie Community, Customer/Employee/Partner self-service, Field Service), Name, eindeutige Webadresse, Sprache (muss in der Umgebung aktiviert sein). Alternativ **Site mit Copilot** aus einer Beschreibung erzeugen (braucht das enhanced data model). Jede Site startet als **Trial** und wird später in eine Produktionssite umgewandelt. Neue Sites sind standardmäßig **privat**.

### Design Studio und Workspaces

| Workspace | Aufgabe |
|---|---|
| **Pages** | Seiten und Navigation bauen (Seite mit Copilot beschreiben oder Standard-/Custom-Layout), Sektionen und Komponenten, *Edit code* (Visual Studio Code for the Web für HTML/CSS/JS), Preview (Desktop/QR – setzt den Site-Cache zurück) |
| **Styling** | Theme (Presets, Copilot-generiert), Farben, Schriften, **Custom CSS** (gilt für alle Themes; seitenbezogen im Code-Editor) |
| **Data** | Dataverse-Tabellen anlegen/ändern, **Lists** und **Forms** definieren; *Tables in this site* zeigt genutzte Tabellen |
| **Set up** | Site-Einstellungen, Go-live, PWA, Site visibility, Identity providers, **Agents**, Link zum **Power Pages admin center** |
| **Security** | **Monitor** (Security scan), **Protect** (Web roles, Page permissions, Table permissions, WAF), **Manage** (Identity providers, Site visibility, Advanced: CSP, CORS, HTTP-Header) |

Für alles, was das Studio nicht bietet (eigene **Page templates**, Web Templates, Site-Einstellungen), gibt es die **Portal Management app** (Ellipsen-Menü). Der **Site Checker** (admin center > Power Pages sites > Site Health) findet Konfigurations-, Performance- und Bereitstellungsprobleme. Der Copilot-Sidecar beantwortet Fragen zum Bauen (braucht Bing-Suche).

### Seiten und Komponenten

Web pages bilden über Eltern-Kind-Beziehungen die Site-Hierarchie (jede Seite = URL); Seiten lassen sich verschieben, als Unterseite einordnen oder in *Other pages* verstecken (per URL erreichbar). Sektionen haben Layouts; Komponenten sind:

- **Standard**: Layout und statischer Inhalt (Text, Bild, Button, Spacer, Video …)
- **Connected to data**: **List** (Dataverse-Zeilen nach einer oder mehreren Ansichten, mit Paginierung, Filter, Sortierung; optional **AI summary** und **natural language search**), **Form** (anzeigen, erfassen, bearbeiten – Copilot kann Tabelle und Formular aus einer Beschreibung anlegen) und **Multistep form** (Erfassung über mehrere Schritte; Copilot-Vorschau)
- KI-Komponenten: **AI form fill assistance** (Felder aus hochgeladenen Anhängen befüllen, Textentwürfe), **Search** mit **Generative AI Search** (natürlichsprachliche Suche mit KI-Zusammenfassung), AI-generierter Text, Copilot-Codegenerierung im Code-Editor (HTML/JS/CSS, Bootstrap, jQuery)

Tenant-Admins steuern per **Copilot governance**, welche generativen Funktionen Site-Besucher bekommen; das überschreibt Maker-Einstellungen.

### Sicherheit: Authentifizierung und Autorisierung

Das Modell trennt **Authentifizierung** (wer darf auf die Site) und **Autorisierung** (was darf jemand sehen und tun):

- **Site visibility**: **Private** (nur Organisation bzw. ausgewählte Nutzer; Anonyme müssen sich anmelden – für die Entwicklung) oder **Public** (jeder mit der URL; Änderungen sofort sichtbar). Go-live = auf Public stellen.
- **Authentifizierung**: **Local sign in** (formularbasiert, Daten in der Contact-Zeile) oder **externe Identitätsanbieter** – empfohlen **Microsoft Entra External ID**; außerdem Microsoft, LinkedIn, Facebook u. a. Konfiguration unter Set up bzw. Security > Manage > Identity providers.
- **Authentifizierte Nutzer sind Contacts** in Dataverse.
- **Web roles** verbinden Nutzer mit Rechten. Sie werden Kontakten zugewiesen; die Rolle **Anonymous Users** gilt für nicht angemeldete Besucher. Ein Nutzer kann mehrere Web Roles haben – die Rechte werden kombiniert.
- **Page permissions**: welche Web Roles eine Seite sehen (*Allow everyone* oder bestimmte Rollen).
- **Table permissions**: welche Web Roles welche **CRUD**-Operationen auf welchen Dataverse-Zeilen ausführen dürfen – begrenzt durch einen Zugriffstyp (Global, Contact, Account, Parent, Self). Ohne Tabellenrecht bleiben Listen und Formulare leer. Zusätzlich gibt es Spaltenrechte.
- **Web Application Firewall (WAF)** gegen gängige Web-Exploits; **Security scan** gegen XSS und unsichere Bibliotheken; CSP, CORS, HTTP-Header unter Advanced settings.

### Agent auf der Site

Unter Set up > AI assistance > **Agents** schaltet man den **Site agent** ein: Power Pages erzeugt in Copilot Studio einen Agenten mit **generative answers**, der Besucherfragen aus dem Site-Inhalt beantwortet (zunächst als Trial, danach Copilot-Studio-Kapazität der Umgebung). Voraussetzungen: Tenant-Einstellung **Publish Copilots with AI features** und ein nicht blockierter **HTTP-Connector**. Alternativ einen bestehenden Copilot-Studio-Agenten hinzufügen; mehrere Agenten je Site möglich, Sichtbarkeit über **Web Roles**. Erweiterbar per Bing-Suche, **Omnichannel**-Übergabe an Dynamics 365 Customer Service und direkte Bearbeitung in Copilot Studio.

### Erweiterbarkeit

- **Liquid**: Open-Source-Markup, Grundlage der **Web templates**; rendert dynamische Inhalte und Dataverse-Daten serverseitig (`{{ now | date: 'MMMM' }}`).
- **Web templates**: definieren den Seitenaufbau; anpassbar oder neu erstellbar; daraus werden **Page templates** (custom layouts) in der Portal Management app.
- **JavaScript** in Seiten, Templates, Formularen, Listen: UI-Verhalten, Validierung, externe Webdienste, direkter Dataverse-Zugriff über die **Power Pages Web API**. Skripte modellgesteuerter Formulare werden *nicht* wiederverwendet.
- **CSS**: Styling-Workspace (Basis) oder eigene CSS-Dateien (*Manage CSS*); kann auch Elemente verbergen statt JavaScript.
- **Power Apps component framework (PCF)**: Code-Komponenten aus Canvas-/modellgesteuerten Apps auch in Power Pages.
- **Integration**: Power Apps (modellgesteuerte Apps zur Bearbeitung der Portal-Daten), Power Automate (Logik bei Interaktionen), Power BI (Berichte, Dashboards, Kacheln sicher einbetten), Copilot Studio (Chatbots), **Power Platform CLI** + Azure Pipelines (ALM).

## Power Automate

**Power Automate** ist der Online-Workflow-Dienst, der Aktionen über hunderte Apps und Dienste automatisiert: Benachrichtigungen, Leads verfolgen, Anhänge kopieren, Daten sammeln, **Genehmigungen**. Jeder Flow besteht aus **einem Trigger** (Ereignis: neue E-Mail, neue Zeile, Zeitplan, manueller Start) und **Aktionen**. Erstellt im Browser (make.powerautomate.com – Home mit Copilot-Prompt, Create, Templates, My flows, Approvals, Solutions, Process mining, AI models, Desktop Flow Activity) oder verwaltet in der mobilen App. Braucht ein **Arbeits- oder Schulkonto**.

Wann Power Automate statt App-Logik? Wenn die Logik über das hinausgeht, was Power Apps nativ kann: mehrstufige Genehmigungen, geplante Läufe (jeden Morgen fällige Inspektionen mailen), Reaktion auf Ereignisse in anderen Systemen.

### Flow-Arten

| Art | Start | Beispiel |
|---|---|---|
| **Automated cloud flow** | Ereignis | *When a new email arrives (V3)* mit Subject Filter „Daily report“ und *Only with Attachments* → SharePoint *Create file* (automatisch in **Apply to each** für mehrere Anhänge) |
| **Instant cloud flow** | manuell (Button, App, Agent) – *Manually trigger a flow* | Prompt aus einer App ausführen |
| **Scheduled cloud flow** | Zeitplan – **Recurrence** | täglich 10:00 Excel-Zeilen lesen (*List rows present in a table*), je Zeile E-Mail senden |
| **Desktop flow** (Power Automate Desktop, RPA) | aus Cloud-Flow oder App (Premium) | Legacy-Anwendung ohne API bedienen |
| **Agent flow** | aus einem Copilot-Studio-Agenten | siehe unten |

**Business process flows** sind *keine* Cloud-Flows (siehe eigener Abschnitt) – sie werden unter Power Apps > Flows > Business process flows bzw. in Lösungen verwaltet.

### Copilot, Bausteine, Betrieb

- **Copilot in Power Automate**: Flow in natürlicher Sprache beschreiben („When X happens, do Y“, Connectors nennen), *Generate*, *Keep it and continue*, Verbindungen prüfen (grün = bereit, rot = Handlungsbedarf), *Create flow*; im Designer per Copilot-Pane ändern („Delete the Send an email action“) oder erklären lassen. Optimiert für Englisch, basiert auf Azure OpenAI Service. **Generative actions** lassen Flows zur Laufzeit entscheiden, welche Plugins sie aufrufen.
- **Dynamic content** (Blitz-Symbol oder `/`): Ausgaben vorheriger Schritte in spätere einfügen (Attachments Name/Content, Link to item, Outcome). **Apply to each** wiederholt Aktionen je Element einer Liste. **Condition** teilt in True/False. **Compose** zeigt Werte. **Expressions** (fx) berechnen, was Dynamic Content nicht liefert: `length(body('List_rows')?['value'])`, `triggerBody()?['SdkMessage']`, `null`.
- **Teilen**: Co-Owner (Nutzer, Gruppen, Microsoft-Lists-Liste) sehen den Flow unter *Shared with me*, dürfen Verlauf einsehen, Eigenschaften und Definition ändern, Owner hinzufügen/entfernen (nicht den Ersteller), löschen. Verlässt der Ersteller die Organisation, läuft der Flow weiter. Geteilte **Verbindungen** gelten nur in diesem Flow; fremde Anmeldedaten sind nicht änderbar; beim Entfernen eines Owners Verbindungen aktualisieren. *Embedded* = im Flow genutzt, *Other* = definiert, ungenutzt. Braucht bezahlten Plan; SharePoint-Nutzer brauchen Edit-Rechte.
- **Troubleshooting**: My flows > Flow > **28-day run history**, fehlgeschlagenen Schritt (rotes Ausrufezeichen) prüfen. **401/403 „Unauthorized“** → View Connections > Fix connection > **Resubmit**. **400 „Bad request“ / 404 „Not found“** → Aktion korrigieren, Resubmit. **500/502** → vorübergehend, Resubmit. Weitere Ursachen: falscher Plan (*View My Licenses*), Datenlimit → **Throttling** (bei bezahlten Plänen organisationsweit gepoolt), Polling-Frequenz (kostenlos alle 15 Minuten; frühere Trigger warten), jede Auslösung zählt als Run (auch ohne passenden Filter; Prüfungen auf neue Daten nicht), max. 600 Flows je Konto, Gateway nur in der Standardumgebung, Drosselung externer Connectors (X).

### Agent flows

Ein Cloud-Flow lässt sich in einen **Agent flow** konvertieren: verwaltet auf der **Workflows**-Seite in Copilot Studio, als Tool in Agenten aufrufbar, mit KI-Aktionen (Text generieren, Dokumente verarbeiten, andere Agenten aufrufen) und **Abrechnung über Copilot-Studio-Kapazität** statt Power Automate (Tests im Designer kosten nichts; ohne Kapazität werden Läufe blockiert – Monitoring im admin center unter Licensing). Voraussetzungen: Cloud-Flow (kein Desktop-Flow), **in einer Lösung**, Kapazität vorhanden. Konvertierung: Edit → Plan auf *Copilot Studio* umstellen → Save – **einmalig, nicht umkehrbar**.

### Der Dataverse-Connector

Mit dem **Dataverse-Connector** starten Flows auf Dataverse-Ereignissen und fragen, ändern oder verknüpfen Daten. **Authentifizierung**: **OAuth** (interaktiver Nutzer mit Entra-Konto – persönliche Produktivität), **Service principal** (nicht-interaktiver Application User – Hintergrundautomatisierung eines Projekts), **Client Certificate Auth** (PFX-Zertifikat, ebenfalls teilbar für Hintergrundflows). **Umgebung**: *current environment* (empfohlen, passt sich beim Deployment an) oder eine bestimmte Umgebung (Flow anderswo bauen, zwei Umgebungen integrieren – *…from selected environment*-Aktionen). Schritte sprechend umbenennen.

#### Trigger

| Trigger | Wann |
|---|---|
| **When a row is added, modified or deleted** | Datenereignis – der Standardfall |
| **When an action is performed** | nach Abschluss einer Dataverse-Aktion / eines eigenen Geschäftsereignisses (`EmployeeOnboarded`) |
| **When a flow step is run from a business process flow** | Nutzer klickt im BPF-Schritt auf *Run Flow* |
| **When a row is selected** | Nutzer wählt in der modellgesteuerten App eine Zeile und startet den Flow |

Optionen des Haupt-Triggers:

- **Change type**: Added, Modified, Deleted (kombinierbar). Bei Added/Modified ist die ganze Zeile verfügbar, bei Deleted nur die Row ID. `triggerBody()?['SdkMessage']` liefert Create/Update/Delete. Mehrfache Updates lösen mehrfach aus – auch ohne Wertänderung.
- **Table name**.
- **Scope**: wessen Zeilen auslösen – **Organization** (Standard, jeder), **User** (nur eigene Zeilen – persönliche Automatisierung), **Business Unit**, **Parent: Child Business Unit**. Organisationseigene Tabellen: nur Organization. Der Flow feuert nur für Zeilen, die der Besitzer lesen darf.
- **Select columns** (nur Modified): logische Spaltennamen (`firstname,lastname`), bei deren Änderung der Flow läuft – reduziert Läufe. **Keine Lookup-Spalten**. Wichtig gegen **Endlosschleifen**: Spalten, die der Flow selbst per *Update a row* schreibt, nicht aufnehmen.
- **Filter rows**: OData-Ausdruck (`contoso_amountoverbudget gt 10000`) – der Flow läuft nur, wenn er nach dem Speichern true ist; effizienter als eine spätere Condition.
- **Delay until**: OData-Zeitstempel; anders als die Delay-Aktion läuft die Trigger-Eigenschaft nie ab.
- **Run as**: Aktionen im Kontext von **Flow owner**, **Row owner** (bei Teambesitz Fallback auf Flow owner) oder **Modifying user**; je Aktion *Use invoker's connection*; Flow-Besitzer braucht das Privileg **Act on Behalf of Another User** (Rolle Delegate). Effekt: Angelegte Zeilen zeigen die auslösende Person als Ersteller.

#### Daten abfragen

- **Get a row by ID**: genau eine Zeile per GUID – z. B. Primärkontakt eines Accounts oder erneut die aktuelle Zeile nach einer Genehmigungspause (gegen veraltete Daten). Unnötig für die auslösende Zeile. Scheitert bei null-ID (vorher Condition) oder fehlender Leseberechtigung.
- **List rows**: null bis viele Zeilen nach Kriterien – **OData** (**Filter rows** mit logischen Spaltennamen: `firstname eq 'John'`, `contains(firstname,'John')`, `revenue lt 100000 and revenue gt 2000`, Klammern, über Beziehungen `primarycontactid/fullname eq 'Susanna (sample)'`; **Sort by** mit `asc`/`desc`; **Select columns**; **Expand Query** `primarycontactid($select=contactid,fullname)` – Daten im Output, aber nicht im Dynamic Content; **Row count**, z. B. 1 für Existenzprüfung und schnelle Tests) oder **FetchXML** (XML-Abfragesprache von Dataverse, aus Advanced Find exportierbar; keine Aggregationen in List rows). Standard **max. 5.000 Zeilen ohne Fehler**; **Pagination** (Settings) bis 100.000 je Seite, weitere Seiten manuell per Paging-Token.

#### Daten schreiben und verknüpfen

- **Add a new row**: Tabelle wählen; **Business-Required**-Spalten (roter Stern) müssen befüllt sein, sonst kein Speichern; weitere Spalten unter *Advanced parameters*. Nachträglich als required markierte Spalten erfordern ein Flow-Update.
- **Update a row**: per **Row ID** (GUID, benannt wie die Tabelle – nicht die OData ID); keine Spalte Pflicht; nur geänderte Werte übergeben (jedes Feld kann andere Automatisierungen auslösen); Leeren per Ausdruck `null`.
- **Upsert a row**: aktualisiert, wenn die Row ID existiert, sonst anlegen – ohne vorherige Abfrage.
- **Beziehungen setzen**: Bei 1:N entweder die **Lookup-Spalte** in Add/Update a row füllen (per **Row URL/OData ID** `contoso_projects(guid)` oder GUID; Entity-Set-Name = logischer Name + „s“) oder **Relate rows** (Tabelle der Eins-Seite, deren Row ID, Beziehungsname, *Relate With* = Row URL der anderen Zeile). **N:N nur mit Relate rows**. Falsche GUID/URL-Verwechslung führt zu Fehlern.

Beispielmuster **Duplikatprüfung**: Trigger Added auf Contact → List rows mit `emailaddress1 eq '<Email>'` → Condition `length(body('List_rows')?['value'])` is equal to 1 → True: Update a row (Status Active); sonst bleibt Status New zur manuellen Prüfung. (Auf Datenebene erzwingt ein alternate key Eindeutigkeit bereits beim Speichern.)

### Genehmigungen (Approvals)

Der **Approvals connector** ist ein **Standard-Connector** (in Microsoft 365 enthalten) für den kompletten Lebenszyklus einer Genehmigung. Er hat **keinen Trigger** – Genehmigungsaktionen werden in Flows eingebaut, die etwas anderes auslöst (neue Datei in SharePoint, neue Dataverse-Zeile). Genehmiger antworten per **E-Mail**, im **Approvals center** von Power Automate oder in **Teams** (Adaptive Card).

| Aktion | Verhalten |
|---|---|
| **Start and wait for an approval** | startet und pausiert, bis alle nötigen Antworten da sind – der Regelfall |
| **Create an approval** + **Wait for an approval** | starten ohne zu warten; später fortsetzen |
| **Start and wait for an approval of text** | Genehmiger sehen und bearbeiten einen Textblock |

**Approval type**: **Approve/Reject** mit **Everyone must approve** (einstimmig) oder **First to respond** (erste Antwort entscheidet) – oder **Custom responses** (*Needs revision*, *Escalate*) für feinere Verzweigung. Nach der Antwort liefert **Outcome** den Wert für eine **Condition**: True (Approve) → Dokument bleibt; False → *Move file* in „Rejected Documents“ (*Move with a new name*). Felder: Title, **Assigned to**, Item Link (dynamisch *Link to item*).

### Geschäftsprozessflüsse (Business process flows, BPF)

Ein **BPF** ist keine Hintergrundautomatisierung, sondern eine **visuelle Prozessleiste oben im Formular** einer modellgesteuerten App, die Nutzer durch **Stages** (Meilensteine) und **Steps** (Felder; *Required* erzwingt Ausfüllen) führt – wie eine eingebaute Checkliste. Sinnvoll, wenn Menschen in jeder Stufe entscheiden und nichts übersprungen werden darf (Sales-Qualifizierung, Onboarding, Fallbearbeitung, Dokumentprüfung). Vorteile: konsistente Dateneingabe, weniger Schulung, rollenspezifische Erfahrung. Dynamics 365 liefert Beispiele (Lead to Opportunity Sales Process, Phone to Case Process). BPFs speichern Daten in Dataverse und brauchen eine Per-User-/Premium- oder passende Dynamics-Lizenz; **nur in modellgesteuerten Apps**.

**Erstellen** (seit August 2022 nur über Lösungen): Solution > New > Automation > Process > Business process flow; Display name, Name (nicht änderbar), **Tabelle** (nicht änderbar; Option *Business process flows (fields will be created)* muss gesetzt sein). Der Designer hat Stages (mit *Category* aus dem globalen Choice-Set Stage Category – erscheint als Chevron), Steps (Sequence per Drag-and-drop), **Conditions** (Verzweigung; jede Seite braucht eine Stage), **Workflows** (an einer Stage bei *Stage entry/exit* oder als **Global Workflow** bei Aktivierung/Archivierung; nur aktive On-demand-Workflows derselben Tabelle; modern: Power-Automate-Flow-Schritt) und eine Mini-Map. **Validate** prüft Vollständigkeit; **Save** als Entwurf (nicht nutzbar); **Activate**/**Deactivate** (Standby, kein Löschen); **Edit Security Roles** vergibt CRUD-Rechte auf Prozessinstanzen (Standard: nur System Administrator/Customizer); *Order Process Flow* legt bei mehreren BPFs fest, welcher neuen Zeilen zugewiesen wird; *Snapshot* exportiert ein PNG.

**Grenzen und Regeln:** bis zu **5 Tabellen** je Prozess (Wechsel über eine **1:N-Beziehung** – Attribute Maps übertragen Daten, verknüpfte Zeilen werden zur Wiederverwendung angeboten), **30 Stages**, **30 Steps je Stage**, **10 aktive BPFs je Tabelle**, Verzweigungen bis **10 Ebenen**; Regeln beziehen sich auf Steps der **unmittelbar vorangehenden** Stage und kombinieren Bedingungen mit **AND oder OR, nicht beides**; Peer-Zweige müssen entweder alle in eine Stage münden oder alle enden; mehrere aktive Prozesse auf derselben Zeile möglich; Rücksprung zu früheren Stages erlaubt.

**Information disclosure:** Nutzer ohne Tabellenrecht sehen in der Prozessleiste trotzdem Stage-Namen und Steps (z. B. „Fraud Investigation“, „Legal Action“) und können Rückschlüsse ziehen. Abhilfe: Prozess in getrennte Prozesse aufteilen und Ergebnisse per Workflow synchronisieren.
## Die KI-Schicht: Plans, AI Builder, Copilot Studio

### AI-first denken

Die Kernfrage beim Entwerfen ist nicht mehr „welches Tool baut dieses Feature?“, sondern: **Was soll ein Mensch tun, was ein Agent, und wie übergeben sie einander?** Drei Muster:

| Muster | Beschreibung | Beispiel |
|---|---|---|
| **Human-assisted** | Mensch entscheidet, KI bereitet vor (Felder extrahiert, Anomalien geprüft, Richtlinien eingeblendet) | Manager prüft strukturierten Datensatz statt PDF |
| **Agent-assisted** | Agent erledigt Routine und eskaliert nur Ausnahmen mit Kontext | Agent löst 80 % der Kundenanfragen aus Wissensbasis und Dataverse |
| **Fully autonomous** | vom Trigger bis zum Abschluss ohne Menschen; Menschen sehen nur markierte Ausnahmen | Rechnung kommt an → AI Builder extrahiert → Agent validiert gegen Vertragsdaten → Zahlung |

Die meisten Lösungen mischen alle drei; die Übergabepunkte müssen bewusst gestaltet werden.

**Fertige Bausteine, die Aufwand sparen:** **Managed agents** aus dem Copilot-Studio-Katalog (mit **Add-ons** für Domänen-Skills), die **built-in extensible agents** in Power Apps (**Data entry**, **Data exploration**, **Data summarization** – ohne Copilot-Studio-Lizenz), der **Document Processing Agent** (überwacht Dokumente, validiert nach Regeln, steuert Routing – statt AI Builder + Power Automate selbst zu bauen) und **Web agents** in Power Pages.

### Von der Anforderung zur Komponente

Vier Dimensionen: **Wer nutzt es?** (intern → Power Apps/Automate/Copilot Studio; extern → Power Pages, Web Agents) · **Welche Daten?** (strukturiert → Dataverse/modellgesteuert; unstrukturierte Dokumente → AI Builder; Analysen → Power BI) · **Menschlich oder automatisiert?** (UI-Entscheidungen → Power Apps; eigenständige Logik → Power Automate, autonome Agenten) · **Natürliche Sprache?** (→ Copilot Studio, AI-Builder-Prompts).

| Anforderung | Primärkomponente | typische Ergänzung |
|---|---|---|
| Interne App für Mitarbeitende | Power Apps (Canvas oder modellgesteuert) | Dataverse, Power Automate |
| Externes Kundenportal | Power Pages | Dataverse, Copilot Studio Web Agent |
| Prozessautomatisierung | Power Automate | Dataverse, AI Builder |
| Konversationeller/autonomer Agent | Copilot Studio | Dataverse, Power Automate (als Agent-Aktionen) |
| Dokumentintelligenz | AI Builder | Power Automate, Dataverse |
| Visualisierung/Reporting | Power BI | Dataverse |

Kein Szenario wird von einer Komponente allein gelöst – Rechnungsverarbeitung = AI Builder + Power Automate + modellgesteuerte App; Callcenter = Canvas-App mit vier Quellen + eingebetteter Copilot-Studio-Agent; Self-Service = Power Pages + Dataverse + Web Agent; Genehmigungen = Power-Automate-Approval in Teams mit **Adaptive Cards**.

### Plans: Vom Geschäftsproblem zur Lösung

**Plans** ist das Copilot-first-Entwicklungswerkzeug in Power Apps: Man beschreibt das Geschäftsproblem in Alltagssprache (Rollen und Ablauf nennen, ein Problem je Plan; optional Prozessdiagramme, Datenmodelle oder Screenshots anhängen – vorgegebene Diagramme werden aber eng kopiert), und drei Agenten arbeiten nacheinander:

1. **Requirement Agent** → **user roles** und **user needs** (wie User Stories); anpassbar per *Looks good*, *Edit* (inline) oder Copilot-Feedback (*Keep*/*Review*). Danach entstehen automatisch **Prozessdiagramme**: **Process stages** (Überblick) und **Process maps** (Schritte, Ereignisse, Entscheidungen je Rolle) aus **Events**, **Gateways** (Verzweigungen) und **Activities**; Änderungen gelten erst nach *Validate*; bei mehr als fünf Änderungen lieber natürlichsprachlich.
2. **Data Agent** → **Datenmodell** (Dataverse-Tabellen, Spalten, Typen, Beziehungen), im Daten-Workspace oder als Diagramm anpassbar – noch bevor etwas gespeichert ist.
3. **Solution Agent** → **Technology proposal**: je Anforderung eine Kachel (Canvas-App, modellgesteuerte App, Cloud-Flow, Copilot-Studio-Agent, Power Pages), mit Zuordnung zu Rollen und Tabellen; Power-BI-Dashboards werden vorgeschlagen, aber nicht mit Plan-Kontext erstellt.

**Speichern**: *Save tables* legt die Tabellen an; Lösungsname (Buchstaben, Zahlen, Unterstriche), **Publisher** oder bestehende Lösung. Danach zeigt die **Objects view** alle verknüpften Lösungen (Schalter *Only show objects in this plan*). Jede Kachel hat **Create**: Canvas-App (datenverbundene, responsive Screens – noch speichern und veröffentlichen), modellgesteuerte App (Tabellen bereits im Designer), Cloud-Flow (Power Automate mit vorbefülltem Prompt), Copilot-Studio-Agent (Name, Beschreibung, Instructions, alle Plan-Tabellen als **Knowledge**; vor dem Publish testen), Power-Pages-Site (braucht System Administrator und App-Registrierung in Entra; in dieselbe Lösung speichern). Bestehende Apps lassen sich per *Replace* bzw. *Add technology* einbinden (nicht Teil der neuen Lösung).

**Zusammenarbeit**: **Copresence** – bis zu 100 Maker sehen den Plan gleichzeitig, nur einer bearbeitet (wer zuerst öffnet). **Sharing** als Viewer oder Co-Owner (nutzen, bearbeiten, teilen – nicht löschen/Besitz ändern). *Export to PDF* für Stakeholder ohne Power Apps.

**Umgekehrt – Plan aus bestehender Lösung** (Solutions > *Create plan from a solution*): erzeugt ein Plan-Dokument mit Geschäftsproblem, Anforderungen, Datenmodell und Technologien – zum Verstehen, Dokumentieren, Verbessern (z. B. bei Team-Übergaben). Braucht mindestens eine App mit Tabelle; nicht aus der Default-Lösung; bei verwalteter Lösung landet der Plan in einer neuen unverwalteten.

Voraussetzungen für Plans: Umgebung mit Dataverse, aktivierte Copilot-Funktionen, unterstützte Sprachregion.

### Prompts und AI Builder

**AI Builder** liefert vortrainierte Modelle (z. B. **Dokumentverarbeitung** für Rechnungen, Belege, Formulare – formatunabhängig) und den **Prompt Builder** für generative Aufgaben (Text erzeugen, klassifizieren, zusammenfassen, übersetzen). Zugang über den **AI Hub** (aus Power Apps, Power Automate und Copilot Studio). Ein Prompt wird einmal gebaut und überall verwendet.

**Prompt-Grundlagen** (aus dem Modul zum Prompt Engineering): Ein Prompt ist die Texteingabe an ein generatives Modell, das die *wahrscheinlichste* Fortsetzung erzeugt – Ergebnisse kritisch prüfen. Zwei Komponenten: **Instruction** (Aufgabe und Ziel; simple vs. complex instruction) und **Context** (Zielgruppe, Ton, Material). Gute Prompts sind spezifisch, wählen den passenden Modus (Copilot: *more creative*, *more precise* für Fakten, *more balanced*), geben Länge und Format vor und wechseln Themen bewusst (*New Topic*).

**Grounded prompts**: Im Prompt Builder (*Build your own prompt*) fügt man **Inputs** (z. B. `ProposalName`) und per *+ Add content > Dataverse* Tabellen als **Grounding** hinzu – mit Filter auf den Input und Attributen auch aus verknüpften Tabellen (Proposal > Issuer > Name). So antwortet das Modell aus den eigenen Daten. Testen mit *Test prompt*, Output-Typ (Text). Verwendung:

- **Cloud-Flow**: Aktion *AI Builder > Create text with GPT using a prompt* → Prompt wählen, Inputs füllen, *Output Text* weiterverwenden (z. B. Compose).
- **Canvas-App**: Prompt als Datenquelle hinzufügen, `Set(var, 'Learning grounded prompt'.Predict(TextInput1.Text))`, Ergebnis als `var.Text`.
- **Copilot Studio**: Library > Add an item > New Action > **Prompt** mit Input und *Data use*; *Finalize prompt* → **Create AI plugin**; in einem **Topic** per *Ask a question* (Antwort in Variable) → *Call an action* (Prompt) → *Send a message* (`VarOutput.text`) aufrufen; **Generative AI** in den Agenteneinstellungen aktivieren.

### Copilot Studio: Agenten

**Microsoft Copilot Studio** baut **konversationelle Agenten** (Frage-Antwort, geführte Fehlerbehebung, Kundenservice) und **autonome Agenten** (handeln auf Trigger: neuer Datensatz, Zeitplan, eingehende E-Mail). Bausteine:

- **Topics**: Gesprächspfade mit Trigger-Phrasen und Knoten (*Ask a question*, *Call an action*, *Send a message*, Bedingungen).
- **Knowledge sources**: Dataverse-Tabellen, Dateien, Websites, Bing – Basis für **generative answers**, die Fragen ohne modelliertes Topic beantworten.
- **Tools/Aktionen**: Prompts (AI-Plug-ins), **Agent flows**, Connectors, **REST-API-Aktionen** direkt (leichtgewichtig, ohne vollen Connector), **MCP-Tools** (Model Context Protocol – jeder MCP-kompatible Dienst als Tool).
- **Kanäle**: Apps (Copilot-Chat, **Agent Feed** über den **Power Apps MCP server**), Power Pages (**Web Agent**: Web, E-Mail, Teams, WhatsApp), Teams, Omnichannel-Übergabe an Dynamics 365 Customer Service.
- **Kapazität**: Agent-Flows und Site-Agenten verbrauchen **Copilot-Studio-Kapazität** (prepaid oder pay-as-you-go).

Im Copilot-Studio-Designer lassen sich Topics in natürlicher Sprache beschreiben, Agent-Flows per Konversation bauen und **AI Hub**-Prompts einbinden.

### Erweiterbarkeit: das „No cliffs“-Prinzip

Auf der Power Platform darf es keine Sackgasse geben: Reicht Low-Code nicht, existiert immer ein unterstützter Erweiterungspunkt – gebaut von Entwicklern, genutzt von Makern ohne Code. Der Functional Consultant muss wissen, **wann** eine Erweiterung nötig ist, **welche** und **wer** sie baut.

| Erweiterung | Wann | Wer |
|---|---|---|
| **Custom connector** | externe API nicht im Katalog (1.000+ Connectors); REST + OpenAPI; danach in Apps, Flows, Copilot Studio, Logic Apps | Entwickler (IT/ISV) |
| **REST-API-Aktion in Copilot Studio** | einmalige Integration nur für einen Agenten | Maker/Entwickler |
| **MCP-Tools** | Agent an MCP-kompatible KI-Dienste anbinden | Maker/Entwickler |
| **PCF component** (Power Apps Component Framework) | UI-Steuerelement, das es nativ nicht gibt; in Lösungen verpackt, umgebungsweit für Maker | Entwickler |
| **Dataverse plug-in** (C#) | serverseitige, transaktionale Geschäftslogik bei Datenoperationen, kanalunabhängig | Entwickler |
| **Custom API** | wiederverwendbare Geschäftsoperation als Endpunkt | Entwickler |
| **JavaScript (client-side)** | Formularverhalten jenseits von Business Rules/Power Fx | Entwickler |
| **Power Pages**: Liquid, CSS/JS, Web API | dynamisches Rendering, Frontend-Logik, Dataverse-Zugriff aus dem Browser | Maker/Entwickler |
| **BYOM in Prompt Builder** | spezialisiertes/feinabgestimmtes Modell aus Azure AI Foundry (1.800+ Modelle) in Prompts, Flows, Agenten | KI/ML-Engineer |
| **Microsoft 365 Agents SDK** | volle Pro-Code-Kontrolle über Orchestrierung und Modellwahl; trotzdem über Copilot Studio bereitstellbar | Entwickler |

## Entscheidungshilfen für die Prüfung

### Welche Logik-Ebene?

| Anforderung | Richtige Wahl | Warum nicht die anderen |
|---|---|---|
| Feld nur unter Bedingung Pflicht/sichtbar, ohne Code, in allen Apps | **Business rule** (Scope Entity bzw. All forms) | JavaScript nur modellgesteuert und Code; Flow läuft erst nach dem Speichern |
| Regel muss auch bei Import, API, Flow gelten | **Business rule mit Scope Entity** oder **Plug-in** | Formularregeln (Individual/All forms) greifen nur in der UI |
| Komplexe, transaktionale Regel, die nie umgangen werden darf | **Dataverse plug-in** | Flows sind asynchron und connectorbasiert |
| Wert aus anderen Spalten derselben Zeile | **Formula column** | Rollup ist für Kindzeilen; Flow wäre Overkill |
| Summe/Anzahl über verknüpfte Kindzeilen (1:N) | **Rollup column** | funktioniert nicht über N:N; löst keine Flows aus |
| KI-generierte Zusammenfassung dauerhaft gespeichert | **Prompt column** (max. 5 je Tabelle) | Row summary wird nur bei Bedarf erzeugt |
| Zusammenfassung nur beim Öffnen des Datensatzes | **Row summary** | Prompt column speichert und verbraucht Credits je Zeile |
| Nutzer Schritt für Schritt durch Stufen führen | **Business process flow** | nur modellgesteuert; kein Hintergrundprozess |
| Genehmigung mit Warten auf Antwort | **Cloud flow + Approvals** (Start and wait) | Approvals hat keinen Trigger; BPF entscheidet nicht selbst |
| Reaktion auf Ereignis in anderem System, Zeitplan, Mehrsystem-Orchestrierung | **Cloud flow** | App-Logik läuft nur, solange die App offen ist |
| Legacy-App ohne API bedienen | **Desktop flow** (RPA) | Cloud-Flow braucht Connector/API |
| Agent soll den Flow als Tool nutzen | **Agent flow** | Cloud-Flow-Abrechnung; Konvertierung ist einmalig |
| Formularverhalten, das Business Rules nicht können | **JavaScript event handler** (OnLoad/OnChange/OnSave) | Business Rule hat kein Skript-Modell |

### Welcher Datentyp / welche Struktur?

| Situation | Wahl |
|---|---|
| feste, kleine Kategorienliste | **Choice** (global, wenn mehrfach genutzt) |
| mehrere Kategorien gleichzeitig | **Choices** – aber nicht in Regeln, BPFs, Rollups, Charts |
| Werte sind eigenständige Datensätze (hunderte Hersteller) | eigene **Tabelle + Lookup** |
| Verweis auf Account **oder** Contact | **Customer**-Lookup |
| Kind ↔ Elternteil | **1:N / Lookup** |
| Peers (Groomer ↔ Pets) | **N:N** (Intersect-Tabelle, Subgrid) |
| externe ID als eindeutiger Schlüssel, Upsert ohne GUID | **Alternate key** |
| fortlaufende Nummer mit Präfix | **Autonumber** (Seed) |
| exakte Nachkommastellen | **Decimal** (nicht Float) |
| Geburtstag ohne Zeitzonenverschiebung | Date only, **Time zone independent** |
| externe Daten live ohne Kopie | **Virtual table** |
| replizierte, offlinefähige F&O-Integration | **Dual-write** |
| Tabelle mit zig Millionen Zeilen | **Elastic** (bei Erstellung festlegen) |

### Welche Sicherheitsstellschraube?

| Situation | Wahl |
|---|---|
| Nutzer soll App öffnen, sieht aber keine Daten | Dataverse-**Sicherheitsrolle** mit Tabellenprivilegien (Environment Maker/App-Freigabe reichen nicht) |
| Maker soll Tabellen anlegen | **System Customizer** zusätzlich zu Environment Maker |
| Tenant-Admin ohne Datenzugriff | **System Administrator** je Umgebung zuweisen |
| nur eigene Datensätze | Privileg auf Ebene **User** |
| Team/Abteilung | **Business Unit** bzw. **Parent: Child** |
| einzelne sensible Spalte | **Column Security Profile** |
| Vorgesetzte sehen Daten der Untergebenen | **Hierarchy security** |
| Zugriff automatisch mit Entra-Gruppenmitgliedschaft | **Entra ID group team** mit Rolle (Assigned/Dynamic User) |
| fallweise einen Datensatz freigeben | **Share** (Access team) statt Rolle |
| Warum sieht Nutzer X diesen Datensatz? | **Access Checker** |
| Warum kommt Nutzer X nicht in die Umgebung? | **Run diagnostics** (Entra aktiv, Lizenz, Gruppe, Rolle) |
| Power-Pages-Besucher: Seite sichtbar? Daten sichtbar? | **Page permissions** bzw. **Table permissions** über **Web roles** |
| Site nur für interne Tests | **Site visibility Private** |

### Canvas vs. modellgesteuert vs. Power Pages vs. Custom page

- **Canvas**: freies Layout, viele Quellen, mobil, aufgabenorientiert; Logik komplett in Power Fx. Grenzen: Business Rules ohne Ein-/Ausblenden; Delegation beachten.
- **Modellgesteuert**: aus Dataverse generiert, für verknüpfte Datensätze, BPFs, Dashboards, Commanding, Copilot-Chat, Agent Feed; nur Dataverse; Sharing in zwei Schritten.
- **Power Pages**: externe Nutzer, eigenes Sicherheitsmodell (Web Roles), Liquid/JS, Web Agents; braucht Dataverse und System Administrator zum Bereitstellen.
- **Custom page**: Canvas-Freiheit innerhalb der modellgesteuerten App – dem eingebetteten Canvas-App-Steuerelement vorzuziehen.
- **Generative page**: React-Seite per Beschreibung, wenn ein Layout schnell entstehen soll und Dataverse-Tabellen genügen (max. 6).

### Häufige Stolperfallen

- Environment Maker ≠ Datenzugriff. Global Admin ≠ System Administrator. Basic User deckt keine Custom Tables.
- Eine Rolle ohne *Include App Opener privileges* kann modellgesteuerte Apps nicht öffnen.
- Schema name, Table type und Ownership sind nach dem Erstellen fix; Spaltentypen ebenso (außer Text ↔ Autonumber).
- Rollups: 10/Tabelle, 100/Org, nur 1:N, keine Flows. Prompt-Spalten: 5/Tabelle, keine Formel-/Datei-/Bild-Eingaben.
- Business-Rule-Scope Entity ist der Standard und wirkt serverseitig; Choices-Spalten sind in Business Rules nicht nutzbar.
- Quick Create: nur eines aktiv, keine Rollen; Quick View: schreibgeschützt, keine Skripte; Fallback nur für Main-Formulare.
- System views: nicht im Selector, nicht in Subgrids/Dashboards, nicht löschbar.
- `Back()` nur nach `Navigate()`; `Set()`/`Collect()`/`UpdateContext()` nicht in Commands; Kommentar-Copilot nicht für `Navigate()`/`SubmitForm()`.
- App-Restore erzeugt eine neue Version; Everyone-Gruppe meiden; Coauthoring ist je App zu aktivieren.
- Approvals-Connector hat keinen Trigger; *First to respond* vs. *Everyone must approve*.
- Dataverse-Trigger: Select columns ohne Lookups und ohne die selbst geschriebenen Spalten (Endlosschleife); Filter rows ist effizienter als eine Condition; Run as braucht *Act on Behalf of Another User*.
- List rows: 5.000-Zeilen-Grenze ohne Fehler; Pagination; FetchXML ohne Aggregation; Row ID ≠ OData ID; N:N nur per Relate rows.
- Agent-Flow-Konvertierung ist einmalig; braucht Lösung und Copilot-Studio-Kapazität.
- BPF: 5 Tabellen, 30 Stages, 30 Steps, 10 aktive je Tabelle, AND *oder* OR, Regeln nur auf die vorherige Stage; Drafts sind unbenutzbar; Information disclosure durch Stage-Namen.
- Power Pages: neue Sites privat; Web Roles + Table permissions nötig, sonst leere Listen; Entra External ID empfohlen; Site-Agent braucht *Publish Copilots with AI features* und HTTP-Connector.
- Plans: Dataverse + Copilot + Locale nötig; Power BI wird vorgeschlagen, aber nicht erzeugt; Plan aus verwalteter Lösung → neue unverwaltete Lösung.
