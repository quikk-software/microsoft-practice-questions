---
title: "Exercise - Create an app from Excel using Copilot"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps/create-app-copilot"
uid: "learn-bizapps.powerapps-get-started.create-app-copilot"
module: "get-started-with-powerapps"
moduleTitle: "Get started with Power Apps canvas apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Exercise - Create an app from Excel using Copilot

If you're building in an Environment that includes Microsoft Dataverse, you can use Copilot to create a canvas app in two ways:

*   **Upload a file** — Provide an Excel spreadsheet. Power Apps imports it as a Dataverse table and generates an app from the data.
*   **Describe your data in a conversation** — Describe what your app needs to track in plain language. Copilot generates a Dataverse table structure from your description and builds the app.

Both approaches require a Dataverse-enabled environment. Unfortunately, this option is **not** available in an environment without Dataverse, but you can scan through this unit and see how easily an app can be built with Copilot.

The goal for this lesson is to show you how easy it is to create a Power Apps canvas app using Copilot.

Important

To fully take advantage of this feature, you'll need to use an Environment that includes Dataverse, and you may need to sign up for a Power Apps license (or free trial) that includes Dataverse. Without these, you won't be able to complete this exercise.

Note

Copilot builds tables using Artificial Intelligence (AI). AI isn't deterministic, meaning your results will likely be slightly different from what's shown below.

## Create a canvas app from a conversation

Instead of providing data, you can describe what you need in plain language and let Copilot generate the data model and app for you.

1.  Go to the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true).
    
2.  From the home page, select **Start with data**.
    
3.  On the **Create an app** page, select **Create new data**.
    
4.  In the text field, describe what you want your app to track. For example:
    
    `I need an app to track product inventory with fields for product name, product type, color, and notes.`
    
5.  Copilot generates a suggested Dataverse table structure based on your description. Review the proposed columns and data types.
    
6.  Refine the table by chatting with Copilot — for example: `Add a Choice column called Product Line with options Standard, Pro, and Enterprise.`
    
7.  When the table looks right, select **Save and open app**. Power Apps saves the Dataverse table and opens the generated app in Power Apps Studio.
    

## Evaluate field suggestions

Whether you use the Upload file or conversation path, Copilot generates column names and data types automatically. Before saving the table and generating the app, it's important to evaluate these suggestions rather than accepting them without review.

What to check for each column:

*   **Name** — Does the column name match what your users will expect? Rename it now if not; renaming a column after an app is built requires updating every formula that references it.
*   **Data type** — Is the type appropriate for the data? Common types to verify:
    *   Columns that represent categories with a fixed set of values (like Status, Type, or Region) should be **Choice**, not _Single line of text_.
    *   Columns that represent numbers used in calculations should be **Number** or **Currency**, not _Single line of text_.
    *   Columns storing dates should be **Date only** or **Date and time**, not _Single line of text_.
*   **Required vs. optional** — Avoid marking columns as required in Dataverse unless you want the table itself to enforce completeness. Validation is usually better enforced in the app.

If Copilot's suggestions don't look right, use the Copilot pane to correct them in natural language, or select the column header and choose **Edit column** to adjust properties directly.

## Upload a file to create an app

