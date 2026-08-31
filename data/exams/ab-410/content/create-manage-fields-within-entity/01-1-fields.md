---
title: "Define columns in Microsoft Dataverse"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/1-fields"
uid: "learn-dynamics.create-manage-fields-within-entity.1-fields"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Define columns in Microsoft Dataverse

Columns are a way to store a discrete piece of information within a record in a table. Columns have types, meaning that you can store data of a certain type in a field that matches that data type. For example, if you have a solution that requires dates, then you would store the date in a field with the type of Date. Similarly, if you want to store a number, then you store the number in a field with the type of Number.

The number of columns within a table varies from a few columns to a hundred or more. If you need more than a few hundred columns in a table, you might want to reconsider how you're structuring data storage for your solution because, likely, there's a better way.

Every database in Microsoft Dataverse starts with a standard set of tables and each standard table has a standard set of columns.

Tip

Always use standard tables and columns when possible. You can rename a table if that makes the table more understandable in the context of your solution. Always review the list of standard tables and make sure a standard table will not meet your needs before you create a new table.
