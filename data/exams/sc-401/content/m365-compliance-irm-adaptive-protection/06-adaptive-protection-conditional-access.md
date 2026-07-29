---
title: "Configure Adaptive Protection with Conditional Access"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/adaptive-protection-conditional-access"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.adaptive-protection-conditional-access"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Configure Adaptive Protection with Conditional Access

A user flagged as high-risk can still access cloud applications, download sensitive data, or reach resources they no longer need for their role. Traditional Conditional Access policies can restrict access based on device, location, or group membership, but they can't respond to behavioral risk signals that change over time.

Adaptive Protection addresses this gap by feeding insider risk levels into Conditional Access. You can restrict or block access to cloud applications for users whose behavior indicates elevated risk, without affecting users who don't pose a concern. If a user's risk level drops, the access restrictions adjust automatically.

## The insider risk condition in Conditional Access

When Adaptive Protection is enabled, Microsoft Entra Conditional Access policies gain access to an **Insider risk** condition. This condition lets you target policies based on the insider risk levels assigned by Adaptive Protection:

*   **Elevated**
*   **Moderate**
*   **Minor**

You set the **Insider risk** condition to _Yes_, then select the risk levels that trigger the policy. You can select one or more risk levels per policy, but creating separate policies for each level gives you independent control over the access restrictions at each tier.

## Deciding how to enforce by risk level

Conditional Access enforcement decisions should be proportional to the risk level. A common graduated approach:

Insider risk level

Enforcement approach

Example

Elevated

Block access

Completely block access to all or sensitive cloud applications

Moderate

Restrict access

Block access to specific high-value applications or require multifactor authentication

Minor

Require acknowledgment

Require the user to accept Terms of Use before accessing an application

The right enforcement depends on your organization's tolerance for disrupting user access. Blocking access is highly effective but also highly visible. Reserve it for situations where the risk justifies the disruption.

## Create or edit a Conditional Access policy for Adaptive Protection

Quick setup creates a Conditional Access policy automatically in Report-only mode targeting elevated-risk users. With custom setup, you create policies manually.

### Manual configuration

In the [Microsoft Entra admin center](https://entra.microsoft.com?azure-portal=true), create or edit a Conditional Access policy and configure the users, groups, and target cloud applications as you normally would. The Adaptive Protection-specific steps are:

1.  In the **Conditions** section, select **Insider risk**.
2.  On the **Insider risk** pane, switch **Configure** to _Yes_ and select the insider risk level for the policy (Elevated, Moderate, or Minor).
3.  Under **Access controls**, configure the appropriate action:
    *   **Block access** for elevated-risk users.
    *   **Grant access** with conditions (such as requiring multifactor authentication) for moderate-risk users.
    *   **Require Terms of Use** for minor-risk users.

Tip

Set the policy to **Report-only** mode initially. Report-only mode lets you see which users would be affected without actually enforcing it. Review the reports and tune your insider risk level thresholds before switching to full enforcement.

### Quick setup Conditional Access policy

If you used quick setup, review which users the automatically created policy affects in the Microsoft Entra admin center before switching it from Report-only to full enforcement.

## Review Conditional Access enforcement

The **Conditional Access policies** tab on the Adaptive Protection page shows all Conditional Access policies that use the Insider risk condition and their current enforcement state. You can also view which policies apply to a specific user from the **Users assigned insider risk levels** tab.

Important

Conditional Access policies don't anonymize usernames, even when the _Show anonymized versions of usernames_ setting is enabled in Insider Risk Management. This limitation is important to consider if your organization uses anonymization for privacy.
