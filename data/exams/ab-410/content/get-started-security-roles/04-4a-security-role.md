---
title: "Understand user security roles and security role defaults"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/4a-security-role"
uid: "learn-dynamics.get-started-security-roles.4a-security-role"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Understand user security roles and security role defaults

Roles are groups of permissions that you assign to a user. Security roles grant users access and various capabilities and functionality like read, write, delete, or edit of rows in a table within an environment. Security roles are granular and can be assigned to one or many tables in an environment. Roles can also control certain actions like the ability to create a custom table or option sets. Additionally, users are associated with one or many security roles. Associating a user with a role gives them access to data and functionality specified within that role.

User security roles are either:

*   Standard and created with every instance of Microsoft Dataverse.
    
*   Custom and created by an administrator.
    

This unit examines each type of security role.

## Default user security roles

Once you have a database in the environment, when you add a user to an environment in Dataverse, the user is granted access to the environment but does not automatically receive access to data. Security roles must be explicitly assigned by a System Administrator or someone with the Assign privilege on the Security Role table.

Note

New users who sign up for Power Apps are automatically added to the Environment Maker role in the **default environment** only.

The following standard security roles are available for assignment in a Dataverse-enabled environment:

*   App Opener
    
*   Basic User
    
*   Environment Maker
    
*   System Customizer
    
*   System Administrator
    

For users who make apps that connect to the database and need to create or update entities and security roles, you need to assign the System Customizer role in addition to the Environment Maker role. This is necessary because the Environment Maker role doesn't have privileges on the environment's data.

With a database in the environment, the System Administrator role can be used to conduct the same functions as the Environment Admin, but a user must be assigned the System Administrator role instead of the Environment Admin role for full admin privileges.

The list of assignable roles is covered earlier in this module.

Remember that security role is essentially a collection of table and task-based privileges and their access levels.

## Table privileges

Dataverse supports the separate record-level privileges. You can use these privileges to define how a user interacts with data for a table.

The available table privileges are:

**Create** - Required to make a new record.

**Read** - Required to open a row to view the contents.

**Write** - Required to make changes to a record.

**Delete** - Required to permanently remove a record.

**Append** - Required to associate the current record with another record; for example, if a user has Append rights on a note, the user can add a note to an opportunity. In many-to-many relationships, you must have Append privilege for both tables being associated or disassociated.

**Append To** - Required to associate a record with the current record; for example, if users have Append To rights on an opportunity, they can add a note to the opportunity.

**Assign** - Required to give ownership of a row to another user.

**Share** - Required to give access to a record to another user while keeping your own access.

Note

Tables that are organization owned do not have the Assign or Share privileges.

## Access levels

Each privilege has a defined access level. Access levels determine how deep in the business unit hierarchy the user can perform the privilege.

Level

Description

None

Not allowed access.

User

Users can access records they own, objects that are shared with the organization, objects that are shared with them, and objects that are shared with a team that they're a member of. This is the typical level of access for end users.

Business Unit

Users can access records in their business unit. Users with business unit access automatically have user access. Because this access level gives access to information throughout the business unit, it should be restricted to match the organization's data security plan. This level of access is reserved for managers with authority over the business unit.

Parent: Child Business Unit

Users can access records in their business unit and all business units subordinate to it. Users with this access automatically have business unit and user access. Because this level gives access to information throughout the business unit and subordinate business units, it should be restricted to match the organization's data security plan. This level of access is reserved for managers with authority over the business units.

Organization

Users can access all records in the organization, regardless of the business unit hierarchical level they belong to. Users with organization access automatically have all other types of access as well. Because this level gives access to information throughout the organization, it should be restricted to match the organization's data security plan. This level of access is reserved for managers with authority over the organization.

Note

Tables that are organization owned only use the None or Organization access levels.

The screenshot below shows the privileges and access levels for tables from within the Power Platform admin center.

[![Screenshot of table privileges and access levels in PPAC.](media/privileges-access-levels.png)](media/privileges-access-levels.png#lightbox)

## Permission settings

Configuration of table permissions can also be done with predefined groups of permissions. You can assign permission setting groups according to the table below:

Permission setting

Details

No Access

No users can access the table.

Full Access

Users can view and edit all records in the table.

Collaborate

Users can view all records, but they can only edit their own.

Private

Users can only view and edit their own records.

Reference

Users can only view records, not edit them.

Custom

Indicates that permission settings have been changed from the default value.

To adjust permissions for a table, you can perform the following steps:

1.  Select a table, and then select **Permission Settings** in the command bar or select **More Actions** (…) > **Permission Settings**.
    
2.  Select the setting.
    
3.  Select save.
    

## Privacy related privileges

In table-based privileges, a security role contains several privacy related privileges that control access to features including:

*   Export to Excel

[![Screenshot of privacy related privileges in PPAC.](media/privacy-privileges.png)](media/privacy-privileges.png#lightbox)

Privacy related privileges only use the None or Organization access levels.

## Miscellaneous privileges

In table-based privileges, a security role contains many miscellaneous privileges that control access to features or administrative options including:

*   Bulk Edit
    
*   Merge
    
*   Export Customizations
    
*   Import Customizations
    
*   View Audit History
    

[![Screenshot of miscellaneous privileges in PPAC.](media/miscellaneous-privileges.png)](media/miscellaneous-privileges.png#lightbox)

Most miscellaneous privileges only use the None or Organization access levels but there are some miscellaneous privileges that can have all access levels set.

In the next unit, we'll explore creating a custom role.
