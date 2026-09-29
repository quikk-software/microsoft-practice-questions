---
title: "Design multi-agent solutions using connected agents"
url: "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/4-select-multi-agent-orchestration-pattern"
uid: "learn.wwl.design-multi-agent-solutions-copilot-studio.select-multi-agent-orchestration-pattern"
module: "design-multi-agent-solutions-copilot-studio"
moduleTitle: "Design multi-agent solutions in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Design multi-agent solutions using connected agents

When child agents aren't sufficient for a component, the second approach is to connect to an external agent. Connected agents are separately deployed and can be built by different teams, hosted on different platforms, or reused across multiple solutions. This unit covers when connected agents are the right fit, which connection option to use, how they coordinate with each other, and the governance responsibilities that come with connecting them.

## What is a connected agent

A **connected agent** is a separately published agent with its own orchestration, tools, knowledge, and deployment lifecycle. From your main agent's perspective, a connected agent looks like a "tool with a description": your agent routes to it based on that description, and the connected agent uses its own reasoning layer to handle what's been delegated. Connected agents can be owned by a completely different team, released through separate ALM processes, and made available to more than one orchestrating agent.

For Fabrikam's support solution, the account management capability is a natural connected agent. The People team owns and maintains it independently. Rather than rebuilding that capability inside the support solution, the support orchestrator connects to it.

## When connected agents make sense

Consider connected agents when:

*   Another team already owns and maintains the capability you need
*   The agent is already published and should continue operating independently
*   You need separate deployment, configuration, or testing cycles for that component
*   The capability should be reusable across multiple orchestrators

Child agents and connected agents can coexist in the same solution. A design might connect to three agents, each owned by its own business domain team, and each of those connected agents might have its own child agents for specialized subtasks within its domain.

## How connected agents coordinate

Once you've decided to use connected agents, the next question is how they coordinate. Not every solution structures this the same way: some rely on a central orchestrator to route requests dynamically, while others follow a predetermined sequence controlled by a workflow engine.

### The orchestrator/subagent pattern

In the **orchestrator/subagent pattern**, a primary orchestrator agent receives the user's input and dynamically decides which specialist agent is best suited to handle it. Subagents in this pattern can be child agents or connected agents — this unit focuses on connected agents as subagents, since that's the coordination challenge when agents are separately deployed and independently owned. The orchestrator doesn't execute the work itself. It manages the conversation, interprets what the user needs, and delegates to the right specialist at the right time.

This pattern excels in open-ended scenarios where the user's needs aren't predictable upfront. Consider a Sales Copilot that a team uses to support their pipeline work. Some interactions require a lead-scoring agent to assess opportunity quality. Others need a proposal-drafting agent to generate a customized document. The orchestrator doesn't need a fixed flowchart: it reads the user's request and decides which specialist to call. That dynamic routing is the defining characteristic of the pattern.

For Fabrikam's support solution, this is exactly the right structure. Users arrive with different needs (billing questions, technical issues, account changes), and the orchestrator determines which specialist domain agent to engage based on their input. Because the user's intent drives the routing decision rather than a predefined sequence, the orchestrator/subagent pattern fits naturally.

The pattern works best when:

*   The use case is open-ended with no predetermined process flow
*   Specialist agents are already available or optimized for reuse

There are situations where this pattern is the wrong choice. If the process requires every step to succeed before the next begins (like a legal contract review that must pass compliance checks in a defined order), dynamic routing introduces risk. The orchestrator might skip a step or change the sequence based on intermediate responses.

When consistent success rate and strict ordering matter, the workflow-oriented pattern is the better fit. Similarly, if each subagent requires a long response window, the orchestrator can hit timeout limits while waiting for results.

### The workflow-oriented pattern

The **workflow-oriented pattern** structures agent invocation as a predefined sequence or parallel set of steps, controlled by a workflow engine. Instead of an orchestrator deciding dynamically what to do next, the workflow defines the process explicitly: first call Agent A, then Agent B, then route to a human approval gate.

This predictability is the pattern's defining strength. It makes the solution deterministic: given the same inputs, the same steps run in the same order. That's what compliance-sensitive processes need. Consider a separate internal process at Fabrikam: the quarterly vendor contract review. The workflow validates each contract against multiple policy agents in a defined sequence, then routes to a legal reviewer before sign-off. There's no ambiguity about what step comes next, and the audit trail captures exactly which agents ran, in what order, and what they determined.

Workflow engines such as Power Automate, Logic Apps, Microsoft Foundry workflows, and Copilot Studio topics support this pattern. You model each step explicitly, with defined preconditions and post-conditions, so the process is auditable, pausable, and resumable.

