---
title: "Learn how data is encrypted in-transit"
url: "https://learn.microsoft.com/en-us/training/modules/audit-encryption/encryption-in-transit"
uid: "learn-m365.audit-encryption.encryption-in-transit"
module: "audit-encryption"
moduleTitle: "Understand Microsoft 365 encryption"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Learn how data is encrypted in-transit

In addition to safeguarding customer data-at-rest, Microsoft uses encryption technologies to protect customer data-in-transit. Data-in-transit scenarios include:

*   When a client machine communicates with a Microsoft server.
*   When a Microsoft server communicates with another Microsoft server.
*   When a Microsoft server communicates with a non-Microsoft server (for example, Exchange Online delivering email to a third-party email server).

Inter-datacenter communications between Microsoft servers take place using TLS or IPsec, and all customer-facing servers negotiate a secure session using TLS with client machines. For example, client connections to Exchange Online use TLS with AES and FIPS 140-2 compatible implementations. This applies to the web protocols used by all clients, including Outlook, Microsoft Teams, and Outlook on the web.

Microsoft owns and manages its own certificate authority to manage the certificates used for TLS encryption alongside third-party solutions. The public certificates are issued by Microsoft using SSLAdmin, an internal Microsoft tool to protect confidentiality of transmitted information. All certificates issued by Microsoft IT are signed using SHA-2 with RSA algorithm and use keys with a length of at least 2048 bits. Any certificates that fail to meet certificate provisioning criteria must be reviewed using a standardized exception process.

A list of approved cipher suites used by Microsoft is maintained by the Microsoft Security Response Center (MSRC), which is responsible for identifying and mitigating security vulnerabilities in Microsoft products and services. The MSRC evaluates the latest cryptographic algorithms and protocols to determine which ones are the most secure, and then updates the list accordingly.

Cipher suites are important as they determine the level of security provided by TLS encryption. By using a mix of strong encryption algorithms and regularly updating the list of supported cipher suites, Microsoft is able to provide a high level of security for data transmission.

Customers can validate all implementation details such as the version of TLS being used, whether Forward Secrecy (FS) is enabled, the order of cipher suites, etc., by going to Qualys SSL Labs and searching for the addresses of our public web portals.

## Learn more

*   [Encryption for Data-in-Transit](/en-us/microsoft-365/compliance/office-365-encryption-for-data-in-transit?azure-portal=true)
*   [Email encryption in Exchange Online](/en-us/microsoft-365/compliance/email-encryption?azure-portal=true)
*   [Technical reference details about encryption](/en-us/microsoft-365/compliance/technical-reference-details-about-encryption?azure-portal=true)
*   [Qualys SSL Labs](https://www.ssllabs.com/ssltest/?azure-portal=true)
