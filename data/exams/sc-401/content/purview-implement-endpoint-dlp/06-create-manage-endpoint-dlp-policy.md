---
title: "Create and manage endpoint DLP policies"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/create-manage-endpoint-dlp-policy"
uid: "learn-m365.purview-implement-endpoint-dlp.create-manage-endpoint-dlp-policy"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Create and manage endpoint DLP policies

An endpoint data loss prevention (DLP) policy defines what sensitive data to protect and what to do when someone tries to move it outside approved boundaries. It also sets how strictly to enforce those rules. Creating the policy in the portal is straightforward. The decisions that determine whether it works well happen before you select **Create policy**.

## Prerequisites

Before creating a policy, confirm:

*   You have the appropriate administrative role (such as **Compliance Administrator** or **Information Protection Admin**).
*   Your organization has the required Microsoft 365 E5 or equivalent licensing.
*   Target devices are onboarded.

### Policy scoping: users and devices (preview)

Endpoint DLP policies are scoped to both users and devices. For a policy to apply, both must be in scope. A user in scope on an out-of-scope device won't trigger the policy. The reverse is also true.

Dual scoping matters for shared devices and kiosks. A policy targeting one department's users won't affect another department's users on the same endpoint, even if the device is onboarded. For more information, see [Device scoping](/en-us/purview/dlp-policy-reference?azure-portal=true#device-scoping).

## Choose conditions that match your risk

Conditions define what triggers the policy. Poorly performing policies often get this wrong: too broad means excessive false positives, too narrow means missed incidents.

**Sensitive information types (SITs)** identify patterns like credit card numbers, national IDs, or bank account formats. They work well for structured data but can match similar patterns that aren't actually sensitive. Combining a SIT with a confidence level threshold reduces noise.

**Sensitivity labels** match files that users or autolabeling policies label. Labels are more reliable than pattern matching because the classification decision already exists. If your organization has a mature labeling strategy, labels should be your primary condition.

**Trainable classifiers** use machine learning to identify content categories like source code, resumes, or legal documents. Useful for unstructured data that doesn't follow predictable patterns, but accuracy varies by content type and volume.

**Exact data match (EDM)** compares content against a specific dataset you provide, like employee IDs or patient record numbers. Most precise, but requires maintaining the reference dataset.

Start with the question: what's the most common way this data type leaves the organization? If it's files copied to USB drives, the activity restriction matters more than the condition precision. If it's content pasted into web forms, you need conditions precise enough to avoid blocking routine browser use.

## Choose actions and severity

Actions define what happens when a condition is met during a restricted activity. Four levels:

**Audit** logs the event without affecting the user. The right starting point for any new policy, and sufficient when the risk is low enough that visibility alone works.

**Warn** shows a notification explaining the risk but allows the user to proceed. Effective for medium-risk scenarios where most violations are unintentional.

**Block with override** prevents the action but lets the user provide a business justification. The justifications become data you can review to determine whether the policy is calibrated correctly.

**Block** prevents the action with no override. Reserve this for your highest-risk combinations. Overusing it generates frustration and workarounds.

You can apply different actions to different activities within the same policy. Audit clipboard copying but block USB transfers for the same data type, matching enforcement to the actual risk of each egress path.

### Copy-to-clipboard behavior

Copy-to-clipboard has nuanced behavior under Block or Block with override rules:

*   **Within the same Office file**: Copy and paste is always allowed, even when the file matches a Block rule.
*   **Between different Office files**: If the source file is sensitive, the copy is blocked.
*   **From Office to non-Office apps**: If the source file is sensitive, the copy is blocked.
*   **From non-Office apps**: Any copy from a sensitive file is blocked regardless of destination.

Enforcement follows the _source_ file's sensitivity. Also, when a DLP rule blocks copying from an open file, copying from _any_ other file in the same application is restricted. That restriction stays in place while the blocked file remains open.

## Create the policy

1.  Navigate to **Solutions** > **Data Loss Prevention** > **Policies**, then select **\+ Create policy**.
    
2.  Select **Custom** policy and provide a name and description. A clear name helps other administrators understand the policy's purpose without opening it.
    
3.  Under **Choose where to apply the policy**, select **Devices**.
    
    [![Screenshot showing devices selected as a location for DLP.](../../wwl/purview-implement-endpoint-dlp/media/dlp-locations-devices.png)](../../wwl/purview-implement-endpoint-dlp/media/dlp-locations-devices.png#lightbox)
    
4.  Select **Create or customize advanced DLP rules**, then select **Create rule**.
    
5.  Configure your **conditions** based on the sensitive information types, labels, classifiers, or exact data match (EDM) you identify during planning.
    
6.  Configure your **actions**. For endpoint policies, set each activity (clipboard, USB, network share, print, restricted apps, browser uploads) to the appropriate enforcement level.
    
    [![Screenshot showing device options when creating an advanced DLP rule.](../../wwl/purview-implement-endpoint-dlp/media/dlp-create-rule-device-options.png)](../../wwl/purview-implement-endpoint-dlp/media/dlp-create-rule-device-options.png#lightbox)
    
7.  Configure **user notifications**. Clear, specific policy tips reduce confusion and help desk calls. "This action is blocked by policy" doesn't help anyone.
    
8.  If using block with override, configure **user overrides** and decide whether to require justification from a preset list, freeform text, or both.
    
9.  Set **incident report** severity and alert recipients.
    
10.  On the **Policy mode** page, select **Run the policy in simulation mode**.
     

## Why simulation mode isn't optional

Every new endpoint DLP policy should run in simulation mode first. Skipping it often leads to endpoint DLP disruptions: legitimate work gets blocked, tickets spike, and administrators disable the policy entirely while they troubleshoot.

Simulation shows which files, users, and activities would trigger the policy without affecting anyone. Before going live, answer these questions:

*   **Is the match volume reasonable?** Hundreds of matches per day means the conditions are too broad.
*   **Are the matches accurate?** Review a sample. If too many are false positives, adjust confidence thresholds, add exceptions, or switch condition types.
*   **Are the right activities being caught?** Verify the policy triggers on the egress paths you intended.
*   **Will the user disruption be acceptable?** If a policy would interrupt a team's core workflow multiple times per day, start with audit or warn.

Run simulation for at least one to two weeks. Short runs miss periodic activities like end-of-month reporting or quarterly data exports.

## Deploy gradually

After simulation, deploy to a small pilot group before expanding organization-wide. The implementation workflow unit covers the phased rollout process.
