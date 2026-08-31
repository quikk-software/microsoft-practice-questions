---
title: "Exercise - Create a custom role"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/5-custom"
uid: "learn-dynamics.get-started-security-roles.5-custom"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Exercise - Create a custom role

Microsoft Dataverse has many standard default roles, but there might be times when you want to define a custom security role. It's important to remember that every security role must include a minimum set of privileges before it can be used.

Tip

Roles can be copied so you can quickly create similar roles that might be slightly different. Also, it is much easier to copy a role and modify it, than to generate one from nothing. Standard roles also have a pre-designed connection with standard tables, so it's usually easier to copy a standard role vs. trying to re-create a custom role's permissions with standard Dataverse tables. It depends on your organization's needs!

### Create a custom security role and assign to tables and users

In this exercise, we'll learn how to create a new role and associate that role with a custom table. Then, we'll assign users to the new role so they can access the data in the custom tables as needed.

To grant access to a Dataverse table, we need to:

*   Create a new user security role or amend an existing user security role to include settings for the custom table.
    
*   Assign users to the security role.
    

### Part 1 - Create a security role

1.  Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/) as an administrator.
    
2.  Select **Manage** in the navigation pane, then select **Environments**.
    
3.  Select the name of the environment you would like to administer, then select **Settings**.
    
4.  Expand **Users + permissions** and select **Security roles**.
    
5.  Select **New role** in the command bar, which will open the security role designer.
    
6.  Enter a name, such as "My New Security Role" for your security role in the **Role Name** field.
    
7.  Select a **Business unit** (you might only have one, by default, but this is a mandatory entry).
    
8.  Select whether team members should inherit this role. If enabled and the role is assigned to a team, all team members inherit the role's privileges.
    
9.  Select **Save**. After a moment your new security role will appear on a configuration screen, with a list of the tables in the environment. You can search for your table by using the search field in the top right of the configuration screen.
    
    ![Screenshot of New Security Role configuration screen. The search field for tables is highlighted.](media/configure-security-role.svg)
    
10.  When you've located your table, select the table from the list. Notice how dropdowns appear under the various privileges that you can assign for this security role including Create, Read, Write, Delete, Append, Append to, Assign, and Share. Select the scope for performing that action by selecting the name of the table. The scope determines how deep or high within the environment's hierarchy that the user can perform a particular action.
     
     Use the dropdowns to assign privileges for this security group for this particular table. For our new role, let's keep it simple and make it so the Organization can Create, Read, Write, Delete, Assign, and Share a record in this table.
     
11.  Select **Save and Close** from the command bar.
     

Congratulations, you've created a new custom security role. Next, you'll assign users to this role.

### Part 2 - Assign users to your security role

After you've saved and closed your new security role, you'll be on the **Security roles** screen. ()If you lose your place, you can return to Settings > Users + permissions > Security roles.

1.  Find the security role that we created by scrolling down the list or by entering your new role name in the "Search by name" field in the top right of the screen.
    
2.  Select the role and then select the **More Actions** (...) button > **Members**.
    
    Note
    
    If you mistakenly select the name of the role you will return to the role configuration screen; if you do return to Security roles screen make sure to select the More actions button.
    
3.  Your new security role will have an **Add people** button. Go ahead and select it.
    
4.  An **Add people** panel will appear on the right side of your screen. It has a search field where you can enter a person's name, email, or a team name. Search for and add several users, by selecting their name from the search results.
    
5.  Once you have several people listed, select the **Add** button from the bottom of the Add people panel.
    
6.  After a moment, the users will appear under the Members for your new security role. If you need to remove a user, you can select the person's name and a Remove action button appears in the upper left of the command bar. If you need to add another user, make sure you don't have any users selected and you'll see an Add people button appear in the upper left of the command bar.
    
    ![Screenshot of the Security role members with the Add people button highlighted.](media/security-role-users.svg)
    

You've now learned how to assign users to a security role!

If you'd like to learn more about creating customer roles, see [Create or configure a custom security role](/en-us/power-platform/admin/database-security?azure-portal=true#create-or-configure-a-custom-security-role).
