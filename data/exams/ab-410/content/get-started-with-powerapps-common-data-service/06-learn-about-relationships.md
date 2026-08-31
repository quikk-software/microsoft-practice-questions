---
title: "Table relationships"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/learn-about-relationships"
uid: "learn-bizapps.powerapps-common-data-service.learn-about-relationships"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Table relationships

When working with Microsoft Dataverse, organize information by storing different sets of data in separate tables to support data normalization. Table relationships define how table rows can be associated with rows from other tables.

We learned earlier in this module that a database table has a **primary key** to uniquely reference rows in the table. In Dataverse, a relationship between two tables references the primary key using a lookup column.

## Relationship types

Table relationships define how table rows are associated with rows from other tables—or even the same table. There are two types of table relationships:

*   **One-to-many relationships**: In a one-to-many table relationship (1:N), many referencing (related) table rows can be associated with a single referenced (primary) table row. The referenced row is often called the _parent_, while rows in the referencing table are the _children_. A many-to-one relationship is the same structure viewed from the child table.
    
*   **Many-to-many relationships**: In a many-to-many (N:N) relationship, many table rows can be associated with many other rows. These rows are considered peers, and the relationship is reciprocal.
    

### Many-to-one vs. One-to-many

The many-to-one (N:1) relationship isn't fundamentally different from one-to-many. It represents the same relationship viewed from the opposite table. For example, if Table A has a one-to-many relationship with Table B, you'll see:

*   a _one-to-many_ relationship listed under Table A in the Power Apps maker portal.
*   a _many-to-one_ relationship listed under Table B.

This is a matter of interface perspective, not a separate relationship type.

### Lookup columns

A common way to create a table relationship is by adding a column with the **Lookup** data type. This automatically creates a many-to-one relationship.

[![Screenshot of a lookup column.](media/lookup-column.png)](media/lookup-column.png#lightbox)

Whether the relationship is defined as one-to-many, many-to-one, or through a lookup column, the underlying structure is the same.

### Create table relationships manually

When you create a new table, as covered earlier in this module, Dataverse provides multiple ways to configure table relationships. In the **Tables** screen, the _Schema_ pane includes a **Relationships** link.

[![Screenshot of the Tables designer with Relationships highlighted.](media/table-relationships.png)](media/table-relationships.png#lightbox)

Selecting this link opens a view that displays all relationships for the table. Some are system-defined; others are user-created. You can review which tables are related and the relationship types.

At the top of this view, you can select **New relationship** from the command bar to manually define a new relationship.

[![Screenshot of a list of table relationships in this view with New relationship highlighted.](media/new-relationship.png)](media/new-relationship.png#lightbox)

When creating a relationship, you choose the type. In the example below, a one-to-many relationship is created with a table called **Veterinarian**. Although a pet could be treated by any veterinarian, this relationship defines a regular doctor for each pet. Creating this relationship also adds a **Lookup** column in the related table.

[![Screenshot of One-to-many dialog showing Pets linked to Veterinarian and a lookup column called Pet assigned to the Veterinarian column.](media/create-relationship.png)](media/create-relationship.png#lightbox)

Once the relationship is created, a corresponding lookup column appears in the associated table.

### Many-to-many relationships

Many-to-many relationships allow data rows to act as peers, without parent-child hierarchy.

Note

Many-to-many relationships aren't directly supported by relational databases. Dataverse uses a hidden _intersect_ table to manage these relationships. This intersect table isn't user-editable and doesn't support custom forms or columns.

To manually create a many-to-many relationship, you choose the two related tables. For example, if you have a table of **Pet Groomers** and a table of **Pets**, each pet can have multiple groomers, and each groomer can have multiple pets.

Although this relationship is defined in Dataverse, there's no visible intersect table. However, you can display related records in a form using a subgrid. With filtering, you can show related items dynamically—though this is beyond the scope of this unit.

For more information, see [Create many-to-many table relationships overview](/en-us/power-apps/maker/data-platform/create-edit-nn-relationships/?azure-portal=true).
