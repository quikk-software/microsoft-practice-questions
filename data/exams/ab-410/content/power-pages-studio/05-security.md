---
title: "Secure your Power Pages site"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-studio/security"
uid: "learn-bizapps.power-pages-studio.security"
module: "power-pages-studio"
moduleTitle: "Explore Power Pages design studio"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Secure your Power Pages site

The **Security workspace** in Power Pages design studio provides a unified interface for monitoring, protecting, and managing your site's security. You can access it from the left-hand workspace navigation in the design studio.

The Security workspace is organized into three sections: **Monitor**, **Protect**, and **Manage**.

## Monitor

The **Monitor** section includes the **Security scan** tool, which analyzes your site for common vulnerabilities and misconfigurations. After running a scan, the results appear in a list. You can review each finding and take action directly from the workspace.

## Protect

The **Protect** section includes tools for controlling access to your site content and data:

*   **Web roles**: Create and manage web roles to control which pages and data are accessible to different groups of users. Web roles are assigned to authenticated users or can be applied to unauthenticated users via the **Anonymous Users** role.
    
*   **Page permissions**: Set which web roles can access individual pages on the site. Pages can be set to **Allow everyone to see this page** or restricted to specific web roles.
    
*   **Table permissions**: Define which web roles can perform create, read, update, and delete (CRUD) operations on Dataverse tables. Table permissions are scoped to control access to specific records and relationships.
    
*   **Web Application Firewall**: Configure the Web Application Firewall (WAF) to protect your site from common web exploits and threats.
    

## Manage

The **Manage** section provides settings for controlling access to the site itself:

*   **Identity providers**: Configure external and internal identity providers for user authentication. Microsoft Entra External ID is the recommended provider for external user authentication in Power Pages sites. You can also configure other providers, such as LinkedIn, and local login.
    
*   **Site visibility**: Set whether the site is **Private** (accessible only to members of your organization or specific users) or **Public** (accessible to anyone with the URL). When a site is private, unauthenticated users are prompted to sign in before they can view any content.
    
*   **Advanced settings**: Configure Content Security Policy (CSP), cross-origin resource sharing (CORS), HTTP headers, and other advanced security options.
    

For more information, see [Use the Security workspace](/en-us/power-pages/getting-started/use-security-workspace) in the Power Pages documentation.

Next, you'll learn how to add an AI-powered agent to your site to provide conversational support to visitors.
