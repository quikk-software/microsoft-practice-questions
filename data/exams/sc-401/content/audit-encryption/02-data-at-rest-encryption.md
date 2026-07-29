---
title: "Learn how Microsoft 365 data is encrypted at rest"
url: "https://learn.microsoft.com/en-us/training/modules/audit-encryption/data-at-rest-encryption"
uid: "learn-m365.audit-encryption.data-at-rest-encryption"
module: "audit-encryption"
moduleTitle: "Understand Microsoft 365 encryption"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Learn how Microsoft 365 data is encrypted at rest

All customer content at rest in Microsoft 365 is protected by one or more forms of encryption. BitLocker is used on disk drives at the volume level, ensuring all data-at-rest is encrypted. BitLocker encryption is a data protection feature built into Windows that integrates with the operating system and mitigates the threat of data theft or exposure from lost, stolen, or inappropriately decommissioned computers. In addition to using BitLocker for volume-level encryption, Microsoft 365 services integrate another layer of encryption at the application-level to further protect customer data.

## BitLocker volume level encryption

BitLocker is deployed with Advanced Encryption Standard (AES) 256-bit encryption on disks containing customer data. Disk sectors are encrypted with a Full Volume Encryption Key (FVEK), which is itself encrypted with the Volume Master Key (VMK), which in turn is bound to the Trusted Platform Module (TPM) in the server. Because the VMK directly protects the FVEK, protecting the VMK using the TPM is critical for preventing unauthorized access to the FVEK. BitLocker uses FIPS-compatible algorithms to ensure that encryption keys are not stored or sent over the wire in cleartext. The Microsoft 365 implementation of customer data-at-rest-protection does not deviate from the default BitLocker implementation.

![Diagram depicting the chain of trust for BitLocker encryption. Cleartext data is encrypted by a Full Volume Encryption Key, which is protected by the Volume Master Key, which is bound to the Trusted Platform Module.](../../m365/audit-encryption/media/encryption-flow-bitlocker.png)

BitLocker supports keys which fall into two management categories:

*   BitLocker-managed keys, which are generally short-lived and tied to the lifetime of an operating system instance installed on a server or to a given disk. These keys are deleted and reset during server reinstallation or disk formatting.
*   BitLocker recovery keys, which are managed outside of BitLocker, are used for disk decryption. BitLocker uses recovery keys for the scenario in which an operating system is reinstalled, and encrypted data disks already exist. Recovery keys are also used by Managed Availability monitoring probes in Exchange Online where a responder may need to unlock a disk.

BitLocker key management protects recovery keys that are used to unlock and recover encrypted disks in a Microsoft datacenter. Microsoft 365 stores the master keys in a secured share, only accessible by individuals who have been screened and approved. The credentials for the keys are stored in a secured repository for access control data (what we call a "secret store"), which requires a high level of elevation and management approvals to access using a Just-In-Time (JIT) access elevation tool.

## Service level encryption

Exchange Online, Microsoft Teams, SharePoint Online, and OneDrive for Business all use service level encryption to provide an additional layer of security for customer data-at-rest.

Exchange Online uses BitLocker to encrypt all mailbox data, including Skype for Business user generated data, at the mailbox level. Customer files in SharePoint Online are protected by unique per-file keys that are always exclusive to a single tenant. During upload, each file (including each updated file) is split into chunks and are individually encrypted with their own unique AES 256-bit key. The chunks are then stored as blobs in Azure Storage, randomly distributed between different blob containers. The chunks, keys, and the map used to reconstruct the files upon download are all stored in separate locations. Azure storage has no access to the encrypted data. Multiple Microsoft 365 workloads, including Microsoft Teams and OneDrive for Business, leverage SharePoint Online to store customer data.

Customers have two options for service level encryption key management:

*   Microsoft Managed Keys – In the default implementation for customers not using Customer Key, Microsoft manages all cryptographic keys used for service encryption. This option is currently enabled by default for Exchange Online, SharePoint Online, and OneDrive for Business. Microsoft Managed keys provide default service encryption unless a customer onboards to Customer Key.
*   Customer Key – This option allows customers to use their own root keys to encrypt customer data. Customer keys are uploaded to or generated within Azure Key Vault, allowing customers to control the ability of Microsoft services to decrypt and process customer data. This option is currently available for Exchange Online, SharePoint Online, and OneDrive for Business.

Regardless of the selected key management option, the root keys are used to protect key hierarchies used by service encryption. All keys used for service encryption are stored securely in private repositories, such as Azure Key Vault, where they can be used by automated service code without direct accessibility by Microsoft personnel. Service encryption includes regular key rotation to maintain key security. Key rotation occurs through automated service code on internally defined schedules based on key type. Customers who use Customer Key are responsible for rotating their root Customer Keys based on their own security and compliance requirements. The next two units will cover both of these options in more detail.
