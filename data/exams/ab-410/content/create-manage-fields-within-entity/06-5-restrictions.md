---
title: "Restrictions that apply to columns in a table"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/5-restrictions"
uid: "learn-dynamics.create-manage-fields-within-entity.5-restrictions"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Restrictions that apply to columns in a table

When using Microsoft Dataverse for your business solutions, you should keep a few restrictions in mind.

Maximum number of columns in a table:

*   There's no hard upper limit on the number of columns that you can have in a table. But there's an upper boundary due to limits in how much data you can store in a single record. It's difficult to provide a specific number because each type of column can use a different amount of space. The upper limit depends on the total space that is used by all the columns for the table.
    
*   As a rule, you should have less than a few hundred columns in a table. If you have more than a few hundred columns in a table, then you should look at restructuring how you design the tables in your solutions. Try to split the table with an excessive number of columns into more than one table.
    

**Rollup** column limitations:

*   Max of 10 for each table
    
*   Max of 100 for each organization
    
*   Can't trigger workflows or flows
    
*   Can't reference another rollup column, a complex calculated or formula column. It must reference a simple column.
    
*   ModifiedBy and ModifiedOn columns are _not_ updated when the rollup column is updated.
    
*   Can't include records in many-to-many (N:N) relationships. It can only include records in one-to-many (1:N) relationships.
    
*   Can't use one-to-many (1:N) relationships with the `ActivityPointer` or `ActivityParty` table.
    

**Choice** (sometimes referred to as Choices) columns:

*   Choice columns provide a set of options that are displayed in a drop-down control on a form or in a pick list control when you're using Advanced Find. Dataverse can support hundreds of options within a Choice, but you shouldn't consider hundreds as the upper limit. Usability studies show that people have trouble using a system where a drop-down control provides a large number of options. If you have too many options available, you won't be able to set a default value.
    
*   Use a Choice column to define categories for data. Don't use Choice columns to select categories that actually represent separate items of data. For example, rather than maintaining a Choice column that stores each of hundreds of possible manufacturers of a type of equipment, consider creating a table that stores references to each manufacturer and use a Lookup column instead of a Choice column.
    

**Choices** (Multi Select Choice) column limitations:

*   Can't be used in workflows, business process flows, business rules, charts, rollup columns, or calculated columns.
*   Not supported in Legacy forms or Bulk Edit forms.
