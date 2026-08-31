---
title: "Add logic to commands with Power Fx"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/power-fx-commands"
uid: "learn-bizapps.powerapps-design-model-driven-apps.power-fx-commands"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Add logic to commands with Power Fx

Model-driven apps support a command bar at the top of forms and views where you can add custom buttons. Using Power Fx, you can control what happens when a button is selected, whether the button is visible, and how it interacts with the selected record.

## What is commanding?

Commanding lets makers add custom buttons to the command bar of a model-driven app using the command designer. Rather than writing JavaScript, you write Power Fx expressions — the same formula language used in canvas apps — to define the button's behavior and visibility.

Note

Many Power Fx functions that work in canvas apps are also supported in commanding. Some functions are not supported, including `Set()`, `Collect()`, `UpdateContext()`, and others that rely on canvas-specific state management.

## OnSelect

The `OnSelect` property defines what runs when a user selects the button. You can use any supported Power Fx function here.

For example, to update the name on the currently selected account record:

```
Patch(Accounts, Self.Selected.Item, {'Account Name': "Contoso"})
```

To navigate to a different screen or view:

```
Navigate(Accounts)
```

To show a confirmation dialog before taking action:

```
If(
    Confirm("Are you sure?", { ConfirmButton: "Yes", CancelButton: "No" }),
    Patch(Accounts, Self.Selected.Item, {Status: "Closed"})
)
```

## Visible

The `Visible` property controls whether the button appears in the command bar. Set it to a Power Fx expression that returns `true` or `false`.

For example, to show the button only when one or more records are selected in a grid:

```
CountRows(Self.Selected.AllItems) > 0
```

To show the button only for records with a specific field value:

```
Self.Selected.Item.'Account Rating' > 20
```

## The Selected property

Inside a command's Power Fx expressions, the `Self.Selected` object gives you access to the record or records that are currently selected in the app.

Property

Returns

Description

`Self.Selected.Item`

Single record

The currently selected record. Blank if nothing is selected or if multiple records are selected.

`Self.Selected.AllItems`

Table of records

All currently selected records. Empty if nothing is selected.

`Self.Selected.State`

Enum

Whether the form is in Edit (0), New (1), or View (2) state.

## Notify the user

Use the `Notify` function to show a banner message to the app user after a command runs:

```
Notify("Record updated successfully.")
```

Next, you'll put your skills into practice by building a complete model-driven app in a hands-on exercise.
