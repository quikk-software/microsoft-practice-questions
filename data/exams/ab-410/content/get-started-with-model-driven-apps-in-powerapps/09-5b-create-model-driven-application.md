---
title: "Exercise - Create a model-driven app"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/5b-create-model-driven-application"
uid: "learn-bizapps.powerapps-design-model-driven-apps.5b-create-model-driven-application"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Exercise - Create a model-driven app

In the [exercise](/en-us/training/modules/get-started-with-powerapps-common-data-service/4a-use-data-cds-exercise/?azure-portal=true) from the previous module of this learning path, you created the **Prospects** table in Microsoft Dataverse and imported the existing leads.

## Scenario

In this exercise, you'll use the **Prospects** table data to create a model-driven app.

If you don't have the **Prospects** table, then refer to this previous [exercise](/en-us/training/modules/get-started-with-powerapps-common-data-service/4a-use-data-cds-exercise/?azure-portal=true). Our new app will help keep managers up to date on current sales leads and forecasted revenue.

### Create the model-driven app for the Prospects table

You need the _Prospects_ table from the previous [exercise](/en-us/training/modules/get-started-with-powerapps-common-data-service/4a-use-data-cds-exercise/?azure-portal=true) to build the model-driven app in this exercise.

1.  Sign in to [Power Apps](https://make.powerapps.com/?azure-portal=true) using your organizational account.
    
2.  Select the environment where you want the app to reside, or go to the [Power Apps admin center](https://admin.powerplatform.microsoft.com/?azure-portal=true) to create a new one.
    
3.  Select **Solutions** from the left navigation. Open an existing unmanaged solution, or select **\+ New solution** to create one.
    
4.  Inside the solution, select **New** > **App** > **Model-driven app**.
    
5.  Enter the following name and select **Create**.
    
    **Name:** `Prospect Entry`
    
6.  Select **\+ Add page**.
    
7.  Select **Dataverse table**.
    
8.  Find your **Prospects** table by scrolling through the list (or by entering `Prospect` in the search field).
    
9.  Select **Prospects** and then **Add**. After a few moments, your new app will appear in the app editor screen.
    
10.  Select **Publish** to save and publish your changes.
     

### Create a chart

1.  Inside of your app, select the **Data** tab from the left-side navigation ribbon.
    
2.  Select and expand **In your app**, and then find/select your _Prospects_ table. Select the ellipses to the right of the table name, and select the **Open** option. Your table editor will open in a new browser tab.
    
    ![Screenshot of the steps to get to your table editor inside of the Power Apps editor.](media/open-table-editor.svg)
    
3.  Select **Charts** under **Data experiences**.
    
    ![Screenshot the table editor screen showing the different panes. Under data experiences, charts is selected.](media/select-charts.png)
    
4.  Select **New chart** from the header ribbon. The **Chart:New** editor appears as a new tab in your browser. The following screenshot helps you navigate through the next four steps.
    
    ![Screenshot of a model-driven app in play mode.](media/chart-editor.png)
    
5.  For the Chart Name, enter `Forecasted Revenue by Stage`.
    
6.  For **Legend Entries (Series)**, check the box to the left of this item, and select the **Forecasted Revenue** column. In the dropdown to the right, several different aggregates are available to display including **Avg**, **Sum**, **Min**, **Max**, **Count:All**, and **Count:Non-empty**.
    
7.  For **Horizontal (Category) Axis Labels**, select the **Stage** column. After a few moments, a sample graph will appear below the chart name that you entered above. Now, you can select different aggregates from the dropdown to see what different selections look like. In our example we're showing the **Count:All** aggregate.
    
8.  Select **Save and Close**. The chart editor closes and returns you to your **Charts** table. A pop-up asks if you're _Currently creating a new chart_; select **Done**. After a few moments, your Charts table will reflect your new chart. (You might need to refresh your browser.)
    
9.  Return to your App Designer browser tab, and select the **Show Chart** button in the App screen header ribbon. (It might appear as an icon the first time you look for it, but it is near the image highlighted below.) The **Show Chart** button toggles to the **Hide Chart** button, so your user can toggle it on and off. If you have data in your table, you will see the chart you just created (if you don't have any data, you can return to your **Prospects** table and manually add some):
    
    ![Screenshot of app showing chart with data.](media/show-chart.png)
    
10.  In your app editor, select **Publish**. Next, let's add a form for users to enter data.
     

### Create the form

1.  From the Power Apps Home screen, select **Tables**. Select the **Prospects** table.
    
2.  Select **Forms** under **Data experiences**.
    
    ![Screenshot showing a closeup of the data experiences pane with Forms highlighted.](media/select-forms.png)
    
3.  Select the drop-down arrow next to **\+ New form** in the header, and then select **Main Form** and **Create**.
    
4.  From the list of table columns on the left, select the **Stage** column to add it to your form. Then drag, and drop it below the **Owner** column in the form canvas. You can drag and drop any column to reposition it on the form. If you select a column without dragging it, the column is added below the currently selected form field.
    
5.  Select the **Contract Amount** column to add it below the **Stage** column.
    
6.  Select the **Probability** column to add it below the **Contract Amount** column.
    
7.  Select the **Forecasted Revenue** column to add it below the **Probability** column.
    
8.  With **Forecasted Revenue** still selected look at your **Properties** tab on the right side of the screen. Select the checkbox for **Read-only column**. When complete, your form should look similar to this screenshot:
    
    ![Screenshot showing a closeup of the data experiences pane with stage highlighted.](media/final-form.png)
    
9.  From the ribbon at the top, select **Save and Publish**.
    
10.  Return to the **Tables>Prospects>Forms** screen by selecting the **Back** button from the top left of the ribbon. Now let's make the form you just created the default form for your app.
     
11.  Select **Form settings** from the Forms ribbon, then **Form order** in the pop-up. Make sure that **Main Form** is selected in the form set dropdown. Find your new "Prospects" form. You can drag and drop to change the form order. Move your new form above the form named **Information** (to the top of the list of forms). Then select **Save and publish**.
     
     ![Screenshot of the form order settings.](media/form-order.png)
     
12.  Open your app builder from the Power Apps Home screen by selecting **Apps** and then selecting the name of your app. In the app builder, go to your **Home** screen where you have your _Prospects_ data, and select **\+ New** from the app header that is in the form canvas to bring up your new Main form.
     
     Note
     
     You might need to refresh the app to ensure that it's using your new form as the default.
     
     Select **New**:
     
     ![Screenshot showing a closeup of the data experiences pane with new highlighted.](media/select-new.png)
     
     Your new form ready for data:
     
     ![Screenshot showing the new form.](media/new-form.png)
     
     Notice that your Prospect Name, Stage, Contract Amount, and Probability fields are editable, and your Forecasted Revenue field is read-only.
     
13.  Finally, **Publish** your app.
     

Congratulations! You have successfully created a new model-driven app based on your data. Your new app includes a chart to visualize your data and a form for users' data entry.

Next, you'll learn about Copilot chat for model-driven app users.
