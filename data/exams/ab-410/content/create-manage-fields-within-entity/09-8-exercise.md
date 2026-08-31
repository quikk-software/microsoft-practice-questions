---
title: "Exercises"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/8-exercise"
uid: "learn-dynamics.create-manage-fields-within-entity.8-exercise"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Exercises

## Add columns to a custom table

In this exercise, you add a few columns to the custom table PC Manufacturers. If you haven't created the custom table as a part of this learning path, you can complete the steps [here](/en-us/learn/modules/create-manage-entities/5-exercise) to create this table.

1.  In your browser, go to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true), From the left navigation menu, select **Tables**. If you don't see Tables on the left, you can select **More**, then in the flyout menu find and select **Tables**.
    
2.  Select the custom table **PC Manufacturers** from the list of tables.
    
    Tip
    
    You can enter the table title in the search window in the top right of the maker portal command bar.
    
    Selecting the table opens the Table view screen showing panes like the image below.
    
    ![Screenshot of the Tables screen with the add button highlighted next to the columns and data pane.](media/add.png)
    
3.  Select the **+** button in the columns and data pane to add another column next to your _Name_ column.
    
4.  Type **PC Brand Name** in the **Display name** column.
    
5.  Keep the **Searchable** check box selected.
    
6.  Select **Save**.
    
    ![Screenshot of Done button on the PC Brand Name screen.](media/exercise-1.png)
    
7.  Select **+** in the columns and data pane to add another column.
    
8.  Type **Description** in the **Display name** column.
    
9.  Select **Text area** in the Data type. Notice how the **Data type** now displays _Single line of text_ and the **Format** displays _Text area_. Leave the other fields as they are.
    
10.  Select the **Save** button.
     

Your PC Manufacturers table should now include the newly added columns, _PC Brand Name_ and _Description_.

## Rename a primary column

Next we'll rename the primary column called _Name_ that was created by default when you created the custom table **PC Manufacturers**.

1.  If needed, reaccess your **PC Manufacturers** table.
    
2.  In the _Tables > PC Manufacturers_ editor window, you should now see **PC Manufacturers** displayed. The columns and data pane in the bottom half of the screen shows your **Name** column. Go ahead and select the column, then select **Edit column**.
    
    ![Screenshot of Tables PC Manufacturers window with the Name column highlighted.](media/exercise-3.png)
    
3.  In the popup _Edit column_ pane, notice that this column is both **Searchable** and **Business Required**. Update the _Display Name_ field to **PC Model Name**, as shown in the following image.
    
    ![Screenshot of Display name as PC Model Name.](media/module_4_-_unit_4_-_image_2.png)
    
4.  Select **Save**.
    

## Add an autonumber column

Next, let's add an autonumber column to help identify the manufacturer record in the custom table.

1.  If needed, reaccess your **PC Manufacturers** table.
    
2.  Add a column in your columns and data pane by selecting the **+** button.
    
3.  On the _New column_ popup pane on the right, enter **PC Model ID** for the _Display name_ and select **Autonumber** for the _Data type_.
    
4.  Under _Autonumber type_, select **Custom**.
    
5.  Leave the **Format** as the default of **{SEQNUM:4}**.
    
6.  Customize a **Seed value** or keep the default value of **1000**.
    
    ![Screenshot of Data type, Format and Seed value.](media/module_4_-_lab_4_-_image_1.png)
    
7.  Select **Save**.
    

## Create a key

Create a key to ensure that the value is unique and indexed.

1.  If you're not already in your Tables editor screen, follow the earlier steps to get to your **PC Manufacturers** table.
    
2.  In the _Schema_ pane near the top-middle of the Tables editor screen, select **Keys**.
    
3.  Your browser navigates to the _Keys_ screen. Select **\+ New Key** from the command bar at the top.
    
4.  Enter **PC Key** in the **Display name** column.
    
5.  Select the check box next to the **PC Model Name** column.
    
    Note
    
    A key can be made up of one or many columns. If you select multiple columns, then the key is called a compound key.
    
    ![Screenshot of PC Key with Display name and PC Model Name column selected.](media/module_4_-_lab_6_-_image_1.png)
    
6.  Select **Save**.
    

After a few moments, you'll see the new key added to the keys list for this table. You can create up to 10 keys for each table. All values in the key are unique.

Nice work! Next, let's review what we've learned.
