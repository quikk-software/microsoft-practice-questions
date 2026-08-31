---
title: "Exercise - Create table relationships"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/create-table-relationships"
uid: "learn-bizapps.powerapps-common-data-service.create-table-relationships"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Exercise - Create table relationships

In this unit, you create a table and then add relationships between tables. You learn how to:

*   Create a relationship by using a lookup column.
*   Add a one-to-many table relationship.

The simplest way to add a table relationship is to create a lookup column to another table. This action automatically creates a parent-child relationship between tables.

Note

The **Pet** table referred to in this unit was created in the previous exercise. You need to create the related tables to add relationships.

## Create a custom table and add a column

1.  Sign in to the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true).
    
2.  In the left navigation pane, select **Tables**, then select **New table**, and select **Set advanced properties**.
    
3.  In the _Properties_ section of the **New table** pane, enter the following values:
    
    *   **Display name**: _Trick_
        
    *   **Description**: _Pet Tricks_
        
4.  Select the _Primary column_ tab and enter the following:
    
    *   **Display name**: _Trick Name_
5.  At the bottom of the pane, select **Save**.
    
6.  On the **Trick** table, select **New**, then select **Column**.
    
7.  In the **New column** pane, enter:
    
    *   **Display name**: _Level_
        
    *   **Data type**: _Choice_
        
8.  Create the choice values:
    
    1.  Select **New choice** to open the **New choice** pane.
        
    2.  In the **Display name** field, enter _Level_.
        
    3.  Under **Choices**, in the **Label** and **Value** fields, enter _Beginner_ and _1_, respectively.
        
    4.  Select **New choice** and add _Proficient_ with a value of _2_.
        
    5.  Select **New choice** again and add _Expert_ with a value of _3_.
        
    6.  Select **Save**.
        
9.  Under **Sync this choice with**, select _Level_, then select **Save**.
    

## Create a relationship by using a lookup column

1.  On the **Trick** table, select **New**, then select **Column**.
    
2.  In the **New column** pane, enter:
    
    *   **Display name**: _Pet_
    *   **Data type**: _Lookup_
    *   **Related table**: _Pet_
    
    [![Screenshot of Pet lookup column.](media/lookup-column.png)](media/lookup-column.png#lightbox)
    
3.  Select **Save**.
    

This action creates a many-to-one relationship between the Trick and Pet tables. The **Pet** table now has a one-to-many relationship with the **Trick** table, even though a corresponding column wasn't added manually.

## Add a one-to-many relationship

1.  In the [Power Apps maker portal](https://make.powerapps.com/?azure-portal=true), select **Tables** from the left navigation pane, then select the **Account** table.
    
2.  In the **Schema** pane, select **Relationships** to view existing relationships.
    
    [![Screenshot of the Schema pane with the relationships button highlighted.](media/schema-relationships.png)](media/schema-relationships.png#lightbox)
    
3.  At the top left, select **New relationship**, then select **One-to-many** from the dropdown.
    
4.  In the **One-to-many** pane on the right, in the **Related (Many)** list, select **Pet**.
    
5.  Select **Done**.
    

A new column named Account, of the Lookup data type, is automatically added to the Pet table.

[![Screenshot of the Account column of the lookup data type automatically added.](media/updated-account-lookup-field.png)](media/updated-account-lookup-field.png#lightbox)

For more information, see [Create and edit One-to-many or Many-to-one table relationships using Power Apps portal](/en-us/power-apps/maker/data-platform/create-edit-1n-relationships/?azure-portal=true).
