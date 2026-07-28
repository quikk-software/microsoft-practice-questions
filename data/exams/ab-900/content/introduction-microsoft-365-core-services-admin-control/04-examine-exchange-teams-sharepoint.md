---
title: "Examine Microsoft Exchange, Teams, and SharePoint"
url: "https://learn.microsoft.com/en-us/training/modules/introduction-microsoft-365-core-services-admin-control/4-examine-exchange-teams-sharepoint"
uid: "learn.wwl.introduction-microsoft-365-core-services-admin-controls.examine-exchange-teams-sharepoint"
module: "introduction-microsoft-365-core-services-admin-control"
moduleTitle: "Introduction to Microsoft 365 core services and admin controls"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Examine Microsoft Exchange, Teams, and SharePoint

Configuring Microsoft 365’s core collaboration services—Exchange Online, Teams, and SharePoint Online—is essential for enabling secure, efficient, and seamless communication and teamwork across an organization. These services form the backbone of modern workplace communication, collaboration, and content management. As such, their initial setup lays the groundwork for secure, efficient, and scalable operations. Understanding the configuration process is essential not only for enabling basic functionality but also for enforcing organizational policies, compliance requirements, and user experience standards.

The configuration journey includes the following services:

*   **Exchange Online**. Handles email, calendaring, and mail flow for the organization. Administrators must provision mailboxes, set up mail routing, and apply security policies to protect sensitive information.
*   **SharePoint Online**. Provides the platform for document management, team collaboration, and intranet portals. Its configuration involves site provisioning, library setup, and permission management to ensure that users can access and share content securely.
*   **Microsoft Teams**. Brings together chat, meetings, calls, and app integrations. Its setup requires careful planning of team structures, channel organization, and policy enforcement.

Each of these services has its own unique configuration requirements and best practices. When administrators become proficient in setting up these services, such as creating mailboxes, provisioning SharePoint sites, and configuring Teams policy configuration, they help ensure the Microsoft 365 environment is robust, compliant, and prepared to support the evolving needs of the organization.

The following sections introduce the configuration processes for each of these core Microsoft 365 services.

### Microsoft Exchange Online configuration

Microsoft Exchange Online is the enterprise-grade email and calendaring solution at the heart of Microsoft 365. It provides secure, cloud-based mailboxes for users, enabling seamless communication both within and outside the organization. Exchange Online is designed to support large-scale deployments, offering robust features for mailbox management, mail flow control, and integration with other Microsoft 365 services.

![Screenshot of the Exchange admin center home page.](../../wwl/introduction-microsoft-365-core-services-admin-control/media/exchange-home-page.png)

Administrators are responsible for provisioning user mailboxes, configuring shared and resource mailboxes, and managing mail flow rules that enforce organizational policies. Exchange Online supports advanced security and compliance capabilities, such as retention policies, litigation hold, and data loss prevention (DLP), which help organizations meet regulatory requirements and safeguard sensitive information. The service also integrates with Microsoft Entra ID for identity management, ensuring that access to mailboxes and resources is tightly controlled.

Beyond basic email functionality, Exchange Online enables collaboration through shared calendars, distribution groups, and integration with Outlook and Teams. Administrators can automate mailbox provisioning, delegate access, and monitor usage through the Exchange admin center (EAC) or PowerShell. Understanding these foundational concepts is essential for configuring Exchange Online to meet the needs of diverse user groups and business scenarios.

To update Exchange Online settings, admins must be assigned one of the following roles or role groups:

*   **Global administrator**. Full access across Microsoft 365, including Exchange Online, but should be used sparingly for security.
*   **Exchange administrator**. Manages mailboxes, mail flow, and anti-spam policies.
*   **Organization Management role group**. Grants access to most Exchange Online features through the Exchange Admin Center (EAC) or PowerShell.

Exchange Online uses RBAC roles such as:

*   **Role Management**. Allows creation and modification of role groups.
*   **View-Only Organization Management**. For helpdesk-style access.

Admins can manage these roles in the EAC under **Roles > Admin roles** or through PowerShell. For everyday business users, end-user roles are assigned through role assignment policies, which allow users to:

*   Manage their own mailbox settings.
*   Create and manage distribution groups they own.
*   Access Outlook on the web and mobile apps

These roles aren’t assigned directly to users. Instead, they're bundled into role assignment policies that are managed by admins in the EAC.

#### Mailbox creation

Mailbox creation is the first and most fundamental step in configuring Exchange Online. Every user who needs email access must have a mailbox, which is automatically provisioned when a user is assigned an Exchange Online license. In addition to standard user mailboxes, administrators can create shared mailboxes for group communication and resource mailboxes for rooms and equipment.

