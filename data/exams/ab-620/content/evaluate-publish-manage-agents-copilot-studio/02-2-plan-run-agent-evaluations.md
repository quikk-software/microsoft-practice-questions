---
title: "Plan and run agent evaluations"
url: "https://learn.microsoft.com/en-us/training/modules/evaluate-publish-manage-agents-copilot-studio/2-plan-run-agent-evaluations"
uid: "learn.wwl.evaluate-publish-manage-agents-copilot-studio.plan-run-agent-evaluations"
module: "evaluate-publish-manage-agents-copilot-studio"
moduleTitle: "Evaluate, publish, and manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Plan and run agent evaluations

Before you share an agent, test how it responds to different requests. Copilot Studio provides two tabs for this work: use the **Preview** tab for quick checks and the **Evaluate** tab for tests that you want to run again.

Priya uses the Preview tab while she builds the support policy agent. Before she releases it, she creates a set of tests that she can run after every important change.

## Understand the difference between the preview and evaluate tabs

The **Preview** tab contains an interactive chat where you send messages to the agent and review its responses. Use the Preview tab to:

*   Checking whether a new instruction takes effect immediately.
*   Exploring how the agent handles a specific phrase or edge case.
*   Confirming that a knowledge change is reflected in the response.

Results from the Preview tab are informal because they don't record metrics or let you run the same set of inputs across multiple sessions. A change that appears correct in one preview session might behave differently after a later update.

The **Evaluate** tab runs a saved set of test conversations and scores the responses. Use the Evaluate tab when you need to:

*   Establish a quality baseline before releasing an agent or an update.
*   Detect regressions after a change to instructions, knowledge, tools, or connected agents.
*   Cover scenarios that span different intent types, edge cases, and boundary conditions in a consistent way.

## Get started with the evaluate tab

Important

The **Evaluate** tab for agents powered by the GitHub Copilot harness is in production-ready preview. It might not be available in every environment, and the interface might change. Ask your administrator whether the Evaluate tab is available before you use it as a release check.

To open the Evaluate tab, select **Evaluate** in the top navigation of the Copilot Studio agent editor. The tab includes several components:

*   **Test set**: A collection of conversations that represents the scenarios you want to evaluate.
*   **Conversation**: A test case with one or more user messages and optional expected agent responses.
*   **General quality**: A test method that assesses whether responses meet quality standards such as relevance and completeness.
*   **Authenticated user profile**: The user identity the evaluation uses when calling knowledge sources and tools. Select a profile that reflects the permissions of your intended users.

## Create conversations

A _conversation_ is a test case that defines the exchange of messages you want to evaluate. You add a user question and can optionally add an expected agent response for your own review. The General quality test method doesn't compare the actual response with the expected response.

Note

General quality assessment evaluates responses against quality standards such as relevance and completeness. It doesn't compare responses against optional expected agent responses. Use expected responses as a reference during your manual review.

Create at least one conversation for each type of interaction your agent is expected to handle:

Scenario type

What to include

**In-scope answer**

A question the agent should answer directly from its knowledge or instructions

**Ambiguity or clarification**

A vague or multi-part request where the agent should ask a clarifying question

**Out-of-scope boundary**

A request outside the agent's defined scope where the agent should decline or redirect

**Escalation**

A situation where the user needs human assistance or a specific contact the agent should provide

**Connected-agent delegation**

A request the main agent should delegate to a specialized connected agent

**Delegation boundary**

A similar request the main agent should handle without invoking the connected agent

These scenario types give you a useful starting point. If one type often receives a low score, review that part of the agent. For a connected agent, include both positive and negative routing tests. Confirm that the main agent delegates requests in the specialist's domain and retains requests outside that domain.

## Run an evaluation

On the **Evaluate** tab, select **New evaluation**. Choose **Or, write some questions yourself**, and then use **Add conversations** > **Write** to create the test cases. In the **Configure test set** panel, enter a name, confirm **General quality** as the test method, select the authenticated user profile, and select **Evaluate**.

Copilot Studio saves each run separately. After you update the agent's instructions, knowledge, or tools, run the same test set again and compare the results with the earlier run.

## Interpret evaluation results

Select an evaluation run to see results for each conversation. For each conversation, the evaluation reports a General quality score and its component dimensions. These reflect objective standards rather than a comparison against your expected outcomes.

When you review results:

*   **Select a conversation** to review the agent's response and the available result details.
*   **Look for patterns**: One low score might be an unusual case. Several low scores in the same area might show a gap in the instructions, knowledge, or tool setup.
*   **Review what happened**: Check the answer, citations, selected tool, tool result, and any error. The Evaluate tab doesn't show the model's private reasoning.

Signal

What to investigate

Low relevance

Instructions may be too broad, too narrow, or missing context for this scenario

Low completeness

The response is partial; knowledge may be absent or not retrieved

Unsupported response

The response isn't supported by the configured information; check instructions and knowledge

Wrong capability used

The tool name or description may not match the scenario well enough to guide selection

Wrong agent selected

Connected-agent descriptions might overlap, omit the specialist's domain, or conflict with the main agent's instructions

Delegation failure

The connected agent might be unpublished, unavailable, unshared, or in a different environment

Capability failure

A connection, permission, or configuration problem may prevent a tool or workflow from completing

Tip

After you correct an issue, run the same test set again and compare its responses and scores with the baseline run.
