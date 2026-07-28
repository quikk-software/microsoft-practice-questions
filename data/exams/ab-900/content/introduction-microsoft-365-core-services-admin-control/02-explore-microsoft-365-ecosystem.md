---
title: "Explore the Microsoft 365 ecosystem and core service components"
url: "https://learn.microsoft.com/en-us/training/modules/introduction-microsoft-365-core-services-admin-control/2-explore-microsoft-365-ecosystem"
uid: "learn.wwl.introduction-microsoft-365-core-services-admin-controls.explore-microsoft-365-ecosystem"
module: "introduction-microsoft-365-core-services-admin-control"
moduleTitle: "Introduction to Microsoft 365 core services and admin controls"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Explore the Microsoft 365 ecosystem and core service components

Microsoft 365 is more than just a suite of productivity tools. It’s a comprehensive, cloud-connected ecosystem designed to support modern collaboration, communication, and content management. For IT professionals and administrators, understanding how its core services interconnect is essential for effective deployment, governance, and support.

This training explores the foundational components of Microsoft 365, focusing on Exchange Online, Microsoft Teams, SharePoint Online, OneDrive, and Microsoft Copilot. It examines how these services integrate within a secure, scalable environment and how they can be managed to support organizational needs.

### Microsoft 365 architecture at a glance

Microsoft 365 is built on the following layered architecture that integrates identity, services, data, and security into a unified cloud platform:

*   **Identity layer**. Microsoft Entra ID (formerly Azure Active Directory) provides authentication, conditional access, and identity protection.
*   **Service layer**. Core services like Microsoft Exchange, Teams, SharePoint, OneDrive, and Copilot operate here.
*   **Data layer**. Microsoft Graph connects data across services, enabling insights and automation, and powering Copilot’s contextual intelligence.
*   **Intelligence layer**. Copilot and AI-powered agents utilize data and signals from across Microsoft 365 to deliver personalized assistance, recommendations, and automation.
*   **Security and compliance layer**. Unified tools for data loss prevention (DLP), eDiscovery, retention, and auditing.

At the heart of this architecture, Copilot acts as an intelligent orchestrator. It surfaces relevant information, automates tasks, and enhances productivity across the Microsoft 365 suite.

### Identity and access management across the Microsoft 365 services

At Microsoft 365’s foundation is Microsoft Entra ID, which handles identity and access management across all Microsoft 365 services. This identity layer ensures that users can securely authenticate and access resources based on their roles, devices, and locations. Conditional Access policies, multifactor authentication (MFA), and identity protection features are all managed through Microsoft Entra ID, making it a critical component for administrators to understand and configure properly.

Microsoft Entra is the broader identity and access management platform that encompasses Microsoft Entra ID, Microsoft Entra Permissions Management, and Microsoft Entra Verified ID. It provides comprehensive capabilities for securing access to resources across cloud and on-premises environments. Microsoft Entra enables organizations to implement Zero Trust principles, manage identities, govern permissions, and verify credentials, all from a unified platform.

