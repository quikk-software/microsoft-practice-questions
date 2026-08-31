---
title: "Create an alternate key"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/7-alternate-key"
uid: "learn-dynamics.create-manage-fields-within-entity.7-alternate-key"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Create an alternate key

It's common to need a way to uniquely identify a record in a table. By default, Microsoft Dataverse tables have a GUID as their only unique column. This GUID is called the **Primary Key** and it consists of a long string of numbers and letters that aren't useful to a regular user regarding meaning or significance, but it uniquely identifies the table column within Dataverse. If your organization already has a unique value for each record, you can consider using an **Alternate key** for your table.

Defining an alternate key for a table allows you to identify a record in a more meaningful way by using a column that is familiar to users. When you define a column as a key, Dataverse makes sure that every entry in that key column is required and unique so you can use the key column to distinctively identify a specific record.

This can be especially helpful if you're integrating your data with an external system that uses an ID or number to identify a record (and not the Dataverse GUID). It also improves the search and filtering on the particular column because alternate key fields are always indexed.

Because of the way Dataverse is structured, an alternate key column _must_ have a unique value. If you set a particular column as an alternate key and try to enter duplicate data, the record fails to save.

Keys can be based on a single column (Order ID) or a combination of columns, such as Financial year and Order ID. When creating an alternate key column, you can combine from existing columns to construct it, however, the ingredient column types can only include the following types:

*   Decimal Number
*   Whole Number
*   Single line of text
*   Date Time
*   Lookup
*   Choice

You can set up an alternate key for a table by the following procedure:

1.  Sign in to Power Apps by going to [https://make.powerapps.com](https://make.powerapps.com/?azure-portal=true).
    
2.  From the left navigation menu, select **Tables**. If you don't see Tables on the left, you can select **More** and then in the flyout menu find and select **Tables**.
    
3.  Select the table that you want to add a new key to.
    
4.  Under the Schema section, select **Keys**.
    
5.  Select **\+ New key** in the upper left of the screen.
    
6.  Under Display name, enter a name for the new key.
    
7.  Select one or more fields that make up the new key.
    
8.  When you're finished, select **Save** at the bottom.
    

It takes a few minutes for Dataverse to create the new key and indexes. Then, you can start using it in your business solution.

Tip

If you have duplicated data in a column that is used by the key in multiple records, then the key will not be created. You can only create a key if the data in the column's existing record is unique across all records in the table.
