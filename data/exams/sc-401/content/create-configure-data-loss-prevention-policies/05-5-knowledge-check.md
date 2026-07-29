---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/create-configure-data-loss-prevention-policies/5-knowledge-check"
uid: "learn.wwl.create-configure-data-loss-prevention-policies.knowledge-check"
module: "create-configure-data-loss-prevention-policies"
moduleTitle: "Configure DLP policies for Microsoft Defender for Cloud Apps and Power Platform"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Module assessment

Choose the best response for each question.

## Check your knowledge

1.

A tenant-level data loss prevention (DLP) policy blocks social media connectors. An environment-level policy for the development environment places those same connectors in the Non-Business group. What happens to social media connectors in that environment?

The environment-level policy overrides the tenant-level policy, so social media connectors are available in the Non-Business group.

Social media connectors remain blocked because the most restrictive classification across all applicable policies takes effect.

The policies conflict, so both are suspended until an admin resolves the overlap.

2.

You need to detect and quarantine files containing sensitive financial data that users share externally through a connected Box instance. Which approach should you use?

Create a DLP policy in the Microsoft Purview portal scoped to the Instances location.

Create a file policy in the Microsoft Defender portal under Cloud Apps.

Create a DLP policy in the Power Platform admin center.

3.

You create a new file policy in Defender for Cloud Apps to detect externally shared files containing credit card numbers across all connected cloud apps. The policy is active and scanning. What should you do before adding a governance action like quarantine?

Review the initial matches to confirm the policy is detecting the right files, then add governance actions after validating the scope.

Add the quarantine action immediately so violations are remediated as soon as they're detected.

Wait 30 days for the policy to collect enough data, then enable quarantine.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
