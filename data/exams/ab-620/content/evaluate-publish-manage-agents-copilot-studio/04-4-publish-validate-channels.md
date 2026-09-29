---
title: "Publish and validate in channels"
url: "https://learn.microsoft.com/en-us/training/modules/evaluate-publish-manage-agents-copilot-studio/4-publish-validate-channels"
uid: "learn.wwl.evaluate-publish-manage-agents-copilot-studio.publish-validate-channels"
module: "evaluate-publish-manage-agents-copilot-studio"
moduleTitle: "Evaluate, publish, and manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Publish and validate in channels

After the agent passes your tests, publish it so you can add the channels that your users need.

Priya publishes the support policy agent and adds the **Teams and Microsoft Copilot** channel. She installs the agent for herself and tests it with the permissions of a typical employee. She then asks an administrator to approve it for wider use.

## Understand channel publishing

Select **Publish** on the **Build** tab before you add the channel. Publish again after content changes so connected channels receive the current agent content.

Before publishing, confirm:

*   You've completed evaluation and addressed known quality issues.
*   All required knowledge sources, tools, and workflows are correctly configured.
*   You understand what permissions your users need to access the knowledge sources and tools the agent calls.
*   You know your organization's policies for channel availability and administrator approval.

## Add the Teams and Microsoft Copilot channel

After the first publish, open the configuration panel for **Teams and Microsoft Copilot**. To make the agent available in both experiences, keep **Make agent available in Microsoft Copilot** selected, and then select **Add channel**. If you clear this option, the agent is available only in Teams.

Use **Edit details** to configure the icon, color, descriptions, developer name, website, privacy statement, and terms of use required by your organization. Then select **See agent in Teams** and **Add** to install the agent for your own profile. When Microsoft 365 availability is enabled, this action installs the agent in both Teams and Microsoft Copilot.

How the agent becomes available to other users depends on organizational policy:

*   **Installation link**: Copy a link from **Availability options** for users who already have access to the agent.
*   **Shared-user discovery**: Show the agent to shared users in the **Built with Power Platform** section of the Teams app store.
*   **Organization-wide availability**: Submit the agent for administrator approval so it can appear in the organization's Teams app store and Microsoft 365 Agent Store.
*   **Preinstallation**: A Teams administrator can use an app setup policy to install and pin the approved agent for selected users.

Note

Installation, app-store discovery, organization-wide approval, and preinstallation depend on your organization's Teams and Microsoft 365 governance policies. Contact your administrator to confirm the available distribution path.

## Validate after publishing

Publishing doesn't prove that the agent works for everyone. Test it with an account that has the same permissions as its intended users.

Sign in with an account that has the same access level as a standard employee and test the following:

Validation area

What to confirm

**Authentication**

The agent loads and responds without sign-in errors or access-denied messages

**Knowledge retrieval**

The agent retrieves content from knowledge sources and returns accurate answers

**Citations**

Knowledge sources are cited correctly and links resolve to accessible content

**Tool and workflow execution**

Tools and workflows run without errors when the agent invokes them

**Scope and boundaries**

The agent declines out-of-scope requests as configured in its instructions

**Escalation**

The agent provides specific escalation contacts or paths when the user requests them

Most post-publish failures fall into one of three categories:

*   **Permission failures**: The published user can't access a SharePoint site, Dataverse table, or other resource the agent queries. Review and update the resource permissions for the users who need access.
*   **Connection failures**: A connector authenticates as the maker during authoring but requires re-authentication when invoked for a different user identity in a published channel. Review the connection reference and reconfigure authentication if needed.
*   **Configuration gaps**: A tool or workflow functions in the maker's environment but fails for users in a different configuration, such as a different environment, data region, or licensing tier.

Important

If your organization's tenant policy prevents you from installing the agent or submitting it to the catalog, do not treat the publish action as confirmation that the agent is available to users. Work with your administrator to understand the approval path. Complete validation only after the agent is accessible in its intended channel under a user account with standard permissions.
