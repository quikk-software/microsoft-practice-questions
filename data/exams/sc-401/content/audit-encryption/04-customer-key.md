---
title: "Explore customer key management using Customer Key"
url: "https://learn.microsoft.com/en-us/training/modules/audit-encryption/customer-key"
uid: "learn-m365.audit-encryption.customer-key"
module: "audit-encryption"
moduleTitle: "Understand Microsoft 365 encryption"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Explore customer key management using Customer Key

Customer Key allows customers to use their own root keys to encrypt their data. Customer keys are uploaded to or generated within Azure Key Vault, allowing customers to control the ability of Microsoft services to decrypt and process customer data. This option is currently available for Exchange Online, SharePoint Online, and OneDrive for Business.

Customer Key enables compliance with internal policies or external obligations involving the keys used for data encryption. These compliance obligations may include requirements to own the root keys used for data encryption, rotate keys on a defined cadence, or store keys in an HSM. It also provides customers the option to revoke their root keys and request a data purge when they leave the service, which shortens the time their data is retained in the cloud after service termination by cryptographically shredding the data, as outlined in the [Microsoft Product Terms](https://www.microsoft.com/licensing/product-licensing/products?azure-portal=true).

When using Customer Key, the customer's root keys use FIPS 140-2 compatible algorithms and don't leave the HSM boundary. As a result, customers may exercise their control and revoke their keys should they decide to exit the service. Revoking the keys and requesting a data purge renders encrypted data unreadable to our services.

The benefits of using Customer Key include:

*   Providing rights protection and management features on top of strong encryption protection.
*   Enhancing the ability of Microsoft 365 to meet the demands of customers with compliance requirements regarding encryption.

However, it's important to note that Customer Key comes with the responsibility of managing your own keys, including storing them securely and ensuring their proper destruction when no longer needed.

[![Diagram depicting the Microsoft Customer Key hierarchy.](../../m365/audit-encryption/media/customer-key-hierarchy.png)](../../m365/audit-encryption/media/customer-key-hierarchy.png#lightbox)

[](../../m365/audit-encryption/media/customer-key-hierarchy.png#lightbox)

## Availability key

For customers who use the Customer Key feature, Microsoft 365 provides data recovery capabilities using availability keys. The primary purpose of the availability key is to provide recovery capability from the unanticipated loss of customer-managed root keys, including key loss from mismanagement or malicious action. If customers lose control of their root keys, Microsoft Support can initiate recovery at the customer's request using the availability key.

The availability key is a root key provisioned and protected by Microsoft, which is functionally equivalent to the root keys supplied by the customer using the Customer Key feature. The availability key is automatically generated and provisioned when customers create a data encryption policy. By design, no one at Microsoft has access to the availability key: it's only accessible by Microsoft 365 service code. Microsoft 365 stores and protects the availability key, and unlike the keys that customers provide and manage in Azure Key Vault, customers can't directly access the availability key. Nevertheless, Microsoft provides customers with sole authority over the disablement or destruction of the availability key. Should the customer decide to exit the service, the availability key is purged as part of the data purge process.

In addition to data recovery, the availability key is sometimes used to maintain service availability in Exchange Online. Although service failures are rare, transient Microsoft Entra ID or network issues can threaten the availability of Exchange Online content. If Exchange Online can't reach the customer's root keys and we don't receive a response that indicates the customer has intended to block access to their root keys, the service falls back to the availability key to complete the operation. This rule only applies to Exchange Online. SharePoint Online and Microsoft Teams don't use the availability key unless the customer explicitly instructs Microsoft to initiate the recovery process.

Microsoft protects availability keys in access-controlled, internal secret stores, similar to the customer-facing Azure Key Vault. Access controls prevent unauthorized access to secret store contents. Secret Store operations, including key rotation and deletion, occur through automated commands that don't involve direct access to the availability key. Secret store management operations are limited to specific engineers and require privilege escalation through Lockbox. Privilege escalation requires manager approval and justification before access can be granted. Lockbox ensures access is time bound with automatic access revocation when the time period expires.

## Learn more

*   [Service encryption with Microsoft Purview Customer Key](/en-us/microsoft-365/compliance/customer-key-overview?azure-portal=true)
*   [Learn about the availability key for Customer Key](/en-us/microsoft-365/compliance/customer-key-availability-key-understand?azure-portal=true)
*   [Microsoft Product Terms](https://www.microsoft.com/licensing/product-licensing/products?azure-portal=true)
