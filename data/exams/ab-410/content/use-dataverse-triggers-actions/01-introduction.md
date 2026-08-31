---
title: "Introduction"
url: "https://learn.microsoft.com/en-us/training/modules/use-dataverse-triggers-actions/introduction"
uid: "learn-bizapps.use-dataverse-triggers-actions.introduction"
module: "use-dataverse-triggers-actions"
moduleTitle: "Use Dataverse triggers and actions in Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Introduction

With the Microsoft Dataverse connector, you can build Microsoft Power Automate cloud flow automations that start on events that occur within a Dataverse environment. By using the connector's actions, you can query, modify, and invoke Dataverse operations to implement your flow's custom business logic.

## Learning objectives

The learning objectives for this module are for you to:

*   Learn about the connector's actions and triggers and how to use them.
    
*   Use the Dataverse connector to build Power Automate cloud flow automations.
    
*   Learn about the available options for querying data by using the connector.
    
*   Create a cloud flow by using the Dataverse connector.
    

## Prerequisites

Make sure that you meet the following prerequisites before starting this module:

*   Basic understanding of building cloud flows with Power Automate
    
*   Access to an environment with Dataverse that has sample apps installed
    

## Authenticate

When you use the Dataverse connector, you can set up a connection to use OAuth or a service principal for the authentication type option.

*   **OAuth** - Use this type of authentication when you intend to create the connection with an interactive user by using a Microsoft Entra ID organization account. Typically, you would use OAuth for flows that support individual user productivity.
    
*   **Service principal** - Use this authentication option to use a non-interactive user by registering a service principal with Microsoft Entra ID and setting up an application user for it in the Dataverse environment. Typically, you would use a service principal for automations that support a project and where the automation represents work that's being done in the background for the overall application. For more information, see [Manage application users](/en-us/power-platform/admin/manage-application-users?azure-portal=true).
    
*   **Client Certificate Auth** - Use this authentication option to authenticate with a PFX certificate and password, using a registered Microsoft Entra ID application. Like Service Principal, this is a shareable connection suitable for background automations that don't require interactive sign-in.
    

## Set up the Dataverse environment

When building cloud flows with the Dataverse connector, you can choose to have it connect to the current environment or provide a specific environment. For most automations, selecting the current environment is the best option because you can deploy the flow to multiple environments (such as development, test, production), and it automatically adjusts to use that environment. Naming a specific environment is useful if you intend to build your flow in a different environment than where your Dataverse data resides. You might also find this option useful if you're integrating data from two or more Dataverse environments. For example, by using these options, you could create a flow that integrates data from both environments if your sales and marketing departments use separate Dataverse environments.

## Name your flow steps

You can have multiple steps in your flow by using the Dataverse connector. Because each step can be for a different Dataverse table, renaming the steps to indicate what it's doing can be helpful. For example, you could rename the **Get Primary Contact** step to **Get Row by ID 1** instead to clarify what the step’s doing. This renaming ensures that, when you use the output from the step in dynamic content later in the flow, you pick the correct output items.
