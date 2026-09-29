---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/6-summary"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.summary"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Summary

By extending a Copilot Studio orchestrator with A2A connections, makers can integrate agents from external platforms and partner organizations, expanding the orchestrator's capabilities without rebuilding what already exists elsewhere. The key is knowing when A2A is the right integration choice, configuring the connection correctly, and evaluating the integration from a responsible use standpoint before it reaches production users.

## What you learned

*   **The A2A protocol** is an open standard for agent-to-agent communication across platform boundaries. It enables an orchestrator to delegate tasks to external agents that manage their own reasoning, tools, and responses.
*   **Core A2A concepts** (agent cards, tasks, context IDs, and message content parts) define how agents discover each other and exchange structured, multi-turn communication.
*   **Choosing the right integration approach** depends on what you're connecting to: use A2A for opaque, cross-platform external agents; use MCP for controlled, orchestrator-governed tool access; use a connector for straightforward API data retrieval.
*   **Configuring an A2A connection** in Copilot Studio involves entering the endpoint URL, reviewing agent card metadata, writing a specific and accurate agent description, and selecting the appropriate authentication method: None, API key, or OAuth 2.0.
*   **Testing and validating** A2A connections goes beyond confirming a single delegation. Testing multiple prompt variations, reviewing the activity log, and refining the agent description to resolve routing ambiguities are all part of a thorough validation pass.
*   **Responsible use evaluation** before production deployment includes reviewing what data (especially conversation history) is shared with the external agent, confirming data processing terms with the external agent's operator, and limiting context sharing to what's necessary for the task.

## Learn more

*   [Connect an agent via the A2A protocol (Microsoft Copilot Studio documentation)](/en-us/microsoft-copilot-studio/add-agent-agent-to-agent)
*   [Multi-agent patterns (Copilot Studio architecture guidance)](/en-us/microsoft-copilot-studio/guidance/architecture/multi-agent-patterns)
*   [Actions and tool use patterns (Copilot Studio architecture guidance)](/en-us/microsoft-copilot-studio/guidance/architecture/action-tool-use)
*   [Agent2Agent (A2A) protocol specification](https://a2a-protocol.org/)
