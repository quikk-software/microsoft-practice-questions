---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/knowledge-check"
uid: "learn-m365.purview-implement-endpoint-dlp.knowledge-check"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Module assessment

## Check your knowledge

1.

You deployed an endpoint data loss prevention (DLP) policy two days ago with block actions on USB transfers. Help desk tickets are spiking because employees in the finance team can't copy approved reports to encrypted USB drives they use for quarterly audits. What went wrong?

The finance team's devices weren't onboarded correctly.

The policy should have been deployed in simulation mode first to identify legitimate workflows before enforcing.

USB transfers should never be blocked because they're too common.

2.

Your organization manages Windows laptops through Intune and has a set of domain-joined desktops managed through Active Directory. You need to onboard both populations. What's the right approach?

Onboard everything through Intune since it's the newer platform.

Use local scripts on all devices to keep the process consistent.

Use Intune for the laptops and Group Policy for the domain-joined desktops.

3.

You're configuring endpoint DLP for the first time. Your policies use custom trainable classifiers, and users report that devices slow down noticeably after onboarding. What should you check first?

Whether the browser extensions are causing the slowdown.

Whether file path exclusions are configured to skip directories with nonsensitive or temporary files.

Whether just-in-time (just-in-time (JIT) protection is enabled.

4.

An administrator creates an endpoint DLP policy targeting sensitivity labels and sets all activities to block. After a week of simulation, the policy shows only 12 matches per day across 500 devices, and all matches are accurate. What enforcement level makes sense for the initial rollout?

Block for the highest-risk activities like USB transfers, and warn or block with override for lower-risk activities like printing.

Block for all activities, since simulation confirmed the policy is accurate.

Audit only, since this is the first policy.

5.

Your organization handles regulated health data. Files aren't consistently labeled, and compliance requires that no unclassified file with patient information leaves a device. You're deciding whether to enable just-in-time (JIT) protection. What's the right call?

Enable just-in-time (JIT) with the fallback set to allow, then switch to block after confirming classification failures are rare.

Enable just-in-time (JIT) with the fallback set to block, since no unclassified file should leave the device.

Skip just-in-time (JIT) because it adds friction. Rely on sensitivity labels instead.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
