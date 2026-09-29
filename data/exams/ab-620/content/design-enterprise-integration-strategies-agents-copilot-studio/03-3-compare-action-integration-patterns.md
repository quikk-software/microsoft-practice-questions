---
title: "Compare action integration patterns"
url: "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/3-compare-action-integration-patterns"
uid: "learn.wwl.design-integration-strategies-agents-copilot-studio.compare-action-integration-patterns"
module: "design-enterprise-integration-strategies-agents-copilot-studio"
moduleTitle: "Design integration strategies for agents in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Compare action integration patterns

The previous unit established that tools are the right integration category when your agent needs to _do something_ in an external system. Within the tools category, each action pattern has different strengths, and selecting the wrong one can create maintenance overhead or performance constraints. This unit examines each pattern, surfaces the key trade-offs, and gives you a decision path for matching patterns to your scenarios.

## Tool-based integration pattern comparison at a glance

Pattern

Best for

Key trade-off

**Prebuilt connector**

Common Microsoft and non-Microsoft services

Large result sets slow responses

**Custom connector**

Proprietary REST APIs used across multiple agents

Setup overhead for single-use integrations

**REST API tool** _(preview)_

One-off integrations with proprietary APIs

Not available across Power Platform; preview only

**Agent flow**

Multi-step, deterministic sequences

Requires explicit error-handling design

**Model Context Protocol (MCP)**

Enterprise-managed shared tool servers

Requires generative orchestration; topics can't call MCP directly

**HTTP request**

Fast, one-off API calls

Not shareable; harder to maintain

**Bot Framework skills**

Reusing existing pro-code conversational components

Requires C# development; Azure costs; ALM outside Power Platform

## Power Platform connectors

**Prebuilt connectors** give you immediate access to a broad ecosystem of Microsoft and non-Microsoft services, including Teams, SharePoint, Dataverse, and hundreds of others. When a prebuilt connector exists for your target system, no development work is required. It's the fastest path to a working integration.

When no prebuilt connector fits, a **custom connector** is the next option: a low-code wrapper around a REST API defined using an OpenAPI specification. The key advantage over other patterns is reusability: build the connector once and reuse it across multiple agents and flows in your environment. That reusability justifies the setup overhead when the same API serves several agents.

Both types include built-in error handling and response parsing, and connector activity can be monitored through Application Insights as part of Copilot Studio's integration with Azure Monitor.

**Trade-offs:**

*   Large result sets significantly slow the agent's response time — scope your queries carefully.
*   Third-party connectors prompt users to enter their credentials by default. If users don't have those credentials, consider using maker-provided credentials instead.

For the Woodgrove Bank IT service desk agent, the first step is checking the Power Platform connector catalog. The bank's IT service management system has a corresponding prebuilt connector — no custom development required. The Microsoft Teams connector covers the Teams notification requirement through the same path: an existing connector, minimal configuration, and no code to write or maintain.

## REST API tools

Note

REST API tools are in preview and aren't suited for production use.

When no connector exists for a proprietary API and the overhead of building a connector isn't justified for a single use case, REST API tools offer a direct path. You provide an OpenAPI v2 specification to Copilot Studio (v3 specs are automatically converted to v2), and Copilot Studio creates tool actions from the endpoints defined in the spec, without the full connector packaging workflow. Authentication options include no authentication, API key, and OAuth 2.0.

**Trade-off:**

*   REST API tools are available only within Copilot Studio. They can be added to multiple agents via the Tools page, but they aren't available as a shared resource for Power Automate flows, Power Apps, or Azure Logic Apps the way custom connectors are.

The Woodgrove Loan Origination API, a proprietary internal REST API with no available connector, illustrates the choice well. If only one agent needs this API and connector packaging hasn't been prioritized, a REST API tool is a reasonable starting point. If multiple agents will need the same API in the future, a custom connector is the better investment.

## Agent flows

When an integration requires multiple steps that must execute in a defined sequence, agent flows are the right pattern. An agent flow chains together connector actions into a deterministic sequence, with Copilot Studio passing inputs to the flow and receiving the output when it completes.

Agent flows support capabilities beyond individual connector calls: human-in-the-loop approval steps, parallel execution branches, concurrency handling, and large file operations. Because the sequence is deterministic, behavior is predictable at design time.

Consider the IT service desk agent's new-ticket workflow. When a user submits a request, the agent needs to create the ticket, notify the requester via Teams, and route it to the appropriate team queue — three steps that must succeed in order. That's precisely the scenario agent flows handle best.

**Trade-offs:**

*   Performance is bounded by the API rate limits of the services the flow calls.
*   You must design explicit error-handling paths.
*   Response payloads from the flow back to the agent are subject to size limits.
*   Agent flows consume Copilot Studio credits based on usage — unlike Power Automate cloud flows, which run under per-user or per-process licensing — so factor expected volume into your licensing plan.

