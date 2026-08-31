---
title: "Create a cloud flow"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/2-create-first-flow"
uid: "learn-bizapps.flow-get-started.2-flow-create-first"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Create a cloud flow

Every flow starts with a **trigger** and includes one or more **actions**. The trigger is the event that starts the flow, such as a new email arriving in your inbox. Actions are what happen in response — for example, saving the attachment to OneDrive or posting a message to Teams.

If you would like to see the process of creating different types of flows, watch the following video.

## Create a flow with Copilot

Copilot in Power Automate lets you create automation using natural language — no need to manually search for connectors or configure triggers from scratch. You describe what you want your flow to do, and Copilot builds the structure for you.

When you use Copilot to create or edit a cloud flow, it can:

*   Understand your intent and generate a flow based on the prompt you provide.
*   Automatically configure connections on your behalf.
*   Apply the necessary parameters in the flow based on your prompt.
*   Update or replace actions when you ask, and answer questions about your flow.
*   Suggest a description for the flow when you edit its details.

Note

Copilot in Power Automate is optimized for English and may have limited support in other languages. This capability is powered by Azure OpenAI Service. For more information, see [Responsible AI FAQ for Copilot in cloud flows](/en-us/power-automate/faqs-copilot).

To create a flow with Copilot:

1.  Sign in to [Power Automate](https://make.powerautomate.com/).
    
2.  On the left navigation pane, select **Home**.
    
3.  In the **Create your automation with Copilot** field, describe your automation in natural language. As you type, Copilot suggests prompts to help you refine your request.
    
4.  When you're satisfied with your prompt, select **Generate**.
    
5.  Copilot generates a suggested flow structure with a trigger and one or more actions. If you're satisfied, select **Keep it and continue**. If you want to adjust the flow, enter more details in the refinement field and select the arrow to regenerate.
    
6.  Verify that the connections in the flow are configured correctly. Connections that are ready show a green check mark. Connections that need attention show a red exclamation mark. Select any connection that needs attention and follow the instructions.
    
7.  Select **Create flow**. The designer opens with your flow and the Copilot pane on the right.
    
8.  In the Copilot pane, follow any suggestions to complete setup, ask questions, or request edits.
    
9.  When your flow is complete, select **Save** on the command bar.
    

## Write effective prompts

The quality of your prompt directly affects the quality of the generated flow. Keep these tips in mind:

*   Use a **When X happens, do Y** format. For example: _When an email arrives from my manager, post the subject to the General channel in Teams._
*   Be as specific as possible. Mention the connectors you want to use, such as Outlook, Teams, or SharePoint.
*   If the first result isn't what you expected, refine your prompt and generate again.

Here are a few example prompts to try:

*   _When an email arrives from contoso@contoso.com, post it in Teams._
*   _When an item is created in SharePoint, send me a mobile notification with the item title._
*   _When a new file is added to OneDrive, copy it to a SharePoint document library._

## Edit an existing flow with Copilot

You can also use Copilot in the flow designer to modify flows you've already built.

1.  Sign in to [Power Automate](https://make.powerautomate.com/).
    
2.  On the left navigation pane, select **My flows**.
    
3.  Find your flow, select the vertical ellipsis (**⋮**), and then select **Edit**. Your flow opens with the Copilot pane on the right.
    
4.  In the Copilot pane, type what you want to change. For example:
    
    *   _Delete the Send an email action._
    *   _Instead of email, post a message to a Teams channel._
    *   _Add a condition that checks if the subject contains "urgent"._
5.  Select **Save** when you're done.
    

Tip

Ask Copilot questions about your flow, such as _What does my flow do?_ to get a plain-language summary of the automation.
