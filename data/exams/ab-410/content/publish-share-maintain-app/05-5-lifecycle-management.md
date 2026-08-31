---
title: "Application lifecycle management"
url: "https://learn.microsoft.com/en-us/training/modules/publish-share-maintain-app/5-lifecycle-management"
uid: "learn-bizapps.publish-share-maintain-app.5-lifecycle-management"
module: "publish-share-maintain-app"
moduleTitle: "Publish, share, and maintain a canvas app"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Application lifecycle management

App development is a cycle, not a straight line. Business processes change, technology evolves, and user needs shift. Your apps will too. Application lifecycle management (ALM) is the practice of managing that cycle deliberately: from the initial concept through planning, development, testing, and deployment, and then back around again as the next round of changes begins.

[![Screenshot of the application lifecycle management with steps to plan, design, develop, test, deploy, and refine.](media/app-lifecycle.png)](media/app-lifecycle.png#lightbox)

Consider the Travel Expense Report app example that you created in this learning path. If you choose to add an approvals piece, you'll need to return to the planning phase to consider how that component fits into your existing data model. Next, you'll need to plan and build the screens and then submit to a small group of users for testing. Finally, you can deploy your app by sending it to all users and then maintain it until the next major change, such as adding expenses other than travel.

These stages might be shorter or lengthier in terms of time and resources. For example, months might span between changes, or you might have a major series of updates that take a year from planning to implementation. Furthermore, not every change requires extensive planning or testing. It might involve planning and testing on the part of the developer, especially for minor changes such as adding a field to a dropdown menu. Whether a major or minor change, ALM helps you in your building process to consider these stages throughout the life of your app.

## Solutions and pipelines

Understanding the ALM cycle is useful, but you also need practical tools to move your app through environments. Power Platform provides two foundational ALM tools.

**Solutions** are the packaging mechanism for deploying apps and their related components (flows, tables, connection references, and more) across environments. When you develop an app inside a solution, you can export that solution and import it into your test or production environment. Apps built outside a solution have limited ALM support; they can't be deployed as part of a structured release process.

**Pipelines in Power Platform** are the built-in low-code deployment tool. A pipeline connects your development, test, and production environments so that you can deploy a solution with a few selections directly from Power Apps, no Azure DevOps knowledge required. A pipeline run tracks who deployed what and when, giving you an audit trail for every release.

Tip

For professional ALM with source control, explore **Power Platform Git integration**, which lets you sync solutions to a Git repository so teams can use branching and pull requests alongside pipelines.
