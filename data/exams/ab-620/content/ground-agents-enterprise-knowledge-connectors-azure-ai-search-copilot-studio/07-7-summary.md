---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/7-summary"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.summary"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Summary

Throughout this module, you explored how to connect Copilot Studio agents to enterprise knowledge sources that go beyond SharePoint and Dataverse. Using the Woodgrove Bank branch staff support agent as a through-line, you saw how three distinct knowledge source patterns (Copilot connectors, Power Platform connectors, and Azure AI Search) can each serve a specific role depending on how data is structured, stored, and accessed.

## What you learned

*   Choosing the right knowledge source depends on whether the content benefits from semantic indexing and citations (Copilot connector), requires live data without replication (real-time Power Platform connector), or lives in an organization-owned vector index (Azure AI Search).
*   Adding a Copilot connector requires admin pre-configuration and the `ExternalItem.Read.All` scope when publishing to authenticated channels.
*   Real-time Power Platform connector knowledge queries data live at runtime without moving it into Microsoft 365, but doesn't support inline citations.
*   Azure AI Search connects through a formal data connection using Entra ID Integrated authentication, with citations driven by a URL field in the index.

## Learn more

*   [Copilot connectors versus Power Platform connectors as knowledge sources](/en-us/microsoft-copilot-studio/knowledge-graph-vs-power-platform-connectors)
*   [Add Copilot connectors as a knowledge source](/en-us/microsoft-copilot-studio/knowledge-copilot-connectors)
*   [Microsoft 365 Copilot connectors overview](/en-us/microsoft-365/copilot/extensibility/overview-copilot-connector)
*   [Add Power Platform connectors as knowledge (preview)](/en-us/microsoft-copilot-studio/knowledge-real-time-connectors)
*   [Add Azure AI Search as a knowledge source](/en-us/microsoft-copilot-studio/knowledge-azure-ai-search)
*   [Configure user authentication in Copilot Studio](/en-us/microsoft-copilot-studio/configuration-end-user-authentication)
