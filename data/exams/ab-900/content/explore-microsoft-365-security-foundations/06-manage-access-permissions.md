---
title: "Manage access and permissions in Microsoft 365"
url: "https://learn.microsoft.com/en-us/training/modules/explore-microsoft-365-security-foundations/6-manage-access-permissions"
uid: "learn.wwl.explore-microsoft-365-security-foundations.manage-access-permissions"
module: "explore-microsoft-365-security-foundations"
moduleTitle: "Explore Microsoft 365 security foundations"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Manage access and permissions in Microsoft 365

Once a user’s identity is verified through authentication, the next crucial question is: What are they allowed to do? The answer lies in authorization, which governs what users are permitted to access and do within Microsoft 365. Authorization is the process of granting or restricting access to resources like email, files, apps, and administrative settings. Effective authorization ensures that users have access only to the tools and data they need to do their job—nothing more, nothing less.

Microsoft 365 offers a layered and flexible approach to managing access and permissions. Administrators can assign roles that grant broad capabilities across the tenant, such as Global Administrator or Teams Administrator. They can also apply resource-specific permissions, such as granting read-only access to a single SharePoint document or editing rights to a Teams channel. For more dynamic and context-aware control, Conditional Access policies can be used to apply access restrictions based on device compliance, sign-in location, risk level, or app sensitivity.

To simplify permission management, Microsoft 365 uses security objects such as users and groups. Groups allow admins to assign permissions to multiple users at once, reducing complexity and improving consistency. There are several types of groups available—including security groups, Microsoft 365 groups, mail-enabled groups, and dynamic groups—each with its own purpose and behavior. Understanding when and how to use each group type is essential for building a secure, scalable, and well-organized Microsoft 365 environment.

The following sections explore how Microsoft 365 controls access through a combination of roles, permissions, and security groups. You start with how authorization works, then dive into the different types of users and groups, and how they’re used to manage access efficiently and securely across your organization.

### Authorization in Microsoft 365

After authentication confirms a user’s identity, the next step is authorization, which determines what that user is allowed to do. In Microsoft 365, authorization controls access to services, data, and actions based on assigned roles, permissions, group memberships, and resource-specific settings. It ensures that users only see or interact with what they’re meant to, enforcing the principle of least privilege.

##### Role-based access control

Microsoft 365 uses Role-based access control (RBAC) as a central mechanism for authorization. With RBAC, users are assigned to roles that grant specific administrative or functional rights. These roles are built into Microsoft Entra ID and are service-specific. For example, the Global Administrator role grants full control over all Microsoft 365 settings and services. It's typically limited to a few trusted individuals. Other roles include Exchange Administrator (email services), SharePoint Administrator, Teams Administrator, User Administrator, and many more. Each role has a well-defined scope and permission set. You can also create custom roles for more fine-tuned access control.

##### Group-based permissions and resource-specific access controls

For non-administrative users, most access in Microsoft 365 is assigned through group-based permissions or resource-specific access controls. For example, adding a user to a Microsoft 365 Group grants them access to that group’s shared resources, such as a shared mailbox in Outlook, a calendar, a SharePoint site, and a Planner board. These types of permissions aren’t tied to global administrative roles (like SharePoint Administrator), but instead relate to specific resources within the Microsoft 365 environment. In other words, you're granting a user or group the ability to read, edit, or manage a particular resource, independent of their administrative role in the tenant.

SharePoint is a good example of how resource-specific permissions work, as permissions can be assigned at multiple levels: site, document library, folder, or even individual files. SharePoint offers built-in roles like Visitor (read-only), Member (edit), and Owner (full control), which can be assigned to users or groups depending on what level of access they need.

For example, consider a user named Sarah who is part of the Microsoft 365 Group titled "Marketing Team." Her group membership gives her access to a team SharePoint site with editable content and a shared calendar. However, because she isn’t an administrator, she can’t change group settings or manage membership. Later, Sarah is temporarily added to another SharePoint site called "Event Planning" as a Visitor. Doing so gives her permission to view documents on that site, but not to edit or upload new content.

