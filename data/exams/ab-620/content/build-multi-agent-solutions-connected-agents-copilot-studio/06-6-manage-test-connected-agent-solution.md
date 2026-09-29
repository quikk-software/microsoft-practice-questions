---
title: "Manage and test your connected agent solution"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/6-manage-test-connected-agent-solution"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.manage-test-connected-agent-solution"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Manage and test your connected agent solution

With all three connections in place (the Legal team's contract compliance agent, the Risk and Security Foundry agent, and the Finance Fabric Data agent), the Fabrikam vendor management agent is structurally complete. In this unit, you'll learn how to confirm that routing works as intended and how to maintain the connections over time as requirements change.

## Test multi-agent routing in the test canvas

The **Test your agent** panel in Copilot Studio is the primary tool for validating routing across connected agents. Open the test panel and send prompts that represent each connected agent's intended scope.

For the Fabrikam vendor management agent, that means sending prompts like:

*   "Does this vendor's contract include a data processing addendum?" (should route to the Legal contract compliance agent)
*   "Has this supplier had any reported security incidents in the past 12 months?" (should route to the Risk and Security Foundry agent)
*   "What's our total spend with this supplier across all business units this year?" (should route to the Finance Fabric Data agent)

When you enable **Show activity map when testing**, the activity map appears after each response. For connected agents, the activity map confirms not just that a response was returned, but which connected agent generated it and what the orchestrator's routing decision was. This visibility is essential for multi-agent validation: rather than only reading the response, you see exactly how the orchestrator arrived at it.

If the activity map shows a prompt routed to the wrong agent, you have a description problem—not a connection problem. The fix involves refining descriptions, not reconfiguring connections.

> **Guiding question:** Before sending your first test prompts, write down three "boundary cases": queries that could plausibly match more than one connected agent based on their current descriptions. Testing these first often reveals routing gaps that clear-cut prompts miss.

## Tune descriptions when routing is inaccurate

Description-based routing depends entirely on the quality of connected agent descriptions. When routing sends a query to the wrong agent, the descriptions of at least two agents likely share overlapping language.

In the Fabrikam scenario, the test prompt "Does this vendor have any outstanding compliance violations?" routes to the Legal contract compliance agent instead of the Risk and Security Foundry agent. Looking at the descriptions:

*   Contract compliance: "Reviews vendor contracts for compliance with Fabrikam's procurement requirements."
*   Vendor risk assessment: "Evaluates vendor compliance and security posture for Fabrikam."

Both descriptions contain "compliance." A user asking about violations could plausibly match either agent. The fix is to make both descriptions more specific:

*   Contract compliance: "Reviews contract terms in vendor agreements for alignment with Fabrikam's procurement standards, data processing requirements, and standard liability clauses."
*   Vendor risk assessment: "Assesses vendor security posture, third-party risk ratings, vulnerability history, and incident records."

After saving the updated descriptions and retesting, the routing prompt correctly reaches the Foundry agent. This cycle (test, observe the activity map, refine descriptions, retest) is the standard diagnostic pattern for connected agent routing.

## Supplement description routing with orchestrator instructions

When two connected agents handle similar topics and description refinement alone doesn't produce consistent routing, you can supplement it with explicit instructions on the orchestrator.

The orchestrator's instructions field accepts routing guidance that helps the generative AI make directional choices. For example, adding a line like "For any question about supplier spend totals or procurement data trends, delegate to the Finance Data Agent" provides explicit direction that works alongside the description-based signals.

You can reference connected agents by name in the orchestrator's instructions to provide this explicit guidance. This is particularly useful for autonomous agents or for recurring query types where description-based routing is consistently ambiguous.

Use this approach selectively. It's most appropriate for persistent ambiguity, not as a substitute for writing accurate descriptions.

## Enable and disable connected agents

Not every operational change requires permanently removing a connection. The **Enabled** toggle on the **Agents** page lets you temporarily suspend a connected agent without losing its configuration.

When a connected agent is disabled:

*   It becomes inactive for all users and triggers
*   The orchestrator won't route to it
*   All connection configuration is preserved

When you re-enable it, routing resumes immediately, with no additional configuration required.

This is useful for planned maintenance (for example, disabling the Fabric Data agent while the Finance team updates the underlying semantic model) and for staged rollouts, where you want to validate routing in a test environment before activating connections for all users.

For Fabrikam, disabling the Fabric Data agent during a scheduled maintenance window prevents failed spend data queries, while preserving the connection configuration so the agent can be re-enabled quickly when the maintenance window closes.

## Disconnect a connected agent permanently

When a connected agent is no longer needed (not just temporarily suspended), you can remove it from the orchestrator permanently.

1.  On the **Agents** page, select the **three dots (…)** menu next to the connected agent.
2.  Select **Disconnect agent**.

Disconnecting removes the agent from the orchestrator's configuration and stops all routing to it. The connected agent itself is unaffected—it continues to operate independently, and any other orchestrators connected to it remain unchanged.

Disconnecting is appropriate when the agent has been retired by its owning team, the use case it served is no longer relevant to the orchestrator, or you're replacing the connection with a different agent. If there's any possibility you'll reconnect later, disabling is safer. Configuration is preserved, and re-enabling takes a single toggle. Reconnecting after disconnecting requires re-creating the full connection from scratch.

## Monitor connected agent transcripts

Connected agents generate their own conversation transcripts, separate from the orchestrator's. When debugging an end-to-end interaction that spans multiple agents, you may need to review both the orchestrator's transcript and the connected agent's transcript to reconstruct the full exchange.

Planning for transcript correlation early—before the solution is in production—makes debugging significantly easier than trying to reconstruct interactions retroactively.
