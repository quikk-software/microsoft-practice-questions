---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/1-introduction"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.introduction"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Introduction

As AI solutions extend across organizational boundaries, integrating with agents built on external platforms becomes a critical capability. When those agents manage their own reasoning, tools, and orchestration, a standard API call isn't sufficient. You need a protocol designed specifically for agent-to-agent communication across platform and organizational boundaries.

## Scenario

Consider Fabrikam, Inc., where a maker on the customer service team is extending an order management agent. The agent already handles order status inquiries, returns and exchanges, and delivery issues for Fabrikam-fulfilled orders. But some orders are shipped through Northwind Traders, a third-party fulfillment partner, and customers are asking about those too. Northwind Traders has built a shipment tracking agent on their own AI platform. The agent has its own reasoning, its own tools for querying their logistics systems, and its own orchestration that the Fabrikam team doesn't control. A connector could call Northwind's tracking API, but Northwind's agent goes further: it reasons about shipment context, interprets in-transit events, and returns rich, contextual responses. Connecting to it requires a cross-platform agent integration approach.

## What you'll learn

The Agent2Agent (A2A) protocol is an open standard designed for exactly this kind of integration, enabling one agent to delegate tasks to another across platform and organizational boundaries. This module uses the fictional Fabrikam and Northwind Traders scenario to illustrate how to configure a Copilot Studio agent to collaborate with agents built by external partners. You'll explore what A2A is, compare it to other integration approaches, and learn how to configure and validate an A2A connection in Copilot Studio.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## Goal

By the end of this module, you'll be able to connect your Copilot Studio agent to an external A2A-enabled agent, configure authentication, and validate end-to-end agent delegation.
