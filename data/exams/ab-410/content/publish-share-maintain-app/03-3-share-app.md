---
title: "Share your app"
url: "https://learn.microsoft.com/en-us/training/modules/publish-share-maintain-app/3-share-app"
uid: "learn-bizapps.publish-share-maintain-app.3-share-app"
module: "publish-share-maintain-app"
moduleTitle: "Publish, share, and maintain a canvas app"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Share your app

## Sharing your app

After you successfully publish your app, it's time to share it so that users can begin testing.

1.  Go to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true). Then select **Apps** in the navigation menu. Power Apps lists your apps with the most recently modified app at the top.
    
2.  Find your app and select the radio button to the left of it. Then select the **Share** button from the command bar.
    
    [![Screenshot of the Apps menu with the Travel Expense Report app, showing the more options (...) menu and the Share option highlighted.](media/share-app.svg)](media/share-app.svg#lightbox)
    
    A **Share** dialog box opens.
    
3.  In the name field, type a name or email alias. Matching users from your Microsoft Entra ID appear in a dropdown — select the person you want to add. You can add several users before selecting **Share**.
    
4.  Select a permission from the dropdown next to the user's name:
    
    *   **User** — the person can run the app but can't edit it or share it with others.
    *   **Co-owner** — the person can edit, share, and delete the app. A co-owner can't delete the original owner.
    
    Note
    
    If your admin has enabled app-level security roles in the Power Platform admin center, Dataverse-backed apps show additional role options: **App reader** (read-only access to all records), **App user** (full access to own records), **App maker** (create and read all records), and **App admin** (full access to all records). These roles control what data the user can read and write in the underlying Dataverse tables.
    
5.  If your data source (such as Dataverse) requires a security role, assign the required role while sharing the app so that users have the proper access to the underlying data.
    
6.  Optionally, select **Manage access** to view and edit permissions for users who already have access to the app.
    
7.  Optionally, add a message to include in the email invitation sent to new users.
    
8.  Select **Share** to share the app and send invitations. This also saves any permission changes you made to existing users.
    

Tip

The classic sharing flyout is still available if you need it. Select the overflow menu (**...**) next to the app and choose **Use classic sharing**.

## Remove users from your app

If you accidentally shared the app with someone, or if you need to remove a user's permission, follow these steps:

1.  With your app selected in the app menu (or open in edit mode), select the **Share** button from the command bar.
    
2.  Select **Manage access** in the Share dialog to see all users who currently have access.
    
3.  Hover over the user's name and select the **X** (Remove) icon.
    
    [![Screenshot of sample user Lidia Holloway selected and the option to remove the highlighted user.](media/user-select.png)](media/user-select.png#lightbox)
    
4.  Select **Share** to save your updated sharing permissions.
    

Important

Avoid sharing an app with the **Everyone** group. This option is disabled by default in Power Platform and is actively discouraged because the Everyone group includes all users who have ever signed in to the tenant, including guests. Instead, use Microsoft Entra security groups to share broadly. For audiences of more than 100 users, security groups also prevent performance issues that can occur when sharing with a large number of individual accounts.

If a user missed an email invite or you didn't send one, you can send them a direct link. Find the link on the app **Details** screen in the **Web link** section and use the copy icon to grab it.

[![Screenshot of the app Details tab with the Web link copy button highlighted.](media/web-link.svg)](media/web-link.svg#lightbox)

The user still needs to have the app shared with them before the link works. If you share a link with someone who doesn't have access, they see a generic permissions error.

[![Screenshot of message stating, "This app isn't opening correctly. It looks like you don't have access to this app. Ask its owner to share it with you."](media/error-message.png)](media/error-message.png#lightbox)

## Coauthor with co-owners

When you share an app with a co-owner, you can go further and edit the app at the same time using coauthoring. Coauthoring lets up to 10 makers work in the same canvas app simultaneously, with each person's presence and changes visible in real time — similar to collaborating in Word or PowerPoint.

Coauthoring is disabled by default and must be enabled per app:

1.  Open the app in Power Apps Studio.
2.  Select **Settings** > **Updates** > **New**.
3.  Search for **Coauthoring** and turn on the toggle.

Once enabled, any co-owner can open the app in edit mode at the same time as you. Power Apps Studio shows each maker's avatar and highlights the area they're currently editing. Version history and save behavior still apply — each save creates a new version.

Now that you've shared your app, users who have access can begin running and testing it. In the next section, you'll learn how to maintain your app.
