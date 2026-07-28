---
title: "Establish security, identity, and compliance foundations"
url: "https://learn.microsoft.com/en-us/training/modules/introduction-microsoft-365-core-services-admin-control/5-establish-security-foundations"
uid: "learn.wwl.introduction-microsoft-365-core-services-admin-controls.establish-security-foundations"
module: "introduction-microsoft-365-core-services-admin-control"
moduleTitle: "Introduction to Microsoft 365 core services and admin controls"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Establish security, identity, and compliance foundations

Securing Microsoft 365 environments begins with establishing strong identity controls, access policies, and compliance configurations. These foundational elements ensure that users, devices, and data are protected against unauthorized access and misuse. Microsoft 365 provides a robust set of tools that enable administrators to define and enforce security and compliance policies across Exchange Online, SharePoint Online, and Microsoft Teams. The primary tools that Microsoft 365 admins use to configure baseline policies for device access, conditional access, and content protection include Microsoft Entra, Microsoft Purview, and Microsoft Intune.

This unit explores the importance of configuring baseline policies for device access, conditional access, and content protection. It examines how admins can apply these controls using the Microsoft 365 admin center and PowerShell, and how to integrate them with automation and reporting tools to maintain visibility and control.

### Device access policies

Controlling which devices can access Microsoft 365 services is a foundational step in securing your environment. Device access policies ensure that only trusted, compliant devices that meet your organization’s security standards can connect to services like Exchange Online, SharePoint Online, and Teams. These policies are typically enforced using Microsoft Intune, which integrates with Microsoft Entra ID to evaluate device health and compliance status in real time.

Administrators begin by defining device compliance policies in Intune. These policies can include requirements such as encryption, antivirus protection, minimum OS versions, and password complexity. Devices that meet these criteria are marked as compliant and can be granted access through conditional access policies. For unmanaged or bring-your-own-device (BYOD) scenarios, app protection policies can be applied to restrict access to corporate data within apps like Outlook or Teams, without requiring full device enrollment.

Key configuration areas include:

*   **Device compliance policies**. Device compliance policies are the cornerstone of secure access management in Microsoft 365. These policies are configured in Microsoft Intune and define the minimum security standards a device must meet to be considered trustworthy. Common requirements include encryption (for example, BitLocker for Windows), antivirus protection, firewall status, minimum OS version, and password complexity. These settings ensure that only devices with a secure posture can access corporate resources, reducing the risk of data breaches from compromised or outdated endpoints.  
      
    Once a device meets all the defined criteria, it's marked as "compliant" in Intune. This compliance status can then be used as a condition in Microsoft Entra ID conditional access policies. For example, an organization might require that all Windows 11 laptops accessing SharePoint Online have BitLocker enabled and Defender Antivirus running. If a user attempts to access SharePoint from a device that lacks encryption or is running an outdated OS, the device is flagged as noncompliant, and access is denied until the issues are resolved. This layered approach ensures that device health is continuously monitored and enforced.
    
*   **Conditional access policies based on device state**. Conditional access policies allow administrators to enforce access controls based on the state of the device attempting to connect. These policies are configured in Microsoft Entra ID and can evaluate whether a device is compliant, hybrid Azure AD joined, or managed by Intune. They also enable organizations to implement zero-trust principles by ensuring that access is granted only to devices that meet specific security requirements.  
      
    For instance, an admin might configure a policy that blocks access to Teams and Exchange Online unless the device is both compliant and hybrid Azure AD joined. Doing so ensures that only corporate-managed devices with verified identities can access sensitive communication and collaboration tools. In another scenario, access might be allowed from personal devices but restricted to browser-only sessions with limited functionality. These configurations provide flexibility while maintaining strict control over data access.
    
*   **App protection policies**. App protection policies are designed to secure corporate data within applications, especially on unmanaged or bring-your-own devices (BYOD). Unlike device compliance policies, app protection policies operate at the app level and don’t require full device enrollment.  
      
    For example, an administrator might apply an app protection policy to Outlook and Teams on iOS and Android devices. The policy could prevent users from copying content from corporate emails into personal apps and block access to Teams if the device is jailbroken. Such a policy allows users to access Microsoft 365 apps securely on personal devices without compromising corporate data. App protection policies are especially useful in organizations with flexible device policies or remote workforces. They can restrict actions such as copy and paste, saving data locally, or accessing data from rooted devices or jailbroken devices.
    
    *   **Rooted devices.** A rooted device is a smartphone or tablet that was modified to gain privileged control—known as "root access"—over the operating system. Rooting allows users to bypass manufacturer and carrier restrictions, enabling them to alter system files, install unauthorized apps, and customize the device beyond standard limitations. While rooting can offer more flexibility and control for personal use, it also disables many of the built-in security features that protect the device and its data.
        
    *   **Jailbroken devices**. A jailbroken device is a smartphone or tablet that was modified to remove manufacturer-imposed restrictions. Jailbreaking allows users to gain root access to the operating system, enabling them to install unauthorized apps, customize system behavior, and bypass security controls that the device's operating system normally enforces.
        

