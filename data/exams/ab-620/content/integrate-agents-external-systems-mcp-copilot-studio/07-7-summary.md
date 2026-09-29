---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/7-summary"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.summary"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Summary

You now have the skills to connect a Copilot Studio agent to a centrally managed MCP server, configure authentication, and control which tools the agent can invoke. For the Woodgrove Bank team that means the account opening agent is connected to WoodgroveCore, authenticated with API key credentials, and scoped to the four tools its workflow requires.

## What you learned

*   **MCP (Model Context Protocol)** standardizes how agents connect to external tools and data by letting a server publish its catalog once, propagate updates to all connected agents automatically, and require generative orchestration for tool invocation.
*   The **MCP onboarding wizard** requires three fields to register a connection: server name, URL, and description — with the server description serving as the orchestrator's primary signal for deciding when to call the server.
*   Copilot Studio supports **None**, **API key**, and **OAuth 2.0** authentication for MCP connections, with OAuth offering three sub-types (dynamic discovery, dynamic, and manual) based on what the identity provider supports.
*   The **Allow all** toggle governs whether new server tools are automatically available to the agent or require explicit review, and MCP tool descriptions are read-only — updates must come from the server owner.

## Learn more

*   [Extend your agent with Model Context Protocol](/en-us/microsoft-copilot-studio/agent-extend-action-mcp)
*   [Connect your agent to an existing MCP server](/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent)
*   [Add MCP tools and resources to an agent](/en-us/microsoft-copilot-studio/mcp-add-components-to-agent)
*   [Use agent tools to extend agents](/en-us/microsoft-copilot-studio/guidance/agent-tools)
*   [Connect to Dataverse with MCP in Copilot Studio](/en-us/power-apps/maker/data-platform/data-platform-mcp-copilot-studio)
