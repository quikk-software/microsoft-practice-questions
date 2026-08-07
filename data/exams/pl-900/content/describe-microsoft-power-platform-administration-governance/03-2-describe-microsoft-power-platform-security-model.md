---
title: "Describe the Microsoft Power Platform security model"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-power-platform-administration-governance/2-describe-microsoft-power-platform-security-model"
uid: "learn.wwl.describe-microsoft-power-platform-administration-governance.describe-microsoft-power-platform-security-model"
module: "describe-microsoft-power-platform-administration-governance"
moduleTitle: "Describe Power Platform governance and administration"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe the Microsoft Power Platform security model

Security is a foundational requirement for any enterprise platform. Microsoft Power Platform includes a comprehensive, layered security model that protects your data and solutions at every level—from the identity of users accessing the system, to the specific records they can view in a Dataverse table, to the connectors their apps are allowed to use.

For Contoso, this means ensuring that only authorized users in each regional department can access their Dataverse data, that makers can't build flows that push manufacturing data to unauthorized external services, and that the Copilot Studio agents being built across the business operate under consistent governance policies.

## Authentication and identity management

The security model begins with authentication—verifying that a user is who they claim to be before granting access to any Power Platform resource.

Microsoft Entra ID, formerly Azure Active Directory, serves as the identity platform for Power Platform. It centralizes user identity management across Power Platform, Microsoft 365, Azure, and Dynamics 365 applications. Entra ID uses industry-standard protocols including OAuth 2.0 to verify credentials and issue secure, time-limited access tokens.

To strengthen authentication beyond a username and password, Power Platform supports **multifactor authentication (MFA)** through Entra ID. MFA requires users to verify their identity through a second factor—such as a mobile app notification, a phone call, or a biometric scan—in addition to their password. This significantly reduces the risk of unauthorized access even if a user's password is compromised.

Administrators can also configure **conditional access policies** in Entra ID that enforce additional rules based on context. For example, an organization might require MFA only when users sign in from outside the corporate network, or block access entirely from devices that are not enrolled in Microsoft Intune device management. This allows security policies to be precisely tailored to organizational risk tolerance.

## Role-based access control (RBAC)

Once a user is authenticated, **role-based access control (RBAC)** governs what that user is allowed to do within Power Platform and Dataverse. Security roles are collections of privileges that define which actions a user can perform and which data they can access.

RBAC operates at multiple levels within Power Platform:

*   **Environment-level access**: Determines which environments a user can see and work in. Users must have at least the Environment Maker role to create resources in an environment.
*   **App-level access**: Controls which specific apps, flows, or agents within an environment a user can run or edit.
*   **Record-level access**: In environments with Dataverse, provides granular control over which specific records a user can view, create, update, or delete, based on ownership, team membership, or hierarchical access rules.

Users can be assigned multiple security roles simultaneously, and their effective permissions are the union of all roles assigned to them. Organizations should follow the principle of **least privilege**—granting users only the permissions required for their job function—to reduce the risk of accidental or unauthorized data access or modification.

The following image shows an example of a security role used to manage user permissions to different elements in an environment.

[![Screenshot of a security role in Power Platform showing privilege settings across different entity types.](media/security-role.png)](media/security-role.png#lightbox)

## Data Loss Prevention (DLP) policies

**Data Loss Prevention (DLP) policies** are one of the most important governance controls available to Power Platform administrators. DLP policies control how data can flow between connectors within apps and flows, preventing sensitive business data from being shared with inappropriate external services.

Administrators categorize connectors into one of three groups when configuring a DLP policy:

*   **Business**: Connectors approved for use with sensitive business data. Examples include Microsoft Dataverse, SharePoint, Microsoft Teams, and SQL Server.
*   **Non-business**: Connectors that should not interact with sensitive business data. Examples include personal email services or social media platforms.
*   **Blocked**: Connectors that are completely prohibited from use in apps and flows within the policy scope.

A DLP policy prevents data from flowing between connectors in different groups. For example, if Dataverse is in the Business group and a consumer email service is in the Non-business group, a Power Automate flow that reads from Dataverse and sends email through that consumer service would be blocked by the policy.

DLP policies can be applied at two scopes:

*   **Tenant-level policies**: Apply across the entire organization and cannot be overridden by environment-level policies. Used for organization-wide baseline governance.
*   **Environment-level policies**: Apply only within a specific environment and can be used to customize connector access for specific teams or workloads.

For organizations that require stricter governance than the Business/Non-business grouping model provides, **Advanced Connector Policies (ACP)** offer a complementary default-deny approach. With ACP, all connectors are blocked unless explicitly permitted, and any new connectors added to the platform are automatically blocked. This inverted posture is designed for environments where unknown connectors must never be accessible, regardless of group assignment.

## Data encryption

All data stored in and transmitted through Power Platform is encrypted using industry-standard protocols:

*   **Encryption at rest**: Data stored in Dataverse, SharePoint, and other Power Platform storage systems is encrypted using AES 256-bit encryption. Encryption keys are managed by Microsoft by default, but organizations can optionally manage their own encryption keys for Dataverse through a feature called customer-managed keys.
*   **Encryption in transit**: Data transmitted between user devices, Power Platform services, and Microsoft data centers is protected using Transport Layer Security (TLS) 1.2 or higher. This ensures that data cannot be intercepted or tampered with as it travels across networks.

## Governance and the AI era

As organizations expand their use of Microsoft Copilot and AI agents built in Copilot Studio, governance must extend to cover AI-powered workloads. Power Platform administrators have comprehensive controls over Copilot feature availability across environments, including:

*   Policies that control which users and environments can access Copilot features in Power Apps, Power Automate, and Copilot Studio.
*   Data-driven insights into how Copilot features are being used, their return on investment, and compliance status.
*   The ability to govern which external AI models and connections agents can use, ensuring that sensitive data does not flow to unapproved AI services.

These controls ensure that the powerful capabilities of AI are available to makers while remaining within the security and compliance boundaries established by administrators.
