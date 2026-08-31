---
title: "Map business processes to AI-first solution patterns"
url: "https://learn.microsoft.com/en-us/training/modules/design-ai-powered-solutions-power-platform/4-map-business-processes-ai-first-patterns"
uid: "learn.wwl.design-ai-powered-solutions-power-platform.map-business-processes-ai-first-patterns"
module: "design-ai-powered-solutions-power-platform"
moduleTitle: "Design AI-powered business solutions with Microsoft Power Platform"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Map business processes to AI-first solution patterns

A business process is a series of steps that takes something in, like a request, an event, or a document, and produces something out, like a decision, a notification, or a record update. When you design a solution on Power Platform, your first instinct might be to map that process step-by-step into a flow or an app.

With AI-first design, the better question is: **which steps require human effort?** AI agents, automation, and intelligent models can handle more of the repetitive, rule-based, and information-intensive steps than ever before, leaving humans free for work that genuinely needs judgment, empathy, or accountability.

This shift isn't just about efficiency. It's about designing solutions that scale without proportionally scaling the people who run them.

## Three patterns for AI-first process design

When you analyze a business process through an AI-first lens, most processes fit into one of three patterns.

**Human-assisted** processes are primarily human-driven, but AI reduces friction at key points. A manager reviews and approves a document, but AI already extracted the key fields, checked for anomalies, and surfaced relevant policies. The human still decides; AI does the prep work.

**Agent-assisted** processes let an agent handle frontline interaction or routine steps, escalating to a human only when the situation requires judgment. A customer inquiry arrives, and the agent resolves 80 percent of cases automatically by drawing on a knowledge base and Dataverse data. The remaining 20 percent are routed to a human with full context already assembled.

**Fully autonomous** processes run from trigger to completion without human input. A new invoice arrives, AI Builder extracts the fields, an autonomous agent validates against contract terms in Dataverse, and if everything is within policy, the invoice is approved and queued for payment. A human only sees it if an exception is flagged.

Most real-world solutions use a mix of all three. Your job as a functional consultant is to identify which steps belong to which pattern and design the handoff points between them carefully.

## Identify built-in agents that accelerate your solution

One of the fastest ways to deliver AI-first solutions is to start with the agents Microsoft already provides. Rather than building from scratch, you can install, configure, and extend managed agents from the catalog in Copilot Studio.

**Managed agents in Copilot Studio** are ready-to-use agent solutions for common business scenarios, available from the Copilot Studio Create page. Each managed agent comes with prebuilt knowledge connections, flows, and capabilities. You can extend them with add-ons—packages of domain-specific skills and connections—to tailor them to your organization's needs.

**Power Apps built-in extensible agents** reduce the effort of building common in-app experiences. Four task-specific agents are available within model-driven and canvas apps at runtime:

*   **Data entry agent:** guides users through entering records accurately
*   **Data exploration agent:** helps users find and filter records using natural language, and generate charts and visualizations from view data
*   **Data summarization agent:** produces quick summaries of records, views, or datasets

These agents don't require a Copilot Studio license or custom configuration. They're embedded in the Power Apps runtime and can be enabled for your app users directly.

**The Document Processing Agent** in Copilot Studio is a prebuilt agent that monitors incoming documents, validates them against predefined rules, and controls the routing workflow. Rather than building document intake from scratch with AI Builder and Power Automate, this agent provides the orchestration layer, and you configure it to your document types and validation rules.

**Web agents in Power Pages** let you deploy conversational agents on your external portal that automatically reach users without building separate channel integrations.

## Map Contoso's invoice process to AI-first patterns

Let's apply this thinking to Contoso's invoice approval process. The current process looks like this:

1.  Finance receives an email with a PDF invoice attached.
2.  A staff member opens the PDF and manually enters fields into a Dataverse record.
3.  A manager reviews the record and approves or rejects it over email.
4.  Finance triggers payment manually after approval.

Mapping this to AI-first patterns:

*   **Steps 1–2 become fully autonomous.** A Power Automate flow triggers on email arrival, the Document Processing Agent (or AI Builder + Power Automate) extracts fields and creates the Dataverse record automatically.
*   **Step 3 uses a mixed pattern.** For invoices within policy thresholds, an autonomous agent validates and routes for payment automatically. For exceptions, it generates an exception record with full context and triggers a human-in-the-loop approval flow in Teams.
*   **Step 4 remains human-assisted,** but now the manager reviews a structured record in Power Apps with all data prefilled, rather than interpreting a PDF.

The result is a process where routine invoices are handled end-to-end without human input, and human attention is reserved for situations that genuinely need it. In the next unit, you'll learn what to do when the platform's built-in capabilities need to be extended to handle more complex or specialized requirements.
