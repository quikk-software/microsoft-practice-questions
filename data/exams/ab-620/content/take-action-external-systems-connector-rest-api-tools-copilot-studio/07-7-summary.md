---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/7-summary"
uid: "learn.wwl.take-action-external-systems-connector-rest-api-tools-copilot-studio.summary"
module: "take-action-external-systems-connector-rest-api-tools-copilot-studio"
moduleTitle: "Take action in external systems using connector and REST API agent tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Summary

In this module, you explored the two primary API-based action integration mechanisms in Copilot Studio and explored how to configure both through the Woodgrove Bank IT service desk agent scenario.

## What you learned

*   **Connector tools and REST API tools** are the two main paths for connecting a Copilot Studio agent to external systems. Connectors use the Power Platform ecosystem; REST API tools offer a lighter-weight path for direct API integrations within Copilot Studio.
*   **Adding connector tools** follows a consistent workflow through the agent's Tools tab. Tool descriptions are the most critical configuration field — the orchestrator uses them to decide when to invoke each tool.
*   **Authentication for connector tools** is either user-provided (each user signs in) or maker-provided (a shared identity for all users). Each mode has channel and deployment constraints.
*   **Creating REST API tools** starts with uploading an OpenAPI specification and rewriting the auto-generated description. Select only the endpoints the agent needs to keep the tool focused.
*   **Authentication for REST API tools** supports no authentication, API key, or OAuth 2.0, depending on what the target API requires.

## Learn more

To continue building on what you learned in this module, explore the following resources:

*   [Use Power Platform connectors as tools](/en-us/microsoft-copilot-studio/advanced-connectors)
*   [Add tools to custom agents](/en-us/microsoft-copilot-studio/add-tools-custom-agent)
*   [Extend your agent with tools from a REST API (preview)](/en-us/microsoft-copilot-studio/agent-extend-action-rest-api)
*   [Configure user authentication for tools](/en-us/microsoft-copilot-studio/configure-enduser-authentication)
*   [Configure and manage connections](/en-us/microsoft-copilot-studio/authoring-connections)
*   [Use shared tools from the Tools page](/en-us/microsoft-copilot-studio/library-add-actions#create-a-new-tool)
*   [Plan and design integration strategies](/en-us/microsoft-copilot-studio/guidance/integrations)
