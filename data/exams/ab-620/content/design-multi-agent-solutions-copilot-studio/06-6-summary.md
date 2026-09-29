---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/6-summary"
uid: "learn.wwl.design-multi-agent-solutions-copilot-studio.summary"
module: "design-multi-agent-solutions-copilot-studio"
moduleTitle: "Design multi-agent solutions in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Summary

You can now evaluate whether a multi-agent architecture is right for your scenario, determine when child agents are the appropriate approach and how to scope them, and design solutions using connected agents with the right connection option and coordination pattern.

## What you learned

*   **Multi-agent architectures** distribute workloads across specialized agents to address routing accuracy degradation, team ownership boundaries, and governance requirements — and they come with tradeoffs in latency and governance complexity that single-agent solutions don't carry.
*   **Child agents** are the right approach when your team owns the full solution and components don't need independent publishing or reuse. They add internal modularity without orchestration latency overhead, and their lifecycle is coupled to the parent agent.
*   **Connected agents** are needed when another team owns the capability, it already exists as a published agent, or it needs to be reusable across multiple orchestrators. The connection option you select — existing Copilot Studio agent, Foundry agent, Fabric Data agent, Microsoft 365 Agents SDK agent, or A2A — reflects where the agent was built and how it communicates.
*   **Coordination patterns** shape how connected agents collaborate: the orchestrator/subagent pattern supports dynamic, intent-driven routing for open-ended scenarios, while the workflow-oriented pattern enforces a deterministic step sequence for compliance-sensitive processes.

## Learn more

*   [Add agents to your agent](/en-us/microsoft-copilot-studio/authoring-add-other-agents)
*   [Orchestrator and subagent multi-agent patterns](/en-us/microsoft-copilot-studio/guidance/architecture/multi-agent-orchestrator-sub-agent)
*   [Workflow-oriented multi-agent patterns](/en-us/microsoft-copilot-studio/guidance/architecture/multi-agent-workflow-oriented)
*   [Multi-agent patterns (architecture guidance)](/en-us/microsoft-copilot-studio/guidance/architecture/multi-agent-patterns)
*   [How Microsoft redesigned its web assistant using multi-agent orchestration](https://www.microsoft.com/en/customers/story/26166-microsoft-microsoft-copilot-studio/)
