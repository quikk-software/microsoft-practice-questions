---
title: "Understand connector and REST API tools in Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/2-understand-connector-rest-api-tools"
uid: "learn.wwl.take-action-external-systems-connector-rest-api-tools-copilot-studio.understand-connector-rest-api-tools"
module: "take-action-external-systems-connector-rest-api-tools-copilot-studio"
moduleTitle: "Take action in external systems using connector and REST API agent tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Understand connector and REST API tools in Copilot Studio

The Woodgrove Bank IT service desk agent needs to connect to three different external systems, each with different integration requirements. This unit introduces the two tool types the agent uses — connector tools and REST API tools — and how agents invoke them to take action at runtime.

## Connector tools: prebuilt and custom

**Power Platform connectors** act as low-code wrappers around external service APIs. Each connector exposes a set of specific actions — such as "Get a record" in Dynamics 365 or "Post a message" in Teams — that your agent can call as tools. Rather than writing raw API calls, you configure the connector in Copilot Studio and let the connector handle the underlying communication.

Copilot Studio supports two types of connector tools:

*   **Prebuilt connectors** are Microsoft-published and partner-published connectors covering thousands of services, including Microsoft services like Dynamics 365, SharePoint, Dataverse, and Teams, as well as many non-Microsoft services. If a prebuilt connector exists for your target system, it's the fastest path to a working integration with no development work required.
    
*   **Custom connectors** extend the connector ecosystem to APIs your organization already owns or exposes. A custom connector describes an external API using an OpenAPI specification and makes it available as a reusable integration across Copilot Studio, Power Automate, Power Apps, and Azure Logic Apps within the same environment. Custom connectors are created and managed in the Power Apps maker portal, which you can reach directly or from within Copilot Studio.
    

## REST API tools (preview)

**REST API tools** let you connect an agent directly to a REST API using an OpenAPI v2 specification, without creating a connector first. This path is useful when no connector exists for a target API and the overhead of building a full custom connector isn't justified for a single use case.

Note

REST API tools are currently in preview and aren't suited for production use. Capabilities and configuration options may change before general availability.

The key difference between a custom connector and a REST API tool is the creation pathway and breadth of reuse across Power Platform. A custom connector is built and registered through the Power Apps maker portal, making it available across Copilot Studio, Power Automate, Power Apps, and Azure Logic Apps. A REST API tool is created through a guided upload experience within Copilot Studio and is stored on the environment-level Tools page, where it can be added to other agents in the same environment — but it isn't available to other Power Platform products the way a custom connector is.

For the Woodgrove Bank scenario, submitting IT service requests to the IT service management system uses a prebuilt Microsoft Dataverse connector. Retrieving hardware and software configuration records from the CMDB uses the bank's existing custom connector. Looking up employee IT profiles from the employee portal API uses a REST API tool: no connector has been built for it, and only the IT service desk agent requires access.

## How agents invoke tools

With **generative orchestration** enabled (the default mode in Copilot Studio), the agent's AI orchestrator automatically determines which tool to invoke based on the user's request. At runtime, the orchestrator evaluates the user's message against each tool's name and description and selects the most appropriate action to fulfill the task.

This is why tool descriptions are critical. The most common reason an agent fails to invoke the right tool is a weak or vague description. A description like "A service for employee data" gives the orchestrator very little signal. A description like "Use this tool to look up employee IT profiles from Woodgrove Bank's employee portal, including assigned devices, access permissions, and account details" gives the orchestrator enough context to match it to the right user requests. Every tool you add should have a description written with the orchestrator's matching task in mind.

You can also invoke tools explicitly from within topic nodes for deterministic execution, bypassing generative orchestration when you need predictable, controlled behavior regardless of how the user phrases their request. For most agent-level integrations, generative orchestration is the appropriate invocation model.

## Connectors as tools vs. connectors as knowledge

Power Platform connectors serve two distinct roles in Copilot Studio: they can be used as action tools (covered in this module) and as knowledge sources (in preview). When configured as a knowledge source, a connector queries live data from the connected system at runtime to ground the agent's responses with current information. When configured as a tool, the connector enables the agent to take action in an external system.

The distinction matters for how you configure the integration. An agent looking up current inventory levels to answer a question uses a connector knowledge source. An agent updating an inventory record uses a connector tool. The configuration path and runtime behavior are different for each role.

> **Guiding question:** Think about the external systems your agents need to connect to. For each one, ask: does a prebuilt connector already exist for this service? If not, will multiple agents in your organization need access to the same API? Your answers determine whether a custom connector or a REST API tool is the better investment for each integration.