Start this exercise by downloading and extracting (or unzipping) a [sample worksheet](https://github.com/MicrosoftDocs/mslearn-developer-tools-power-platform/raw/master/power-apps/copilot/ProductList.zip). (Or, if you prefer, you can use one of your own.)

1.  Download the [**Product List**](https://github.com/MicrosoftDocs/mslearn-developer-tools-power-platform/raw/master/power-apps/copilot/ProductList.zip) worksheet. Extract all the files.
    
2.  Go to the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true).
    
3.  From the home page, select **Start with data**.
    
4.  On the **Create an app** page, select **Upload file**.
    
    [![Screenshot of the Create an app page with the Upload file option highlighted.](media/start-with-data.svg)](media/start-with-data.svg#lightbox)
    
5.  Select **Select from device**, find and select the **ProductList.xlsx** file you downloaded and extracted, and then select **Import**.
    
6.  A preview table is being created, and this takes a few moments. Once the new table is created, you can examine it. Select the ellipsis on the **Product Inventory** table and select **View data**.
    
    Notice how Power Apps added the title **Product Inventory** (or similar) and created our column names, too! The column headers might match the Excel spreadsheet. If not, you can use your Excel headers. There's a toggle to **Use first row as column headers** at the top right that you toggle **on** to use your Excel column names.
    
    [![Screenshot of the table preview.](media/product-catalog-table.png)](media/product-catalog-table.png#lightbox)
    
7.  If you used the downloaded Excel Product List, there should be six columns. Review each column's name and data type:
    
    *   **Title** and **Code name** should be _Single line of text_
    *   **Product Line**, **Product Type**, and **Color** should be _Choice_ — these are categories with a fixed set of values, so Choice is the right type
    *   **Notes** should be _Single line of text_
    
    This is a good moment to apply the field evaluation approach described earlier in this unit: check that names are meaningful, types are appropriate, and no columns are unnecessarily marked as required.
    
8.  If these aren't the column types that Copilot created, you can have Copilot change them. In the table editor, select the **Copilot** button in the toolbar to open the Copilot pane.
    
9.  With the Copilot dialog pane open on the right hand side of the screen, type, "Please change the column types for the Product Line, Product Type, and Color columns to be Choice type columns." Work with Copilot until you have the data shaped as you would like and these three columns are choice type columns.
    
    You can also change or modify any of the columns by selecting the column header, selecting **Edit column**, and then adjusting the properties in the pop-up window. You can edit the table properties by selecting the ellipsis to the right of the table name and then selecting **Settings**.
    
    [![Screenshot of the Product Inventory table with the ellipsis highlighted and focus on the Edit table pop up window.](media/edit-table.png)](media/edit-table.png#lightbox)
    
10.  Now you're ready to create your app! Select the **Save and open app** button in the top right. A pop-up advises you that Power Apps will save the tables and relationships that you've created and open the app in Power Apps Studio. Select **Save and open app**.
     
11.  After a few moments, the app opens in Power Apps Studio in Edit mode. You may get a pop-up window welcoming you to Power Apps Studio; if so, you can select **Skip**. If you receive a notification that your data source was added to your app, you can X out that notification, too.
     
     [![Screenshot of the app generated by Copilot with the Copilot panel highlighted.](media/copilot-app.svg)](media/copilot-app.svg#lightbox)
     
     When Copilot produces your app, it estimates what data your gallery displays. You can select the most appropriate columns for your gallery, and you can change them in the Power Apps editor.
     
12.  Notice that your app title shows at the top of the screen.
     
13.  Also notice that you have a gallery of products on the left side of the screen, and product details for the selected item in the gallery on the right side of the screen.
     
14.  A Copilot panel appears on the right side of the screen available to assist you with changes you want to make to the app.
     
15.  All that's left is to save and publish. To see the save icon, you'll need to close the Copilot pane by selecting the **X** in the pane's top right corner.
     
     Select the **Save** icon in the upper right corner (it looks like a floppy disk). You'll need to provide a name, if you haven't already, and select **Save** again. Once the save is complete, select the **Publish** icon on the far upper right corner (it looks like a file with a circled arrow on the lower right corner).
     
16.  Put your app in **Preview mode** to test functionality. You can do that by selecting the **Play** icon to the left of the **Save** icon.
     
     The search functionality for an app with Dataverse as the data source is robust. It can easily search through any text field. Enter "ultra" into the search input field. Notice how it filters based on the **Title** column for that specific pattern. Clear the input field and enter "aud." Notice how it filters to car audio options choices and it ignores font case as it searches.
     
17.  While your app is still in preview mode, you can try the edit form functionality. Find and select the item "Headphones 2000w." Edit this item by selecting the pencil (Edit) icon at the top right of the form. Under Notes, enter "includes case" and select the check icon at the upper right of the form to save the change. Your item now includes the note.
     
18.  This app is fully responsive, meaning that it adjusts to the form factor that it's running from (for example, tablet or phone). With your app still in preview mode, look in the top right corner and notice there are three form factor options that you can preview. When you select one of them, there are further options where you can match specific type of tablet or mobile phone. You can even change orientation of the target device to see what happens with the user experience. Choose one that resembles a mobile device that you use so you can see how the app screens would behave on your phone.
     

## Summary

Copilot gives you two fast paths to a working canvas app: describe your data in a conversation, or upload an existing Excel file. Either way, reviewing Copilot's field suggestions before saving the table is an important step — correcting a column name or data type now is far easier than fixing it after an app is built on top of it. Once the table is saved, Power Apps generates a fully functional app with gallery, form, and search — ready for you to extend.
