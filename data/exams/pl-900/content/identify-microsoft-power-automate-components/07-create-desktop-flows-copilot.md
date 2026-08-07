---
title: "Create desktop flows with Copilot"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/create-desktop-flows-copilot"
uid: "learn.wwl.identify-microsoft-power-automate-components.create-desktop-flows-copilot"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Create desktop flows with Copilot

Power Automate for Desktop (PAD) is the application used to build, run, and manage desktop flows on a Windows PC. Copilot in Power Automate for Desktop brings natural language capabilities to desktop automation—helping you build desktop flows from descriptions and refine them through conversation.

## Copilot capabilities in Power Automate for Desktop

Copilot in Power Automate for Desktop is accessible through the Copilot Chat panel in the PAD application. It can:

*   Understand your intent from a natural language description and generate a sequence of desktop flow actions that implements your described process.
*   Enhance existing flows by adding, removing, or reorganizing actions based on conversational prompts.
*   Answer product questions about desktop flows—for example, explaining what a specific action does or how to accomplish a task in PAD.
*   Analyze desktop flow activity to help you understand what your flows are doing.

Note

Copilot in Power Automate for Desktop is powered by Azure OpenAI Service and is available to users with a work or school account in supported regions. Check the Power Automate documentation for current regional availability.

## Creating a desktop flow with Copilot

To create a desktop flow using Copilot, open Power Automate for Desktop and create a new flow. In the designer, select the **Copilot** button in the upper-right corner to open the Copilot Chat panel.

Describe the automation process you want to build. For example, a Contoso employee responsible for daily pricing updates might describe:

> _"Open Excel and read the pricing data from the sheet named Price Updates. For each row, open the pricing portal website, log in, navigate to the product by entering the product code, update the price field with the value from Excel, and save the change. After processing all rows, close Excel and the browser."_

[![Screenshot of Power Automate for Desktop showing the Copilot Chat panel with a natural language description and the generated action sequence.](media/desktop-flow-with-copilot.png)](media/desktop-flow-with-copilot.png#lightbox)

Copilot interprets the description and generates a sequence of desktop flow actions. Review the generated action sequence and continue refining through the Copilot panel:

*   "Add error handling so that if a product code isn't found, the row is logged to an error tab in the Excel file and the loop continues to the next row."
*   "After all rows are processed, send an email through Outlook with a summary of how many records were updated and how many failed."

## Record with Copilot (AI Recorder)

For makers who find it easier to demonstrate a process than describe it, Power Automate for Desktop offers **Record with Copilot**—also called the AI Recorder. This feature lets you build a desktop flow by sharing your screen and narrating the steps as you perform them, as if you were explaining the process to a new employee.

The AI Recorder works as follows:

1.  Enable screen sharing and start the recording session.
2.  Perform the automation steps on your computer while speaking aloud to describe what you're doing—for example: "Now I'm clicking the New Invoice button to open the invoice entry form" or "I'm entering the supplier code from the email into this field."
3.  The recorder captures your voice narration, mouse clicks, and keyboard input throughout the demonstration.
4.  After the recording ends, Copilot processes the recording and converts it into a desktop flow with named actions that correspond to the steps you demonstrated.
5.  Review and edit the generated flow before saving and running it.

Record with Copilot is particularly valuable for automating processes in legacy applications where it's difficult to describe the exact UI elements in text but easy to demonstrate the steps visually.

Note

Record with Copilot is a preview feature and currently supports English. The feature requires screen-sharing permissions and an active microphone. Check the Power Automate for Desktop documentation for current availability and feature updates.

## Modifying desktop flows with Copilot

After a desktop flow is created—whether through the Copilot description approach, the AI Recorder, or manual action authoring—Copilot can help modify and extend it. Open the flow in the PAD designer, open the Copilot panel, and describe the change:

*   "Add a step to take a screenshot before clicking the Save button."
*   "Add a variable to track the count of rows processed and display the total in a message box at the end."
*   "Replace the hardcoded login credentials with a desktop flow variable so the credentials can be stored securely."

Copilot applies the changes to the action sequence, and you can review and test immediately.

Tip

Before deploying an unattended desktop flow to run on a schedule, always test it in attended mode first—running it while watching the screen to verify that each action executes correctly. Unattended flows run in the background and are harder to diagnose if something goes wrong.
