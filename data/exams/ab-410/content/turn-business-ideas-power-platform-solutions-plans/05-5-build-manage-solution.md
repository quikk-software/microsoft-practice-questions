---
title: "Build and manage your solution"
url: "https://learn.microsoft.com/en-us/training/modules/turn-business-ideas-power-platform-solutions-plans/5-build-manage-solution"
uid: "learn.wwl.turn-business-ideas-power-platform-solutions-plans.build-manage-solution"
module: "turn-business-ideas-power-platform-solutions-plans"
moduleTitle: "Turn business ideas into Power Platform solutions with Plans"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Build and manage your solution

With the plan saved and Dataverse tables created, you're ready to build. Each technology tile in the plan has a **Create** button that opens the appropriate Power Platform designer with context from your plan already applied. This unit covers how to build each component, track progress, and manage the solution over time.

## Build the solution components

After you save the plan, the technology tiles display a **Create** button. Selecting Create on any tile opens the corresponding Power Platform designer, prefilled with context from your plan.

![Screenshot of the plans interface showing technology tiles with Create buttons.](media/create-app-tiles.png)

### Canvas apps

When you create a canvas app from a plan, Power Apps Studio opens with:

*   A data-connected app with responsive screens
*   View and edit screens for each recommended table
*   A welcome screen for navigation between sections

For Contoso, the canvas app gives employees a ready-made interface to submit time-off requests and view their PTO balance. You still need to **save and publish** the app before anyone can use it, and from here, you can configure it to match Contoso's branding.

### Model-driven apps

Creating a model-driven app opens the modern app designer with the recommended data tables already added. For Contoso's HR team, this means a model-driven app with views and forms for Time Off Requests, Employees, PTO Balances, and Blackout Dates, all connected and ready to configure.

Like canvas apps, you need to **save and publish** before the app is available to users.

### Power Automate cloud flows

Plans opens Power Automate with a **prefilled prompt** based on the business problem, user story, flow description, and data sources. For Contoso, this means the approval flow already has context about the time-off request workflow; you refine the trigger, conditions, and actions.

### Copilot Studio agents

Creating a Copilot Studio agent from a plan opens Microsoft Copilot Studio with several fields already populated:

*   **Name:** a descriptive name for the agent
*   **Description:** the agent's purpose based on the plan
*   **Instructions:** a set of actions for the agent to perform
*   **Knowledge:** all tables created by the plan are automatically added as knowledge sources

For Contoso, the agent might be configured to answer employee questions about PTO balances, leave policies, and blackout dates. Review the instructions, add any triggers or actions you need, and **test the agent before publishing**.

### Power Pages sites

Creating a Power Pages site opens the design studio with an initial layout, domain configuration, and tailored pages. This option requires the **System administrator** role and permissions to register an application in Microsoft Entra.

Important

When saving a Power Pages site, save it to the **same solution** as your plan for healthy application lifecycle management (ALM). If you're saving to a new solution, select **"Set this as your preferred solution in this environment"** to keep everything aligned.

## Use existing apps in your plan

You don't have to build every component from scratch. Plans lets you incorporate existing apps:

*   **Replace** a proposed app by selecting **Replace** on the app tile and choosing an existing app from your environment
*   **Add** an existing app by selecting **Add technology** and choosing an app

Existing apps added to the plan aren't included in the new solution—use the solution view to see all related solutions and their components.

## Manage the solution

Plans promotes healthy ALM practices by packaging all your components into a single solution artifact. The **Objects view** gives you visibility into everything the solution contains.

### Navigate the Objects view

After you save a plan, the Objects view shows solution tabs across the top of the screen. Each tab represents a solution associated with your plan. Select a tab to view the objects in that solution. If your plan is associated with more than five solutions, an overflow menu shows the rest.

A plan can be associated with multiple solutions. For example, when you add an existing Dataverse table from another solution, that solution becomes linked to your plan.

### Filter plan objects

Use the **"Only show objects in this plan"** toggle to control what the Objects view displays:

*   **Toggle on**: Shows only components explicitly designated as part of the plan. This focused view helps you see just what you built.
*   **Toggle off**: Shows the complete contents of all associated solutions, giving you broader context about dependencies and related components.

So far, you've followed plans from a blank prompt through to a built, managed solution. In the next unit, you'll see how plans works in reverse: generating a plan document from an existing solution.
