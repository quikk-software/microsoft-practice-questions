---
title: "Design model-driven apps"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/2b-design-apps"
uid: "learn-bizapps.powerapps-design-model-driven-apps.2b-design-apps"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Design model-driven apps

Before you begin building your Power Apps solution, you want to map out what you need the app to do. First, what do you want to accomplish with the app? In other words, what are your business requirements or user needs? Second, since model-driven apps start with data, you need to develop a data model. Third, keeping your business requirements in mind, you add business logic to the design. Finally, you determine how you want to display the output.

Important factors to consider for model-driven app design:

*   Business requirements
*   Data Model
*   Business Logic
*   Output

By going through a simple design process, you can flush out any minor issues and prevent them from becoming larger problems after the app is in production.

Create model-driven apps using the App Designer. You choose the tables, dashboards, Business Process flows, forms, and other components that you want to make available in your app, and then Power Apps creates the app for you. As you design your model-driven app, you spend more time understanding what your user needs and how your data interacts than how the app should look.

### Business requirements

The first step in the process is to understand your business requirements. Work with app stakeholders to consider your security, accessibility, data, and design needs.

As mentioned in the previous unit, Dataverse has a robust security model. Consider how securing your app’s data affects your app and what security model best supports your business needs. There are lots of options available, including hierarchy security and row-level security. You need to confirm that data security plan meets your needs, and that your app will honor that security.

Additionally, identify any government regulations or authentication/authorization requirements (if applicable). You may, for example, want to implement multifactor authentication but will need to think about how such requirements affect users connecting to your application. You don’t necessarily need to have all the answers to your questions here; you just want to flush out all of the requirements.

Finally, does your app need to be available when the user is disconnected from the internet? This availability is called Offline Mode and is supported by Dataverse and Model-driven apps when using iOS or Android clients. Offline mode does require other design considerations.

### Data model

When conducting data modeling, here are a couple of important questions to ask yourself:

*   What type of data will your solution be storing and or collecting?
*   How will this data relate to the other data you're working with?

Consider the three most important elements of your data model as _table_, \*column, and _relationship_. Once you've clearly defined the tables that you will be creating, decide which columns will be in each table and the relationship between the tables. After this, you can develop and tweak forms, views, and visualizations. Data is the foundation of a model-driven app.

Remember, model-driven apps use a metadata-driven architecture. The app's design is based on how your data is modeled, and there's no need to write custom code to alter the app design. To expand on this, metadata means “data about data” and defines the data structure stored in the system.

Power Apps allows you to view/modify app metadata by reviewing the app's tables in the Power Apps portal.

[![Screenshot of app metadata of table in the Dataverse.](media/new-metadata-example.svg)](media/new-metadata-example.svg#lightbox)

You can also view/modify the app metadata by opening the app in Play mode.

In the example above, for the Pet table, there are multiple pieces of metadata being collected, including but not limited to:

*   Pet Name
*   Appointment date
*   Species
*   Breed

_Species_ is a lookup type column in our Dataverse table, connecting (or relating) to another Dataverse table called **Species**. There's metadata in the **Species** table that our **Pet** table can access because of the _relationship_ between the tables. Because we created this relationship between the tables, there's no reason to create another rows in our **Pet** table to keep the same information that is in the **Species** table.

As you think about your data model, also think about column types. When you add columns to your table in Dataverse, the column type you choose will determine how users enter and view data in your Model-driven app. Choice type columns display as dropdowns for your app users; currency type columns display with currency symbols; and decimal numbers don’t show currency symbols. Little changes in table column settings can have a profound effect on how your user experiences your app.

Note

If a column type needs to be changed to a different column type, (i.e. text column to a choice), then you'll need to delete the column and recreate with the correct column type. Doing this causes you to lose all the data in the column.

### User Interface (UI) and User Experience (UX)

When you build a Model-driven app, Power Apps determines most of the UI and UX for you. You define the data model to build from, and then Power Apps determines the controls to be used in the app. You can modify these controls by changing what table assets are included. In the App Designer, you can update the Forms, Views, Charts, and Dashboards for your app; you can also control the navigation options. As you're planning your app, decide which components you need. That way, you can create them when you create your tables, before building your app.

Below is a simple Model-driven form for data input.

[![Screenshot example of model-driven app form.](media/pet-appointment-form.svg)](media/pet-appointment-form.svg#lightbox)

### Business logic

You can incorporate business logic into your app in two ways: setting **Business Rules** on Dataverse tables or building **Business Process Flows**.

**Business Rules** are used to set requirements for users when interacting with data. With business rules you can make a column require (so a user can't save a record without entering data in the field), set a default value (such as a yes/no field that always shows no unless the user changes it), or even show or hide a column based on other criteria. For example, in a table for tracking expenses, the "mileage" column could be required only if the user chooses the type of travel as "automobile," and otherwise the mileage column would be optional. Business rules give you the power to maintain data consistently.

**Business Process Flows** guide users through using your app. They're only available for Model-driven apps. These flows visually guide users to the next step in a process and facilitate more user actions at each step. (For example, you can require an approval at a step before moving to the next step.) Business Process Flows let you bring automation to your app and make it more of a guided experience for your users than just a place to enter data.

### Output

Apps often need data visualization. To meet this need, you can create dashboards with custom filters and visual graphics, integrating all the data directly into your app. When creating dashboards, make sure they're simple for users to consume without overwhelming them with data. Provide high-level snapshots of your data and allow users to apply filters and drill downs to dive deeper into the data if needed.

[![Screenshot of Fundraiser app in play mode to visualize data.](media/example-output.svg)](media/example-output.svg#lightbox)

### Industry accelerators

Microsoft collaborates with various industries to tailor the Dataverse data model to their needs. Whether you're in Health, Finance, Banking, Education, Non-Profit, Automotive, or Media, Microsoft regularly releases accelerators and foundational components to help you quickly set up your solution. For more information, refer to the link in the summary unit of this module.
