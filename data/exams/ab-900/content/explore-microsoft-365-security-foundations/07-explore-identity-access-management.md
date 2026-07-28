---
title: "Explore identity and access management in Microsoft Entra"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/7-explore-identity-access-management"
uid: "learn.wwl.explore-microsoft-365-security-foundations.explore-identity-access-management"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Explore identity and access management in Microsoft Entra

This unit introduces the identity and access management capabilities of Microsoft Entra, with a focus on Conditional Access, Identity Secure Score, and Privileged Identity Management (PIM). These tools form the backbone of the Microsoft 365 Zero Trust security model, enabling organizations to enforce secure, adaptive access policies based on user identity, device state, risk levels, and session context.

### Microsoft Entra features and capabilities

Microsoft Entra is a suite of identity and access management (IAM) solutions that help organizations securely manage users, devices, and permissions across Microsoft 365, Azure, and non-Microsoft applications. It includes a growing set of tools and services:

*   **Microsoft Entra ID**. A comprehensive identity platform that enables secure user authentication, single sign-on (SSO), group and role management, and integration with thousands of applications. It serves as the central directory for managing both internal and external user access across the enterprise.
    
*   **Conditional Access**. Enables dynamic, risk-based access control policies that enforce security requirements like multifactor authentication (MFA), device compliance, or geographic restrictions. Conditional Access is at the heart of the Zero Trust model and allows organizations to tailor access decisions in real-time based on identity, risk, and context.
    
*   **Identity Secure Score**. A built-in security analytics tool that measures and tracks an organization’s identity security posture within Microsoft Entra ID. It provides prioritized recommendations and improvement actions that help reduce exposure to identity-based threats. It also allows admins to benchmark against similar organizations.
    
*   **Privileged Identity Management (PIM)**. A feature that provides just-in-time privileged access to administrative roles in Microsoft Entra ID and Azure. PIM includes approval workflows, time-bound access, access reviews, and detailed audit logs, all of which reduce the risk of privilege misuse or compromise.
    
*   **Microsoft Entra ID Governance**. Provides automated tools to manage the user identity lifecycle, ensure appropriate access through entitlement management, and perform access reviews. It helps reduce insider risk and ensure users don’t accumulate excessive or outdated privileges.
    
*   **Microsoft Entra ID Protection**. Uses machine learning and real-time telemetry from Microsoft’s security graph to identify identity-based risks such as compromised accounts, risky sign-ins, or unusual user behavior. Based on detected risk levels, automated remediation actions like MFA or access blocking can be triggered.
    
*   **Microsoft Entra Verified ID**. Enables decentralized identity solutions by allowing organizations to issue, present, and verify digital credentials. Doing so reduces reliance on traditional identity systems and enhances privacy and control for users during identity verification processes.
    
*   **Microsoft Entra Permissions Management**. Helps organizations manage who has access to what in their cloud environments, including Azure, Amazon Web Services (AWS), and Google Cloud. It gives security teams visibility into all user and app permissions, helps identify over-permissioned accounts, and makes it easier to adjust access levels to follow least privilege principles.
    
*   **Microsoft Entra Internet Access and Entra Private Access**. These services are modern, cloud-based alternatives to traditional VPNs and proxies. They securely connect users to both SaaS and private applications using Zero Trust principles, providing granular access control and policy enforcement based on user identity and device health.
    

These services are designed to enforce least privilege, reduce attack surfaces, and secure access from any device, location, or network.

While Conditional Access, Identity Secure Score, and Privileged Identity Management (PIM) are core components of Microsoft Entra ID, they’re explored in greater depth in the following sections due to their critical role in enforcing secure access, measuring identity risk, and managing privileged roles within a Zero Trust security model.

### Conditional Access policies

Conditional Access is a dynamic policy engine built into Microsoft Entra that evaluates signals in real time to decide whether to grant or restrict user access. Conditional Access policies are a cornerstone of Microsoft’s Zero Trust model. They enable access decisions based on a user's context, behavior, and device state rather than relying solely on credentials.

Conditional Access policies utilize the following real-time signals:

*   **User and sign-in risk**. Based on behavioral analysis and identity threat intelligence from Microsoft, users might be assigned a risk level (low, medium, high) depending on sign-in patterns, detected threats, or known compromise. Policies can then be triggered to enforce more protections or block access.
    
*   **Device state**. Conditional Access evaluates whether a device is compliant with organizational policies, such as up-to-date antivirus, encryption enabled, or managed through Microsoft Intune. This signal allows organizations to restrict access from personal or nonsecure devices.
    
*   **Application sensitivity**. Organizations can apply stricter policies when accessing high-value or sensitive apps (like financial systems), and lighter controls for low-risk services. Doing so ensures security is proportionate to the resource’s sensitivity.
    
*   **Location and IP address**. Conditional Access policies can restrict access based on geographic regions or specific IP ranges. For example, access can be denied from high-risk locations or allowed only from known corporate networks.
    
