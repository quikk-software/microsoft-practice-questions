---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/1-introduction"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.introduction"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Introduction

As AI adoption grows across organizations, orchestrators often need to work with specialized agents already built and maintained by other teams—sometimes on entirely different platforms. Rather than rebuilding those capabilities from scratch, makers can connect to them directly, extending the orchestrator's reach without duplicating the work.

## Scenario

Consider a scenario at Fabrikam, where a maker on the procurement operations team is building a vendor management agent—an orchestrator that helps procurement staff evaluate new suppliers, review contract terms, and analyze spend data. The agent needs to surface three capabilities that are already built and maintained by other teams: contract compliance review managed by the Legal team in their own published Copilot Studio agent, vendor risk assessment built by the Risk and Security team in Microsoft Foundry, and procurement spend data queries powered by a Fabric Data agent the Finance team maintains. None of these are owned by the procurement team building the orchestrator, and none can be added as child agents because they're independently managed with their own publishing lifecycles.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## What you'll learn

This module uses the Fabrikam scenario to illustrate how to connect existing agents from across an organization to a Copilot Studio orchestrator. You'll explore what connected agents are and how the orchestrator routes to them. Then you'll work through connecting each of the three Microsoft-platform types: an existing Copilot Studio agent, a Microsoft Foundry agent, and a Microsoft Fabric Data agent. You'll also learn how to manage and test your connected agent solution so routing stays accurate as the solution grows.

## Goal

By the end of this module, you'll be able to configure and manage an orchestrator that delegates to independently published agents across Microsoft platforms.
