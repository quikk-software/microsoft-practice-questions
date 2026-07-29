---
title: "Apply sensitivity labels to Microsoft Teams, Microsoft 365 groups, and SharePoint sites"
url: "https://learn.microsoft.com/en-us/training/modules/apply-manage-sensitivity-labels/apply-sensitivity-labels-to-microsoft-365-services"
uid: "learn.wwl.apply-manage-sensitivity-labels.apply-sensitivity-labels-to-microsoft-365-services"
module: "apply-manage-sensitivity-labels"
moduleTitle: "Apply sensitivity labels for data protection"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Apply sensitivity labels to Microsoft Teams, Microsoft 365 groups, and SharePoint sites

Sensitivity labels for containers (Teams, SharePoint sites, Microsoft 365 Groups) protect the workspace itself, not just the files inside it. A label on a SharePoint site can enforce who's allowed external sharing. A label on a team can control guest access and privacy. These are different decisions from labeling a document, and they happen in different places.

The challenge is knowing _where_ to apply a label and _who_ should be responsible for applying it. Microsoft 365 offers several surfaces for applying container labels:

*   Outlook on the web
*   SharePoint admin center
*   SharePoint document library settings
*   Teams admin center
*   Teams desktop or web client

Each surface serves a different audience and scope. The following table maps common scenarios to the surface that fits best:

Scenario

Best surface

Group owner classifies their own group

Outlook on the web

Admin standardizes labels across many sites

SharePoint admin center

Specific library needs a consistent file classification

SharePoint library settings

Admin reclassifies an existing team

Teams admin center

End user creates a new team with a label

Teams desktop or web client

Automated provisioning or scripted label assignment

[Microsoft Entra ID](/en-us/entra/identity/users/groups-assign-sensitivity-labels?azure-portal=true)

## Apply sensitivity labels to groups in Outlook on the web

Microsoft 365 Groups connect Teams, SharePoint, and shared mailboxes into a single membership boundary. Labeling a group from Outlook on the web is the most direct way for group owners to set or change sensitivity. This approach works well when the group owner is the person closest to understanding the sensitivity of the content the group handles.

