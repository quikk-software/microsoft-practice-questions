---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/customize-apps-in-powerapps/5-summary"
uid: "learn-bizapps.powerapps-customize.5-summary-cleanup"
module: "customize-apps-in-powerapps"
moduleTitle: "Customize a canvas app in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Summary

In this module, you customized a canvas app in Power Apps, taking it from a working prototype to a polished, production-ready solution. You explored the controls that form the backbone of most canvas apps: galleries for browsing records, forms for editing them, and the properties that tie them together. Understanding how `IsSelected`, `Default`, and `Update` work gives you the foundation to build apps that behave predictably and respond correctly to user input.

You then learned how to structure an app across multiple screens, using `Navigate()` to move forward through a flow and `Back()` to return, and how to pass data between screens using context variables so each screen knows exactly what to display.

Power Fx formulas gave your app real intelligence. With `Filter()` and `If()`, you control what appears and how it looks. With `Patch()` and `SubmitForm()`, you write data back to your source. Variables and collections let you hold values in memory, globally with `Set()`, locally with `UpdateContext()`, or as full in-memory tables with `Collect()` and `ClearCollect()`. When things go wrong, `IfError()` and `Notify()` let you handle failures gracefully and keep users informed.

Copilot in the formula bar changes how you work with Power Fx. Whether you type a plain-English description in the Copilot panel or write a comment directly in the formula bar, Copilot can generate the formula for you and explain any formula you encounter. This lowers the learning curve without removing the precision that complex apps require.

Beyond individual formulas, you learned how to build for scale. Named formulas in `App.Formulas` let you define a value once and reference it everywhere. User-defined functions let you encapsulate logic that takes parameters and returns a result. Component libraries let you build UI elements—headers, cards, nav bars—that can be shared and updated across every app in your environment. These aren't just productivity shortcuts; they're the practices that separate apps that are easy to maintain from apps that become a burden.

## References

For more information about Power Fx functions, see the [formula reference for Power Apps](/en-us/power-apps/maker/canvas-apps/formula-reference/?azure-portal=true).

To go deeper on canvas app customization, see the [Use the UI and controls in a canvas app in Power Apps](/en-us/training/paths/ui-controls-canvas-app-powerapps/?azure-portal=true) learning path and [Use basic formulas to make a better canvas app in Power Apps](/en-us/training/paths/use-basic-formulas-powerapps-canvas-app/?azure-portal=true).

To learn more about screen navigation and context variables, see [Add navigation](/en-us/power-apps/maker/canvas-apps/add-screen-context-variables?azure-portal=true#add-navigation).

To learn more about component libraries, see [Component library](/en-us/power-apps/maker/canvas-apps/component-library?azure-portal=true).
