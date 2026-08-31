---
title: "Understand environment roles"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-security-roles/2-roles"
uid: "learn-dynamics.get-started-security-roles.2-roles"
module: "get-started-security-roles"
moduleTitle: "Get started with security roles in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Understand environment roles

A security role has certain privileges associated with it, and you can associate a user with one or many security roles. Think of roles as a collection of privileges.

Environments have two predefined roles that provide access to permissions within an environment. You assign users to one of these two roles when considering what permissions you want to give to a user in an environment. However, if the environment has a Dataverse database, more roles are added and the permissions options broaden.

Every environment includes these predefined roles:

*   Environment Admin
    
*   Environment Maker
    

Important

A user is automatically associated with the Environment Maker role when they are added to an environment.

## Understand role types

Dataverse security uses several types of roles that operate at different scopes. Understanding which type applies helps you assign the correct access without granting more privileges than needed.

Role type

Scope

Examples

Tenant-level admin roles

Entire tenant

Global Administrator, Power Platform administrator, Dynamics 365 administrator

Environment-level roles

Single environment (no Dataverse database)

Environment Admin, Environment Maker

Dataverse security roles

Single environment (with Dataverse database)

System Administrator, System Customizer, Basic User

App-specific roles

Specific app within an environment

Dynamics 365 Sales, Customer Service, Field Service roles

Important

Tenant-level admin roles (Global Administrator, Power Platform administrator) grant environment management capabilities but **do not** automatically grant access to Dataverse data. A System Administrator security role must still be explicitly assigned per environment for data access.

## Environment Admin role

Before a Dataverse database is added to the environment, the _Environment Admin_ role can perform all administrative actions on an environment, including the following:

*   Add or remove a user or group from either the Environment Admin or Environment Maker role.
    
*   Provision a Dataverse database for the environment.
    
*   View and manage all resources created within the environment.
    
*   Set data loss prevention policies.
    

## Environment Maker role

The _Environment Maker_ role can create resources within an environment including apps, connections, custom connectors, gateways, and flows using Power Automate. The following rules apply to members of the Environment Maker role:

*   Environment Makers can distribute the apps that they build in an environment to other users within an organization. They share the app with individual users, security groups, or all users in the organization.
    
*   Users or groups that are assigned to these environment roles aren't automatically given access to the environment's database (if it exists). They must be given access separately by a Database owner.
    
*   Whenever a new user signs up for Power Apps, they're automatically added to the Maker role of the default environment.
    

## Environments with a Dataverse datastore

When an environment has a Dataverse datastore, users must be assigned the System Administrator role instead of the Environment Admin role for full admin privileges, as described in the following table.

Users who make apps that connect to Dataverse and need to create or update table and security roles need to be assigned the System Customizer role in addition to the Environment Maker role. This is necessary because the Environment Maker role doesn't have privileges on the environment's data.

Security role

Database privileges\*

Description

App Opener

Create(self), Read, Write(self), Delete(self)

Has minimum privileges for common tasks. This is primarily used when creating a new security role for model-driven apps, where a copy of the role is created before applying data access to your tables. This role is protected and can't be updated.

Environment Maker

Customizations

Can create new resources associated with an environment, including apps, connections, custom APIs, gateways, and flows using Microsoft Power Automate. However, this role doesn't have any privileges to access data within an environment. Environment makers can also distribute the apps they build in an environment to other users in your organization. They can share the app with individual users, security groups, or all users in the organization.

System Administrator

Create, Read, Write, Delete, Customizations, Security Roles

Has full permission to customize or administer the environment, including creating, modifying, and assigning security roles. Can view all data in the environment.

System Customizer

Create, Read, Write, Delete, Customizations

Has full permission to customize the environment. Can view all custom table data in the environment. However, users with this role can only view rows (records) that they create in Account, Contact, Activity tables.

Basic User

Read(self), Create(self), Write(self), Delete(self)

Can run an app within the environment and perform common tasks for the records that they own. This only applies to non-custom tables.

Service Deleter

Delete

Has full Delete permission to all entities, including custom entities. This role is primarily used by the service and requires deleting records in all entities. This role can't be assigned to a user or team.

Service Reader

Read

Has full Read permission to all tables including custom tables. This is primarily used by backend service that requires reading all tables.

Service Writer

Create, Read, Write

Has full Create, Read, and Write permission to all tables including custom tables. This is primarily used by backend service that requires creating and updating records.

Delegate

Act on behalf of another user

Allows code to impersonate or run as another user. Typically used with another security role to allow access to records.

Dynamics 365 Admin

_Dynamics 365 administrator_ is a Microsoft Power Platform service admin role. This role can do admin functions on Microsoft Power Platform because they have the system administrator role.

Support User

Read Customizations, Read Business Management settings

Has full Read permission to customization and business management settings to allow Support staff

Office Collaborator

Read (self)

Has Read permission to tables where a record from these tables was shared with the organization. Doesn't have access to any other core and custom table records. This role is assigned to the Office Collaborators owner team and not to an individual user.

Global Reader

Provides read-only access across the tenant. Similar to Global Administrator but without write access. This role is fully supported in the Power Platform admin center.

Website App Owner

A user who owns the [website application registration](/en-us/azure/active-directory/develop/quickstart-register-app) in the [Azure portal](https://ms.portal.azure.com/)

Website Owner

The user who created the Power Pages website. This role is managed and can't be changed.

\*The scope of these privileges is global, unless specified otherwise.

## Summary of resources available for predefined security roles

To assist you in determining what roles you need to assign by the resources that role has access to, the table below should help you.

Resource

Environment Maker

Environment Admin

System Customizer

System Admin

Canvas app

X

X

X

X

Cloud flow

X (nonsolution aware)

X

X (solution aware)

X

Connector

X (non–solution-aware)

X

X

X

Connection

X

X

X

X

Data gateway

X

X

\-

X

Dataflow

X

X

X

X

Dataverse tables

\-

\-

X

X

Model-driven app

X

\-

X

X

Solution framework

X

\-

X

X

\*Desktop flow

\-

\-

X

X

AI Builder

\-

\-

X

X

Important

Dataverse for Teams users don’t get access to desktop flows by default. You need to upgrade your environment to full Dataverse capabilities and acquire Desktop flow license plans in order to use desktop flows.
