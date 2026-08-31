---
title: "Use a grounded prompt in a cloud flow"
url: "https://learn.microsoft.com/en-us/training/modules/ai-builder-grounded-prompts/use-grounded-prompt-cloud-flow"
uid: "learn-bizapps.ai-builder-grounded-prompts.use-grounded-prompt-cloud-flow"
module: "ai-builder-grounded-prompts"
moduleTitle: "Create AI Builder prompts using your own Dataverse data"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Use a grounded prompt in a cloud flow

To use your grounded prompt in a cloud flow, follow the steps in this exercise.

## Create flow

In this section, you create an instant cloud flow to use your grounded prompt.

1.  Sign in to [Power Automate](https://make.powerautomate.com/).
    
2.  On the left navigation pane, select **\+ Create**.
    
3.  Select **Instant cloud flow**.
    
4.  Name your flow **Learning prompt** (or provide a name of your choosing).
    
5.  Select **Manually trigger a flow**.
    
6.  Select **AI Builder > Create text with GPT using a prompt**.
    
7.  From the **Prompt** dropdown menu, select the grounded prompt that you recently created: **Learning grounded prompt**.
    
8.  In the **Input ProposalName** field, enter the proposal name, which in this example is **Proposal Name 1**.
    
    [![Screenshot of the Parameters tab with information filled in the fields.](media/parameters.png)](media/parameters.png#lightbox)
    
9.  Select **\+ Insert a new step** after the **Create text with GPT using a prompt** action and then select **Add an action**.
    
10.  Select **Compose**.
     
11.  In the **Inputs** area, select **Output Text**.
     
12.  Select **Save** and then select **Publish**.
     

Congratulations, you have successfully created a cloud flow with a grounded prompt.

## Test flow

Now, you can run the flow to test it by following these steps:

1.  Select **Test** from the menu, select **Manually**, and then select **Test**.
    
2.  Select **Run flow** and then select **Done**.
    

The result should display in the input and output of the **Compose** action.
