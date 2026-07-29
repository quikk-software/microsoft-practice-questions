---
title: "Compare quick and custom insider risk policies"
url: "https://learn.microsoft.com/en-us/training/modules/purview-create-manage-insider-risk-policy/compare-quick-custom-policies"
uid: "learn.wwl.purview-create-manage-insider-risk-policy.compare-quick-custom-policies"
module: "purview-create-manage-insider-risk-policy"
moduleTitle: "Create and manage Insider Risk Management policies"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Compare quick and custom insider risk policies

Microsoft Purview Insider Risk Management offers two ways to create policies: **quick policies** and **custom policies**. Understanding the differences between these options can help you decide which approach is best for your organization.

## What are quick policies?

Quick policies are preconfigured templates designed for common insider risk scenarios. They use analytics and best practices to streamline the policy creation process, making them ideal for organizations that want to get started quickly without heavy customization.

### Examples of quick policies

*   **Data leaks**: Focuses on accidental or intentional data sharing.
    
*   **Data theft by departing users**: Detects potentially risky activities performed by users near their resignation or termination dates
    
*   **Critical asset protection**: Detects risks involving valuable assets.
    
*   **Email exfiltration**: Detects when sensitive files are emailed externally.
    
    [![Screenshot showing the available options for creating a quick policy.](../../wwl-sci/purview-create-manage-insider-risk-policy/media/insider-risk-quick-policies.png)](../../wwl-sci/purview-create-manage-insider-risk-policy/media/insider-risk-quick-policies.png#lightbox)
    

Tip

Quick policies can be created directly from the policy dashboard or based on analytics insights.

### When to use quick policies

*   When you need to implement a policy quickly
*   When your organization has straightforward insider risk scenarios
*   When decisions need to be based on analytics without configuring every detail

### Steps to create a quick policy

1.  Sign in to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
    
2.  Navigate to **Solutions** > **Insider Risk Management** > **Policies**.
    
3.  Select **Create policy** > **Quick policy**.
    
4.  Select **Get started** to review prerequisites and complete any required configuration steps.
    
    [![Screenshot showing how to create a quick policy for the data leak policy template.](../../wwl-sci/purview-create-manage-insider-risk-policy/media/insider-risk-create-quick-policy.png)](../../wwl-sci/purview-create-manage-insider-risk-policy/media/insider-risk-create-quick-policy.png#lightbox)
    

## What are custom policies?

Custom policies allow you to fully tailor the policy settings to fit your organization's unique requirements. They provide granular control over:

*   **Scope**: Define specific users, groups, or adaptive scopes.
*   **Content prioritization**: Focus on specific SharePoint sites, sensitivity labels, or file types.
*   **Indicators and triggers**: Choose detailed conditions and thresholds.

### When to use custom policies

*   When you need precise control over the policy's scope and configuration
*   When your organization has complex or specific insider risk scenarios
*   When aligning closely with internal compliance or security policies is required

## Differences between quick and custom policies

Feature

Quick policies

Custom policies

**Setup time**

Fast

Requires detailed configuration

**Customization**

Limited

Fully customizable

**Recommended for**

Simple or common use cases

Complex or highly specific needs

Start with quick policies if you're new to Insider Risk Management or need immediate results. Use custom policies when you're ready to refine your strategy or address advanced scenarios.

If you decide to create a custom policy, the next article provides detailed instructions for this process.
