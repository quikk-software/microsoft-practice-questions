---
title: "Introduction to Microsoft Dataverse"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/1-introduction"
uid: "learn-bizapps.powerapps-common-data-service.1-introduction"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Introduction to Microsoft Dataverse

Data is at the center of business operations today, powering the insights that inform future decisions. To thrive and grow, businesses need to capture, analyze, predict, present, and report on data—all with agility.

Many organizations have data spread across devices, applications, systems, and software as a service (SaaS) providers. While there may be Microsoft Power Platform connectors available for these sources, managing these data stores requires different tools, skills, and security models.

## Microsoft Dataverse

Microsoft Dataverse is the cloud data platform for the Microsoft Power Platform. It's designed to be compliant, secure, scalable, and globally available, while helping make it easier to build and manage data-centric solutions.

Benefits of using Microsoft Dataverse include:

*   **Metadata support**: Defined properties on your data model accelerate app development in Power Apps.
*   **Granular data access control**: Define who can access specific tables, rows, and columns.
*   **Built-in logic**: Apply rules and calculations at the column level.
*   **Data management tools**: Import and export data using tools such as Microsoft Excel.
*   **Auditing capabilities**: Track changes and access to your data.
*   **Process automation**: Integrate business logic to ensure data quality and automate tasks.
*   **Cloud-managed infrastructure**: Microsoft handles database configuration and backups.
*   **Simplified storage management**: Microsoft manages storage behind the scenes.
*   **No specialized skills required**: You don't need database administration expertise to use Dataverse.
*   **Enterprise-grade security**: All data is encrypted at rest and in transit.
*   **Microsoft integration**: Seamlessly connects with Microsoft 365 and Microsoft Azure.
*   **Proven platform**: Used by Microsoft Dynamics 365 apps such as Sales and Customer Service.
*   **Connector support**: Fully integrated with Power Apps, Power Automate, and Power BI.

For more information, see [Why choose Microsoft Dataverse?](/en-us/power-apps/maker/data-platform/why-dataverse-overview)

## Tables

Data in Dataverse is stored in records called **tables**. A table is a logical structure of rows and columns, similar to a database table.

Tables can represent physical objects—such as pets, buildings, or products—or abstract concepts such as projects, skills, and benefits.

Dataverse helps make it easier to define a data model for your apps using both built-in and custom tables. It includes a base set of _standard_ tables that support common business scenarios. You can also create _custom_ tables tailored to your organization and populate them with data from Microsoft SharePoint, Microsoft Excel, or Power Query.

App makers can use Power Apps to build applications that interact with this data.

[![Screenshot of Power Apps showing a list of the standard tables in Dataverse.](media/table-list.png)](media/table-list.png#lightbox)

When possible, use standard tables and columns as intended. However, to address specific business needs, you can extend standard tables or create new custom tables to store data unique to your organization.
