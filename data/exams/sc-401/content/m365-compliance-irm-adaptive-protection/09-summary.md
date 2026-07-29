---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/summary"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.summary"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Summary

Adaptive Protection connects insider risk levels to enforcement across three solutions: data loss prevention (DLP), Conditional Access, and Data Lifecycle Management.

Each enforcement mechanism serves a distinct purpose:

*   **DLP policies** adjust data protection actions (block, warn, audit) based on a user's insider risk level, ensuring that the strictest controls apply only where the risk warrants it.
*   **Conditional Access policies** control whether a user can reach cloud resources at all, restricting or blocking access for users whose behavior indicates elevated risk.
*   **Data Lifecycle Management** preserves content deleted by elevated-risk users for 120 days so evidence remains available during investigations.

You also evaluated how to align insider risk level thresholds to your organization's tolerance for risk. That alignment includes customizing the criteria that classify a user as elevated, moderate, or minor risk and tuning enforcement actions accordingly.

With these controls in place, enforcement matches the risk. The low-risk employee sharing a document with a colleague now proceeds without friction, while the user who flagged multiple exfiltration alerts faces the controls their behavior warrants. Your analysts spend less time reviewing routine policy matches, and the right restrictions reach the right users automatically.

## References

*   [Help dynamically mitigate risks with Adaptive Protection](/en-us/purview/insider-risk-management-adaptive-protection?azure-portal=true)
*   [Learn about Adaptive Protection in Data Loss Prevention](/en-us/purview/dlp-adaptive-protection-learn?azure-portal=true)
*   [Adaptive Protection configuration guide](/en-us/purview/insider-risk-management-adaptive-protection-guide?azure-portal=true)
*   [Common Conditional Access policy: Insider risk based policy](/en-us/entra/identity/conditional-access/how-to-policy-insider-risk?azure-portal=true)
