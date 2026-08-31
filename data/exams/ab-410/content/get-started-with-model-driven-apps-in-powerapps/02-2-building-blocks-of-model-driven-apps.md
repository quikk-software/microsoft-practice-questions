---
title: "Components of model-driven apps"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/2-building-blocks-of-model-driven-apps"
uid: "learn-bizapps.powerapps-design-model-driven-apps.2-building-blocks-of-model-driven-apps"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Components of model-driven apps

A well designed model-driven app consists of several components that you select to build the appearance and functionality of the finished app. The components and component properties that makers use to create an app become the app's metadata.

To understand how each of these components relates to app design, we can categorize them as **data**, **user interface (UI)**, **logic**, and **visualization** components.

## Data components

Use these components to define what data is used to build the app.

Within an environment, you can design data components at either a table-level or within a solution. See the descriptions in the table below of each type.

Component

Description

Designer

Table

A table contains records with properties that you track, such as the contact table or account table. (If you imagine an Excel worksheet, the rows are the records.) Many standard tables are available in Dataverse, and some of these (nonsystem standard tables) can be customized. Or you can create a custom table from scratch.

Power Apps table designer

Column

A column is a property that is associated with a table. For example, in the contact table, email address is a column; every record (row) in the table can have its own entry in the email column. Each column has a defined data type, which determines the type of data that can be entered or selected in the column. Examples include text, number, date and time, currency, or lookup (creates a relationship with another table) columns. Columns typically are used in forms, views, and searches.

Power Apps table designer

Relationship

Table relationships define how tables are related to each other. There are 1:N (one-to-many), N:1 (many-to-one), and N:N (many-to-many) types of relationships. A one to many relationship means that an item can appear only once in the table on the 1 side of the relationship but can appear many times on the table on the many side of the relationship. For example, consider a table that has quotes and a table that has customers. Each quote can be associated with only one customer, but a customer can receive many quotes. If you are in the customer table, it is a one-to-many relationship with the quotes table. If you are in the quotes table, it is a many-to-one relationship with the customer table. As another example, imagine table of classes and a table of students, where students can take many classes and classes can have many students in them. The relationship between the classes and students tables would be a many-to-many. Adding a lookup column to a table creates a new 1:N relationship between the two tables and lets you reference the information in the related ("looked up") column.

Power Apps table designer

Choice column

This is a special type of column that provides the app user a set of predetermined options. Each option has a system-assigned value and label. When added to a form, this column displays a control for the user to select an option. There are two kinds of choices; **choices**, where the user can only select one option, and **multi-select choices**, which allow more than one selection.

Power Apps option set designer

## UI components

These components determine how users will interact with the app.

Component

Description

Designer

App

The app includes fundamental settings, such as components, properties, client type, and the URL for your app.

App designer

Site map

The site map specifies the navigation for your app. Navigation is configured by adding and arranging pages directly in the app designer.

App designer

Form

A form is a defined set of data-entry columns for a given table. For example, you can create a form where users input relevant information to track a customer's orders. The information entered in the form by users populates the relevant tables' rows and columns.

Form designer

View

Views define how a list of records for a specific table appears in your app. A view defines the columns shown, the width of each column, the sort behavior, and the default filters.

View designer

Custom page

A canvas app-based page allowing a more flexible layout, low-code Fx functions, and Power Apps connector data

Power Apps Studio

Generative page

An AI-generated React-based page created from a natural language description of the data and layout you need

App designer

## Logic components

These components define the business processes, rules, and automations the app will have. Power Apps makers use a designer that is specific to the type of process or rule.

Type of logic

Description

Designer

Business process flow

A business process flow is an online process that walks users step-by-step through a standard business process. For example, use a business process flow if you want everyone to handle customer service requests the same way, or to require staff to gain approval for an invoice before submitting an order.

Business process flow designer

Workflow

Workflows automate business processes. Designers use workflows to trigger automations when a user manually initiates the flow, to run at specific intervals (such as weekly), or to run automatically based on certain events (such as when a record is created or updated).

Workflow designer

Actions

Actions let you manually invoke actions, including custom actions, directly from a workflow, plugin, custom button, or code.

Process designer

Business rule

Business rules are used to apply logic to a form, such as to set column requirements (including whether data is required in the column), hide columns, or validate data. App designers use a simple interface to implement and maintain fast-changing and commonly used rules.

Business rule designer

Power Automate Flow

Power Automate is a cloud-based service, similar to workflows, that lets you create automated workflows between apps and services to get notifications, sync files, collect data, and more. Workflows (discussed above) are specifically for Model Driven apps, while Power Automate flows reach across multiple applications and services.

Power Automate

## Visualizations

Determines what type of data visualizations and reporting the app will have available.

Component

Description

Designer

Chart

A single graphic visualization (such as a bar or pie chart) that can be displayed within a view, on a form, or be added to a dashboard.

Chart designer

Dashboard

A palette for one or more graphic visualizations that provide an overview of actionable business data.

Dashboard designer

Embedded Power BI

Embedded Power BI tiles and dashboards can be added to your app. Power BI is a cloud-based service that provides business intelligence insight.

Combination of chart designer, dashboard designer, and Power BI

[![Screenshot example of visualization components with charts.](media/updated-dashboard-designer.svg)](media/updated-dashboard-designer.svg#lightbox)
