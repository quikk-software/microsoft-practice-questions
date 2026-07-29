---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/purview-audit-search-investigate/knowledge-check"
uid: "learn.wwl.purview-audit-search-investigate.knowledge-check"
module: "purview-audit-search-investigate"
moduleTitle: "Conduct investigations with Microsoft Purview Audit"
learningPath: "learn.wwl.purview-audit-search"
---
# Module assessment

Six weeks after the healthcare compliance team's original electronic health record (EHR) investigation, a new report crosses their desk. A physician's account might have accessed patient records outside of clinical need over the last 90 days. The team needs to answer the concern quickly and hand parts of the work to the eDiscovery team and to security operations.

Here's what the team is working with:

*   **Audit (Standard)** has been enabled tenant-wide for the last 8 months.
*   The tenant was upgraded to **Audit (Premium)** 60 days ago.
*   The **Microsoft 365 Advanced Auditing** service plan was enabled on the physician's user account 45 days ago.
*   The physician uses Microsoft 365 Copilot and, occasionally, a Copilot Studio agent that the compliance team is still evaluating.

Use what you learned in this module to help the team make the right decisions.

## Check your knowledge

1.

The team wants `MailItemsAccessed` records for the physician across the full 90-day window. What should the team expect from the audit log?

Records will be available for the full 90 days because audit was enabled tenant-wide 8 months ago.

Records will be available only for the last 60 days, from the date the tenant upgraded to Audit (Premium).

Records will be available only for the last 45 days, from the date Advanced Auditing was enabled on the physician's account.

The team can create a retention policy today to backfill the missing records.

2.

The eDiscovery team wants to read the actual body of specific messages the physician opened, in case they need to preserve them for a legal hold. Which tool is the right choice for that part of the investigation?

Microsoft Purview Audit, filtering on `MailItemsAccessed` and reading the `Messages` property of each record.

Microsoft Defender for Cloud Apps, which reads and blocks email content in real time.

Data Loss Prevention (DLP), which stores copies of email content that matched policies.

Microsoft Purview eDiscovery, which can preserve content, apply legal holds, and let reviewers read the message body.

3.

A peer at a smaller clinic runs Audit (Standard) only and asks how to set up retention policies to keep records for two years. What should the team tell them?

Retention policies aren't available on Audit (Standard). The clinic keeps records for the default 180 days and would need to upgrade to Audit (Premium) to create custom retention.

Create a retention policy in the Microsoft Purview portal and set the duration to two years.

Retention policies apply retroactively, so setting one up today preserves the last two years of records.

Extend Standard retention to two years by assigning the 10-Year Audit Log Retention add-on license to each user.

4.

The team wants to see whether the physician used Copilot to access or summarize patient records. When they filter the audit search, they see zero `ConnectedAIAppInteraction` records but do see `CopilotInteraction` records for the same user. What's the most likely explanation?

The physician turned off Copilot logging on their user account.

The physician used a first-party Copilot experience like Microsoft 365 Copilot but didn't use a Copilot Studio agent or Entra-registered AI app that's been onboarded through Data Security Posture Management (DSPM).

`ConnectedAIAppInteraction` is a Premium-only event. The team needs to enable Advanced Auditing to see it.

Copilot activity always takes 24 hours to appear, so the team should rerun the search tomorrow.

5.

The team exports the physician's `MailItemsAccessed` records from the last 45 days for offline analysis. They run `Search-UnifiedAuditLog` in PowerShell with a date range and `-ResultSize 5000`, then export to CSV. The CSV opens with exactly 5,000 rows, and something feels off. What's the most likely cause?

The physician generated exactly 5,000 mail access events in that window.

Excel truncates CSV imports at 5,000 rows by default.

The team's account is missing the export permission and only sees the first 5,000 rows.

`Search-UnifiedAuditLog` returns a maximum of 5,000 rows per call and silently truncates larger result sets. The team should page through results with the `-SessionId` and `-SessionCommand ReturnLargeSet` parameters.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