##### Advanced authorization scenarios

More advanced authorization scenarios in Microsoft 365 go beyond simple role assignments and group memberships.

*   **Conditional Access**. One of the most powerful authorization tools is Conditional Access, which dynamically applies access rules based on factors like sign-in risk, device compliance, user location, or the sensitivity of the app or data being accessed. For instance, a Conditional Access policy could require MFA when users access financial data from a personal device, or block access to SharePoint entirely when logging in from a location outside the corporate network.
    
*   **Privileged Identity Management (PIM**). PIM offers another layer of control by enabling just-in-time access to administrative roles. This feature limits how long a user can hold elevated permissions, reducing the risk of misuse or attack. For example, an IT admin might be required to request access to the Exchange Administrator role for a specific task. With PIM, the system can automatically remove that access once the approved time window ends.
    
*   **Access packages**. Microsoft 365 also supports entitlement management through Access Packages, which allow organizations to bundle permissions across multiple resources and assign them with workflows and approval steps. This process is especially useful for onboarding new employees or external collaborators who need access to specific apps, Teams, or SharePoint sites for a limited time.
    
*   **Information protection and sensitivity labels**. These features integrate with authorization controls to restrict actions like printing, copying, or forwarding sensitive documents, even after access is granted. These labels enforce access policies at the content level, which means that authorization decisions follow the document, regardless of where it’s stored or who tries to open it.
    

Together, these advanced features allow organizations to move beyond simple "allow or deny" decisions and implement context-aware, time-limited, and data-sensitive access controls that align with Zero Trust principles.

### Users and groups in Microsoft 365

In Microsoft 365, users and groups are the core security objects used to manage access to apps, services, and data. Administrators must understand how these objects work and when to use each type, which is key to building an efficient and secure access model.

*   **Users**. A user in Microsoft Entra ID represents an individual identity. Each user has a unique username (also called the User Principal Name, or UPN), credentials, licenses, and assigned roles or group memberships. Users might be internal employees, external collaborators (guests), service accounts for automation, or even system-generated accounts for applications. Properties such as job title, department, office location, and manager can be used to organize or automate user management.
    
*   **Groups**. Groups provide a scalable way to assign access and permissions. Instead of granting access to individual users, admins assign users to groups and then grant permissions to the group. Doing so improves consistency and makes onboarding/offboarding much more efficient.
    

There are several types of groups in Microsoft 365, each designed for different use cases

##### Security groups

Used to assign permissions to resources such as SharePoint sites, Teams channels, Exchange mailboxes, and Conditional Access policies. These groups are focused only on controlling access. They don’t create shared tools like mailboxes or file storage. For example, adding users to a security group called "Finance Read Only" might give them view access to a confidential SharePoint library, but the group itself doesn’t come with its own mailbox or calendar.

##### Microsoft 365 groups

Microsoft 365 groups are designed to support collaboration across Microsoft 365 apps. When you create a Microsoft 365 Group, it automatically sets up a collection of shared resources for the group members, including:

*   A shared mailbox in Outlook
*   A group calendar
*   A SharePoint document library for file sharing
*   A Planner board for task management
*   An optional connected Microsoft Teams workspace

Microsoft 365 groups make it easy for team members to communicate, share files, coordinate schedules, and manage tasks, all with a single group identity. Permissions are managed at the group level, so when you add a user to the group, they automatically gain access to all associated resources.

For example, let’s assume you created a Microsoft 365 group for a "Marketing Team.” This group gives that team a shared Outlook mailbox, a calendar for campaign planning, a SharePoint site for storing marketing assets, a Planner board to track tasks, and a connected Team in Microsoft Teams for real-time chat and meetings. All these resources are automatically linked and ready to use.

##### Mail-Enabled Security groups