*   **Session context and behavior**. With integration into Microsoft Defender for Cloud Apps, Conditional Access policies can apply real-time session controls that restrict actions. For example, downloading files or copying data can be restricted when accessed from unmanaged devices or risky sessions.
    

##### Examples of commonly used Conditional Access policies

The section describes some common examples of Conditional Access policies that organizations implement to enforce secure access controls while maintaining user productivity. Each policy addresses a specific risk scenario and demonstrates how Conditional Access can be tailored to different security requirements.

*   **Require MFA for external access**. Enforces multifactor authentication for users accessing Microsoft 365 from outside the corporate network. This policy adds a strong layer of protection against password compromise.
    
*   **Block access from unmanaged devices**. Denies access to services like SharePoint and OneDrive unless the device is registered with Intune and meets compliance requirements. This policy prevents data exfiltration from personal or non-secure devices.
    
*   **Require sign-in risk mitigation for high-risk users**. Automatically trigger a Conditional Access policy that blocks access or enforces MFA when a user is flagged as high-risk by Microsoft Entra ID Protection. This policy helps prevent potentially compromised accounts from accessing corporate resources until the risk is resolved or user identity is verified.
    
*   **Enforce Terms of Use acceptance before access**. Require users to review and accept a "Terms of Use" agreement before accessing specific applications or services. This policy ensures that users acknowledge acceptable use policies, privacy expectations, or compliance requirements before interacting with sensitive systems.
    
*   **Restrict access to specific applications for guest users**. Limit external B2B collaborators or guest users to only the applications they need, such as Microsoft Teams or a specific SharePoint site. All other access attempts are blocked, reducing the exposure of internal systems and enforcing least privilege for external identities.
    
*   **Block legacy authentication**. Prevents access from clients using outdated protocols (such as POP3, IMAP, and SMTP) that don’t support modern authentication or MFA. This policy reduces attack vectors commonly exploited by brute force and password spray attacks.
    
*   **Apply session controls with Microsoft Defender for Cloud Apps**. Implements granular controls such as monitoring user activity, blocking file downloads, or watermarking documents in the browser session. This policy is useful when users access corporate apps through unmanaged endpoints.
    

##### Example scenario

An organization uses Conditional Access to secure its Windows 365 Cloud PC infrastructure. Policies require that users:

*   Complete MFA for every sign-in
*   Use a compliant, Intune-managed device
*   Are located within approved geographic regions
*   Have a low user risk score

To ensure a smooth rollout, IT administrators simulate the impact of each policy using the “What If” tool in the Microsoft Entra admin center. This tool helps validate logic and avoid misconfigurations that could disrupt access for legitimate users.

### Identity Secure Score in Microsoft Entra ID

The Identity Secure Score is a dashboard-based metric that provides a snapshot of an organization’s identity security posture in Microsoft Entra ID. It helps security teams track progress, prioritize actions, and make data-driven decisions to reduce identity-related risk.

Components of Identity Secure Score include:

*   **Security recommendations**. These recommendations are curated suggestions from Microsoft designed to improve your organization’s identity security. Recommendations range from enforcing MFA to removing stale accounts, blocking legacy protocols, and configuring Conditional Access policies. Each recommendation is prioritized based on its impact on reducing identity-related risks and contributes a specific number of points to your Secure Score upon completion. They're continuously updated as Microsoft’s threat intelligence evolves.
    
*   **Improvement actions**. Improvement actions are actionable tasks tied to the security recommendations. They often include step-by-step guidance, links to relevant Microsoft documentation, and configuration options in the Microsoft Entra admin center. For example, an improvement action might guide an admin through enabling MFA for all users or reviewing and removing unused guest accounts. These tasks provide a practical roadmap for administrators to follow and implement best practices directly within their tenant.
    
*   **Action status options**. Not every recommendation might be immediately applicable, so Microsoft allows administrators to assign a status to each action. These statuses include:
    
    *   **Completed**. The action has been implemented and is enforced.
    *   **Planned**. The organization intends to implement the action in the future.
    *   **Resolved via Third Party**. The risk is mitigated through non-Microsoft security tools or solutions, such as a non-Microsoft MFA provider.
    *   **Risk Accepted**. The organization chooses not to implement the recommendation, acknowledging the associated risk for business or technical reasons. This flexibility supports diverse IT environments while preserving visibility into unaddressed risks.
*   **Benchmarking tools**. The Secure Score dashboard includes visual benchmarking tools that allow organizations to compare their current security posture against similar organizations by industry, region, or size. This comparative insight helps IT and security leaders understand where they stand relative to peers and identify areas for competitive or regulatory improvement. Benchmarking data can also be used to justify security investments or report progress to executive stakeholders.
    

##### Example scenario

A company reviews its Identity Secure Score and notices the following issues:

*   Only 30% of users are registered for MFA.
*   Over 100 inactive user accounts haven’t been removed in over a year.
*   Legacy authentication protocols are still allowed.

