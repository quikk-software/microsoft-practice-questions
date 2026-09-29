---
title: "Enable and manage MCP tools on an agent"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/5-enable-manage-mcp-tools"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.enable-manage-mcp-tools"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Enable and manage MCP tools on an agent

After configuring authentication for the WoodgroveCore connection, the account opening agent is ready for the final step before testing: deciding which of the server's tools the agent can actually use. Connecting the server makes all of its tools available by default. This unit covers how to apply selective control over that access.

## Viewing tools and resources

After the maker completes authentication and selects **Add to agent**, WoodgroveCore appears as a tool on the agent's **Tools** tab. Selecting the server from the tab opens its settings page, which includes two MCP-specific sections alongside the standard tool details.

The **Tools** section lists every tool the server publishes, with a name and description for each. Each tool has a description that the orchestrator reads at runtime to decide when to invoke it. These descriptions are set by the MCP server owner and are read-only inside Copilot Studio. You can't edit them from the agent configuration.

The **Resources** section shows a sampling of the resources the server makes available. Resources are data items (files, structured records, or other content) that an agent can reference for context when responding to a user. Resources differ from tools in an important way: they aren't independently callable by the agent. For the agent to use a resource, the MCP server owner must configure it as an output of one of the MCP tools on the server. The resource becomes available when the relevant tool returns it as part of its response.

For the account opening agent, WoodgroveCore exposes 12 tools spanning the core banking ledger, loan origination, and customer records systems — all enabled by default.

## Enabling tools selectively

By default, every tool from a connected MCP server is available to the agent. The **Allow all** toggle is on, which means the agent's orchestrator can invoke any tool the server publishes when it judges them relevant to a user's request.

For the account opening agent, this default isn't appropriate. The agent is purpose-built for a single workflow: guiding users through bank account opening. It needs access to only four tools: account eligibility check, identity verification, product catalog lookup, and application submission. Leaving all 12 tools enabled creates two problems:

*   **Orchestration ambiguity**: The orchestrator evaluates the descriptions of every available tool when selecting the best one for a request. With 12 tools in the candidate pool, the chance of invoking an unintended tool increases. Limiting the set to the four relevant tools keeps the orchestrator's decision space narrow, which leads to more accurate and predictable tool selection.
*   **Least privilege violation**: An agent should only have access to the capabilities it genuinely needs. If WoodgroveCore exposes tools for ledger reconciliation, loan modification, or document archival — none of which are part of the account opening workflow — the account opening agent has no business calling them.

To enable tools selectively, turn off the **Allow all** toggle. Individual toggles appear for each of the 12 tools. The maker reviews the full list and turns on only the four tools the account opening workflow requires. All other tools remain off.

## Understanding the governance implications

The **Allow all** toggle isn't only an operational setting — it's a governance decision about how the agent responds to future changes on the MCP server.

Allow all setting

Behavior when new tools are published

Trade-off

**On**

New tools are automatically enabled for the agent as soon as the server publishes them.

Convenient — the agent gains new capabilities without maker action. Appropriate when the server is trusted and tools are expected to be relevant.

**Off**

New tools appear in the list but remain disabled until a maker explicitly reviews and enables them.

Requires ongoing awareness of server updates, but provides full control over what the agent can invoke at any point in time.

Neither setting is universally correct. The right choice depends on the organization's governance posture and the trust level established with the MCP server owner.

At Woodgrove Bank, the platform team that operates WoodgroveCore manages a catalog of 12 tools shared across multiple business workflows, not just the account opening workflow. New tools may appear at any time for reasons unrelated to account opening. The maker turns off **Allow all** and manages tool selection manually, keeping the agent's capabilities bounded to the four tools the workflow requires.

> **Reflection question:** The **Allow all** toggle represents a trade-off between convenience and control. A team that turns it on trusts the MCP server owner to publish only relevant, safe tools and wants those tools to appear in the agent automatically. A team that turns it off accepts the overhead of manually reviewing and enabling new tools in exchange for explicit control. Given your organization's governance posture, which approach would you recommend, and what criteria would you use to evaluate a new MCP server before deciding?

## Working with tool descriptions

MCP tool descriptions are set on the server and can't be edited within Copilot Studio — what the server owner wrote is what the orchestrator reads. When reviewing a connected MCP server's tools, every description is read-only.

This matters because the orchestrator relies on those descriptions to decide when to invoke each tool. A description that's specific and accurate leads to reliable tool selection. A description that's vague or generic — for example, "performs a verification" with no context about what is verified or when the tool should be called — can cause the orchestrator to skip a relevant tool or invoke an inappropriate one.

If a description is insufficient, the only remediation path is to work with the MCP server owner to update it on the server side. There's no way to override or supplement tool descriptions within Copilot Studio. This reinforces why evaluating an MCP server before connecting it matters: description quality is part of that readiness assessment, alongside transport type and authentication support.

For the account opening agent, the maker reviews the descriptions for the four enabled tools (account eligibility check, identity verification, product catalog lookup, and application submission) and confirms they're specific enough for the orchestrator to distinguish between them. If any descriptions need clarification, the maker raises it with the WoodgroveCore team before the agent moves to testing.

With authentication configured and tools scoped to the four tools the workflow requires, the account opening agent has everything it needs from the MCP server.
