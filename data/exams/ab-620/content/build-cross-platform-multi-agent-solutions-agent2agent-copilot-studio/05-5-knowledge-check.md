---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/5-knowledge-check"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.knowledge-check"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Module assessment

1.

A maker wants to connect their Copilot Studio orchestrator to a partner organization's support agent. The partner's agent runs on a different AI platform, manages its own reasoning and orchestration, and exposes an A2A-compatible endpoint. Which integration approach is most appropriate?

Connector

MCP connection

A2A connection

2.

What is the purpose of an agent card in the A2A protocol?

It stores the authentication credentials needed to connect to an A2A agent.

It is a JSON document that describes the A2A agent's name, capabilities, and endpoint, and is used by connecting systems to discover the agent.

It is a dashboard that shows the health and activity status of a deployed A2A agent.

3.

A maker is configuring an A2A connection to a partner's agent that requires authentication using a header named 'X-Partner-Key' and a shared secret string. Which authentication option should the maker select in Copilot Studio?

OAuth 2.0

None

API key

4.

After configuring an A2A connection to a shipment tracking agent, a maker tests the orchestrator and finds that some order status queries are being routed to the A2A agent instead of the internal order management agent. What is the most likely cause of this misrouting?

The A2A agent's endpoint URL is incorrect.

The A2A agent's description in the orchestrator is too broad and overlaps with the internal agent's purpose.

The A2A protocol doesn't support multi-turn conversations.

5.

Before deploying an A2A integration to production, a maker reviews the message payload and finds the conversation history sent to an external partner's agent includes a customer's account number captured earlier in the same session. The external agent only needs the current shipment query. What should the maker do?

Proceed with deployment because the account number could help the external agent provide a more personalized response.

Review the external agent's data processing terms and limit the conversation context passed to the A2A agent to only what it needs for the task.

Remove the account number capture step from the orchestrator to prevent future sessions from including it.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
