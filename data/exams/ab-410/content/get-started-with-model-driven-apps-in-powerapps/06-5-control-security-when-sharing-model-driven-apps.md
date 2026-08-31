---
title: "Exercise - Control security when sharing model-driven apps"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/5-control-security-when-sharing-model-driven-apps"
uid: "learn-bizapps.powerapps-design-model-driven-apps.5-control-security-when-sharing-model-driven-apps"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Exercise - Control security when sharing model-driven apps

To access a Dataverse table, a user must have an assigned security role. Assigning security roles controls who can access restricted or sensitive data in your model-driven app. Security roles define users' access to different types of records. To control access to data and resources, you must create or modify security roles and assign them to your users.

It is important to note that every table must have a defined security role for access. Once you create and configure a security role, you can use that same role for multiple tables. Likewise, a user can have multiple security roles, but every app user must have at least one assigned security role.

You can assign security roles to single users or to teams of users. Once you assign a user or a team to a role, that user or all members of that team then have the privileges associated with the role.

In this unit, you learn how to share a model-driven app so that other users can access it.

Specifically, you learn how to:

*   Create a security role.
*   Assign users to the security role.
*   Share the app with users.

To share an app, you must have the Environment Admin or System Admin role.

## Scenario

Note

This scenario builds on ideas and concepts from the previous units. To get the most out of this exercise, you will first need to create an app as described in the previous unit of this module and create the Pet table as described in unit [Create a Microsoft Dataverse table](/en-us/training/modules/get-started-with-powerapps-common-data-service/3-create-a-cds-entity/?azure-portal=true) of [Get started with Dataverse Service module](/en-us/training/modules/get-started-with-powerapps-common-data-service/?azure-portal=true).

This unit uses the example of a company named Contoso, which has a pet grooming business that services dogs and cats. An app that has a custom table for tracking the pet grooming business has already been created and published.

The app must be shared so that the pet grooming staff can use it. To share the app, an admin or app maker assigns one or more security roles to users, to the table, and to the app.

## More on Security roles

The Power Apps environment includes predefined security roles that reflect common user tasks. These predefined roles can't be directly modified, but you can copy one and customize the copy to fit your needs. For custom tables like the Pet table in this scenario, you need to create a security role from scratch. The access levels that are defined follow the security best practice of providing access to the minimum amount of business data that's required to use the app.

Remember that the Contoso pet grooming app is based on a _custom_ table. Because the table is custom, you must explicitly grant privileges before users access its data. You must create a custom security role to manage privileges for app users.

The environment that contains the pet grooming app also contains other Contoso apps. We require two security roles that are specific to the pet grooming app, with two different sets of access privileges:

*   Pet grooming technicians need to read, update, and attach other rows. Therefore, their security role has _read, write_, and _append_ privileges.
*   Pet grooming schedulers need all the privileges that pet grooming technicians have. In addition, they must be able to create, append to, delete, and share rows. Therefore, their security role has _create, read, write, append, delete, assign, append to_, and _share_ privileges.

Here's a reference table of the different privileges levels in our security roles:

Privilege

Description

Create

Required to make a new record.

Read

Required to open an existing record to view the contents.

Write

Required to make changes to a record.

Delete

Required to permanently remove a record.

Append

Required to associate the current record with another record. For example, if users have Append rights on a note, they can attach the note to an opportunity. If there are many-to-many relationships, a user must have Append privilege for both tables being associated or disassociated.

Append to

Required to associate a record with the current record. For example, if users have Append To rights on an opportunity, they can add a note to the opportunity.

Assign

Required to give ownership of a record to another user.

Share

Required to give access to a record to another user while keeping your own access.

## Create a security role