*   **User mailboxes**. Assigning an Exchange Online license to a user in the Microsoft 365 admin center triggers automatic mailbox provisioning. The mailbox is accessible through Outlook on the web, desktop, and mobile, and comes with a default quota (for example, 50GB or 100GB). Administrators can customize mailbox settings, such as language, time zone, and mailbox features, to suit user needs. For example, a new employee joining the organization is assigned an Exchange Online Plan 2 license, which creates their mailbox with a 100-GB quota and enables advanced features like archiving and retention.
*   **Shared mailboxes**. Shared mailboxes are designed for scenarios where multiple users need access to a common email address, such as **support@contoso.com** or **info@contoso.com**. These mailboxes don’t require a separate license unless users access them with mobile devices. Administrators create shared mailboxes in the Exchange admin center, assign permissions to relevant users, and configure send-as or send-on-behalf rights. For instance, the helpdesk team can collectively manage incoming support requests through a shared mailbox, ensuring timely responses and accountability.
*   **Resource mailboxes**. Resource mailboxes are used to manage rooms and equipment, such as conference rooms, projectors, or company vehicles. These mailboxes can be configured to automatically accept or decline meeting requests based on availability, enforce booking policies, and send automated responses. Administrators set up resource mailboxes in the EAC, define scheduling options, and assign delegates if manual approval is required. For example, a “Conference Room A” mailbox can be configured to automatically accept booking requests, allowing users to reserve the room directly from Outlook without administrative intervention.

#### Mail flow and policies

Mail flow configuration ensures that email is routed efficiently and securely within and outside the organization. Administrators must define transport rules, accepted domains, and connectors to enforce policies and integrate with external systems.

*   **Transport rules**. Transport rules (also known as mail flow rules) allow administrators to inspect email content, headers, and attachments to enforce organizational policies. These rules can block or encrypt sensitive emails, redirect messages, or append disclaimers. For example, a transport rule can be created to block emails with executable attachments for all users, reducing the risk of malware infections. Another rule might automatically encrypt emails containing credit card numbers using Microsoft Purview DLP policies, ensuring compliance with organizational security standards.
*   **Accepted domains and connectors**. Accepted domains define the email domains that Exchange Online can handle for an organization. Administrators add domains in the EAC and verify ownership to enable mail flow. Connectors are used to route email between Exchange Online and on-premises servers or non-Microsoft systems. For instance, adding “contoso.com” as an accepted domain allows users to send and receive email using that domain, while configuring a connector enables hybrid mail flow with an on-premises Exchange server.

#### Security and compliance

Security and compliance are critical aspects of Exchange Online configuration. Administrators must apply retention policies, enable litigation hold, and configure DLP to protect sensitive information and meet regulatory requirements.

*   **Retention Policies**. Retention policies help organizations manage the lifecycle of email data by specifying how long messages are retained before deletion. Administrators create retention tags and policies in the EAC, assign them to mailboxes, and monitor compliance. For example, a policy might require that deleted emails are retained for 30 days before permanent deletion, allowing users to recover messages if needed and ensuring compliance with legal requirements.
*   **Litigation Hold**. Litigation hold preserves all email content in a mailbox, including deleted items and original versions, for legal discovery purposes. Administrators enable litigation hold in the EAC, specify hold duration, and monitor mailbox activity. For instance, placing the CEO’s mailbox on litigation hold during an internal investigation ensures that all relevant communications are retained and accessible for review.

### SharePoint Online configuration

SharePoint Online is Microsoft 365’s platform for content management, collaboration, and intranet portals. It empowers organizations to create secure sites for teams, departments, and projects, facilitating document sharing, workflow automation, and knowledge management. SharePoint’s flexible architecture allows for the creation of team sites, communication sites, and custom solutions tailored to specific business requirements.

![Screenshot of a SharePoint hub home page.](../../wwl/introduction-microsoft-365-core-services-admin-control/media/sharepoint-hub-example.png)

Administrators play a key role in provisioning new sites, configuring document libraries, and managing permissions to ensure that users have appropriate access to resources. SharePoint Online supports advanced features such as versioning, metadata tagging, and real-time co-authoring, which enhance collaboration and streamline document management. Integration with Microsoft Entra ID enables granular access control, while external sharing policies help balance collaboration with organizational security standards.

In addition to document management, SharePoint Online offers powerful tools for building custom lists, automating business processes with Power Automate, and integrating with other Microsoft 365 services like Teams and OneDrive. Administrators must understand how to configure site templates, manage storage quotas, and monitor site activity to optimize performance and compliance. A solid understanding of these concepts ensures that SharePoint Online functions as a reliable foundation for organizational collaboration and data lifecycle management.

To configure SharePoint Online, admins must be assigned one of the following roles:

*   **Global administrator**. Full access across Microsoft 365, including SharePoint Online, but should be used sparingly for security.
*   **SharePoint administrator**. Manages site collections, permissions, and sharing policies.

