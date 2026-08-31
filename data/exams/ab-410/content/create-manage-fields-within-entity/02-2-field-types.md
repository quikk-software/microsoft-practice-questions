---
title: "Column types in Microsoft Dataverse"
url: "https://learn.microsoft.com/en-us/training/modules/create-manage-fields-within-entity/2-field-types"
uid: "learn-dynamics.create-manage-fields-within-entity.2-field-types"
module: "create-manage-fields-within-entity"
moduleTitle: "Create and manage columns within a table in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Column types in Microsoft Dataverse

Tables contain columns. When creating a column, you select the column's data type. The data type determines the values that can be stored within that column. All columns have one and only one data type.

Dataverse has numerous data types for columns in a table. Some data types have formats that affect how the column is displayed in apps. Each data type has its own attributes that can be configured to provide more customization to the column.

The column types that are available in Microsoft Dataverse are categorized here:

## Text

Text columns contain alphanumeric text strings and also provide specific formatting.

### Single line of text

A text value intended to be displayed in a single-line text box. Single line of text has several formats:

*   **Plain text** or **Text** - Free format text string displayed in a single line text box.
    
*   **Text area** - A text value intended to be displayed in a multi-line text box. If you require more than 4,000 characters, use a _Multiple lines of text_ option.
    
*   **Email** - A text value that is validated as an email address and rendered as a mailto link in the column.
    
*   **Phone number** - A text value that is validated as a phone number rendered as a link to initiate a phone call by using Skype.
    
*   **Ticker Symbol** - A text value for a ticker symbol that displays a link that opens to show a quote for the stock ticker symbol.
    
*   **URL** - A text value that is validated as a URL and rendered as a link to open the URL.
    

The maximum length of a single line of text column is 4,000 characters. The default length is 100 characters. The length of a single line of text column can be changed before and after the column is created.

Note

You can edit a single line of text column and change its data type to an autonumber column.

### Multiple lines of text

A text value intended to be displayed in a multiple-line text box. Multiple lines of text have two formats:

*   **Plain text** or **Text** - Free format text string displayed in a multi-line text box.
    
*   **Rich text** - A formatted text value intended to be displayed in a multi-line text box.
    

The maximum length of multiple lines of text column is 1,048,576 characters. The default length is 2,000 characters. The length of a multiple lines of text column can be changed before and after the column is created.

## Number

