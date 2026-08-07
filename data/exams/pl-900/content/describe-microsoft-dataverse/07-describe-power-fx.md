---
title: "Describe Power Fx"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-dataverse/describe-power-fx"
uid: "learn.wwl.describe-microsoft-dataverse.describe-power-fx"
module: "describe-microsoft-dataverse"
moduleTitle: "Describe Microsoft Dataverse"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe Power Fx

Power Fx is more than a formula language for canvas apps—it is the standard expression language across Power Platform that enables makers to define calculations, conditions, and server-side logic using a familiar, Excel-like syntax.

## What is Power Fx?

Power Fx is a general-purpose, strongly typed, declarative, and functional programming language designed specifically for low-code scenarios. Its syntax is similar to Microsoft Excel formulas, which makes it approachable for business users who are already familiar with spreadsheet logic. Power Fx expressions are always live. They recalculate whenever the underlying data changes, ensuring that calculated values and conditions remain current without requiring manual refresh.

Power Fx is used across Power Platform in several contexts:

Product

How Power Fx is used

Canvas apps

Define how controls behave and how data is displayed

Model-driven apps

Set formula column values and default values

Dataverse

Define server-side functions that encapsulate reusable business logic

Power Automate

Write expressions that transform and evaluate data within flow steps

Copilot Studio

Define conditions and expressions within agent topics

## Power Fx in Dataverse tables

Within Dataverse, Power Fx is used in several ways.

### Formula columns

Formula columns automatically compute their value based on a Power Fx formula that references other columns in the same row or in related rows. For example, a formula column named Total Revenue might use the formula `UnitPrice * Quantity * (1 - DiscountPercentage / 100)`. Formula column values are computed on the server when the record is read, ensuring they always reflect the current state of the underlying data.

### Rollup columns

Rollup columns aggregate data from related records. For example, an Account table might include a rollup column that calculates the sum of all related Opportunity values, or the count of open Service Requests. Rollup columns are recalculated on a scheduled basis and are useful for generating summary metrics without requiring custom reports or queries.

### Dataverse functions

Note

Dataverse functions are currently in preview and are not intended for production use.

Dataverse functions allow makers to define named, reusable blocks of Power Fx logic that execute on the server. Unlike calculated columns, which compute a single value, functions can accept input parameters, perform multiple steps, interact with Dataverse data, and return a result or trigger downstream actions.

For example, a function named CalculateShippingCost might accept the order weight, destination region, and selected shipping method as inputs, and return the appropriate shipping cost based on your company's rate tables stored in Dataverse. This function can then be called from any canvas app, model-driven app, or Power Automate flow without duplicating the logic.

The benefits of Dataverse functions include:

*   **Centralized logic**: Define business rules once and use them everywhere across your environment.
*   **Discoverability**: Published functions appear in the maker portal where other makers can find and reuse them.
*   **Security**: Server-side execution ensures sensitive logic is not exposed to client-side inspection.
*   **AI compatibility**: Functions can be exposed as actions for Copilot Studio agents, allowing AI agents to invoke business processes on demand.

## Choosing the right business logic approach

Dataverse offers three primary mechanisms for implementing business logic. Choosing the right approach depends on your scenario:

Approach

Best for

Example

Business rules

Simple, no-code validations on forms

Require a phone number if the Account Type is set to Customer

Power Fx (formula columns)

Real-time computed values based on row data

Calculate total price from unit price, quantity, and discount

Power Fx (Dataverse functions)

Reusable, server-side logic with parameters

Compute shipping cost based on weight and destination region

Power Automate

Asynchronous workflows across apps and services

Send an approval email when an expense exceeds a threshold

## Contoso Electronics in action

Contoso Electronics uses a formula column on their Service Request table to automatically calculate how many days a request is open - updated every time the record is read. A Dataverse function named CalculateWarrantyCoverage accepts a product serial number and service date as inputs, checks eligibility against the company's warranty tier tables in Dataverse, and returns whether the service is covered. Both the field technician app and a Power Automate flow call this function, ensuring the same business logic applies regardless of where the request originates.
