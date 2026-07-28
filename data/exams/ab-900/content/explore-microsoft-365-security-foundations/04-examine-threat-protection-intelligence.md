---
title: "Examine threat protection and intelligence in Microsoft 365"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/4-examine-threat-protection-intelligence"
uid: "learn.wwl.explore-microsoft-365-security-foundations.examine-threat-protection-intelligence"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Examine threat protection and intelligence in Microsoft 365

Microsoft 365’s threat protection and intelligence capabilities are at the heart of modern enterprise security. As organizations increasingly rely on cloud-based collaboration and productivity tools, the attack surface expands, making integrated security solutions essential. Microsoft 365 brings together a suite of tools that work in concert to detect, investigate, and respond to threats across email, endpoints, identities, and applications. This holistic approach ensures that security teams can see the full picture, rather than isolated fragments, when defending against sophisticated attacks.

Threats today aren’t limited to malware or spam; attackers use advanced techniques like phishing, business email compromise, credential theft, and lateral movement to infiltrate organizations. Microsoft 365’s Defender suite utilizes artificial intelligence, machine learning, and vast global telemetry to identify and block these threats before they cause harm. By integrating protection across workloads—such as Exchange Online, Teams, SharePoint, and OneDrive—Microsoft 365 ensures that security isn't siloed, but unified and adaptive.

![Diagram showing an assortment of threats that Microsoft Threat Intelligence addresses. ](../../wwl/explore-microsoft-365-security-foundations/media/threat-intelligence-landscape.png)

### Microsoft Defender XDR: The threat protection suite

Microsoft Defender XDR is a comprehensive security solution designed to protect organizations from both known and emerging threats. Unlike traditional security tools that operate in isolation, Defender coordinates detection, prevention, investigation, and response across multiple Microsoft 365 services. This unified approach enables security teams to correlate signals from email, endpoints, identities, and cloud apps, providing a more complete understanding of the threat landscape.

The suite is built to address both pre-breach and post-breach scenarios. In pre-breach scenarios, Defender uses advanced analytics and threat intelligence to block malicious activity before it reaches users. In post-breach scenarios, it provides powerful investigation and response tools to contain and remediate incidents. This dual capability is critical in today’s environment, where attackers often use multi-stage campaigns that can bypass traditional defenses.

Defender’s integration with Microsoft’s global security infrastructure means it benefits from trillions of signals collected daily across Azure, Office 365, Windows, and more. This intelligence is continuously updated, allowing Defender to recognize new attack patterns and adapt its defenses in real time. For example, if a new phishing campaign is detected in one region, Defender can block similar attacks worldwide within minutes.

Key components of Microsoft Defender XDR include:

*   **Defender for Office 365**. This component protects email and collaboration tools against phishing, business email compromise (BEC), malware, and other threats. For instance, it can detect and block phishing emails that contain malicious URLs, preventing users from clicking links that could compromise their credentials or download malware. Imagine a scenario where an employee receives an email that appears to be from a trusted source but contains a link to a fake sign-in page; Defender for Office 365 scans the URL and blocks access before any damage occurs.
    
*   **Defender for Endpoint**. Defender for Endpoint provides advanced endpoint detection and response (EDR), antivirus protection, attack surface reduction, and automated investigation and response. If a device is compromised, Defender can detect malicious behavior, isolate the device from the network, and initiate automated remediation. For example, if ransomware is detected on a user’s laptop, Defender for Endpoint can quarantine the device, preventing the spread of the attack and allowing security teams to investigate safely.
    
*   **Defender for Identity**. This tool uses signals from on-premises Active Directory to identify identity-based threats such as lateral movement and pass-the-hash attacks. It can alert administrators to suspicious Kerberos ticket activity or credential theft attempts. For example, if an attacker tries to use stolen credentials to move laterally within the network, Defender for Identity generates an alert, enabling rapid response to prevent further compromise.
    
*   **Defender for Cloud Apps**. Defender for Cloud Apps provides visibility and control over cloud applications, including Shadow IT discovery, app governance, and data exfiltration prevention. It can detect when a user uploads sensitive data to an unsanctioned non-Microsoft storage app, alerting administrators to potential data leaks. For instance, if an employee tries to move confidential files to a personal Dropbox account, Defender for Cloud Apps flags the activity and allows security teams to take action.
    

