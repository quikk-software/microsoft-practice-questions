---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/1-introduction"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.introduction"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Introduction

As agents take on more complex enterprise workflows, teams increasingly need a way to connect them to multiple backend systems without wiring each agent to each system individually. Model Context Protocol (MCP) addresses this challenge by providing a standardized interface that lets an MCP server publish tools once and have every connected agent use them automatically — including receiving updates without republishing.

## Scenario

At Woodgrove Bank, the platform team has deployed WoodgroveCore, a centrally managed MCP server that exposes tools from several backend systems: the core banking ledger, loan origination, and customer records. A maker building the bank's new account opening agent needs to connect it to WoodgroveCore, configure secure authentication, and select only the tools that are relevant to the account opening workflow. Rather than integrating each backend system individually, the team can connect to a single MCP server and let that server manage the tool catalog on behalf of all consuming agents.

## What you'll learn

In this module, you'll explore what MCP is and how it compares to other integration patterns available in Copilot Studio. You'll also learn how to connect an agent to an existing MCP server using the onboarding wizard, configure API key and OAuth 2.0 authentication, and manage which tools your agent can access.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## Goal

By the end of this module, you'll be able to connect a Copilot Studio agent to an existing MCP server, configure authentication, and manage which tools are available to your agent.
