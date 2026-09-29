---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/8-summary"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.summary"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Summary

Connecting a Copilot Studio orchestrator to independently published agents across Microsoft platforms lets you extend your orchestrator's reach into capabilities owned and maintained by other teams—building a coordinated, organization-wide capability network without rebuilding what already exists. In this module, you configured three Microsoft-platform connected agent types and built the skills to manage and validate those connections over time.

## What you learned

*   Connected agents are independently published agents that an orchestrator delegates tasks to using description-based generative routing.
*   You configure a connection to another Copilot Studio agent by enabling "Let other agents connect to and use this one" on the target agent's Settings page, then connecting from the orchestrator's Agents page and adjusting the local description to scope routing accurately.
*   You connect a Microsoft Foundry agent using its project endpoint URL and agent ID, both retrieved from the Microsoft Foundry portal.
*   You connect a Microsoft Fabric Data agent using a Fabric connection and selecting the published agent from the available agents list. Routing to Fabric Data agents from topic redirect nodes is not supported—routing must occur through generative orchestration based on the agent's description.
*   You manage connected agents by reviewing and refining descriptions when routing is inaccurate, using the Enabled toggle for temporary suspension without losing configuration, and disconnecting agents that are permanently retired.

## Learn more

*   [Add agents to your agent (overview)](/en-us/microsoft-copilot-studio/authoring-add-other-agents)
*   [Connect to an existing Copilot Studio agent](/en-us/microsoft-copilot-studio/add-agent-copilot-studio-agent)
*   [Connect to a Microsoft Foundry agent (preview)](/en-us/microsoft-copilot-studio/add-agent-foundry-agent)
*   [Connect to a Microsoft Fabric Data agent (preview)](/en-us/microsoft-copilot-studio/add-agent-fabric-data-agent)
*   [Fabric data agent concepts](/en-us/fabric/data-science/concept-data-agent)
*   [Multi-agent orchestration patterns](/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns)
