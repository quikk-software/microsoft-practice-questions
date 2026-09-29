---
title: "Connect a Microsoft Foundry agent"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/4-connect-foundry-agent"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.connect-foundry-agent"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Connect a Microsoft Foundry agent

Some capabilities in an enterprise environment are built using AI frameworks outside of Copilot Studio. Connecting your orchestrator to a Microsoft Foundry agent lets you bring those capabilities in—without rebuilding them. This unit covers what Foundry agents are, what you need before connecting, and how to configure the connection.

## What Foundry agents bring to your solution

A Microsoft Foundry agent is an agent built and hosted in Microsoft Foundry. Foundry agents can incorporate fine-tuned models, complex reasoning chains, multi-step tool orchestration, and custom knowledge configurations that go beyond what's practical to build directly in Copilot Studio. They're typically built by developers or data scientists, but their outputs are available to any system that can invoke them, including a Copilot Studio orchestrator.

From the orchestrator's perspective, a Foundry agent is a specialized external unit the orchestrator can delegate to. You connect to it using the agent's project endpoint URL and a unique agent ID. From that point, the orchestrator can invoke it like any other connected agent, using generative orchestration to route requests based on the agent's description.

In the Fabrikam scenario, the Risk and Security team built a vendor risk assessment agent in Microsoft Foundry using a fine-tuned model trained on third-party vendor data and security threat intelligence. Connecting to it gives the vendor management agent access to vendor risk analysis without rebuilding that modeling work in Copilot Studio.

Note

Connecting to Microsoft Foundry agents is a preview feature not meant for production. Confirm feature availability in your environment before building production solutions that depend on this integration.

## Prerequisites

Before connecting a Foundry agent to your orchestrator, the following must be in place:

*   **New Microsoft Foundry portal**: The Foundry agent must be created and published in the new Microsoft Foundry portal, not the legacy Azure AI Studio portal. Agents created in the legacy portal return a 404 error when Copilot Studio attempts to connect to them. If the agent was built in the legacy portal, the Foundry team must recreate it in the new portal before connection is possible.
*   **Project endpoint URL**: The URL of the Microsoft Foundry project that hosts the agent. This is available in the project settings in the Foundry portal.
*   **Agent ID**: The unique identifier for the specific agent within the Foundry project. This is available on the agent's details page in the Foundry portal.
*   **Access**: You must have sufficient access to the Foundry project, or the Foundry team must provide the endpoint URL and agent ID to you directly.

## Connect a Foundry agent to the orchestrator

1.  Open the orchestrator agent in Copilot Studio.
2.  On the **Agents** page, select **Add an agent**.
3.  Select **Connect to an external agent**.
4.  Select **Microsoft Foundry** as the connection type.
5.  Either create a new connection or select an existing one:
    *   To create a new connection, enter the **project endpoint URL** provided by the Foundry team.
    *   To use an existing connection created for this Foundry project previously, select it from the list.
6.  Enter a **name** for the agent as it will appear in the orchestrator. Choose a name that reflects the agent's role in your solution (for example, "Vendor Risk Analyst").
7.  Enter a **description** that describes the kinds of queries this agent should receive. This description is the routing signal the orchestrator uses to delegate to this agent.
8.  Enter the **agent ID** from the Foundry portal.
9.  Select **Add agent** to complete the connection.

After the connection is created, the Foundry agent appears on the **Agents** page alongside any other connected agents.

## Update the agent ID after connection

If the Foundry team replaces the underlying agent with a new version that has a different agent ID, you can update the agent ID without removing and re-adding the full connection:

1.  On the **Agents** page, select the connected Foundry agent.
2.  On the agent's details page, update the **agent ID** field with the new value.
3.  Save the changes.

The connection settings, description, and name remain unchanged. Only the agent ID is updated.

## Governance responsibilities for Foundry connections

Once you connect to a Foundry agent, any data sent to it, including user messages and conversation history, is processed by the Foundry-hosted agent. You're responsible for confirming that this data processing is appropriate before routing user traffic.

Before the connection goes live, resolve the following questions:

*   What data does the Foundry agent process, and does it log or retain conversation content?
*   Has the Foundry agent completed the organization's responsible AI review process?
*   What are the data processing terms for the Microsoft Foundry project?
*   Are there users or use cases for which routing to this Foundry agent would be inappropriate?

In the Fabrikam scenario, the maker confirms with the Risk and Security team that the vendor risk assessment agent has been through the organization's responsible AI review, that it doesn't retain conversation content beyond the current session, and that the data processing terms align with the organization's policies for procurement and third-party vendor data.
