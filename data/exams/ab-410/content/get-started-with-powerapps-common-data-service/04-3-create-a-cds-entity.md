---
title: "Exercise - Create a Microsoft Dataverse table"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/3-create-a-cds-entity"
uid: "learn-bizapps.powerapps-common-data-service.3-create-a-cds-entity"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Exercise - Create a Microsoft Dataverse table

In this unit, you'll create a custom table and configure key components. You’ll learn how to:

*   Create a custom table
*   Add custom columns
*   Customize a view
*   Customize a form

This tutorial uses a scenario from Contoso, a pet grooming business that serves dogs and cats. Contoso needs an app for client and pet tracking that employees can use across various devices.

## Create a custom table

Follow these steps to create a new custom table:

1.  Sign in to the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true).
    
2.  In the left navigation, select **Tables**, then select the **New table** dropdown, and choose **Set advanced properties**.
    
    [![Screenshot of new table option.](media/new-table-command-new.png)](media/new-table-command-new.png#lightbox)
    
3.  In the _Properties_ tab of the New table pane, enter:
    
    *   **Display name**: _Pet_
    *   **Description**: _Track pets for pet grooming_
    
    [![Screenshot of new table pane for pets.](media/new-table-pane-pets.png)](media/new-table-pane-pets.png#lightbox)
    
4.  Select the _Primary column_ tab and enter:
    
    *   **Display name**: _Pet Name_
    
    [![Screenshot of new table primary column pane for pets.](media/new-table-primary-column-pets.png)](media/new-table-primary-column-pets.png#lightbox)
    
5.  Select **Save**.
    

## Add and customize columns

1.  Once the table is created, the **Pet columns and data** section displays. You'll see _Pet Name_ and an indicator of additional system columns. Select **+** to add a new column or use the **Edit** button.
    
    [![Screenshot of new pet table properties.](media/table-properties.png)](media/table-properties.png#lightbox)
    
2.  Select **New > Column** from the command bar.
    
3.  In the **New column** pane, enter:
    
    *   **Display name**: _Species_
    *   **Data type**: _Choice_
    
    [![Screenshot of the new column pane.](media/add-new-column.png)](media/add-new-column.png#lightbox)
    
4.  Create a new choice set:
    
    1.  Under **Sync this choice with**, select **New choice**
    2.  In the **Display name**, enter _Species_
    3.  Add **Dog** as a label
    4.  Add **Cat** as another label
    5.  Select **Save**
    
    ![Screenshot of the column properties pane with details entered.](media/updated-optionset-add-items.png)
    
5.  To assign this choice set to the column, search for _Species_ under **Sync this choice with**, select it, and then choose **Save**.
    
    ![Screenshot of the Synch this choice with and Species selected.](media/sync-this-choice-with.png)
    
6.  Add another column:
    
    *   **Display name**: _Pet Breed_
    *   **Data type**: _Single line of text_
7.  Add one more column:
    
    *   **Display name**: _Appointment date_
    *   **Data type**: _Date and time_
    
    Select **Save** after each column.
    

## Customize a view

1.  Select **Views** from the **Data experiences** pane.
    
    [![Screenshot of Pets table navigation with Views highlighted.](media/table-views.png)](media/table-views.png#lightbox)
    
2.  Select **Active Pets** to open the view designer.
    
3.  Add columns to the view by selecting them from the **Table columns** panel:
    
    *   _Appointment date_
    *   _Pet Breed_
    *   _Species_
    
    [![Screenshot of table view showing available table columns and + View columns highlighted.](media/view-column-species.png)](media/view-column-species.png#lightbox)
    
4.  To remove a column, select its name in the view header, then choose **Remove**. Remove the **Created On** column.
    
5.  Drag column headers to reorder them. Move _Species_ before _Pet Breed_.
    
6.  Select **Save and publish**.
    

## Customize the main form

1.  Select **Forms** from the **Data experiences** pane.
    
    [![Screenshot of list of forms for the Pet table with the main form highlighted.](media/pet-forms.png)](media/pet-forms.png#lightbox)
    
2.  Open the **Main** form and select **Edit**.
    
3.  In the form editor, add _Species_, _Pet Breed_, and _Appointment date_ to the _General_ section.
    
    [![Screenshot of General section of the form canvas.](media/updated-main-form-edit2.png)](media/updated-main-form-edit2.png#lightbox)
    
4.  Select **Save and publish**.
    
5.  Return to the **Pet** table after publishing is complete.
    
6.  You can now enter data directly in the table. Select **\+ New row** to add test data for display in views and forms.
    

You can also import data into the table. The next unit covers how to import data.
