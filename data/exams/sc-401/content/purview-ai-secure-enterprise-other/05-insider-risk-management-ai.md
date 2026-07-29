---
title: "Detect risky AI usage with Insider Risk Management"
url: "https://learn.microsoft.com/en-us/training/modules/purview-ai-secure-enterprise-other/insider-risk-management-ai"
uid: "learn.wwl.purview-ai-secure-enterprise-other.insider-risk-management-ai"
module: "purview-ai-secure-enterprise-other"
moduleTitle: "Secure enterprise and browser-based AI apps with Microsoft Purview"
learningPath: "learn.wwl.purview-protect-ai"
---
# Detect risky AI usage with Insider Risk Management

Microsoft Purview Insider Risk Management helps your organization detect, investigate, and respond to internal risks that result from accidental actions or intentional misuse. As generative AI tools become more widely used, they introduce new risks to sensitive data. To help manage those risks, Insider Risk Management includes policy templates that assess user activity, assign risk scores, and take action when needed.

## Use policy templates to detect risky AI activity

Insider Risk Management includes the **Risky AI usage** policy template, which helps detect sensitive prompts or AI-generated responses that could introduce risk. Detection contributes to user risk scoring and supports adaptive protection.

You can use this policy to:

*   Identify behavior that might put sensitive data at risk
*   Analyze how generative AI tools are used across supported apps
*   Respond to early signs of policy violations or risky behavior

### Risky AI usage policy template

This policy detects risky interactions with generative AI tools, such as:

*   Prompts that contain sensitive or regulated information
*   AI responses that might inappropriately reveal internal data

Detection applies to tools like Microsoft 365 Copilot and other supported AI apps. These activities contribute to user risk scores and support Adaptive Protection.

Before you create the policy, complete these configuration steps:

1.  Turn on auditing in Microsoft 365
2.  Assign the required permissions in Microsoft Purview
3.  Enable the indicators needed in Insider Risk Management. The Risky AI usage template depends on the relevant indicators being turned on, either before or during policy creation.

For broader detection coverage, consider pairing the policy with:

*   The Microsoft Insider Risk Extension for Microsoft Edge or the Purview extension for Chrome
*   A Communication Compliance policy to detect inappropriate content
*   An HR connector to provide risk context for departing users

You can configure the Risky AI usage policy from the Insider Risk Management solution or from a recommendation in Data Security Posture Management (DSPM) for AI.

## Create a Risky AI usage policy

You can create a Risky AI usage policy in three ways: as a quick policy, a custom policy, or from a recommendation in DSPM for AI.

### From a recommendation in DSPM for AI

Creating the policy through DSPM for AI helps prioritize AI-specific risk signals and aligns it with other data security recommendations.

1.  Go to **Solutions** > **DSPM for AI** > **Recommendations**
2.  Select **Detect risky interactions in AI apps (preview)**
3.  Choose **Create policies**.

### As a quick policy

1.  In Microsoft Purview, go to **Solutions** > **Insider Risk Management** > **Policies**.
2.  Select **Create policy** > **Quick policy** > **Risky AI usage** and follow the prompts.

### As a custom policy

Use these steps to configure the policy manually:

[![Screenshot showing the Risky AI usage template in Insider Risk Management.](../../wwl-sci/purview-ai-secure-enterprise-other/media/risky-ai-usage-template.png)](../../wwl-sci/purview-ai-secure-enterprise-other/media/risky-ai-usage-template.png#lightbox)

1.  Go to [Microsoft Purview](https://purview.microsoft.com/).
    
2.  Select **Solutions** > **Insider risk management** > **Policies**.
    
3.  Select **Create policy** > **Custom policy**.
    
4.  Choose the **Risky AI usage** template.
    
5.  Name your policy and provide an optional description.
    
6.  Choose whether to apply the policy to all users or specific groups.
    
    *   Applying to all users enables real-time analytics.
7.  Skip content prioritization unless required for other indicators.
    
8.  On the **Triggering events** page, select the events that will start assigning risk scores. For AI-related policies, consider options like messages flagged by Communication Compliance.
    
9.  Choose built-in or custom thresholds for triggering events.
    
10.  On the **Indicators** page, select the indicators you want this policy to use. You can also turn on any additional indicators that aren't currently enabled.
     
11.  Choose default or custom thresholds.
     
12.  Review your settings and select **Submit** to activate the policy.
     

Risk signals from this policy can feed into Adaptive Protection, which uses user risk levels to adjust data loss prevention enforcement dynamically.
