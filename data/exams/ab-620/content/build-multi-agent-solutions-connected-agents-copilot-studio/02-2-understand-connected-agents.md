---
title: "Understand connected agents in Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/2-understand-connected-agents"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.understand-connected-agents"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Understand connected agents in Copilot Studio

Before connecting any agent, it helps to understand exactly what connected agents are, how the orchestrator decides when to delegate to them, and what responsibilities you take on when you connect to an agent you don't own. In this unit, you'll build that foundation in the context of Fabrikam's vendor management agent.

## What connected agents are

A **connected agent** is a separately published, independently managed agent that an orchestrator connects to and delegates tasks to. Connected agents have their own lifecycle: they're built, configured, tested, and published independently, sometimes by entirely different teams on different platforms. From the orchestrator's perspective, a connected agent is a callable specialist: send it a task, get back a result.

This is meaningfully different from a child agent. A child agent exists inside the parent orchestrator, is owned and managed by the same team, and is published as part of the same solution. A connected agent has its own identity, its own publishing cycle, and its own settings. Connecting to one is more like establishing a partnership than building a component. Because connected agents are published independently, the same connected agent can be connected to multiple orchestrators across the organization, not just yours.

Child agents and connected agents can coexist in the same solution. An orchestrator might use child agents for capabilities the team owns directly, while also connecting to agents owned by other teams or platforms.

In the Fabrikam scenario, the Legal team's contract compliance agent is a connected agent. The Legal team owns it, maintains it, and publishes it on their own schedule. The procurement team building the orchestrator can connect to it and define how the orchestrator invokes it, but they can't modify the agent itself.

## How the orchestrator routes to connected agents

Routing in a multi-agent solution depends on descriptions. When the orchestrator receives a user message, it evaluates the message against the descriptions of all available options: topics, tools, child agents, and connected agents. For connected agents, the orchestrator treats each one like a tool with a description: the description tells the orchestrator what kinds of requests this connected agent handles.

When the orchestrator's generative AI determines that a user's message closely matches a connected agent's description, it delegates the task to that agent. The connected agent uses its own orchestration layer, including its own topics, tools, and knowledge sources, to generate a response. The result returns to the orchestrator, which presents it to the user and continues the conversation.

By default, the orchestrator passes conversation history to the connected agent so the connected agent can respond in context. You can disable this per connection if you don't want conversation context forwarded.

Because routing relies on descriptions, the clarity and specificity of those descriptions directly affect accuracy. Two connected agents with overlapping descriptions will confuse the orchestrator. Ambiguous boundaries lead to misrouting that can be difficult to diagnose after the fact.

## Available connected agent types

Copilot Studio supports several connection types for connected agents:

*   **Copilot Studio agents**: existing agents published in the same Power Platform environment. This is the most common integration type for connecting to agents built and maintained by other teams in the same organization.
*   **Microsoft Foundry agents**: agents built and hosted in Microsoft Foundry. This type brings advanced AI capabilities, including fine-tuned models and complex reasoning agents, into a Copilot Studio solution without rebuilding them.
*   **Microsoft Fabric Data agents**: agents published in Microsoft Fabric that translate natural language questions into queries over OneLake data sources. This type is well suited when you need to connect conversational interfaces to organizational data managed in Fabric.
*   **Agent2Agent (A2A) protocol agents**: cross-platform agents connected using the A2A protocol, an open standard for heterogeneous agent integration. This type enables connections to agents built on platforms other than Microsoft. A2A connections are covered in a separate module.
*   **Microsoft 365 Agents SDK agents**: agents built using the Microsoft 365 Agents SDK, primarily for developer-built scenarios on Microsoft 365 platforms.

## Governance responsibilities when connecting to agents

When you connect your orchestrator to a connected agent, you take on responsibility for that connection. This doesn't mean you're responsible for the connected agent's internal behavior. That's the owning team's domain. You are responsible for the data that flows between the agents.

Several governance responsibilities fall to the maker establishing the connection:

*   **Data flow appropriateness**: Confirm that any data passed to the connected agent, including conversation history, is appropriate under the agent's data processing terms, the organization's policies, and any applicable regulatory requirements.
*   **Quality and security standards**: Ensure the connected agent meets your organization's standards for quality and responsible AI. Connecting to a poorly tested or unvetted agent can undermine the orchestrator's reliability and trustworthiness.
*   **Permissions and approvals**: Verify that you have the necessary permissions to connect to the agent and that the agent's owning team has approved the connection.
*   **Observability and oversight**: Plan for how you'll monitor the connected agent's behavior within your solution. Connected agents produce their own conversation transcripts, separate from the orchestrator's. Understanding how to correlate both for debugging and oversight is part of managing a connected agent solution responsibly.

In the Fabrikam scenario, before connecting the Foundry-hosted risk assessment agent, the maker confirms with the Risk and Security team what data the agent processes, how responses are generated, and whether the agent has been through the organization's responsible AI review process.
