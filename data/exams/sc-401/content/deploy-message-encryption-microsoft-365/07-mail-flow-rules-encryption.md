---
title: "Use Microsoft Purview Message Encryption templates in mail flow rules"
url: "https://learn.microsoft.com/en-us/training/modules/deploy-message-encryption-microsoft-365/mail-flow-rules-encryption"
uid: "learn.wwl.deploy-message-encryption-microsoft-365.mail-flow-rules-encryption"
module: "deploy-message-encryption-microsoft-365"
moduleTitle: "Protect email with Microsoft Purview Message Encryption"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Use Microsoft Purview Message Encryption templates in mail flow rules

To apply Microsoft Purview Message Encryption dynamically, you can configure mail flow rules in Exchange Online. These rules allow you to automatically encrypt messages based on conditions such as sender, recipient, subject line, or keywords in the body.

## Use mail flow rules to apply encryption

You can create mail flow rules in the Exchange admin center (EAC) to apply encryption based on specific criteria. These rules help ensure that sensitive emails are protected without relying on end users to apply encryption manually.

To create a rule that applies Microsoft Purview Message Encryption:

1.  In the Microsoft 365 admin center, go to **All admin centers** > **Exchange**.
    
2.  In the Exchange admin center, select **Mail flow** > **Rules**.
    
3.  Select **New rule**.
    
4.  Select **\+ Add a rule** > **Apply Office 365 Message Encryption and rights protection to messages** from the dropdown.
    
    [![Screenshot showing where to configure a mail flow rule in the Exchange Admin Center.](../../wwl-sci/deploy-message-encryption-microsoft-365/media/exchange-mail-flow-rule.png)](../../wwl-sci/deploy-message-encryption-microsoft-365/media/exchange-mail-flow-rule.png#lightbox)
    
5.  Give the rule a name, such as `Encrypt email to external recipients`.
    
6.  Under **Apply this rule if**, choose conditions such as:
    
    *   **The recipient is external/internal** > **Outside the organization**
    *   **The subject or body includes** > specific keywords
    *   **The sender is located** > **Inside the organization**
7.  Under **Do the following**, choose **Modify the message security** > **Apply Office 365 Message Encryption and rights protection**.
    
    [![Screenshot showing where to configure the encryption rules in the Exchange Admin Center.](../../wwl-sci/deploy-message-encryption-microsoft-365/media/set-encryption-rule.png)](../../wwl-sci/deploy-message-encryption-microsoft-365/media/set-encryption-rule.png#lightbox)
    
8.  Select a template such as **Encrypt** or **Do Not Forward**, or choose a custom template if you have one configured.
    
9.  Configure the rule settings:
    
    *   Under **Rule mode**, choose **Enforce** to immediately apply the rule once it's saved.
    *   Select the appropriate severity based on your organization's needs.
    *   Optionally select when to activate and deactivate the mail flow rule.
    *   In **Match sender address in message**, choose the option that best aligns with your organization's routing and enforcement needs.
10.  Review your settings and create the rule.
     

Tip

You can test mail flow rules before applying them broadly. Consider creating a test rule that applies encryption based on a unique subject keyword, then send a test message and verify the recipient experience.

## Update or remove encryption

You can also update existing mail flow rules to use Microsoft Purview Message Encryption, or create rules to remove encryption when necessary.

For example, you might want to remove encryption from replies sent by internal users, or remove attachment-level encryption from files shared within the organization.

To remove encryption using a mail flow rule:

1.  In the EAC, go to **Mail flow** > **Rules**.
    
2.  Select the rule to modify, then select **Edit rule settings**.
    
3.  In the **Conditions** tab, remove or modify condition.
    
    [![Screenshot showing where to modify the encryption settings in a mail flow rule.](../../wwl-sci/deploy-message-encryption-microsoft-365/media/modify-mail-flow-rule.png)](../../wwl-sci/deploy-message-encryption-microsoft-365/media/modify-mail-flow-rule.png#lightbox)
    
4.  Select **Save** to save your changes.
    

You can also choose to remove **attachment rights protection**, if needed.

## Hybrid environment considerations

If you're using a hybrid Exchange configuration, encryption is only supported when mail is routed through Exchange Online. Make sure both inbound and outbound messages pass through Exchange Online to enforce encryption rules consistently.

Mail flow rules make it easy to apply Microsoft Purview Message Encryption automatically based on message conditions. You can apply default or custom templates to secure sensitive messages, and remove encryption when it's no longer needed. Testing and refining rules helps ensure the best user experience while maintaining your organization's data protection policies.
