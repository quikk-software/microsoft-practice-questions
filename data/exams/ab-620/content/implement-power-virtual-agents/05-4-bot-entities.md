---
title: "Agent entities and flow permissions"
url: "https://learn.microsoft.com/en-us/training/modules/implement-power-virtual-agents/4-bot-entities"
uid: "learn-bizapps.implement-power-virtual-agents.4-bot-entities"
module: "implement-power-virtual-agents"
moduleTitle: "Manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Agent entities and flow permissions

Microsoft Copilot Studio agents come with prebuilt entities that are provided by the system and help the agent identify common information such as age, colors, numbers, and names. Agent makers in the environment don't have access to the tables that they see in the same environment in Microsoft Power Apps or Power Automate.

Currently, the only option to connect with tables is by using Power Automate flow. To trigger the flow, use the **Call an action** feature in the agent authoring canvas.

[![Screenshot of Call an action feature in the agent authoring canvas.](media/call-action.svg)](media/call-action.svg#lightbox)

Only flows that are part of the solution are visible in the **Call an action** feature. We recommend that you have System Administrator level access for an environment to build agents that can connect with the flows that, in turn, connect with tables.
