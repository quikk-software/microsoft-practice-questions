---
title: "Convert a flow to an agent flow"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/agent-flows"
uid: "learn-bizapps.flow-get-started.agent-flows"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Convert a flow to an agent flow

Once you've built and tested a cloud flow in Power Automate, you can convert it to an **agent flow** — an automation that's managed in Microsoft Copilot Studio and optimized for use within AI agents.

## What is an agent flow?

An agent flow consists of a trigger and one or more actions, just like a cloud flow. What makes it different is that it:

*   Consumes Copilot Studio capacity rather than Power Automate capacity.
*   Can be added as a tool in Copilot Studio agents, allowing an agent to trigger it as part of a conversation or autonomous task.
*   Supports AI-driven actions, such as generating text, processing documents, and calling other agents.
*   Is managed and monitored from the **Workflows** page in Copilot Studio.

Note

Converting a flow to an agent flow is a one-way operation. It can't be reversed because the flow's billing changes from Power Automate to Copilot Studio.

## Before you convert

Before you start, make sure these conditions are met:

*   The flow is a **cloud flow** (not a desktop flow).
*   The flow is **in a solution**. On the flow's detail page in Power Automate, look for the **Solutions** tile on the right side. If the tile isn't there, [add the flow to a solution](/en-us/power-automate/create-flow-solution#add-an-existing-cloud-flow-into-a-solution) first.
*   The Power Platform environment has Copilot Studio capacity available (either prepaid or pay-as-you-go). If it doesn't, contact your Power Platform administrator.

## Convert a cloud flow to an agent flow

1.  Sign in to [Power Automate](https://make.powerautomate.com/) and select **My flows** from the left navigation.
    
2.  Select the flow you want to convert to open its detail page.
    
3.  Confirm that the **Solutions** tile appears on the right side of the page.
    
4.  Select **Edit** on the command bar.
    
5.  In the designer, change the flow's plan to **Copilot Studio**.
    
6.  Select **Save**.
    
7.  When prompted, confirm that you want to convert the flow.
    

Your flow is now an agent flow. You can access it from both Power Automate and the **Workflows** page in Copilot Studio.

## Capacity and billing

Every action your agent flow executes consumes Copilot Studio capacity. Testing the flow in the designer or from an agent's test chat doesn't consume capacity.

Important

Once your environment's prepaid Copilot Studio capacity is fully consumed, new agent flow runs are blocked until capacity becomes available. Monitor your usage in the [Power Platform admin center](https://admin.powerplatform.microsoft.com/) under **Licensing** > **Copilot Studio**.

For more information, see [Agent flows and workflows overview](/en-us/microsoft-copilot-studio/flows-overview).
