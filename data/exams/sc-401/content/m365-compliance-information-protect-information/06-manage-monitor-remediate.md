---
title: "Track and evaluate sensitivity label usage in Microsoft Purview"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-protect-information/manage-monitor-remediate"
uid: "learn-m365.m365-compliance-information-protect-information.manage-monitor-remediate"
module: "m365-compliance-information-protect-information"
moduleTitle: "Create and configure sensitivity labels with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Track and evaluate sensitivity label usage in Microsoft Purview

As the global consulting firm continues to advance its data security strategy with Microsoft Purview Information Protection, attention turns to monitoring the effectiveness of implemented sensitivity labels. The firm uses a combination of tools within the Microsoft Purview portal to track how labels are applied and how users interact with protected content. These tools include **Content Explorer**, **Activity Explorer**, and the **Information Protection reports dashboard**.

## Tools to monitor sensitivity label usage

Each tool provides a different lens for evaluating the use and effect of sensitivity labels:

*   **Data and Content explorer**: Real-time snapshot of content with sensitivity, retention, or classification tags.
*   **Activity explorer**: Timeline of label interactions and content usage based on audit data.
*   **Reports dashboard**: High-level trends, SIT distribution, and top label usage across the organization.

## View labeled content with Data explorer

**Data explorer** offers a detailed snapshot of labeled and classified items across SharePoint, OneDrive, Exchange, and Teams. It helps administrators assess how sensitivity labels are applied and whether content is protected as intended. Note that new or updated items may take several days to appear.

Use Data explorer to:

*   Identify the most frequently applied sensitivity labels
*   Review labeled content by location or classification type
*   Export data for auditing or analysis

Note

**Data explorer** is the modern tool for viewing labeled content in Microsoft Purview. **Content explorer (classic)** remains available and offers similar functionality.

Data explorer supports content labeled with sensitivity labels, retention labels, sensitive information types (SITs), and trainable classifiers.

### Permissions needed to access Data explorer

Access is restricted to ensure content privacy. To access the data in list or content view, you need:

Permission

Access granted

**Data Explorer List viewer**

See item names and locations

**Data Explorer Content viewer**

View contents of labeled items

These roles are assigned in the Microsoft Purview portal. Both are required to fully view and analyze labeled content. You can assign them directly or through custom role groups.

### Explore labeled items

1.  Go to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
    
2.  Select **Solutions** > **Information Protection** > **Explorers** > **Data explorer**.
    
3.  Use the filter box to search for a specific sensitivity label, retention label, sensitive information type, or trainable classifier.
    
4.  Alternatively, expand the categories and browse through the available labels or data types.
    
5.  Under **Data source**, choose a location like SharePoint, Exchange, or OneDrive and drill into the folder structure.
    
