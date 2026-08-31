---
title: "Exercise - Create a grounded prompt in AI Builder"
url: "https://learn.microsoft.com/en-us/training/modules/ai-builder-grounded-prompts/create-grounded-prompt"
uid: "learn-bizapps.ai-builder-grounded-prompts.create-grounded-prompt"
module: "ai-builder-grounded-prompts"
moduleTitle: "Create AI Builder prompts using your own Dataverse data"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Exercise - Create a grounded prompt in AI Builder

AI Builder provides a prompt builder that allows makers to write, test, save, and use prompts to generate text.

## Prerequisite

This prerequisite is only for this module, and not needed to work with grounded prompts. To complete this exercise, you need to complete the following steps to access the sample data set:

1.  Download [Create AIBuilder Prompt zip file](https://go.microsoft.com/fwlink/?linkid=2272366)
    
2.  Sign in to [Power Automate](https://make.powerautomate.com). On the left navigation, select **Solutions**
    
3.  On the top bar menu, select **Import Solution**
    
4.  Select **Browse**, select **CreateAIBuilderpromptsusingyourownDataversedata\_1\_0\_0\_1\_managed** zip file from your local device.
    
5.  Select **Next** twice
    
6.  Select **Import**. It should take a few moments to get your solution imported. (refresh your browser if needed).
    
7.  In **solutions**, select **Create AI Builder prompts using your own Dataverse data**. Select **Import dataset**, select **Run** from the bar menu, select **Run flow**, select **Done**. It should take a few moments to get your flow ran. (refresh your browser if needed).
    
8.  Sign in to [Power Apps](https://make.powerapps.com). On the left nav, select **Tables**, select **All**.
    

You should have these three tables with data installed on your environment:

*   Issuer
    
*   Proposal
    
*   RelatedParty
    

You can now start the unit.

## Create a prompt

In this module, you assume the role of a sales representative. In this scenario, Bob, the issuer, prepares a proposal for a customer. Your task is to review a summary description of this proposal, titled **Proposal Name 1**. Bob and Ada are people who are associated with this proposal.

To create a prompt in AI Builder, follow these steps:

1.  Sign in to [Microsoft Power Apps](https://make.powerapps.com/) or [Microsoft Power Automate](https://make.powerautomate.com/).
    
2.  On the left pane, select **AI hub**.
    
3.  Under **Discover an AI capability**, select **Prompts**.
    
    Note
    
    To keep AI prompts permanently on the menu for quick access, select the pin icon.
    
4.  Select **Build your own prompt**.
    
5.  Give your prompt a name.
    

In this example, name your prompt **Learning grounded prompt** or use a name of your choice.

[![Screenshot of the Name field with the prompt name entered.](media/create-grounded-prompt-1.png)](media/create-grounded-prompt-1.png#lightbox)

### Prompt settings

Your next step is to explore and edit the various prompt settings.

1.  On the left pane, select **\+ Add content**, and then name your input **ProposalName**.
    
    Note
    
    Adding inputs and data grounding in your prompt settings helps you fine-tune your prompt response.
    
2.  On the left pane, select **\+ Add content**, then select **Dataverse**. Select **ProposalName**.
    
    By adding filters, your goal is to refine the data that you're working with, making it more focused on and relevant to your needs.
    
    [![Screenshot of the prompt settings.](media/create-grounded-prompt-2.png)](media/create-grounded-prompt-2.png#lightbox)
    
    [![Screenshot of prompt settings with the Data used preview tab.](media/create-grounded-prompt-3.png)](media/create-grounded-prompt-3.png#lightbox)
    
3.  In the **Prompt** window, write the following prompt by using natural language:
    
    **Create a summary of the proposal ProposalName as paragraphs and fewer than 50 words.**
    
4.  Highlight **ProposalName** in the prompt window, select **\+ Insert**, and then select **ProposalName**, as shown in the following screenshot.
    
    [![Screenshot of the insert proposal name input.](media/create-grounded-prompt-4.png)](media/create-grounded-prompt-4.png#lightbox)
    
5.  In the **Prompt** window, enter **Include the following information in the summary** after the first prompt. Select **\+ Insert > Proposal > Select an attribute**, and then search for **description**, as shown in the following image.
    
    [![Screenshot of insert description.](media/create-grounded-prompt-5.png)](media/create-grounded-prompt-5.png#lightbox)
    
6.  Select **\+ Insert > Proposal > RelatedParty > Select an attribute** and then search for **Name**.
    
    [![Screenshot of insert name.](media/create-grounded-prompt-6.png)](media/create-grounded-prompt-6.png#lightbox)
    
7.  Repeat the previous step, select **Proposal > Issuer > Select an attribute**, and then search for **Name**.
    
8.  In the **Prompt** window, enter **Also include the** at the end of the prompt. Select **\+ Insert > Select an attribute** and then search for **Name** to insert the **ProposalName** attribute. Then, enter the phrase **as the title of the summary** after the inserted attribute, as shown in the following screenshot.
    
    [![Screenshot of the prompt.](media/create-grounded-prompt-7.png)](media/create-grounded-prompt-7.png#lightbox)
    

Now that you've crafted a grounded prompt by using natural language, data, and filtering techniques, you can test your prompt.

## Test your prompt

In this section, you ask for a summary of **Proposal Name 1** in the Microsoft Dataverse table called Proposal.

1.  In the right pane in the prompt settings, select **Output > Text**.
    
2.  Select **Test prompt** in the left pane.
    
    Your prompt response should resemble the following image.
    
    [![Screenshot of the prompt response.](media/prompt-response.png)](media/prompt-response.png#lightbox)
