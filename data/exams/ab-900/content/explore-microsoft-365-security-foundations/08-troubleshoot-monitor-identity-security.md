---
title: "Troubleshoot and monitor identity security"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/8-troubleshoot-monitor-identity-security"
uid: "learn.wwl.explore-microsoft-365-security-foundations.troubleshoot-monitor-identity-security"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Troubleshoot and monitor identity security

Identity is the cornerstone of security in Microsoft 365, and failures or misconfigurations can lead to compromised accounts, unauthorized access, or service outages. Therefore, it's critical to understand the tools, processes, and best practices that help maintain a secure and smoothly functioning identity environment.

Effective troubleshooting requires both technical knowledge and investigative skills. Admins must be comfortable navigating Microsoft Entra, Intune, Defender for Endpoint, and the audit log infrastructure to pinpoint root causes and apply targeted fixes. Additionally, proactive monitoring through audit logs ensures visibility into user and admin activities, allowing organizations to detect suspicious behavior and meet compliance requirements. Finally, managing app registrations and enterprise applications correctly enables secure integration of custom and non-Microsoft solutions without exposing vulnerabilities.

The skills covered in this unit not only help maintain operational continuity but also form a key defense layer in Microsoft’s zero-trust security model, ensuring that only authenticated and authorized users and devices can access critical resources.

### Troubleshooting common sign-in issues

Sign-in issues are among the most frequent challenges faced by administrators managing Microsoft 365 environments. These issues can stem from misconfigured multifactor authentication (MFA), conditional access policies that inadvertently block legitimate users, or suspicious sign-in activity detected by Microsoft's risk analysis systems. Understanding how to effectively troubleshoot sign-in failures is essential to reduce downtime, enhance user experience, and maintain security.

Multifactor authentication, while critical for security, often introduces complexity. Users might struggle with app registration or hardware token setup, or new phishing-resistant policies might block them. Conditional access policies, designed to enforce security based on user location, device compliance, or risk signals, require careful tuning to avoid unintended denials. Microsoft provides multiple tools such as sign-in logs and the What If simulator to give administrators visibility into why a sign-in failed and what conditions were evaluated.

This section examines the primary interfaces and methods for diagnosing sign-in problems, including real-world examples such as resolving device compliance issues, addressing MFA failures, and interpreting risky sign-in flags. Effective administrators must learn how to utilize the Microsoft Entra admin center and integrate other security tools like Microsoft Intune and Defender for Endpoint into their troubleshooting workflow.

*   **Microsoft Entra admin center**. The Microsoft Entra admin center is the main hub for managing and troubleshooting identity and access in Microsoft 365. From this portal, admins can view detailed sign-in logs, adjust security settings, and investigate sign-in problems. The sign-in logs show important information for each sign-in attempt, such as when and where it happened, what device and app were used, whether multifactor authentication (MFA) was completed, and whether access was allowed or blocked. This detailed view helps identify exactly why a user couldn't sign in, whether it was a password issue, a blocked device, or a policy setting.
    
*   **Microsoft Entra sign-in logs**. These logs record every time a user—or even an automated service—tries to sign in to Microsoft 365 or connected applications. Each entry includes information about whether the attempt was successful, what conditions were evaluated (like location or device compliance), and which Conditional Access policies were applied. Common failure reasons like “incorrect password,” “MFA required,” or “sign-in blocked by policy” are clearly displayed. You can filter the logs by user, app, IP address, or date to find the exact event you're troubleshooting. These logs are essential for understanding sign-in trends and resolving access issues quickly.
    
*   **What If tool (Conditional Access simulation**). The “What If” tool lets admins test Conditional Access policies without needing to perform a real sign-in. The admin selects a specific user, device, and app, and the tool shows which policies would apply and whether access would be granted or denied. This tool is especially helpful when troubleshooting unexpected sign-in failures; for example, when a user is blocked from accessing an app despite meeting all known requirements. It also helps admins fine-tune policies to avoid accidental lockouts while still enforcing strong security.
    

### Common troubleshooting scenarios and examples

The following real-world scenarios illustrate common identity-related issues that administrators might encounter, along with step-by-step guidance on how to diagnose and resolve them using Microsoft 365 and Microsoft Entra tools.

##### User blocked due to MFA or phishing-resistant policies

