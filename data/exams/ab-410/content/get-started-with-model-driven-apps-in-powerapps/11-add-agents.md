---
title: "Add agents to your model-driven app"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/add-agents"
uid: "learn-bizapps.powerapps-design-model-driven-apps.add-agents"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Add agents to your model-driven app

Model-driven apps can host agents that work alongside your users, automating tasks and surfacing work that needs human input — all without users leaving the app.

## Types of agents in model-driven apps

There are two types of agents you can add to a model-driven app:

*   **Autonomous agents** — Created in Microsoft Copilot Studio and connected to the Power Apps MCP (Model Context Protocol) server. These agents run in the background, take action on Dataverse data, and post tasks to the agent feed when they need human review or input.
*   **App assistant agents** — Provide custom topics, knowledge sources, and conversational capabilities within the Copilot chat pane of the app.

## Autonomous agents and the agent feed

An autonomous agent uses the Power Apps MCP server to interact with your app's data and post tasks for users to review. When an agent needs a human to step in, it creates a task in the **agent feed** — a task list that appears at the top of the app's site map.

The agent feed has two sections:

*   **Needs Attention** — Tasks that are waiting for user input. Users can complete tasks, accept and apply data entry suggestions from the agent, or dismiss items that are no longer relevant.
*   **Completed** — Tasks the agent logged for passive review or tasks that have already been handled.

Note

Access to the agent feed is limited by default to users with the System Administrator or System Customizer roles. To allow other users to see the feed, grant them read/write permissions on the Agent Task, Agent Hub Goal, Agent Hub Insight, Agent Hub Metric, and Copilot tables.

## Add an autonomous agent to an app

To add an existing autonomous agent to a model-driven app, the agent must be connected to the Power Apps MCP server and published in Copilot Studio.

1.  Sign in to [Power Apps](https://make.powerapps.com/), select **Apps**, and open the app for editing.
    
2.  In the app designer, go to the **Agents** tab in the left navigation pane.
    
3.  Under **Agent feed**, the **In your environment** list shows agents available in your environment. Find the agent you want to add.
    
4.  Select **...** (more options) next to the agent and select **Add to feed**.
    
5.  Save, publish, and play the app to verify the agent feed appears.
    

Note

Previewing the agent feed inside the app designer isn't currently supported. You must publish and play the app to see it.

## App assistant agent

The app assistant agent powers the Copilot chat pane in your model-driven app. From the **Agents** tab in the app designer, you can open and configure the app assistant agent in Copilot Studio — adding topics, connecting knowledge sources, and customizing its behavior for your specific app.

Next, test your knowledge of model-driven apps with a knowledge check.
