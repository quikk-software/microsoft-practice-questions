---
title: "Evaluate and configure insider risk levels"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/risk-levels"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.risk-levels"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Evaluate and configure insider risk levels

Getting insider risk level thresholds right is a design decision: too low and too many users face unnecessary restrictions, too high and risky behavior goes unaddressed.

## How insider risk levels are determined

Insider risk levels are based on _user insights_ rather than individual activity counts. An insight is a calculation of the aggregate number of activities and the severity of those activities. A user might perform 10 related actions in a single day, but those actions count as one insight consisting of 10 activity events. The _number of insights_ determines the risk level, not the number of individual events.

For example, suppose your Insider Risk Management policy detects SharePoint downloads. A user downloads 10 files from a SharePoint site in a single day, and the policy classifies those downloads as high severity. That sequence counts as one insight. To qualify for the _Elevated risk level_, the user would need at least two more high severity insights, not two more individual downloads.

[![Screenshot showing Adaptive Protection insider risk levels in the Microsoft Purview portal.](../../wwl/m365-compliance-irm-adaptive-protection/media/insider-risk-management-ap-risk-levels.png)](../../wwl/m365-compliance-irm-adaptive-protection/media/insider-risk-management-ap-risk-levels.png#lightbox)

## Customizing insider risk levels

Each insider risk level's criteria can be customized based on two approaches:

*   **Alerts generated or confirmed for a user**: Choose conditions based on the [severity level for alerts](/en-us/purview/insider-risk-management-activities?azure-portal=true#alert-status-and-severity) the selected Insider Risk Management policy generates or confirms. Conditions for alerts aren't additive: if a user meets _any_ of the conditions, the insider risk level is assigned.
*   **Specific user activity**: Choose conditions for the type of activity to detect, its severity, and the number of daily occurrences during the past activity detection window. Conditions for user activity _are_ additive: the insider risk level is assigned only if _all_ conditions are met.

To customize an insider risk level:

1.  Sign in to the [Microsoft Purview portal](https://purview.microsoft.com?azure-portal=true).
2.  Go to **Insider Risk Management** > **Adaptive protection** > **Insider risk levels**.
3.  Select **Edit** for the insider risk level you want to customize (_Elevated_, _Moderate_, or _Minor_).
4.  On the custom insider risk level pane, choose whether to base the level on **alerts generated or confirmed** or **specific user activity**.
5.  Configure the severity and conditions, then select **Confirm**.

When customizing based on specific user activity, you configure three conditions:

*   **Activities**: The types of activities to detect, automatically scoped by the indicators in the associated policy.
*   **Activity severity**: The severity threshold (_High_, _Medium_, or _Low_) for activities included in the daily insight.
*   **Activity occurrences during detection window**: How many times the selected activities must be detected within the past activity detection period. This is the number of daily insights, not the number of individual events.

## Aligning thresholds to organizational risk tolerance

There's no single correct configuration. The right thresholds depend on your organization's risk profile:

*   **Conservative approach**: Set elevated risk level to require confirmed alerts only. This approach minimizes false positives but means enforcement is delayed until an analyst confirms the alert.
*   **Moderate approach**: Use generated alerts at high severity for elevated risk. This approach responds more quickly but might capture some false positives.
*   **Aggressive approach**: Use specific user activity with lower severity thresholds and shorter detection windows. This approach casts a wider net but increases the chance of disrupting legitimate users.

Start with the built-in definitions, review the results on the **Users assigned insider risk levels** tab, and tune based on whether too many or too few users are being classified at each level.

## Timing and lifecycle settings

After a risk level is assigned, it stays in effect for a configurable timeframe (5–30 days, default 7). The risk level resets when the associated alert is dismissed or case is resolved. The past activity detection window controls how far back Adaptive Protection looks when evaluating user activity against level conditions (also 5–30 days, default 7). If a user is in scope for multiple Insider Risk Management policies, the highest severity level applies.

## Check your understanding

1.

Your security team reports that too many users are being classified as elevated risk, and most turn out to be false positives after investigation. You're currently using generated alerts at high severity for the elevated risk level. What's the most effective adjustment?

Shorten the insider risk level timeframe so elevated-risk classifications expire faster.

Switch the elevated risk level to require confirmed alerts only.

Increase the past activity detection window to 30 days so the system has more data to evaluate.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
