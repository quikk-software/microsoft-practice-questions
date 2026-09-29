---
title: "Administer and manage"
url: "https://learn.microsoft.com/en-us/training/modules/implement-power-virtual-agents/6-administer"
uid: "learn-bizapps.implement-power-virtual-agents.6-administer"
module: "implement-power-virtual-agents"
moduleTitle: "Manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Administer and manage

Microsoft Copilot Studio gives you the flexibility to administer analytics and manage security of the agents.

## Analytics

The analytics section is divided into numerous pages to give you multiple ways to understand agent performance.

The **Summary** tab provides a detailed overview of how many total agent sessions were run over the period that you selected. Information such as total number of sessions, engagement rate, resolution rate, escalation rate, and abandon rate can help you to understand how effective the agent is and to determine the areas that need improvement.

[![Analytics section showing the Summary tab for the last seven days.](media/analytics.png)](media/analytics.png#lightbox)

The **Customer Satisfaction** report helps identify which topics are having the most impact and where analysts go to stay informed.

[![Monitoring Microsoft Power Platform: Microsoft Copilot Studio Analytics.](media/customer-satisfaction.png)](media/customer-satisfaction.png#lightbox)

The **Sessions** tab gives you the flexibility to download raw data from all agent sessions. This offering includes a complete transcript of the sessions and the outcome.

[![Sessions csv file in Microsoft Excel showing session data.](media/sessions.png)](media/sessions.png#lightbox)

The **Billing** tab shows the billable interaction between a customer and an agent and represents one unit of consumption. The billed session begins when a user topic is triggered.

A session ends for one of the following reasons:

*   The user ends the chat session. When the agent doesn't receive a new message for more than 30 minutes, the session is considered closed.
    
*   The session is longer than 60 minutes. The first message that occurs after 60 minutes starts a new session.
    
*   The session has more than 100 turns. A turn is defined as one exchange between a user and the agent. The one-hundred-and-first turn starts a new session.
    

[![Analytics with the Billing tab selected showing billed sessions for the last seven days.](media/analytics-billing.png)](media/analytics-billing.png#lightbox)

## Security

You can set up other security measures for your agent and your users. Security is accessed by going to **Settings > Security**. There are two security options available.

*   **Authentication:** Used to Identify the user’s identity during a chat.
    
*   **Web channel security:** Provides the ability to configure enhanced security options for your agent.
    

[![Security showing tiles for Sharing, Access, Authentication, and Web channel security.](media/security.svg)](media/security.svg#lightbox)

### Sharing

You can share your agent with other users so that multiple users can edit, manage, and collaborate on an agent. You can stop sharing with individual users anytime. You don't need to share an agent with another user for them to chat with the agent.

You can view the current access that a user has for your environment, and you can assign security roles to the selected user by selecting the three dots **...** next to the Settings menu button and selecting **Share**.

[![Screenshot of Share your agent page with message displayed in the Environment security roles section.](media/share-your-bot.png)](media/share-your-bot.png#lightbox)

**Agent author**, **Agent contributor**, and **Agent transcript viewer** are the three security roles for Microsoft Copilot Studio that you can manage in the Microsoft Power Platform admin center.

You can assign the **Environment maker** security role when sharing an agent with a user who doesn't have sufficient environment permissions to run Microsoft Copilot Studio.

When you're sharing the agent, if the specified user doesn't have sufficient permissions to use Microsoft Copilot Studio agent in the environment, you're notified that the **Environment maker** security role is assigned to the person so that they can use the agent.

The **Access** and **Authentication** options control who can access your agent. You can select one of two groups:

*   **All agent managers** - This selection allows only agent managers to chat with the agent. You can share your agent so that other agent managers can access it.
    
*   **Everyone in my organization (Organization name)** - This selection allows everyone in the organization to access and chat with your agent. Users who are outside of the organization see an error when chatting with the agent.
    

The **Authentication** setting impacts how you can manage access to the agent.

Select **Manage** on the side navigation pane and then go to the **Security** tab and select **Authentication**.

Three options for authentication are:

*   **No authentication** - Any user who has a link to the agent (or can find it, for example, on your website) can chat with it. Therefore, the **Access** setting options are disabled.
    
*   **Authenticate with Microsoft** - The agent is available in Microsoft Teams, Power Apps, or Microsoft 365 Copilot. Because it uses Microsoft Entra ID, it requires users to sign in. This is the default setting for all newly created agents.
    
*   **Authenticate manually** - This option has the following parameters:
    
    *   If your authentication setting is configured to **Manual**, and the service provider is Microsoft Entra ID you can turn off the **Require users to sign in** option and change the access settings for the agent.
        
    *   If your authentication provider is set as **Generic OAuth 2**, you can turn off the **Require users to sign in** option, but you can't control which users can access the agent. That option is only available when you use Microsoft Entra ID authentication.
        

### Web channel security

When you create a Microsoft Copilot Studio agent, it's immediately available in the Demo website and Custom website channels to anyone who knows the agent ID. These channels are available by default, and no configuration is needed.

Users can find the agent ID directly from within Microsoft Copilot Studio or by receiving it from someone. Depending on the agent's capability and sensitivity, that scenario might not be desirable.

With Direct Line-based security, you can enable access to only the locations that you control by enabling secured access with Direct Line secrets or tokens. You can enforce the use of secrets and tokens for each individual agent. After this option is enabled, channels need the client to authenticate their requests by using a secret or a token generated by using the secret, which is obtained at runtime. Any access to the agent that doesn't provide this security measure doesn't work.

To access go to **Settings > Security** and then select **Web channel security**.

[![Web channel security dialog box with Require secured access showing as Disabled.](media/web-channel-security.png)](media/web-channel-security.png#lightbox)

If you need to disable the **Web channel security** option, you can do so by switching **Require secured access** to **Disabled**. Disabling secured access can take up to two hours to propagate.

[![Enable require secured access dialog box showing "This action renders the Demo website unavailable, as well as any Direct Line channel not using a secret or token. This action can take up to two hours to take effect."](media/enable-secured-access.png)](media/enable-secured-access.png#lightbox)
