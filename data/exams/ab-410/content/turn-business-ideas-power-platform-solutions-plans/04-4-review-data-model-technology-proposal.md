---
title: "Review the data model and technology proposal"
url: "https://learn.microsoft.com/en-us/training/modules/turn-business-ideas-power-platform-solutions-plans/4-review-data-model-technology-proposal"
uid: "learn.wwl.turn-business-ideas-power-platform-solutions-plans.review-data-model-technology-proposal"
module: "turn-business-ideas-power-platform-solutions-plans"
moduleTitle: "Turn business ideas into Power Platform solutions with Plans"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Review the data model and technology proposal

Once you approve the requirements, the plan's remaining agents run in sequence, generating a data model, then a technology proposal. Your job at this stage is to review each output, make refinements where needed, and confirm before moving forward. This unit walks you through both reviews and shows you how to save and share the completed plan.

## Review the data model

After you finalize the requirements, the Data Agent generates a proposed data model. This model includes Dataverse tables with recommended columns, data types, and relationships between tables.

For Contoso's PTO scenario, the Data Agent might propose tables like:

Table

Purpose

Key columns

**Time Off Request**

Stores each submitted request

Employee, Start Date, End Date, Leave Type, Status

**Employee**

Stores employee information

Name, Email, Manager, Department

**PTO Balance**

Tracks remaining leave for each employee

Employee, Leave Type, Total Days, Used Days, Remaining Days

**Blackout Date**

Stores company-wide dates when leave isn't available

Date, Reason, Created By

The relationships connect these tables; each Time Off Request links to the Employee who submitted it, and each PTO Balance links to both an Employee and a Leave Type.

## Refine the data model

Just like with requirements, you can refine the data model through inline editing or Copilot feedback:

*   Select **Edit** to open the data workspace, where you can modify tables, columns, and relationships directly
*   Select **Show details** to view the data model as a diagram and make structural changes
*   Use **Copilot** to describe changes in natural language, such as _"Add a column to the Time Off Request table for manager comments"_

The data workspace gives you a visual representation of your tables and their relationships. You can create new tables, modify column properties, and adjust relationships between tables, all before any data is saved to Dataverse.

When you're satisfied with the data model, select **Looks good** to proceed to the technology proposal.

## Review the technology proposal

The Solution Agent is the last to run. It evaluates the requirements, process diagrams, and data model to recommend which Power Platform technologies to use. The proposal maps each technology to the user roles it serves and the data tables it uses.

For Contoso, the Solution Agent might propose:

*   **Canvas app:** for employees to submit time-off requests and check their PTO balance
*   **Model-driven app:** for HR administrators to manage all requests, employee records, and blackout dates
*   **Power Automate cloud flow:** to handle the approval workflow when a manager receives a new request
*   **Copilot Studio agent:** for employees to ask questions about their PTO balance or company leave policies through a conversational interface

Each proposed technology appears as a tile in the plan. Hover over the information icon on any tile to see which user roles it addresses and which data tables it uses. This mapping helps you verify that the proposal covers all the requirements you defined earlier.

## Refine the technology proposal

You can modify the technology proposal before building anything:

*   Select **Edit** and use Copilot to describe what you want to change. For example: _"Replace the canvas app with a model-driven app for the employee experience"_ or _"Add a Power BI dashboard for HR to visualize PTO trends."_
*   Review the updated proposal and select **Looks good** when you're satisfied.

Note

Plans can recommend Power BI dashboards, but connecting a Power BI report with plan context isn't currently supported. You can still create the report manually after building the rest of the solution.

## Save the plan

When you're happy with the complete plan—requirements, data model, and technology proposal—it's time to save:

1.  Select **Save tables** to create the Dataverse tables in your environment.
2.  Enter a **solution name** (letters, numbers, and underscores only).
3.  Choose a **publisher** or select an existing solution.
4.  Select **Save**.

![Screenshot of the save plan dialog in Power Apps showing solution name and publisher fields.](media/save-plan.png)

The plan is now stored in a Power Platform solution, which enables the **Objects view** and prepares you to start building the individual components.

## Share and export the plan

Plans supports collaboration in two ways:

*   **Copresence:** Up to 100 makers can view the same plan simultaneously, though only one can edit at a time. The first person to open the plan gets editing rights.
*   **Sharing:** Share a plan with other makers at the **Viewer** level (view only) or **Co-Owner** level (can use, edit, and share the plan, but not delete it or change ownership).

If you need to share the plan with stakeholders who don't have Power Apps access, select **Export to PDF** to generate a document with all the plan details from the document side of the plan.
