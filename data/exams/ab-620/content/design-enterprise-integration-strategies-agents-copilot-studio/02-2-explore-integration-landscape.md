---
title: "Explore the Copilot Studio integration landscape"
url: "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/2-explore-integration-landscape"
uid: "learn.wwl.design-integration-strategies-agents-copilot-studio.explore-integration-landscape"
module: "design-enterprise-integration-strategies-agents-copilot-studio"
moduleTitle: "Design integration strategies for agents in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Explore the Copilot Studio integration landscape

When the IT architecture team at Woodgrove Bank sat down to plan the integrations for their IT service desk agent, they quickly realized they needed a framework before they needed a configuration guide. The agent needed to connect to multiple systems — but for different reasons. Some systems would feed the agent information; others would receive instructions from it. And for one capability, the right integration wasn't a system at all. This unit provides an overview of three core integration approaches: tools, knowledge sources, and agents.

## Explore agent integration approaches

Agent integration options in Copilot Studio can be categorized into three categories: **tools**, **knowledge sources**, and **agents**. Each one plays a different role in how your agent behaves at runtime.

**Tools** enable your agent to take action in external systems. When a user asks the agent to retrieve a record, update a ticket, or send a notification, the agent calls a tool to make that happen. Tools are the integration type for _doing_ things.

**Knowledge sources** ground your agent's responses in authoritative information from the content and data sources you configure. When a user asks a question, the agent searches its knowledge at runtime and uses what it finds to generate an accurate, relevant response. Knowledge sources are the integration type for _answering questions_.

**Agents** allow your agent to delegate tasks to other specialized agents. Rather than handling every request itself, your agent passes complex or domain-specific tasks to an agent better equipped for them. Agent connections are the integration type for _handing off reasoning_.

The choice among the three isn't a matter of preference. It follows directly from what the integration needs to do.

> **Guiding question:** Think about the various systems your agent needs to connect to. For each one, ask yourself: does the agent need to _do something_ in that system, _answer questions_ from it, or _hand off_ complex reasoning to a specialized agent? Your answers will guide your integration strategy.

## Take action using tools

When your agent needs to retrieve a record, update a status, or trigger a process, it likely needs a tool. Copilot Studio supports various types of tools, each suited to a different technical context:

Mechanism

Best when

**Prebuilt connectors**

A ready-made connection exists for the Microsoft or non-Microsoft service you need

**Custom connectors**

You need a low-code wrapper over a custom REST API your organization already exposes

**Agent flows**

You need a deterministic, multi-step automation sequence with the ability to design explicit error-handling paths

**REST API tools** _(preview)_

You want direct OpenAPI integration without packaging a full connector

**Model Context Protocol (MCP) servers**

Multiple agents need access to the same APIs, and centralized tool management eliminates per-agent configuration

**Computer use**

No API is available and the system only exposes a graphical user interface

**Bot Framework skills**

Your organization has existing pro-code conversational components built with the Bot Framework SDK to reuse

Copilot Studio's tool mechanisms also include **AI prompts** (prompt tools), which give you precise control over model selection, output format, and grounding. Unlike the agent's generative orchestrator — which selects tools based on descriptions and uses a fixed system prompt — AI prompts let you define exactly how the language model generates output, with support for models deployed through Microsoft Foundry. Use AI prompts when you need highly structured or stylistically constrained output, or when extraction tasks are too complex for general orchestration to handle reliably.

Each tool can be invoked in two ways: automatically, when the agent's generative orchestration selects the right tool based on the user's request; or explicitly, when you call the tool from within a topic node for deterministic control.

For the Woodgrove Bank IT service desk agent, ticket retrieval and update operations require read and write access to the bank's IT service management system. That's an action integration, not a knowledge source. A tools integration is the right fit. Sending Teams notifications follows the same logic: the agent must _do something_ in an external system, not answer a question from it.

## Ground responses using knowledge sources

When your agent needs to answer questions based on authoritative information from specific content or data, you likely need to add a knowledge source. At runtime, the agent's AI orchestrator searches its configured knowledge sources and uses what it finds to construct a response.

Copilot Studio supports the following knowledge source types:

Source type

Best for

**SharePoint**

Documents and pages hosted in SharePoint libraries

**Dataverse**

Structured records and tables in your Dataverse environment

**File uploads**

Documents added directly to the agent

**Public websites**

Publicly accessible web content

**Copilot connectors**

Non-Microsoft enterprise content (such as IT service management systems, wikis, project management tools, and code repositories) indexed into Microsoft Graph; supports semantic search and cited responses

**Power Platform connectors** _(real-time, preview)_

Live data queried at runtime directly from the source, with no data replication or movement

**Azure AI Search**

Vector indexes for semantic and hybrid search scenarios

**Unstructured data**

Files from OneDrive or SharePoint synced and vector-indexed in Dataverse, and third-party knowledge base articles (such as content from ITSM, CRM, and collaboration platforms) via Power Platform connectors

Each type reflects a different pattern for where data lives and how fresh it needs to be.

For the Woodgrove Bank IT service desk agent, access to the bank's IT knowledge base is a knowledge integration. The agent needs to _answer questions_ from a repository of articles, not take action within it. For live system status, however, the agent requires current accuracy, which maps to the real-time connector knowledge source.

## Delegate tasks to other agents

Sometimes the right integration isn't a direct integration with another system — it's another agent. Copilot Studio supports connecting your main agent to a range of agent types, all managed through the **Agents** page using the **Add an agent** workflow:

*   **Copilot Studio agents** — agents in the same environment that are published and configured to accept connections
*   **Microsoft Foundry agents** _(preview)_ — agents built in Microsoft Azure AI Foundry, connected via a Foundry project endpoint
*   **Microsoft Fabric Data agents** _(preview)_ — agents that reason over structured enterprise data in Microsoft Fabric
*   **Microsoft 365 Agents SDK agents** _(preview)_ — agents built in code using the Microsoft 365 Agents SDK, connected via their messaging endpoint
*   **Agent2Agent (A2A) protocol agents** — agents on any platform that expose an A2A-compatible endpoint, using the open A2A standard for cross-platform agent communication

In all cases, the main agent delegates tasks either automatically, when generative orchestration determines the request is better handled by the connected agent, or explicitly through a topic redirect.

For the Woodgrove Bank IT service desk agent, most requests are handled directly. But when an employee's issue involves sensitive HR or compliance considerations (questions outside the service desk's designed scope), delegating to a connected HR agent keeps each agent focused on its domain and lets the compliance logic evolve independently without touching the service desk flow.

## Matching the integration to its purpose

A single Copilot Studio agent can use tools, knowledge sources, and agent connections simultaneously. These categories are additive, not exclusive. The IT service desk agent will combine action tools (ticket updates, Teams notifications) with a knowledge source (the IT knowledge base) in the same configuration.
