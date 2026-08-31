---
title: "Dataverse auditing"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/auditing"
uid: "learn-bizapps.powerapps-common-data-service.auditing"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Dataverse auditing

Microsoft Dataverse supports an auditing feature designed to meet internal and external auditing, compliance, security, and governance policies common to many enterprises. Dataverse auditing logs changes made to customer records in an environment with a Dataverse database. It also logs user access through an app or through the SDK in an environment.

Dataverse auditing is supported on all custom and most customizable tables and columns. Audit logs are stored in Dataverse and consume log storage capacity. You can view audit logs in the **Audit History** tab for a single record, or in the **Audit Summary View** to see all audited operations in a single environment. Audit logs can also be retrieved using the Web API or the SDK for .NET.

## Key concepts

*   Auditing can be configured at three levels: environment, table, and column. Table-level auditing requires that environment-level auditing be enabled. Column-level auditing requires that both environment-level and table-level auditing be enabled.
    
*   To enable user access auditing (Log access) or activity logging (Read logs), auditing must be enabled at the environment level. The option to enable activity logging appears only when minimum Microsoft 365 licensing requirements are met.
    
*   You must have the System Administrator or System Customizer role—or equivalent permissions—to enable or disable auditing.
    
*   Auditing can be configured manually in the Power Platform admin center or the Power Apps portal. Auditing can also be configured programmatically. For more information, see [Auditing overview](/en-us/power-apps/developer/data-platform/auditing/overview/?azure-portal=true).
    

## Configure tables and columns for auditing in Power Apps

This procedure requires the System Administrator or System Customizer role—or equivalent permissions.

1.  Sign in to Power Apps using the appropriate credentials.
    
2.  Select the desired environment.
    
3.  To configure a table for auditing, select **Tables**.
    
4.  Select a table.
    
5.  Select **Properties** from the _Table properties_ pane.
    
6.  In the _Edit table_ panel on the right side of the screen, expand **Advanced options**.
    
7.  Under _For this table_, select the checkbox next to **Audit changes to its data**.
    
    ![Screenshot of Edit table properties pane showing advanced options and the audit changes to its data highlighted.](media/audit-changes.png)
    
8.  Select **Save**.
    
9.  Select **Back** to return to the table viewer. Next, configure auditing for a column.
    
10.  In the **Schema** pane, select **Columns**.
     
     ![Screenshot of Schema pane with Columns highlighted.](media/schema-columns.png)
     
11.  Select the column you want to audit to open the **Edit column** pane.
     
12.  Expand **Advanced options**, then select the checkbox next to **Enable auditing**.
     
     ![Screenshot of Edit column advanced options pane with Enable auditing highlighted.](media/enable-auditing.png)
     
13.  Select **Save**.
     

With this setup, Microsoft Dataverse can track changes to a table or a specific column. Audit data is accessible in model-driven apps under the **Audit History** tab for a record. To view auditing at the environment level, use the **Audit Summary View** in the Power Platform admin center. It provides a comprehensive list of all audit logs in the environment.

For more information, see [Manage Dataverse auditing](/en-us/power-platform/admin/manage-dataverse-auditing/?azure-portal=true).

## Activity logging and Microsoft Purview

In addition to the Dataverse Audit History, the **Read logs** setting at the environment level sends activity log data to the **Microsoft Purview compliance portal**. This is a separate audit destination designed for enterprise compliance scenarios.

Use Microsoft Purview when:

*   Your organization requires centralized audit review across Microsoft 365 and Power Platform.
*   You need to retain or analyze activity logs in a compliance or governance workflow outside of Dataverse.

Note

Configuring table-level auditing and viewing the Dataverse Audit History tab is sufficient for most in-app scenarios. For enterprise compliance requirements, enable **Read logs** at the environment level and access those logs through the Microsoft Purview compliance portal rather than the Dataverse audit views.

For more information, see [Power Platform activity logging](/en-us/power-platform/admin/activity-logging-auditing/activity-logs-overview).
