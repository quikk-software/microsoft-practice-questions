---
title: "Explore identity and authentication in Microsoft 365"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/5-explore-identity-authentication"
uid: "learn.wwl.explore-microsoft-365-security-foundations.explore-identity-authentication"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Explore identity and authentication in Microsoft 365

It’s critical that administrators understand the foundational concepts of identity, authentication, and single sign-on (SSO) in Microsoft 365. These core components form the backbone of how access is granted and secured across all Microsoft cloud services. Without a solid grasp of how users are identified and verified, organizations risk exposing sensitive data, mismanaging user access, and falling short of security and compliance requirements.

At their core, identity and authentication answer two essential questions:

*   **Identity**. _Who is this person, device, or service trying to access Microsoft 365?_
    
*   **Authentication**. _How do we prove they are who they say they are?_
    

Every interaction with Microsoft 365—whether accessing email, joining a Teams meeting, or opening a SharePoint document—starts with verifying the identity of the user or device. This process is handled by Microsoft Entra ID, which manages the digital identities of all users and ensures only trusted individuals and devices can access organizational resources.

![Diagram showing both allowed and denied access scenarios when a user, machine, or app attempts to access resources and their identity is authenticated.](../../wwl/explore-microsoft-365-security-foundations/media/identity-authentication.png)

Once users are authenticated, Microsoft 365 aims to make their experience as seamless and secure as possible. It’s at this point where single sign-on (SSO) plays a key role. SSO allows users to sign in once and access multiple Microsoft 365 services without having to re-enter their credentials each time. This feature not only improves user productivity and satisfaction but also reduces the attack surface for credential theft.

Whether you're working in a cloud-only or hybrid environment, understanding these building blocks is essential to effectively managing security and access in Microsoft 365.

### What is Identity in Microsoft 365?

In Microsoft 365, identity refers to the digital representation of a user, device, or service that needs to access Microsoft 365 apps and resources. The most common type of identity is a user identity, which is a unique account that represents a real person within your organization.

Each identity is created and managed through Microsoft Entra ID, which serves as the cloud-based identity and access management system for Microsoft 365. Every time someone signs in to check email, join a Teams meeting, or access files in SharePoint, Microsoft Entra ID verifies their identity to ensure they're the person they claim to be.

An identity typically includes:

*   A username (usually an email address like **jane.doe@contoso.com**)
*   A password or other sign-in method
*   Attributes, such as job title, department, or group memberships
*   Permissions that determine what they can access or do within Microsoft 365

Microsoft 365 identities can be:

*   **Cloud-only**. These identities are created and managed entirely within Microsoft Entra ID, with no dependency on on-premises infrastructure.
    
*   **Hybrid**. These identities originate from an on-premises Active Directory and are synchronized to Microsoft Entra ID using tools like Microsoft Entra Connect Sync or Microsoft Entra Connect Cloud Sync.
    

Important

Identities are the foundation for everything else in Microsoft 365 security. Once a user’s identity is authenticated (verified), Microsoft Entra ID determines what that user is authorized to do based on their roles, group memberships, and policies.

Understanding identity is the first step in understanding how Microsoft 365 controls access and keeps data secure. It ensures that only the right people, on the right devices, under the right conditions, are allowed to use the services your organization relies on.

### Authentication in Microsoft 365

Authentication is the process of verifying a user’s identity before granting access to Microsoft 365 services. Microsoft Entra ID, which handles authentication in Microsoft 365, supports a range of secure sign-in methods that go beyond traditional passwords.

##### Passwordless and secure sign-In methods

While passwords are still supported, organizations are increasingly adopting stronger, phishing-resistant authentication options that provide better security and user experience:

*   **Microsoft Authenticator**. Microsoft Authenticator is a mobile app that supports two-factor authentication (2FA) through time-based one-time passcodes (TOTP) or push notifications. It also supports passwordless sign-in, allowing users to approve sign-ins using a biometric (like fingerprint or facial scan) or a device PIN. For example, after a user enters their username in Microsoft 365, they receive a push notification on their phone. They approve the request and verify using their fingerprint. No password is entered.
    
*   **FIDO2 security keys**. FIDO2 security keys are physical devices (like USB or NFC tokens) used for passwordless authentication. They use public-key cryptography to securely prove a user's identity without transmitting a password. For instance, consider the scenario where a user signs into Microsoft 365 on a public kiosk. Instead of typing a password, they insert their FIDO2 USB key into the computer and tap the button on the key to authenticate. No password is entered, and no credentials are exposed to the web browser.
    
