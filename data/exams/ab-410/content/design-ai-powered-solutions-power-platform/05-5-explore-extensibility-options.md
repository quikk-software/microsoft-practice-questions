---
title: "Explore extensibility options in Power Platform"
url: "https://learn.microsoft.com/en-us/training/modules/design-ai-powered-solutions-power-platform/5-explore-extensibility-options"
uid: "learn.wwl.design-ai-powered-solutions-power-platform.explore-extensibility-options"
module: "design-ai-powered-solutions-power-platform"
moduleTitle: "Design AI-powered business solutions with Microsoft Power Platform"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Explore extensibility options in Power Platform

No platform can anticipate every business requirement. Power Platform is built with a clear extensibility model: it provides high-value, low-code capabilities for most scenarios that are common across organizations. For the small portion that requires something more specialized, there's a layered set of extension points that let you go deeper without abandoning the platform.

Microsoft describes this as the **"no cliffs" principle**. You should never reach a dead end on Power Platform. If a built-in capability doesn't quite meet the requirement, there's always a supported way to extend it. Extensions can be made available to other low-code makers through connectors, components, and plug-ins that they use without needing to write code themselves.

Understanding the extensibility model is part of every functional consultant's toolkit. Not because you build all these extensions yourself, but because you need to know when a custom extension is needed, what kind it is, and who should build it.

## Extend connectivity

**Custom connectors** are the most common extensibility option. If Power Platform's 1,000+ prebuilt connectors don't include the external system or API you need, you can wrap any REST API as a custom connector using an OpenAPI definition. Once built, the connector is available throughout Power Apps, Power Automate, Copilot Studio, and Logic Apps. A developer builds it once, and low-code makers use it everywhere.

In Copilot Studio, agents can also call **REST API actions directly** as tools without requiring a full connector. This is a lighter-weight option for one-off integrations where you don't need the connector reused across the full platform.

**Model Context Protocol (MCP) tools** are an emerging pattern for agent scenarios. Copilot Studio agents can connect to any MCP-compatible service as a tool, enabling integration with an expanding ecosystem of AI-ready external services.

## Extend logic and data

When your business rules are complex, transactional, or need to run server-side regardless of which app or interface triggered them, **Dataverse plug-ins** are the right approach. Written in C#, plug-ins execute as event handlers on Dataverse data operations: a record save, an update, a delete. They're invisible to the end user but guarantee consistent enforcement of business logic across every channel.

**Custom APIs** extend the Dataverse API itself with new endpoints that encapsulate business logic. This is useful when flows or external systems need to call a named business operation, such as `CalculateInvoiceRisk`, rather than assembling the logic themselves.

For model-driven apps, **JavaScript client-side code** handles UI behavior that goes beyond what business rules and Power Fx can express, like dynamically showing or hiding fields based on complex conditions, or integrating with a non-Microsoft mapping service within a form.

## Extend the user interface and AI

When your app needs a UI element that doesn't exist natively, **Power Apps Component Framework (PCF)** lets a developer build it as a reusable component. PCF components are packaged in solutions and deployed to Dataverse, making them available to makers across the environment.

For **Power Pages**, the extensibility model includes Liquid templates for dynamic content rendering, custom CSS and JavaScript for front-end behavior, and the Power Pages Web API for direct Dataverse access from the browser.

When the AI models and prompts built into Power Platform don't meet your requirements—perhaps you need a fine-tuned model for a specialized domain—Bring Your Own Model (BYOM) in Prompt Builder lets you connect any model deployed in Azure AI Foundry. The 1,800+ models in the Azure AI Foundry catalog become accessible to your prompts, flows, and agents through the same low-code interface.

For agent scenarios that require full control over orchestration and model selection, the **Microsoft 365 Agents SDK** provides a pro-code framework for building agents that are still deployable through Copilot Studio and accessible via the same channels.

Extension type

When to use

Typically built by

Custom connector

External API not in the connector catalog

Developer (IT or ISV)

PCF component

UI control not available natively

Developer

Dataverse plug-in

Server-side business logic

Developer

Custom API

Reusable business operation endpoint

Developer

BYOM in Prompt Builder

Specialized or fine-tuned AI model

AI/ML engineer

Microsoft 365 Agents SDK

Full pro-code agent orchestration

Developer

Extensibility isn't something you need to design into every solution, but knowing where the boundaries are—and what options exist when you reach them—lets you give confident recommendations from day one.
