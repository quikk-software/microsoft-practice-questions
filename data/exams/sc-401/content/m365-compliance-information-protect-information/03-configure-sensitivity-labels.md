---
title: "Create and configure sensitivity labels and label policies"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information/configure-sensitivity-labels"
uid: "learn-m365.m365-compliance-information-protect-information.configure-sensitivity-labels"
module: "m365-compliance-information-protect-information"
moduleTitle: "Create and configure sensitivity labels with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Create and configure sensitivity labels and label policies

As the global consulting firm works to improve its data management practices, the next step is creating and publishing sensitivity labels. Sensitivity labels are critical for protecting sensitive information, meeting compliance requirements, and supporting secure collaboration across the organization.

## How sensitivity labels work

Before you create and apply sensitivity labels with Microsoft Purview Information Protection, it's important to understand the overall workflow:

[![Diagram showing workflow for sensitivity labels.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-flow.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-flow.png#lightbox)

*   **Administrators** create and publish sensitivity labels to users and groups through label policies.
*   **End users** apply sensitivity labels to classify emails, documents, and other content.
*   **Applications and services** enforce protections based on the labels applied by users.

## Prerequisites

Before creating and publishing labels, make sure the following requirements are met:

**Requirement**

**Details**

Licensing

[Verify that your Microsoft 365 subscription supports sensitivity labels.](/en-us/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance?azure-portal=true#microsoft-purview-information-protection-sensitivity-labeling)

Permissions

Global administrators can assign one of the required roles:  
\- Information Protection Admin  
\- Information Protection Analyst  
\- Information Protection Investigator  
\- Information Protection Reader

## Create and organize sensitivity labels

Sensitivity labels help classify and protect content across your organization. A **parent label** defines the main protection settings, like encryption or access restrictions. **Sublabels** group related protection options under a parent label, giving users more detailed choices, for example, different confidentiality levels for different departments.

You can create a parent label first, and then create sublabels if you need to offer more specific options.

### Steps to create a parent sensitivity label

1.  Go to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
    
2.  Select **Solutions** > **Information protection** > **Sensitivity labels**.
    
3.  On the **Sensitivity labels** page, select **\+ Create a label**.
    
    [![Screenshot showing where to create a label in the Microsoft Purview portal.](../../wwl/m365-compliance-information-protect-information/media/create-sensitivity-label-full.png)](../../wwl/m365-compliance-information-protect-information/media/create-sensitivity-label-full.png#lightbox)
    
4.  Provide basic details for the label such as a unique name, display name, description for users, and optional description for admins.
    
5.  On the **Define the scope for this label** page, choose the types of content you want the label to apply to, such as files, emails, meetings, or containers like Teams sites and SharePoint sites.
    
    [![Screenshot that shows scope options for sensitivity labels.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png#lightbox)
    
6.  Configure protection settings, then review and save the label.
    

Creating and saving a label makes it available for publishing, but users can't see or use the label until it's published in a label policy.

### Steps to create a sublabel

If you want to offer more detailed labeling choices, you can create a sublabel under a parent label. For example, under a **Confidential** parent label, you might create sublabels for **Finance**, **HR**, and **Legal**.

To create a sublabel:

1.  In the **Sensitivity labels** list, select the parent label.
    
2.  Select **...** (Actions) next to the label name, then choose **Create sublabel**.
    
3.  Configure the sublabel settings just like you would for a regular label.
    
4.  Save your sublabel when finished.
    
    [![Screenshot showing where to create a sublabel to a parent sensitivity label.](../../wwl/m365-compliance-information-protect-information/media/create-sublabel.png)](../../wwl/m365-compliance-information-protect-information/media/create-sublabel.png#lightbox)
    

Use sublabels to organize related protection settings under a main category, making it easier for users to choose the right label.

## Edit an existing sensitivity label

If you need to update a label, such as changing its name, description, or protection settings, you can edit it at any time.

1.  In the **Sensitivity labels** list, find the label you want to change.
2.  Select **...** (Actions) next to the label name, then select **Edit label**.
3.  Make your changes and save them.

Saving your edits starts the update process right away. Most changes appear for users within 24 hours, but depending on network conditions or directory updates, it might take up to 48 hours for edits to fully sync across all apps and services.

## Publish sensitivity labels

Creating labels is only the first step. To make them available to users and apps, you need to publish them by creating a label policy.

To publish sensitivity labels:

1.  From the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true), go to **Solutions** > **Information protection** > **Label publishing policies**.
    
2.  On the **Label policies** page, select **Publish label**.
    
3.  On the **Choose sensitivity labels to publish** page, select the labels you want users to see. If you select a sublabel, you must also select its parent label.
    
    [![Screenshot showing selecting sensitivity labels to publish.](../../wwl/m365-compliance-information-protect-information/media/publish-sensitivity-labels.png)](../../wwl/m365-compliance-information-protect-information/media/publish-sensitivity-labels.png#lightbox)
    
4.  Choose the users and groups you want to assign the label policy to. It's recommended to use groups rather than individual users for easier management.
    
5.  If your organization uses administrative units in Microsoft Entra ID, you can scope the policy accordingly. Otherwise, leave the default of **Full directory**.
    
6.  Complete the remaining settings, such as default labels and mandatory labeling (if needed).
    

After you complete the label policy setup, the labels are automatically published. It can take up to 24 hours for users to see and apply the new labels across supported apps.

## Edit a label policy

You can update a label policy at any time.

1.  In the **Label policies** list, select the policy you want to change.
2.  Select **Edit policy** to update label selections, assigned users, or settings.

Changes are typically reflected within 24 hours but might take up to 48 hours depending on factors like network latency or group membership updates.

## Remove or delete sensitivity labels

At some point, you might need to phase out a label or remove it entirely.

*   **Removing a label from a policy**: Makes the label unavailable for new use but doesn't affect existing labeled content. This is useful when you're retiring or replacing a label gradually.
*   **Deleting a label**: Permanently removes the label from the system. Existing content retains the label name but might lose protection settings depending on how the label was configured.

Always carefully review potential effects before deleting labels, especially if they're widely used.

## Knowledge check

Select the best response to the question.

## Check your knowledge

1.

How do end users participate in the sensitivity label process?

Creating and publishing sensitivity labels to specific users and groups within a label policy.

Classifying their emails and documents by applying the appropriate sensitivity label.

Applying protection settings based on the labels assigned by administrators.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