Number columns store numeric values. There are several numeric data types. For more information, see [Using the right type of number](/en-us/power-apps/maker/data-platform/types-of-fields#using-the-right-type-of-number).

### Whole number

Whole number columns store integer values. Whole number has several format options:

*   **None (Default)** - A number value with no special formatting.
    
*   **Duration** - A number value presented as a drop-down list that contains time intervals. A user can select a value from the list or type an integer value that represents the number of minutes.
    
*   **Time zone** - A number value presented as a drop-down list that contains a list of time zones.
    
*   **Language code** - A number value presented as a drop-down list that contains a list of languages that are enabled for the environment. If no other languages are enabled, the base language is the only option. The saved value is the Locale Identifier (LCID) value for the language.
    

By default, a whole number column has a minimum value of -2,147,483,648 and a maximum value of 2,147,483,647. The minimum and maximum values can be configured. You can set the **Size of number** property for a whole number column to **Big** and it allows for values between -9,223,372,036,854,775,808 and 9,223,372,036,854,775,807.

### Decimal

A decimal value with up to 10 decimal places. Decimal numbers are stored in the database exactly as specified.

By default, a decimal column has a minimum value of -100,000,000,000 and a maximum value of 100,000,000,000. The minimum and maximum values can be configured.

### Float

A floating point number with up to five decimal places. You should only use float when necessary as floating point numbers store a close approximation of the value and several Dataverse features don't support float such as calculated columns.

By default, a float column has a minimum value of 0 and a maximum value of 1,000,000,000. The minimum and maximum values can be configured.

## Currency

The currency data type stores money values for any currencies that are configured for the environment.

When you add a currency column, four columns are added to the table:

*   **Currency** - A _numeric_ column containing the money value for the selected currency.
    
*   **Currency(Base)** - A _read-only_ column contain the money value converted to the base currency set when creating the environment.
    
*   **Currency** - A _lookup_ column that users can set to any active currency configured for your environment.
    
*   **Exchange rate** - A decimal column that provides the exchange rate used for the selected currency.
    

You can set a level of precision, or you can choose to base the precision on a specific currency or a single standard precision that is used by the organization.

By default, a currency column has a minimum value of -922,337,203,685,477 and a maximum value of 922,337,203,685,477. The minimum and maximum values can be configured.

## Date and time

The Date and time column stores date and time values. In Microsoft Dataverse, you can specify how date and time values are shown to users and how they're adjusted for time zones.

Two options are available for date and time columns.

*   **Format**: Whether to display the time portion of the value.
    
*   **Time zone adjustment**: The default setting is _User local_, but you can also set it as _Time zone independent_.
    

### Format

All date and time columns have a time portion. Format determines whether to display the time portion of the value.

*   **Date and time**: Displays the date and time of the value.
    
*   **Date only**: Displays the date portion of the value only. The unshown time value is 12:00 AM, depending on the _Time zone adjustment_.
    

## Lookup

There are two types of lookup column that you can create:

*   **Lookup** - A column that links two tables together in a many-to-one relationship. A lookup column creates a reference to a single row in the related table.
    
*   **Customer** - A lookup column that you can use to specify a customer, which can be either an account or a contact. Adding a lookup column to a table creates two many-to-one relationships from the table to the account and contact tables
    

## Choice

A choice is a type of column that defines a set of options. When a choice is displayed in a form, it uses a drop-down list control. Choice columns are also known as picklists and option sets.

Choice columns are key/value pairs containing items with an integer value and a label.

### Choice column

A choice column displays a list of options where only one option can be selected.

When creating a choice column, you can specify **Sync with global choice**. It has two options:

*   **Global** - A global choice is a separate component and can be reused for multiple columns on multiple tables. The list of choices is shared for the table columns that use the global choice
    
*   **Local** - A local choice only exists for the table column.
    

### Choices

A Choices column (also called Multi Select Choice) displays a list of options where the user can select **one or more** values simultaneously. Like the single-select Choice column, a Choices column can reference either a global or a local choice definition.

Key limitations of Choices columns:

*   Can't be used in workflows, business process flows, business rules, charts, rollup columns, or calculated columns.
*   Not supported in Legacy forms or Bulk Edit forms.

Note

Use a single-select **Choice** column when only one option should apply to a record. Use a **Choices** column when multiple options can apply at the same time (for example, a list of applicable product categories).

### Yes/no

A Yes/no column is a boolean that has only two options. You can choose which labels are displayed for each option. The default labels are Yes and No.

Note

Labels in choice and yes/no columns are supported for localization when language packs are enabled for the environment.

## File

Dataverse provides two data types for storing documents and images:

*   **File** - A column that can store files up to a specified maximum size. The default maximum file size is 32,768. The maximum size must be between 1 KB and 131,072 KB.
    
*   **Image** - Displays a single image for each record in the application. You can optionally select an image column to be the primary image for the table and this image is displayed in the top left of a model-driven app form. The default maximum image size is 10240. The maximum size must be between 1 KB and 30,720 KB.
    

## Autonumber

Autonumber columns automatically generate alphanumeric strings whenever they're created. You can customize the format of these columns and then rely on the system to generate matching values that automatically fill them in.

Automnumber columns are covered later in this module.

## Formula

Formula columns use the Power Fx language to calculate the value for the column (shown as **_fx_ Formula** in the portal data type picker). They use a syntax that's similar to Office Excel. Formula columns are read-only.

[![Screenshot of editing the primary column.](media/create-formula-column-dataverse.png)](media/create-formula-column-dataverse.png#lightbox)

## Prompt

Prompt columns allow you to define an AI prompt whose generated result is stored directly in the column. When a record is saved or the prompt is triggered, Dataverse runs the prompt against the row's data and stores the AI-generated output in the column.

Use Prompt columns to:

*   Generate text summaries or classifications based on other column values.
*   Produce AI-suggested content (such as a recommended follow-up action) without requiring custom code.

Like Formula columns, Prompt columns are read-only from the user's perspective — the value is set by the AI, not entered manually.

For more information, see [Prompt columns](/en-us/power-apps/maker/data-platform/prompt-column).

## System data types

There are several data types for table columns but that you can't use when creating columns.

*   **Unique Identifier** -A system column stores a globally unique identifier (GUID) value for each row.
    
*   **Owner** - A system lookup column that references the user or team that is assigned a user or team owned table row.
    
*   **PartyList** - Allows for multiple references to multiple tables. These lookups are found on the Email table To and Cc columns. They're also used in the Phone and Appointment tables.
    
*   **Regarding** - allows for a single lookup reference to multiple tables. These lookups are found in the regarding column used in activities
    
*   **Status** - A system column that has options that generally correspond to active and inactive status. Some system tables have more options, but all custom tables have only Active and Inactive status options.
    
*   **Status Reason** - A system column that has options that provide more detail about the Status column. Each option is associated with one of the available Status options. You can add and edit the status reason options.
    

Tip

You can add any combination of columns to a custom or standard table to meet your needs, but you can't delete a standard column from a standard table.
