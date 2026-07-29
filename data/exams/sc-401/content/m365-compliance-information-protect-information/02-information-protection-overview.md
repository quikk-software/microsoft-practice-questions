---
title: "Sensitivity label overview"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information/information-protection-overview"
uid: "learn-m365.m365-compliance-information-protect-information.information-protection-overview"
module: "m365-compliance-information-protect-information"
moduleTitle: "Create and configure sensitivity labels with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Sensitivity label overview

Microsoft Purview Information Protection uses sensitivity labels to help organizations categorize and protect data while enabling productivity and collaboration. As content expands beyond firewalls and across different devices, apps, and services, these labels ensure data is handled safely and in accordance with regulations. As we navigate the challenges of data management in a global consulting firm, we explore the practical use of sensitivity labels within Microsoft Purview Information Protection to secure data across Microsoft 365.

## Sensitivity label uses

You can use sensitivity labels for:

*   **Encryption and content markings**: Apply labels like _Confidential_ to encrypt documents and emails and add watermarks, headers, and footers. Encryption restricts actions for authorized users.
*   **Cross-platform content protection**: Protect content across Office apps on various platforms, including desktop and web on Windows, macOS, iOS, and Android.
*   **Non-Microsoft app protection**: Secure content in apps like SalesForce, Box, or DropBox with Microsoft Defender for Cloud Apps.
*   **Container protection**: Manage privacy and access settings for Teams, Microsoft 365 Groups, and SharePoint sites.
*   **Meeting and chat Security**: Secure Teams meetings and chats with encryption and specific access controls.
*   **Data intelligence**: Integrate labels with Power BI and Microsoft Purview Data Map to safeguard data across services.
*   **Non-Microsoft app extension**: Integrate sensitivity labels with external apps using the Microsoft Purview Information Protection SDK for consistent data protection.
*   **Visual marking**: Label data without enforcing protection, allowing for future application of security measures.
*   **Microsoft Copilot integration**: Use sensitivity labels within Microsoft Copilot to ensure data protection during interactions.

## Application of sensitivity labels

To apply sensitivity labels, users must sign in with their Microsoft 365 work or school account. These labels, part of Microsoft Purview, are designed to help organizations manage the sensitivity of their data consistently across the digital environment.

Consider an Excel document named _Financial Summary_ containing sensitive fiscal data intended for internal review. Applying the _Confidential_ sensitivity label encrypts the document and sets access permissions for specific employees, protecting sensitive financial information even outside the organization's immediate digital boundaries.

[![Sensitivity label on the Excel ribbon and status bar.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-in-excel.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-in-excel.png#lightbox)

## Understand sensitivity labels

### What sensitivity labels are

Sensitivity labels are like customizable stamps for your organization's content. They are:

*   **Customizable**: Tailored to your organization's needs, categorizing content into levels like _Personal_, _Public_, _General_, _Confidential_, and _Highly Confidential_.
*   **Clear text**: Stored in clear text, making them readable by non-Microsoft apps for more protective actions.
*   **Persistent**: Remain with content wherever it's saved or stored, enforcing your organization's policies.

### What sensitivity labels can do

Once applied, sensitivity labels enforce protection settings on emails, meeting invites, and documents. Configurations can include:

*   **Encryption and content marking** to restrict access and visually mark the content.
*   **Container protection** for collaborative tools like Teams, Microsoft 365 Groups, and SharePoint sites.
*   **Auto-labeling** to automatically classify files and emails or to prompt users for labeling.

#### Elements of sensitivity labels

While sensitivity labels in Microsoft Purview Information Protection offer features like encryption and auto-labeling, they also include elements that define their setup and organization:

*   **Label scopes** define the relevance of labels, controlling which settings are visible and how they appear across different applications and services.
    
    [![Screenshot that shows scope options for sensitivity labels.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-labels-scopes.png#lightbox)
    
*   **Label priority** determines the order in which labels are assigned, affecting how they're automatically applied and how they inherit label properties.
    
    [![Screenshot that shows options to change the priority of sensitivity labels.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-reorder-options.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-reorder-options.png#lightbox)
    
*   **Sublabels** or grouped labels, improve label management by enabling more detailed classification within broader sensitivity categories.
    
    [![Example of sublabels from a sensitivity label.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-sublables.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-sublables.png#lightbox)
    

#### Editing or deleting a sensitivity label

If you delete a sensitivity label from the Microsoft Purview portal, the label isn't automatically removed from content. Any protection settings continue to be enforced on content that had that label applied.

If you edit a sensitivity label, the version of the label that was applied to content is what's enforced on that content.

### What label policies can do

After you create your sensitivity labels, you need to publish them to make them available to people and services in your organization. The sensitivity labels can then be applied to Office documents and emails, and other items that support sensitivity labels.

*   **Publish to users and groups**: Unlike retention labels that are often applied to locations like Exchange mailboxes, sensitivity labels are assigned to specific users or groups.
*   **Default label for content**: Policies can set default labels for content such as documents, emails, meeting invites, and new containers like Teams and SharePoint sites.
*   **Require justification for label changes**: Policies can require users to give a reason when changing a label, especially if it lowers the data's sensitivity level.
*   **Mandatory labeling for certain content**: Some types of content might need to have a label before actions like saving, sending, or sharing are allowed.
*   **Help links for users**: Policies can include customized help links for more guidance on label use.
*   **Policy priority (order matters)**: The order of label policies shows their priority, affecting how settings are applied in cases of conflict.
*   **Policy application time**: It might take up to 24 hours for changes in label policies to fully apply across an organization.

## Sensitivity labels and Microsoft Copilot for Microsoft 365

Microsoft Copilot for Microsoft 365 recognizes and uses sensitivity labels to enhance data protection. It prioritizes the most restrictive labels in features like Microsoft 365 Chat, ensuring sensitive data is handled appropriately. When labels include encryption, Copilot checks user permissions before allowing access to the data.

## Knowledge check

Select the best response to the question.

## Check your knowledge

1.

Which of the following best describes the purpose of sensitivity labels in Microsoft Purview Information Protection?

To provide a system for encrypting emails exclusively within Outlook.

To automatically delete data that is no longer needed or is obsolete.

To classify and protect organizational data across Microsoft 365 and other platforms, based on defined sensitivity levels.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