6.  Double-click an item to open it in Data explorer (if you have content viewer permissions).
    
    [![Screenshot showing the Data explorer in Microsoft Purview Information Protection.](../../wwl/m365-compliance-information-protect-information/media/data-explorer.png)](../../wwl/m365-compliance-information-protect-information/media/data-explorer.png#lightbox)
    

### Use filters to narrow results

Filtering options vary depending on the content location:

Location

Example filter options

SharePoint / OneDrive

Full site name, file name, file extension, partial file names

Exchange / Teams

Full email address

### Export labeled content data

The **Export** feature creates a .csv file of the current view. This is useful for documentation, review, or further analysis outside the platform.

Note

It can take up to 7 days for new or updated items to appear in Data explorer. For SharePoint files, updates can take up to 14 days.

## Monitor labeled content with Activity explorer

While Data explorer helps you see where sensitivity labels are applied, **Activity explorer** helps you understand how that labeled content is being used. It provides a historical view of user actions on labeled items using data from the Microsoft 365 unified audit log.

With Activity explorer, administrators can:

*   Track when labels are applied, changed, or removed.
*   View results from auto-labeling simulations.
*   Monitor files that are read or modified.
*   See encryption-related activity from the Microsoft Information Protection scanner.

This insight is helpful for identifying trends, verifying that labels are working as intended, and spotting potentially risky behavior.

### Access Activity Explorer

1.  Go to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
    
2.  Select **Solutions** > **Information Protection** > **Explorers** > **Activity explorer**.
    
3.  Use filters to focus on specific activity types, users, locations, sensitivity labels, or time frames.
    
    [![Screenshot showing the Activity explorer in Microsoft Purview Information Protection.](../../wwl/m365-compliance-information-protect-information/media/activity-explorer.png)](../../wwl/m365-compliance-information-protect-information/media/activity-explorer.png#lightbox)
    

### Use filters and filter sets

Activity Explorer includes over 50 filters to help narrow the data, including:

*   Activity type (such as label applied or changed)
*   Sensitivity label name
*   User
*   Location
*   Device name
*   Client IP address

You can also use built-in **filter sets**, such as:

*   Sensitivity labels applied, changed, or removed
*   Endpoint DLP activities
*   Network DLP activities
*   Files accessed with sensitive info

Filter sets help you quickly focus on key scenarios, such as monitoring files labeled "Highly Confidential" that were recently downgraded.

### Use Security Copilot (preview)

If enabled, **Security Copilot** in Activity explorer (preview) can:

*   Summarize top activities from the past week
*   Generate filters using natural language prompts
*   Help identify files with specific sensitive info used in suspicious actions

This AI-powered side panel helps accelerate investigations and refine results.

### Example use cases for sensitivity labels

*   Confirm whether users are applying labels consistently.
*   Detect when sensitive content is being downgraded inappropriately.
*   Track if confidential content is being accessed from unexpected locations or devices.
*   Use activity data to refine auto-labeling or DLP policies.

Note

Activity Explorer stores data for up to 30 days. For long-term auditing, consider exporting and archiving the data.

## Analyze sensitivity label trends with Reports

The **Information Protection reports** dashboard in Microsoft Purview provides a centralized view of how sensitivity labels are applied across Microsoft 365. It offers a high-level summary and interactive breakdowns to help organizations understand labeling coverage, usage patterns, and potential gaps in data protection.

These reports help verify label effectiveness and identify gaps in coverage.

### Key insights for sensitivity labels

From the dashboard, you can:

*   **Track sensitivity label coverage**: See what percentage of sensitive items have labels applied, highlighting consistency across the environment.
    
*   **Review protection settings**: Understand how labels enforce encryption and access controls.
    
*   **Identify top applied labels**: View the most frequently used labels, whether applied manually or automatically.
    
*   **Analyze usage by location**: See where labeled content resides, such as Exchange, SharePoint, or OneDrive.
    
*   **Correlate labels with sensitive info**: Check whether high-risk data, like credit card numbers, is properly labeled.
    
*   **Monitor labeling activity**: Track how often labels are applied, changed, or removed.
    
*   **Assess classification accuracy**: Compare label usage with SIT matches and classifier results to spot coverage gaps.
    
    [![Screenshot showing the Information Protection Reports in Microsoft Purview Information Protection.](../../wwl/m365-compliance-information-protect-information/media/information-protection-reports.png)](../../wwl/m365-compliance-information-protect-information/media/information-protection-reports.png#lightbox)
    

These visuals support strategic decisions, such as whether to revise auto-labeling rules, introduce new labels, or investigate inconsistent labeling patterns.

### Access the Information Protection reports

1.  Go to the [Microsoft Purview portal](https://purview.microsoft.com/?azure-portal=true).
2.  Navigate to **Solutions** > **Information Protection** > **Reports**.
3.  Select **Information protection** to view coverage, usage, and trends related to sensitivity labeling.

Together, these tools provide visibility into how sensitive data is labeled, accessed, and protected. This helps the firm monitor compliance and improve its data protection strategy over time.
