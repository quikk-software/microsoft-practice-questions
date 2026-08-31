---
title: "Exercise - Monitor incoming emails"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/flow-monitor-incoming-emails"
uid: "learn-bizapps.flow-get-started.flow-monitor-incoming-emails"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Exercise - Monitor incoming emails

You can create a flow that automatically performs one or more actions after it's triggered by an event. For example, the flow can monitor your Outlook inbox and when an email arrives with a specific subject line and email address, the flow takes the attachment and save it to a SharePoint library.

## Prerequisites

Microsoft Office 365

## Specify the SharePoint site and library

You can use any SharePoint site of your choice and can also use an existing library.

In this scenario, we use the following SharePoint site and its default **Documents** library, which is available out-of-box.

![Screenshot of the SharePoint site.](media/sharepoint-site.svg)

## Specify an event to start the flow

First, you must select the trigger (event) that starts the flow.

1.  Sign in to [Power Automate](https://make.powerautomate.com) by using your organizational account.
    
2.  Select **My flows**.
    
3.  Select **New flow**, and then select **Automated cloud flow**.
    
    ![Screenshot of the create power automate automated cloud flow dialog.](media/automated-cloud-flow.svg)
    
4.  Under **Choose your flow's trigger**, enter _Outlook_, select the **When a new email arrives (V3)** trigger and select **Create**.
    
    ![Screenshot of selecting Outlook trigger.](media/create-a-flow.svg)
    
5.  Select the trigger and then select the **Show all** button.
    
    ![Screenshot of show all.](media/outlook-when-a-new-email-arrives-trigger.svg)
    
6.  Add the following:
    
    **From** - 'your org email'
    
    **Include Attachments** - 'Yes'
    
    **Subject Filter** - 'Daily report'
    
    **Importance** - 'Any'
    
    **Only with Attachments** - 'Yes'
    
    **Folder** - 'Inbox'
    
    ![Screenshot of advanced settings.](media/advanced-options-settings.svg)
    

## Specify an action

1.  Select the **+** (plus) button below the trigger to open the **Add an action** panel.
    
2.  Search for _Create file_, and then select the **Create file** action under the **SharePoint** connector.
    
    ![Screenshot of the create SharePoint file action.](media/create-file-action.svg)
    
3.  For **Folder Path** select **/Shared Documents**
    
4.  Select in the **File Name** field and type **/** to open the dynamic data picker.
    
    ![Screenshot of Enter data from previous step button.](media/select-data-from-previous-step-button.svg)
    
5.  Select **Attachments Name** from the dynamic data picker.
    
    ![Screenshot of Dynamic content pane with attachement name selected.](media/attachement-name.svg)
    
6.  Select in the **File Content** field and then type **/** to open the dynamic data picker.
    
7.  Select **Attachments Content** from the dynamic data picker. The result should look like the image below.
    
    ![Screenshot of add attachments options.](media/add-attachments.svg)
    
8.  Once the **Attachments Name** is added, the **Create file** action is automatically added inside of an **Apply to each** action. This means that if there are multiple attachments with the email, the flow creates a file for each attachment.
    
    ![Screenshot of the apply to each.](media/apply-to-each-attachment.svg)
    

You have successfully built a **Power Automate** flow, which will monitor your **Outlook** inbox for any emails that have the text **Daily report** in their **Subject line** and have **Attachments**.