## Model Context Protocol

Model Context Protocol (MCP) addresses a different challenge: how to manage a large set of tools centrally and expose them consistently to many agents without per-agent configuration. MCP is an open, standardized protocol that defines how tools and resources are described, discovered, and invoked.

When an agent connects to an MCP server, it automatically discovers the tools the server exposes. When the server's tool definitions are updated because an underlying API changed, all connected agents pick up those changes without republishing. A central platform team owns the tool definitions; individual agent teams don't need to reconfigure their agents each time. By contrast, connecting the same API directly — whether through a connector tool or a REST API tool — requires each agent team to independently describe the tool's purpose and update those descriptions whenever the API changes.

Consider a future state at Woodgrove Bank: the central platform team builds a WoodgroveCore MCP server that exposes core banking APIs. Any new agent the bank builds can connect to that server and immediately access those tools, rather than each team independently configuring the same connections from scratch.

Work IQ illustrates the same pattern from a different direction. Rather than building their own MCP server, organizations can connect to Microsoft-published MCP servers that expose Microsoft 365 signals (emails, calendar events, Teams conversations) as tools agents can reason over. Work IQ Mail, Work IQ Calendar, and Work IQ Teams are all available in the MCP catalog in Copilot Studio and connect through the same workflow — so adding any of them requires no server setup, just selecting the server and connecting. This means agents can understand and act on real-time workplace context without any custom server infrastructure.

Note

Work IQ is currently in preview and requires a Microsoft 365 Copilot license in addition to a Copilot Studio license.

**Constraints:**

*   Generative orchestration must be enabled — classic mode doesn't support MCP.
*   Topics can't call MCP servers directly; only the orchestrator can invoke MCP tools.
*   Tool descriptions are defined on the server side — you can't enrich them with additional context about when to invoke the tool from within Copilot Studio.
*   MCP connections use Streamable HTTP transport; Server-Sent Events (SSE) transport is deprecated.
*   If no MCP server exists yet or you're prototyping, connecting to APIs directly is faster — MCP's setup overhead isn't justified until a shared server is available to manage centrally.

## Other tool-based integration patterns

Three additional patterns are worth knowing. **HTTP request nodes** let you configure direct API calls inline in a topic by specifying the URI, method, headers, and body. They're faster to set up than a custom connector for a one-off call but can't be shared across agents and can be difficult for other makers to support over time.

**Computer use** lets an agent interact with a system through its graphical user interface when no API exists. Before committing to this pattern, also evaluate Robotic Process Automation (RPA) via Power Automate desktop flows. RPA is the better choice when the user interface is stable and the automation logic is straightforward and rule-based. Computer use is better suited when interfaces vary or shift frequently, when decisions depend on what's visually displayed on screen, or when the automation needs to self-correct based on visual feedback. For production deployments, computer use requires a bring-your-own (BYO) machine registered in Power Automate; Microsoft-hosted machines support prototyping only.

**Bot Framework skills** are reusable pro-code components built with the Bot Framework SDK. If your organization has existing Bot Framework-based conversational components, you can register them in Copilot Studio and invoke them as nodes in a topic. They support synchronous execution and private endpoints, which makes them relevant when an existing investment already exists and rebuilding isn't justified. For new integrations, the overhead is significant: Bot Framework skills require C# development for ongoing support, incur Azure AI Bot Service costs separate from Power Platform licensing, and sit outside the Power Platform application lifecycle management toolchain.

## Choosing the right integration tool

Start with the prebuilt connector catalog. If a connector doesn't exist, determine whether multiple agents will need the same API. If they will, a custom connector's reusability justifies the investment. For a genuine one-off integration in a non-production context, a REST API tool is a simpler starting point.

If the integration requires a defined sequence of steps, including human approval steps, use an agent flow. If the enterprise manages or plans to build a central tool server, MCP removes per-agent configuration for every agent that needs those tools. If no server exists yet or the use case is exploratory, starting with a connector or REST API tool is faster — MCP's full lifecycle pays off when the organization is ready to manage a shared server centrally.

These patterns aren't mutually exclusive. The Woodgrove IT service desk agent might use a prebuilt connector for ticket operations, a prebuilt Teams connector for notifications, and an agent flow to orchestrate the multi-step new-ticket workflow, all within the same agent.

> **Guiding Question:** Think of one external system your agent currently connects to or needs to connect to. Walk through the decision heuristic above: is there a prebuilt connector? Does the integration require multi-step deterministic sequencing? Is this a shared tool used by multiple agents? What pattern does the heuristic point to?
