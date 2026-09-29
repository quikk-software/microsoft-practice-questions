---
title: "Understand MCP and its role in Copilot Studio integration"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/2-understand-mcp-integration"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.understand-mcp-integration"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Understand MCP and its role in Copilot Studio integration

Before connecting the account opening agent to WoodgroveCore, it helps to understand what MCP is, how the Copilot Studio implementation works, and when it's the right integration choice versus the other options available to you.

## What MCP is

**Model Context Protocol (MCP)** is an open protocol that standardizes how AI models interact with external tools, data sources, and environments. Instead of each maker or development team defining its own integration logic, MCP creates a shared interface: an MCP server publishes its capabilities once, and any compatible agent can connect to them.

When you connect a Copilot Studio agent to an MCP server, the server exposes two types of components:

*   **Tools** are functions the agent can call to perform an action, such as retrieving a customer record or checking an application's status in the loan origination system.
*   **Resources** are file-like data the agent can read for context, such as an API response or a policy document.

The MCP specification defines a third component type called **prompts**, but Copilot Studio doesn't currently support it. When you're evaluating what your agent can do through MCP, tools and resources are what's available.

One of MCP's most practical properties is automatic synchronization. When the MCP server owner updates a tool or resource, such as changing a description, adding a parameter, or deprecating a function, Copilot Studio reflects those changes automatically across every connected agent. No per-agent updates or republication required.

At Woodgrove Bank, WoodgroveCore uses this synchronization model. The enterprise architecture team owns the server and manages the tool catalog for all five backend systems centrally. When the compliance vault team adds a new document verification function, it becomes available to every agent connected to WoodgroveCore — including the account opening agent — without any maker intervention.

## How MCP compares to connectors and REST APIs

Copilot Studio offers several ways to connect agents to external systems: **Power Platform connectors**, **REST API tools**, and MCP. Each approach involves different tradeoffs in setup, maintenance, and control.

Connectors / REST API tools

MCP

**Tool definition**

Defined per agent for each action

Defined centrally by the server owner; inherited by all connected agents

**Update model**

Manual updates required in each affected agent when the API changes

Updates propagate automatically to all connected agents

**Description control**

Maker controls each action's name, description, and parameters

Server-dictated; descriptions can't be edited in Copilot Studio

**Best for**

Agents with unique integration needs or fine-grained control requirements

Environments where many agents need the same tools

## When to use MCP versus connectors or REST APIs

MCP is a strong fit in some scenarios and the wrong choice in others. Use this framework to decide:

**Use MCP when:**

*   Multiple agents in your organization need access to the same set of tools.
*   An enterprise or platform team manages a centralized tool registry and owns the server.
*   You want tool updates to propagate to all consuming agents automatically, without per-agent reconfiguration.
*   A prebuilt Microsoft MCP connector covers the service you need.

**Use connectors or REST APIs when:**

*   Only one agent needs a particular integration. The added structure of an MCP server isn't justified for a single consumer.
*   You need fine-grained control over each action's description. Makers can't edit MCP tool descriptions inside Copilot Studio.
*   A topic needs to invoke the integration directly. Topics can't call MCP servers. Only generative orchestration can invoke MCP tools.
*   The MCP server's existing tool descriptions aren't precise enough for reliable orchestration.

## Generative orchestration and MCP

Understanding how MCP tools are invoked matters before you connect your agent, especially if you're used to topic-based integrations.

**Generative orchestration** is the agent's mechanism for dynamically selecting which tool, topic, or knowledge source best addresses a user's request at runtime. When the user sends a message, the orchestrator evaluates all available tools and selects the most appropriate one based on the user's intent, the current conversation context, and each tool's name and description.

MCP tools are invoked exclusively through generative orchestration. Topics can't call MCP servers directly. This is a current, known limitation of the MCP implementation in Copilot Studio. If you need deterministic, topic-controlled invocation of a backend system, a connector or REST API tool is the right choice.

There's one more constraint that directly affects production readiness: makers can't edit MCP tool descriptions inside Copilot Studio. The descriptions come from the server and are maintained by the server owner. Because the orchestrator uses those descriptions to decide when and how to invoke each tool, orchestration quality depends directly on how well those descriptions are written.

Before connecting your agent to an MCP server for production use, review the tool descriptions on that server. Are they specific enough for the orchestrator to reliably select the right tool? Do they accurately describe the scenarios where each tool applies? If the descriptions are vague or ambiguous, orchestration behavior will be inconsistent. There's no way to correct unclear descriptions from within Copilot Studio.

At Woodgrove Bank, maintaining clear, accurate tool descriptions for the five backend systems is part of the enterprise architecture team's responsibility. That ownership model is central to what makes a centrally managed MCP server function reliably for all consuming agents.

## Prebuilt Microsoft MCP connectors

You don't always need to configure a custom MCP server. Microsoft provides prebuilt MCP connectors for a growing catalog of Microsoft services, including Dataverse, Dynamics 365 (Sales, Finance, Service, and others), Microsoft 365 Outlook, GitHub, and Microsoft Teams. These let you add Microsoft-service tools to your agent without setting up a custom endpoint.

For services where a prebuilt Microsoft connector isn't available, including enterprise systems managed by your own platform team or external partner services, you can connect to any MCP-compliant server using its server URL through the onboarding wizard.

Microsoft also provides **Work IQ MCP** tools, currently in preview, that ground your agent in real-time Microsoft 365 context across email, calendar, and Teams conversations. Work IQ MCP tools appear in the same prebuilt catalog and follow the same onboarding process as other Microsoft MCP connectors. A Microsoft 365 Copilot license is required to use them, and your organization's administrator must enable the specific Work IQ MCP servers in the Microsoft 365 admin center before they're available for agents to connect to.
