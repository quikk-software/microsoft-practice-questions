---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/6-knowledge-check"
uid: "learn.wwl.take-action-external-systems-connector-rest-api-tools-copilot-studio.knowledge-check"
module: "take-action-external-systems-connector-rest-api-tools-copilot-studio"
moduleTitle: "Take action in external systems using connector and REST API agent tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Module assessment

1.

A maker needs to add a Microsoft Teams connector as a tool to their Copilot Studio agent so the agent can post messages on behalf of users. What is the correct starting point in the Copilot Studio interface?

Open the agent's Topics tab and add a connector call node to an existing topic

Open the agent's Tools tab, select Add a tool, and then select Connector

Open the agent's Settings page and configure the connector under Integrations

2.

A maker adds a connector tool to an agent and verifies that the connection is active and valid. During testing, the agent never invokes the tool, even when the user asks questions that clearly relate to the connected service. The tool is the only tool configured on the agent. What is the most likely cause?

The tool's description is too generic for generative orchestration to match to the user's requests

The connector requires a premium license that the current Copilot Studio plan doesn't include

The agent must be republished after adding the tool before generative orchestration can invoke it

3.

A maker wants all users of an agent to interact with a shared inventory database using a single shared service account. Individual users don't have accounts in the inventory system. Which connector tool credential mode should the maker configure?

User-provided credentials, because each user must sign in to the connected service when the tool is first invoked

Maker-provided credentials, because the agent should use the maker's shared connection for all users

No credential configuration is needed, because the agent reuses the maker's connection automatically for all users by default

4.

A maker attempts to switch a connector tool to maker-provided credentials, but the option isn't available in the Copilot Studio interface. What is the most likely cause?

The connector type doesn't support maker-provided credentials

The agent is configured for an unauthenticated or anonymous channel

The maker hasn't shared the connection with other users in Power Apps

5.

A maker uploads an OpenAPI specification that defines 14 endpoints for an internal time-tracking API. The agent only needs to retrieve employee time entries and submit time corrections. What is the recommended approach for selecting endpoints when creating the REST API tool?

Select all 14 endpoints to give the agent access to the full API surface

Select only the two endpoints the agent requires to minimize the tool surface area and reduce orchestration ambiguity

Select all GET endpoints and exclude POST and PATCH endpoints to limit the agent to read-only operations

You must answer all questions before checking your work.

You must answer all questions before checking your work.
