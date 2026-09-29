---
title: "Understand multi-agent architectures in Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/2-understand-multi-agent-architectures"
uid: "learn.wwl.design-multi-agent-solutions-copilot-studio.understand-multi-agent-architectures"
module: "design-multi-agent-solutions-copilot-studio"
moduleTitle: "Design multi-agent solutions in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Understand multi-agent architectures in Copilot Studio

A single agent can accumulate tools and knowledge rapidly as new requirements emerge. At first, that may be by design: one place to configure and one interface to maintain. Over time, as scope expands, that simplicity can become a liability. Multi-agent architectures exist to address a set of structural problems that a single agent can't solve on its own.

## What makes an architecture "multi-agent"

In a **multi-agent architecture**, multiple agents coordinate to handle tasks that exceed what a single agent can efficiently manage alone. Rather than one agent managing every action, such as billing inquiries, technical troubleshooting, and account changes, responsibilities are distributed across agents, each focused on what it does best.

In Copilot Studio, multi-agent solutions take two forms: **child agents**, which are built inside your main agent and add modularity without external dependencies, and **connected agents**, which are separately deployed agents your main agent communicates with at runtime. The two forms can be used independently or together. The next two units examine each in detail.

## When a multi-agent approach makes sense

The most reliable signal that a multi-agent architecture is worth considering is **routing accuracy degradation** in your main agent. As a rule of thumb, when an agent reaches 30–40 choices of action (including topics, tools, and connected agents), the orchestration layer starts to struggle with precision. This threshold isn't a hard limit, and agents with fewer actions but similarly described tools can hit the same ceiling. It's a practical threshold, and one you should validate against your own evaluations.

Fabrikam's support agent illustrates this exactly. A single agent accumulated billing workflows, technical troubleshooting sequences, and account management actions, each maintained by a different team. Once the agent surpassed 40 actions, routing became inconsistent: queries that should have triggered a billing topic would instead invoke a technical workflow, and updates from one team's actions would unexpectedly affect behavior owned by another. A multi-agent redesign lets each domain team own and maintain their own specialist agent independently, while an orchestrator routes customer requests to the right place.

Beyond routing accuracy, other structural reasons to consider multiple agents include:

*   Multiple teams manage different parts of the solution independently
*   Agents need separate authentication, security controls, or model configuration
*   You need to apply different application lifecycle management (ALM) processes to different parts of the solution
*   An agent's capability would be reused across multiple orchestrators (effectively treating it as a shared service agent)
*   You need to publish and maintain agents separately, and make them available directly on independent channels, as well as being usable by other agents.

These conditions don't all need to be present at once. Even one clear organizational boundary (like independent team ownership across three business domains) can be a valid reason to separate agents.

## When to maintain a single agent

A multi-agent approach comes with tradeoffs. Before adding that complexity to your solution, consider whether it's actually needed.

If you're building a focused FAQ bot that provides generative answers from a single knowledge source, there's no reason to introduce orchestration overhead. A single agent handles the job cleanly, is easier to test, and has no orchestration latency to manage. Adding agents to a simple solution creates work without creating value.

A single-agent architecture is likely the appropriate choice when:

*   The solution responds to a single intent or completes a single task
*   A single developer or small, cohesive team manages the entire solution
*   There's no need for separate configuration, authentication, or deployment across components
*   The agent won't be reused in other orchestrators

A practical approach is to start with one agent and split into multiple agents only when you clearly see a structural boundary or limitation that the single agent can't handle well.

**Guiding question:** Think about an agent you've built or are planning to build. Does the scope span multiple distinct domains, involve different teams owning different parts, or include enough actions that routing accuracy might degrade? Or is it a focused, single-purpose solution a single agent can handle cleanly? What would be the signal that tells you it's time to reconsider the architecture?

## Tradeoffs to consider

Every connected agent you add introduces **orchestration hops**: extra round-trips where the main agent identifies the right connected agent, and that connected agent's own orchestration layer processes the request. These extra hops add latency to the end-user experience. Depending on an agent's use case, latency might be a real factor in the decision.

The governance surface also expands with each agent you add. With a single agent, you test one system, configure one set of security rules, and monitor one set of transcripts. With multiple connected agents, each agent generates its own transcripts, requires its own policies, and needs to be correlated when debugging across sessions. Governance and audit controls apply to each agent.

Note

Because connected agents run their own orchestration layer, they can have different privileges or access to data that the parent agent doesn't. Ensure that calling a connected agent doesn't inadvertently bypass security restrictions that apply to the main agent.

The right architectural choice isn't the one with the most agents or the fewest. It's the one that weighs these tradeoffs deliberately. If the structural benefits (modularity, team ownership, reuse, routing accuracy) justify the costs (latency, governance complexity, testing overhead), a multi-agent approach is worth building. If they don't, a single agent is the better answer.