### Conditional access policies

Conditional access (CA) is a dynamic access control engine built into Microsoft Entra ID. It evaluates signals such as user identity, device compliance, location, and risk level to determine whether access should be granted, blocked, or limited. CA policies are essential for enforcing multifactor authentication (MFA), restricting access from risky locations, and applying session controls to sensitive applications.

Administrators configure CA policies by targeting specific users or groups, selecting cloud apps (for example, Exchange Online or Teams), and defining conditions like sign-in risk or device platform. Actions can include requiring MFA, blocking access, or applying session controls through Microsoft Defender for Cloud Apps. These controls can limit actions such as downloading files or copying data from Teams or SharePoint.

Key configuration areas include:

*   **User and group targeting**. User and group targeting in conditional access policies allows administrators to apply different levels of access control based on roles, departments, or risk profiles. This granularity is essential for tailoring security policies to the needs of different user groups. For example, executives or finance personnel might require stricter access controls than general staff due to the sensitivity of the data they handle.  
      
    An administrator might create a policy that requires multifactor authentication (MFA) for all members of the Finance group when accessing Exchange Online. Another policy could block access to SharePoint for guest users unless they’re accessing from a compliant device. These targeted policies ensure that sensitive data is protected while allowing flexibility for collaboration. By segmenting users based on risk and role, organizations can implement more effective and efficient security controls.
    
*   **Sign-in risk evaluation**. Sign-in risk evaluation is a dynamic feature of Microsoft Entra ID that assesses the risk level of each sign-in attempt. It uses signals from Microsoft Defender for Identity and other sources to detect anomalies such as unfamiliar locations, impossible travel, leaked credentials, and malware indicators. Based on the assessed risk level, conditional access policies can enforce actions such as requiring MFA, blocking access, or prompting a password reset.  
      
    For example, if a user attempts to sign in from an IP address in a country/region they never visited, the system might flag the sign-in as high risk. A conditional access policy could then block access to all Microsoft 365 services and require the user to verify their identity and reset their password. This proactive approach helps prevent unauthorized access and protects against account compromise. Sign-in risk evaluation is a key component of a modern zero-trust security model.
    
*   **Session controls**. Session controls provide administrators with the ability to limit user actions during an active session, even after access is granted. These controls are enforced through Microsoft Defender for Cloud Apps and can restrict activities such as downloading files, copying data, or printing documents. Session controls are particularly useful in high-risk scenarios or when users are accessing resources from unmanaged devices.  
      
    For instance, an organization might allow browser-based access to SharePoint Online from unmanaged devices but apply session controls that prevent downloading or printing documents. This workflow enables users to view content securely without risking data leakage. Another example could involve restricting clipboard access in Teams to prevent sensitive information from being copied into personal apps. Session controls add an extra layer of protection and help enforce data governance policies in real time.
    

### Content protection policies

Content protection offers a unified approach to securing data across services like Exchange, SharePoint, and Teams. Through classification, labeling, and policy enforcement, organizations can safeguard information from unauthorized access and accidental sharing.

Users can manually apply protection mechanisms, or they can be automatically applied through content inspection. Inspection can detect sensitive data types such as personal identifiers, financial records, or health information. These automated safeguards help ensure consistent compliance with internal policies and external regulations.

Sensitivity labels, Data Loss Prevention (DLP) policies, and retention policies work together to enforce protection, monitor data flows, and manage content lifecycle. The following sections explore how each of these tools contributes to a secure and well-governed Microsoft 365 environment.

*   **Sensitivity labels**. Sensitivity labels are a core feature of Microsoft Purview Information Protection. They allow organizations to classify and protect data across Microsoft 365 services. Labels can apply encryption, restrict access to specific groups, and add visual markings such as headers, footers, and watermarks. Users can manually apply labels, or they can be automatically applied based on content inspection using predefined rules and conditions.  
      
    For example, an administrator might create a sensitivity label called "Confidential – Legal" that encrypts documents and restricts document access to members of the Legal department. When a user applies this label to a Word document, the file is automatically encrypted, and only members of the Legal group can open it. The label also adds a watermark and header to indicate the sensitivity level. This process ensures that sensitive legal documents are protected both at rest and in transit.
    
