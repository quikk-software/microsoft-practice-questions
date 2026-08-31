---
title: "Use specialized form components"
url: "https://learn.microsoft.com/en-us/training/modules/configure-model-driven-apps-customer-engagement-apps/04-specialized-form-components"
uid: "learn-dynamics.configure-model-driven-apps-customer-engagement.04-specialized-form-components"
module: "configure-model-driven-apps-customer-engagement-apps"
moduleTitle: "Configure forms, charts, and dashboards in model-driven apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Use specialized form components

Power Apps provides controls for model-driven apps that allow users to visualize data within table columns in addition to enabling interaction with them. This unit contains more details on several of the most common ones.

### Grid controls

You can configure grid controls for a table or a form as a read-only **subgrid** or using the **Power Apps grid control**. The read-only subgrid allows you to present a view of data related to the current record where users can view and open the record from within the grid.

The **Power Apps grid control** is the recommended solution for all grid scenarios. By default it operates in read-only mode, but you can set the **Enable editing** property to **Yes** to allow inline editing directly from views and subgrids. Additional capabilities include:

*   **Inline editing** — edit records directly in views and subgrids without opening individual records
*   **Nested grids** — expand rows to reveal related records in a subgrid
*   **Grouping** — group tabular data by any column
*   **Aggregation** — display sum, min, max, or average values on numeric columns
*   **Infinite scrolling** — scroll continuously through data without pagination
*   **Configurable properties** — control filtering, sorting, column reordering, multiselect, range selection, jump bar, OptionSet colors, row status icons, and more

Important

The **Editable Grid** control and **Power Apps Read-Only Grid** control were deprecated in March 2026. They will receive critical security fixes only. If your apps use either of these controls, migrate to the Power Apps grid control. For more information, see [The Power Apps grid control](/en-us/power-apps/maker/model-driven-apps/the-power-apps-grid-control).

### Display controls

Display controls provide you with the ability to display information in your app that isn't directly related to table data. Examples include the **Calendar** control, which allows users to view scheduled activities and their associated details in a calendar. Another display control is an embedded **Canvas app**, which enables rich data integration of various data sources right next to contextual data from the host model-driven form. A **web resource** such as an HTML page or image file is another display control. Another is a **Knowledge search** control (which requires Dynamics 365 Customer Service app) to make it easy for users in your organization to find knowledge articles so they can answer common customer questions and resolve their issues right from the records, without having to switch to a different application. Other Display controls include:

#### External website (iframe)

You can add inline frames (iframes) to a form to integrate content from another website within a form. You can add Iframes to the form by inserting an **External website** display control onto the form and inputting a URL. Once you add an iframe to your form, you can configure how it renders.

#### Quick view

A quick view control on a model-driven app form displays data from a row selected in a lookup on the form. A quick view form displays non-editable data in the control. However, when you include the table's primary column in the quick view, it becomes a link to open the related row.

#### Timeline control

The timeline helps app users see all activity history. You use the timeline control to capture activities like notes, appointments, emails, phone calls, and tasks. It ensures tracking and visibility of all interactions with the related table over time. Use the timeline to quickly catch up on all of the latest activity details.

The [timeline control](/en-us/power-apps/maker/model-driven-apps/set-up-timeline-control/?azure-portal=true) provides an easy way to view information related to a table, such as accounts or contacts. This immersive experience helps give users a better understanding of their customer interactions and helps them deliver more personalized service in an efficient and effective manner.

App makers can configure the information displayed on the timeline to help users access information and create new activity records, such as emails and tasks directly from the timeline quickly so they can deliver more personalized service.

### Input controls

Input controls provide the means for users to input data. Some of these controls are the **Checkbox**, allowing users to choose between binary values, the **Number input** allowing users to tap plus and minus buttons to change a numeric value in configurable increments (or type a number directly into the control), and the **Option set** which presents a set of choices for users to choose from during data entry. Other input controls include the **Pen input** as a means to capture written input as signatures, the **Rich text editor** providing an editing area for formatting text, and the **Star rating** and **Toggle** controls.

### Other controls

Microsoft continues to add controls that you can add to your forms. One of these controls is a **Business card reader** allowing users to detect business cards and extract their information. Also, the **Power BI report** allowing you to add a report directly to your form. At the bottom of the **Components** panel is a **Get more components** button providing a list of components available in the environment.

### Summary

These are just some of the options available for customizing your model-driven apps forms experience. Forms are highly customizable for different business requirements. The form editor makes it easy to add specialized form components exactly where you want them.
