---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/1-introduction"
uid: "learn.wwl.take-action-external-systems-connector-rest-api-tools-copilot-studio.introduction"
module: "take-action-external-systems-connector-rest-api-tools-copilot-studio"
moduleTitle: "Take action in external systems using connector and REST API agent tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Introduction

Most enterprise agents need to do more than answer questions. When a user asks an agent to update a record, retrieve data from a back-end system, or trigger a business process, the agent needs to take action in an external system in real time. Copilot Studio supports several approaches for these actions: connector tools, REST API tools, agent flows, and MCP servers among them. Connector tools and REST API tools share a common pattern: both connect an agent directly to a specific, known API using a schema-defined interface, without requiring custom integration code.

Note

Microsoft Copilot Studio has introduced a new experience with updated features, capabilities, and navigation. This module is based on the **classic experience**. For more information, see [Classic vs. new agent experience](/en-us/microsoft-copilot-studio/agents-experience/classic-vs-new).

## Scenario

Consider the IT operations team at Woodgrove Bank, building an employee IT service desk agent. The agent needs to submit requests to an IT service management system, retrieve configuration records from a CMDB, and look up employee IT profiles from an internal portal. Each integration requires the agent to read from or write to an external system — exactly the pattern connector tools and REST API tools are designed for.

## What you'll learn

This module covers how to add prebuilt and custom connector tools to a Copilot Studio agent, configure authentication, and create REST API tools from an OpenAPI specification.

## Goal

By the end of this module, you'll be able to configure Power Platform connectors and REST API tools as action integrations on your Copilot Studio agents, enabling them to read from and write to a wide range of external enterprise systems.
