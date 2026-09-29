---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/1-introduction"
uid: "learn.wwl.delegate-agent-tasks-child-agents-copilot-studio.introduction"
module: "delegate-agent-tasks-child-agents-copilot-studio"
moduleTitle: "Delegate agent tasks using child agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Introduction

When an agent handles multiple distinct but related tasks, keeping each one focused and well-organized improves both routing accuracy and maintainability. Child agents let you build that structure into a solution without creating separately deployed agents or splitting team ownership.

## Scenario

Consider a scenario at Fabrikam: a maker on the customer service team is building an order management agent. The agent needs to handle three related but distinct responsibilities: checking order status and tracking, processing returns and exchanges, and resolving delivery issues. All three are owned and maintained by the same team, and none of them needs to be published independently or reused elsewhere. By building a child agent for each responsibility, the maker can give each one its own scoped instructions and tools, keeping the orchestrator's routing clean and each child agent focused on what it does best.

## What you'll learn

In this module, you'll learn to create and configure child agents, set up structured data exchange between parent and child, and control when agents are invoked and how they're managed over time.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## Goal

By the end of this module, you'll be able to configure and manage child agents to organize a Copilot Studio agent solution into focused, well-routed domains.
