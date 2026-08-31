---
title: "Build reusable components and formulas in canvas apps"
url: "https://learn.microsoft.com/en-us/training/modules/customize-apps-in-powerapps/reusable-components"
uid: "learn-bizapps.powerapps-customize.reusable-components"
module: "customize-apps-in-powerapps"
moduleTitle: "Customize a canvas app in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Build reusable components and formulas in canvas apps

As your apps grow in complexity, you might notice repeated patterns, like the same formula written in three different places, the same header bar rebuilt on every screen, the same color logic duplicated across dozens of controls. **Reusable components** let you define something once and use it everywhere, making your apps easier to maintain and faster to build at scale.

## Named formulas

A **named formula** is a formula you define once in the **App** object and reference by name anywhere in your app, instead of rewriting the same logic in every control.

Named formulas are defined in the **App.Formulas** property.

For example, to define a reusable color for each machine type:

```
EspressoColor = RGBA(101, 67, 33, 1);
CommercialColor = RGBA(0, 80, 128, 1);
StandardColor = RGBA(100, 100, 100, 1);
```

Now instead of hardcoding the color value in every label and icon, you reference the name:

`If(ThisItem.Type = "Espresso", EspressoColor, If(ThisItem.Type = "Commercial", CommercialColor, StandardColor))`

If Contoso ever changes their brand color for Espresso machines, you update it in one place (the **App.Formulas** property) and every control that references `EspressoColor` updates automatically.

To define the current user's role as a named formula:

```
CurrentUserRole = LookUp(Users, Email = User().Email, Role)
```

Reference `CurrentUserRole` anywhere in the app to show or hide controls based on the user's role.

## User-defined functions

**User-defined functions (UDFs)** let you define a custom formula that accepts parameters and returns a value, similar to a function in traditional programming.

UDFs are also defined in the **App.Formulas** property, using this syntax:

```
FunctionName(Parameter1: Type, Parameter2: Type): ReturnType = Expression;
```

For example, a function that returns a color for each machine type:

```
TypeColor(machineType: Text): Color =
    If(machineType = "Espresso", RGBA(101, 67, 33, 1),
    If(machineType = "Commercial", RGBA(0, 80, 128, 1),
    RGBA(100, 100, 100, 1)));
```

Call the function anywhere in your app:

`TypeColor(ThisItem.Type)`

Or a function that formats a machine catalog entry for display:

```
MachineSummary(name: Text, machineType: Text): Text =
    name & " (" & machineType & ")";
```

Note

User-defined functions are a newer Power Fx feature. They're ideal when the same multi-step calculation or conditional logic appears in multiple places across your app. If you find yourself copying a complex `If()` or `Concatenate()` formula more than twice, it's a good candidate for a UDF.

## Component libraries

A **component library** is a collection of reusable UI components, like headers, navigation bars, cards, input controls, that you build once and share across multiple apps in your environment.

Components are different from named formulas and UDFs: they're **visual building blocks** with their own controls, properties, and behaviors, not just formula logic.

### Create a component

1.  In Power Apps, select **Component libraries** in the left navigation pane, then select **New component library**.
2.  Name the library `Contoso Component Library`.
3.  Select **\+ New component** and name it `AppHeader`.
4.  Add the controls that make up the header, like a rectangle background, a label for the app title, and optionally a back button.
5.  Define **custom properties** for the component so the caller can pass in values like the title text:
    *   Select **\+ New custom property**
    *   **Name**: `HeaderTitle`
    *   **Type**: Data—Text
    *   **Direction**: Input
6.  Set the label's **Text** property to `AppHeader.HeaderTitle`.
7.  Select **Save**, then **Publish**.

### Use a component from a library

1.  Open the app where you want to use the component.
2.  In the left panel, select **Insert** (or the **+** icon), then select **Get more components**.
3.  Browse to **Contoso Component Library**, select **AppHeader**, and select **Import**.
4.  Select **\+ Insert** > **Library components** > **AppHeader**.
5.  In the Properties panel, set **HeaderTitle** to the title for this screen: `"Machine Catalog"`.

Every time Contoso updates the `AppHeader` component in the library—changing the color, font, or layout—all apps that use it can update with a single selection by accepting the published changes.

Note

Component libraries require all apps to be in the same environment. For enterprise scenarios where multiple teams build apps, a shared component library maintained by a Center of Excellence team is a common best practice.

## When to use each approach

Tool

Use when...

**Named formula**

You have a value or simple expression used in multiple controls that never needs parameters

**User-defined function**

You have logic that takes inputs and returns a calculated output, used in multiple places

**Component library**

You have a visual UI element (header, card, nav bar) that should look and behave consistently across multiple apps

Building with reusable components from the start pays dividends when your apps grow, or when Contoso's branding, data model, or business rules change and you need to update everything at once.