1.  Sign into the [Power Platform admin center](https://admin.powerplatform.microsoft.com/?azure-portal=true).
    
2.  Select **Manage** in the left navigation pane, then select **Environments** and choose your environment.
    
3.  Select **Settings** > **Users + permissions** > **Security roles**.
    
4.  From the command bar for the **Security roles** screen, select **\+ New role**.
    
5.  In the **Create New Role** pane, enter the following:
    
    *   **Role Name** - `Pet Grooming Technicians`
    *   **Business unit** - \[Pick one from the dropdown. Every environment has at least one.\]
    *   **Member's privilege inheritance** - Team privileges only
    
    Note
    
    The pane also includes optional fields for **Description** and **Applies to**, and a toggle for **Include App Opener privileges for running Model-Driven apps**. Leave the toggle **On** — it's required for users to be able to open model-driven apps.
    
    **Save** the role.
    
6.  After saving the role, you'll see a detail screen for your new role. It includes information about the role settings and a list of all of the tables that are part of the environment, so you can set privileges by table. You can filter the list of tables by typing `pet` in the search field at the top right. All of your tables that include "Pet" in the title will display in the filtered list.
    
7.  Find and select your **Pet** table. (If you don't see it, select the dropdown above the table list that says _Show only assigned tables_. Change the value to _Show all tables_.) Notice when you select the table, dropdown boxes appear beside the table options fields (in the **Create**, **Read**, **Write**, **Delete**, and **Append** columns). Our grooming technicians only need to **Read**, **Write**, and **Append** from this table. Click each dropdown and change each of the field permissions from **None** to **Organization**.
    
    [![Screenshot of the Power Platform admin center of the security roles for the Pet table, with the Read, Write and Append permissions showing the organization option.](media/select-permissions.svg)](media/select-permissions.svg#lightbox)
    
8.  The pet grooming app also has a relationship with the **Account** table. Enter `account` in the table search field at the top right and select the **Account** table.
    
9.  For the Account table, our pet groomers only need to be able to read data from this table. Click the dropdown under **Read** and change the permission from **None** to **Organization**.
    
10.  In the command bar, select **Save + close** to save and return to the **Security roles** screen.
     
11.  Now let's make our second security role. Select **\+ New role**.
     
12.  In the **Create New Role** pane on the right, enter this information:
     
     *   **Role Name** - `Pet Grooming Schedulers`
     *   **Business unit** - \[pick one from the dropdown\]
     *   **Member's privilege inheritance** - Team privileges only
     
     Leave the **Include App Opener privileges** toggle **On**, then **Save** the role.
     
13.  After a moment, the **Pet Grooming Schedulers** role viewer appears. As we did before, find the _Pet_ table by entering `pet` into the search field at the top right of the view screen.
     
14.  Select the _Pet_ table, and change all of the dropdowns under _Create, Read, Write, Delete, Append, Append to, Assign,_ and _Share_ from **None** to **Organization**. (Remember: you might need to scroll to the right to see all of the fields.)
     
15.  As we did for the pet groomers, we need to make sure that our schedulers have access to the _Account_ table. But our pet grooming schedulers will need a higher level of access. In the table search field, enter `account`.
     
16.  Select the **Account** table.
     
17.  Change all of the dropdowns under _Create, Read, Write, Delete, Append, Append to, Assign, and Share_ from **None** to **Organization**.
     
18.  Select **Save + close** from the command bar.
     

Now that we've created our two security roles, let's assign users to them.

## Assign security roles to users

Security roles control a user's access to data through access levels and permissions. The combination of access levels and permissions included in a security role limits assigned users' ability to view and interact with that data.

### Assign a security role to the pet grooming technicians

1.  From the Power Platform admin center, select **Environments** and choose your Environment.
    
2.  Select **Settings** > **Users + permissions** > **Security roles**.
    
3.  Search for your **Pet Grooming Technicians** role by entering `pet` in the search field at the upper right of the screen. Select the role.
    
4.  Select **\+ Add people** from the command bar.
    
5.  In the **Add people** panel on the right side of the screen, search for the user in the organization who you'd like to add. When you find the user, select them from the dropdown. You can continue searching to add other people. Each time you select a name, it's added. You can remove a user from the list by selecting the **x** to the right of the user name.
    
    [![Screenshot of the Manage Security roles drop down.](media/add-people.png)](media/add-people.png#lightbox)
    
6.  When you're done selecting users, select **Add** at the bottom of the pane.
    
7.  The members you selected are listed as members under Pet Grooming Technicians.
    

### Assign a security role to the Pet Grooming Schedulers

1.  Return to your list of **Security roles** and search for and select your **Pet Grooming Schedulers** security role.
    
2.  Select **\+ Add people** from the command bar and add several names by searching for them, and then selecting the person.
    
3.  Select **Add**.
    

Now that we've assigned specific users to our security groups and given them access to the appropriate tables in the app, we can share the app with these users.

## Share the app with your users

1.  Go back to [make.powerapps.com](https://make.powerapps.com/?azure-portal=true).
    
2.  Select **Apps** in the left side navigation, find and select your _Pet Grooming_ app, and select the **Share** button from the command bar.
    
3.  Add groups or users to share the app with. When sharing the app, you can also assign a security role to enable app access.
    
4.  Select **Share**.
    

As long as your users are part of the app's environment and have proper licensing, they should now be able to use the app consistent with the security roles you created.
