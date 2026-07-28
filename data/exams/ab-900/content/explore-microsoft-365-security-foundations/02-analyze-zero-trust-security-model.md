---
title: "Analyze the Zero Trust security model"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/2-analyze-zero-trust-security-model"
uid: "learn.wwl.explore-microsoft-365-security-foundations.analyze-zero-trust-security-model"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Analyze the Zero Trust security model

The Zero Trust security model represents a paradigm shift in cybersecurity architecture. Unlike traditional perimeter-based models that assume internal networks are inherently trustworthy, Zero Trust operates on the principle that no user, device, or application should be trusted by default, regardless of their location. This model is especially critical in today’s hybrid work environments, where users access resources from various devices and locations, often outside the corporate firewall.

Microsoft 365 integrates Zero Trust principles across its cloud services, enabling organizations to enforce granular access controls, monitor user behavior, and respond to threats in real time. The model isn't a single product but a comprehensive strategy that spans identity, endpoints, data, applications, infrastructure, and networks. Implementing Zero Trust in Microsoft 365 requires a layered approach, combining native tools like Microsoft Entra ID, Microsoft Defender, Intune, and Purview.

![Diagram that asks why we're having a Zero Trust conversation and the four key answers: IT security is complex, trusted network security strategy that accepted lower security within the network, assets increasingly leave the network, and attackers shift to identity attacks. ](../../wwl/explore-microsoft-365-security-foundations/media/zero-trust-conversation.png)

### Core Principles of Zero Trust

The following sections introduce the three core principles of the Zero Trust security model.

##### Verify explicitly

The Verify explicitly principle is the cornerstone of the Zero Trust model. It requires that every access request, whether from a user, device, or application, is authenticated and authorized using all available contextual signals. This principle includes identity attributes, device health, location, user behavior, and risk level. Unlike traditional models that trust users inside the network perimeter, Zero Trust assumes that every request could be malicious and must be verified before access is granted.

Microsoft 365 enforces this principle through a combination of Conditional Access policies, real-time risk evaluation, and multifactor authentication (MFA). These mechanisms work together to ensure that access decisions are dynamic and based on current context rather than static credentials. This approach significantly reduces the risk of unauthorized access, especially in hybrid and remote work environments where users connect from various networks and devices.

*   **Conditional access policies.** Conditional Access in Microsoft Entra ID enables administrators to define granular access rules based on multiple signals. These policies evaluate user identity, device compliance, location, application sensitivity, and real-time risk before granting access. For example, a policy might require MFA for users accessing SharePoint Online from outside the corporate network, or block access entirely if the device isn't compliant with Intune policies.  
      
    Conditional Access also supports session controls, such as limiting access to read-only mode or preventing downloads. These controls are particularly useful for high-risk scenarios, such as contractors accessing sensitive documents. Policies can be combined using logical operators to create complex rules that reflect organizational requirements. For instance, access might be allowed only if the user is on a compliant device, in a trusted location, and has a low risk score.  
      
    Microsoft provides templates and recommendations to help organizations implement Conditional Access effectively. Secure Score integrates with Conditional Access to highlight gaps and suggest improvements. Administrators can simulate policy impact before deployment to avoid unintended disruptions. Doing so ensures that verification is both rigorous and user-friendly.
    
*   **Risk-based authentication and Multifactor authentication (MFA).** Microsoft Entra Identity Protection evaluates sign-in risk using machine learning and global threat intelligence. It detects anomalies such as impossible travel, unfamiliar sign-in properties, and known compromised credentials. Based on the risk level, access can be blocked, challenged with MFA, or allowed with restrictions. This dynamic response helps prevent account takeover and credential stuffing attacks.  
      
    MFA adds a critical layer of security by requiring users to verify their identity using a second factor, such as a mobile app notification, biometric scan, or hardware token. Microsoft 365 supports various MFA methods, including passwordless options like Windows Hello and FIDO2 keys. These methods reduce reliance on passwords, which are often weak or reused across services.  
      
    Risk-based MFA can be configured to trigger only when necessary, minimizing user friction. For example, a user signing in from a known device and location might not be prompted for MFA, while a sign-in from a new device in a high-risk location can require it. This balance between security and usability is key to successful Zero Trust adoption.
    

Organizations that verify explicitly can tailor access controls to specific scenarios. For example, a user accessing sensitive data from a corporate laptop in a trusted location might be allowed seamless access, while the same user accessing from a personal device in a foreign location might be blocked or required to complete extra verification steps. This adaptive security model helps balance usability with protection.

##### **Least privilege access**

The Least privilege access principle is a foundational concept in Zero Trust architecture. It dictates that users, applications, and services should be granted only the minimum level of access necessary to perform their tasks. This approach reduces the attack surface by limiting the number of entities with elevated permissions and ensures that even if an account is compromised, the potential damage is contained. In Microsoft 365, this principle is enforced through granular access controls and dynamic privilege management.

Implementing least privilege requires a thorough understanding of user roles, workflows, and resource sensitivity. Organizations must map out which users need access to which systems and under what conditions. This mapping enables the creation of tailored access policies that reflect operational needs without overprovisioning. Microsoft 365 supports this process through Role-Based Access Control (RBAC), which defines roles with specific permissions, and Privileged Identity Management (PIM), which provides just-in-time access to sensitive functions.

*   **Role-based access control**. RBAC allows administrators to assign roles with predefined permissions. For instance, a helpdesk technician might be granted the Password Administrator role, which allows password resets but not access to user mailboxes. Predefined roles prevent privilege creep and enforces separation of duties. Roles can be customized to align with organizational policies and compliance requirements.
    
*   **Privileged Identity Management**. PIM adds another security layer by enabling just-in-time (JIT) access. A global administrator can request temporary elevation for a specific task, such as configuring a new Conditional Access policy. The request can be subject to approval workflows and audit logging. Once the task is complete, the elevated privileges are automatically revoked. Doing so reduces the risk of persistent high-level access and supports forensic investigations.
    

##### Assume breach

The Assume breach principle reflects a shift in mindset from prevention to containment. It operates under the assumption that attackers are either already inside the network, or they might eventually find a way in. Therefore, every component—users, devices, applications, and infrastructure—must be treated as potentially compromised. This principle emphasizes segmentation, continuous monitoring, and rapid response to minimize the impact of breaches.

In Microsoft 365, the Assume breach principle is implemented through a suite of security tools that detect, investigate, and respond to threats in real time. These tools include Microsoft Defender for Endpoint, Microsoft Sentinel, and Microsoft Defender for Identity. Together, they provide visibility across endpoints, identities, and network traffic, enabling organizations to identify anomalies and take corrective action before damage occurs.

*   **Defender for Endpoint**. Uses behavioral analytics to detect anomalies such as lateral movement, privilege escalation, or ransomware activity. If a device exhibits suspicious behavior, it can be automatically isolated from the network, preventing further spread. Security teams can investigate the incident using timeline views and forensic data.
    
*   **Microsoft Sentinel**. Aggregates logs and alerts from across Microsoft 365 and non-Microsoft sources. It uses machine learning to correlate events and identify threats that span multiple domains. For instance, a phishing email detected by Defender for Office 365 might be linked to a compromised account in Microsoft Entra ID and a malicious file in SharePoint. Microsoft Sentinel can trigger automated playbooks to contain the threat and notify stakeholders.
    
*   **Microsoft Defender for Identity**. Monitors Microsoft Entra ID traffic for signs of compromise. It can detect techniques like Pass-the-Hash, Golden Ticket attacks, and domain enumeration. These insights are crucial for protecting hybrid environments where on-premises infrastructure interacts with cloud services.
    

Assume breach also supports proactive threat hunting and incident response. Security teams can use telemetry data to trace attack paths, identify compromised assets, and contain threats. For example, if a phishing email leads to credential theft, Defender for Identity can detect lateral movement, while Microsoft Sentinel can correlate the event with other indicators of compromise. This layered defense strategy ensures that breaches are detected quickly and mitigated effectively.

### Zero Trust pillars in Microsoft 365

Microsoft’s Zero Trust architecture is built on six interdependent pillars. Each pillar represents a domain where Zero Trust principles must be applied.

![Diagram showing the six principles of Zero Trust in Microsoft 365: Identity, Endpoints, Data, Applications, Infrastructure, and Network.](../../wwl/explore-microsoft-365-security-foundations/media/zero-trust-principles.png)

##### Identity

Identity is the cornerstone of Zero Trust. Microsoft Entra ID provides centralized identity management, authentication, and authorization. It supports passwordless sign-in, risk-based access, and integration with non-Microsoft identity providers. For example, organizations can implement passwordless authentication using Windows Hello for Business, FIDO2 security keys, or Microsoft Authenticator. These features reduce reliance on passwords, which are often the weakest link in security. Microsoft Entra ID also supports identity federation, allowing users to sign in with credentials from external providers like Google or Facebook, while still enforcing corporate policies.

Risk-based Conditional Access evaluates signals such as sign-in location, device compliance, and user behavior. A user logging in from a known device in a trusted location might be granted access seamlessly, while a sign-in from an unknown device in a foreign location can trigger MFA or be blocked entirely.

##### Endpoints

Endpoint security is a critical pillar of the Zero Trust model. In this context, “endpoints” refers to any device that connects to enterprise resources, including desktops, laptops, mobile phones, tablets, and even IoT devices. These endpoints are often the first target in cyberattacks, making it essential to verify their health and compliance before granting access. Microsoft 365 provides robust endpoint management and protection capabilities through tools like Microsoft Intune and Microsoft Defender for Endpoint.

Microsoft Intune enables administrators to define and enforce compliance policies that govern endpoint behavior. These policies can require encryption, antivirus protection, minimum OS versions, and other security configurations. Devices that fail to meet these requirements can be automatically quarantined or denied access to corporate resources. For example, a user attempting to access Microsoft Teams from a jailbroken iPhone might be blocked due to noncompliance. Intune also supports app protection policies, which enforce data encryption and isolation at the application level. These policies are especially useful in bring-your-own-device (BYOD) scenarios where personal and corporate data coexist on the same device.

Beyond compliance enforcement, Microsoft 365 offers visibility into endpoint health and usage through Endpoint Analytics. This tool provides insights into device performance, user behavior, and configuration risks. Administrators can identify endpoints with frequent crashes, outdated software, or insecure settings and prioritize remediation efforts accordingly. These analytics help improve user experience while strengthening the organization’s overall security posture. Endpoint compliance becomes a dynamic factor in access decisions when combined with Conditional Access. This combination ensures that only secure and trusted devices can interact with sensitive data.

##### Applications

Applications must be secured against unauthorized access and data leakage. Microsoft Defender for Cloud Apps provides visibility into sanctioned and unsanctioned applications, also known as shadow IT. It can enforce session controls, block risky apps, and monitor user activity. For example, if a user uploads sensitive data to a personal Dropbox account, Defender for Cloud Apps can detect the activity and block the session. It can also apply real-time controls, such as watermarking documents or preventing copy-paste actions.

Microsoft Entra ID’s App Proxy enables secure remote access to on-premises applications without exposing them to the internet. It uses reverse proxy architecture and integrates with Conditional Access, ensuring that only compliant users and devices can connect.

##### Data

Data protection is a core objective of Zero Trust. Microsoft Purview Information Protection allows organizations to classify, label, and encrypt sensitive data. Labels can be applied manually or automatically based on content inspection. For example, a document containing credit card numbers can be automatically labeled as “Confidential” and encrypted. Only authorized users can view or edit the document, and access can be revoked at any time. Labels persist across services, ensuring consistent protection.

Data Loss Prevention (DLP) policies prevent unauthorized sharing of sensitive information. A user attempting to email a spreadsheet with Social Security numbers might be blocked, warned, or allowed with justification. DLP integrates with Exchange, SharePoint, OneDrive, and Teams.

##### Infrastructure

Infrastructure security involves protecting cloud and on-premises resources. Microsoft Defender for Cloud assesses security posture and provides recommendations. It supports multicloud environments, including Amazon Web Services (AWS) and Google Cloud. For instance, Defender for Cloud might detect that a virtual machine lacks endpoint protection or is exposed to the internet. It can recommend remediation steps, such as enabling firewalls or restricting access. These insights help maintain compliance with standards like ISO 27001 and the National Institute of Standards and Technology (NIST).

As organizations adopt Zero Trust principles across their infrastructure, it's essential to enforce consistent governance over cloud resources to prevent misconfigurations and ensure compliance. This process includes controlling how resources are deployed, configured, and maintained across environments. To address this governance need, Microsoft Azure provides Azure Policy. Azure Policy is a powerful governance tool that enables organizations to create, assign, and manage policies that enforce rules and effects across cloud resources. Administrators can define policies that restrict VM sizes, enforce tagging, or require encryption. Noncompliant resources are flagged or denied deployment, ensuring consistency and security.

##### Network

Network segmentation and access control are essential in Zero Trust. Microsoft 365 integrates with Azure Firewall, VPN Gateway, and Microsoft Defender for Identity to monitor and control network traffic. For example, Azure Firewall can restrict outbound traffic to known safe destinations, preventing data exfiltration. VPN Gateway enables secure connectivity for remote users, while enforcing Conditional Access policies.

Defender for Identity monitors network traffic for signs of lateral movement, such as credential theft or unauthorized access. It can detect attackers attempting to pivot across systems and alert security teams for immediate response.
