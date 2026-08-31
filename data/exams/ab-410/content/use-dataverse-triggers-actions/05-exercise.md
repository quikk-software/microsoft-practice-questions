---
title: "Exercise - Create a cloud flow with a Dataverse connector"
url: "https://learn.microsoft.com/en-us/training/modules/use-dataverse-triggers-actions/exercise"
uid: "learn-bizapps.use-dataverse-triggers-actions.exercise"
module: "use-dataverse-triggers-actions"
moduleTitle: "Use Dataverse triggers and actions in Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Exercise - Create a cloud flow with a Dataverse connector

Your organization wants to ensure that when a new contact is created, they're only marked **Active** if no existing contact has the same email. If a duplicate is detected, the status should remain **New** for manual review. By the end of this module, learners are able to:

*   Create an automated cloud flow using the Dataverse connector
*   Use the **List rows** action with a filter expression
*   Update a Dataverse row based on conditions
*   Understand how to avoid duplicate data entries in Microsoft Dataverse

### Set up the contacts table (skip if table already exists)

1.  Navigate to [Power Apps](https://make.powerapps.com) maker portal.
    
2.  Select **Tables** on the left side.
    
3.  Select **New table** and **Create new tables** in the top left.
    
    [![Screenshot of the create new table.](media/new-table.png)](media/new-table.png#lightbox)
    
4.  Choose **Start from blank**.
    
    [![Screenshot of the start from blank option.](media/start-from-blank.png)](media/start-from-blank.png#lightbox)
    
5.  Name the table **Contact**.
    
6.  Change the Primary Column to **Full Name**.
    
7.  Create a new text column called **Email** and set it to required.
    
8.  Create another new column called **Status** and make it a choice column. Change the choices to be **New**, **Active** and **Inactive**. Your table should look like the image below:
    
    [![Screenshot of the table design.](media/contact-table.png)](media/contact-table.png#lightbox)
    
9.  When done, choose **Save and exit** in the top right corner.
    

### Create the cloud flow

1.  Navigate to [Power Automate](https://make.powerautomate.com) maker portal.
    
2.  Select **My flows** from the left navigation, and then select **New flow** and **Automated cloud flow**.
    
3.  Name your flow: `Check for Duplicate Contacts`.
    
4.  Select trigger: **When a row is added, modified, or deleted** (Microsoft Dataverse).
    
5.  Select **Create**.
    
    [![Screenshot of the create flow settings.](media/create-flow.png)](media/create-flow.png#lightbox)
    
6.  Select the **When a row is added, modified, or deleted** trigger and change type to **Added**.
    
7.  Choose the **Contacts** table.
    
8.  Change scope to **Organization**.
    
    [![Screenshot of the trigger data.](media/trigger-action.png)](media/trigger-action.png#lightbox)
    
9.  Under the trigger, select the **+** icon to add a new step.
    
10.  Search for **List rows** under **Microsoft Dataverse**.
     
     [![Screenshot of the list rows action.](media/list-rows.png)](media/list-rows.png#lightbox)
     
11.  Choose the **Contacts** table, then under **Filter rows** type
     
     ```
     emailaddress1 eq ''
     ```
     
12.  Place your cursor between the two single quotes and select the lightning bolt icon on the right side of the text box. Then choose **Email** from the dynamic data. Your action looks like this image:
     
     [![Screenshot of the values for filtering the data.](media/filter-rows.png)](media/filter-rows.png#lightbox)
     
13.  Under the List rows action, select the **+** icon to add a new step.
     
14.  Search for and add the **Condition** action.
     
     [![Screenshot of the condition action.](media/condition-action.png)](media/condition-action.png#lightbox)
     
15.  Select the condition action and on the left side of the formula select the **fx** icon to add a function, then copy and paste this function and select **Add**
     
     ```
     length(body('List_rows')?['value'])
     ```
     
16.  Set the value on the right side of the formula to _1_. This checks that only one contact exists with that email (that is, the one just added). If more exist, it's a duplicate. Your condition should look like the image below:
     
     [![Screenshot of the condtion values.](media/condition-value.png)](media/condition-value.png#lightbox)
     
17.  Under the **True** branch, select the **+** icon to add a new step.
     
18.  Search for and add the **Update a row** action under Microsoft Dataverse.
     
     [![Screenshot of the update a row action.](media/update-row.png)](media/update-row.png#lightbox)
     
19.  Choose the **Contacts** table.
     
20.  For the **Row ID**, select the lightning bolt icon to show the dynamic data and search for **Contact**. Choose the **Contact** column under the **When a row is added, modified, or deleted** section. This is the unique identifier of the table.
     
     [![Screenshot of the dynamic data for row ID.](media/row-id.png)](media/row-id.png#lightbox)
     
21.  Under **Advanced Parameters**, search for **Status** and set the value to **Active**.
     
     [![Screenshot of the advanced parameters.](media/advanced-parameter.png)](media/advanced-parameter.png#lightbox)
     
22.  Save the flow in the top right corner.
     
23.  In a new tab, navigate to the [Power Apps](https://make.powerapps.com) maker portal.
     
24.  Select **Tables** on the left side, find, and select the **Contacts** table.
     
25.  Select **Edit** on the right side of the table data.
     
     [![Screenshot of the contacts table to find.](media/contacts.png)](media/contacts.png#lightbox)
     
26.  Select **\+ New row** at the top and enter a new contact with a unique email.
     
27.  Add another contact with the same email to test the duplicate logic.
     

Check flow runs in **Power Automate > My flows > Run history**.

### Summary

In this exercise, you:

*   Created a cloud flow triggered by a Dataverse record creation
    
*   Used a filtered List rows to check for duplicate email addresses
    
*   Conditionally updated the contact's status to Active
