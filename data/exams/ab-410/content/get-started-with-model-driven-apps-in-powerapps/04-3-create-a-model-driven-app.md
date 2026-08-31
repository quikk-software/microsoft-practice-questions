---
title: "Exercise - Create a model-driven app"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/3-create-a-model-driven-app"
uid: "learn-bizapps.powerapps-design-model-driven-apps.3-create-a-model-driven-app"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Exercise - Create a model-driven app

In this unit, you'll create a model-driven app using one of the standard tables available in your Microsoft Power Apps environment. Before Creating a model-driven app, you must first create a **Solution**, where your app resides.

## Create a Solution and add an existing data table

1.  On the Power Apps home page, select **Solutions** (you might need to select **More** from the left side navigation panel, then you can find **Solutions**).
    
2.  Select **New solution** from the command bar.
    
3.  In the **New solution** panel that appears on the right side of your screen, input the following:
    
    Display name: Learning Account
    
    Publisher: \[select one from the dropdown\]
    
4.  Select the **Create** button at the bottom of the panel.
    
5.  Once your Solution appears, you see a list of **Objects** in the left hand pane. Each **Object** is followed by a number in parenthesis denoting how many items of that object type are part of the solution. For example, Agents(0) indicates that there are zero agents in this solution. In the command bar along the top of the screen, select **Add existing** > **Table**.
    
6.  Find and select the **Account** table. Then, select **Next**.
    
7.  The **Selected tables** open. Select the box **Include all objects**. Then select the **Add** button at the bottom of the screen.
    

After a moment, your **Account** table will show up as an object for your solution. In the list of objects on the left, it now shows **Tables (1)**, indicating that there's now one table object in your solution.

## Create a model-driven app

1.  While still in the Solution **Objects** menu, go to the command bar along the top of the screen and select **New** > **App** > **Model-driven app**.
    
2.  Name your app "Learning Accounts" and select **Create**
    

Your new app opens in the App Designer, and you can now add components to it.

## Add a page to your app

You can add pages to your app from within the App Designer.

1.  Select **Add Page** from the command bar along the top of the screen.
    
    [![Screenshot of the Site Map Designer view.](media/app-designer-start.svg)](media/app-designer-start.svg#lightbox)
    
2.  In the **Add page** popup window, select **Dataverse table**. Next, select the **Account** table and select the **Add** button.
    
    Note
    
    If the _Account_ table isn't showing as an option, you may not have any sample data in your environment. Refer to this exercise on [how to create sample apps and data](/en-us/training/modules/intro-model-driven-apps-common-data-service/4-template-apps/?azure-portal=true). If the sample data doesn't appear, refer to this documentation to add [sample data](/en-us/power-platform/admin/add-remove-sample-data/?azure-portal=true).
    

**Publish** your app using the button in the top right side of the command bar. **Publish** will automatically save/publish your app.

## Edit your form

When we created the app, Power Apps automatically created forms for our app. Let's modify the main form for the Accounts table. At the far left of the screen, there's a navigation pane that lists **Pages**, **Data**, and **Automation**. Select **Pages** in the left navigation pane, if it isn't already selected. When you select **Pages**, the pages panel opens immediately to the right of this pane. In the **Navigation** section of the pages panel, you can see that your app currently has one page in it, the **Accounts view**. Expanding the **Accounts View**, you'll find the **Accounts form**.

1.  Select the **Accounts form**. When selected, your form shows on the Power Apps canvas the same way it appears in the app for your users.
    
2.  Select the pencil to the right of the **Accounts form** name to edit the form.
    
3.  There are many customization options on this preconfigured form. Let's do a couple of simple changes, so you can see how easy it's to modify a form. There's a **Table columns** pane to the left of your canvas. Scroll down through this list of options in this pane and select **Ticker Symbol**. Observe that the **Ticker Symbol** column was added to your form.
    
4.  We don't need a ticker symbol on the form, so let's delete it. With the **Ticker Symbol** still selected, select **Delete** from the command bar (or the delete button on your keyboard) to remove it. When you delete this item, you're not deleting this column from your data; you're simply removing it from the form. If you accidentally delete a column, Power Apps has a handy **Undo** button in the command bar just to the right of the Back button.
    
5.  At this point, if you've made any changes you want to keep, select **Save and publish** from the top right of the command bar.
    
6.  Once Power Apps finishes republishing your form, select **Back** from the top left of the command bar to exit the form editor and return to your app editor.
    

## Edit views

When you created this app, Power Apps also made **views** for the Accounts table. In the pages panel under **Navigation**, you can see any views that are already part of your app. Here, you can see an **Accounts view** was created, and your canvas shows the view **My Active Accounts**. The dropdown just to the right of the title **My Active Accounts** allows you to select another view. Select on the dropdown to see the other views that are available. Let's edit a view.

1.  Select **Accounts view** in the **Navigation** menu of the pages panel. Notice that a panel appears on the right side of the screen. This panel shows all of the views in your **Accounts** table (the same list that you can see when you select the drop-down next to **My Active Accounts** in the canvas). The list of views in this panel also shows the type of view (public or private). Here, you can also see that **My Active Accounts** is the _Default_ view for the app.
    
2.  We're going to modify the **My Active Accounts** view. First, make sure that that's the view that's selected. (The canvas should still show the title **My Active Accounts**. If it doesn't, select **My Active Accounts** from the list of views in the right side panel.) Now, select **Edit view** from the command bar at the top to open the **View editor**.
    
3.  The **View editor** looks similar to the **Form editor** that we used. A canvas in the center displays columns that show in the View for your users. Let's add the **State/Province** to the view. Find **Address 1: State/Province** from the list of **Table columns**. (You can use the search field above the list.) Select it to add it to the view.
    
4.  Power Apps allows you to reposition columns easily. Let's move the **Main Phone** column to the far right of the view. Left select and hold the **Main Phone** column header in the center canvas, then drag and drop it to the right of the **Address 1: State/Province**, column.
    
    [![Screenshot of the Site Map edit view.](media/edit-view.svg)](media/edit-view.svg#lightbox)
    
5.  To save your changes, select **Save and publish** from the top right of the command bar.
    
6.  When Power Apps is done publishing the changes, select the **Back** button to close the **View editor**. Notice that your preview canvas now includes the State/Province column.
    

## View a chart

Power Apps includes some interactive charts, created with the sample data, in the **Accounts** table. Let's explore these.

1.  Within your preview canvas, select the **Show Chart** button from the app command bar (the bar at the top of your user preview canvas, in the middle of the screen).
    
2.  The chart panel appears below the title. Select the dropdown next to the title **Accounts by Industry**, to can change the chart view. Try switching the view between several options including: _Accounts by industry_, _Accounts by owner_ and _New Accounts By Month_ to see a few examples.
    

Notice that there are different ways you can portray data within a view.

To give you an idea of what's possible with charts, below is an example of a system dashboard called **Innovation Challenge**. If you have sample apps and data in your Dataverse environment, you can find this app in your apps list. This app includes three views and a Dashboard screen (depicted below).

[![Screenshot of the innovation challenge view.](media/innovation-challenge.svg)](media/innovation-challenge.svg#lightbox)

Next, you'll learn about generative pages — an AI-powered way to build pages in your model-driven app using natural language.
