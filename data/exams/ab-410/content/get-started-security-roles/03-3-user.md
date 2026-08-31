---
title: "Adding or disabling an environment user"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/3-user"
uid: "learn-dynamics.get-started-security-roles.3-user"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Adding or disabling an environment user

## Add a single user to the Environment

Before you can assign security roles to a user, you must add them to the environment. You can add users to any environment in Microsoft Dataverse as long as they have a license that allows access to Dataverse. If the user doesn't have an appropriate license, the system won't allow you to add them.

The following steps will help you add individual users from your tenant to an environment.

1.  Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/).
    
2.  Select **Manage** in the navigation pane.
    
3.  In the **Manage** pane, select **Environments**, then select the environment.
    
4.  Select **Settings** > **Users + permissions** > **Users**.
    
5.  In the command bar, select **Add user**.
    
6.  In the **Add user** popup pane, add a single user by entering their name or email address in the search field and select **Add**.
    

## Add user to Security role

*   In the **Manage security roles** popup pane, you might select multiple roles, but notice how you might need to deselect **Environment maker** if you have **Basic User** selected. The Admin Center is trying to help you be deliberate in your selection. Assign a role that aligns with the person's responsibilities. Once you have the desired roles selected, select **Save**.

You can edit a user's security roles and manage teams they're involved in from within the **Power Platform admin center**. Removing a user from the security roles doesn't remove the user's license. If you want to make the license available to another user, you have to remove the license from the user account that was disabled. This task is accomplished through the [Microsoft 365 admin center](https://admin.microsoft.com/).

You can remove a license, disable a user, and remove a user from a security group with the [Microsoft 365 admin center](https://admin.microsoft.com/?azureportal=true). For more information, see [Disable a user account in an environment](/en-us/power-platform/admin/create-users-assign-online-security-roles?azure-portal=true#disable-a-user-account-in-an-environment).
