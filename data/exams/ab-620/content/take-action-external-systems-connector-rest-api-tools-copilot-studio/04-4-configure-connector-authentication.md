---
title: "Configure authentication for connector tools"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-external-systems-connector-rest-api-tools-copilot-studio/4-configure-connector-authentication"
uid: "learn.wwl.take-action-external-systems-connector-rest-api-tools-copilot-studio.configure-connector-authentication"
module: "take-action-external-systems-connector-rest-api-tools-copilot-studio"
moduleTitle: "Take action in external systems using connector and REST API agent tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Configure authentication for connector tools

Adding a connector tool connects the agent to an external service, but before the agent can call that service, it needs valid credentials. The credential mode you configure shapes how users authenticate and determines which deployment channels are available for your agent.

## Choose a credential mode

Copilot Studio supports two credential modes for connector tools: user-provided and maker-provided. The choice determines which identity the agent uses when it calls the connected service, and it has direct implications for which channels you can publish the agent to.

### User-provided credentials

By default, connector tools use **user-provided credentials**. When a user interacts with the agent and the agent calls a connector tool for the first time in that conversation, the agent prompts the user to sign in to the connected service with their own account.

This model ensures the agent acts on behalf of each individual user, using their specific permissions to access data. It's the appropriate choice when:

*   Each user has their own account in the connected system
*   Data access should be scoped to what each individual user is permitted to see
*   The agent should act as that user's delegate rather than as a shared service identity

For example, a connector that sends emails through Office 365 Outlook should use user-provided credentials so that outbound messages come from the individual employee's mailbox, not from a shared account.

### Maker-provided credentials

In some scenarios, individual users don't have their own credentials for the target system, or all users should operate under a single shared identity. **Maker-provided credentials** allow the agent to use the maker's own connection for all users, with all calls running under that shared identity.

This mode is appropriate when:

*   The connected system uses a shared service account rather than per-user accounts
*   All users should access the same scope of data regardless of their individual permissions
*   Prompting each user to authenticate would create friction for a system all users access in the same way

For the Woodgrove Bank IT service desk agent, the Microsoft Dataverse connector for IT service request submission is a strong candidate for maker-provided credentials. The bank maintains a dedicated service account with write access to the IT service management system. Individual employees don't have direct accounts in that system, so prompting them to sign in would fail rather than provide a degraded experience.

Important

Maker-provided credentials require the agent to be deployed on an **authenticated channel**. If the agent is currently configured for an unauthenticated or anonymous channel, the maker-provided credentials option won't appear in the configuration. Configure the agent's authentication settings first, then return to the connector tool configuration.

To switch a connector tool to maker-provided credentials, open the tool's configuration in Copilot Studio, navigate to **Details** > **Additional details**, and change the **Credentials to use** setting.

> **Guiding question:** For each connector tool in your agent, ask: should the agent act on behalf of each individual user, or always act with a single shared identity? If the answer is a shared identity, does your deployment channel support authenticated access? Answering these questions before you configure credentials prevents rework after you've published.

## Share a connection with other makers

When your agent uses a connection you created, other makers working on the same agent can build and test the integration only if they have access to that underlying connection. To share access:

1.  Open Power Apps at `make.powerapps.com` and navigate to **Connections**.
2.  Select the connection you want to share.
3.  Choose **Share** and assign **Can use + share** permission to the users who need access.

This step lets other makers manage and test the connection without each creating their own separate connection in the environment.

## SSO limitation in Teams

When an agent is deployed to Microsoft Teams and uses custom Active Directory (AD) authentication, single sign-on (SSO) isn't supported for connector tools in that configuration. Users must authenticate to each connector manually, even if SSO works elsewhere in the Teams experience.

Note

This SSO limitation applies specifically to the combination of custom AD authentication and the Teams channel. Agents using other authentication configurations may behave differently.

If you're building an agent for Teams deployment and the agent uses connector tools, plan for this during design. Users see sign-in prompts for each connector the first time it's invoked. Set up connections in advance and communicate the sign-in process to your users before rollout.
