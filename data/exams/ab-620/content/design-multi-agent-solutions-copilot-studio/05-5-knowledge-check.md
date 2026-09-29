---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/5-knowledge-check"
uid: "learn.wwl.design-multi-agent-solutions-copilot-studio.knowledge-check"
module: "design-multi-agent-solutions-copilot-studio"
moduleTitle: "Design multi-agent solutions in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Module assessment

1.

A maker is designing a customer service solution where three business units — HR, IT, and Finance — each maintain their own procedures and need to evolve their agent components independently. Which characteristic of this scenario best justifies a multi-agent architecture?

Independent team ownership across three business domains means each team can build, update, and release their agent component without affecting the others.

Three domain teams means three times more actions will be needed, automatically exceeding the 30–40 action routing accuracy threshold.

The IT team's procedures are more complex than HR or Finance, requiring separate AI model configuration for that component.

2.

A procurement team needs to validate vendor contracts through three mandatory compliance checks in a defined order, then route approved contracts to a legal reviewer before final sign-off. No step can be skipped or reordered. Which orchestration pattern is most appropriate?

Orchestrator/subagent — the orchestrator can evaluate each compliance agent's output and decide which agent to call next.

Workflow-oriented — the process is deterministic with strict step ordering and a human approval gate.

A hybrid pattern: concurrent compliance checks for speed, followed by dynamic routing to the legal reviewer.

3.

An orchestrator agent team needs to add a billing capability to their solution. The capability doesn't yet exist, the same team will build and maintain it, and it only needs to be available through this specific orchestrator. Which agent type should the team use?

A child agent created within the orchestrator.

An existing Copilot Studio agent connected from the same environment.

A Microsoft Foundry agent to configure specialized model reasoning for the billing workflows.

4.

A logistics partner exposes a shipment tracking capability as a separately hosted agent that manages its own reasoning on a non-Microsoft platform. Which connection option is most appropriate when adding this capability to a Copilot Studio orchestrator?

Existing Copilot Studio agent: the partner's agent can be republished to the same Copilot Studio environment.

A2A protocol agent: the open Agent2Agent standard enables cross-platform agent communication without requiring the partner to rebuild their agent in Copilot Studio.

Microsoft Foundry agent: Azure AI Foundry can represent the partner's external reasoning configuration.

5.

A maker building a multi-agent solution is concerned that adding connected agents will negatively affect the end-user experience by making responses feel slower. Which characteristic of multi-agent architectures is most directly relevant to this concern?

The governance surface expands with each connected agent, which increases the maker's testing and security review workload.

Each connected agent adds latency from orchestration hops as the main agent delegates, waits for the connected agent's response, and incorporates it before replying.

Multi-agent architectures require more complex knowledge source configuration, which increases the time each agent needs to resolve a query.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
