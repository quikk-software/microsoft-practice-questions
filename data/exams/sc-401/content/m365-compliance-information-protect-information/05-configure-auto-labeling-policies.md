---
title: "Implement auto-labeling policies"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information/configure-auto-labeling-policies"
uid: "learn-m365.m365-compliance-information-protect-information.configure-auto-labeling-policies"
module: "m365-compliance-information-protect-information"
moduleTitle: "Create and configure sensitivity labels with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Implement auto-labeling policies

As the global consulting firm continues strengthening its data protection strategy, the next step is implementing auto-labeling policies. Automating sensitivity labeling helps manage sensitive information across SharePoint Online, OneDrive, and Exchange Online. It ensures consistent data protection across the firm's digital platforms while reducing the need for manual labeling.

## What is auto-labeling and why is it important?

Auto-labeling policies automatically apply sensitivity labels to emails, documents, and other content across Microsoft 365. This process helps organizations protect sensitive data consistently without relying on users to manually classify every piece of content.

There are two ways to automatically apply sensitivity labels in Microsoft 365:

*   **Client-side labeling**: Office apps recommend or automatically apply labels while users are working in Word, Excel, PowerPoint, or Outlook.
*   **Service-side labeling**: Labels are applied automatically to stored content in SharePoint, OneDrive, and Exchange, even if users don't interact with the content.

Let’s take a closer look at how both methods work and how to configure them in your environment.

## Auto-labeling in Office apps using client-side labeling

Client-side auto-labeling allows Office apps to apply or recommend sensitivity labels based on the content users create or edit. This approach helps guide users to label content correctly while still allowing flexibility when appropriate.

### Requirements for client-side auto-labeling

Before configuring client-side auto-labeling, make sure:

*   Office apps meet [specific version requirements](/en-us/purview/sensitivity-labels-office-apps?azure-portal=true#support-for-sensitivity-label-capabilities-in-apps).
    
*   Sensitivity labels are scoped to apply to **Files & other data assets**, **Emails**, and **Meetings**.
    
    [![Screenshot of sensitivity label scope options for Items that include Files and Email.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png#lightbox)
    

After you define the label scope and protection settings, configure the conditions that trigger automatic labeling based on sensitive information types or trainable classifiers.

[![Screenshot of label conditions for auto-labeling in Office apps.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-conditions.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-conditions.png#lightbox)

When a sensitivity label is automatically applied, users see a notification in their Office app:

[![Screenshot showing notification that a document had a label applied automatically.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-automatically-applied.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-automatically-applied.png#lightbox)

You can also configure the label to suggest application, giving users the option to accept or dismiss it based on the content. In desktop versions of Word, users can even view the content that triggered the suggestion, helping them make informed decisions about labeling.

When configuring auto-labeling for Office apps:

*   If you use exact data match (EDM) classifiers, include at least one non-EDM sensitive information type to keep auto-labeling active.
*   Keep Microsoft 365 App version requirements in mind when using trainable classifiers.

## Auto-labeling for stored content using service-side labeling

Service-side auto-labeling applies sensitivity labels directly to content in SharePoint, OneDrive, and Exchange Online without user interaction.  
This method is critical for protecting data at rest across your digital environment.

### Requirements for service-side auto-labeling

Before creating a service-side policy, make sure:

*   [Audit logging is enabled](/en-us/purview/audit-log-enable-disable).
*   Admins reviewing simulation results have the **Data Classification Content Viewer** role assigned.
*   Sensitivity labels are enabled for SharePoint and OneDrive libraries.
*   Files must not be open or checked out during labeling.
*   Labels that enforce encryption have correct configuration settings.

### Test service-side auto-labeling with simulation mode

Before you deploy a service-side auto-labeling policy, it's important to run it in **simulation mode**.  
Simulation mode allows you to test the policy against your content without making permanent changes.

The basic workflow:

1.  Create and configure the auto-labeling policy.
2.  Run the policy in simulation mode. Simulations typically complete within 12 hours.
3.  Review the simulation results to see which content matches the labeling rules.
4.  Fine-tune your policy settings if necessary.
5.  When satisfied with the results, proceed with full policy deployment.

Simulation mode can analyze up to 1 million items per run.

### Create an auto-labeling policy in Microsoft Purview

After reviewing your simulation results, you're ready to create and deploy your policy.

1.  Go to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
    
2.  Navigate to **Solutions** > **Information protection** > **Policies** > **Auto-labeling policies**.
    
3.  Select **\+ Create auto-labeling policy**.
    
4.  On the **Choose info you want this label applied to** page, select a template (such as Financial or Privacy) or create a custom policy.
    
    [![Screenshot of the New policy configuration for auto-labeling.](../../wwl/m365-compliance-information-protect-information/media/auto-labeling-wizard.png)](../../wwl/m365-compliance-information-protect-information/media/auto-labeling-wizard.png#lightbox)
    
5.  Name your policy and optionally add a description.
    
6.  On the Choose a label to auto-apply page, select **\+ Choose a label**, then pick the sensitivity label to apply when content meets the defined conditions.
    
7.  Assign the policy to administrative units if needed, or select **Full directory** to apply it organization-wide.
    
8.  Choose the locations (Exchange, SharePoint, and OneDrive) where the labels should be applied.
    
    [![Screenshot of the Choose locations page for auto-labeling configuration.](../../wwl/m365-compliance-information-protect-information/media/scope-policy-service-side-labeling.png)](../../wwl/m365-compliance-information-protect-information/media/locations-auto-labeling-wizard.png#lightbox)
    
9.  Define the rules that determine how labels are assigned using sensitive information types, classifiers, sharing conditions, and more.
    
10.  Select the label you want to automatically apply.
     
11.  Configure extra email settings if needed (for example, replacing labels or encrypting inbound email).
     
12.  Decide whether to run the policy in simulation mode first or leave it turned off until you're ready.
     
13.  Review your settings and create the policy.
     

## Knowledge check

Select the best response to the question.

## Check your knowledge

1.

Which best describes the difference between client-side and service-side labeling in Microsoft 365?

Client-side labeling applies labels in Office apps while users create or edit content, while service-side labeling applies labels automatically to content in SharePoint, OneDrive, and Exchange Online without user interaction.

Client-side labeling applies labels only to desktop-created content, while service-side labeling applies labels to cloud content only.

Client-side labeling always requires users to accept or reject a label, while service-side labeling never allows any user override.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
