---
title: "Understand the Agent2Agent (A2A) protocol"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/2-understand-a2a-protocol"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.understand-a2a-protocol"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Understand the Agent2Agent (A2A) protocol

Before configuring an A2A connection, it helps to understand what the protocol is, how it works, and when to choose it over other integration approaches. Fabrikam's situation (needing to connect to Northwind Traders' shipment tracking agent) illustrates why the choice of agent integration approach matters. In this unit, you'll learn what A2A is, explore how its core concepts enable cross-platform agent communication, and develop the decision criteria to know when A2A is the right choice.

## What is the Agent2Agent protocol?

The Agent2Agent (A2A) protocol is an open standard for agent-to-agent communication across platform boundaries. Where a REST API returns raw data and Model Context Protocol (MCP) provides controlled access to tools and data sources, A2A is purpose-built for **agent-to-agent delegation**: scenarios where one agent needs to hand off a task to another agent that manages its own reasoning, tools, and responses independently.

When a Copilot Studio orchestrator connects to an A2A-enabled agent, it doesn't call a function and receive a value back. Instead, it delegates a task to an external agent that works through it using its own capabilities and its own logic, and returns a structured, agent-generated response.

This distinction matters for the Fabrikam scenario. Northwind Traders' shipment tracking agent doesn't just query a database. It reasons about logistics events, interprets partial or delayed tracking data, and produces contextual responses matched to the user's question. That reasoning layer is what makes A2A the right approach.

## Core A2A concepts

A few key concepts are fundamental to understanding how A2A works and how to configure it effectively.

**Agent cards** are JSON discovery documents published at a well-known URL path (typically `/.well-known/agent.json` relative to the agent's endpoint). An agent card describes the agent's name, its purpose, the capabilities it supports, and its communication endpoint. When you enter an endpoint URL in Copilot Studio, it automatically retrieves the agent card to discover the agent's identity and populate the connection details.

**Tasks** are the unit of work in A2A. When your orchestrator delegates to an A2A agent, it sends a task containing the user's request along with relevant context. The external agent processes the task independently, using its own tools and reasoning, and returns a response.

**Context IDs** maintain conversation continuity across agent boundaries. When a user's session spans multiple turns, the context ID associates each delegated task with the same ongoing conversation. This allows the A2A agent to reference earlier turns in the session when forming its response, supporting more natural, multi-turn interactions than a stateless API call allows.

**Message content parts** carry the structured content of each A2A message: text, tool call results, metadata, and the conversation history from the orchestrator's session. This structured payload gives the A2A agent rich context to work from, not just a single isolated utterance.

## A2A versus MCP

Both A2A and MCP are modern standards designed for AI agent integration, but they serve different purposes.

**MCP** (Model Context Protocol) connects your orchestrator to tools, data sources, and agents exposed as MCP servers, in a controlled way. Your orchestrator selects tools, calls them individually, and synthesizes the results. The orchestrator governs which tools are invoked and how results are combined. This makes MCP well-suited for situations where you need precise, orchestrator-controlled access to discrete operations: for example, grounding your agent's responses in structured database records or invoking a series of tool calls that your orchestrator manages.

**A2A** connects your orchestrator to another agent that manages its own reasoning. The external agent is opaque: your orchestrator delegates a task, and the A2A agent decides how to handle it using its own tools, its own reasoning, and its own logic. You don't govern individual tool calls within the external agent. You delegate and receive a result.

MCP

A2A

**Best for**

Controlled tool and data access

Cross-platform agent delegation

**Orchestration**

Your orchestrator selects which tools to invoke and synthesizes the final output

The external agent uses its own reasoning and orchestration; its tools are opaque to your orchestrator

**Multi-turn support**

Limited (context management stays with the orchestrator)

Full (contextId allows context management across agents)

**Capability negotiation**

Requires client update when new modalities or tools are added

Dynamic negotiation — when the external agent gains new capabilities, your orchestrator adapts without requiring code changes

**Agent discovery**

Not applicable

Agent cards

**Typical use**

Data retrieval, tool invocation sequences

Cross-platform, cross-organization agent collaboration

MCP suits scenarios where you want strong orchestrator control over which tools are invoked and how results are synthesized. Choose it when you prefer control of the reasoning and weighting over flexibility. A2A suits scenarios where the agents are, or must be, opaque to each other — particularly when the workflow requires inputs from an agent owned by a different organization, or when the external agent may update its capabilities independently over time.

## A2A versus connectors

Connectors let your Copilot Studio agent call APIs and services and incorporate the returned data into its response. They're the right choice for straightforward integrations: looking up a record, submitting a form, triggering an external action. The agent receives the raw response and decides what to do with it.

A2A differs from connectors in three key ways:

HTTP Connector

A2A

**What you're calling**

An API endpoint

An agent

**What comes back**

Raw API data

An agent-generated response

**Context support**

Single request/response

Multi-turn, with conversation history

**Capability discovery**

Not supported

Agent card (auto-discovery at setup)

The core distinction is whether you're calling a service that returns data, or connecting to an agent that reasons about a task. If Northwind Traders offered a simple tracking API that returned a shipment status record, a connector would be the appropriate choice. But Northwind's agent reasons about that data: it contextualizes shipment events, interprets delays, and produces a response appropriate to what the user actually asked. That reasoning layer is what makes A2A the right approach.

## When to use A2A

Choose A2A when your integration scenario has these characteristics:

*   The external capability is a **standalone agent**: it has its own language model, its own tools, and its own orchestration
*   It runs on a **different AI platform**: cross-platform integration is A2A's core design purpose
*   It's **owned by a different team or organization**: A2A enables cross-organizational agent collaboration without requiring the partner to share their internal architecture
*   **Multi-turn interaction** is valuable: the external agent can maintain context across a session via context IDs

Choose a connector when you need raw API data from a service without an AI reasoning layer. Choose MCP when you need controlled, orchestrator-governed tool invocations. Choose A2A when you need to delegate a task to an external agent that handles it using its own reasoning and orchestration.

Northwind's shipment tracking agent fits the A2A pattern exactly: it runs on Northwind's own AI platform, manages its own reasoning about shipment status, and returns a structured, contextual response rather than raw API data. Connecting via A2A means Fabrikam's orchestrator can delegate tracking queries to Northwind's agent without needing to understand Northwind's internal tools or data structures.
