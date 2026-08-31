---
title: "Exercise - Create a custom table and import data"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/4a-use-data-cds-exercise"
uid: "learn-bizapps.powerapps-common-data-service.4a-use-data-cds-exercise"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Exercise - Create a custom table and import data

## Scenario

Your current sales process is manual, and updates occur only on Fridays. You want to simplify the process, reduce the likelihood of errors, and improve visibility. To do this, you'll build an app that tracks sales leads and automatically calculates forecasted revenue. You'll use Microsoft Dataverse to store the list of potential customers.

## Use Microsoft Dataverse to store data

In this exercise, you'll use a custom table in Microsoft Dataverse to store the list of potential customers.

You'll learn how to:

*   Create a custom table
*   Add custom columns to the table
*   Create a formula column (calculated)
*   Configure a business rule
*   Import data from a Microsoft Excel workbook

### Create a custom table

1.  Go to the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true) and sign in.
    
2.  From the left navigation pane, select **Tables**.
    
3.  In the command bar, select **\+ New table**, then select **Set advanced properties**.
    
    [![Screenshot showing the option to create a new table.](media/new-table-command-new.png)](media/new-table-command-new.png#lightbox)
    
4.  Under **Properties**, set the **Display name** to _Prospect_.
    
5.  Select the **Primary column** tab and set the **Display name** to _Prospect Name_.
    
6.  Select **Save**.
    
7.  Once saved, the _Tables > Prospect_ screen appears.
    
    [![Screenshot of the Prospect table main screen.](media/prospect-table-main-screen.png)](media/prospect-table-main-screen.png#lightbox)
    
8.  Select **New > Column** to create a new column.
    
9.  In the _New column_ panel, enter the following:
    
    *   **Display name**: _Stage_
    *   **Data type**: _Choice_
    *   **Required**: _Business required_
10.  Under **Sync this choice with**, select **New choice**. In the _New choice_ pane, enter the following and select **Save**:
     
     *   **Display name**: _Prospect Stage_
     *   Under **Label**, enter and save the following:
         *   _Lead_ (Value: **1**)
         *   _Opportunity_ (Value: **2**)
         *   _Won_ (Value: **3**)
         *   _Lost_ (Value: **4**)
     
     ![Screenshot of the new choice pane with four choices.](media/new-choice-pane.png)
     
11.  After saving the choice, select **Prospect Stage** from the **Sync this choice with** dropdown.
     
     ![Screenshot showing Prospect Stage selected in the sync dropdown.](media/sync-with-prospect-stage.png)
     
12.  Under **Default choice**, select **Lead**.
     
13.  Select **Save**.
     
14.  Repeat the steps to add two additional columns:
     
     *   **Display name**: _Contract Amount_
         
     *   **Data type**: _Currency_
         
     *   **Display name**: _Probability_
         
     *   **Data type**: _Whole Number_ (select _Number_, then _Whole number_)
         
15.  Add another column with the following:
     
     *   **Display name**: _Forecasted Revenue_
     *   **Data type**: _Formula_
     
     Once you select _Formula_, an input field appears below **Data type**.
     
16.  Enter the formula:
     
     ```
     Decimal('Contract Amount') * (Probability / 100)
     ```
     
     Note
     
     Ensure that the column names used in the formula exactly match those created earlier. If typing manually, Power Apps provides auto-suggestions to help you select the correct fields. Use the _Decimal_ function to convert the _Contract Amount_ from currency to a usable decimal value.
     
17.  Select **Save**.
     

### Add a business rule

1.  In the table designer, select **Business rules** from the _Customizations_ pane on the right.
    
2.  Select **New business rule** from the command bar. A new browser tab opens.
    
    [![Screenshot of new business rule browser window.](media/new-business-rule.png)](media/new-business-rule.png#lightbox)
    
3.  Select the **Condition New Condition** step in the design canvas. The _Properties_ panel appears on the right.
    
4.  In the _Properties_ panel under _Rules_, verify that **Contract Amount** is selected for the **Field**.
    
5.  Change the **Operator** value to **Contains data**.
    
6.  Select **Apply**.
    
7.  Select the **Components** tab.
    
8.  Drag the **Set Business Required** component to the plus symbol to the right of the purple checkbox in the canvas.
    
    [![Screenshot of drag set business required action to new condition.](media/drag-set-business-required.png)](media/drag-set-business-required.png#lightbox)
    
9.  With _Set Business Required New Action_ selected, go to the _Properties_ panel and:
    
    *   Set the **Field** to **Probability**
    *   Set the **Status** to **Business Required**
10.  Select **Apply**.
     
     [![Screenshot of the properties pane of the Set Business Required with Field and Status dropdowns selected, along with the Apply button.](media/set-business-required.png)](media/set-business-required.png#lightbox)
     
11.  In the command bar, select the chevron next to **Prospect New business rule** to expand the name and description fields.
     
12.  Enter **Make Probability Required** for the **Business rule name**.
     
13.  Select **Save** from the command bar.
     
14.  Select **Activate**.
     
15.  When the _Process Activate Confirmation_ window appears, select **Activate** again.
     
16.  Close the business rule browser tab.
     
17.  In the pop-up, select **Done** to confirm the creation.
     
18.  Verify that the new business rule appears in the Business rules list. Then select **Prospect** at the top to return to the table editor.
     
     ![Screenshot of Business rules chart showing your new rule: Make Probability Required. The Prospect table name is highlighted.](media/business-rule-list.png)
     

### Import data from an Excel file

1.  Download the exercise file [Prospects.csv](https://github.com/MicrosoftDocs/mslearn-developer-tools-power-platform/raw/master/power-apps/Prospects.zip) and extract the CSV.
    
2.  Open _Prospects.csv_ in Excel and enter the following values in the **Stage** column:
    
    *   Contoso Flooring: Won
    *   Fabrikam Inc: Won
    *   Adventure Works: Lead
    *   VanArsdel: Lost
    *   Adatum: Lead
    *   Relecloud: Opportunity
3.  Save the file as _Prospects.xlsx_ and close Excel.
    
4.  In the Power Apps maker portal, return to the **Prospect** table.
    
5.  Select **Import > Import data**.
    
    Note
    
    Select **Import data**, not **Import data from Excel**, which is a legacy function. The correct option activates Power Query.
    
6.  In the Power Query window, upload the _Prospects.xlsx_ file by dragging it in, browsing for it, or connecting via OneDrive.
    
    ![Screenshot of Power Query window Choose data source showing the various options to connect to your data.](media/power-query.png)
    
7.  When the **Preview file data** screen appears, confirm that the table shows _ContractAmount_, _Probability_, _Name_, and _Stage_. Select **Next**.
    
8.  In the Power Query editor, verify column data types. Set _ContractAmount_ to **Currency**. Select **Next**.
    
    ![Screenshot of Power Query window showing data shaping options.](media/shape-data.png)
    
9.  Under **Choose destination settings**, select **Load to existing table** and choose the _Prospect_ table.
    
10.  In **Column Mapping**, confirm that columns are matched. Map **Name** to **Prospect Name** manually if needed. Ensure there are no unmapped columns.
     
     ![Screenshot of Power Query window showing load settings and column mapping with load to existing table and matched columns.](media/matched-columns.png)
     
11.  Select **Next**, then choose **Refresh manually** for refresh settings.
     
12.  Select **Publish** to import the data.
     
13.  Refresh the browser to view the imported data.
     
14.  Confirm the data appears correctly in the **Prospect** table.
     
     [![Screenshot of final look at columns showing imported data.](media/final-columns.png)](media/final-columns.png#lightbox)
     

Congratulations! You've created a custom Dataverse table, configured a business rule, and imported data from Excel.
