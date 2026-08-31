---
title: "Work with Prompt columns and row summaries"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/prompt-columns"
uid: "learn-dynamics.create-manage-fields-within-entity.prompt-columns"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Work with Prompt columns and row summaries

A Prompt column is an AI-powered column type in Dataverse that stores the result of a natural language prompt run against other column values in the same row. When a record is created or updated, Dataverse evaluates the prompt and stores the generated output directly in the column — ready to be used in apps, flows, or views without any manual entry.

This unit covers how to create and configure Prompt columns, and how to configure a related feature — row summaries — that uses the same prompt-based approach to surface key record information directly in model-driven app forms.

## Prompt columns

### Prerequisites

*   Prompt columns use the same licensing model as AI Builder prompts. For details, see [Prompts overview](/en-us/ai-builder/prompts-overview#prerequisites).
*   **Copilot** and **AI Prompts** features must be turned on in the environment's **Feature settings**. For details, see [Manage feature settings](/en-us/power-platform/admin/settings-features).

### Create a Prompt column

1.  In [Power Apps](https://make.powerapps.com/), select **Tables** in the left navigation and open the table where you want to add the column.
    
2.  Select **New** > **Column**.
    
3.  Enter a **Display name** and optional **Description** for the column.
    
4.  Under **Data type**, select **Prompt**.
    
5.  Clear the **Allow form fill assistance** checkbox.
    
6.  Select **\+ Add new prompt**. You can create up to five Prompt columns per table.
    
7.  On the prompt page, write or customize your prompt.
    
8.  Select **Save** on the prompt page, then **Save** on the column properties page.
    

### Write effective prompts

Prompt columns use natural language instructions to tell the AI model what to generate. Keep these tips in mind:

*   **Be specific** — Instead of "Summarize the record," write "Summarize the customer feedback in two sentences, focusing on the main issue and the customer's sentiment."
*   **Use structured language** — "Generate a list of the top three recommended actions based on the service request description" is more effective than "What should we do?"
*   **Add input columns** — Reference other columns in the table as inputs so the AI has the right data to work with.

### Add input columns to a prompt

1.  In the prompt editor, select **\+ Add content** and then select the table.
    
2.  Select the input column from the column dropdown and select **Add**.
    
3.  You can add more than one input column per prompt.
    

Note

Input columns can't be Formula columns, File columns, Image columns, or other Prompt columns — their values are ignored if selected.

### Test and refine a prompt

Create a test record with values in all input columns before testing.

1.  In the prompt editor, select the input column reference to open the **Filter knowledge** pane.
    
2.  Select **Filter attribute**, choose the filter column (such as **Name**), and enter the value of your test record.
    
3.  Select **Close**, then select **Test** and review the **Model response**.
    
4.  Check the **Knowledge used** tab to confirm the response was generated from your test record.
    
5.  Adjust the prompt until the output meets your needs, then select **No filter** in the **Filter knowledge** pane and select **Save**.
    

### View Prompt column results

Add the Prompt column to a model-driven app form or view to see the generated values. When a record is saved, Dataverse runs the prompt asynchronously and stores the result in the column. Two additional system columns are created automatically for each Prompt column — `(columnName)_PromptColumnStatus` and `(columnName)_PromptColumnDetails` — which record the execution status and any error details.

### Add filter conditions (optional)

Filter conditions let you control when a prompt runs, so it only executes for records that meet specific criteria. This reduces unnecessary AI credit consumption.

1.  In the prompt editor, open a table variable and select **Apply filter**.
    
2.  On the **Filter conditions** pane, select **Add filter** and configure the condition, then select **OK**.
    
3.  Select **Save** on the column properties page.
    

* * *

## Row summaries

A row summary is a Copilot-generated overview of a record that appears in a collapsible bar at the top of a model-driven app main form, or directly from views. Unlike a Prompt column, a row summary isn't stored as a column value — it's generated on demand when a user views the record.

Use a row summary to help users quickly orient themselves to the most important information in a record without scrolling through all its fields and related tables.

### Prerequisites

A Power Platform administrator must have the **AI insight cards** environment setting enabled. For details, see [Manage feature settings](/en-us/power-platform/admin/settings-features).

Note

Some Dynamics 365 app tables (Case, Lead, Opportunity) provide their own built-in summaries via Dynamics 365 Customer Service and Sales. The row summary feature isn't available for those tables.

### Configure a row summary

Row summaries are configured at the table level and apply to all main forms and views for that table.

1.  In [Power Apps](https://make.powerapps.com/), select **Tables** in the left navigation and open the table.
    
2.  Under **Customizations**, select **Row summary**. If the option is disabled, hover over it to see the reason (for example, the table must have at least one row of data).
    
3.  In the **Prompt** box, define the summary by selecting **Add** or typing `/` to reference columns. You can also specify formatting (bulleted list, paragraph) and language instructions.
    
4.  Select **Test prompt** to preview the output using the most recently edited record.
    
5.  When satisfied, select **Apply to main forms**.
    

### Write a good row summary prompt

*   List the specific columns you want included (or excluded).
*   Specify formatting — for example, "Output as a bulleted list with bold labels."
*   If your users work in multiple languages, include the `LanguageCode` input and add the instruction: "You must respond in language <LanguageCode>."

### Add a row summary to a solution

Row summaries are solution-aware. To move a summary between environments:

1.  In [Power Apps](https://make.powerapps.com/), open the solution.
    
2.  Select **Add existing** > **More** > **Other** > **AI Skill Config**.
    
3.  Select the row corresponding to the table's summary and select **Add**.
    

For more information, see [Configure a row summary for a model-driven app](/en-us/power-apps/maker/data-platform/configure-form-row-summary).
