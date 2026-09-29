---
title: "Understand child agents in Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/2-understand-child-agents"
uid: "learn.wwl.delegate-agent-tasks-child-agents-copilot-studio.understand-child-agents"
module: "delegate-agent-tasks-child-agents-copilot-studio"
moduleTitle: "Delegate agent tasks using child agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Understand child agents in Copilot Studio

The Fabrikam order management agent handles three related but distinct responsibilities: checking order status and tracking, processing returns and exchanges, and resolving delivery issues. Each responsibility needs its own instructions, tools, and knowledge, but all three are owned by the same team and managed within a single solution. In this unit, you'll explore what child agents are, how the orchestrator delegates to them, and when they're the right architectural choice.

## What a child agent is

A **child agent** is a lightweight agent that lives inside a parent agent. You create and manage it directly from the parent agent's canvas in Copilot Studio. It shares the same environment and solution as its parent, so there's no separate publishing step, no independent deployment to configure, and no separate application lifecycle management (ALM) process to coordinate.

Think of child agents as focused topic groups with their own mini-orchestration layer. A topic in Copilot Studio handles a single conversational intent using a defined sequence of nodes. A child agent goes further: it has its own instructions, its own tools, and its own knowledge sources. When the parent delegates a task to it, the child agent uses its own orchestration to decide how to respond — not the parent's.

This distinction matters in practice. Where a topic handles a script, a child agent handles a domain.

## How a parent agent delegates to child agents

When a user sends a message, the parent agent evaluates it against all available options: topics, tools, and child agents. For child agents, that evaluation is based on the child agent's **description**, a brief plain-language statement of what the child agent handles. The parent's AI orchestration reads the description and determines whether the incoming request matches.

If the description matches, the parent delegates the request. The child agent takes over, using its own instructions, tools, and knowledge to respond. When it finishes, the result flows back to the parent, which continues the conversation from there.

You can also configure a child agent to be invoked explicitly from within a topic, rather than relying on the AI to match the description. Either way, the execution boundary is clear: the child runs its own logic, and the parent picks up where it left off.

> **Guiding question:** Think about an agent you've built or are considering building. Which domains or task types could you separate into focused child agents? What would be an appropriate description for each child agent?

## Benefits of using child agents

Child agents offer several practical advantages for agent solutions that need clear domain boundaries.

**Separate tool and action limits.** Copilot Studio agents have limits on the number of tools they can use, applied per orchestration layer. A child agent has its own limits, independent of the parent. In the Fabrikam scenario, this means the order status child agent can hold a full set of tracking and lookup tools and the returns child agent can hold a full set of returns processing tools without competing for capacity in the parent agent.

**Logical organization.** Grouping related tools, instructions, and knowledge into a child agent by domain makes the solution easier to understand and maintain. Each child agent has a clear, single purpose. When the AI evaluates an incoming query, it's choosing among a narrower, better-defined set of options, which improves routing accuracy.

**Shared context with the parent.** When the parent invokes a child agent, it passes the conversation context as the task by default. Because child agents live within the same solution as the parent, structured data exchange through explicit inputs and outputs is simpler and more direct than coordinating across separately deployed agents.

**No independent lifecycle management.** Child agents are saved, tested, and published as part of the parent agent. A team that owns the entire solution can update any child agent without managing a separate release cycle or coordinating across teams.

These benefits are demonstrated at scale in real-world deployments. Microsoft used this pattern to rebuild its own customer-facing web assistant: replacing a single agent that had grown too broad with a parent orchestrator and multiple child agents, each grounded on a focused subset of the site's content. The updated agent delivered 61% lower response latency and a 70% reduction in human escalations. See [how Microsoft built their multi-agent solution](https://www.microsoft.com/en/customers/story/26166-microsoft-microsoft-copilot-studio/) for a detailed look at the orchestrator-subagent architecture.

## When child agents are the right choice

Child agents work well when one team owns and manages the entire agent solution, when there's no need to publish subagents independently, and when the goal is to organize tools and knowledge logically within a single solution.

In the Fabrikam scenario, the same team owns all three order management responsibilities: order status and tracking, returns and exchanges, and delivery issue resolution. No other department needs to use the returns child agent independently. There's no cross-team lifecycle to manage. Child agents are the right fit: one solution, one publishing process, and domain boundaries that keep routing accurate.

The calculation changes when those conditions don't apply. Consider a different version of the Fabrikam scenario: if returns and exchanges were owned by a separate customer operations team that needed to publish and maintain their agent independently and make it available across multiple agents in the organization, a **connected agent** would be more appropriate.

The choice isn't always one or the other. You can combine both approaches in the same solution by using connected agents to hand off certain responsibilities to external agents and child agents for domain-specific tasks a single team controls.

Learn more about [when to use child agents versus connected agents](/en-us/microsoft-copilot-studio/authoring-add-other-agents).
