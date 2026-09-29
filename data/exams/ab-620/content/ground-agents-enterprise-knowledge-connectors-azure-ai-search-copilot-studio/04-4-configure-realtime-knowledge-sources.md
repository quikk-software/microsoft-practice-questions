---
title: "Configure Power Platform connectors as real-time knowledge sources"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/4-configure-realtime-knowledge-sources"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.configure-realtime-knowledge-sources"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Configure Power Platform connectors as real-time knowledge sources

The branch staff support agent at Woodgrove Bank already helps staff navigate IT procedures through the knowledge base connected in the previous unit. The next step is enabling the agent to answer live account questions — without copying sensitive financial data into Microsoft 365. Adding a real-time connector knowledge source lets the agent pull current data from the bank's core banking system at the moment a question is asked.

## How real-time connector knowledge sources work

Real-time connector knowledge is a preview capability in Copilot Studio that uses Power Platform connectors to fetch enterprise data at runtime. When the agent receives a question that maps to this knowledge source, it triggers a live API call through the connector and uses the response as grounding context for its answer.

Unlike Copilot connectors, which copy and semantically index content into Microsoft Graph, real-time connectors keep data in its source system entirely. Copilot Studio indexes only metadata (table names and column names), so the agent understands what's available to query. The actual data retrieval happens at runtime, under the authenticated identity of the user asking the question. This means access controls configured in the source system are honored during every call: users receive only data they're already authorized to see.

This architecture makes real-time connectors well-suited for financial balances, inventory levels, case statuses, and any other information that changes frequently and must stay in its originating system.

Note

Real-time connector knowledge sources are in preview as of April 2026. Behavior, configuration steps, and performance characteristics may change before general availability. Treat this as a demonstration-focused feature for now and monitor release notes before building production dependencies.

## Add a real-time connector knowledge source

With this architecture in mind, here's how to add a real-time connector to the branch staff support agent.

1.  Open the agent in Copilot Studio and select **Add knowledge** from the **Overview** or **Knowledge** page.
2.  In the **Add knowledge** dialog, select the real-time connector from the **Featured** list. If it doesn't appear there, select **Advanced** to browse all available connectors, then select the connector and select **Add**.
3.  Select **Sign in** to authenticate to the connector.
4.  Select the target location for the connector, provide your credentials, and then select **Next**.
5.  Select the tables or entities to use as the knowledge source. For the branch staff support agent, the maker selects the account data entity from the bank's core banking connector.
6.  Enter a name and description for the knowledge source. The description tells the agent's orchestrator when to route a question to this source. For example, the description for the Woodgrove Bank account connector might read "Live account balance and transaction data."
7.  Select **Add to agent** to complete the configuration.

After you add the connector, its status shows as **In progress** while Copilot Studio indexes the metadata. When the status updates to **Ready**, the agent can ground answers in live data. A question like "What's the current balance on account 4471?" is answered using data from the core banking system as of the moment it's asked — no cached copy, no stale balance.

## Understand governance and limitations

Consider the following when planning your use of Power Platform connectors as knowledge sources:

*   Real-time connector knowledge sources operate within the same governance framework as all Power Platform connectors. Your environment's **data loss prevention (DLP) policies** determine which connectors are available. If a connector is blocked by DLP, it won't appear as an option, and any existing connector knowledge source using it stops working. Before designing an agent around a specific connector, confirm your environment's DLP policies permit it.
    
*   **Premium connectors** require a Copilot Studio license that covers their use. Before adding a real-time knowledge source that depends on a premium connector, verify that your environment's license tier and connector availability align with your design.
    
*   Real-time connector knowledge is designed for **structured data**: the tables and entities of transactional systems. It doesn't provide semantic indexing or inline citations, so for reference content like policies or procedures where citable answers matter, a Copilot connector is a better fit, as you configured in the previous unit.
    
*   One important trade-off is **inline citations**. When an agent uses a Copilot connector, it can reference specific documents or articles in its responses because the content is semantically indexed. With a real-time connector knowledge source, the agent draws from live data but doesn't produce document-level citations, because there's no indexed document to reference. For regulated environments, this distinction matters: the agent surfaces current data accurately, but its sourcing is less auditable at the document level.
