---
title: "Create a model-driven app through conversations"
url: "https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/create-model-driven-app-copilot"
uid: "learn.wwl.identify-basic-microsoft-power-apps-capabilities.create-model-driven-app-copilot"
module: "identify-basic-microsoft-power-apps-capabilities"
moduleTitle: "Identify basic Microsoft Power Apps capabilities"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Create a model-driven app through conversations

Creating a model-driven app with Copilot follows a similar pattern to creating a canvas app, with one key distinction: the generated app is built on Dataverse and is designed for the data management scenarios that model-driven apps excel at. Copilot generates the Dataverse table structure, columns, and relationships from a natural language description, then builds the initial model-driven app on top of that structure.

## How Copilot builds your model-driven app

The conversation-driven model-driven app creation flow works as follows:

1.  **Describe the management scenario.** Tell Copilot what business entity or process the app should manage—for example, a case management system, a project tracking app, or a customer relationship tool.
    
2.  **Copilot generates the Dataverse data model.** Copilot creates the relevant Dataverse tables with appropriate columns, column types (text, number, choice, lookup, date, and so on), and sample data based on your description.
    
3.  **Review and refine the data model.** Iterate on the table structure—adding columns, adjusting data types, establishing relationships between tables, and modifying sample data—by continuing to converse with Copilot in the **Create new tables** workspace.
    
4.  **Copilot builds the model-driven app.** Once the data model is ready, Copilot generates a model-driven app that includes forms, views, and navigation for the configured tables.
    
5.  **Refine using the model-driven app designer.** The model-driven app designer provides a visual interface for customizing the generated app—adding tables, configuring dashboards, enabling Microsoft 365 Copilot for app users, and setting app properties.
    

## Step-by-step: Create the Contoso Service Management app

The following walkthrough shows how Contoso's IT team creates a service request management app using Copilot, allowing IT staff to track incoming support tickets, manage assignments, and monitor resolution performance.

### Step 1: Start with Copilot in Power Apps

1.  Navigate to Power Apps at [https://make.powerapps.com](https://make.powerapps.com).
2.  On the home screen, select **Start with data**, then select **Create new data** to open the **Create new tables** workspace.

### Step 2: Describe the management scenario

In the Copilot panel, describe the data model your app needs. For a service request management app, type:

> _"Create tables to manage IT service requests. Include a table for Service Requests with fields for request title, description, requester name, requester email, category, priority, assigned technician, date opened, date resolved, resolution notes, and status. Also create a Technicians table that requests can be assigned to."_

Select **Submit**.

[![Power Apps Create new tables workspace with the Copilot panel showing a prompt to create IT service request management tables.](media/build-model-driven-from-description.png)](media/build-model-driven-from-description.png#lightbox)

Copilot generates both the Service Requests table and the Technicians table, establishes a lookup relationship between them, and populates both with sample data. The **Create new tables** workspace shows you both tables so you can review the generated columns and sample records.

### Step 3: Refine the data model

Review the generated tables and continue the conversation to refine the data model. For example:

*   "Add a column to the Service Requests table for estimated hours and actual hours."
*   "Change the Category column to a Choice type with options: Hardware, Software, Network, Access, Other."
*   "Add a Priority column with choices: Low, Normal, High, Critical."
*   "Add a column for escalation flag that is a Yes/No field."

After each change, Copilot updates the table structure and sample data.

[![Dataverse schema showing ITSupportAgent, User, Technician, and Service Request tables with the Model-driven app option selected in the dropdown.](media/create-model-app.png)](media/create-model-app.png#lightbox)

When the data model accurately represents the IT service management process, select the dropdown arrow next to **Save and open app**, choose **Model-driven app**, then select **Save and open app**.

### Step 4: Review the generated model-driven app

Copilot generates a model-driven app and opens it in the model-driven app designer. The generated app typically includes:

*   **Navigation groups and pages**: The app's left navigation includes table entries for Service Requests and Technicians, letting users browse and manage both tables.
*   **Default views**: Each table comes with system-generated views: Active records, Inactive records, and My records for the Service Requests table.
*   **Main forms**: A main form for each table showing all configured columns in an organized layout, with the activity timeline for tracking history.

Select **Play** in the upper-right corner to preview the app. Navigate to Service Requests and select a record from the sample data to see the main form. Try creating a new record and observe how the Technicians lookup column provides a dropdown of available technicians from the related table.

### Step 5: Customize in the model-driven app designer

The model-driven app designer provides visual tools for customizing the generated app. For the Contoso Service Management app, consider adding custom views and a dashboard.

**Configuring views**

From the app designer, select the Service Requests table in the Pages panel. Under **Views**, add custom views such as:

*   **High Priority Open Requests**: filtered to show records where Priority equals High or Critical and Status doesn't equal Resolved.
*   **My Open Assignments**: filtered to show requests assigned to the current user with an open status.
*   **Overdue Requests**: filtered to show requests open for longer than the defined service level agreement (SLA) period.

Configure each view in the Dataverse view designer by selecting columns, defining filter conditions, and setting sort order. Views appear as selectable options in the app's left navigation and table grid.

[![Model-driven app designer for the IT Management App showing the Service Requests view in the Pages panel and a list preview with five sample records.](media/edit-view.png)](media/edit-view.png#lightbox)

**Adding a dashboard**

In the app designer, select **Add page** and choose **Dashboard**. Configure a dashboard that shows:

*   A chart of open requests by category.
*   A chart of request volume by priority over the past 30 days.
*   A list showing the five technicians with the highest open request count.
*   A KPI card showing the average days to resolution this month.

Set the dashboard as the app's home page so IT managers see the performance overview when they open the app.

### Step 6: Enable Microsoft 365 Copilot for app users

1.  In the app designer, navigate to **Settings** and find the Copilot configuration options.
2.  Enable **Microsoft 365 Copilot** for the app.

Once enabled, a Copilot button appears in the upper-right corner of the app for all users with a Microsoft 365 Copilot license. Staff can ask questions such as:

*   "How many critical requests have been open for more than 48 hours?"
*   "Which technician has the most open assignments this week?"
*   "Show me all hardware requests submitted by the Finance department."

Copilot searches the configured Dataverse tables and returns answers based on the user's actual data, respecting security roles so each user only sees records within their access level.

### Step 7: Add pages

Pages are the items users access through the app's navigation. When you add a page, you can choose from the following types:

*   **Dataverse table**: Surfaces a Dataverse table in the application. This is the most common page type.
*   **Web resource**: Embeds a web resource, such as a custom HTML page.
*   **Navigation link**: Links to a specific location.
*   **Dashboard**: Displays a dashboard in the application.
*   **Custom page**: Lets you build a canvas app-style page that provides options beyond traditional model-driven apps.
*   **Generative page**: Lets you describe a specialized page you want, and an agent builds it.

[![Model-driven app designer showing a generative Contact Directory page with an App Agent panel and a preview of contacts with names and roles.](media/generative-page.png)](media/generative-page.png#lightbox)

### Step 8: Save and publish

1.  When the app configuration meets your requirements, select **Save** from the top navigation in the app designer.
2.  Select **Publish**.
3.  In the Publish dialog, optionally enable the AI-generated description option to have Copilot write a description of the app based on its components.