1.  Navigate to [Outlook on the web](https://outlook.office.com/?azure-portal=true).
2.  From the left navigation pane, go to **Groups**.
3.  To edit the sensitivity of an existing group:
    1.  Select the group, then select **...** > **Settings**.
    2.  In the flyout, select **Edit group**.
    3.  Under **Sensitivity**, select the desired label, then select **Save**. [![Screenshot showing more options within an Outlook on the web group.](../../wwl-sci/apply-manage-sensitivity-labels/media/outlook-web-edit-group.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/outlook-web-edit-group.png#lightbox)
4.  To assign a label to a new group:
    1.  Select **New group**.
    2.  In the dialogue, select **Edit** to the right of **Default settings**.
    3.  Under **Edit settings**, select the desired sensitivity label.

## Apply sensitivity labels to SharePoint sites

Site-level labels control privacy, external sharing, and Conditional Access settings for the entire site. This is where administrators standardize protection across the organization. Applying labels from the SharePoint admin center makes sense when you need to label or relabel sites at scale, or when site owners shouldn't be making the classification decision themselves.

To apply a label to an existing SharePoint site:

1.  Navigate to the [Microsoft 365 admin center](https://admin.microsoft.com/?azure-portal=true), then select **… Show all** > **SharePoint**.
2.  In the **SharePoint admin center**, navigate to **Sites** > **Active Sites**.
3.  Select the site you want to modify.
4.  On the site's properties page, select **Settings**.
5.  Under the Settings tab, select the desired sensitivity label, then select **Save**. [![Screenshot showing where to set sensitivity labels for SharePoint sites.](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-settings-site.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-settings-site.png#lightbox)

You can also apply a label when creating a new site:

1.  In the **SharePoint admin center**, navigate to **Sites** > **Active Sites** > **\+ Create**.
2.  Select the site type and template.
3.  Enter your site settings (name, description, address, owner).
4.  On the **Set language and other options** page, under **Sensitivity**, select the desired label, then select **Create site**. [![Screenshot showing where to set sensitivity labels when creating a new SharePoint site.](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-sensitivity-label-new-site.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-sensitivity-label-new-site.png#lightbox)

## Apply default sensitivity labels to SharePoint document libraries

Site labels and library default labels serve different purposes. A site label controls who can access and share from the site, but it doesn't classify or encrypt the files inside it. A library default label fills that gap by classifying the _files_ themselves. When someone uploads or creates a new file in the library, the library automatically applies its default label, unless the file already has a higher-priority label.

A library default label is useful when a specific library holds content that consistently needs the same classification. For example, a library storing client contracts might default to **Confidential**, ensuring new documents are labeled even if the user forgets.

1.  Navigate to the SharePoint site that contains the document library.
    
2.  Select **Documents** from the left navigation pane.
    
3.  Select the gear icon to open the **Settings** menu, then select **Library settings**.
    
4.  On the Library settings flyout page, under **Default sensitivity labels**, select the desired label.
    
    [![Screenshot showing where to set sensitivity labels within a SharePoint library.](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-settings-sensitivity-label.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/sharepoint-settings-sensitivity-label.png#lightbox)
    

Keep in mind that library default labels only apply to newly created or edited files. Existing files at rest aren't relabeled automatically.

## Apply sensitivity labels to Teams from the admin center

The Teams admin center gives IT administrators a central view of all teams in the organization. Apply labels from this surface when you need to reclassify an existing team or enforce labels that team owners haven't applied. It's an administrative action, and team owners and members won't typically use this path.

1.  Navigate to the [Microsoft Teams admin center](https://admin.teams.microsoft.com/?azure-portal=true), then select **Teams** > **Manage teams** from the left navigation pane.
    
2.  On the **Manage teams** page, select the check box to the left of the team you want to modify, then select **Edit**.
    
3.  On the **Edit team** flyout page, under **Sensitivity**, select the desired label.
    
    [![Screenshot showing the Manage teams page in the Microsoft Teams admin center.](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-edit-team.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-edit-team.png#lightbox)
    

## Apply sensitivity labels when creating teams from the desktop or web client

When sensitivity labels are configured with a **Groups & sites** scope and your organization has Microsoft Entra ID P1 (or higher) licensing, users see a sensitivity label picker when they create a new team. This is the path most end users follow, and it's where label policies are most visible. If your label policy requires a label, users can't skip this step.

1.  In the Teams desktop or web client, select **Teams** from the left navigation pane.
    
2.  Select **+** in the top right, then select **Create team**.
    
3.  Enter a **Team name**, then select the bar under **Description** to open label and privacy options.
    
    [![Screenshot showing the Create a team options.](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-create-team-menu.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-create-team-menu.png#lightbox)
    
4.  Select the desired sensitivity label and sublabel if applicable.
    
    [![Screenshot showing the What kind of team will this be? menu options.](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-create-team-type.png)](../../wwl-sci/apply-manage-sensitivity-labels/media/teams-create-team-type.png#lightbox)
    

Tip

The sensitivity label applies to the team, its SharePoint site, and any private channel SharePoint sites.

In practice, most organizations use a combination of these surfaces. Administrators handle bulk site labeling and enforce policies from admin centers, while team and group owners apply labels from the apps they use every day. Organizations that manage group creation centrally can also apply labels through Microsoft Entra ID, which is useful for scripted provisioning workflows.

## Check your knowledge

1.

Why is it important to apply sensitivity labels to Microsoft 365 services like SharePoint sites and Teams channels in our scenario of launching a new service powered by data analysis and AI?

To ensure data protection and compliance across collaborative environments.

To categorize data for easier retrieval during project audits.

To make project management easier by automating the organization of project-related communications and documents.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
