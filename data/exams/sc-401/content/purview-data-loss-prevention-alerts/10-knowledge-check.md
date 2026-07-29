---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/purview-data-loss-prevention-alerts/knowledge-check"
uid: "learn.wwl.purview-data-loss-prevention-alerts.knowledge-check"
module: "purview-data-loss-prevention-alerts"
moduleTitle: "Investigate and respond to Microsoft Purview Data Loss Prevention alerts"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Module assessment

Your organization uses Microsoft Purview and Microsoft Defender XDR to analyze sensitive data activity. A data loss prevention (DLP) policy is configured to detect when employees upload financial records to personal cloud storage.

You're a security analyst reviewing the following situation:

*   A user triggered an alert after uploading a file named "Budget\_2025.xlsx" to a personal Dropbox account.
*   The alert appears in both Microsoft Purview and Defender XDR.
*   In Microsoft Defender XDR, the alert is grouped with others showing the same user downloaded multiple files from SharePoint earlier that day.
*   The Sensitive info types tab confirms the file contained financial account numbers.

Insider Risk Management is enabled. The user's user activity summary shows a pattern of exfiltration attempts over the last 60 days.

## Check your knowledge

1.

You're investigating a data loss prevention (DLP) alert where a user uploaded a file named 'Budget\_2025.xlsx' to a personal cloud storage account. To understand what policy triggered the alert and whether it was a false positive, where should you start your investigation?

Microsoft Sentinel

Microsoft Defender XDR

Microsoft Purview

2.

During your investigation, you notice the same user downloaded multiple files from SharePoint earlier that day. Which tool gives you the clearest view of all related activity in one place?

Activity explorer

Microsoft Defender XDR

Microsoft Purview portal

3.

You want to ensure another analyst follows up on this DLP alert. What should you do in Microsoft Defender XDR?

Assign the incident and update the status

Add the alert to a SharePoint list

Set the alert to simulation mode

4.

You confirm the user improperly handled sensitive financial data. What remediation action is appropriate within Microsoft Defender XDR?

Disable the user's account or remove file access

Adjust the DLP policy immediately

Delete the alert from the incident queue

5.

After resolving the incident, what step helps improve your DLP policy and reduce false positives in the future?

Tune the DLP policy based on investigation findings

Reset the policy match counter

Archive the incident in Microsoft Sentinel

You must answer all questions before checking your work.

You must answer all questions before checking your work.
