---
title: "Add a column to a table"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/3-add-field"
uid: "learn-dynamics.create-manage-fields-within-entity.3-add-field"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Add a column to a table

You can add columns when you create a new custom table, or you can add columns to an existing table at any time. Adding a new column is the same whether you're creating a new table or adding to an existing table.

Tip

Before you create a custom column, evaluate whether an existing column meets your requirement.

1.  In your browser, go to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true), From the left navigation menu, select **Tables**. If you don't see Tables on the left, you can select **More**, then in the flyout menu find and select **Tables**.
    
2.  Open an existing table or create a new table.
    
3.  Select the **Columns** area within the table, then on the command bar select **New column**. The **Column properties** panel opens on the right side of the screen.
    
4.  Enter information in the following columns:
    
    *   **Display name** - The name that is shown to users.
        
    *   **Description** - This is a description of the column.
        
    *   **Data type** - This is the type of data that you want to store in the column.
        
    *   **Format** - Choose how you want the data type to look and behave.
        
    *   **Behavior** - Choose between Simple or Calculated, and use this to define a calculation or a rollup in this column.
        
    *   **Required** - Select this check box if you want to ensure that this column always has a value when a user tries to add a record to this table. The options are _Optional_ (default), _Business recommended_, and _Business required_. _Business recommended_ means that the column should have a value but it is not mandatory before saving a record. _Business required_ means that the record or form must have a value for this column before saving the record.
        
    *   **Searchable** - Clear this check box for columns for the table that you don't use or don't want to include in a search. When a column is searchable, it appears in **Advanced Find** and is available when you're customizing views. Clearing this check box reduces the number of options that are shown to people who are using **Advanced Find**, and helps make it easier for users to create custom views without seeing unused columns.
        
    *   **Maximum character count** - Use to define the maximum length of the data that a user can enter in this column. This is used with text columns. This setting is meant to allow you to conserve data space by limiting the space reserved for this column. Depending on what type of column you pick, there are maximum values. Entering a value that's too large triggers a warning including the maximum size, and requires you to input a smaller value before you can save the column.
        
    *   **Minimum and Maximum Values** - This column is available and used with number columns. Similar to the character count, there are limits for these values.
        
    *   **Allow form fill assistance (preview)** - When enabled, Copilot provides AI-generated suggestions for this column in model-driven app forms. Disable for columns that contain sensitive information.
        

![Screenshot of the column properties in the Column properties panel.](media/module_4_-_unit_3_-_image_1.png)