##### Microsoft Defender integration with Microsoft Purview

In addition to the rich assortment of tools in the Microsoft Defender XDR suite, keep in mind that it also integrates with Microsoft Purview for data security investigations and insider risk management. While Purview isn’t a component of the Defender XDR suite, it can work alongside Defender in real-world security operations, especially for organizations that need unified security and compliance workflows.

Purview services are licensed as part of Microsoft 365 suites, but they aren’t freestanding like Defender services. They’re designed to complement Defender XDR by providing compliance, governance, and data protection capabilities. Purview can automatically apply sensitivity labels to documents and prevent sharing outside the organization. For example, if a user attempts to email a sensitive document to an external recipient, Purview can block the action or require further approval, reducing the risk of accidental data exposure.

Purview and Defender XDR can closely work together to provide a holistic security and compliance solution for Microsoft 365 customers. For example, an organization’s security operations team can use Defender XDR for threat detection and response, and utilize Purview for investigating data security incidents, managing insider risks, and enforcing compliance policies.

### Core threat protection features in Microsoft 365

Microsoft 365 offers a robust set of threat protection features that operate across its various workloads. These features are designed to address the most common and dangerous attack vectors, including phishing, malware, and spam. Because Microsoft 365 utilizes multiple layers of defense, it ensures that threats are detected and blocked at every stage of the attack lifecycle.

Phishing remains the most prevalent method attackers use to compromise organizations. Microsoft 365’s anti-phishing capabilities combine spoof intelligence, impersonation protection, and real-time URL scanning to prevent users from falling victim to deceptive emails. Anti-malware features use multiple scanning engines and retroactive purging to remove malicious content, even after initial delivery. Anti-spam and transport rules provide customizable logic to filter unwanted or suspicious messages, reducing the risk of exposure to harmful content.

These core features aren’t limited to email; they extend to collaboration platforms like Teams and SharePoint, ensuring comprehensive protection across the organization. By integrating threat protection into every workload, Microsoft 365 minimizes gaps and vulnerabilities that attackers could exploit.

The following sections examine how Microsoft 365 addresses the most common and dangerous attack vectors - phishing, malware, and spam.

##### Anti-phishing

Phishing attacks are designed to trick users into revealing sensitive information or selecting malicious links. Microsoft 365’s anti-phishing features use advanced algorithms to detect and block these attempts. Spoof intelligence identifies when senders impersonate trusted domains, such as an email claiming to be from hr@yourcompany.com but sent from an unauthorized IP. This anti-phishing feature prevents attackers from exploiting domain reputation to bypass filters.

Another Microsoft 365 anti-phishing feature is impersonation protection. This feature flags attempts to mimic internal users or executives, such as an email from ceo@yourcompany.net trying to impersonate the CEO. By analyzing sender patterns and domain similarities, Microsoft 365 can alert administrators to potential spear-phishing campaigns targeting high-value individuals. User and domain impersonation detection further enhances security by identifying lookalike domains, such as support@microsoft.com, where attackers substitute characters to deceive recipients.

Safe Links is another critical feature, rewriting URLs in messages and scanning them at the time of selection. For example, if a user receives a link to a SharePoint document that is later replaced with malware, Safe Links scans the URL in real time and blocks access, protecting users from evolving threats.

##### Anti-malware

Malware can be delivered through emails, attachments, or shared files in collaboration platforms. Microsoft 365 uses multiple scanning engines to detect and block malware across Exchange Online, SharePoint, OneDrive, and Teams. Zero-hour Auto Purge (ZAP) is a powerful tool that retroactively removes malicious messages from mailboxes after new threats are identified. For instance, if malware is initially undetected but later recognized through a definition update, ZAP automatically purges it from all affected mailboxes.

Common attachment filter policies are also available that allow administrators to block executable files like .exe, .js, or .vbs, which are often used to deliver malware. For example, an email with an invoice.js attachment would be quarantined automatically, preventing users from inadvertently executing malicious code. These policies can be customized to address specific organizational risks and compliance requirements.

##### Anti-spam and transport rules

