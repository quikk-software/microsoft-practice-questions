---
title: "Add an AI-powered agent to your site"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-studio/ai-agent"
uid: "learn-bizapps.power-pages-studio.ai-agent"
module: "power-pages-studio"
moduleTitle: "Explore Power Pages design studio"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Add an AI-powered agent to your site

An AI-powered **agent** in Power Pages provides conversational support to your site's visitors and users. When you add an agent to your site, visitors can ask questions in natural language and receive AI-generated responses based on your site's content, without having to navigate through pages manually.

![Screenshot of an agent in a Power Pages site.](media/multiple-agents.png)

## Prerequisites

Before you can use agent features in Power Pages, the following conditions must be met:

*   The tenant admin must turn on the **Publish Copilots with AI features** setting in the Power Platform admin center.
*   The HTTP connector must not be blocked in the selected environment, as agents use it to communicate with the site.

## Add an agent from the Set up workspace

Agents are configured in the **Set up workspace** of the design studio.

1.  In design studio, go to the **Set up workspace**.
2.  Under **AI assistance**, select **Agents**.
3.  Turn on the **Site agent** option.

Power Pages creates an agent in Microsoft Copilot Studio with generative answers enabled. The agent is initially created as a trial. After the trial expires, it uses available Copilot Studio capacity in your environment.

After creation, assign web roles to control which users can see and interact with the agent on the site.

## Add an existing agent

If you've already built a custom agent in Microsoft Copilot Studio, you can add it to your site instead:

1.  In the **Agents** section of the Set up workspace, select **Add agent**.
2.  Select the agent from the list of agents available in the environment.
3.  Assign web roles to make the agent available to the intended users.

Note

A site can include multiple agents. You can control the visibility of each agent by assigning different web roles.

## Extend the agent

By default, an agent answers questions using your site's content. You can extend its capabilities in these ways:

*   **Bing search**: Configure the agent to use Bing search to generate answers from public data.
*   **Omnichannel**: Connect the agent to Dynamics 365 Customer Service to hand off conversations to a live agent when needed.
*   **Copilot Studio**: Edit the agent directly in Microsoft Copilot Studio for advanced customization.

For more information, see [Add an agent from the setup workspace](/en-us/power-pages/getting-started/enable-agent) in the Power Pages documentation.

Next, you put your knowledge into practice with a hands-on exercise.