The pattern takes two forms based on process needs:

*   **Serial workflow**: agents execute in sequence, with each step completing before the next begins. This form works best for quality gates and strict step ordering.
*   **Concurrent workflow**: multiple agents run in parallel and their outputs combine. This form suits quorum or voting decisions, or any process where parallel processing reduces completion time.

Use the workflow-oriented pattern when your process has well-defined steps with strong dependencies, requires a complete audit trail, or involves compliance workloads where consistent outcomes aren't optional.

## Choosing the right pattern

The following table summarizes the key decision factors:

Factor

Orchestrator/subagent

Workflow-oriented

Process structure

Open-ended, dynamic

Predefined, deterministic

Routing decision

Agent decides at runtime

Workflow engine defines upfront

Variability tolerance

Acceptable

Low: strict ordering required

Consistency requirement

Some variability accepted

High: same inputs produce same steps

Auditability

Moderate

Strong: every step is explicit

Typical use cases

Routing, advisory

Approvals, compliance audits

Human-in-the-loop

Optional

Supported via approval gates

## Options for connecting agents

When you connect an agent, the option you select reflects where that agent was built and how it communicates. Copilot Studio supports various connection options:

Connection option

Description

When to use

**Existing Copilot Studio agent**

A separately published agent in the same Copilot Studio environment, independently owned and deployed

An agent already exists in your environment; a different team owns it, or it needs a separate lifecycle

**Microsoft Foundry agent** _(preview)_

An agent built in Azure AI Foundry with its own model selection and reasoning configuration

Scenarios requiring specialized model or reasoning configuration beyond what Copilot Studio provides natively

**Microsoft Fabric Data agent** _(preview)_

An agent that enables conversational queries over OneLake data sources

A data engineering team has built analytics capability over structured data you need to surface conversationally

**Microsoft 365 Agents SDK agent** _(preview)_

An agent built using the Microsoft 365 Agents SDK with its own hosting and runtime

Scenarios where the agent is built and maintained using the Microsoft 365 Agents SDK outside of Copilot Studio

**A2A protocol agent**

An agent on a non-Microsoft platform that communicates through the open Agent2Agent (A2A) standard

Connecting to partner or cross-platform agents that manage their own reasoning and aren't hosted on Microsoft infrastructure

For Fabrikam, the data engineering team has already built a Fabric Data agent over analytics data from the organization's third-party IT service management system. Rather than rebuilding that analytics capability inside Copilot Studio, the support orchestrator connects to it, selecting the connection option based on where it was built and who built it. For the logistics partner exposing a shipment tracking agent on a non-Microsoft platform, the right option is an A2A protocol agent: the partner agent manages its own reasoning, and the A2A protocol provides the open standard for the two agents to communicate without a custom connector.

Note

The Microsoft Foundry, Fabric Data, and Microsoft 365 Agents SDK connection options are currently in public preview and aren't intended for production use. Additionally, Fabric Data agents can't be invoked using a topic Redirect node, and they don't function when your main agent is deployed to Microsoft 365 Copilot. Evaluate these limitations before selecting a preview option for your solution.

## Governance when you connect agents

Connecting to an agent, whether it lives in the same Copilot Studio environment, was built in Azure AI Foundry, or is hosted on an external platform, is a governance decision, not just a technical one. When your orchestrator calls a connected agent, you're extending the solution's trust boundary.

As the orchestrator's maker, you're accountable for ensuring that data flows between agents are appropriate, that permissions and approvals are in place before sensitive actions occur, and that observability is configured so you can trace what happened when something goes wrong. Connected agents generate their own transcripts separately from the orchestrator. Correlating those sessions is essential for debugging and for meeting audit requirements.

Security deserves particular attention. A connected agent may have access to resources the orchestrator doesn't: data systems, records, or APIs with write access. Before your orchestrator calls a connected agent that can modify or delete records, explicit approval controls need to be in place. The fact that the capability belongs to another team's agent doesn't transfer accountability away from you as the maker of the orchestrating solution.

Important

Connecting to an external agent extends your solution's trust boundary. Before your orchestrator calls a connected agent with write access to any system of record, verify that approval controls, data-sharing agreements, and security reviews are in place.

**Guiding question**: Think about a capability in your solution that another team owns or that exists as a separately deployed agent. Which connection option fits based on where it was built? Once connected, does your solution call it dynamically based on user intent, or invoke it as part of a predefined workflow? Those two answers shape your connection option and coordination pattern choices.
