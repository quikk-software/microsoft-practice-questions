---
title: "Choose between Copilot connector and Power Platform connector knowledge sources"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/2-choose-knowledge-source-approach"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.choose-knowledge-source-approach"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Choose between Copilot connector and Power Platform connector knowledge sources

The branch staff support agent at Woodgrove Bank must draw on three different knowledge pools, each with distinct characteristics. Before you configure any of those sources, you need to understand how Copilot connectors and Power Platform connectors differ. Choosing the wrong source type for a scenario leads to stale answers, unnecessary data replication, or missing citation support.

## Copilot connectors — the index-based approach

**Copilot connectors** (formerly Microsoft Graph connectors) work by ingesting and semantically indexing external content into Microsoft Graph. When a connected system goes through this indexing process, its content becomes searchable through Copilot Studio agents, Microsoft 365 Copilot, and Microsoft Search. Microsoft and partners make more than 100 pre-built connectors available through the [Copilot connectors gallery](/en-us/microsoftsearch/connectors-gallery), covering knowledge bases, project management tools, collaboration platforms, document stores, and more. If no pre-built connector exists for a specific system, a developer can build a custom one using the Microsoft 365 Agents Toolkit, the connector SDK, or the Copilot connector APIs.

Because the content lives in the Graph index, agents retrieve it using semantic search and can cite specific items in their responses. A branch staff agent answering "What's the procedure for escalating a suspicious login?" can surface the relevant IT procedure article and include a citation — because that article was indexed and is citable.

One dependency to plan for: an administrator must configure the Copilot connector in the Microsoft 365 admin center before you, as a maker, can add it to an agent. The indexing pipeline runs in the background and keeps the Graph index synchronized with the source.

Think of Copilot connectors as a "search and index" pattern: content is ingested once and becomes broadly searchable and citable across Microsoft 365 experiences.

## Power Platform connectors as real-time knowledge — the live API approach

**Real-time knowledge** using Power Platform connectors works differently. Instead of replicating data into Microsoft Graph, each query triggers a live API call through the connector at the moment the agent needs an answer. No data moves into Microsoft 365. The connector reaches out to the source system on demand.

This approach fits two distinct scenarios. The first is when data freshness is non-negotiable: current account balances, live inventory levels, up-to-the-minute ticket statuses, and order records must reflect the latest state. Indexing introduces lag; a real-time connector doesn't. The second is when replicating data into the Microsoft 365 tenant isn't permitted — for example, when data residency rules, privacy regulations, or compliance requirements prohibit copying sensitive records.

The trade-off is that real-time connectors don't offer inherent citation support the way indexed content does, and each query depends on the availability and latency of the target API.

Note

Real-time knowledge via Power Platform connectors is a preview feature as of April 2026. Behavior and UI may change before general availability.

## Decision criteria — when to use each

Use this comparison to match the knowledge source type to the requirements of a scenario.

Dimension

Copilot connector

Real-time Power Platform connector

Best for

Knowledge bases, documentation, wikis, ticket archives — static or slowly changing reference content

Transactional or frequently updated records — live balances, statuses, inventory

Data freshness

Indexed (may lag the source; freshness depends on the connector's sync cadence)

Live (reflects real-time state at query time)

Supports citations

Yes. Agents can cite indexed items.

Not inherent. Agents can reference returned data contextually.

Data replication required

Yes — content is copied into Microsoft Graph

No — data stays in the source system

Admin dependency

Admin configures in Microsoft 365 admin center

Makers and admins create connections in Power Platform

Who controls the index

Microsoft Graph

Source system — no separate index is created

Note

A common pitfall is choosing the wrong source for the data's nature. Using a Copilot connector for data that changes frequently results in stale answers due to indexing lag. Using a real-time connector for large bodies of reference content is slower than index retrieval and doesn't provide citation support.

Applied to the Woodgrove Bank scenario: "What's the procedure for escalating a suspicious login?" routes to the Copilot connector — the answer is a citable procedure article that changes rarely, which is a natural fit for indexed content. "What's the current balance on account 4471?" routes to the real-time connector — the answer must reflect the live account state, and replicating regulated banking data into Microsoft Graph wouldn't be appropriate.

> **Guiding question:** Think about two or three knowledge questions your users ask your agent regularly. For each one, ask: is the answer a relatively stable reference (a procedure, a policy, documentation) or live transactional data (a record's current state, a balance, a status)? That distinction should guide your knowledge source selection.

## Where Azure AI Search fits

A third pattern exists alongside the two connector approaches. When an organization maintains its own vector index outside Microsoft Graph, built and tuned for a specific document collection, Copilot Studio can connect to it directly through **Azure AI Search**. This pattern gives the organization full control over the indexing pipeline, embedding model, and relevance tuning, making it well suited for specialized content like a regulatory compliance document vault.

Azure AI Search is covered in depth later in this module. For now, think of it as the option to use when the data is semantically rich and unstructured, but governed by a custom indexing pipeline rather than Microsoft Graph.
