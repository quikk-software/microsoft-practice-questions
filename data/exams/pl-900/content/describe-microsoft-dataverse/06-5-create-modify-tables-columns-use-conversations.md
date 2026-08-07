---
title: "Create and edit tables, columns, and relationships through conversations"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-dataverse/5-create-modify-tables-columns-use-conversations"
uid: "learn.wwl.describe-microsoft-dataverse.create-modify-tables-columns-use-conversations"
module: "describe-microsoft-dataverse"
moduleTitle: "Describe Microsoft Dataverse"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Create and edit tables, columns, and relationships through conversations

One of the most significant advances in the Microsoft Power Platform maker experience is the ability to create and refine Dataverse tables by simply describing what you need in everyday language. Microsoft Copilot in Dataverse translates your natural language descriptions into table structures, column definitions, and relationship suggestions—dramatically reducing the time it takes to get started with a new data model.

## Creating tables using Copilot

To create a table using Copilot, navigate to the Power Apps maker portal and select **Tables** from the left navigation. Select **Start with Copilot** and describe the table you want to create. Your description can be as simple or as detailed as you like. For example, you might enter: "I need a table to track employee training completions, including the course name, the employee who completed it, the date, and their score."

Copilot interprets your description and generates a draft table with suggested column names, appropriate data types, and sample data to help you validate the structure. The draft serves as a starting point that you can immediately review and refine.

[![Screenshot of the Start with Copilot in the Power Apps maker portal, with a natural language description of a table entered in the prompt field.](media/create-table-copilot.png)](media/create-table-copilot.png#lightbox)

## Refining tables through conversation

After the initial draft is created, you can continue the conversation with Copilot to refine the table. This iterative approach allows you to adjust the structure incrementally without needing to understand all the technical options available in the table designer.

Examples of follow-up prompts you can use to refine a table include:

*   "Add a column for the training provider and make it required"
*   "Change the Score Achieved column to a whole number between 0 and 100"
*   "Add a choice column for training category with options: Compliance, Technical Skills, Leadership, and Safety"
*   "Create a relationship between this table and the Department table"

Each prompt refines the table structure in real time, and you can continue adjusting until the table accurately reflects your data model. When you are satisfied, you save the table and it becomes available across your Power Platform environment.

[![Screenshot of the Create new tables workspace in Power Apps, showing a generated table on the canvas and the Copilot panel with a refinement prompt.](media/edit-copilot.png)](media/edit-copilot.png#lightbox)

## Creating relationships through conversations

Copilot can also help you define relationships between tables through natural language. Instead of manually configuring lookup columns and relationship properties, you can describe the association you need and let Copilot suggest the appropriate relationship type and configuration.

For example, if you prompt Copilot with "Each employee can complete many training courses, and each course can be completed by many employees," Copilot recognizes this as a many-to-many (N:N) relationship and proposes the appropriate intersect table to manage the associations.

## AI-assisted data mapping

Beyond table creation, Copilot in the Dataverse data workspace can help you integrate external data into existing tables. When you import a spreadsheet or connect to an external data source, Copilot analyzes the structure of your incoming data and suggests column mappings to existing Dataverse columns. This AI-assisted mapping reduces the manual effort of aligning external data structures with your Dataverse schema and helps prevent common mapping errors.

## Contoso Electronics in action

A maker at Contoso Electronics used Copilot to build a Product Warranty Claims table in minutes. By describing the data they needed—claim type, submission date, product serial number, and resolution status—Copilot generated a draft table with appropriate column names and data types. A follow-up prompt added a lookup column linking each claim to an existing Customer record, establishing the relationship without any manual configuration.
