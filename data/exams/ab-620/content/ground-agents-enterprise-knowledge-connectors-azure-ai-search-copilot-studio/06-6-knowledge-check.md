---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/6-knowledge-check"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.knowledge-check"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Module assessment

1.

An organization needs to ground an agent's responses in IT procedure articles that are updated monthly and must appear with inline citations. Which knowledge source type is the best fit?

A real-time Power Platform connector knowledge source

A Copilot connector knowledge source

An Azure AI Search knowledge source

2.

A maker needs to publish an agent with a Copilot connector knowledge source to an authenticated Teams channel. What must the maker add to the channel's manual authentication configuration to ensure the agent can retrieve connector content at runtime?

The `User.Read` Microsoft Graph scope

The `ExternalItem.Read.All` Microsoft Graph scope

The `Sites.Read.All` Microsoft Graph scope

3.

A maker is configuring Azure AI Search as a knowledge source but mistakenly enters the service endpoint URL and API key directly into the knowledge source form instead of using the Create new connection dialog. What is the likely consequence?

The connection works, but the knowledge source shows a degraded status until the next index refresh

The knowledge source is added successfully, but citations don't appear in agent responses

A faulty environment-level data connection is created that can prevent all agents in the environment from adding Azure AI Search knowledge sources

4.

An organization's agent needs to answer questions about current inventory levels from a warehouse management system. Data residency requirements prevent copying any inventory data outside the source system. Which knowledge source approach satisfies both requirements?

A Copilot connector knowledge source

A real-time Power Platform connector knowledge source

An Azure AI Search knowledge source pointing to an index in the organization's Azure subscription

5.

A maker connects an Azure AI Search knowledge source and wants agent responses to include a link back to the original document. The index contains a `source_url` field with the full document URL and a `metadata_storage_path` field. Which field does Copilot Studio use as the citation URL?

`source_url`, because custom URL fields take precedence over system fields

`metadata_storage_path`, because Copilot Studio checks for this field first

Neither field — citation URLs must be explicitly mapped in the knowledge source configuration dialog

You must answer all questions before checking your work.

You must answer all questions before checking your work.
