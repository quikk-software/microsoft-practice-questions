---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/1-introduction"
uid: "learn.wwl.take-action-agent-conversations-topics-tools-copilot-studio.introduction"
module: "take-action-agent-topics-tools-flows-copilot-studio"
moduleTitle: "Take action from agent conversations using topics and tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Introduction

When users talk to an agent, they often need more than an answer. They need something to happen. An agent that can only respond to questions serves a narrow purpose. An agent that can check a live order status, trigger a refund, or look up a shipment from a third-party system becomes genuinely useful. In Microsoft Copilot Studio, tools are what make that action possible. You can add tools at the agent level, where the AI orchestrator selects them automatically during any conversation, or directly inside a topic, where they run at a specific, controlled point in the flow. This module focuses on the second approach: calling tools from within topics to connect conversations to external systems at exactly the right moment.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## Scenario

Consider Adatum Corporation, a fictional mid-size retail company that built a customer service agent to handle customer inquiries. The agent does a solid job answering common questions, but the team needs it to go further. Customers want to check the status of their orders in real time using data that lives in Dynamics 365. Approved returns need to trigger a refund workflow automatically. And when a customer asks about a shipment from a specific carrier, the agent needs to call a tracking API that has no Power Platform connector. Each of these scenarios requires the agent topic to reach out to an external system and do something, not just say something. The Adatum scenario threads through this module, illustrating each integration approach in context.

## What you'll learn

Throughout this module, you'll explore three ways to connect agent topics to external systems in Copilot Studio: adding tools to a topic to perform real-time actions in a service or system, calling an agent flow to run multi-step automation, and using the HTTP request node to call a REST API directly. For each approach, you'll see how inputs and outputs are mapped between topics and external systems, and how error handling keeps the conversation on track when things go wrong.

## Goal

By the end of this module, you'll be able to extend agent topics to take action in external systems by adding tools, calling agent flows, and configuring the HTTP request node.
