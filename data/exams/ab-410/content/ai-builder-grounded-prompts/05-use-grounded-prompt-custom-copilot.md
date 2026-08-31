---
title: "Use a grounded prompt in a custom copilot"
url: "https://learn.microsoft.com/en-us/training/modules/ai-builder-grounded-prompts/use-grounded-prompt-custom-copilot"
uid: "learn-bizapps.ai-builder-grounded-prompts.use-grounded-prompt-custom-copilot"
module: "ai-builder-grounded-prompts"
moduleTitle: "Create AI Builder prompts using your own Dataverse data"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Use a grounded prompt in a custom copilot

In this section, you create a grounded prompt from Microsoft Copilot Studio.

## Create your prompt from Copilot Studio

To create your prompt from Copilot Studio, follow these steps:

1.  Sign in to [Copilot Studio](https://copilotstudio.microsoft.com/).
    
2.  On the left navigation pane, select **Library**.
    
3.  Select **\+ Add an Item**.
    
4.  Select **New Action**.
    
5.  Select **Prompt**.
    
6.  Add a **Name** and **Description**.
    
7.  In the **Prompt settings** pane, select **Input > + Add input**. Select **Name** and then enter **ProposalName**.
    
8.  Select **Data use (preview)**, select **\+ Add data**, and then search for **Proposal**.
    
    Note
    
    Adding inputs and data grounding in your prompt settings helps you fine-tune your prompt response.
    
    **ProposalName** should show as the **Input** and **Proposal** should show in **Data used (preview)**.
    
9.  In the **Prompt** window, enter the following content:
    
    **Create a summary of the proposal <ProposalName> as paragraphs and fewer than 50 words.**
    
    **Include the following information in the summary <Proposal.description>, <Proposal.Proposal (RelatedParty).Name>, <Proposal.Issuer (Issuer).Name>.**
    
    **Also include the <Proposal.Name> as title of the summary.**
    
    The prompt should resemble the following image.
    

[![Screenshot of the prompt from Copilot Studio.](media/prompt-finalized.png)](media/prompt-finalized.png#lightbox)

## Test your grounded prompt in Copilot Studio

To test your grounded prompt in Copilot Studio, follow these steps:

1.  On the right pane, expand **Input** and then expand **ProposalName**.
    
2.  In the **Sample data** field, enter **Proposal Name 1**.
    
3.  Select **Test prompt**.
    

## Finalize and create an AI plug-in

In this task, you finalize and create an AI plug-in by following these steps:

1.  Select **Finalize prompt** and then select **Create AI plugin**.
    
2.  Refresh your browser.
    

After the prompt successfully saves, it should display in the list of plug-ins.

Now, you can use this prompt plug-in to add content generation behaviors to your copilots.

## Use the prompt in a custom copilot

In this section, you add the prompt that you created to a custom copilot.

1.  On the left pane, select **\+ Create** and then select **New custom copilot**.
    
2.  Select **Create**.
    
3.  From the upper-right corner, select **Settings** and then change the My copilot's name to **Learning grounded prompt Copilot**.
    
4.  Select **Save**.
    
    The copilot takes a few minutes to provision.
    
5.  On the left pane, select **Copilots** and then select **Learning grounded prompt Copilot** from the list of copilots.
    
6.  From the upper-right corner, select **Settings**.
    
    [![Screenshot of Copilot Studio with the Settings button highlighted.](media/settings.png)](media/settings.png#lightbox)
    
7.  Select **Generative AI > Generative (preview)**.
    
    [![Screenshot of Copilot Studio on the Settings screen with Generative preview highlighted.](media/create-grounded-prompt-10.png)](media/create-grounded-prompt-10.png#lightbox)
    
8.  On the left pane, select **Copilots**. Select **Learning grounded prompt Copilot** from the list of custom copilots.
    

## Use Topics in a custom copilot

In this next task, you use the Topics feature in your custom copilot in Copilot Studio.

1.  From the upper bar menu, select **Topics** and then select **\+ Add a topic**.
    
2.  Select **Untitled**, and then change the name to **Summarize Proposal**.
    
3.  In the trigger window, enter **Summarize Proposal**.
    
4.  Select **\+ Add node**, select **Ask a question**, and then enter **What is the name of the proposal?**
    
5.  Select **Identify > Multiple choice options** and change it to **User’s entire response**.
    
    [![Screenshot of the Summarize Proposal trigger with the question highlighted.](media/identity.png)](media/identity.png#lightbox)
    
6.  Select **Var1** and rename it to **VarUserResponse**.
    
7.  Select **\+ Add node**, select **Call an action**, and then select the prompt that you previously created: **Learning grounded prompt in a custom Copilot**.
    
    [![Screenshot of the trigger with Call an action and the action highlighted.](media/call-action.png)](media/call-action.png#lightbox)
    
8.  Select the **VarUserResponse** value.
    
9.  Select **Select a variable > Create new**.
    
10.  Select **Var1** and rename it to **VarOutput**.
     
11.  Select **\+ Add node** and then select **send a message**.
     
12.  Select insert variable **{x}** and then select **VarOutput.text**.
     

[![Screenshot of the variable highlighted.](media/variable.png)](media/variable.png#lightbox)

13.  Select **Save**.

## Test your copilot

Now, you can test your copilot by following these steps:

1.  In the prompt window, enter **Summarize Proposal**. Press the **Enter** key.
    
    [![Screenshot of the Test your copilot section.](media/summarize.png)](media/summarize.png#lightbox)
    
2.  Answer the **What is the name of the proposal** question in the prompt by entering **Proposal Name 1**, as shown in the following screenshot. When you're done, press the **Enter** key.
    
    [![Screenshot of the conversation in the Test your copilot section.](media/conversation.png)](media/conversation.png#lightbox)
    

Congratulations, you successfully created a custom copilot and used Topics to call a grounded prompt as an action.