*   **Windows Hello biometrics**. Windows Hello allows users to sign in using facial recognition, fingerprint scanning, or a secure PIN tied to the device. It offers multifactor authentication by combining something the user **has** (the device) with something the user **is** (biometric data). For example, a user logs into Microsoft Teams on a corporate laptop using facial recognition through the built-in webcam, with no password required.
    
*   **Certificate-based authentication (CBA)**. CBA uses digital certificates stored on smart cards or devices to confirm identity. Authentication is completed by verifying possession of the certificate's private key, often paired with a PIN entry. For example, consider the scenario where a government employee accesses a secure Microsoft 365 portal by inserting a smart card into a reader. The system reads the certificate on the card and prompts for a PIN to verify the user, completing the authentication process securely without using a password.
    

##### Enhanced authentication features in Microsoft Entra ID

Beyond the sign-in methods themselves, Microsoft 365 offers powerful security features that enhance identity protection:

*   **Multifactor Authentication (MFA)**. MFA requires users to provide two or more forms of verification before granting access. Doing so drastically reduces the risk of account compromise, even if a password is stolen. MFA can be enforced through various combinations, such as a password plus an Authenticator push notification, or a biometric scan followed by a security prompt. For example, a user accessing sensitive company files from a new device is prompted to verify their identity with Microsoft Authenticator in addition to entering their password.
    
    ![Diagram showing the different verification methods used in MFA.](../../wwl/explore-microsoft-365-security-foundations/media/multifactor-authentication.png)
    
*   **Self-Service Password Reset (SSPR)**. SSPR allows users to securely reset their own passwords without contacting the helpdesk. Doing so saves time and reduces support costs. SSPR requires users to register one or more authentication methods, such as a phone number or the Authenticator app, and verifies their identity before allowing a reset. For example, an employee forgets their password. Instead of waiting for IT, they reset it by confirming a code sent to their registered mobile number.
    
*   **Microsoft Entra Identity Protection.** Identity Protection uses machine learning to detect risky sign-ins and user behavior, such as sign-ins from unfamiliar locations or devices. Based on the level of risk, the system can require extra verification steps, block access, or flag the activity for review. For instance, a sign-in attempt from an unusual location triggers Identity Protection, which blocks the attempt and alerts the user and IT administrator.
    

##### Enforce authentication policies within Microsoft Entra ID

Organizations can customize and enforce authentication policies within Microsoft Entra ID to meet their security requirements. Administrators can:

*   Require MFA for all users or only for high-risk scenarios.
*   Specify approved sign-in methods, such as disallow passwords and require passwordless sign-in.
*   Block outdated or insecure sign-in protocols, such as legacy authentication.
*   Monitor authentication activity for risk and compliance.

##### Authentication methods in hybrid environments

In organizations with a hybrid identity setup—where user accounts originate in on-premises Active Directory and are synchronized to Microsoft Entra ID—Microsoft offers the following authentication methods to validate users in the cloud:

*   **Password hash synchronization (PHS)**. With PHS, the user’s password hash (a cryptographic representation of the password, not the password itself) is securely synced from on-premises Active Directory to Microsoft Entra ID. When users sign in to Microsoft 365, their credentials are validated in the cloud, without needing to contact the on-premises environment. For example, a user signs into Outlook on the web using their usual corporate credentials. Microsoft Entra ID verifies the credentials against the stored password hash and grants access. In this process, no on-premises server is involved during sign-in. PHS is simple to set up, highly resilient, and supports modern cloud-only features like Identity Protection and smart lockout. It's the most commonly recommended authentication method for hybrid deployments, unless there's a specific need for real-time credential validation.
    
*   **Pass-through authentication (PTA)**. PTA allows Microsoft Entra ID to validate user passwords directly against on-premises Active Directory through a secure authentication agent. On-premises passwords are never stored in the cloud in any form. When a user signs in to Microsoft 365, Microsoft Entra ID places an encrypted authentication request in a secure queue. An on-premises agent retrieves the request, validates the credentials against Active Directory in real time, and returns the result to Entra ID. PTA is ideal for organizations that must authenticate users against their on-premises directory or that have compliance requirements prohibiting password hashes from being stored in the cloud.
    
