---
title: "Use a grounded prompt in a canvas app"
url: "https://learn.microsoft.com/en-us/training/modules/ai-builder-grounded-prompts/use-grounded-prompt-canvas-app"
uid: "learn-bizapps.ai-builder-grounded-prompts.use-grounded-prompt-canvas-app"
module: "ai-builder-grounded-prompts"
moduleTitle: "Create AI Builder prompts using your own Dataverse data"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Use a grounded prompt in a canvas app

In this exercise, you use your grounded prompt in a canvas app.

## Create an app

To create an app, follow these steps:

1.  Sign in to [Power Apps](https://make.powerautomate.com/).
    
2.  On the left navigation pane, select **\+ Create**.
    
3.  Select **Blank app > Blank canvas app > Create**.
    
4.  Name your app **Learning prompt app** (or use a name of your choosing).
    
5.  Select **Tablet** or **Phone** as a format.
    
6.  Select **Create**.
    
7.  On the left navigation pane, select **Data > Add Data**, select a data source, and then search for **Learning grounded prompt**.
    

## Use the app

After you install **Learning grounded prompt** to your app, you can use it. From the bar menu, complete the following steps:

1.  Select **\+ Insert > Text input**.
    
2.  Select **\+ Insert > Text label**.
    
3.  Select **\+ Insert > Button**.
    
4.  Resize the windows label/text/button at your convenience.
    
5.  On the left navigation pane, select **ButtonCanavas1**.
    
6.  Select **Property > OnSelect**. In the formula bar, enter **Set(var,'Learning grounded prompt'.Predict(TextInput1.Text))**.
    
7.  On the left navigation, select **Label1**. In the formula bar, enter **var.Text**.
    
8.  Save the app.
    

## Play the app

Next, you can play the app by following these steps:

1.  Select the **play** button.
    
2.  In the **Textinput1** window, enter **Proposal Name 1**.
    
3.  Select **Button**.
    
4.  In **Label1**, review the result.
    
    [![Screenshot of the button result.](media/button.png)](media/button.png#lightbox)
