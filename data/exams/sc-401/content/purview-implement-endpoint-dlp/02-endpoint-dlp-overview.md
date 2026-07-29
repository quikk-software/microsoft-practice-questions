---
title: "Understand endpoint data loss prevention"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/endpoint-dlp-overview"
uid: "learn-m365.purview-implement-endpoint-dlp.endpoint-dlp-overview"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Understand endpoint data loss prevention

Endpoint data loss prevention (DLP) runs a lightweight agent on each onboarded device. When someone copies a file with sensitive information to a USB drive, uploads it through a browser, or prints it, the agent evaluates the file against your DLP policies. It then applies the configured action: audit, warn, block with override, or block.

Because the agent operates at the operating system (OS) level, it doesn't matter which application the user is working in. If the file contains sensitive data and the user attempts a restricted activity, the policy applies. The agent receives policy updates from the Purview cloud service and reports activity back, but enforcement happens locally on the device. Previously synced policies continue to apply even when devices go offline.

Endpoint DLP supports Windows 10/11, macOS, and supported Windows Server versions. It doesn't cover unmanaged personal devices or mobile platforms.

## What endpoint DLP protects against

Endpoint DLP enforces policy on specific activities involving files that contain sensitive information:

*   Copying to USB drives, network shares, or Bluetooth devices
*   Uploading through browsers to restricted or unapproved domains
*   Printing, including to virtual printers on Azure Virtual Desktop
*   Pasting sensitive content into browser forms
*   Opening files through apps that shouldn't handle protected data
*   Creating, renaming, or moving sensitive files

Each activity can be audited, warned, blocked with override, or fully blocked. Auditing gives you visibility without disrupting anyone. Warning lets users proceed after acknowledging the risk. Blocking stops the action entirely. The right level depends on the data's sensitivity, the risk of the activity, and how much disruption the business tolerates.

## Where endpoint DLP fits

Endpoint DLP complements cloud and email DLP rather than replacing them. A SharePoint policy might prevent external sharing of files labeled Confidential, but once a user downloads that file, the cloud policy no longer applies. Endpoint DLP picks up where cloud protection stops.

Devices need to be onboarded and running supported versions before policies reach them.

## Viewing endpoint DLP data

Once devices are onboarded, information about audited activities flows into Activity Explorer even before you deploy policies that target devices. Alerts surface in two places:

*   **Microsoft Purview portal**: The [DLP Alerts Management Dashboard](/en-us/purview/dlp-alerts-dashboard-get-started?azure-portal=true) shows file name, user, activity type, sensitive information type matched, and policy triggered.
*   **Microsoft Defender XDR**: [Data loss incidents in Defender XDR](/en-us/defender-xdr/dlp-investigate-alerts-defender?azure-portal=true) give security operations teams a unified view alongside other security signals.

Compliance teams typically work in Purview. Security operations teams investigate in Defender XDR. Alerts appear in both.

## How users experience endpoint DLP

When a policy triggers, users see a toast notification or policy tip explaining what happened. If the policy allows override, they can provide a business justification and proceed.

Endpoint DLP enforcement is different from server-side enforcement, which happens silently. Endpoint policies interact with the person at the keyboard. How you balance blocking and educating affects whether users comply with policies or find ways around them.
