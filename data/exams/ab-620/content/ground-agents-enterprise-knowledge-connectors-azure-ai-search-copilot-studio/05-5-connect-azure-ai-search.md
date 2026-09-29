---
title: "Connect an agent to Azure AI Search"
url: "https://learn.microsoft.com/en-us/training/modules/ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio/5-connect-azure-ai-search"
uid: "learn.wwl.ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio.connect-azure-ai-search"
module: "ground-agents-enterprise-knowledge-connectors-azure-ai-search-copilot-studio"
moduleTitle: "Ground agents with enterprise knowledge using connectors and Azure AI Search in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Connect an agent to Azure AI Search

The Woodgrove Bank team has already connected the branch staff support agent to the IT knowledge base and to live account data. Now the team needs to address a third knowledge type: the bank's regulatory compliance document vault. This collection lives in an Azure AI Search index that the bank's IT team built and maintains to meet regulatory requirements — documents that must remain in the organization's own index and can't flow through a standard Copilot connector. Copilot Studio supports connecting directly to that index, so the team controls the embedding pipeline, relevance tuning, and document access.

## Use a formal data connection — not manual endpoint entry

Before you add Azure AI Search as a knowledge source, there's one critical rule to follow: always go through the **Create new connection** dialog. Doing so creates a properly registered data connection at the Power Platform environment level.

Important

Always add Azure AI Search through the **Create new connection** dialog — never by manually entering an endpoint URL and API key directly in the knowledge source form. Manual entry creates a faulty environment-level connection that can block all agents in the environment from adding Azure AI Search as a knowledge source. To recover, reset the agent's external access or delete and recreate the affected agent.

The reason this matters: data connections for Azure AI Search are stored at the environment level, not at the individual agent level. A malformed connection doesn't just affect the agent you're working on. It can prevent the Azure AI Search dialog from loading for every agent in that environment. There's no in-product way to delete a broken data connection. To recover, reset the agent's external access or delete and recreate the affected agent.

Avoiding this problem takes only seconds: use **Create new connection** every time.

**Microsoft Entra ID Integrated** authentication is the recommended option. It uses the signed-in user's identity rather than a stored key or certificate, which removes the overhead of key rotation and aligns with your organization's identity and access management practices.

## Create the data connection

Once you understand the connection requirement, adding Azure AI Search as a knowledge source is straightforward. Follow these steps:

1.  Open the agent in Copilot Studio.
2.  Select **Add knowledge** from the **Overview** page, the **Knowledge** page, or the **Properties** panel of a generative answers node.
3.  In the **Add knowledge** dialog, select **Featured**.
4.  Select **Azure AI Search**, then select **Create new connection**.
5.  Choose an **Authentication type** from the options in the following table.
6.  Enter the details required for your chosen authentication type, then select **Create**. A green check mark confirms the connection was successful.
7.  Select **Next**.
8.  Enter the name of the Azure AI Search vector index to use. Only one index can be added per connection.
9.  Select **Add to agent** to complete the setup.

After you add the connection, it appears in the knowledge sources table with a status of **In progress** while Copilot Studio indexes the metadata. When indexing completes, the status changes to **Ready**, and you can test the knowledge source.

### Authentication type options

Choose the authentication type that matches your organization's identity and access management practices.

Authentication type

How it works

When to use

**Access Key**

Authenticates using an Azure AI Search admin or query key

Quick setup in non-production environments; requires ongoing key rotation

**Client Certificate Auth**

Authenticates using a client certificate

Environments with certificate-based identity requirements

**Service principal (Microsoft Entra ID application)**

Authenticates using an app registration

Automated or service-to-service connection scenarios

**Microsoft Entra ID Integrated**

Authenticates using the signed-in user's identity

**Recommended** — no key management required; aligns with organizational identity practices

For Woodgrove Bank, the team selects **Microsoft Entra ID Integrated** so the agent inherits the same identity controls the organization already applies to its compliance environment — no separate admin key to manage.

## Vector index requirements and semantic ranker

Copilot Studio supports vectorized indexes that use integrated vectorization. When you use integrated vectorization, document chunks in the index are embedded using an embedding model, and that same model vectorizes incoming queries at runtime, reducing the need to write custom functions and keeping the embedding and query pipelines consistent.

Creating the index — choosing an embedding model, configuring chunking, and running the vectorization pipeline — is an Azure AI Search admin task. When you reach this step in Copilot Studio, you're connecting to an index that has already been prepared. The Woodgrove Bank IT team built the compliance vault index in advance, so the maker enters the index name and moves on.

If your Azure AI Search service tier supports the **semantic ranker** feature and it's been enabled in Azure AI Search, you can activate it when configuring the knowledge source in Copilot Studio. Semantic ranker improves result ranking for natural language queries by applying language models to re-rank results — particularly helpful when compliance questions don't map to exact keywords in the index.

Note

The semantic ranker feature must be enabled in Azure AI Search before you can configure it in Copilot Studio. Availability depends on the service tier. See the Azure AI Search documentation to confirm whether your tier includes the feature.

## Configure citations

When the agent answers a question from the Azure AI Search knowledge source, it can surface a clickable link to the original source document. To enable citations, the index must include a field that contains the URL of the original document.

Copilot Studio checks for a field named `metadata_storage_path` first. If that field exists in the index, it uses it as the citation URL. If `metadata_storage_path` isn't present, Copilot Studio identifies whichever field contains a complete URL and treats that as the citation instead.

Woodgrove Bank's compliance vault index includes a custom `source_url` field that points to the internal document page for each compliance policy. Copilot Studio detects this as the citation URL automatically. When a branch staff member asks about transaction monitoring thresholds, the agent's response includes a link directly to the full compliance policy document — giving staff a clear path to verify the source.

Note

Confirm that your agent's users have permission to access the URLs returned as citations. If citations point to restricted internal pages, users who lack access won't be able to open the linked documents.

## Virtual network support

For organizations that run Azure AI Search behind a private endpoint, Copilot Studio supports virtual network (VNet) connections. This lets you connect to a search index without exposing it to the public internet.

To use this configuration, set up Virtual Network support in the **Power Platform admin center** before configuring the connection in Copilot Studio. After that configuration is in place, follow the standard steps to create the data connection as described in this unit.

Note

Virtual network support is typically an infrastructure decision made before a maker begins configuring knowledge sources. If your organization uses private endpoints for Azure AI Search, confirm with your Azure administrator that VNet support has been configured in the Power Platform admin center before you start the connection setup.
