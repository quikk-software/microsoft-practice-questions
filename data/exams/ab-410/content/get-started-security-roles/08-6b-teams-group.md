---
title: "Configure Dataverse group teams for security"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/6b-teams-group"
uid: "learn-dynamics.get-started-security-roles.6b-teams-group"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Configure Dataverse group teams for security

A Microsoft Entra ID _group_ team, similar to an _owner_ team, can own records and can have security roles assigned to the team. There are two _group_ team types, and they correspond directly to the Microsoft Entra ID group types – Security and Microsoft 365. The _group_ security role can be just for the team or for team member with User privileges member's privilege inheritance. Team members are dynamically derived (added and removed) when they access the environment based on their Microsoft Entra ID group membership.

## Using Microsoft Entra ID groups to manage a user's app and data access

The administration of app and data access for Microsoft Dataverse has been extended to allow administrators to use their organization's Microsoft Entra ID groups to manage access rights for licensed Dataverse users.

Both types of Microsoft Entra ID groups, Security and Microsoft 365, can be used to secure user-access rights.

Both types of Microsoft Entra ID groups, Security and Microsoft 365, with a Membership type _Assigned_ and _Dynamic User_ can be used to secure user-access rights. Membership type _Dynamic Device_ isn't supported.

Using groups lets administrators assign a security role with its respective privileges to all the members of the group, instead of having to provide the access rights to an individual team member.

The administrator can create Microsoft Entra ID group teams that are associated to the Microsoft Entra ID groups in each of the Dataverse environments. Then they can assign a security role to these group teams. For each Microsoft Entra ID group, the administrator can create group teams based on the Microsoft Entra ID group **Members**, and/or **Owners**, or **Guests**, and assign a respective security role to each of these teams.

When members of these group teams access these environments, their access rights are automatically granted based on the group team's security role.

## Provision and deprovision users

Once the group team and its security role are established in an environment, user access to the environment is based on the user membership of the Microsoft Entra ID groups. When a new user is created in the tenant, all the administrator needs to do is assign the user to the appropriate Microsoft Entra ID group, and assign Dataverse licenses. The user can immediately access the environment without the need to wait for the administrator to assign a security role.

When users are deleted or disabled in Microsoft Entra ID or removed from the Microsoft Entra ID groups, they lose their group membership. These users won't be able to access the environment when they try to sign in.

## Remove user access at run time

When a user is removed from the Microsoft Entra ID groups by an administrator, the user is removed from the group team, and they lose their access rights the next time they access the environment. The memberships for the user's Microsoft Entra ID groups and Dataverse group teams are synchronized, and the user's access rights are dynamically derived at run time.

## Administer user security role

Administrators no longer have to wait for the user to sync to the environment and then to assign a security role to the user individually by using Microsoft Entra ID group teams. Once a group team is established and created in an environment with a security role, any licensed Dataverse users who are added to the Microsoft Entra ID group can immediately access the environment.

## Secure user access to environments

Administrators can continue to use a Microsoft Entra ID security group to secure the list of users synced to an environment. This can be further reinforced by using Microsoft Entra ID group teams. To secure the environment or app access to restricted environments, the administrator can create separate Microsoft Entra ID groups for each environment and assign the appropriate security role for these groups. Only these Microsoft Entra ID group team members have the access rights to the environment.

## Share Power Apps to team members of a Microsoft Entra ID group

When canvas and model-driven apps are shared to a Microsoft Entra ID group team, team members can immediately run the apps.

## User-owned and team-owned records

A new property has been added to the security role definition to provide special team privileges when the role is assigned to group teams. This type of security role allows team members to be granted User/Basic-level privileges as if the security role is directly assigned to them. Team members can create and be an owner of records without the need to have another security role assigned.

A group team can own one or more records. To make a team an owner of the record, you must assign the record to the team.

While teams provide access to a group of users, you must still associate individual users with security roles that grant the privileges that they need to create, update, or delete user-owned records. These privileges can't be applied by assigning a nonmember's privilege inherited security role to a team and then adding the user to that team. If you need to provide your team members the team privileges directly, without their own security role, you can assign the team a security role that has member's privilege inheritance.
