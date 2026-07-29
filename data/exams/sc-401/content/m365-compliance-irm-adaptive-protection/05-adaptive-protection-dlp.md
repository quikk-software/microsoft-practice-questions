---
title: "Configure Adaptive Protection with Data Loss Prevention"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/adaptive-protection-dlp"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.adaptive-protection-dlp"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Configure Adaptive Protection with Data Loss Prevention

A user flagged as high-risk shares a sensitive file externally and receives the same policy tip as any other user, or no enforcement at all if the policy is set to audit only. Standard data loss prevention (DLP) policies can't distinguish between a routine share and one that follows a pattern of risky behavior.

Adaptive Protection addresses this by adding insider risk levels as a condition in DLP policies. A DLP rule can respond differently depending on the user's current risk classification, blocking a share for an elevated-risk user while only showing a policy tip to a minor-risk user performing the same action. The enforcement adjusts automatically as the user's insider risk level changes.

## The Adaptive Protection condition in DLP

When Adaptive Protection is configured, a condition called **Insider risk level for Adaptive Protection is** becomes available in DLP policy rules. This condition has three values matching the insider risk levels:

*   **Elevated risk level**
*   **Moderate risk level**
*   **Minor risk level**

You can select one, two, or all three levels in a single rule. This condition works in policies scoped to **Exchange Online**, **Microsoft Teams**, and **Devices**. Although you can include other locations in the DLP policy, Adaptive Protection currently supports only these three locations.

## Deciding how to enforce by risk level

Before configuring a DLP policy, decide what enforcement action is appropriate for each risk level in your organization. A common pattern:

Insider risk level

Enforcement approach

Example

Elevated

Block actions outright

Prevent file sharing, block copy to USB

Moderate

Allow with override and justification

User can proceed after providing a business reason

Minor

Warn with policy tip

Educate the user on best practices, audit the action

This graduated approach limits disruption for low-risk users while applying strict controls where the risk justifies it. Your organization's risk tolerance determines where you set these boundaries.

## Create or edit a DLP policy for Adaptive Protection

Quick setup creates two DLP policies automatically (one for Endpoint DLP, one for Teams and Exchange), both in simulation mode. With custom setup, you create or edit policies manually.

### Manual configuration

To manually create or edit a DLP policy for Adaptive Protection:

1.  Sign in to the [Microsoft Purview portal](https://purview.microsoft.com?azure-portal=true).
2.  Go to **Data Loss Prevention** > **Policies**.
3.  Create a new policy or select an existing policy to edit.
4.  In the policy rules, add the condition: **Insider risk level for Adaptive Protection is**, and select the insider risk levels you want to target.
5.  Configure the actions for the rule based on the risk level. For example, block for elevated risk, warn for minor risk.
6.  Set the policy locations to include **Exchange Online**, **Microsoft Teams**, or **Devices** (or any combination).
7.  Save and deploy the policy.

You can create multiple rules in a single policy to target different risk levels with different actions. For example, one rule blocks actions for elevated-risk users, while another rule audits and shows policy tips for moderate and minor-risk users.

Tip

Test DLP policies in simulation mode (with policy tips) before enabling full enforcement. Simulation mode lets you review DLP alerts and verify that policies behave as expected for users at each risk level.

### Quick setup DLP policies

You can edit the quick setup policies to adjust the risk levels targeted or change the enforcement actions.

Important

For Adaptive Protection to work on Devices, you must either enable [Advanced classification scanning and protection](/en-us/purview/dlp-configure-endpoint-settings#advanced-classification-scanning-and-protection?azure-portal=true) or select the **File Type is** condition when manually creating the policy.

## Review and tune DLP enforcement

After DLP policies are active, you can review their effectiveness from the **Data Loss Prevention** tab on the Adaptive Protection page. If too many users are triggering rules at a given risk level, the issue is usually either the insider risk level thresholds or the enforcement action assigned to that level. If users on devices experience stricter enforcement than your Adaptive Protection policy defines, check whether an existing Endpoint DLP policy also applies to them. Device DLP enforces the most restrictive action across all matching policies. Tuning is an iterative process. Start conservative, then tighten as you gain confidence in the risk level assignments.
