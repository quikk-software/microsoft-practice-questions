---
title: "Connect an existing Copilot Studio agent"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/3-connect-copilot-studio-agent"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.connect-copilot-studio-agent"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Connect an existing Copilot Studio agent

With a clear understanding of what connected agents are, you're ready to make your first connection. This unit walks through connecting an existing Copilot Studio agent to your orchestrator—from preparing the target agent to accept connections to configuring the orchestrator-side connection with a description tuned for accurate routing.

## Prerequisites for a Copilot Studio-to-Copilot Studio connection

Before you can connect to an existing Copilot Studio agent, three conditions must be met:

*   **Same environment**: The target agent and your orchestrator must both be in the same Power Platform environment.
*   **Published**: The target agent must have at least one published version. You can't connect to an unpublished agent.
*   **Connections enabled**: The target agent's settings must have "Let other agents connect to and use this one" turned on. If this setting was turned off, the agent's owner must re-enable it before the agent appears in the connection list.
*   **Owner or shared access**: You must be the owner of the target agent or have it shared with you.

For the Fabrikam scenario, the Legal team's contract compliance agent must already be published in the same environment as the vendor management agent, and the Legal team must have enabled connections on their agent before the orchestrator maker can proceed.

## Prepare the target agent to accept connections

Enabling connections is done on the target agent. In the Fabrikam scenario, the Legal team follows these steps:

1.  Open the target agent in Copilot Studio.
2.  Select **Settings** in the top navigation bar.
3.  On the **General** settings page, turn on **Let other agents connect to and use this one**.
4.  Optionally, if end users of the orchestrator need to authenticate to use the connected agent's capabilities, ensure the agent's authentication settings and user access configuration are aligned with the orchestrator's requirements.

Once this setting is enabled, the agent appears in the connection list when other makers browse for agents to connect to. Without it, the agent won't appear as an option in the connection flow, even if it's published in the same environment.

> **Guiding question:** In your organization, who would need to be involved to enable this setting on an agent owned by another team? What conversations about permissions, use case alignment, and data flows would you need to have before the other team enables this setting?

## Connect the target agent from the orchestrator

With the target agent configured to accept connections, the orchestrator maker connects to it:

1.  Open the orchestrator agent in Copilot Studio.
2.  On the **Agents** page, select **Add an agent**.
3.  Select **Connect to an external agent**.
4.  Select **Copilot Studio** as the connection type.
5.  From the list of available agents, select the target agent. Only agents in the same environment that have connections enabled will appear here.
6.  Review the agent's **name**, **instructions**, and **description**. The orchestrator uses the description for routing decisions, so confirm it accurately represents what this agent handles.
7.  Adjust the description locally if a more specific version would improve routing accuracy for your orchestrator.
8.  Configure whether to **pass conversation history to this agent**. This is enabled by default and passes the current conversation context to the connected agent so it can respond with awareness of prior exchanges. Disable it if forwarding conversation context isn't appropriate for this connection.
9.  Select **Add agent** to complete the connection.

After adding the agent, it appears on the **Agents** page of the orchestrator alongside any child agents or other connected agents.

## Write descriptions that route accurately

The description on a connected agent is the primary signal the orchestrator uses to determine whether to delegate an incoming request to it. A precise description prevents misrouting and avoids overlap between agents.

The default description is pulled from the connected agent itself, but you can edit it in the orchestrator's local copy. Changes made locally apply only to your orchestrator and don't affect the connected agent itself or any other orchestrators that may also be connected to it.

For the Fabrikam scenario, the Legal team's contract compliance agent might have a broad default description like "Reviews contracts for compliance." While accurate, this could overlap with vendor risk queries the Risk and Security Foundry agent handles. A more specific description like "Reviews contract terms in vendor agreements for alignment with Fabrikam's procurement standards, data processing requirements, and standard liability clauses" scopes the routing signal clearly and reduces ambiguity with other agents.

Effective descriptions share three qualities:

*   **Scope clarity**: they name specific topics or question types the agent handles, not broad categories
*   **Boundary setting**: they avoid language that could describe another connected agent (for example, "reviews compliance questions" when a separate agent handles vendor risk and security assessments)
*   **Query language alignment**: they use the kinds of words users would naturally use when asking about these topics

The [Advanced generative actions best practices](/en-us/microsoft-copilot-studio/advanced-generative-actions#best-practices) provides additional guidance on writing descriptions that enable accurate routing.

## Understand how the orchestrator's copy differs from the source

When you connect to a Copilot Studio agent, the orchestrator stores its own local copy of the connected agent's description. This local copy is what the orchestrator uses for routing—not the target agent's live description.

This has an important implication: if the Legal team updates the contract compliance agent's description after you've connected to it, the orchestrator's routing description doesn't update automatically. You must review connected agent descriptions periodically and update the local copy manually if the agent's scope or capabilities have changed.

Similarly, if the Legal team adds new capabilities to the contract compliance agent and republishes it, those capabilities are available to the orchestrator when the agent is invoked, but the orchestrator's description won't reflect them until you update the local copy.

Important

The orchestrator's local copy of a connected agent's description doesn't sync automatically when the source agent is updated. If the connected agent's purpose or scope changes, update the description in the orchestrator manually to keep routing accurate.
