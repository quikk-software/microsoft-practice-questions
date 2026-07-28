---
title: "Assign admin roles using Role-Based Access Control"
url: "https://learn.microsoft.com/en-us/training/modules/introduction-microsoft-365-core-services-admin-control/6-assign-admin-roles"
uid: "learn.wwl.introduction-microsoft-365-core-services-admin-controls.assign-admin-roles"
module: "introduction-microsoft-365-core-services-admin-control"
moduleTitle: "Introduction to Microsoft 365 core services and admin controls"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Assign admin roles using Role-Based Access Control

In any modern organization, especially those using Microsoft 365, the ability to delegate administrative responsibilities securely is essential for both operational efficiency and risk management. As organizations grow, so does the complexity of their IT environments, making it impractical—and unsafe—for a single administrator to manage all aspects of security, compliance, and service configuration. Role-Based Access Control (RBAC) provides a structured approach to distributing these responsibilities, ensuring that each administrator only has the permissions necessary to perform their specific tasks.

RBAC in Microsoft 365 is built around the principle of least privilege, which means users and admins are granted only the access they need—nothing more, nothing less. Least privilege minimizes the risk of accidental or malicious changes, helps organizations meet compliance requirements, and supports the separation of duties. For example, a helpdesk technician might be given the ability to reset passwords but not to manage compliance policies or access sensitive data. By using role-based access control, organizations can create a clear, auditable structure for administrative access, reducing the likelihood of privilege abuse or configuration errors.

### RBAC and admin roles

Role-Based Access Control (RBAC) is a security model that restricts system access to authorized users based on their organizational role. In Microsoft 365, RBAC is implemented through a combination of built-in and custom admin roles, each with a defined set of permissions. This approach allows organizations to align administrative privileges with job responsibilities, ensuring that only qualified personnel perform sensitive operations.

For example, consider a scenario where your organization has separate teams for IT support, compliance, and communications. The IT support team needs to manage user accounts and devices, the compliance team needs access to audit logs and data loss prevention policies, and the communications team manages Teams and Exchange settings. By assigning each team the appropriate admin roles, you ensure that no single group has excessive control, and that each team can work independently within their area of responsibility.

RBAC also supports the separation of duties, a key security principle that prevents any one individual from having unchecked power. For instance, the person who approves financial transactions shouldn't be the same person who processes them. In Microsoft 365, this delegation of permissions can be enforced by assigning different roles to different users, such as separating the “Global Administrator” from the “Billing Administrator.” Doing so reduces the risk of fraud or error and supports compliance with regulatory standards.

### Assign predefined admin roles

Assigning predefined admin roles is the most common way to delegate administrative tasks in Microsoft 365. Microsoft provides a comprehensive set of built-in roles, each tailored to specific administrative functions. These roles are designed to cover the most common scenarios, such as managing users, resetting passwords, administering Exchange or Teams, and overseeing compliance settings.

For example, if your organization hires a new Exchange administrator, you can assign them the “Exchange Admin” role. This role grants them access to all Exchange-related settings without giving them broader permissions over other services like SharePoint or Teams. Similarly, a “Teams Admin” can manage Teams policies and settings but can't access Exchange mailboxes or compliance features. This targeted approach helps prevent privilege creep, where users accumulate unnecessary permissions over time.

The Microsoft 365 admin center provides a user-friendly interface for assigning roles. You can search for users or groups, review the permissions associated with each role, and assign roles with just a few selections. For organizations with more advanced needs, PowerShell offers powerful automation capabilities for bulk assignments and reporting. For example, you might use PowerShell to assign the “Helpdesk Admin” role to all members of a specific security group, ensuring consistent access across your support team.

### Create and assign custom roles

While predefined roles cover most permission scenarios, some organizations require more granular control. Custom roles allow you to define specific permissions tailored to unique business needs. They’re especially useful when built-in roles are too broad or don’t perfectly align with your operational requirements.

For instance, you might have a contractor who needs read-only access to user profiles but shouldn’t be able to modify any settings. By creating a custom role in Microsoft Entra ID, you can select only the permissions required for the contractor’s tasks. Custom roles can also be scoped to specific groups, departments, or resources, further limiting their impact.

The process of creating custom roles involves defining the necessary permissions, assigning a scope, and then adding users or groups. This approach supports the principle of least privilege and helps organizations comply with regulatory requirements. For example, a healthcare organization might create a custom role that allows access to patient records only for authorized medical staff, ensuring compliance with government regulations.

Key steps for creating and assigning custom roles include:

*   **Define permissions for the custom role**. Start by identifying the exact permissions needed for the role. In Microsoft Entra ID, you can select from a wide range of permissions, such as reading directory data, managing devices, or administering specific applications. Carefully review each permission to avoid granting unnecessary access. For example, you need a role that allows users to view audit logs but not modify any settings. You create a custom role with the “Read Audit Logs” permission and exclude all write or modify permissions.
*   **Assign scope to the custom role**. Scoping limits the role’s permissions to specific groups, departments, or resources. This step is especially important in large organizations where different teams have distinct responsibilities. When you assign the scope for a custom role, you ensure that users can only perform actions within their designated area. For instance, the Marketing department needs to manage Teams channels for their projects. You create a custom role with Teams management permissions and scope it to the marketing group, preventing access to other departments’ Teams.
*   **Assign users or groups to the custom role**. Once the role is defined and scoped, assign it to the appropriate users or groups. Using groups simplifies ongoing management, as changes to group membership automatically update role assignments. For example, consider the scenario in which you created a project-based team to oversee a new product launch. You assign the custom “Project Admin” role to the project group, ensuring all team members have the necessary permissions during the project.

