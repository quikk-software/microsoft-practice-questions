---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-irm-adaptive-protection/introduction"
uid: "learn-m365.m365-compliance-irm-adaptive-protection.introduction"
module: "m365-compliance-irm-adaptive-protection"
moduleTitle: "Implement Adaptive Protection in Microsoft Purview"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Introduction

Security policies that treat every user the same create a constant tension: too many restrictions on low-risk users, not enough enforcement on high-risk ones.

A low-risk employee sharing a document with a colleague triggers the same restrictions as a user who flagged multiple exfiltration alerts last week. Analysts spend time reviewing policy matches that turn out to be normal work, while high-risk activity gets the same response as everything else. The enforcement doesn't match the risk.

Adaptive Protection in Microsoft Purview solves this problem. It uses machine learning models in Insider Risk Management to assess each user's risk level and then dynamically assigns the right security controls. High-risk users face stricter enforcement, from blocked file sharing and restricted cloud access to preserved deleted content. Low-risk users continue working without unnecessary disruption. As a user's risk changes, the controls adjust automatically.

## Learning objectives

By the end of this module, you should be able to:

*   Describe how Adaptive Protection uses insider risk levels to enforce controls across DLP, Conditional Access, and Data Lifecycle Management.
*   Evaluate how insider risk level thresholds align to organizational risk tolerance.
*   Determine when to use quick setup versus custom setup.
*   Configure DLP policies that use insider risk levels as a condition.
*   Configure Conditional Access policies that use insider risk levels as a condition.
*   Determine when to enable Data Lifecycle Management retention for high-risk users.

## Prerequisites

*   Foundational knowledge of Microsoft Purview Data Loss Prevention (DLP)
*   Understanding of Microsoft Purview Insider Risk Management concepts
*   Basic familiarity with Microsoft Entra Conditional Access policies
*   Basic understanding of data lifecycle management and retention concepts
