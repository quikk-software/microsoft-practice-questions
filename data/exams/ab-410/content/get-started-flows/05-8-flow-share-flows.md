---
title: "Exercise - Share flows"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/8-flow-share-flows"
uid: "learn-bizapps.flow-get-started.8-flow-share-flows"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Exercise - Share flows

Shared flows extend the potential of Power Automate to groups of people. After all, why should just one person enjoy the benefits of increased automation in their work environment?

Here are some advantages of shared flows:

*   Multiple people can own and manage a flow together.
*   If the creator of a shared flow leaves the organization, the other owners of the flow can continue to run it.
*   All owners of a shared flow can view its history, manage its properties, edit it, add and remove owners, and delete it.

As the creator or an owner of a shared flow, your flow remains listed on the **Cloud flows** tab. Co-owners you add can find the flow listed on their **Shared with me** tab in [Power Automate](https://make.powerautomate.com).

![Screenshot of Power Automate on the My flows page with the Shared with me tab highlighted.](media/shared.svg)

Note

*   Shared connections can be used only in the flow in which they were created.
*   Owners can use services in a flow, but they can't change the credentials for a connection that another owner created.

## Prerequisites

To create a shared flow, you must have a [paid Power Automate plan](https://make.powerautomate.com/pricing/). Also, to add more owners to a shared flow or remove owners from it, you must be the creator or an owner.

## Create a shared flow

You create a shared flow by adding more owners to an existing flow. After new owners are added to a flow, the flow appears on the **Shared with me** tab.

1.  Sign in to [Power Automate](https://make.powerautomate.com) using your organizational account.
    
2.  Select **My flows**.
    
    ![Screenshot of Power Automate showing the My flows option selected in the left navigation panel.](media/my-flows-page.png)
    
3.  Select the vertical ellipsis (**⋮**) next to the flow that you want to share, and then select **Share**.
    
    ![Screenshot of the share button.](media/flow-share.svg)
    
4.  In the **Co-owners** section, enter the name, email address, or group name of the person or group that you want to add as an owner.
    
    ![Screenshot of the Co-owners page showing the text field to add a user or group as owner, with current co-owners listed below.](media/co-owners-page.png)
    
5.  In the list that appears, select the user or group to add.
    
    The user or group becomes an owner of the flow.
    

After you share a flow, co-owners you added will find the flow listed on their **Shared with me** tab. As the creator or owner, the flow continues to appear on your **Cloud flows** tab.

## Add Microsoft Lists as a co-owner of a flow

You can add a list created using Microsoft Lists as a co-owner of a flow. In that way, everyone who has edit access to the list automatically gets to edit access to the flow. After the flow is shared, you can just distribute a link to it.

Important

SharePoint users must have Edit permission or be a member of the Members or Owners group to run flows in SharePoint.

## Restrictions on changes to flows

Adding an owner to a cloud flow is the most common way to share a cloud flow. The new owner of the cloud flow can also perform these actions:

1.  View the run history.
    
2.  Manage the properties of the flow (for example, start or stop the flow, add owners, or update credentials for a connection).
    
3.  Edit the definition of the flow (for example, add or remove an action or condition).
    
4.  Add or remove other owners (but not the flow's creator).
    
5.  Delete the flow.
    

Important

Owners can use services in a cloud flow but can't modify the credentials for a connection that another owner created. Also, shared connections can be used only in the flow in which they were created.

## Remove an owner

Important

If you remove an owner whose credentials are used to access Power Automate services, be sure to update the credentials for those connections, so that the flow continues to work correctly.

1.  Navigate to the flow details page by selecting the flow from **My flows**. In the **Owners** section, select **Edit**.
    
2.  Select the trash icon next to the owner that you want to remove, and then confirm in the dialog.
    
    ![Screenshot of the Co-owners page showing the Remove owner from flow button (trash icon) next to each co-owner.](media/remove-owner-button.png)
    

## Embedded and other connections

The connections that are used in a flow fall into two categories:

*   **Embedded**: These connections are used in the flow.
*   **Other**: These connections have been defined for the flow, but they aren't used in it.

If you stop using a connection in a flow, that connection appears in the **Other** connections list. It remains there until an owner includes it in the flow again.

One way to quickly view the list of connections without opening the flow is to navigate to the flow details page, where connections are listed in the **Connections** section.
