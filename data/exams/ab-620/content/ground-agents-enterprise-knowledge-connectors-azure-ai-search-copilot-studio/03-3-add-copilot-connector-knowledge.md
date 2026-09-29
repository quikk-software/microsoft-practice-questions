---
title: "Add Copilot connectors as knowledge sources"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/3-add-copilot-connector-knowledge"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.add-copilot-connector-knowledge"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Add Copilot connectors as knowledge sources

With the decision framework from the previous unit in hand, you can now explore what adding a Copilot connector knowledge source looks like in practice. In the Woodgrove Bank scenario, the bank's tenant administrator has already configured the IT knowledge base as a Copilot connector in the Microsoft 365 admin center. This unit covers how to add a pre-configured Copilot connector as a knowledge source and configure the authentication scope required for publishing to authenticated channels.

## Understand the admin prerequisite

Copilot connectors are configured at the tenant level by an administrator — not by individual makers. The connector setup involves indexing your organization's data into Microsoft Graph, which is an administrative task performed in the Microsoft 365 admin center. Before you can add a Copilot connector as a knowledge source, the tenant admin must configure it and make it available. As a maker, you select from the connectors your admin has already set up.

If the Copilot connector you're looking for isn't visible in the default list under **Advanced**, contact your admin.

For tenants with a Microsoft 365 Copilot license, your admin can also enable **Tenant graph grounding with semantic search** in the Copilot Studio settings. When enabled, this setting improves knowledge retrieval quality from Copilot connectors by using semantic search to surface more contextually relevant results.

## Add a Copilot connector as a knowledge source

When your admin has a Copilot connector ready, adding it to your agent is straightforward.

1.  Open your agent in Copilot Studio and go to the **Overview** page or the **Knowledge** page.
2.  Select **Add knowledge**.
3.  In the **Add knowledge** dialog, browse the list of available Copilot connectors. If the connector you need isn't visible in the default list, select **Advanced** to expand the full set of available connectors.
4.  Select the connector.
5.  Select **Add to agent** to complete the connection.

After adding the connector, configure the knowledge source with a name and description:

*   **Name**: Give the knowledge source a clear, descriptive name so you and other makers can identify it at a glance on the **Knowledge** page.
*   **Description**: Write a natural-language description of what the knowledge source contains. The agent's generative answers capability uses this description to route questions to the right source. A well-written description tells the agent which topics belong here. A vague or generic description reduces routing reliability and makes the agent less accurate.

For the Woodgrove Bank scenario, the IT knowledge base connector is already listed in the **Add knowledge** dialog. After adding it, the maker enters this description: _"Woodgrove Bank's IT knowledge base, including IT procedures, escalation guides, and service resolution articles."_ This description tells the agent precisely when to draw from this knowledge source — whenever a branch staff member asks about IT procedures, escalation paths, or service resolution steps.

> **Guiding question:** Think about a knowledge source in your own organization. How would you describe it so your agent knows precisely when to use it versus another source in the same agent?

## Configure authentication for publishing

Adding a Copilot connector knowledge source introduces one additional step before publishing: include the `ExternalItem.Read.All` Microsoft Graph scope in the channel's manual authentication configuration.

Copilot connectors index external enterprise data into Microsoft Graph. When a signed-in user sends the agent a question, the agent reads from that index on their behalf. The `ExternalItem.Read.All` scope grants the agent permission to read those indexed items for the authenticated user. Without this scope, the agent can't return content from the connector at runtime, even if the connector is correctly added and configured as a knowledge source.

This scope applies when publishing to any channel that requires manual authentication, such as a Teams channel or an authenticated web chat deployment. Add `ExternalItem.Read.All` in the **Scopes** field within the channel's manual authentication settings before you publish.

Important

If you publish an agent with a Copilot connector knowledge source to an authenticated channel without adding the `ExternalItem.Read.All` scope to the channel's authentication configuration, the agent won't return knowledge from the connector. Add the scope before publishing.
