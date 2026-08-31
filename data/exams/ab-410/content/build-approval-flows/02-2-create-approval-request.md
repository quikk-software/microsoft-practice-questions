---
title: "Build an approval request"
url: "https://learn.microsoft.com/en-us/training/modules/build-approval-flows/2-create-approval-request"
uid: "learn-bizapps.build-approval-flows.2-create-approval-request"
module: "build-approval-flows"
moduleTitle: "Build approval flows with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Build an approval request

An approval flow follows a predictable three-part pattern: a trigger fires, the flow sends an approval request and waits for a response, and then a condition routes the outcome down the right branch.

The **Start and wait for an approval** action is the core of most approval flows. When it runs, Power Automate sends a notification to everyone in the **Assigned to** field — by email, in the Power Automate Approvals center, and optionally in Microsoft Teams. The flow then pauses until the required responses arrive. Once the approval resolves, the **Outcome** value (Approve or Reject) becomes available as dynamic content for subsequent steps.

A **Condition** action reads that outcome and splits the flow into two branches. The **True** branch handles approvals — in this scenario, the document stays in place. The **False** branch handles rejections — the document moves to a designated folder. This pattern applies to nearly any approval scenario: expense requests, onboarding tasks, content reviews, and more.

In this scenario, anyone who has access to the SharePoint library can add a document. When the document is created, an approval starts that allows certain users to approve. If the document is approved, it stays in the document library. If the document is rejected, then it's moved to a separate folder.

Try this simulation exercise below first, and then view the detailed steps once you complete the simulation. The simulation guides you through a scenario resembling the steps you would use to create a document library in SharePoint and then create a flow. You'll click through the prompts, in various sections of your screen, and you'll have a narrator to guide you along.

Note

Select the thumbnail image below to start the lab simulation. When complete, you can return to this page to review the steps in the simulation, or you can continue to the next unit.

[![Screenshot of the simulation page build approval.](media/simulation-build-approval.png)](https://regale.cloud/Microsoft/play/3750/build-an-approval-request-in-power-automate).

## Prerequisites

*   Access to [Power Automate](https://make.powerautomate.com)
    
*   A Microsoft Office 365 account with access to SharePoint
    

Note

You'll need to create the document library in your own SharePoint tenant.

## Step 1: Create a document library

First, let's create a document library in a SharePoint site.

1.  On your SharePoint site home page, select **\+ New** > **Document Library** > **Blank library**.
    
2.  Name your library **Approvals Library**, and then select **Create**.
    
3.  In your new document library, at the top, choose **\+ New** and select **Folder**.
    
4.  Name your folder **Rejected Documents**, and select **Create**.
    

Now, let's create our approval flow.

1.  Next go to the [Power Automate maker portal](https://make.powerautomate.com) at make.powerautomate.com.
    
2.  In the Copilot text area, type _When a file is created (properties only), add a start and wait for approval action and add a condition depending on the approval outcome_.
    
3.  Select **Generate**.
    
    [![Screenshot of the maker portal and the copilot prompt.](media/copilot-prompt.svg)](media/copilot-prompt.svg#lightbox)
    
4.  Copilot generates a flow based on the prompt provided. Copilot may produce more than one version to consider as well.
    
    You can continue to converse back and forth with Copilot to refine the flow for what you want. Once you're satisfied with the structure of the flow, select **Keep it and continue**.
    
5.  Review your connections. If you aren't already connected (green checks mean your connection's ready to go), select the 3 dots and select **Add new connection**. Once your connections are properly connected, select the **Create flow** button at the bottom of the screen.
    
6.  Select the **When a file is created (properties only)** trigger, and choose your SharePoint site under **Site Address** and _Approvals Library_ under **Library Name**.
    
7.  Select the **Start and wait for an approval** action. The properties panel opens on the left hand side.
    
8.  Clear the **Approval type** field, and then choose **Approve/Reject - First to respond** from the **Approval Type** dropdown. (Refer to the diagram below step 13 for reference.)
    
9.  Update the **Title** field to _Document Approval_.
    
10.  In the Assigned To field, enter your organization email address. (This is for testing purposes. You can always come back and choose a different approver later if you wish.)
     
11.  Put your cursor in the **Item Link** field and select the lightning bolt (dynamic content) button next to it. This pulls up your dynamic content for this section.
     
12.  Search for and select **Link To Item**.
     
13.  Choose **Link to item** in the pop-up window.
     
     [![Screenshot of copilot properties.](media/copilot-approval-properties.svg)](media/copilot-approval-properties.svg#lightbox)
     
14.  Select the **Condition** action (below the approval) to review what Copilot automatically selected as the condition. Ensure that the **Outcome** property (or body/outcome) from the _Start and wait for an approval_ action is on the left and **Approve** is on the right.
     
15.  Expand the condition by selecting the down pointed chevron on the right of the action header. This reveals the _True_ and _False_ branches of the condition. Select the **+** icon under the **False** side of the condition and choose the circled plus sign to **Add an action**.
     
16.  In the _Add an action_ panel that appears on the left of your screen, search for _move_ and choose the SharePoint **Move file** action.
     
17.  Choose your SharePoint site address from the first dropdown.
     
18.  Under **File to Move**, use the lightning bolt icon for dynamic content and find and select the **Identifier** from the SharePoint trigger content. (You might need to search for it.)
     
19.  Choose the same SharePoint site for the **Destination Site Address**.
     
20.  For the **Destination Folder**, select the folder icon on the right side. Find your **Approvals Library**, and select the arrow to the right of its name. Then select the folder name **Rejected Documents**.
     
21.  Under **If Another File Is Already There** option, choose **Move with a new name**.
     
     ![Screenshot of If another file is already there option filled in with Move with a new name.](media/copilot-move-file-parameters.svg)
     
22.  **Save** your flow.
     

To test your flow, go back to your SharePoint **Approvals Library** and add a new document.

After a short amount of time, an approval appears under **Action items** > **Approvals** in the left navigation pane of the [Power Automate maker portal](https://make.powerautomate.com/) (if **Approvals** doesn't appear, select **More** and pin it). The approval appears on the **Received** tab. If the **Approvals** app is activated for your organization within Teams, you also see the approval notification pop-up there.

![Screenshot of Power Automate showing Approvals on the Received tab.](media/approvals-section.svg)

To make sure that our flow is moving a rejected item to our _Rejected Documents_ folder, select the approval and choose **Reject** as your response. Then return to your SharePoint **Approvals Library**. Refresh the browser (if needed) and you should see the document move to the **Rejected Documents** folder.

Congrats! You built an approval flow using Copilot that allows users to approve or reject documents in a SharePoint document library.

You can easily edit or extend this approval flow to better fit your needs. Or check out the approvals Power Automate Templates to give yourself various starting places for your own approvals.
