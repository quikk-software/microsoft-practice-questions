---
title: "Configure the generative answers node in a topic"
url: "https://learn.microsoft.com/en-us/training/modules/generate-ai-powered-responses-generative-answers-copilot-studio/2-configure-generative-answers-node"
uid: "learn.wwl.generate-ai-powered-responses-generative-answers-copilot-studio.configure-generative-answers-node"
module: "generate-ai-powered-responses-generative-answers-copilot-studio"
moduleTitle: "Generate AI-powered agent responses using generative answers in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Configure the generative answers node in a topic

The generative answers node is the core mechanism for knowledge retrieval inside a topic. In this unit, you'll learn how it differs from custom prompts, how to add it to a topic, which knowledge source types it supports, and how source priority works between the node and the agent.

## Two approaches to AI-powered responses

Copilot Studio provides two distinct mechanisms for incorporating AI into a topic.

The **generative answers node** is designed for knowledge synthesis. When a user asks a question, the node searches configured knowledge sources and generates a grounded response — effectively answering, "What does our content say about this?" The output is always drawn from a defined corpus of information.

**Custom prompts** take a different approach. Rather than synthesizing answers from sources, a custom prompt instructs the AI to perform a specific reasoning task: classifying a document, extracting key entities from user input, or evaluating a response against defined criteria. The output depends entirely on what the prompt instructs the model to produce.

In the Woodgrove Bank scenario, the team uses both: a generative answers node answers premium product questions from a structured knowledge base, while a custom prompt classifies documents submitted by clients. This unit focuses on the generative answers node. Custom prompts are covered in later units.

## Add a generative answers node to a topic

The generative answers node lives on the topic canvas. You place it wherever you want knowledge retrieval to occur in the conversation flow, not wherever a user happens to ask an open-ended question.

This placement is the key distinction from the agent's conversational boosting behavior. The Conversational boosting system topic fires at the agent level when no topic matches the user's input. The generative answers node, by contrast, is for situations where you know exactly when in a known conversation flow knowledge retrieval should happen, and you want it bound to specific sources.

In the Woodgrove Bank scenario, retrieval happens right after the agent confirms the client tier, so the generative answers node is placed after the condition node that routes premium clients into this flow.

To add a generative answers node:

1.  Open the topic from the **Topics** page.
2.  Select the **Add node** icon below the node after which you want knowledge retrieval to occur.
3.  Point to **Advanced**, then select **Generative answers**. A **Create generative answers** node appears on the canvas.

## Configure knowledge sources at the node level

With the node on the canvas, select **Edit** under **Data sources** on the **Create generative answers** node to open the configuration pane.

The node supports the following source types:

*   **AI general knowledge** — The model's built-in knowledge, without a connection to any external data source.
*   **SharePoint** — A SharePoint URL. The node uses Microsoft Graph Search to retrieve results. Requires Microsoft Entra ID authentication.
*   **Documents** — Files uploaded to Dataverse. The node searches the document content directly.
*   **Azure OpenAI on your data** — An Azure AI Search index connected through Azure OpenAI Service. Select **Classic data** to access this option.
*   **Bing Web Search** — Searches publicly available web content using Bing. No external configuration required. Select **Classic data** to access this option.
*   **Bing Custom Search** — A configured Bing Custom Search instance. Select **Classic data** to access this option.
*   **Custom data** — A Power Automate flow or other source you supply. Select **Classic data** to access this option. Custom data is covered in the next unit.

Note

Azure OpenAI on your data, Bing Custom Search, and Custom data aren't available from the standard knowledge sources panel. In the **Data source** pane, select **Classic data** to access these options.

For Woodgrove Bank's premium wealth management topic, the team connects to a dedicated SharePoint site that contains only the premium-tier product catalog, keeping responses tightly scoped to that tier's content rather than drawing from the broader investment product library.

## Understand source priority between node and agent levels

When a generative answers node has its own sources configured, those sources take priority over the agent-level sources for that node. Agent-level sources act as a fallback, used only when a node has no sources of its own. This design gives you precise control: a single topic can draw from a targeted knowledge corpus while the rest of the agent continues using the shared, broader knowledge.

In the Woodgrove Bank scenario, the agent-level sources cover all investment products across every client tier. The premium wealth management topic's node is configured with only the premium-tier SharePoint site, so this topic never surfaces standard product content, even though those sources exist at the agent level.

Tip

Avoid adding too many sources at the node level. A node that searches many sources returns broader results, which can dilute relevance and produce less focused answers. Scope node-level sources to the specific knowledge domain of the topic.

Important

If no relevant content is found, the generative answers node returns a "no information found" response rather than falling back to general AI knowledge — unless AI general knowledge is explicitly included as a source. For topics that must always return a useful response, add a **Condition** node after the generative answers node to handle the no-answer case with a fallback message or escalation path.