These groups function like Security groups, but they can also be used as email distribution lists. They enable you to control access and email the group. They work just like regular Security groups because you can use them to assign permissions to resources like SharePoint sites, Exchange mailboxes, or Teams.

However, because they can also receive emails like a distribution list, you can send an email to the group, and all members receive it. For example, a "Finance Managers" group has edit access to a budget SharePoint site and receives monthly financial updates through email.

##### Distribution groups

While Mail-Enabled Security groups provide both security and distribution lists for email, Distribution Groups only provide distribution lists for email. These groups are designed purely for sending messages to multiple users at once, like an email list, without giving the users any shared access. They can’t be used to assign permissions to Microsoft 365 resources. An example of a Distribution group would be a "Company Announcements" group used by HR to send all-staff updates.

##### Dynamic groups

Dynamic groups are automatically populated based on user attributes, such as department, location, job title, or other properties stored in Microsoft Entra ID. As such, users are automatically added to or removed from the group whenever their profile changes. There’s no need for an admin to manage group membership manually. For example, let’s say that you create a dynamic group that includes all users where “Department = Sales.” In doing so, Microsoft Entra ID automatically adds or removes users from the group as their Department field is updated. No admin action is required.

Dynamic groups are especially useful in larger organizations or environments where users frequently change roles, join, or leave the company. Dynamic groups can be created as either Security groups (used for assigning permissions) or Microsoft 365 groups (used for collaboration). However, dynamic membership is based only on user attributes. You can’t manually add or remove individual users from a Dynamic group.

### Group administration

Administrators can manage users and groups using several tools within the Microsoft 365 ecosystem, depending on their needs and level of expertise.

*   **Microsoft 365 admin center**. For day-to-day group tasks, such as creating a new group, adding or removing members, or adjusting settings, the Microsoft 365 admin center offers a user-friendly, web-based interface. This tool is ideal for IT staff handling small to medium-sized environments or performing basic administrative tasks.
    
*   **Microsoft Entra admin center**. For more advanced identity and access management, especially in hybrid environments or organizations with complex security requirements, the Microsoft Entra admin center provides more granular control. Here, admins can configure group membership rules for Dynamic Groups, enforce Conditional Access policies tied to group membership, and view audit logs or sign-in activity to monitor group-based access behavior.
    
*   **PowerShell and Microsoft Graph API**. In enterprise scenarios where changes happen at scale or need to be automated, tools like PowerShell and the Microsoft Graph API become essential. For example, a PowerShell script can be used to add a list of users to a Security group in one operation—saving time and reducing manual errors. Similarly, Microsoft Graph can be used to integrate group management into HR systems. An organization might automatically update project teams in Microsoft 365 based on changes in a Human Resources database. Doing so ensures that when someone joins or leaves a department, their group memberships (and therefore their access to tools and data) are adjusted without manual intervention.
    

Proper use of groups not only reduces administrative overhead but also helps maintain security and compliance. Instead of assigning permissions to users individually—which can lead to inconsistencies and gaps—groups allow access to be controlled at scale. For instance, a Microsoft 365 group created for the “Marketing Team” might grant access to a shared mailbox, calendar, SharePoint site, and Planner board. When a new team member is added to the group, they automatically receive access to all those resources. When they leave the team and are removed from the group, their access is revoked—simplifying offboarding and reducing the risk of lingering permissions.

As a best practice, organizations should align group membership with business roles, departments, or projects. For example:

*   **Departmental groups** like "Finance Team" or "HR Staff" can be used to grant access to confidential documents or sensitive applications.
    
*   **Project-based groups** like "Product Launch Q1" can be used to enable collaboration among cross-functional teams for a limited time.
    
*   **Dynamic groups** can automatically include users where the “Department” attribute equals “Sales,” ensuring real-time alignment with user roles.
    

Organizations that thoughtfully plan group structures and maintain clean, up-to-date memberships can build a secure, scalable, and easy-to-manage access model in Microsoft 365.
