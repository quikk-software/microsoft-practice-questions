---
title: "Form elements"
url: "https://learn.microsoft.com/en-us/training/modules/configure-model-driven-apps-customer-engagement-apps/02-forms-elements"
uid: "learn-dynamics.configure-model-driven-apps-customer-engagement.02-forms-elements"
module: "configure-model-driven-apps-customer-engagement-apps"
moduleTitle: "Configure forms, charts, and dashboards in model-driven apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Form elements

Once again, Model-driven forms provide the means for presenting data for editing and viewing. They have a responsive design to render on any device where you're using Model-driven apps. When you create a new form, its form type is **Main**. A goal for designing a **Main** form is to have _only_ one per table that can be used everywhere. Let's learn about what elements you see on the form.

### Form organization

Forms organization includes a header, body, and footer, each capable of containing form elements, like columns. The body of the form has further structure with areas called _tabs_ containing sections. You can configure tabs and sections to support columns of form elements, giving further structure to the content. The first tab on a form is the most important and should contain the priority data you want the user to see. While you could configure many tabs, keeping it to a smaller number with logical grouping of data can make a more usable experience because the user isn't constantly tabbing around to find things. Additionally, burdening your form with too many tabs can affect performance, particularly for mobile users.

### Form designer

The most common task you perform when editing a form is placing column controls on the form. Take a look at the **Form designer** interface to add/modify a form in your app. The form itself appears in a canvas window in the middle of the screen. You notice a command bar at the top, providing you with some quick functions and navigation links, and a side menu, which allows you to navigate through different options to display in your left-side panel.

### Table columns and properties

The **Table columns** list that displays initially in the left-side panel shows you available columns from your data source. You can choose to show only the columns you haven't used, or you can display all of them. On the right side of the screen, a panel contains the **properties** of any selected part of your form.

[![Screenshot of the form screen highlighting the form field button, the table columns and the form column properties.](media/02-new-form-table-columns.png)](media/02-new-form-table-columns.png#lightbox)

You can add the same column to the form multiple times if needed, and the value shown is identical for each occurrence. The table columns added to your form become form fields. You can delete any non-required fields or hide any required fields on your form, without affecting your data. Deleting them from the form just re-adds them to the unused table columns list.

From the **Properties** tab, you can do things like adjust the field's name, visibility, and toggle read-only. Without special configuration, a column renders with input controls according to data type of the column. For example, a Choice column shows the data in a drop-down list.

### Components

If you select the Components field from the side rail or the Component option from the command bar, you see the **Components** menu displayed in the left-side panel. Components allow you the ability to further customize your form. The Layout choices provide you with ways to organize the physical structure of your form. Grid components enable you to allow data entry via a grid. Display components allow you to insert calendars, external websites, Canvas apps, and other items into the form experience. Input components provide your user with other means for data entry, such as checkboxes, option sets, toggles, and pen inputs. The list of available components continues to expand including options like Power BI reports.

[![Screenshot of column Properties window with red box around Add Control.](media/02-new-form-components.png)](media/02-new-form-components.png#lightbox)

### Adding components

When you select a component to add, Power Apps prompts you for which field you could apply that component to, and to annotate which platforms to display the component on. If there's no table column that you can apply the component to, you can't insert it. In the following example, we've selected a **Rich Text Editor Control**. We're prompted to select a **Table column** (notice that it's a required field) and the dropdown provides us with two possible fields where we could add this control. Selecting one of them adds the control to the form canvas.

Notice that you can determine which form factor you would like this component to display in, so that you can use a different component for the same field for different form factors.

[![Screenshot of Popup window depicting Add Rich Text Editor Control table column choices.](media/new-component-rich-text-editor.png)](media/new-component-rich-text-editor.png#lightbox)

### Form settings

Form settings allow us to install controls on our forms that work behind the scenes, without our user's notice, defining which form the user sees. We can define security roles for the form controlling things like access, form order, and fallback forms. Additionally, Form settings provide us with the ability to check a particular security group's access to the form. The following image shows the _Security roles_ tab.

[![Screenshot of form settings showing security roles tab.](media/02-new-form-settings-security.png)](media/02-new-form-settings-security.png#lightbox)

The _Form order_ allows you to determine which form appears first and next depending on the security role. It enables you to have different forms appear for different users. _Fallback forms_ allow you to enable a particular form when a security role doesn't have a form selected, or vice versa.

### Show or hide form elements

You also have the ability to show or hide from elements via the **Properties** panel for each element. Tabs, sections, columns, iFrames, and web resources all provide this option. When you use form scripts or business rules, you can adjust the visibility of these elements to create a dynamic form for user interface that adapts to conditions in the form.

Rather than designing forms that depend on scripts to control visibility options, you can apply a business rule (or switch to a different form) to meet your requirements. If you use scripts, make sure that any element that might be hidden is hidden by default. Only show an element with scripts when your logic calls for it. That way it doesn't appear in presentations that don't support scripts.

### Form event handlers

Form event handlers allow configuring developer logic that runs when the user interacts with the form. You can access them from the **Events** tab for that element in the right side panel, however, you must add a library prior to enacting them.

Form event handlers for forms can be configured for the following areas in a form:

Elements

Event

Description

Form

OnLoad

Occurs when the form loads.

OnSave

Occurs when data is saved.

Tab

TabStateChange

Occurs when the tab is expanded or collapsed.

Column

OnChange

Occurs when data in the column changes and the control loses focus.

IFrame

OnReadyStateComplete

Occurs when the content of an IFrame loads.

An event handler consists of a reference to a JavaScript web resource, and a function defined within that web resource that executes when the event occurs. Each element can have up to 50 separate event handlers configured.

Most of the time developers create the event handlers; however, you might want to review what is configured on your form.

In addition to being able to add event handlers from the **Events** tab in the right side panel, you can also load them into your form via the **Form libraries** panel. You can access it from the left side navigation rail or the command bar. You select **Add library** to bring up the **Add JavaScript Library** where you can select and apply the web resource to your form.

[![Screenshot of add JavaScript Library.](media/02-new-add-javascript-library.png)](media/02-new-add-javascript-library.png#lightbox)

### Summary

The Power Apps Form designer provides you with the ability to create and control every aspect of your form through fields, components, settings, and event handlers. You can easily design a basic form from your data table columns. You can also design highly complex forms that adjust to the security role of the user, run scripts during user interaction, and provide graphic interface with data.

In the next unit, we'll explore how to configure multiple forms.
