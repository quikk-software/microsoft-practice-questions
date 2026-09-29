---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/6-knowledge-check"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.knowledge-check"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Module assessment

1.

A platform team deploys an enterprise MCP server exposing tools from four backend systems. Twelve agents across different teams in the same Power Platform environment need access to those tools, and the tool set is updated quarterly. Which characteristic of MCP makes it more suitable than configuring connector tools individually on each agent for this scenario?

All connected agents automatically reflect tool updates from the server without per-agent reconfiguration.

MCP servers allow makers to customize tool descriptions for each agent's specific orchestration needs.

MCP tools can be invoked deterministically from within topic nodes for predictable, controlled behavior.

2.

A maker needs to connect a single agent to one internal system that no other agents in the organization use. The maker also needs full control over the tool's description to ensure accurate orchestration. Which integration approach best fits this scenario?

A connector tool or REST API tool configured directly on the agent.

An MCP server connection using the onboarding wizard.

A knowledge source configured to query live data from the system.

3.

A maker is configuring authentication for an MCP server that uses OAuth 2.0 and supports Dynamic Client Registration with a discovery endpoint. Which OAuth 2.0 sub-type should the maker select to minimize the amount of configuration required?

Dynamic discovery

Dynamic

Manual

4.

A maker connects an agent to an MCP server and turns off the Allow all toggle, enabling only five of the server's fifteen tools. The server owner later publishes three new tools. What is the default state of those new tools on the agent?

The new tools are disabled by default and require the maker to explicitly enable them.

The new tools are enabled automatically because the agent is still connected to the server.

The new tools replace the five previously enabled tools and must be reconfigured.

5.

A maker is completing the MCP onboarding wizard and enters the server name, server description, and server URL. Which of these three fields has the most direct impact on the agent's ability to select the right tool at runtime?

The server description

The server name

The server URL

You must answer all questions before checking your work.

You must answer all questions before checking your work.