Admins manage SharePoint roles in the SharePoint Admin Center. Access to SharePoint Online by everyday business users is governed by:

*   **Microsoft 365 group membership**. Users added to a group automatically gain access to the associated SharePoint site.
*   **Site-level permissions**. Users can be assigned roles such as:
    *   Visitor (read-only access)
    *   Member (edit access)
    *   Owner (full control over the site)

Admins configure these permissions during site provisioning and library setup.

#### Site provisioning

Site provisioning is the process of creating new SharePoint sites to support collaboration, document management, and information sharing. Administrators must choose the appropriate site type, configure settings, and apply templates to meet organizational needs.

*   **Team sites**. Team sites are designed for group collaboration and are automatically linked to Microsoft 365 Groups. When a team site is created, it provisions a shared document library, group mailbox, and calendar. Administrators can customize site navigation, add web parts, and configure permissions to support departmental or project-based work. For example, the Marketing department’s team site includes a shared library for campaign assets, a calendar for planning events, and a group mailbox for team communication.
*   **Communication sites**. Communication sites are intended for broadcasting information to a wide audience, such as company news, policies, or training materials. These sites feature visually rich layouts, customizable pages, and web parts for multimedia content. Administrators provision communication sites for HR, executive communications, or organizational announcements. For instance, the HR department’s communication site hosts onboarding materials, benefits information, and policy documents accessible to all employees.
*   **Site templates**. SharePoint offers built-in templates for common scenarios, such as document centers, project management, or knowledge bases. Administrators select templates based on business requirements, customize site structure, and configure features like versioning and metadata. Deploying a project site template for a cross-functional initiative provides a structured environment for managing tasks, documents, and communications. For example, an administrator can deploy a project site template in SharePoint for supporting a cross-functional initiative, providing a structured space for managing tasks, storing documents, and facilitating team communication. The site can be customized with versioning, metadata, and permissions to align with specific project needs.

#### Document libraries and lists

Document libraries and lists are core components of SharePoint sites, enabling structured storage, collaboration, and automation.

*   **Library configuration**. Document libraries store files and support features like versioning, metadata tagging, and real-time co-authoring. Administrators configure libraries to enable version history, set metadata fields, and define content types. For example, the Contracts library in the Legal department is configured with versioning to track changes, metadata fields for contract type and expiration date, and content approval workflows to ensure compliance.
*   **Custom lists**. Lists provide structured data storage for scenarios like issue tracking, asset inventories, or contact management. Administrators create custom lists, define columns, and apply formatting to support business processes. Power Automate can then be used to trigger workflows based on list activity, such as sending notifications or updating records. An asset inventory list might include columns for serial number, location, and status, with automated alerts for maintenance or replacement. For example, an administrator can create a custom asset inventory list in SharePoint with columns for serial number, location, and status. Using Power Automate, the list can trigger automatic email alerts when an asset is marked for maintenance or replacement, streamlining equipment management

#### Permissions and sharing

Managing permissions and sharing settings is essential for securing content and enabling collaboration in SharePoint Online.

*   **Access Control**. Permissions can be assigned at the site, library, folder, or item level using SharePoint groups or Microsoft Entra ID. Administrators define roles such as Owner, Member, or Visitor, and configure access based on business needs. For example, all employees might have “Read” access to the HR site, while only HR staff have “Edit” permissions for sensitive documents.
*   **External Sharing**. External sharing policies determine how users can share content with people outside the organization. Administrators can allow guest access for specific sites, require authentication for shared links, and set expiration dates for access. For instance, a project site collaborating with a partner organization might allow guest access, while sensitive sites like Finance restrict external sharing entirely.
*   **Permission inheritance**. By default, SharePoint uses a hierarchical permission model where objects (like folders or documents) inherit permissions from their parent container (such as a library or site). This design means that if a library grants access to a group of users, all folders and items within that library automatically share the same access—unless inheritance is broken. Administrators can break inheritance to apply unique permissions at any level. For example, a folder within a library can have restricted access even if the parent library is open to all site members.

SharePoint’s sharing links allow users to collaborate easily by sending View or Edit access to documents, folders, or entire libraries—even to people outside the organization. These links can be configured with expiration dates, password protection, and specific permission levels (such as View-only or Edit access). This flexibility means users can share content quickly without needing admin help, while still ensuring that sensitive information is protected. For example, a user can share a document with a vendor for review, set the link to expire in 7 days, and restrict editing. Doing so gives the vendor just enough access to collaborate without compromising security.

### Microsoft Teams configuration

Microsoft Teams is the central hub for teamwork in Microsoft 365, bringing together chat, meetings, calls, and app integrations in a unified platform. Teams enables users to collaborate in real time, share files, and communicate across devices, making it an essential tool for modern workplaces. The service is built on Microsoft 365 Groups and integrates deeply with SharePoint, Exchange, and OneDrive to provide a seamless experience.