Spam filtering in Microsoft 365 uses a combination of heuristics, machine learning models, and reputation-based analysis to classify emails and reduce inbox clutter. Suspicious messages, such as bulk marketing emails with questionable unsubscribe links, are routed to the Junk folder, minimizing user exposure to potential threats. To improve its accuracy over time, the system continuously learns from user actions, such as marking messages as junk or not junk. This adaptive approach helps organizations stay ahead of evolving spam tactics, ensuring that legitimate messages are delivered while unwanted or potentially harmful emails are filtered out.

Transport rules, also known as mail flow rules, provide administrators with the ability to implement custom logic for handling messages. For example, a rule can be created to block any email from external domains that includes certain keywords in the subject line, such as “wire transfer,” reducing the risk of financial fraud. These rules can also be used to enforce compliance requirements, such as encrypting messages containing sensitive information or redirecting emails with specific attachments to a secure mailbox for review. When organizations implement transport rules, they can tailor their email security policies to address unique business needs and regulatory obligations.

In addition to basic spam filtering and custom rules, Microsoft 365 offers advanced features like connection filtering, which blocks messages from known malicious IP addresses, and outbound spam protection, which prevents compromised accounts from sending spam to external recipients. Administrators can also configure quarantine policies, allowing them to review and release messages that were flagged as spam or malicious before they reach end users. For example, if a legitimate business partner’s email is mistakenly classified as spam, an admin can release it from quarantine and mark the sender as trusted so that future messages aren't blocked. These layered controls provide organizations with granular management over email flow, helping to maintain both security and business continuity.

### Threat intelligence in Microsoft 365

Threat intelligence is a cornerstone of modern cybersecurity, enabling organizations to move from reactive defense to proactive protection. In Microsoft 365, threat intelligence isn’t just about identifying threats as they occur, but about understanding the broader landscape—who is attacking, what methods they use, and which assets are at risk. By utilizing vast global telemetry and advanced analytics, Microsoft 365 provides actionable insights that help security teams anticipate, detect, and respond to threats more effectively.

Microsoft’s approach to threat intelligence is deeply integrated into its security ecosystem. Rather than relying solely on static signatures or isolated alerts, Microsoft 365 combines real-time data from billions of signals across its cloud, endpoint, and identity platforms. Dedicated security researchers and AI-driven systems continuously update and refine this intelligence, ensuring that organizations are protected against both known and emerging threats. The result is a dynamic, adaptive defense posture that evolves alongside the threat landscape.

For IT administrators and security professionals, Microsoft 365’s threat intelligence tools offer both high-level overviews and granular investigation capabilities. Whether you need to understand the latest attack trends, investigate a specific incident, or map threats to industry frameworks like MITRE ATT&CK, these tools provide the visibility and context needed to make informed decisions and take decisive action.

The following sections examine these threat intelligence tools in greater detail.

##### Microsoft Threat Intelligence Center

The Microsoft Threat Intelligence Center (MSTIC) is the nerve center of Microsoft’s global security operations. MSTIC is responsible for collecting, analyzing, and disseminating threat intelligence from a vast array of sources, including cloud services, endpoints, and external threat feeds. By monitoring over 65 trillion signals daily, MSTIC can identify emerging threats, track sophisticated adversaries, and provide timely intelligence to Microsoft 365 customers.

MSTIC’s work goes far beyond automated detection. The center employs a team of expert analysts who investigate nation-state actors, monitor the dark web, and collaborate with law enforcement and industry partners. This human expertise, combined with machine learning and AI, allows MSTIC to uncover complex attack campaigns and share critical intelligence with organizations worldwide.

The intelligence produced by MSTIC is directly integrated into Microsoft 365’s security products, enhancing their ability to detect and block advanced threats. For example, if MSTIC identifies a new phishing campaign targeting financial institutions, it can rapidly update Microsoft 365’s filters to block similar attacks across all tenants. This proactive approach helps organizations stay ahead of attackers and reduces the risk of successful breaches.

*   **Over 65 trillion signals daily (from Azure, Office 365, Windows, etc.)**. MSTIC’s intelligence is powered by the sheer scale of Microsoft’s cloud and endpoint ecosystem. Every day signals from user logins, email traffic, endpoint activity, and cloud app usage are analyzed for signs of malicious behavior. This massive dataset enables Microsoft to spot patterns that might be invisible to smaller organizations, such as coordinated phishing campaigns or the early stages of a ransomware outbreak. For example, if a new malware strain is detected in one region, MSTIC can quickly identify and block it globally.
    
