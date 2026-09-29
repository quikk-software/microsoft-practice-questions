---
title: "Govern agent lifecycle and costs"
url: "https://learn.microsoft.com/en-us/training/modules/evaluate-publish-manage-agents-copilot-studio/5-govern-agent-lifecycle-costs"
uid: "learn.wwl.evaluate-publish-manage-agents-copilot-studio.govern-agent-lifecycle-costs"
module: "evaluate-publish-manage-agents-copilot-studio"
moduleTitle: "Evaluate, publish, and manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Govern agent lifecycle and costs

Your work doesn't end when you publish an agent. You still need to control updates, access, data use, and costs.

This unit introduces governance and application lifecycle management (ALM). You learn why these practices matter and when to ask an administrator for help. You don't build a deployment pipeline in this module.

## Understand application lifecycle management

Application lifecycle management covers how you build, test, release, and update an agent. The main concepts are:

### Solutions

A _solution_ groups an agent with related items, such as workflows and connections. You can move the solution from a development environment to a test or production environment.

Use a solution from the start when other teams depend on the agent or when releases need formal review.

### Environment strategy

Many organizations use separate environments for development, testing, and production. This approach keeps unfinished changes away from live users.

You usually build in a development environment. An administrator or pipeline moves an approved version to test and production. Settings and connections might need different values in each environment.

### Environment variables and connection references

When an agent moves between environments, configuration values and connection details often differ. A SharePoint site URL in development might not be the same as in production.

*   **Environment variables** store values that differ between environments, such as a site address.
*   **Connection references** let each environment use the correct connector account.

Set up these items early when an agent connects to other services. Adding them after release takes more work and can cause errors.

### Pipelines and deployment automation

Power Platform Pipelines move solutions between environments. A pipeline can also require approval before a release.

As a maker, you might submit a deployment request and test the agent after deployment. An administrator or IT team usually configures the pipeline.

### Data loss prevention policies

Data Loss Prevention (DLP) policies control which connectors agents can use and which data can flow between services. An administrator configures DLP policies at the environment or tenant level. If your agent uses a connector that a DLP policy restricts, you see an error during authoring or at runtime. Contact your administrator to request an exception or to identify a compliant alternative connector.

### Role-based access and sharing

**Role-based access control** determines who can view, edit, share, and interact with agents. Makers control sharing at the agent level through Copilot Studio's sharing settings. Administrators enforce broader access policies through environment roles and security groups.

**Auditing** in Power Platform records creation, modification, sharing, and deletion events for agents and their components. Audit logs are available to administrators through the Power Platform admin center.

Before sharing an agent broadly, confirm:

*   All intended users have the required permissions to the knowledge sources and tools the agent calls.
*   Your organization requires administrator approval before the agent is available in Teams or Microsoft Copilot.
*   Regulatory or compliance requirements don't limit the data the agent can access or the users it can serve.

## Understand Copilot Credits

Copilot Credits are the billing unit for certain Copilot Studio activities. Agents powered by the GitHub Copilot harness draw from a Copilot Credit balance that your organization purchases. An administrator monitors this balance and the rate at which it's consumed.

### What consumes Copilot Credits

Runtime activities consume Copilot Credits. These include:

*   A user conversation where the agent calls its language model to generate a response.
*   A knowledge retrieval step that uses semantic search or a model-powered lookup.
*   A tool or workflow invocation that involves model-assisted input interpretation or output generation.
*   An evaluation run on the Evaluate tab, because each test conversation invokes the language model.

The amount consumed depends on the type of activity, the model being used, and the complexity of the operation. Microsoft publishes current consumption rates in the official licensing documentation. Avoid relying on rates documented in training materials because they change as pricing evolves.

### What doesn't consume runtime credits in the same way

Basic authoring activities—typing instructions, configuring tool inputs, saving changes on the Build page—don't typically consume the same type of runtime Copilot Credits as user conversations. However, testing on the Preview tab or running an evaluation does involve model invocations and may consume credits.

Note

Plan evaluation frequency with credit consumption in mind. Run evaluations at key milestones—before initial release and after significant changes—rather than after every minor edit. Use the Preview tab for quick checks during development.

### Monitor capacity and consumption

Administrators monitor Copilot Credit consumption and available capacity in the **Power Platform admin center**. If your organization's credit balance runs low, agents may fail to respond or return capacity-related errors. If you see unexpected failures on the Monitor tab that don't trace to a specific tool or connection error, contact your administrator to check whether the issue is capacity-related.

To limit unnecessary credit use, keep each test set focused on common scenarios. Run evaluations before release and after important changes. Use the Preview tab for quick checks while you build.
