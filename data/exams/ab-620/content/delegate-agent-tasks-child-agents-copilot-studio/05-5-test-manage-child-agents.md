---
title: "Test and manage child agents"
url: "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/5-test-manage-child-agents"
uid: "learn.wwl.delegate-agent-tasks-child-agents-copilot-studio.test-manage-child-agents"
module: "delegate-agent-tasks-child-agents-copilot-studio"
moduleTitle: "Delegate agent tasks using child agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Test and manage child agents

With inputs, outputs, triggers, and completion behavior configured, Fabrikam's three child agents are structurally ready. What remains is confirming they behave correctly in practice, and knowing how to maintain and adjust the system as it operates. This unit covers how to test delegation, redirect to a child agent from a topic, and manage the child agent lifecycle.

## Test child agent delegation

Before putting any multi-agent solution to work, confirm that each child agent handles the right queries and that the orchestrator doesn't confuse similar intents across agents. The **Test your agent** panel is your primary tool for this.

Open the test panel by selecting **Test** within your agent's page in Copilot Studio, then send prompts that represent each child agent's intended scope. For Fabrikam, that means testing prompts like "What's the status of order 12345?" to verify the Order Status agent is invoked, "What are your return policies?" to confirm the request routes to the Returns and Exchanges agent, and "I have a problem with my delivery" to confirm routing to the Delivery Issues agent.

When you enable **Show activity map when testing**, the activity map appears after each response, showing the orchestrator's execution plan in real time. You can see which child agent was selected, what inputs were passed to it, and what it returned. This visibility makes the test canvas effective for multi-agent validation: rather than just reading the response, you see exactly how the orchestrator arrived at it.

### Adjust descriptions when routing is wrong

When a prompt routes to the wrong child agent, the activity map shows which agent was called instead. For Fabrikam, the prompt "Can I track my package?" unexpectedly calls a different agent rather than Order Status. A closer look at the descriptions reveals why: "track" and "package" appear in another agent's description but not in Order Status's, so the orchestrator found the closest textual match and chose incorrectly.

The fix is targeted, not structural. Updating the descriptions of each agent for clarity removes the overlap. After saving and retesting, the prompt routes correctly. This cycle of testing, observing the activity map, refining the description, and retesting is the core diagnostic pattern for description-based routing.

## Redirect to a child agent from a topic

Natural language routing works well for conversational queries, but some flows require guaranteed delegation. When a topic has already structured part of a user interaction (confirming identity or collecting a required value, for example), you may want to invoke a specific child agent unconditionally rather than leave the choice to the orchestrator.

An **agent redirect node** makes this possible. In a topic, select the **Add node** icon at the point where the redirect should occur, open the **Add an agent** submenu, and choose the target child agent from the list. The node explicitly invokes that agent when the topic reaches that point, bypassing description-based routing.

If the target child agent defines inputs, the redirect node lets you pass values directly from the topic. For the Order Status agent, you can supply the order number collected earlier in the same topic, so the child agent receives a clean, pre-validated value rather than attempting to extract it from natural language. When the child agent completes, its output values are automatically placed in topic variables, where subsequent nodes can reference them.

After the child agent finishes, the topic **resumes** from the node immediately following the redirect. This means you can design hybrid flows: a topic handles structured data collection, a child agent handles the processing, and the topic continues with the result. For Fabrikam, a topic that first verifies a customer's identity and then explicitly redirects to the Order Status agent illustrates this pattern. The redirect ensures this specific flow always uses the correct agent, regardless of how the user phrased the original request.

## Manage child agent availability

Not every operational change requires a permanent configuration edit. When a child agent depends on a backend service that's temporarily unavailable (for instance, when a third-party order management system undergoes scheduled maintenance), you need a way to take that agent out of rotation without removing it entirely.

The **Enabled** toggle on the **Agents** page of the parent agent provides this control. Turning a child agent off makes it inactive: the agent no longer responds to users or triggers, and the orchestrator won't route queries to it. Turning it back on restores normal behavior with no further changes required.

The toggle is useful beyond maintenance windows. You can use it to stage a rollout by activating new child agents incrementally as you validate their behavior, or to temporarily suspend a child agent while you revise its description or reconfigure its inputs.

## Remove a child agent permanently

When a child agent is no longer needed, select the **three dots (…)** next to it on the **Agents** page and choose **Delete**. This permanently removes the child agent and all of its configuration, including its instructions, inputs, outputs, trigger settings, and any scoped tools or knowledge.

Deletion can't be undone. Before proceeding, check that no active topics have redirect nodes pointing to that agent. Those nodes reference the agent by identity, and they'll need to be updated or removed after the deletion.

When there's any uncertainty about whether the agent will be needed again, disabling it is the safer choice. Deletion is appropriate when the agent is definitively retired — for example, after a planned migration to a redesigned replacement or after removing the feature it supported.
