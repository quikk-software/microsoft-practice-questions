---
title: "Understand Adaptive Protection and insider risk levels"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/overview"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.overview"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Understand Adaptive Protection and insider risk levels

Adaptive Protection sits between Insider Risk Management's detection capabilities and the enforcement mechanisms you already use: data loss prevention (DLP), Conditional Access, and Data Lifecycle Management (DLM). The connection between these systems is the _insider risk level_: a classification that Adaptive Protection assigns to users (and agents) based on machine learning analysis of their behavior.

## How Adaptive Protection works

Adaptive Protection uses Insider Risk Management policies to detect risky user and agent activity. When detected activity matches the conditions you define, Adaptive Protection assigns an insider risk level to that user or agent. That insider risk level then becomes a condition in your existing enforcement policies. A DLP rule can check a user's risk level before deciding whether to block or allow an action. A Conditional Access policy can evaluate it before granting or denying access to a cloud application. Data Lifecycle Management can use it to determine whether to preserve content a user deletes.

Enforcement is automatic. When a user's risk level changes, the corresponding DLP, Conditional Access, and DLM policies respond without waiting for an analyst to review an alert or reassign a case. Enforcement is also graduated. Each risk level can trigger a different response, so an elevated-risk user might be blocked from sharing files while a minor-risk user performing the same action only sees a warning. The combination means enforcement scales with risk and adjusts as risk changes, without manual triage at each step.

## Insider risk levels

Insider risk levels classify how risky a user's behavior is. Adaptive Protection uses three levels, each with built-in definitions that you can customize:

*   **Elevated risk level**: The highest classification. Assigned to users whose behavior generates the most serious risk signals, such as confirmed high severity alerts or multiple high severity sequences.
*   **Moderate risk level**: The middle classification. Assigned to users with meaningful but less severe risk indicators, such as medium severity alerts or repeated exfiltration activity.
*   **Minor risk level**: The lowest classification. Assigned to users with early or low-intensity signals, such as a single exfiltration activity with a high severity score.

Tip

_Insider risk levels_ in Adaptive Protection (Elevated, Moderate, Minor) differ from _alert severity levels_ (High, Medium, Low) in Insider Risk Management. Insider risk levels measure risk determined by admin-defined conditions. Alert severity levels are calculated from alert risk scores assigned to active alerts. Don't confuse the two when configuring policies.

## Users and agents

Adaptive Protection can assign insider risk levels to both human users and agents (nonhuman identities). You can define separate risk levels for users and agents by selecting the appropriate tab in the insider risk levels configuration. This means risk detection and enforcement apply to both human and automated actors in your organization.
