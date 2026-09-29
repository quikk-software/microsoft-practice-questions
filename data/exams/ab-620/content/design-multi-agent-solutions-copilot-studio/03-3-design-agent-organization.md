---
title: "Design multi-agent solutions using child agents"
url: "https://learn.microsoft.com/en-us/training/modules/design-multi-agent-solutions-copilot-studio/3-design-agent-organization"
uid: "learn.wwl.design-multi-agent-solutions-copilot-studio.design-agent-organization"
module: "design-multi-agent-solutions-copilot-studio"
moduleTitle: "Design multi-agent solutions in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Design multi-agent solutions using child agents

When you've determined that a multi-agent architecture makes sense for your solution, the next question is how to implement it. In Copilot Studio, multi-agent solutions take two forms: child agents and connected agents. This unit focuses on the first approach. Child agents are built inside your main agent and add modularity without introducing external dependencies or separate deployment requirements.

## What is a child agent

A **child agent** is a focused workflow created directly within your parent agent in Copilot Studio. It has its own set of instructions, tools, and knowledge, and the parent agent calls it as a subroutine when a relevant request arrives. Child agents share the parent's context, which makes passing conversation state and variables between them straightforward. They don't have an independent publishing lifecycle, so when you update or deploy the parent, the children go with it. The same team that builds the parent agent co-owns and co-manages all its child agents.

For Fabrikam's support solution, the billing workflow is a strong candidate for a child agent. The support team builds and maintains it, doesn't need to publish it separately or make it available to other agents, and it fits cleanly within the parent agent's ownership model.

## When child agents make sense

Build child agents when:

*   Your team builds and maintains the full agent solution
*   Components don't need to be published separately or accessed directly by users
*   No separate authentication, model configuration, or ALM process is required
*   The capabilities are specific to this solution and won't be reused by other agents

Child agents are well suited for logical separation within a single solution. If an agent handles billing, technical support, and account management, all owned by the same team, child agents let you give each domain its own focused set of instructions, tools, and knowledge without splitting into separately deployed systems.

For example, Microsoft redesigned its own customer-facing web assistant using exactly this approach: replacing a single broad agent with an orchestrator and a set of child agents, each scoped to a specific content domain. Each child agent focused on one subset of the solution's domain — Azure, Microsoft 365, pricing, trials — making the routing surface smaller and more precise for each subdomain. See [how Microsoft applied multi-agent solution design](https://www.microsoft.com/en/customers/story/26166-microsoft-microsoft-copilot-studio/) for more details on how a parent-child agent architecture delivered real impact.

## Scoping child agents effectively

A child agent should do one thing well. The most effective child agents are scoped to a specific domain or task, with tightly focused instructions and only the tools and knowledge relevant to that scope. Broad, general-purpose child agents can recreate the routing precision problem you're trying to solve.

Use the same signal you used to decide whether to go multi-agent in the first place: if a child agent accumulates too many tools with similar descriptions, its own routing accuracy can degrade. Splitting it further, or reconsidering whether a connected agent is more appropriate for that component, is the right response.

## Tradeoffs to plan for

Child agents don't add the orchestration latency that connected agents introduce. Because they share the parent's context and run within the same deployment, there's no extra round-trip through a separate orchestration layer.

The governance surface is still larger than a single-agent solution, but significantly smaller than connected agents. Activity from all child agents appears within the same session, which makes testing, debugging, and monitoring straightforward. You manage one set of security rules and one deployment pipeline, not several.

The key constraint is lifecycle coupling. A child agent can't be updated, deployed, or versioned independently of its parent. If a component needs a separate release cadence or is owned by a different team, a connected agent is the better fit for that component.

**Guiding question:** Think about a capability you're considering building as a child agent. Does your team own it end to end? Does it need its own publishing lifecycle or to be reused by other agents? If not, a child agent is likely the right approach. What's the tightest scope you can define for it while still making it genuinely useful?
