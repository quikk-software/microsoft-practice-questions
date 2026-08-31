---
title: "Exercise - Create recurring flows"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/6-flow-scheduled-flows"
uid: "learn-bizapps.flow-get-started.6-flow-scheduled-flows"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Exercise - Create recurring flows

In this unit, you learn how to build prescheduled flows by using a trigger called _recurrence_. Contoso has an annual event and they receive phone calls inquiring about the details. The Contoso team answering the phone calls places the contact information in a Microsoft Excel workbook on Microsoft OneDrive. You build a flow for the Contoso event team that automatically pulls customer email addresses from a Microsoft Excel workbook on Microsoft OneDrive. You'll then set up the flow so that any email addresses that anyone adds to the workbook will receive an event information email once a day.

## Prerequisites

For this scenario, you create an Excel file with a table that contains the following columns: ContactEmail, FirstName, and LastName. Save the Excel file in OneDrive. You connect to this file in step 9. Use your organization email address as the ContactEmail, using your email makes testing the flow easier.

### Format an Excel Table

1.  Highlight all the cells that contain data.
    
2.  Select the Insert tab.
    
3.  Select the Table option.
    
4.  Make sure "My table has headers" is checked.
    
5.  Select Ok.
    
6.  Save the file in OneDrive.
    

![Screenshot of formatting an Excel table.](media/excel-table.svg)

Here’s what the Excel table looks like after being formatted:

![Screenshot of the Excel table.](media/table.png)

## Create a scheduled flow

1.  Sign in to [Power Automate](https://make.powerautomate.com/) by using your organizational account.
    
2.  Make sure you are in the correct environment.
    
3.  In the input field in the middle of the screen, type _Create a flow that runs daily, gets a list of excel rows and for each row, send an email._ Select **Generate**.
    
    ![Screenshot of the Power Automate home page and the words Create a flow that runs daily, gets a list of Excel rows and for each row, send an email.](media/scheduled-flow-home-page.svg)
    
4.  Copilot does its best to come up with a flow and its actions from the description.
    
    1.  If Copilot provided incorrect actions, you can continue to refine the flow actions in this top box.
    2.  In this example, Copilot added a **List rows present in a table (Excel)** action, a **For Each** action and within the For Each, a **Send an Email** action.
    3.  Review the actions Copilot generated and select **Next**.
    
    ![Screenshot of Copilot generated flow with a recurrence trigger, get rows from Excel action, a for each action and a Send an Email action.](media/scheduled-flow-review-copilot.svg)
    
5.  Select the **Recurrence** trigger to open the properties panel on the left and to verify Copilot set the correct parameters.
    
    Note
    
    Be mindful of the repeating module you select and how often you would like the flows to run. In the below example, the flow runs daily at 10:00 a.m. You can set these options however you like.
    
    ![Screenshot of parameters for the recurrence trigger demonstrating the interval is 1, frequency is every 1 day, and at these hours is 10.](media/scheduled-flow-trigger-review.svg)
    
6.  Select the **List rows present in the table** action to open the properties panel on the left.
    
    1.  In the **Location** field, select **OneDrive for Business**.
        
    2.  In the **Document Library** field, select the drop-down arrow and select **OneDrive**.
        
    3.  In the **File name** field, select the folder button, and then select the Excel file to use. In our example, it's **Book1.xlsx**, but your file may have a different name.
        
    4.  In the **Table name** box, select the drop-down arrow, and then browse to and select the table to use. In our case, it's **Table1**.
        
    
    ![Screeshot of the properties panel of the List rows present in a table action.](media/scheduled-flow-parameters.svg)
    
7.  Next, we want an email to be sent to each contact in the Excel file. Copilot automatically puts our **Send an email** action inside of a **For Each** action so we only need to configure the **Send an Email** action.
    
    1.  Select the **Send an email** action to open the properties panel on the left. Select inside the **To** field and select **Enter custom value**.
        
        ![Screenshot showing the Enter custom value button.](media/scheduled-enter-custom-value.svg)
        
    2.  Type **/** and then select **Insert Dynamic Content**, or simply select the button with the lightning bolt icon that appears to the left of the input field.
        
        ![Screenshot showing the insert expression button.](media/scheduled-flow-dynamic-content.svg)
        
    3.  Select **ContactEmail** from the available dynamic content under the _List rows present in a table_ step.
        
        > ![Screenshot showing the contact email field.](media/scheduled-flow-contact-email.svg)
        
    4.  Enter **Contoso Event Information** for Subject.
        
    5.  Type **Dear** in the Body and then type **/**, and select the **Insert Dynamic Content button**.
        
        > ![Screenshot showing the insert dynamic content button.](media/scheduled-flow-email-body.svg)
        
    6.  Select **FirstName** from the dynamic content.
        
    7.  Press **ENTER** and then type _Thank you for your interest in Contoso's annual event. As information becomes available, you'll be the first to know!_
        
    8.  The **Send an email** step should now look similar to the image below.
        
        > ![Screenshot showing the send an email step.](media/scheduled-flow-full-email.svg)
        
8.  Select **Save** and wait for the flow to be saved.
    
9.  Your cloud flow should now resemble the image below. Select **Test**.
    
    > ![Screenshot showing the test icon and where to click to run the flow.](media/scheduled-flow-test.svg)
    
10.  Select **Manually** and then select the **Test** button.
     
11.  Select **Run flow**.
     
12.  Select **Done**.
     
13.  The flow should run successfully. You should see green checks appear over the steps as the flow proceeds, and a banner appears at the top of your screen.
     
     > ![Screenshot showing a successful flow run.](media/scheduled-flow-successful-run.svg)
     
14.  You should receive an email like the one below.
     
     > ![Screenshot showing email sent by the cloud flow.](media/scheduled-flow-outlook-email.png)
     

And there you have it!

As we've written it, this flow will now run once a day. It will:

*   Get the rows from the Excel worksheet
    
*   Grab the email address and name from each row
    
*   Enter the email address and name in the email, and send them an event information email
    
*   Save you from manually composing emails to each interested caller.
    

Maybe this isn't exactly the behavior you're looking for, but you can modify how Power Automate receives data. Hopefully, you can see the possibilities!
