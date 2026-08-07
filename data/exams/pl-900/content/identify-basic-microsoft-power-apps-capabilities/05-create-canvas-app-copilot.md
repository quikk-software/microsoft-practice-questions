---
title: "Create a canvas app through conversations"
url: "https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/create-canvas-app-copilot"
uid: "learn.wwl.identify-basic-microsoft-power-apps-capabilities.create-canvas-app-copilot"
module: "identify-basic-microsoft-power-apps-capabilities"
moduleTitle: "Identify basic Microsoft Power Apps capabilities"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Create a canvas app through conversations

With Copilot in Power Apps, you can create a functional canvas app by describing what you want in plain language. Instead of starting with an empty canvas and no data, you describe your scenario and Copilot generates both the data model and the initial app for you. This unit walks through the complete conversation-driven canvas app creation experience.

## How Copilot builds your canvas app

When you use Copilot to create a canvas app, the process works in two connected phases: first, Copilot creates the data model in Microsoft Dataverse; then, it generates a canvas app built on that data model. Copilot needs to understand what your data looks like before it can build an app to manage it.

The full creation experience follows this sequence:

1.  **Describe the app in natural language.** Type a prompt that tells Copilot what kind of information your app should track, collect, or display. The more specific your prompt, the more accurately Copilot generates the app.
    
2.  **Copilot generates Dataverse tables.** Based on your description, Copilot creates one or more Dataverse tables with appropriate columns, data types, and sample data so you can see how the app looks with realistic records.
    
3.  **Review and refine the data model.** The Create new tables workspace opens, showing the generated table and sample data. Have a conversation with Copilot to add columns, remove unnecessary ones, change data types, or add related tables.
    
4.  **Copilot generates the canvas app.** Once you're satisfied with the data model, Copilot builds the canvas app with a browse screen, a detail screen, and an edit screen—a complete create, read, update, and delete (CRUD) application ready to use.
    
5.  **Refine the app through conversation.** In Power Apps Studio, continue to converse with Copilot to add screens, change styling, add controls, configure navigation, or make other adjustments—all through natural language.
    

## Step-by-step: Create the Contoso Equipment Request app

The following walkthrough shows how to create a canvas app for Contoso's facilities team using Copilot. The app lets employees submit equipment repair requests and lets facilities managers track request status.

### Step 1: Access Copilot in Power Apps

1.  Navigate to Power Apps at [https://make.powerapps.com](https://make.powerapps.com) and sign in with your organizational account.
2.  Make sure you're in the correct environment using the environment selector in the top-right corner.
3.  On the **Power Apps** home screen, select **Start with data**.
4.  In the panel that opens, select **Create new data**.

### Step 2: Describe your app to Copilot

In the Copilot panel text box, type a description of the data your app needs to manage. For the Contoso Equipment Request app, type:

> _"Create tables to track equipment repair requests for a manufacturing facility. Include fields for the request submitter's name, department, equipment ID, equipment description, issue type, issue description, date submitted, priority level, assigned technician, and current status."_

Select **Submit** or press **Enter**.

[![Power Apps Create new tables workspace with the Copilot panel open, showing a prompt to create tables for tracking equipment repair requests.](media/describe-table.png)](media/describe-table.png#lightbox)

Copilot analyzes your description and generates a Dataverse table—named something like Equipment Repair Requests—with columns matching your description. The table is automatically populated with representative sample data so you can see how the app looks before connecting any real records.

### Step 3: Refine the data model through conversation

Review the generated table and sample data. If you need to adjust the data model, continue the conversation with Copilot. For example:

*   "Add a column for the technician's phone number."
*   "Change the Priority column to a Choice type with options: Low, Normal, High, Critical."
*   "Add a Date Resolved column that only appears when Status is set to Resolved."
*   "Create a second table for Equipment that the request table can look up from."

[![Dataverse schema showing Equipment, Technician, Repair Request, and Repair Assignment tables with relationship lines and a Copilot conversation.](media/edit-with-copilot.png)](media/edit-with-copilot.png#lightbox)

Copilot applies each change to the table in real time. When the data model reflects your needs, select **Save and open app** in the upper-right area of the workspace.

### Step 4: Explore the generated app

Copilot generates a three-screen canvas app in Power Apps Studio. Screen names and content vary based on what the application is designed to do.

[![Power Apps Studio showing the generated canvas app with a Welcome screen and cards for Technicians and Equipment Repair Requests.](media/initial-app.png)](media/initial-app.png#lightbox)

Select the **Play** button in the upper-right corner to run the app in preview mode and test the experience with the sample data Copilot generated.

### Step 5: Refine the app with Copilot in Power Apps Studio

1.  With the app open in Power Apps Studio, select **Copilot** in the upper-right corner to open the Copilot conversation pane.
2.  Continue refining the app through natural language instructions. Examples include:
    *   "Add a screen for viewing requests assigned to the current user."
    *   "Add a label showing the total number of open requests at the top of the browse screen."
    *   "Change the background color of the app header to dark blue."
    *   "Make the Priority column display as a color-coded badge—green for Low, yellow for Normal, orange for High, red for Critical."
    *   "Add an email notification when a new request is submitted."

[![Power Apps Studio showing the Equipment Repair Requests app with the Copilot panel open and a prompt to change the header background to dark blue.](media/edit-in-application-copilot.png)](media/edit-in-application-copilot.png#lightbox)

Copilot applies each instruction and shows you the result. If a change doesn't look right, describe the correction or use the undo option and try a different approach.

### Step 6: Save and publish the app

1.  When the app meets your requirements, select **Save** from the top navigation.
2.  Select **Publish** to make the app available to other users.
3.  In the Publish dialog, you can have Copilot generate a description of the app based on its purpose and components.
4.  Select **Share** to assign the app to specific users or a security group in Microsoft Entra ID.