*   **Data loss prevention (DLP)**. DLP policies monitor and control the sharing of sensitive information. They use content inspection to detect data types such as credit card numbers, health records, or government identification. DLP policies can block actions, notify users, or generate alerts for administrators. These policies are enforced across Microsoft 365 services, including Outlook, SharePoint, and Teams.  
      
    For instance, a DLP policy might be configured to detect and block emails containing Social Security numbers sent to external recipients. When a user tries to send such an email from Outlook, the message is blocked, and the user receives a notification explaining the policy violation. The incident is also logged in the Microsoft Purview portal for further review. DLP policies help ensure users comply with their organization's security standards. They also help prevent accidental or malicious data leaks.
    
*   **Retention policies**. Retention policies help organizations manage the lifecycle of their data by ensuring that content is preserved or deleted according to business and regulatory requirements. These policies can be applied to emails, documents, Teams messages, and more. Retention policies support legal compliance, reduce storage costs, and improve data governance.  
      
    For example, an organization might apply a retention policy to the HR department’s SharePoint site, preserving all documents for seven years. After the retention period, documents are automatically deleted unless placed on legal hold. This process helps the organization comply with labor regulations and manage storage efficiently. Retention policies can also be configured to retain content indefinitely or delete it after a specific period, depending on the organization's needs.
    

### Policy deployment and monitoring

Deploying security and compliance policies is only the beginning. Ongoing monitoring and auditing are essential to ensure policies are effective and to detect potential misconfigurations or violations. Microsoft 365 provides several tools that provide this visibility, including:

*   **Microsoft Purview portal**. Offers insights into DLP alerts, audit logs, and policy matches. Admins can investigate incidents, view user activity, and generate reports for compliance audits.
*   **Microsoft Entra admin center**. Provides detailed logs of conditional access sign-ins, showing which policies were applied and whether access was granted or blocked.
*   **Intune reporting dashboards**. Show device compliance status, app protection enforcement, and trends over time.

For example, an admin reviews DLP alerts in the Microsoft Purview portal and finds repeated attempts to share HR documents containing sensitive employee data through Microsoft Teams. The audit logs show that these attempts came from unmanaged devices, prompting the admin to tighten conditional access policies. Proactive monitoring such as this helps maintain a secure and compliant environment.

### Implementation best practices

Implementing security and compliance policies requires careful planning and testing. The following best practices can help ensure a successful and secure implementation of your security, identity, and compliance policies:

*   **Start with a pilot group to validate policies before rolling them out organization-wide.** Testing security and compliance policy configurations in a controlled environment is best done with a small, representative pilot group. This group can help identify unintended consequences, such as overly restrictive access or false positives in data loss prevention (DLP) rules. For example, if you're deploying conditional access policies, a pilot group might reveal that certain users are being blocked due to outdated device configurations. Feedback from the pilot helps refine policies before full deployment, reducing disruption and improving user acceptance.
    
*   **Use built-in templates for DLP and conditional access to accelerate deployment and reduce complexity.** Microsoft 365 and other platforms offer preconfigured templates for common scenarios like protecting financial data, enforcing multifactor authentication, or restricting access based on location. These templates simplify setup by providing tested configurations that align with industry standards. For instance, using the "Protect sensitive information" DLP template can automatically detect and block sharing of credit card numbers or social security numbers. Using templates in this manner saves time and ensures consistency across your environment.
    
*   **Review audit logs and policy reports regularly to identify gaps or areas for improvement.** Ongoing monitoring is essential to ensure that policies are functioning as intended. Audit logs can reveal patterns such as repeated access attempts from unauthorized locations or frequent DLP triggers on specific file types. Policy reports help you assess effectiveness and compliance trends. For example, if you notice a spike in blocked emails due to DLP rules, it might indicate that users need better guidance on handling sensitive data or that the policy thresholds need adjustment.
    
*   **Educate users on how policies work and why they matter.** User training is a critical component of successful policy implementation. When users understand how sensitivity labels classify data, what actions trigger DLP policies, and why access restrictions exist, they’re more likely to comply and less likely to circumvent controls. Training can be delivered through short videos, interactive modules, or live sessions. For example, a quick tutorial on labeling documents correctly can prevent accidental data exposure and reduce support tickets. Clear communication fosters a culture of security and compliance.
    
*   **Use automation tools like Power Automate to streamline enforcement and alerting.** Automation can reduce manual effort and improve response times. Power Automate allows you to create workflows that respond to policy violations—such as sending alerts when sensitive data is shared externally or automatically revoking access when a device is flagged as noncompliant. For instance, you could build a flow that notifies the security team and affected user when a DLP rule is triggered, enabling faster resolution and better tracking.