![Diagram showing how role-based access control works by using roles and role groups.](../../wwl/introduction-microsoft-365-core-services-admin-control/media/role-based-access.png)

### Delegate responsibilities securely

Secure delegation isn’t just about assigning roles. It’s about ensuring that permissions are granted thoughtfully, monitored continuously, and revoked when no longer needed. Effective delegation supports operational efficiency while minimizing the risk of privilege misuse or accidental changes.

Organizations should adopt a group-based approach to role assignment, regularly review role memberships, and document all role definitions and assignments. Monitoring admin activity through audit logs and alerts helps detect anomalies and supports compliance with internal policies and external regulations.

For example, if a helpdesk admin is temporarily assigned elevated permissions to resolve a critical issue, those permissions should be revoked as soon as the task is complete. Similarly, documenting the rationale for each role assignment ensures transparency and accountability, making it easier to respond to audits or security incidents.

Administrators should keep in mind the following best practices related to secure delegation:

*   **Use groups for role assignment.** Assigning roles to security groups rather than individuals streamlines management and reduces the risk of orphaned permissions. When a user joins or leaves a group, their role assignments are automatically updated, ensuring consistent access control. For example, the IT department manages user accounts for multiple offices. When it assigns the “User Admin” role to an “IT Support” group, all technicians receive the necessary permissions. When a technician leaves the team, removing them from the group instantly revokes their admin rights.
*   **Regularly review role assignments**. Scheduled reviews of role assignments help identify and remove unnecessary or outdated permissions. This proactive approach reduces the risk of privilege creep and ensures that only authorized users retain admin access. For instance, during a monthly audit, you find that a contractor still has the “SharePoint Admin” role after their contract ended. You remove the assignment, closing a potential security gap.
*   **Document role definitions and assignments**. Maintaining clear documentation of each role’s permissions and the rationale for assignments supports transparency and compliance. Documentation should include the purpose of the role, assigned users or groups, and any relevant policies or procedures. For example, before a compliance audit, you provide documentation showing that only members of the compliance team have access to sensitive audit logs, along with the justification for each assignment.

### Monitor and audit role assignments

Ongoing monitoring and auditing are essential for maintaining a secure and compliant environment. Microsoft 365 provides several tools for tracking role assignments, detecting changes, and investigating potential issues. Regular audits help ensure that role assignments remain appropriate and that any unauthorized changes are quickly identified and addressed.

By integrating monitoring and auditing into your role management processes, you can quickly detect and respond to potential security incidents, support compliance with regulatory requirements, and maintain a strong security posture.

Administrators should perform the following key steps to monitor and audit:

*   **Review audit logs in the Microsoft Purview portal**. The Microsoft Purview portal provides comprehensive audit logs of role changes and admin activities. Regularly reviewing these logs helps you detect unauthorized changes, investigate incidents, and demonstrate compliance during audits. For example, after a suspected security incident, you review audit logs to track all recent changes to admin roles, identifying the source of the unauthorized assignment.
*   **Track role assignments in the Entra Admin Center**. The Microsoft Entra Admin Center offers detailed views of current role assignments and access patterns. Use these tools to monitor who has admin roles, when assignments were made, and whether any unusual patterns emerge. For instance, you notice that a user was assigned the “Global Admin” role outside of normal business hours. Further investigation reveals that the assignment was legitimate, but you update your monitoring rules to flag similar events in the future.
*   **Set up automated alerts for critical role changes**. Automated alerts notify you of changes to high-risk roles, enabling rapid response to potential security threats. Configure alerts for assignments or removals of roles like “Global Admin,” “Compliance Admin,” or any custom roles with sensitive permissions. For example, consider the scenario in which an alert notifies you that the “Compliance Admin” role was removed from a key team member. You investigate and discover it was part of a planned role rotation, confirming that the change was authorized.

### Implementation best practices

Implementing RBAC effectively requires careful planning, testing, and ongoing management. Start with a pilot group to validate role assignments, use built-in templates to accelerate deployment, and educate users on the importance of role management. Automation tools like Power Automate can streamline role assignment and removal workflows, reducing manual effort and improving consistency.

For example, before rolling out a new custom role organization-wide, test it with a small group to identify any issues or unintended consequences. Use Microsoft’s recommended role templates for common scenarios and provide training to ensure that all admins understand the principles of least privilege and secure delegation.

Administrators should keep in mind the following best practices when implementing RBAC:

*   **Start with a pilot group**. Testing role assignments with a small, representative group helps identify potential issues before full deployment. Gather feedback from pilot users to refine roles and permissions, ensuring a smooth rollout. For example, _a_ pilot group tests a new “Helpdesk Admin” role. Feedback reveals that some permissions are too restrictive, so you adjust the role before assigning it to the entire support team.
*   **Use built-in templates for common scenarios**. Microsoft provides preconfigured role templates for common administrative tasks. Using these templates accelerates deployment, reduces complexity, and ensures alignment with best practices. For instance, you use the “Teams Admin” template to quickly assign the necessary permissions to a new communications manager, saving time and ensuring consistency.
*   **Educate users on role management**. Training admins and users on the principles of RBAC and the importance of least privilege fosters a culture of security and compliance. Provide clear guidance on how to request, assign, and remove roles, and emphasize the risks of over-privileging users. For example, you develop a training module on RBAC for all new IT staff, covering the process for requesting admin roles, the importance of regular reviews, and how to report suspicious activity.
