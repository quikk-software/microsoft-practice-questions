---
title: "Environments in Microsoft Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/implement-power-virtual-agents/2-environments"
uid: "learn-bizapps.implement-power-virtual-agents.2-environments"
module: "implement-power-virtual-agents"
moduleTitle: "Manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Environments in Microsoft Copilot Studio

Microsoft Copilot Studio gives you the flexibility to create agents in different environments. An environment is a space to store, manage, and share your organization's business data. The agents that you create are stored in an environment. Apps and flows are also stored in environments. Environments might have different roles, security requirements, and target audiences, and each environment is created in a separate location.

When creating a new agent, it's created in the currently selected environment.

There are two ways to create an agent:

*   **Describe the agent you want to build:** Allows you to provide a brief overview of the functionality that you want your agent to have. Copilot Studio will create the agent with some topics automatically. You can tailor the agent to fit your needs after it is created.
    
*   **Manually configure:** Allows you to manually configure the agent. You provide details such as what you want to call it, instructions, and knowledge.
    

We will examine both options in more detail later.

To create an agent in an environment where you don't have access, you need to be a system administrator or contact the system administrator. Then, you need to complete the following steps:

1.  Create an agent in the environment (this step installs the necessary Microsoft Copilot Studio solutions).
    
2.  Assign yourself the security role of "agent author" in the environment.
    

To assign the security role of "agent author," Microsoft Power Platform admin must go to Microsoft Power Platform admin center, select the environment, and then select **Settings**.

[![Microsoft Power Platform admin center with the Environments tab selected and the Settings button selected.](media/environment-pva-settings.png)](media/environment-pva-settings.png#lightbox)

In **Users + permissions**, select **Security roles**.

Select the Ellipsis next to **Agent Author,** and from the menu that appears, select **Members**.

Select **\+ Add people**.

[![Microsoft Power Platform admin center open to Environments > Contoso (default) > Settings > Security roles > Agent Author with the Add People button highlighted.](media/add-people.png)](media/add-people.png#lightbox)

You can search for the person whom you are looking for, select the name, and then select **Add**.

The upper part of the screen shows a successful notification ribbon and the name of the user.

[![Message showing "Successfully added 1 user and 0 teams to the Agent Author security role."](media/success-add-user-security-role.png)](media/success-add-user-security-role.png#lightbox)

You successfully gave a user agent maker access in an environment.
