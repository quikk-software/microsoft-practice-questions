---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/7-knowledge-check"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.knowledge-check"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Module assessment

1.

A maker wants to connect a contract compliance agent published by the Legal team to a vendor management orchestrator. Both Copilot Studio agents are in the same Power Platform environment, and the contract compliance agent is published. When the maker navigates to the orchestrator's Agents page to add it, the contract compliance agent doesn't appear in the available agent list. What's the most likely cause?

The contract compliance agent needs to be exported as a solution and imported into the orchestrator's environment before it can appear.

"Let other agents connect to and use this one" isn't enabled on the contract compliance agent's Settings page.

The orchestrator's maker needs to be added as a co-owner of the contract compliance agent before it can appear in the connection list.

2.

A maker needs to connect a Microsoft Foundry agent to a Copilot Studio orchestrator. The Foundry team provides the project endpoint URL and agent ID. After entering these values, the connection fails with a 404 error. What's the most likely cause?

The Foundry project's endpoint URL is only valid for 24 hours and has expired.

The agent was built and published in the legacy Azure AI Studio portal instead of the new Microsoft Foundry portal.

The maker needs to create a service principal with Foundry project permissions before the connection can succeed.

3.

A maker connects a Fabric Data agent to an orchestrator and configures a topic to redirect to it for all spend data queries using an agent redirect node. After testing, spend data queries don't reach the Fabric Data agent. What does the maker need to know about routing to Fabric Data agents?

Fabric Data agents require an additional authentication step in the topic before redirect nodes will work.

Routing to Fabric Data agents from topic redirect nodes isn't currently supported. These agents can only be invoked through generative orchestration based on the agent's description.

The topic redirect node only works for child agents. To redirect to a connected Fabric Data agent, the maker needs to use a topic action node instead.

4.

An orchestrator routes a query about vendor security incidents to a contract compliance connected agent instead of the intended vendor risk assessment connected agent. Both agents' descriptions contain the word 'compliance.' What change most directly resolves this routing ambiguity?

Add a topic to the orchestrator that intercepts queries containing the word 'compliance' and routes them to the vendor risk assessment agent.

Add more tools to the vendor risk assessment agent so the orchestrator has stronger signals to distinguish it from the contract compliance agent.

Rewrite both agents' descriptions to use specific, non-overlapping language that reflects the distinct subject domain each agent handles.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
