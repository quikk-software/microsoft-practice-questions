---
title: "Configure multiple forms"
url: "https://learn.microsoft.com/en-us/training/modules/configure-model-driven-apps-customer-engagement-apps/03-configure-multiple-forms"
uid: "learn-dynamics.configure-model-driven-apps-customer-engagement.03-configure-multiple-forms"
module: "configure-model-driven-apps-customer-engagement-apps"
moduleTitle: "Configure forms, charts, and dashboards in model-driven apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Configure multiple forms

Users of model driven applications encounter many forms in their user experience, and they even encounter different forms for the same table depending on their role, job tasks, and desired outcomes.

You can set the form order when using multiple forms. Form order defines the order in which a user sees the available forms, within the set of allowed forms for their security roles.

The Form settings give you the ability to choose a form set from the dropdown and then allow you to drag and drop to change the order of the forms. To save the reordering, press the Save and publish button.

[![Screenshot of the Form Order window to specify display order.](media/form-order.png)](media/form-order.png#lightbox)

### Access to forms

When users need to access common tables for different roles, it might be useful to have other forms available to tailor the user experience for that particular set of users. You can assign a security role (or collection of security roles) to control access to the form. For example, you may have a set of users who focus on sales and have customizations to the _Contact_ row such as the addition of LinkedIn Sales Navigator widgets. For a non-sales user, this would make for an undesirable experience, with loads of unnecessary blank areas on the _Contact_ form. You could copy the main contact row and then add or remove the components to the copy, and then assign security roles to each of the forms.

Note

Controlling user access to forms is not necessarily a secure means to prevent access to data. Sometimes users have other ways to interact with data such as advanced find or background automation.

#### Assign security roles to a form

To assign security roles using **Form settings**:

1.  Sign in to Power Apps, select **Solutions**, open the solution you want, open a table, and then select the **Forms** area.
2.  Select the main form you want to configure, and then on the command bar select **Form settings**.
3.  In the left navigation on the Form settings page, select **Security role**.
4.  Choose **Everyone** to allow all users, or choose **Specific security roles** and select the roles you want to grant access to.
5.  Select **Save and Publish**.

#### Set form order

When you have multiple forms of the same type for a table, form order determines which form is shown by default to users:

1.  In the **Forms** area, select a form and then on the command bar select **Form settings**.
2.  In the left navigation, select **Form order**.
3.  Select the form set you want (for example, **Main Form**), then drag and drop forms into your preferred order.
4.  Select **Save and publish**.

#### Set the fallback form

Each table must have a designated fallback form — the form shown to users whose security role doesn't match any role-tailored form. Fallback forms apply to main forms only.

1.  In the **Forms** area, select a form and then on the command bar select **Form settings**.
2.  In the left navigation, select **Fallback forms**.
3.  Clear the checkbox next to any form you want to remove from the fallback order, or select the checkbox to enable a form as a fallback.
4.  Select **Save and publish**.

### Form types and behaviors

*   **Main** - Main forms are the primary user interface where people view and interact with their data. Main forms provide the widest range of options and are available for model-driven apps. One of the fundamental qualities of model-driven apps is that they're responsive to the size and type of device used when interacting with them. This affects the position of the controls on the form in addition to the way in which they behave. This is most notably the case with main forms. One of the design objectives for main forms is that you design them once and deploy them everywhere. The same main form you design for a model-driven app or the customer engagement apps web application, is also used in Dynamics 365 for Outlook and Dynamics 365 for tablets. The advantage to this approach is that you don’t have to integrate changes into multiple forms. AutoSave is the default behavior on main forms but administrators can disable it.
    
*   **Quick create** - With quick create forms, an app can have a streamlined data entry experience with full support for logic defined by form scripts and business rules. In a Power Apps model-driven app, quick create forms appear when a user selects the **Create** button from the navigation bar or when they choose **\+ New** when creating a new row from a **lookup** or **subgrid**. Model-driven apps and Dynamics 365 mobile apps use quick create forms for creating new rows. If a table already has a quick-create form configured for it, the mobile apps use that form. If a table doesn't have a configured quick create form, Power Apps generates a quick create form for creating rows in the mobile apps based on the main form definition. Though you can create multiple quick-create forms, you can only designate one for use, as set by the form order. You can't assign them to security roles and they don't allow the user to switch forms. Also, you must enable them for the table.
    
*   **Quick view** - You can add a quick view form to another form as a quick view control. It provides a template to view information about a related table row within a form for another table row. This capability means your app users won't need to navigate to a different row to see the information needed to do their work. Quick view controls are associated with a lookup column included in a form. While a quick view form can appear over a view or a form, it's authored as a form, rather than a view. If the lookup column value isn't set, the quick view control isn't visible. Users can't edit data in quick view controls and quick view forms don't support form scripts.
    
*   **Card** - Card forms are used in views for model-driven apps. They present information in a compact format suitable for **mobile devices**. Although you can create and edit card forms in the same way as other form types, you add card forms to apps differently. Instead of adding a form as an app component, you add custom card forms to views by using the **Read-only Grid** control.
    

### Miscellaneous form details

*   Each table must have a designated fallback form. This is the form that all users see if they don't have a security role assigned that matches your role-tailored forms. Fallback forms are only available with main forms and don't apply to quick create, quick view, and card forms.
    
*   When a user has access to multiple forms, they'll see a form selector near the top of the form. If a user has access to only a single form for a given table, they won't see the form selector.
    
*   You can designate a main form as inactive. This makes it invisible to all users, regardless of their security role. This feature was included primarily to manage new forms included when organizations upgrade, but you can use it to prevent people from being able to use any main form.
    

Being able to configure your forms is an essential skill for a model-driven app developer.
