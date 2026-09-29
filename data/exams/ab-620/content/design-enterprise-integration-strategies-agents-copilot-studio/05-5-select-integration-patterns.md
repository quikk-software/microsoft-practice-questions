---
title: "Select integration patterns for enterprise scenarios"
url: "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/5-select-integration-patterns"
uid: "learn.wwl.design-integration-strategies-agents-copilot-studio.select-integration-patterns"
module: "design-enterprise-integration-strategies-agents-copilot-studio"
moduleTitle: "Design integration strategies for agents in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Select integration patterns for enterprise scenarios

The previous units introduced the integration landscape, explored action patterns and their trade-offs, and covered authentication and governance constraints. This unit brings that knowledge together, applying it to the full Woodgrove Bank IT service desk scenario to show how each integration requirement maps to a specific pattern — and why.

## From requirements to patterns

For each system your agent needs to connect to, the integration pattern follows from purpose: is the integration about the agent _doing_ something, _answering_ questions from authoritative content, or _delegating_ specialized reasoning to another agent? That answer points to the right category. From there, the nature of the requirement narrows the field:

**For tools:**

*   Use a **prebuilt connector** when one exists; use a **custom connector** when the same API will serve multiple agents
*   Use a **REST API tool** for a one-off integration where connector packaging isn't justified — REST API tools are scoped to Copilot Studio and aren't available as shared resources across Power Platform
*   Use an **agent flow** when steps must execute in a defined sequence
*   Use **MCP** when a central tool server is shared (or planned) across multiple agents; for exploratory or single-agent scenarios, starting with a connector or REST API tool is faster

**For knowledge sources:**

*   Start with **built-in sources** (SharePoint, file uploads, Dataverse) when content already lives in those systems
*   Use a **Copilot connector** when non-Microsoft enterprise content should be semantically indexed and citable
*   Use a **real-time connector** when data can't be replicated and must always reflect its current state
*   Use **Azure AI Search** when your organization manages its own vector index

Before you commit to any pattern, confirm that authentication and DLP constraints in your target environment don't eliminate it.

The Woodgrove Bank IT architecture team applied this reasoning to each integration requirement for the IT service desk agent. The table below makes the reasoning visible at each step, not just the final answer. That reasoning is what transfers to your own scenarios.

## Applying the reasoning: Woodgrove Bank IT service desk agent

Integration requirement

Decision reasoning

Pattern selected

Bank IT knowledge base articles

Grounding; non-Microsoft indexed content; should be citable across Microsoft Search

Copilot connector

Live IT ticket status

Grounding; freshness-critical; data must not be replicated

Power Platform connector (real-time knowledge)

Submit an IT service request

Action (write); prebuilt connector available for the bank's IT service management system

Prebuilt connector tool

Send Teams notification

Action; prebuilt Microsoft Teams connector available

Prebuilt connector tool

Multi-step process: IT ticket → notify requester → assign to team queue

Action; deterministic sequencing across three steps; each step depends on the previous one completing successfully

Agent flow

IT issue escalation involving HR or compliance questions

Specialized HR and compliance reasoning; a dedicated HR agent is already published in the same environment

Connected agent (delegation)

No pattern in this table is chosen by default. Each one follows directly from the requirement — what the integration needs to do, how the data should be handled, and what the environment permits. A different scenario with different requirements might select different patterns from the same set.

Note

The reasoning in this table is a design recommendation, not a finalized deployment plan. Before moving from design to build, confirm with your Power Platform admin that each connector is permitted under your organization's DLP policy. A connector available in a developer environment may be blocked in production. If a preferred pattern is eliminated, revisit the reasoning with that option removed.