Administrators are responsible for creating and managing teams and channels, configuring policies that govern meetings, messaging, and app usage, and ensuring compliance with organizational standards. Teams supports various channel types, such as standard, private, and shared, allowing for flexible collaboration structures. Policy configuration is critical for controlling features such as meeting recording, guest access, and non-Microsoft app integration, which can impact both productivity and security.

Beyond basic collaboration, Teams offers extensibility through tabs, connectors, and bots, enabling organizations to integrate business applications and automate workflows. Administrators must be adept at managing app permissions, monitoring usage analytics, and troubleshooting issues to maintain a productive and secure Teams environment. A thorough understanding of Teams configuration empowers IT professionals to support dynamic collaboration while enforcing governance and compliance.

To update Teams settings and policies, admins require:

*   **Global administrator**. Full access across Microsoft 365, including Microsoft Teams, but should be used sparingly for security.
*   **Teams administrator**. Manages team creation, policies, and app integrations.

Admins manage Teams roles in the Teams Admin Center. Delegate permissions can be modified directly in Teams under **Settings > Delegation > Manage Delegates**.

Teams access by everyday business users is also tied to Microsoft 365 group membership. When users are added to a team, they automatically gain access to:

*   Team chats and channels
*   Shared files stored in SharePoint
*   Integrated apps and calendars

No elevated roles are needed unless the user is expected to manage team settings or policies.

#### Teams and channels

Teams and channels are the organizational units within Microsoft Teams that structure collaboration and communication. Administrators must plan team creation, channel organization, and membership to support business processes and project workflows.

*   **Team creation**. A team can be manually created by users or administrators, or it can be automatically created when a Microsoft 365 group is provisioned through methods that include team creation, such as when a group is created from within Microsoft Teams. Each team includes channels for organizing conversations, files, and apps. Administrators define team settings, membership, and privacy options (public or private). For example, a “Product Development” team is created with channels for Design, Engineering, and QA, each supporting focused collaboration and resource sharing.
*   **Channel management**. Channels can be standard (open to all team members), private (restricted to selected members), or shared (across multiple teams). Administrators organize channels by topic, project, or function, and configure settings such as moderation, posting permissions, and tabs for apps. Adding a private channel for leadership discussions within the Product Development team ensures confidentiality and targeted communication. For example, creating a private channel within the Product Development team for leadership discussions ensures that sensitive topics remain confidential and only accessible to designated members. Administrators can further tailor the experience by configuring posting permissions and adding relevant tabs for quick access to key resources.

#### Policy configuration

Policy configuration in Teams is essential for controlling features, enforcing compliance, and optimizing user experience. Administrators use policies to manage meetings, messaging, and app integrations.

*   **Meeting policies**. Meeting policies define what features are available during Teams meetings, such as recording, transcription, and anonymous join. Administrators create policies in the Teams Admin Center, assign them to users or groups, and monitor compliance. For example, a policy might allow meeting recording for managers but restrict it for general staff, balancing productivity with privacy concerns.
*   **Messaging policies**. Messaging policies control chat features, file sharing, and app usage within Teams. Administrators can enable or disable features like GIFs, stickers, and external chat, and set restrictions based on compliance requirements. Disabling GIFs and stickers in chats for regulated departments helps maintain professionalism and adhere to organizational standards.
*   **App permissions**. App permissions determine which non-Microsoft and custom apps can be used in Teams. Administrators approve or block apps, configure integration settings, and monitor usage. Allowing integration with Planner and Power BI enhances collaboration, while blocking unapproved non-Microsoft apps reduces security risks.

#### Integration and automation

Integration and automation extend the functionality of Teams, enabling organizations to streamline workflows and enhance productivity.

*   **Tabs and connectors**. Tabs allow users to pin apps like SharePoint, OneNote, and Power BI within channels, providing quick access to resources and dashboards. Connectors enable integration with external services, such as project management tools or CRM systems. For example, pinning a SharePoint document library and a Power BI dashboard in the 'Project Status' channel centralizes information and supports data-driven decision-making. This setup allows team members to access key resources and visualize project metrics without leaving Teams, while connectors pull in updates from tools like Trello or Salesforce to enhance collaboration.
*   **Bots and workflows**. Bots automate routine tasks and provide interactive experiences within Teams. Administrators can deploy bots for helpdesk support, HR inquiries, or project management. Power Automate enables workflow automation, such as routing approval requests or sending notifications based on channel activity. Deploying a helpdesk bot in Teams streamlines IT support and improves response times. For example, a helpdesk bot in Microsoft Teams can automatically respond to common IT support questions, while a Power Automate workflow routes unresolved issues to the appropriate technician for follow-up.
