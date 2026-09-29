---
title: "Monitor and improve an agent"
url: "https://learn.microsoft.com/en-us/training/modules/evaluate-publish-manage-agents-copilot-studio/3-monitor-improve-agent"
uid: "learn.wwl.evaluate-publish-manage-agents-copilot-studio.monitor-improve-agent"
module: "evaluate-publish-manage-agents-copilot-studio"
moduleTitle: "Evaluate, publish, and manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Monitor and improve an agent

The Evaluate tab tests whether an agent handles the scenarios and expected responses you define, while the Monitor tab reveals performance trends from conversations with real users after publication. Together, these tabs help you connect production issues to specific test scenarios, identify their likely cause, and verify that your changes improve the agent without affecting other behavior.

After Priya publishes the support policy agent, some employees report incomplete answers. She opens the Monitor tab to look for patterns before she changes the agent.

## Use the Monitor tab

Important

The **Monitor** tab for agents powered by the GitHub Copilot harness is in preview. The Monitor tab becomes available after you publish the agent.

Select the **Monitor** tab in the agent editor. The overview shows recent activity and results, including:

*   **Conversation sessions** and user engagement.
*   **Average run duration**, total runs, and success rate.
*   **Total reactions** and response quality.
*   **Tool use**, including how often tools start and complete successfully.
*   **Billed Copilot Credits** for the selected period.

Use these measures to find patterns. A falling success rate can point to a technical problem. Repeated negative reactions can point to an answer-quality problem. A low success rate for one tool can point to a problem with that tool. Recent data can take time to appear.

## Separate quality defects from runtime failures

Not every problem shown on the Monitor tab has the same root cause. Grouping issues by type helps you identify the right fix and avoid changing the wrong thing.

Issue type

Description

Typical cause

Where to address

**Quality defect**

Response quality declines or users provide repeated negative reactions

Instructions are unclear or knowledge doesn't cover a common scenario

Reproduce the scenario on the Preview tab, refine the agent, and add it to the Evaluate tab

**Runtime failure**

Success rate falls or a tool shows repeated unsuccessful use

A connection, configuration, or external service has a problem

Review the affected capability and its connection or service status

**Permission failure**

A published user reports access errors that the maker can't reproduce

The user lacks access to a knowledge source or connected resource

Test with a typical user and review resource permissions

**Capacity failure**

The agent reaches a configured credit limit or activity is blocked

Allocated Copilot Credit capacity is exhausted or an agent limit is reached

Ask an administrator to review capacity and agent limits in Power Platform admin center

Choose the type of problem before you make a change. Editing instructions doesn't fix missing permissions, and changing a connection doesn't add missing knowledge.

## Use monitoring data to improve

After identifying issues on the Monitor tab, prioritize them by frequency and impact:

*   **High-frequency quality defects**: When many users ask the same type of question and receive an incomplete or inaccurate answer, the agent's instructions or knowledge coverage is missing something. Identify the pattern and add or refine the relevant section.
    
*   **Recurring runtime errors**: When a specific tool has a low success rate, reproduce the scenario and check its connection, configuration, and external service. If the problem persists, engage your administrator.
    
*   **Boundary violations**: When users regularly ask questions outside the agent's scope and receive answers they shouldn't, tighten the scope instructions to make the boundary clearer.
    
*   **Escalation gaps**: When feedback identifies an unhelpful escalation response, review the escalation guidance in your instructions and add specific contacts or next steps.
    

## Run evaluation after making changes

After you address an issue found on the Monitor tab, run your evaluation set again to confirm the fix works and doesn't introduce regressions elsewhere. Then review new activity on the Monitor tab to confirm the improvement holds in production.

Tip

Use findings from the Monitor tab to expand your evaluation set. When the Monitor tab reveals a scenario you didn't anticipate, add it as a new conversation on the Evaluate tab. Over time, your evaluation set reflects actual agent use, not just the scenarios you originally planned for.