*   **Nation-state actor monitoring**. A nation-state actor is a threat actor sponsored or directed by a government. MSTIC is renowned for its ability to track and attribute attacks by nation-state actors. These adversaries often use sophisticated techniques and target critical infrastructure, government agencies, and large enterprises. Not only does MSTIC monitor the tactics, techniques, and procedures of these threat actors, it can also provide early warnings and tailored defenses. For instance, if a nation-state group begins targeting healthcare organizations with a new exploit, MSTIC can alert affected customers and update detection rules accordingly.
    
*   **Dark web monitoring**. The dark web is a marketplace for stolen credentials, malware, and attack tools. MSTIC continuously monitors these underground forums to identify emerging threats and compromised data. If stolen credentials for a Microsoft 365 tenant are found for sale, MSTIC can notify the organization and recommend immediate remediation steps, such as password resets and enhanced monitoring.
    
*   **Endpoint telemetry.** Signals from endpoints—such as laptops, desktops, and mobile devices—are a rich source of threat intelligence. MSTIC analyzes endpoint telemetry to detect unusual behavior, such as lateral movement, privilege escalation, or the use of known attack tools. For example, if a device begins communicating with a command-and-control server associated with ransomware, MSTIC can flag the activity and trigger automated response actions.
    

##### Threat Explorer (real-time detections)

Threat Explorer is a powerful investigation tool available in Microsoft Defender for Office 365 Plan 2. It provides security teams with real-time visibility into threats targeting their organization, allowing them to investigate, track, and respond to incidents as they unfold. Unlike static reports or delayed alerts, Threat Explorer offers up-to-the-minute data on email threats, including phishing, malware, and suspicious attachments.

With Threat Explorer, administrators can pivot across multiple dimensions—such as sender, subject, URL, or file hash—to uncover the full scope of an attack. This flexibility is crucial for identifying targeted campaigns, understanding user impact, and taking swift remediation actions. For example, if a user reports a phishing email, Threat Explorer can quickly reveal whether other users received or interacted with the same message, enabling a coordinated response.

The tool also integrates with other Microsoft 365 security features, allowing admins to take action directly from the investigation pane. For example, admins can delete malicious emails from user inboxes, block senders, or initiate automated investigations. By centralizing threat investigation and response, Threat Explorer streamlines security operations and reduces the time to containment.

*   **Investigate email threats in real time**. Threat Explorer provides a live view of email traffic, highlighting threats as they're detected. Security teams can monitor ongoing campaigns, track the delivery and status of suspicious messages, and respond before users are compromised. For example, if a new phishing campaign is detected, admins can use Threat Explorer to identify all affected users and remove the malicious emails before they're opened.
    
*   **Pivot by sender, subject, URL, file hash**. The ability to pivot investigations is essential for uncovering the full extent of an attack. If a suspicious email is sent from a particular address, admins can search for all messages from that sender. Similarly, if a malicious attachment is identified, they can search by file hash to find every instance of that file across the organization. This comprehensive approach ensures that no threat goes undetected.
    
*   **See delivery status and user impact**. Threat Explorer shows whether a message was delivered, blocked, or selected by users. This information helps security teams prioritize their response and focus on users who possibly interacted with malicious content. For example, if several users selected a phishing link, admins can initiate password resets and extra monitoring for those accounts.
    

##### Threat Analytics

Threat Analytics is a curated library of threat intelligence reports written by Microsoft’s security researchers. These reports provide in-depth analysis of emerging threats, attacker techniques, and real-world incidents. For security teams, Threat Analytics is an invaluable resource for staying informed about the latest attack trends and understanding how to defend against them.

Each report in Threat Analytics includes detailed descriptions of attacker behavior, mappings to the MITRE ATT&CK framework, and recommended remediation steps. This structured approach helps organizations align their defenses with industry best practices and regulatory requirements. Security teams that regularly review Threat Analytics can ensure that their detection rules, response playbooks, and user training are up to date.

Threat Analytics is also integrated with the Microsoft Defender XDR portal, making it easy for administrators to access relevant reports during incident investigations. For example, if an alert is triggered for a specific vulnerability, admins can consult the corresponding Threat Analytics report to understand the threat, assess their exposure, and implement recommended mitigations.
