---
title: "Configure encryption with sensitivity labels"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information/configure-sensitivity-label-encryption"
uid: "learn-m365.m365-compliance-information-protect-information.configure-sensitivity-label-encryption"
module: "m365-compliance-information-protect-information"
moduleTitle: "Create and configure sensitivity labels with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Configure encryption with sensitivity labels

As the global consulting firm continues strengthening its data protection efforts, they now focus on **using encryption settings within sensitivity labels**. This allows them to:

*   Control who can access sensitive content, even when it's shared or stored outside the organization.
*   Define editing rights and expiration dates for highly confidential documents.
*   Protect Teams meetings, emails, and files without relying on manual encryption steps.

Administrators can either **assign permissions during label configuration** or **let users define access** when applying labels, depending on the use case.

## How encryption works with sensitivity labels

Sensitivity labels use the Azure Rights Management service (Azure RMS) to enforce encryption. This ensures that content stays protected through encryption, identity verification, and policy enforcement.

Labels that apply to Teams meetings use a separate encryption method tailored to protect real-time audio and video streams.

## Prerequisites

Before enabling encryption with sensitivity labels, ensure:

*   Azure Information Protection is activated in your tenant.
*   Network configurations and Microsoft Entra ID support encrypted content access.
*   Exchange is configured for Azure Information Protection to enable email and calendar invite encryption.

## Add encryption to a sensitivity label

When creating or editing a sensitivity label, you can apply encryption to protect files, emails, and meeting invites.

1.  In the label settings, select **Protection settings** > **Apply or remove encryption**.
    
    [![Screenshot of sensitivity label protection options for items.](../../wwl/m365-compliance-information-protect-information/media/protection-options-sensitivity-label.png)](../../wwl/m365-compliance-information-protect-information/media/protection-options-sensitivity-label.png#lightbox)
    
2.  On the **Encryption** page, select **Configure encryption settings** to define access controls.
    
    [![Screenshot of sensitivity label options for encryption.](../../wwl/m365-compliance-information-protect-information/media/encryption-options-sensitivity-label.png)](../../wwl/m365-compliance-information-protect-information/media/encryption-options-sensitivity-label.png#lightbox)
    
3.  Choose how permissions are assigned:
    
    *   **Assign permissions now** to define user access at the time the label is created.
    *   **Let users assign permissions** to give users the flexibility to configure access when applying the label.
    
    [![Screenshot of option to add user or admin defined permissions.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-user-or-admin-defined-permissions.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-label-user-or-admin-defined-permissions.png#lightbox)
    

Consider a confidential project, such as _Client X Initiative - Confidential_. The firm uses **Assign permissions now** to restrict access to a defined project team, ensuring strict control over document access and editing.

### Assign permissions now

If you choose this option, you can:

*   **Set content expiration** to limit how long users can access labeled content. Expiration can be based on a fixed date or a number of days after labeling.
    
*   **Control offline access**, allowing it always, never, or for a limited time.
    
    [![Screenshot of settings for admin defined permissions.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-encryption-settings-for-admin-defined-permissions.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-encryption-settings-for-admin-defined-permissions.png#lightbox)
    
*   **Specify users or groups** who can access the content, along with their permission levels (for example, view-only, edit, full control).
    
    [![Screenshot of options to assign permissions to users.](../../wwl/m365-compliance-information-protect-information/media/sensitivity-assign-permissions-settings.png)](../../wwl/m365-compliance-information-protect-information/media/sensitivity-assign-permissions-settings.png#lightbox)
    

Options include internal groups, individual users, or broader options like _Any authenticated users_. Choose carefully to match your organization's access policies.

## Update encryption settings for existing labels

You can update a label's encryption settings at any time. Changes apply to new content labeled after the update. For existing labeled content:

*   Changes to **Assign permissions now** take effect when users reauthenticate.
*   Switching from one predefined permission (like _Do Not Forward_) to another (like _Encrypt-Only_) doesn't retroactively apply to existing items.

For example, after completing a sensitive client engagement, the firm might update the label to change edit permissions to view-only, preserving content integrity while maintaining access.

## Knowledge check

Select the best response to the question.

## Check your knowledge

1.

What is the primary purpose of implementing encryption with sensitivity labels in Microsoft Purview Information Protection?

To improve teamwork by sending confidential documents safely.

To make sure that only authorized individuals can access and decrypt sensitive information.

To automate the classification and labeling of sensitive documents based on content.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
