---
title: "Publish your app"
url: "https://learn.microsoft.com/en-us/training/modules/publish-share-maintain-app/2-publish-app"
uid: "learn-bizapps.publish-share-maintain-app.2-publish-app"
module: "publish-share-maintain-app"
moduleTitle: "Publish, share, and maintain a canvas app"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Publish your app

Saving and publishing are two separate actions in Power Apps, and understanding the difference matters. When you save, you're capturing your work in progress — your changes are stored, but users running the app don't see them yet. When you publish, you push a new version live. Think of saving as committing to a draft, and publishing as releasing it.

In this module's example, you have yet to publish the **Travel Expense Report** app, which is the task that you complete in this unit. Start by following these steps:

Note

In case you have not completed the previous modules within this learning path, you may download the [packaging files](https://github.com/MicrosoftDocs/mslearn-developer-tools-power-platform/tree/master/power-apps/expense%20report%20app%20-%20module%206). This way you can complete the exercises within this module without having to start from the beginning of this learning path.

1.  In your browser, go to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true).
    
2.  Select **Apps** on the left.
    
3.  Locate your app and select it to edit it.
    
4.  To publish the app, select the **Publish** icon in the top right of the command bar.
    
5.  In the subsequent dialog, you can select **Publish this version**.
    
    [![Screenshot of the app with the app Publish button and the dialog Publish this version button highlighted.](media/publish-version.png)](media/publish-version.png#lightbox)
    

Now, you successfully published your app and are ready to share it with users for testing and feedback. The **Share** button is also in the command bar. In the image above you can see it between the "Editing" label and the App checker icon.

Selecting **Share** opens a new tab, where you can manage the sharing permissions for this app. You can select the button if you want to view who you shared the app with, and their permissions. You can manage app permissions and share the app without publishing it, for example, if you want to collaborate with another developer.

Note

In managed environments, the publishing dialog includes a **Create descriptions using AI** option. Copilot generates a description for your app based on its content. If you don't enter a description before publishing, Copilot generates one automatically — you can always edit it afterward.

## After publishing: what users see

When you publish an update while users are already running the app, they see two sequential notifications:

1.  "A new version of this app is coming. We'll let you know when it's available."
2.  "You're using an old version of this app. Refresh to use the latest version."

Users select **Refresh** to load the new version. These notifications appear for canvas apps on the web and in iframes, but not when the app is embedded in Microsoft Teams, Power BI, or SharePoint form customizations.

## AutoSave and save options

Power Apps saves your work automatically every two minutes by default. AutoSave helps prevent lost changes if your browser closes unexpectedly. You can turn AutoSave on or off in **Settings** > **General** > **Auto save**. Even with AutoSave enabled, it's a good practice to manually save before closing the browser tab.

The **Save** button has a dropdown with additional options:

Option

What it does

**Save with version notes**

Saves and lets you add a note to describe what changed in this version

**Save as**

Creates a copy of the app under a new name

**Download a copy**

Downloads the app as a `.msapp` file for backup or offline storage

In the next unit, you'll learn more about sharing your app, and the options involved while sharing.