Many organizations enforce strong MFA requirements to protect against credential theft and phishing attacks. However, users can be inadvertently blocked if their authentication methods are misconfigured or not compliant with policies. For example, a phishing-resistant MFA policy might require hardware security keys (FIDO2) or the Microsoft Authenticator app with number matching.

Resolution steps for this issue can include:

1.  Start by checking the sign-in logs to confirm the user’s failed attempts and the specific policy triggering the block.
2.  Determine if the user’s registered MFA methods match the policy requirements.
3.  If necessary, guide the user to reset their MFA registration by deleting existing credentials and re-enrolling via the Microsoft Authenticator app or security key. An example might include a user whose phone’s authenticator app was reset or lost, requiring re-registration.
4.  Also consider clock synchronization issues on the user's device. When a user sets up MFA using an app like Microsoft Authenticator or Google Authenticator, the app creates a code that changes frequently, such as every 30 seconds. This code is known as a Time-Based One-Time Password (TOTP) code. The app and the authentication system (like Microsoft Entra ID) both rely on their internal clocks to stay in sync. If the time on the user's device is off, even by a little, the system might think the code is invalid, and the sign-in fails. For this reason, it's essential to keep the device clock accurate when using TOTP-based authentication.

##### Conditional Access denials

Conditional access policies can enforce access restrictions based on device compliance, user risk, network location, or session risk. These policies are powerful but can be complex to configure. When users are denied access, admins need to understand which condition failed.

The investigative process should include the following steps:

1.  Use the What If tool to simulate the user’s sign-in scenario, checking which policy or condition denies access.
2.  Verify device compliance status in Microsoft Intune, ensuring the device meets required configurations like encryption, antivirus, or security updates.
3.  Check Microsoft Defender for Endpoint for any security alerts or threats on the device.
4.  For example, a user is blocked if the policy requires a compliant device, but Intune reports the device as noncompliant due to missing security patches.
5.  Admins can then instruct the user to update or remediate the device before access is granted.

##### Risky sign-ins and Identity Protection

Microsoft Entra Identity Protection uses machine learning and threat intelligence to detect suspicious sign-in attempts, flagging them as risky. Suspicious activity might include impossible travel, sign-ins from unfamiliar locations or IP addresses, and attempts from leaked credentials.

The investigative process should include the following steps:

1.  Admins should filter sign-in logs by risk level to focus investigations on potentially compromised accounts. For example, a user signing in from a country/region they’ve never been to can be flagged by a risky sign-in.
2.  In response, admins might require users to reset passwords, enforce MFA challenges, or temporarily block access.
3.  The admin should review logs, and if they confirm the anomaly, then mandate password reset and MFA before allowing access.

##### Sign-in issues due to user location or IP restrictions

Organizations often configure Conditional Access policies to block sign-ins from specific geographic locations or unfamiliar IP ranges as a security measure. However, configuring policies of this nature can sometimes prevent legitimate users from accessing resources when traveling or working remotely from untrusted locations.

The investigative process should include the following steps:

1.  In the Microsoft Entra sign-in logs, filter by the affected user and examine the **Location** and **IP address** fields.
2.  Review the Conditional Access policy that triggered the block and confirm whether location-based conditions are applied. For example, only allow sign-ins from trusted locations or named IP ranges.
3.  If the user is traveling, verify their itinerary or remote IP address and assess if a policy exception or temporary access needs to be granted. For example, a sales executive attending a conference in South America might be blocked due to the region being outside the organization's trusted locations.
4.  Admins can temporarily adjust the policy, use Just-In-Time access through Privileged Identity Management (PIM), or enter specific IP addresses in an allow list if they’re deemed safe.

##### Authentication failures with legacy protocols or unsupported client apps

Users might experience sign-in failures when connecting with legacy authentication methods (for example, basic authentication over POP, IMAP, or SMTP AUTH) or older clients that don’t support modern authentication (OAuth 2.0). Microsoft is retiring legacy authentication because it uses basic username and password sign-ins, which password spray and brute-force attacks easily target. Modern authentication (OAuth 2.0) provides stronger, token-based protection. Because Microsoft requires modern authentication for most services, connections using basic authentication are rejected unless updated or reconfigured to use OAuth-based methods.

The investigative process should include the following steps:

