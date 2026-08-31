---
title: "Configure Dataverse teams for security"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/6a-teams"
uid: "learn-dynamics.get-started-security-roles.6a-teams"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Configure Dataverse teams for security

Using Microsoft Dataverse teams is optional. However, teams provide an easy way to share business objects and let you collaborate with other people across business units. Although a team belongs to one business unit, it can include users from other business units. You can associate a user with more than one team.

## Types of teams

*   **Owner team**: an _owner team_ owns records and has security roles assigned to the team. A user's privileges can come from their individual security roles, those of the teams that they're part of or the ones they inherit. A team has full access rights on the records that the team owns. Team members are added manually to the owner team.
    
*   **Access team**: an _access team_ doesn't own records and doesn't have security roles assigned to the team. The team members have privileges defined by their individual security roles and by roles from the teams they're members of. These members share records with an access team, and the team is granted access rights to the records. Access rights include Read, Write, and Append.
    
*   **Microsoft Entra ID group team**: Similar to owner teams, a _Microsoft Entra ID group team_ can own records and can have security roles assigned to the team. Security and Office are two group team types, and they correspond directly to Microsoft Entra ID group types. Group security roles can be assigned only for a specific team or for a team member with user privileges that include members' privilege inheritance. Team members are dynamically derived (added and removed) when they access an environment based on their Microsoft Entra ID group membership.
    

Note

You can assign security roles directly to owner teams and Microsoft Entra ID group teams and users. The environment picker only recognizes users who are members of Microsoft Entra ID group teams and users who have security roles assigned to them directly.

## Team operations

### Access your team's page

1.  Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/).
    
2.  Select **Manage** in the navigation pane.
    
3.  In the **Manage** pane, select **Environments**, then select an environment.
    
4.  Select **Settings** > **Users + permissions** > **Teams**.
    

[![Screenshot of settings with teams selected under users and permissions.](media/6a-security-teams.png)](media/6a-security-teams.png#lightbox)

A **Teams** list displays of all of the teams in the environment.

[![Screenshot of the teams list view.](media/6a-security-teams-all-teams.png)](media/6a-security-teams-all-teams.png#lightbox)

### Create a new team

1.  From the **Teams** list screen, select **\+ Create team** from the ribbon at the top of the screen.
    
2.  In the **New team** pop-up on the right of the screen, specify the following fields:
    
    *   **Team name:** Be sure this name is unique within a business unit.
    *   **Description:** Enter a description of the team.
    *   **Business unit:** Select the business unit from the dropdown list.
    *   **Administrator:** Search for users in the organization.
    *   **Team type:** Select the team type from the dropdown list.
    
    [![Screenshot of the new team details.](media/6a-security-teams-new-team.png)](media/6a-security-teams-new-team.png#lightbox)
    
    Note
    
    A team type can be one of the following: Owner, Access, Microsoft Entra ID Security group, or Microsoft Entra ID Office group.
    
3.  If the team type is Microsoft Entra ID Security group or Microsoft Entra ID Office group, you must also enter the following fields (else skip to step 4):
    
    *   Group name: Start entering text to select an existing Microsoft Entra ID group name. These groups are pre-created in Microsoft Entra ID.
        
    *   Membership type: Select the membership type from the dropdown list.
        
    
    [![Screenshot of the team type set to A A D security group.](media/6a-security-teams-new-team-aad.png)](media/6a-security-teams-new-team-aad.png#lightbox)
    
4.  Select **Next**.
    
5.  In the Add team members, pop-up add the members of the team by typing in part of their user name or email address, and select the name as it appears. Once you've selected the desired members, select **Next**.
    
6.  In the Manage security roles, pop-up add the security roles you wish to assign to this team.
    
7.  Select **Save**. Your pop-up dialog pane will close and your new team will show in the **Teams** list.
    

After you create the team, you can add team members and modify security roles by [editing the team](/en-us/power-platform/admin/manage-teams?azure-portal=true#edit-a-team).
