---
title: "Evaluate Adaptive Protection with Data Lifecycle Management"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/adaptive-protection-data-lifecycle-management"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.adaptive-protection-data-lifecycle-management"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Evaluate Adaptive Protection with Data Lifecycle Management

When a user flagged as high-risk deletes files, emails, or documents, that content might be exactly what your organization needs for an investigation. Without preservation, deleted content can become unrecoverable before anyone realizes it mattered.

Data Lifecycle Management (DLM) in Adaptive Protection addresses this risk. When a user assigned the elevated risk level deletes content, DLM automatically preserves it so the content can be recovered if needed. Because DLM applies only to elevated-risk users and preserves all deleted content from those users, there are no per-risk-level enforcement decisions to make. The configuration is simpler, but the coverage matters if your organization needs to recover evidence during an investigation.

## What Adaptive Protection does with Data Lifecycle Management

When Adaptive Protection is enabled with DLM, the system detects when users assigned the **Elevated risk level** (not moderate or minor) delete content from SharePoint, OneDrive, or Exchange Online. The deleted content is automatically preserved for **120 days** through an organization-wide autoapply retention label policy. Administrators can contact Microsoft support to restore any preserved content during that window.

## When to enable DLM in Adaptive Protection

Consider enabling DLM preservation when:

*   Your organization handles sensitive data where intentional or accidental deletion by a high-risk user could destroy evidence needed for investigation.
*   You have compliance or legal obligations that require preserving data associated with insider risk investigations.
*   Your incident response process benefits from a safety net that ensures deleted content is recoverable during the investigation window.

Consider _not_ enabling DLM preservation when:

*   Your organization already has comprehensive retention policies that cover the same content locations, and adding Adaptive Protection DLM would create unnecessary overlap.
*   Your legal or privacy requirements restrict retaining user-deleted content beyond your existing retention policies.

## How DLM is configured

DLM doesn't require you to manually build a retention policy. The behavior depends on when you enable it:

*   **New deployments (quick or custom setup)**: When you turn on Adaptive Protection, the DLM retention policy is automatically created and applied. No extra steps are required.
*   **Existing deployments**: If Adaptive Protection was already enabled before the DLM feature became available, you need to explicitly opt in to the data lifecycle management policy. The policy isn't applied retroactively.

When DLM is active, a message appears on the Adaptive Protection dashboard: _"Your organization is also being dynamically protected from users who might potentially delete critical data."_ This message includes a link to the DLM setting.

Note

Data lifecycle management metrics don't currently appear on the Adaptive Protection dashboard. The dashboard message confirms the feature is active, but detailed DLM policy metrics are managed through the Data Lifecycle Management solution.

## Opting out of DLM without disabling Adaptive Protection

You can disable DLM preservation independently without turning off Adaptive Protection entirely. To do this, turn off the **Adaptive protection in Data Lifecycle Management** setting in the data lifecycle management configuration. When you disable this setting:

*   The automatically created DLM retention policy is deleted.
*   Preservation of deleted content for elevated-risk users stops.
*   Other Adaptive Protection enforcement continues unaffected.

The setting isn't reenabled automatically. You must manually turn it back on if you want to resume DLM preservation. You might enable DLM during a period of heightened risk or active investigation, then disable it when the situation resolves.
