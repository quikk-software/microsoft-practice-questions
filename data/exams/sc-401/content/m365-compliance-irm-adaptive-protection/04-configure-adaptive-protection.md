---
title: "Set up Adaptive Protection"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/configure-adaptive-protection"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.configure-adaptive-protection"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Set up Adaptive Protection

With risk levels defined, the next step is deployment. Adaptive Protection offers two paths, and the one you choose determines how much control you have over each component and whether policies are created automatically or manually.

## Licensing and permissions

Adaptive Protection connects features across Microsoft Purview and Microsoft Entra ID, which requires Microsoft 365 E5 or the E5 Compliance add-on licensing.

Because Adaptive Protection spans Insider Risk Management, data loss prevention (DLP), and Conditional Access, no single role covers the full configuration. Each area requires its own role group, and the tabs on the Adaptive Protection page only appear for roles that have access to them. If a tab is missing, the issue is usually a missing role assignment. For the full list of required roles, see [Adaptive Protection permissions](/en-us/purview/insider-risk-management-adaptive-protection?azure-portal=true).

## Choosing between quick setup and custom setup

Adaptive Protection offers two deployment paths. The right choice depends on whether your organization already has Insider Risk Management, DLP, or Conditional Access policies in place. It also depends on how much control you need over each component.

Quick setup

Custom setup

**Existing policies required**

No

Yes, or you want to create them yourself

**Scope control**

All users

You define which users or groups

**Policy templates**

Data leaks only

Any Insider Risk Management template

**Risk level thresholds**

Predefined defaults

You configure based on risk tolerance

**Enforcement mode**

Simulation or report-only by default

You set the mode per policy

**Time to deploy**

Up to 72 hours

Up to 36 hours after enabling

**Post-setup flexibility**

Edit generated policies after creation

Full control from the start

### Quick setup

Quick setup creates a complete deployment:

*   An Insider Risk Management policy using the Data leaks template, scoped to all users
*   Insider risk level definitions
*   Two DLP policies (one for Endpoint, one for Teams and Exchange)
*   A Conditional Access policy in Report-only mode
*   A Data Lifecycle Management retention policy

All enforcement policies start in simulation or report-only mode, so no users are blocked until you explicitly turn enforcement on.

However, you don't control the scope, the policy template, or the threshold definitions during initial creation. If your organization already has Insider Risk Management policies tuned to specific user groups or risk scenarios, quick setup creates parallel policies instead of reusing them. You can edit everything after creation, but you're starting from a generic baseline rather than your existing configuration.

You start by selecting **Turn on Adaptive Protection** from the Adaptive Protection cards on the Microsoft Purview portal or by going to **Insider Risk Management** > **Adaptive protection** > **Dashboard** > **Quick setup**. Quick setup can take up to **72 hours** to complete, which includes analytics, policy creation, and initial risk level assignments. During this period, no enforcement actions are applied.

Important

Don't disable Adaptive Protection before the setup process completes. Disabling prematurely can lead to policy errors. Administrators receive a notification email when quick setup finishes.

Note

If you're already a [scoped admin](/en-us/purview/purview-admin-units?azure-portal=true#permissions-for-administrative-units) for Microsoft Purview, you can't turn on quick setup.

### Custom setup

With custom setup, you build each component individually:

1.  **Create or select an Insider Risk Management policy.** Define which users or agents are in scope and which activities are considered risky. You can select any policy template, though Data leaks is automatically selected as the default starting point.
    
2.  **Configure insider risk levels.** Select the Insider Risk Management policy for Adaptive Protection, then configure the insider risk level conditions based on your organization's risk tolerance.
    
3.  **Create or edit enforcement policies.** Configure DLP, Conditional Access, and data lifecycle management (DLM) policies individually. Each enforcement mechanism has its own configuration requirements and design decisions.
    
4.  **Enable Adaptive Protection.** On the **Adaptive Protection settings** tab, turn **Adaptive Protection** to _On_. It can take up to **36 hours** for insider risk levels and enforcement actions to apply.
    
    [![Screenshot showing Adaptive Protection being set to On in the Microsoft Purview portal.](../../wwl/m365-compliance-irm-adaptive-protection/media/insider-risk-management-ap-enable.png)](../../wwl/m365-compliance-irm-adaptive-protection/media/insider-risk-management-ap-enable.png#lightbox)
    

Note

For Data Lifecycle Management, the retention policy is automatically created when you turn on Adaptive Protection. If Adaptive Protection was already enabled before DLM support was available, you must [explicitly opt in to the DLM policy](/en-us/purview/retention?azure-portal=true).

## Disabling Adaptive Protection

If you need to temporarily disable Adaptive Protection, go to the **Adaptive Protection settings** tab and turn it _Off_. When disabled:

*   The system stops assigning insider risk levels and clears existing user risk level assignments within approximately six hours.
*   DLP, Conditional Access, and DLM policies aren't automatically deleted. They remain configured but no longer receive risk-level signals.

You can also disable Data Lifecycle Management independently without turning off the rest of Adaptive Protection by toggling the **Adaptive protection in Data Lifecycle Management** setting off in the DLM configuration.
