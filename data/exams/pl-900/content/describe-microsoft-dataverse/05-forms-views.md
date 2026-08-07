---
title: "Describe table forms and views"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-dataverse/forms-views"
uid: "learn.wwl.describe-microsoft-dataverse.describe-forms-views"
module: "describe-microsoft-dataverse"
moduleTitle: "Describe Microsoft Dataverse"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe table forms and views

Tables in Microsoft Dataverse store your data, but forms and views control how users see that data in model-driven apps. Understanding the difference between forms and views—and when to use each—is an important part of designing effective Power Platform solutions.

## Forms

A form is a layout that defines how an individual record is displayed when a user opens it to view or edit details. Forms control which columns are visible, how they're grouped and labeled, and what extra components—such as embedded subgrids, timelines, and related record panels—appear alongside the main record data.

Dataverse supports several form types, each designed for a specific purpose:

*   **Main form**: The primary form that users interact with when viewing or editing a full record. Main forms support rich layouts with tabs, sections, columns, and embedded subgrids.
*   **Quick view form**: A read-only form that displays summary information from a related record within another record's main form. For example, displaying account details while viewing a contact record.
*   **Quick create form**: A streamlined form that users use to create a new record without leaving their current context, typically accessed through a lookup field or the **New** button in a navigation bar.
*   **Card form**: A compact form used in views and dashboards to display a minimal set of key column values for a record.

Use the Power Apps form designer to create forms. It provides a drag-and-drop interface for adding columns, tabs, and components. Makers can create multiple forms for the same table and assign different forms to different security roles, so users see layouts tailored to their responsibilities.

[![Screenshot of the Power Apps form designer showing the Account main form layout with table columns, form fields, and form properties.](media/forms.png)](media/forms.png#lightbox)

Note

Copilot in the form designer can suggest layout improvements and additional columns based on the purpose you describe for a form.

## Views

A view is a saved query that defines which records from a table are displayed, and in what order, when a user sees a list of records. Where a form shows a single record in detail, a view shows multiple records in a grid. Views control the columns displayed, the sort order, and the filter conditions that determine which records appear.

Dataverse includes several system-defined views for every table, but makers can create custom views to address specific business scenarios:

*   **Active records view**: Displays all records where the status is Active. This is typically the default view for a table.
*   **My records view**: Displays only records owned by or assigned to the current user.
*   **Custom views**: Maker-defined views with specific column selections, filters, and sort orders to support particular business processes.

Views are used in model-driven app navigation, embedded subgrids within forms, lookup field results, and as data sources for Power Automate flows. Well-designed views make it easy for users to find the records they need and understand the current state of their work without building custom queries.

[![Screenshot of the Power Apps view designer showing the Active Accounts view with account records in a grid and view properties panel.](media/views.png)](media/views.png#lightbox)

## Contoso Electronics in action

Contoso Electronics field technicians use a Main form to update service request status and log time on-site. Service managers use a custom view filtered to show only open, high-priority requests assigned to their region, sorted by the date the request was created—giving them instant visibility into the work that needs the most attention.
