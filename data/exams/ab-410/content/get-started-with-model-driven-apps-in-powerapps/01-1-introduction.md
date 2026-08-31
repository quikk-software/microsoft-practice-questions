---
title: "Introducing model-driven apps"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/1-introduction"
uid: "learn-bizapps.powerapps-design-model-driven-apps.1-introduction"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Introducing model-driven apps

Model-driven app design is an approach that starts with arranging data and determining what you want to do with that data, and then adding dashboards, forms, views, and charts to interact with the data in the form of an app. Model-driven apps connect your Dataverse tables via relationships, allowing you to navigate between them and reducing the likelihood of repeated data.

Using the app designer with little or no code, you can build apps that range from relatively simple to quite complex. Modern model-driven apps also include built-in AI features — such as Copilot chat, generative pages, Power Fx commands, and autonomous agents — that help both makers and users work more efficiently.

In canvas apps, the app maker has total control over the app layout. In model-driven apps, the components that you add (which may include dashboards, forms, views, and charts) determine the layout. Model-driven apps allow you to focus on more quickly viewing your business data and making decisions, rather than on intricate app design.

[![Screenshot example of Power Apps model-driven app.](media/updated-model-app-sample.svg)](media/updated-model-app-sample.svg#lightbox)

## The approach to making model-driven apps

Model-driven apps have the following fundamental phases:

1.  Model your business data
2.  Define your business processes
3.  Compose the app
4.  Configure security roles
5.  Share the app

### Model your business data

This is the most important step to building a model-driven app. It's appropriate to think of model-driven apps as "data model" driven. You must first build your data model in Dataverse before you can create an app. When modeling business data, you determine what data you need and how that data relates to other data. If done properly, designers can customize an app without writing code.

### Define your business processes

Defining and enforcing consistent business processes is a key aspect of model-driven app design. Consistent processes help ensure that your app users can focus on their work and not worry about having to remember to perform a set of manual steps. Processes can be simple or complex, and they often change over time.

### Compose the app

After modeling data and defining business processes, you build your app in the App Designer by selecting and setting up the pages you need. Power Apps automatically creates a default site map, helping define the navigation for users.

### Configure security roles

Only users with assigned security roles can access Dataverse tables. Once you apply a security role to a particular table, that role's access applies to any application using the data. Security is robust in Dataverse, allowing you to create unique roles with each table. The same tables can have different roles with different types of access, including the ability to create, read, write, delete, append, append to, assign, and/or share data from the table.

### Share the app

Model-driven app sharing is a two-step process. First, you have to share access to the Dataverse table by assigning a security role to a user (or group of users), and then you can share the app, itself. If you share an app with a user who doesn't have an assigned security role for the table containing the data that the app uses, the user won't be able to use the app.

To summarize, Power Apps Model-Driven apps make it easy to quickly create an app based on well-designed Dataverse tables, with little to no coding required.
