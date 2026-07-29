---
title: "Understand insider risk alerts and investigations"
url: "https://learn.microsoft.com/en-us/training/modules/purview-insider-risk-investigate-alerts/understand-insider-risk-alerts"
uid: "learn.wwl.purview-insider-risk-investigate-alerts.understand-insider-risk-alerts"
module: "purview-insider-risk-investigate-alerts"
moduleTitle: "Investigate insider risk alerts and related activity"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Understand insider risk alerts and investigations

Alerts in Microsoft Purview Insider Risk Management aren't generated randomly. They follow a defined sequence of actions that begins with policy settings and ends with a triggered alert. Understanding how alerts are generated is critical to reviewing and interpreting them accurately during investigations. This understanding allows investigators to identify relevant activity, determine why it was evaluated, and assess whether it meets the defined risk criteria.

## Why alert generation matters

Knowing how an alert was generated helps investigators:

*   Identify what triggered the alert
*   Understand which activities were evaluated
*   Determine appropriate next steps
*   Align alert evaluation with policy criteria

This context supports more consistent triage decisions and helps reduce time spent on irrelevant or low-risk activity.

## Alert generation process

Alerts are generated through a five-step process:

[![Diagram illustrating the process of how alerts are generated in Insider Risk Management.](../../wwl-sci/purview-insider-risk-investigate-alerts/media/insider-risk-management-alert-generation-chart.png)](../../wwl-sci/purview-insider-risk-investigate-alerts/media/insider-risk-management-alert-generation-chart.png#lightbox)

1.  **Settings configured**: Organizations configure policy settings to align with their insider risk management strategy. This includes defining which risk indicators to monitor, identifying sensitive domains, and setting privacy preferences.
    
2.  **Policy created**: Policies define whose activity to evaluate, what activity to detect, and which events should trigger active monitoring. For example, a policy might monitor users in finance for data exfiltration after a resignation is submitted.
    
3.  **Triggering event occurs**: A triggering event activates the policy for a specific user. This could include events such as a resignation date being set or a risky website being accessed. It might also include detection of exfiltration behavior.
    
4.  **User activity evaluated and scored**: The system begins monitoring the user's actions. Activities are assigned risk scores based on the type of activity, configured thresholds, and the user’s history.
    
5.  **Alert generated**: An alert is generated if the user's risk score exceeds the policy-defined threshold.
    

This process ensures that alerts are based on defined conditions and relevant context. Not all activity results in an alert. For example, a user downloading files might not trigger an alert unless other risk factors are present.

Each alert is the result of a defined policy, a triggering event, and risk-based evaluation of user activity. Understanding how alerts are generated helps investigators assess their relevance and determine whether further action is needed. This insight supports more accurate, timely, and consistent handling of insider risk alerts.
