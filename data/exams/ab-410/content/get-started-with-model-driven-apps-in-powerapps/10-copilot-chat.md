---
title: "Enable Copilot chat for app users"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/copilot-chat"
uid: "learn-bizapps.powerapps-design-model-driven-apps.copilot-chat"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Enable Copilot chat for app users

Copilot chat in model-driven apps gives app users an AI-powered chat pane they can use to ask questions about their data in natural language, without needing to know how the app is structured or which views to open.

## What can Copilot chat do?

When enabled, Copilot chat appears as an icon in the right navigation bar of the model-driven app. Users can open the chat pane and type questions about the data in their Dataverse environment — for example, "Show me all active cases created this week" or "How many open opportunities do I have?" Copilot answers with data from the tables the user has permission to see.

Copilot can also help users navigate the app. If a user types "Take me to online cases," Copilot automatically opens the relevant screen.

Note

Copilot chat is read-only. Users can retrieve and explore data through Copilot, but they can't create or update records through it.

## Enable Copilot chat

Copilot chat for model-driven apps isn't enabled by default. A Power Platform administrator must turn it on for each environment.

1.  Sign in to the [Power Platform admin center](https://admin.powerplatform.microsoft.com/).
    
2.  Go to **Manage** > **Environments** and select the environment. Select **Settings** on the command bar.
    
3.  Select **Product** > **Features**.
    
4.  Set **Allow users to analyze data using an AI-powered chat experience in canvas and model-driven apps** to **On**, then **Save**.
    

## Disable Copilot chat for a specific app

Even when Copilot chat is enabled at the environment level, a maker can turn it off for a specific app.

1.  In the app designer, select **Settings** on the command bar.
    
2.  Select the **Upcoming** tab, set **Copilot control** to **Off** (or **Default** to follow the environment setting), then **Save**.
    
3.  **Save and publish** the app for the change to take effect.
    

Important

Copilot chat in Power Apps is being deprecated for model-driven apps in environments that are not enabled for Dynamics 365 apps. For those environments, Microsoft recommends switching to Microsoft 365 Copilot in model-driven apps. Dynamics 365-enabled environments are not affected.

Next, you'll learn how to add autonomous agents and an app assistant agent to your model-driven app.
