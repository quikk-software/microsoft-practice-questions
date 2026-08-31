---
title: "Table characteristics"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/2-learn-about-entities"
uid: "learn-bizapps.powerapps-common-data-service.2-learn-about-entities"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Table characteristics

In Microsoft Dataverse, you create and edit tables by using the Power Apps maker portal. You don't need to use an external table editor; instead, you maintain tables and their properties directly through the user interface in the maker portal.

Before you create a table in Dataverse, it's important to understand the table capabilities and configuration options available.

## Table properties

Tables are the key building blocks of Microsoft Dataverse. In Dataverse, a table is more than just a database table with columns and relationships. A Dataverse table includes additional components that support app development and process automation. Tables in Dataverse include the following properties:

*   **Name**: The simple name that defines your table, such as _Pets_
*   **Rows**: Individual records in your data (such as a cat named _Ashley_)
*   **Columns**: Metadata that defines each record (such as pet _Species_ and _Breed_)
*   **Relationships**: Define links to other tables (such as a pet belonging to an owner)
*   **Keys**: Columns that uniquely identify each row (such as an ID number)
*   **Forms**: Used by model-driven apps to view and edit table rows
*   **Views**: Define how rows and columns are displayed
*   **Charts**: Visualize table data
*   **Dashboards**: Provide visual summaries of data using charts and filters
*   **Business rules**: Apply logic to table columns
*   **Metadata**: Table-level settings that affect how apps and flows interact with the table
*   **Commands**: Custom buttons added to model-driven app command bars

[![Screenshot of table in Power Apps maker portal.](media/table-properties.png)](media/table-properties.png#lightbox)

Each of these table properties is explored in more detail throughout the module.

## Row keys

All database tables require a **primary key** to uniquely identify rows. In Dataverse, this key is a Globally Unique Identifier (GUID), such as _123e4567-e89b-12d3-a456-426655440000_. Dataverse automatically generates the GUID when a new row is created.

To improve usability, each table also includes a **primary column**—a readable text field used to represent rows in apps and flows. By default, this column is labeled _Name_.

Note

When integrating with external systems, the GUID is often not known. In such cases, you can define an alternate key.

## Create a table in Dataverse

To create a Dataverse table, select **Tables** in the left-hand navigation of the [Power Apps maker portal](https://make.powerapps.com), then select the **New table** dropdown from the command bar, and choose **Create new tables**.

### Start with Copilot

Describe the data, columns, rows, or scenario using everyday language. Copilot will generate the table structure and open the editor for further changes.

Tip

The **Create new tables** visual designer — including the Copilot path — is the recommended modern approach for most new tables. Use **Set advanced properties** when you need to configure settings that aren't available in the visual designer at creation time, such as schema name, table type (Activity, Virtual, or Elastic), or record ownership. The exercises in this module use **Set advanced properties** to demonstrate these advanced settings.

### Start from a blank table

*   **Add columns and data**: Manually define columns and enter data rows.
*   **Describe the new table**: Use the Copilot side pane to describe your needs, and Copilot builds the table accordingly.

### Import a SharePoint list

Enter a SharePoint site URL or choose from recently used sites. Then select your list to import. You can edit and finalize the table in the Create new tables editor.

### Import an Excel file or .CSV

Use Excel or CSV files to populate a table. If Copilot is enabled, AI assists in generating the table structure.

### Set advanced properties

To use advanced options, go to the _**Home**_ page, select _**Tables**_, then select _**\+ New table**_ and choose _**Set advanced properties**_. These settings are also available in other creation workflows.

[![Screenshot of the new table pane.](media/new-table-pane.png)](media/new-table-pane.png#lightbox)

The _Properties_ tab includes:

*   **Display name**: For example, _Pet_
*   **Plural name**: Auto-filled as _Pets_, but you can modify it
*   **Description**: Internal use only
*   **Enable attachments**: Option to allow file uploads to rows

The _Primary column_ tab includes:

*   **Display name**: Defaults to _Name_, editable to values like _Pet name_
*   **Description**: Internal note
*   **Schema name**: Internal system name, auto-generated from the Display name (editable before creation)
*   **Column requirement**: Default is _Business required_
*   **Maximum character count**: Default is 100; adjustable

[![Screenshot of the primary column tab.](media/primary-column-pane.png)](media/primary-column-pane.png#lightbox)

### Advanced options

In the _Properties_ tab, select **Advanced options** to expose more settings.

[![Screenshot of the table advanced properties.](media/table-advanced-properties.png)](media/table-advanced-properties.png#lightbox)

Key options:

*   **Schema name**: Internal system name; must be set before creation and can't include spaces
*   **Type**: Options include _Standard_, _Activity_, _Virtual_, or _Elastic_
*   **Record ownership**: Options include _User or Team_ or _Organization_

Important

The following settings can't be changed after creation:

*   Schema name
*   Table type
*   Table ownership

Additional settings affect UI behavior or generate columns and relationships automatically.

For more details, see [Create and edit tables using Power Apps](/en-us/power-apps/maker/data-platform/create-edit-entities-portal/?azure-portal=true).

Note

Best practice: Create tables inside a Dataverse solution so they inherit the solution's publisher prefix.

### Create a virtual table

Virtual tables enable CRUD operations on external data sources. To create one, return to _**Tables**_, select _**\+ New table**_, and then choose _**Create a virtual table**_. Select the appropriate connection to configure the virtual table.

## Table types

Dataverse supports several types of custom tables:

*   **Standard**: Default table type for most use cases
*   **Activity**: Used for records with time-bound interactions (e.g., tasks, calls)
*   **Virtual**: External data presented as if native to Dataverse
*   **Elastic**: High-scale tables powered by Azure Cosmos DB, suitable for datasets with tens of millions of rows

Note

Table types are set during creation and can't be changed later.

## Table ownership

Choose from _User or team owned_ or _Organization-owned_. Ownership affects how permissions and data access are handled.

*   **User or team owned**: Row-level permissions are user-specific
*   **Organization-owned**: Access is controlled at the organization level

Note

Table ownership is fixed once the table is created.

## When to use standard tables, and when to create new tables

Microsoft Dataverse includes standard tables to support business scenarios. These come with predefined metadata and system behavior. Whenever possible, reuse standard tables to ensure compatibility and reduce configuration overhead.

Minor modifications often don't require custom tables:

*   You can rename columns for clarity without creating new tables
*   Standard tables can't be deleted, but you can hide them by modifying security role permissions

If standard tables can't meet your needs through customization, consider creating a custom table, column, or relationship.