The IT team takes the following actions:

1.  Rolls out MFA to all users through a conditional access policy and user onboarding campaigns.
2.  Disables or removes unused service accounts after verifying dependencies.
3.  Blocks legacy authentication using a conditional access policy.

These changes lead to a 40-point increase in the organization’s Secure Score. Management uses the dashboard’s trend graph to show measurable improvement to executive leadership and auditors.

### Privileged Identity Management (PIM)

Privileged Identity Management (PIM) in Microsoft Entra enables just-in-time access to sensitive roles and resources. This feature helps organizations reduce the security risks associated with standing administrative access. Instead of assigning permanent admin rights, PIM allows users to activate roles temporarily, with optional approval, MFA, and a justification requirement.

This approach reduces the attack surface by limiting the time and scope of elevated access. Elevated access refers to permissions or roles that allow a user to perform administrative or high-impact actions within an IT system or environment. These permissions go beyond what a standard user typically needs for day-to-day tasks.

For example, an Exchange Administrator might elevate their access to the Global Administrator role only when performing critical tasks. The Global Admin role then automatically deactivates after a set duration. PIM also supports access reviews and audit logs to ensure accountability and compliance.

Core capabilities of PIM include:

*   **Time-bound role activation**. Instead of granting users permanent admin rights, PIM allows roles to be activated only for a specified period; that is, just long enough to complete a task. For example, a security engineer might request the Security Administrator role for two hours to modify alert rules in Microsoft Defender. Once the time limit expires, the role is automatically revoked. This process reduces the window of opportunity for attackers and limits accidental misuse of privileges by users.
    
*   **MFA and justification requirements**. When users request to activate a privileged role, PIM can require them to complete multifactor authentication and provide a business justification. This added friction ensures that only legitimate users activate sensitive roles and that there’s a clear, auditable reason for each request. For instance, a user activating the Exchange Administrator role might need to explain why they’re performing an action like mailbox delegation or retention policy modification.
    
*   **Approval workflow integration**. PIM supports customizable approval workflows that require users to obtain approval before a role is activated. Approvers can be team leads, managers, or specific individuals defined in the role settings. For example, a cloud engineer might need to request the Contributor role on an Azure subscription, which is routed to their team lead for approval before being granted. This workflow ensures oversight and enforces accountability for privileged access.
    
*   **Access reviews and expiration policies**. PIM enables scheduled or ad-hoc access reviews for all eligible or active role assignments, ensuring that users retain only the permissions they actually need. Reviewers, who are typically managers or security personnel, can approve, deny, or remove access based on usage history and business context. Additionally, PIM can enforce expiration dates for role assignments, requiring re-approval after a defined period, such as 30 days. This process helps prevent privilege creep, where users accumulate unnecessary roles over time.
    
*   **Audit logging and alerting**. All role activations, approval requests, and administrative actions are recorded in audit logs that are accessible through the Microsoft Entra admin center and Microsoft Sentinel. These logs can be used during security investigations, compliance audits, or forensic analysis. Alerts can also be configured for sensitive events, such as activation of highly privileged roles (for example, Global Administrator), providing real-time visibility and the ability to respond to anomalous behavior immediately.
    

##### Example scenario

A multinational technology company uses Privileged Identity Management (PIM) to secure administrative access across its Microsoft 365 and Azure environments. One of their IT security policies mandates that all elevated access must follow the principle of least privilege and be time-bound, auditable, and approved.

One of the company’s senior cloud engineers is responsible for managing critical Azure infrastructure, including virtual networks, firewalls, and load balancers. On a normal day, this user only has basic read-only access to monitor resources. However, during a planned network migration, the engineer needs temporary elevated access to modify virtual network settings in the production environment.

The organization took the following actions using PIM to address this issue:

1.  **Role eligibility**. The engineer was preassigned as eligible for the Network Contributor role in Azure.
    
2.  **Role activation**. Before the engineer starts the migration, they sign into the Microsoft Entra admin portal and request activation of the Network Contributor role for a duration of fours hours. PIM prompts for:
    
    *   Multifactor authentication
    *   A business justification. The engineer responds with "Updating virtual network peering configuration for data center migration."
3.  **Approval workflow**. The request is routed to the engineer's team lead for approval. The team lead receives an automated email and approves the activation through the PIM interface.
    
4.  **Access window**. Once approved, the engineer receives access immediately and performs the necessary configuration changes. The access is automatically revoked after four hours. No manual action is needed.
    
5.  **Auditing and review**. The action is logged in PIM's audit trail. During the company’s quarterly access review, the security team examines activation logs and confirms the role was only used during the approved window with a valid justification.
    

As a result of implementing PIM, the engineer successfully completed the migration without being granted standing privileges. The organization maintained tight control over access to production environments. And PIM’s auditable logs support compliance with ISO 27001 and internal governance policies.
