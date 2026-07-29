---
title: "Recover content in Microsoft 365 workloads"
url: "https://learn.microsoft.com/en-us/training/modules/purview-retention-recovery/recover-content-microsoft-365-workloads"
uid: "learn.wwl.purview-retention-recovery.recover-content-microsoft-365-workloads"
module: "purview-retention-recovery"
moduleTitle: "Implement and manage Microsoft 365 retention and recovery"
learningPath: "learn.wwl.purview-implement-retention"
---
# Recover content in Microsoft 365 workloads

In Microsoft 365, understanding how to recover content is essential for maintaining business continuity, protecting sensitive data, and supporting compliance. Accidental deletions, user error, and malicious activity can all disrupt operations. Recovery options built into Microsoft 365 help organizations minimize disruption and restore access quickly.

## Recovery options

Recovery tools help users manage and restore their data effectively, ensuring that operations can continue smoothly without significant data loss.

### OneDrive portal

The OneDrive Recycle Bin allows users to recover files they have accidentally deleted, minimizing downtime and maintaining productivity:

1.  Go to the OneDrive website and sign in with the appropriate account.
2.  Select **Recycle bin** from the left-side pane.
3.  Select the item you want to restore, then choose **Restore** from the top pane.

The item has been successfully restored to its original location.

### Restore the entire OneDrive

For scenarios involving extensive data changes, like after a ransomware attack or widespread accidental deletions, a complete restoration of OneDrive content might be necessary. To revert the entire OneDrive to an earlier state, perform these steps in OneDrive:

1.  Go to your OneDrive, then select **Settings** > **Restore your OneDrive** from the left navigation pane.
    
2.  On the Restore page, select a date from the dropdown list or select **Custom date and time**.
    
    ![Screenshot showing the dialogue to restore an entire OneDrive.](../../wwl-sci/purview-retention-recovery/media/onedrive-restore.png)
    
3.  Use the activity chart and activity feed to review the recent activities that you want to undo.
    
    ![Screenshot showing the activity chart to restore an entire OneDrive.](../../wwl-sci/purview-retention-recovery/media/onedrive-restore-activity-chart.png)
    

### Restore items in the recycle bin that were deleted from SharePoint or Teams

Maintaining data consistency across collaboration platforms like SharePoint and Microsoft Teams is crucial for operational efficiency and regulatory compliance:

1.  Go to the SharePoint site where the file was deleted.
    
    *   If you're starting in Microsoft Teams, go to the channel's Files tab, select **More** > **Open in SharePoint** to open the corresponding document library in SharePoint.
2.  To open the Recycle Bin in SharePoint, you can:
    
    *   Select **Recycle bin** from the **Quick Launch bar**.
    *   Or go to **Settings**, choose **Site contents**, then select **Recycle bin** at the top of the page:
    
    ![Screenshot showing the SharePoint Recycle bin.](../../wwl-sci/purview-retention-recovery/media/sharepoint-recycle-bin.png)
    
3.  On the Recycle bin page, select the checkbox to the left of the items or files you want to restore, then select **Restore**.
    

When an item is restored, it's restored to the same location from which it was deleted.

### Restore a previous version of an item or file in SharePoint

Use the SharePoint version history to restore earlier versions of documents and undo accidental changes or damage:

1.  Go to the SharePoint site where the items are located, then open the list or library from the Quick Launch bar.
    
    If the name of your list or library doesn't appear, select **Site contents** or **View All Site Content**, then select the name of your list or library.
    
2.  Right-click on the document name and select **Version History**. If **Version History** isn't visible, select the ellipses (...), then select **Version History**.
    
    A list of versions of the files appears.
    
    ![Screenshot showing version history in SharePoint.](../../wwl-sci/purview-retention-recovery/media/sharepoint-version-history.png)
    
3.  In the **Version History** dialog, hover over the version you want to restore, then select **Restore**.
    
    ![Screenshot showing the menu to restore a version in SharePoint.](../../wwl-sci/purview-retention-recovery/media/sharepoint-restore-version.png)
    
4.  To confirm restoring the current version as the latest version, select **OK**.
    
    ![Screenshot showing the dialogue to restore a file in SharePoint over the current version.](../../wwl-sci/purview-retention-recovery/media/sharepoint-restore-dialogue.png)
    

The document has been successfully restored and has overwritten the last version. SharePoint doesn't remove the earlier version you just restored. It creates a copy and makes it the latest version.

### Versions from Microsoft 365 apps for enterprise

When precise version control is necessary, especially in collaborative environments, Microsoft 365 apps for enterprise provide tools to review and restore document versions meticulously. This ensures that only the most accurate and intended versions of documents are in use:

1.  Go to SharePoint Online in your tenant.
    
2.  Select the site collection that contains the file you want to compare.
    
3.  Go to the document location in the document library.
    
4.  Select the checkbox to the left of the item you want to compare and select **Open in app** from the top pane.
    
5.  In Microsoft Word, select **Review** > **Compare** > **Specific Version...** on the navigation ribbon.
    
    ![Screenshot showing how to access the Specific Version feature in Word's Review tab.](../../wwl-sci/purview-retention-recovery/media/sharepoint-compare-word-ribbon.png)
    
6.  A dialogue window displays the version history, similar to what is seen in SharePoint.
    
    ![Screenshot showing the version history dialogue in Word.](../../wwl-sci/purview-retention-recovery/media/sharepoint-compare-versions.png)
    

From here, select a version to view a side-by-side comparison and decide which version to keep.

## Check your knowledge

1.

In what scenario might a complete restoration of OneDrive content be necessary?

After a user accidentally deletes a single file.

After a ransomware attack or widespread accidental deletions.

When organizing files into new folders.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