[![Diagram showing a globe with secure Microsoft Entra connection points, such as granular access policies, AI, automation, and global scale.](../../wwl/introduction-microsoft-365-core-services-admin-control/media/microsoft-entra-overview.png)](../../wwl/introduction-microsoft-365-core-services-admin-control/media/microsoft-entra-overview.png#lightbox)

Above the identity layer is the service layer, which includes core applications like Exchange Online, SharePoint Online, Microsoft Teams, OneDrive, and Copilot. These services are interconnected through Microsoft Graph, a RESTful API that provides a unified programmability model to access data across Microsoft 365. This data layer enables intelligent experiences such as personalized search, insights, and automation. Finally, the security and compliance layer spans the entire stack, offering tools like Microsoft Purview for data governance, Microsoft Defender for threat protection, and Secure Score for assessing and improving your security posture.

Understanding this architecture is essential for IT professionals because it informs how services are deployed, secured, and managed. For example, a change in a Conditional Access policy in Microsoft Entra ID can affect access to Teams, SharePoint, and Exchange simultaneously. Similarly, DLP policies configured in Microsoft Purview can apply across email, chat, and file storage, ensuring consistent compliance enforcement.

### Establishing identity with domain names in Microsoft 365

In Microsoft 365, domain names play a central role in establishing your organization’s identity across email, collaboration, and cloud services. A domain name, such as **contoso.com**, is used to define the email addresses of users (for example, **jane@contoso.com**), brand your communications, and align your Microsoft 365 environment with your company’s public-facing identity. When you set up Microsoft 365 for your organization, you can use the default domain provided by Microsoft, such as **contoso.onmicrosoft.com** or **fabrikam.onmicrosoft.com**. However, to ensure consistency and professionalism, most organizations choose to add and verify their own custom domain, such as **contoso.com** or **fabrikam.com**.

Adding a custom domain to Microsoft 365 involves verifying ownership through DNS records and configuring services like Exchange Online, SharePoint Online, and Teams to use that domain. Once verified, administrators can assign user accounts, distribution lists, and shared mailboxes to use the custom domain, enabling branded email addresses and unified collaboration experiences. This setup also allows for better integration with external systems, improved deliverability of emails, and clearer identity management.

Microsoft 365 supports multiple domains within a single tenant, which is useful for organizations with multiple brands, subsidiaries, or geographic regions. Administrators can manage domain-specific policies, assign domains to specific users or groups, and configure hybrid environments where some services remain on-premises. Security and compliance features, such as conditional access and data loss prevention, respect domain boundaries, helping ensure that data access and sharing are aligned with organizational policies.

### Core services components

The heart of Microsoft 365 is a tightly integrated suite of cloud-based services that support communication, collaboration, and content management across organizations of all sizes. These core services include Exchange Online, SharePoint Online, OneDrive, Microsoft Teams, and Copilot. They aren’t standalone tools, but rather, interconnected components that form the foundation of the Microsoft 365 ecosystem.

Each service plays a distinct role. Understanding how these services function individually and how they work together is essential for IT professionals tasked with deploying, managing, and securing Microsoft 365 environments. Let’s take a quick look at each of these Microsoft 365 core service components.

Note

A later unit in this module takes a deeper look at the resources that are available in Exchange, SharePoint, and Teams.

#### Exchange Online

Exchange Online is Microsoft’s cloud-based email and calendaring service. As such, it serves as the backbone for communication in Microsoft 365. It provides enterprise-grade email hosting with built-in security features like anti-malware, anti-spam, and data loss prevention.

In Exchange Online, administrators can create three primary types of objects to support organizational communication: user mailboxes, shared mailboxes, and distribution lists. User mailboxes are provisioned for individual users and can be created through the Microsoft 365 admin center or PowerShell. Shared mailboxes allow multiple users to access and manage email from a common mailbox, making them ideal for teams or departments. Distribution lists (also known as distribution groups) enable email to be sent to multiple recipients simultaneously, streamlining group communication.

From an administrative perspective, Exchange Online offers powerful mail flow controls. Transport rules (also known as mail flow rules) allow admins to inspect email content and headers to enforce policies, such as encrypting messages containing sensitive data or blocking messages with specific attachments. Exchange Online also supports hybrid configurations, allowing organizations to maintain some mailboxes on-premises while migrating others to the cloud.

#### Microsoft Teams

Microsoft Teams is the collaboration hub of Microsoft 365, combining chat, meetings, calling, and app integration into a single interface. Teams is built on top of Microsoft 365 Groups and SharePoint, meaning every team created in Teams also provisions a SharePoint site and an Exchange group mailbox. This tight integration allows for seamless collaboration across services.

Teams supports persistent chat through channels, which it organizes by topic or project. Each channel can host threaded conversations, shared files, and tabs for apps like Planner, OneNote, or non-Microsoft tools. Teams meetings are integrated with Outlook and support features like screen sharing, recording, transcription, and breakout rooms. Admins can configure meeting policies, messaging restrictions, and app permissions through the Teams admin center or PowerShell.

Microsoft Teams allows administrators to create and manage policies that govern user experiences and security across the platform. These policies, which can be configured in the Teams admin center or through PowerShell, help enforce organizational standards for communication and collaboration. Once created, policies can be assigned to users individually or in bulk using policy packages or group-based assignment.

#### SharePoint Online

SharePoint Online is the content management and intranet platform within Microsoft 365. It enables organizations to build internal websites, manage documents, and automate business processes. SharePoint sites come in two main types: communication sites for broadcasting information to a wide audience, and team sites for collaborative work tied to Microsoft 365 Groups.

Document libraries in SharePoint support versioning, metadata tagging, and real-time co-authoring with Office apps. Lists allow for structured data storage and can be enhanced with Power Automate workflows and Power Apps forms.

Folders in SharePoint document libraries help organize content hierarchically, making it easier to manage large volumes of documents. Users can create folders manually or automate folder creation using Power Automate. Folders can also inherit metadata from the library or be configured with unique metadata values.

#### OneDrive

OneDrive provides personal cloud storage for users in Microsoft 365. It’s designed for individual file storage and sharing, with tight integration into Windows, Office, and mobile platforms. Each user typically receives 1 TB of storage, with the option to increase it based on licensing and usage.

OneDrive supports file synchronization through a desktop client, allowing users to access files offline and automatically sync changes when reconnected. In OneDrive, Known Folder Move (KFM) is a feature that allows users to redirect their important Windows folders, such as Desktop, Documents, and Pictures, to their OneDrive storage. KFM ensures that the contents of these folders are automatically backed up to the cloud, synchronized across devices, and protected by Microsoft 365’s security and compliance features.

Sharing controls allow users to generate links with view or edit permissions, set expiration dates, and require passwords. For example, a user working on a quarterly report can save the file to OneDrive and share it with their manager using a secure link. If the file is accidentally deleted or overwritten, version history allows the user to restore a previous version. Admins can configure sharing policies and monitor activity through the Microsoft Purview portal.

#### Copilot and AI-powered agents

Copilot is Microsoft 365’s built-in AI assistant, designed to help users work smarter by applying the power of large language models and organizational data. It plays a dual role in the Microsoft 365 ecosystem, as both a core service component, and as the platform-wide intelligence engine. Copilot's role in the Intelligence Layer is examined in the next section.

As a core service component, Copilot is deeply integrated across Microsoft 365 apps and services, providing the following features:

*   **Contextual assistance**. Copilot understands the context of your work—whether you’re drafting an email in Outlook, summarizing a Teams meeting, or searching for documents in SharePoint. It can answer questions, suggest next steps, and surface relevant information from across your organization.
*   **Content generation**. In Word, PowerPoint, and Outlook, Copilot can help draft documents, create presentations, and compose emails based on prompts, existing files, or meeting notes.
*   **Workflow automation**. Copilot can automate repetitive tasks, such as summarizing meeting transcripts, generating action items, or creating reports from data in Excel or SharePoint.
*   **Personalized insights**. By utilizing Microsoft Graph, Copilot tailors its responses and recommendations to each user’s role, recent activity, and organizational context.

Keep in mind that Copilot is more than just a single assistant. It’s part of a broader ecosystem of AI-powered agents that can act on behalf of users, automate tasks, and deliver personalized support across Microsoft 365 apps and services.

Agents in Microsoft 365 are intelligent, task-oriented digital helpers that can perform actions, answer questions, and automate workflows based on user intent. Agents can be general-purpose (like Copilot) or specialized for certain roles, departments, or business processes.

Agents in Microsoft 365 are designed to make work easier and more efficient by proactively assisting users with a wide range of tasks. By understanding user intent, context, and organizational data, agents can deliver timely support, automate routine processes, and provide personalized recommendations. Whether interacting through natural language or responding to specific triggers, agents help users stay productive and focused on what matters most. The following list describes several key ways in which agents help users:

*   **Task automation**. Agents can automate repetitive or complex tasks, such as scheduling meetings, generating reports, or managing approvals. For example, an agent can monitor a SharePoint library and automatically notify a team when a new document is uploaded, or kick off an approval workflow in Teams.
*   **Personalized assistance**. Agents use context from Microsoft Graph to provide tailored recommendations, reminders, and next steps. For instance, an agent can remind a user to follow up on an email, summarize recent activity in a project, or suggest relevant files for an upcoming meeting.
*   **Conversational interaction**. Users can interact with agents using natural language. They can type or speak requests in Teams, Outlook, or other Microsoft 365 apps. Agents understand intent and can take action, answer questions, or guide users through processes.
*   **Extensibility**. Organizations can build custom agents using Microsoft Copilot Studio, enabling automation and support for unique business scenarios. These custom agents can integrate with line-of-business systems, respond to specific triggers, and deliver organization-specific expertise.

For IT professionals, Copilot and agents are managed through Microsoft 365 admin centers, with controls for data access, compliance, and responsible AI usage. Admins can configure how Copilot interacts with organizational data, ensuring privacy and security are maintained.

### Copilot - The Intelligence Layer engine

While Copilot is embedded in Microsoft 365’s core services, it also acts as the engine for the Intelligence Layer in Microsoft 365. It’s here where Copilot and other AI-powered agents operate as intelligent assistants. They utilize organizational data, user context, and advanced language models to deliver personalized support and automation.

Unlike the embedded Copilot features in individual apps like Word or Teams, the Intelligence Layer represents the underlying architecture that powers these experiences. It connects signals from across Microsoft 365 through the Microsoft Graph data layer to understand user intent, organizational relationships, and workflow patterns.

In turn, Microsoft Graph respects Microsoft 365’s built-in security and compliance controls, ensuring that Copilot only accesses and returns data the user is authorized to view. In doing so, Graph honors role-based access, sensitivity labels, and conditional access policies, so that personalized insights and automation are delivered securely and in alignment with organizational governance.

Copilot provides the following key functions within the Intelligence Layer:

*   **Contextual intelligence**. Copilot uses data from emails, documents, meetings, chats, and calendars to understand what users are working on and what they need next. From this information, Copilot can generate proactive suggestions, such as surfacing relevant files before a meeting or summarizing recent project activity.
*   **Cross-service automation**. AI agents can automate tasks that span multiple services. For example, an agent might extract action items from a Teams meeting, create tasks in Planner, and notify stakeholders through Outlook—all without manual intervention.
*   **Personalized recommendations**. By analyzing user roles, recent activity, and collaboration history, Copilot delivers tailored insights. For example, reminding a user to follow up on a message or suggesting documents for review based on upcoming deadlines.
*   **Conversational interaction**. Users can engage with Copilot and agents using natural language across apps. Whether typing in Teams or speaking in Outlook, the Intelligence Layer interprets intent and executes tasks accordingly.
*   **Extensibility with Copilot Studio**. Organizations can build custom agents that integrate with line-of-business systems, respond to specific triggers, and support unique workflows. These agents extend the Intelligence Layer to meet specialized business needs.
*   **Governance and control**. IT admins manage Copilot and agents through Microsoft 365 admin centers, configuring data access, compliance boundaries, and responsible AI settings to ensure secure and ethical use.

Note

Copilot and agents are examined in greater detail in a later module.

### Security and compliance

Security and compliance are foundational to Microsoft 365’s design. The platform includes a comprehensive set of tools to help organizations protect data, manage risk, and meet regulatory requirements. These tools are unified under Microsoft Purview, which provides a centralized console for data governance, compliance management, and risk mitigation.

Microsoft 365 supports a zero-trust security model, where access is granted based on user identity, device health, location, and behavior. Conditional Access policies in Microsoft Entra ID allow administrators to enforce multifactor authentication (MFA), block access from risky locations, or require compliant devices. Microsoft Defender XDR, which includes Microsoft Defender for Office 365, provides protection against phishing, malware, and business email compromise across Microsoft 365 collaboration tools.

On the compliance side, Microsoft Purview enables organizations to classify and protect sensitive data using sensitivity labels. These labels can apply encryption, watermarking, and access restrictions automatically. DLP policies can detect and block the sharing of sensitive information like credit card numbers or health records. Features like eDiscovery, audit logs, and retention policies help organizations respond to legal requests and maintain data integrity.

Copilot operates within the robust security and compliance framework of Microsoft 365. It respects data access permissions, applies DLP and sensitivity labels, and logs interactions for auditing. Admins can manage Copilot’s access to organizational data, ensuring that AI-powered assistance aligns with compliance requirements.