1.  Use sign-in logs to identify client app and authentication protocol details under the **Client App** field.
2.  Confirm if the attempted protocol is a legacy one, such as IMAP, POP3, or SMTP AUTH.
3.  Review the organization’s conditional access policies to determine if legacy authentication is blocked. For example, a user trying to configure their mailbox on an older version of Outlook (pre-2013) might be denied because the app doesn’t support modern auth.

Solution options include upgrading to a supported client, enabling OAuth for service access, or using app passwords (if still permitted, though it's discouraged for security reasons).

### Reviewing audit logs for user and admin activity

Audit logs are indispensable for maintaining visibility into what is happening within your Microsoft 365 tenant. They serve multiple purposes, such as forensic investigation of security incidents, compliance reporting, and proactive monitoring of administrative actions. Given the breadth of Microsoft 365 services, audit logs provide a unified, detailed record of activities spanning Exchange, SharePoint, Teams, Microsoft Entra, and more. Audit logging captures granular data such as file accesses, policy changes, sign-in attempts, mailbox activities, and role assignments. This data helps administrators reconstruct timelines of events when investigating suspicious or unauthorized behavior.

Before administrators can effectively use audit logs for monitoring, compliance, or investigation, it's essential to understand how to access them, what permissions are required, and how to work within the Microsoft Purview portal where this data is stored.

*   **Access audit logs**. Audit logs are accessible through the Microsoft Purview portal and PowerShell. Admins can use a powerful search interface to apply filters to the logs based on activities, users, date ranges, and services. The logs include timestamps, user IDs, IP addresses, and detailed event information.
    
*   **Permissions required to view audit logs**. Admins must be assigned either the Audit Logs role or the View-Only Audit Logs role to view audit logs. These roles restrict access to sensitive audit data to authorized personnel only.
    
*   **Extending audit log insights beyond the portal**. While the Microsoft Purview portal offers rich filtering and search capabilities, exporting audit data enables more advanced scenarios. Administrators can use tools like Excel, Power BI, or a SIEM platform such as Microsoft Sentinel or Splunk to perform historical trend analysis, correlate activity across systems, or build custom dashboards for reporting. This approach is useful in large environments where ongoing monitoring, alerting, or long-term retention is required.
    

Once audit logging is enabled and accessible, administrators can apply it to a wide range of real-world scenarios that require visibility into user and admin activity. Whether investigating a potential security breach, monitoring changes to critical configurations, or ensuring compliance with internal policies, audit logs provide the evidence trail needed to support analysis and decision-making.

The following examples illustrate how audit logs can be used to detect unauthorized actions, trace administrative changes, and proactively monitor key activities across Microsoft 365 services.

##### Tracking unauthorized file access in SharePoint

Data exfiltration is a common security concern. By reviewing audit logs for SharePoint, admins can perform the following steps to detect who accessed or downloaded sensitive documents:

1.  Filter audit logs for **FileDownloaded** or **FileAccessed** activities related to the targeted site or document library.
2.  Analyze user identities, timestamps, and IP addresses to detect anomalies or unauthorized access. Doing so helps identify insiders or compromised accounts that might be leaking data.
3.  Following detection, admins can revoke access, reset credentials, and escalate incidents to security teams.

##### Monitoring admin role assignments

Changes to admin roles can create security risks if unauthorized users gain elevated privileges. Admins can use PowerShell cmdlets like Search-UnifiedAuditLog to query for changes to Global Admin, Exchange Admin, or other privileged roles. For example, an unexpected assignment of Global Admin rights triggers an investigation to verify legitimacy and possibly revert the change. Doing so helps enforce the principle of least privilege and detect privilege escalation attempts.

##### Tracking policy changes in Teams or mailbox settings

Teams policies and mailbox configurations directly impact security and collaboration. Admins can filter audit logs for changes to Teams policies such as messaging, meeting, or app permission policies. Mailbox permission changes are also logged, providing a trail of who granted access to mailboxes. Doing so helps identify misconfigurations or unauthorized policy changes that might expose data or disrupt services.

##### Advanced techniques

While the Microsoft Purview portal offers a user-friendly interface for searching audit logs, more advanced techniques are often required to meet the needs of security operations, compliance reporting, and large-scale investigations. These techniques involve automating log collection with PowerShell, integrating audit data into SIEM platforms, and customizing queries to extract specific insights.

Administrators who reach beyond the basic portal functionality can build scalable, proactive monitoring workflows that enhance visibility and reduce response times to suspicious or unauthorized activities.

*   PowerShell scripting can automate audit log queries and data export for bulk or scheduled reporting.
*   Integrating audit log data with tools like Microsoft Sentinel enables real-time alerting on suspicious activities.
*   Understanding audit log schema and events are essential for customizing queries and creating targeted investigations.

### App registrations and enterprise apps

Applications are critical in modern business workflows, enabling automation, integration, and productivity enhancements. However, they also introduce identity and security challenges if not properly managed. Microsoft Entra separates the concepts of app registrations and enterprise applications to manage app identities and their lifecycle securely.

*   App registrations represent the identity and configuration metadata required to integrate an app with Microsoft identity platform, including authentication flows, permissions, and supported account types.
*   Enterprise applications are the actual service principals instantiated in a tenant, representing an instance of the app that users and admins interact with.

Proper management of these components ensures that applications only request the minimum necessary permissions, use secure authentication methods, and comply with organizational security policies such as conditional access and MFA enforcement.

##### App registrations: What and How

App registrations are the foundation for enabling applications to securely authenticate and integrate with Microsoft 365 and Microsoft Entra ID. When an application—whether custom-built or non-Microsoft—needs to access organizational resources such as user profiles, email, or SharePoint data, it must first be registered to establish a trusted identity.

This registration process defines how the app authenticates, what permissions it requires, and which accounts it can interact with. Understanding how to properly create and configure app registrations is essential for ensuring secure access, enforcing least-privilege permissions, and maintaining control over how apps operate within your environment.

*   **App registrations**. A registration defines how an application connects to Microsoft 365 and what it’s allowed to do. When an app is registered, administrators specify:
    
    *   What kind of users it can work with, such as people in your organization or anyone with a Microsoft account.
    *   What information or tools it needs access to, such as reading user profiles, sending emails, or accessing calendars.
    
    This process helps ensure that only trusted apps can interact with your organization's data, and that they only get the level of access they truly need. Admins or developers create app registrations manually through the Microsoft Entra admin center or programmatically through PowerShell or the Microsoft Graph API.
    
*   **Keeping app access secure**. When an app is registered, it needs a way to prove its identity so that Microsoft 365 knows the request is coming from a trusted source. The app accomplishes this task by using something like a digital password or a key—called a _client secret_ or a _certificate_. You can think of it like a special badge the app uses to say, “I am who I say I am.” Just like regular passwords, these digital credentials need to be protected. Admins are responsible for creating them, keeping them private, and changing them regularly to reduce the risk of misuse. For example, if a developer builds a custom app that needs to read users' calendars, they request permission for that access. An admin then reviews the request to make sure the app is safe and only getting the access it really needs.
    

##### Practical use cases and examples

Understanding how app registrations and enterprise applications work can feel complex, but looking at real-world examples helps make these concepts clearer. This section explores practical situations where admins and developers work together to set up apps that connect securely to Microsoft 365. These examples show how apps get permission to access data, how users sign in safely, and how organizations keep control over what apps can do. By walking through common scenarios, you can see how these processes protect your environment while enabling useful tools.

*   **Custom apps**. In many organizations, developers build custom apps to help employees work more efficiently. For example, a developer might create a Power App that needs to read users’ calendar information to show upcoming meetings. To make this work, the app must be registered with Microsoft 365, which involves an admin setting up permissions so the app can access calendar data securely. The admin also creates a special security key for the app and configures where users will be sent after signing in. Once set up, the app uses Microsoft’s sign-in system to connect safely, and admins keep an eye on how the app is used to make sure it follows the organization’s security rules.
    
*   **Non-Microsoft apps**. Consider an HR management system that needs to let employees sign in using their Microsoft 365 accounts instead of separate usernames and passwords. To accomplish this task, admins must set up a connection called single sign-on (SSO), which makes logging in simpler and more secure. This setup includes configuring special identifiers and security certificates, assigning access to the right groups of users, and requiring extra security steps like entering a code from a phone. Audit logs then help track who signed in and when, supporting security and compliance efforts.
    
*   **Manage user consent**. Managing user consent is important to keep apps from getting too much access. Sometimes, apps ask users for permission to access data or perform actions on their behalf. Admins should review these permission requests carefully and limit which apps users are allowed to approve. Doing so helps prevent situations where an app might have more permissions than it really needs, reducing security risks. Regularly checking permissions ensures that the organization follows the principle of giving apps only the access necessary to do their job.
