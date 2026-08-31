---
title: "Maintain your app"
url: "https://learn.microsoft.com/en-us/training/modules/publish-share-maintain-app/4-maintain-app"
uid: "learn-bizapps.publish-share-maintain-app.4-maintain-app"
module: "publish-share-maintain-app"
moduleTitle: "Publish, share, and maintain a canvas app"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Maintain your app

Even the most proficient app builders can make mistakes when developing apps. The key is understanding how to undo a premature release of your app or revert to a previous version if bugs occur. If necessary, you can revert your app to a previous version by following these steps:

1.  Go to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true). Your app should be listed in the lower part of the screen. If you don't find your app, select **Apps** in the navigation menu.
    
2.  Find your app and then select the **More commands** icon (**...**) beside it. Select **Details**.
    
    [![Screenshot of the Apps menu with the Travel Expense Report selected and the ellipsis menu and Details option highlighted again.](media/report-details.png)](media/report-details.png#lightbox)
    
    On the app **Details** screen, basic information displays about your app, including the name, web link, and license designation. You can tab through the different information available. Select the **Connections** tab to view more information about the connections the app uses, the **Flows** tab to view the Microsoft Power Automate flows that are used in your app, and the **Analytics (preview)** tab for basic usage analytics over the last 30 days.
    
3.  On the app **Details** screen, select the **Details** tab, then select **Versions**.
    
    [![Screenshot of the Versions tab of the Travel Expense Report app.](media/versions.png)](media/versions.png#lightbox)
    
    You can view all versions of your app that were created and any notes that you included when saving. The most recently published version shows as "**Live**" in the **Published** column. You can restore or delete any version that was created in the last six months. Restoring a previous version doesn't move up the version; instead, it creates a new version that you can then publish. For example, the following image shows that version 6 would stay the same, but a new version (version 8) would be created as a copy of version 6.
    
    Note
    
    For apps older than six months, Power Apps repackages the app from the oldest available version. The restored version may not behave exactly as it did originally if Power Apps functionality has changed since it was first packaged.
    
    [![Screenshot of a list of versions, showing Version 6 selected and the option to Restore this version higlighted.](media/restore-versions.png)](media/restore-versions.png#lightbox)
