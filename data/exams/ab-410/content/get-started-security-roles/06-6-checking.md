---
title: "Check the roles that a user belongs to"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/6-checking"
uid: "learn-dynamics.get-started-security-roles.6-checking"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Check the roles that a user belongs to

Checking the roles that a user belongs to is simple and you can do it with the following steps:

1.  Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/) as an admin.
    
2.  Select **Manage** in the navigation pane, then select **Environments**.
    
3.  Select the environment where you want to check the user's permission settings, then select **Settings** > **Users + permissions** > **Users**.
    
4.  Find your user from the **Users** list, by scrolling through the list or filter the list by entering a user's name in the top right filter field.
    
5.  Select your user's name and in the popup pane on the right look under **Roles** to see a list of the roles assigned to the user.
    
    [![Screenshot of the user popup pane with the Roles highlighted.](media/roles-highlighted.png)](media/roles-highlighted.png#lightbox)
    
6.  If you wish you can select **Manage roles** under Roles, and modify what roles are assigned to this user.
    

## Run diagnostics

In the user pane, select **Run diagnostics**. This validates a user and ensures that they can access the environment:

*   Is enabled for sign-in in Microsoft Entra ID.
    
*   Has a valid license.
    
*   Is a member of the environment's Microsoft Entra ID group?
    
*   Has at least one Dataverse security role assigned directly to them or to a group team they're a member of.
    

[![Screenshot of run diagnostics output.](media/check-user-access.png)](media/check-user-access.png#lightbox)

## Access checker

Within a model-driven app you can use **Access Checker** in the command bar to see the privileges a user has for a table row.

Access Checker shows:

*   **Ownership**: User owns the row or belongs to a team that owns the row.
    
*   **Security role access**: User has access to perform an action on a row because of their security role.
    
*   **Shared access**: The row is shared with a user, team, or organization by a user that has appropriate share rights.
    
*   **Hierarchy access**: Hierarchy access only takes place if hierarchy security management is turned on for the organization and the table.
    

[![Screenshot of access checker.](media/access-checker.png)](media/access-checker.png#lightbox)

Access checker defaults to your user, but you can select another user to see their privileges on the row.
