---
title: "Configure just-in-time (JIT) protection"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/configure-just-in-time-protection"
uid: "learn-m365.purview-implement-endpoint-dlp.configure-just-in-time-protection"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Configure just-in-time (JIT) protection

When a user copies a file to a USB drive or uploads it to a cloud service, endpoint data loss prevention (DLP) needs to classify that file before it can enforce a policy. Classification takes time. Without just-in-time (JIT) protection, the file can leave the device before classification finishes, and the policy never acts. JIT closes that gap by pausing the egress activity until classification completes.

The trade-off is brief delays on everyday actions like file copying and printing. JIT is worth enabling when your organization handles data sensitive enough that even a single unclassified file leaving a device is unacceptable. If your policies primarily use audit actions or your sensitive data is well-labeled in advance, JIT adds friction without meaningfully improving protection.

## What happens without JIT

Endpoint DLP evaluates files as they're accessed but can't guarantee classification finishes before an egress activity completes. An unclassified file, or one with stale classification because a policy changes, can be copied or uploaded without enforcement. The event still gets logged after the fact, but the data has already left the device.

## How JIT works

JIT is available on Windows 10 and Windows 11. When a user attempts an egress activity on a file that hasn't been classified or whose classification is stale, JIT pauses the activity, triggers classification, and applies the policy verdict.

A **JIT candidate file** is one that hasn't been evaluated by DLP, or one whose classification is stale because a policy has changed since the last evaluation. When a candidate file is encountered, JIT either audits the event without blocking or blocks the activity. The outcome depends on whether the user is in scope and whether a blocking policy exists.

The **fallback action** controls what happens when classification fails entirely. It determines whether a failed classification results in the activity being allowed or blocked.

### Evaluation flow

1.  If the activity involves an excluded app, file path, or file extension, JIT allows it without evaluation.
2.  If the user isn't in JIT scope, or no block/block-with-override action exists, JIT audits but doesn't block.
3.  If the activity targets an allowed destination, JIT allows it.
4.  JIT pauses the activity and begins policy evaluation.
5.  If evaluation completes quickly and the activity supports resume, the system resumes it automatically with the policy verdict applied. The user experiences a brief pause.
6.  If evaluation takes longer, JIT blocks the activity and shows a notification. The user can retry once evaluation finishes.
7.  If evaluation fails entirely, the fallback action applies.

Some activities (copy to USB, network share) can autoresume after brief evaluation. Others (print, clipboard copy) require the user to retry. The difference in resume behavior affects how disruptive JIT feels, so consider your organization's most common egress activities when deciding whether to enable it.

## Choose the fallback action

Two options:

**Allow users to complete actions** means if classification fails, the user proceeds and the data leaves unprotected. Safer starting point for most deployments because it limits the effect of failures on productivity. The risk is that a failure during a genuine data loss event results in no enforcement.

**Block users from completing actions** means if classification fails, the action is blocked entirely. More protective but more disruptive. A classification failure on a routine file transfer blocks the user's work even if the file isn't sensitive.

Start with **Allow** during initial deployment. Switch to **Block** after reviewing JIT event data and confirming failures are infrequent.

## Deploy JIT protection

### Prepare your environment

Devices need a current version of the anti-malware client. Newer versions provide better toast notifications and resume support. Deploy endpoint DLP policies to devices before enabling JIT so the system doesn't unnecessarily block activity during initial policy evaluation.

For version requirements and prerequisites, see [Configure just-in-time protection](/en-us/purview/dlp-just-in-time-protection?azure-portal=true).

### Configure JIT in the portal

1.  In the [Microsoft Purview portal](https://purview.microsoft.com?azure-portal=true), navigate to **Settings** > **Data Loss Prevention** > **Just-in-time protection**.
    
2.  Under **Choose which locations to monitor**, select **Devices**.
    
3.  Under **Fallback action in case of failure**, select **Allow users to complete actions**.
    

Caution

Don't set the fallback to **Block users from completing actions** during initial deployment. This setting can significantly disrupt work if classification failures are more common than expected. Validate failure rates first.

### Estimate your JIT event volume

Before expanding beyond a pilot, estimate how often JIT events occur. The ratio of devices triggering JIT events to total pilot devices tells you whether your file population has many unclassified files or classification is taking longer than expected. Address the root cause before expanding.

## Fine-tune for your environment

*   **Clipboard control**: Disabling clipboard during evaluation prevents data from being pasted elsewhere while classification is pending, but adds friction to copy-paste workflows.
*   **App exclusions**: Exempt trusted or internal applications that only handle nonsensitive data or have their own protection controls.
*   **File path exclusions**: Exempt system directories or cache folders to reduce unnecessary evaluation. Be specific. Broad exclusions create coverage gaps.

## After deployment

Review JIT event data regularly. High failure rates might indicate device performance issues, outdated anti-malware versions, or connectivity problems. Excessive blocks on nonsensitive files suggest your policies need broader exclusions. If users consistently report delays on activities that require retry (like printing), weigh whether the protection justifies the disruption.

Once failure rates are low and false blocks are rare, switch the fallback from **Allow** to **Block**.