*   **Federation authentication**. Federation authentication allows organizations to delegate authentication to an external identity provider, such as Active Directory Federation Services (AD FS), instead of having Microsoft Entra ID handle the sign-in directly. In this setup, when a user tries to sign into Microsoft 365, they’re redirected to the on-premises federation server, which authenticates the user and issues a token that Microsoft Entra ID trusts. For example, a user signs into Microsoft 365 and is redirected to their company’s AD FS sign-in page. They enter their credentials there, and once authenticated, they’re redirected back to Microsoft 365 with a token that grants access. Federation is typically used in highly regulated environments that require tight control over the entire authentication process, including features like custom sign-in pages or advanced policies. However, it requires more infrastructure to maintain, and Microsoft now recommends PHS or PTA for most organizations because they’re simpler, more resilient, and better integrated with cloud-only security features like Conditional Access and Identity Protection.
    

Both PHS and PTA are configured through Microsoft Entra Connect Sync or Microsoft Entra Cloud Sync, which also handle identity synchronization between on-premises and cloud directories.

### Single sign-on in Microsoft 365

Single sign-on (SSO) allows users to sign in once and gain access to all Microsoft 365 services and approved non-Microsoft apps without having to re-enter their credentials. It plays a crucial role in improving both security and user experience.

With SSO enabled, users authenticate to Microsoft Entra ID (the identity provider), which then issues a token that can be reused across sessions and services. Once users sign in, they can access services like Outlook, SharePoint, Teams, OneDrive, Yammer, and even non-Microsoft apps like Salesforce, Adobe, or ServiceNow without being prompted to sign in again, until their session expires or risk levels change.

Behind the scenes, Microsoft Entra ID uses secure sign-in methods (known as protocols) that allow users to authenticate once and then access multiple apps without re-entering their password. These methods safely pass along proof of the user's identity between services, ensuring secure access without needing to sign in again each time. These sign-ins use something called tokens, which are like temporary digital passes that prove who the user is. The tokens only last for a short time, which helps keep things secure, and the apps check these tokens to confirm the user's identity without asking them to sign in again.

##### Implement single sign-on

SSO can be implemented in both cloud-only and hybrid environments:

*   **Cloud-only setup**. In a cloud-only setup, all user identities are created and managed directly in Microsoft Entra ID, without any connection to an on-premises Active Directory. Authentication and token issuance happen entirely in the cloud, which simplifies the overall environment by removing the need to maintain local infrastructure. This setup is ideal for organizations that are fully cloud-native or have no dependency on legacy systems. It also reduces operational complexity and enables faster deployment of services. With cloud-only SSO, users can sign in once using their Microsoft 365 credentials and access services like Outlook, SharePoint, and Teams without being prompted again. This approach is common among small to mid-sized businesses, startups, and organizations adopting a cloud-first IT strategy.
    
*   **Hybrid setup**. Companies often maintain a hybrid environment because they have existing on-premises systems or applications that can’t easily move to the cloud, or due to regulatory, security, or operational requirements. A hybrid setup lets them take advantage of Microsoft 365 cloud services while still using their on-premises Active Directory infrastructure. This setup allows organizations to manage users and resources both locally and in the cloud, enabling smooth integration and consistent identity management across both environments. In a hybrid setup, organizations synchronize identities from their on-premises Active Directory to Microsoft Entra ID in the cloud using tools like Microsoft Entra Connect Sync or Microsoft Entra Cloud Sync. This synchronization allows seamless single sign-on, so when users sign in to their domain-joined workstations, they’re automatically authenticated to cloud services without needing to enter their credentials again.
    

##### SSO and device-based access

SSO also works well with device-based access. For instance, in a company using Microsoft Intune for device management, SSO extensions can be configured for mobile platforms. On iOS or macOS, for example, users can automatically sign into enterprise apps using their Microsoft 365 account, and no other prompts are required. On Windows devices joined to Microsoft Entra ID or hybrid-joined to on-premises Active Directory, SSO is enabled by default through Windows Integrated Authentication.

Consider the scenario in which Jane signs into her Microsoft Entra ID–joined laptop using Windows Hello. This single action authenticates her session. When she opens Outlook, Teams, or OneDrive, she isn’t asked to sign in again. If Jane switches to using her phone, the Microsoft Authenticator app uses the same token-based SSO mechanism to sign her into Teams without a password.

The key benefit of SSO isn’t just user convenience, but also a significant reduction in password-related issues. Since users authenticate less frequently and aren’t prompted to re-enter passwords for each app, they're less likely to reuse weak passwords or fall for phishing attempts. When SSO is combined with Conditional Access and MFA, it provides a secure and seamless identity experience across environments.
