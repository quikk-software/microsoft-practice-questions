---
title: "Understand service encryption in Microsoft Purview"
url: "https://learn.microsoft.com/en-us/training/modules/audit-encryption/microsoft-managed-keys"
uid: "learn-m365.audit-encryption.microsoft-managed-keys"
module: "audit-encryption"
moduleTitle: "Understand Microsoft 365 encryption"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Understand service encryption in Microsoft Purview

With Microsoft Managed Keys, the Microsoft service manages and stores the root encryption keys used for service encryption, relieving the customer of the burden of provisioning and managing root encryption keys. Microsoft Managed Keys are stored in private key vaults that can only be accessed indirectly by Microsoft 365 services for data encryption. These keys cannot be accessed directly by Microsoft employees.

Microsoft Managed Keys are a viable solution for cloud customers that don't have key management requirements. For some customers, Microsoft Managed Keys may not meet their obligations for key management, operation, or storage. To meet these obligations, customer-managed keys can be implemented using the Customer Key feature.

[![Diagram showing the Microsoft Managed key hierarchy.](../../m365/audit-encryption/media/managed-key-hierarchy.png)](../../m365/audit-encryption/media/managed-key-hierarchy.png#lightbox)

[](../../m365/audit-encryption/media/managed-key-hierarchy.png#lightbox)

The left side of diagram above outlines the key hierarchy for Exchange Online, which shows how two Microsoft Managed RSA keys and one equivalent AES-256 availability key are used to protect the Data Encryption Policy Key, which in turn protects the Mailbox Key used to encrypt mailboxes in Exchange Online. The right side of the diagram shows the key hierarchy for SharePoint Online, OneDrive for Business, and Microsoft Teams files, which use SQL Transparent Data Encryption to protect File Chunk Encryption Keys for SQL Databases.

Microsoft manages service level encryption keys by default, but some customers may have internal or external requirements to manage their own root keys. The next unit will cover the Customer Key feature, which allows customers to meet those requirements.
