---
title: "Incorporate business process flows"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/business-process-flows"
uid: "learn-bizapps.powerapps-design-model-driven-apps.business-process-flows"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Incorporate business process flows

You can help ensure that people enter data consistently and follow the same steps by creating a business process flow.

For example, you can create a business process flow so everyone handles customer service requests the same way, or require approval for an invoice before submitting an order.

## Use business process flows

Why should you use business process flows? Business process flows provide a guide for people to get work done. They provide a streamlined user experience that leads people step-by-step through the processes. This user experience can be tailored so that people with different security roles can have an experience that best suits the work they do.

You should use business process flows to define a set of steps for people to follow to lead them to a desired outcome. The process steps provide a visual indicator to tell users where they are in the process.

Business process flows reduce the need for training because new users don’t have to focus on which table they should be using. They can let the process guide them. You can configure business process flows to support common sales methodologies to help your sales groups achieve better results.

For service groups, business process flows can help new staff get up to speed more quickly and avoid mistakes that could result in unsatisfied customers.

### System business process flows

Several example business process flows are included with Dynamics 365 apps such as Dynamics 365 Sales and Dynamics 365 Customer Service. These are available in your environment when those apps are installed. To understand how business process flows work, review these examples:

*   Lead to Opportunity Sales Process
*   Opportunity Sales Process
*   Phone to Case Process

Note

Business process flows are managed in Power Apps under **Flows** > **Business process flows**, not in Power Automate.

### Multiple tables in business process flows

You can use a business process flow for a single table or across multiple tables. For example, you might have a process that begins with an opportunity, then continues to a quote, an order, and then an invoice, before finally returning to close the opportunity.

You can design business process flows that tie together the rows for up to five different tables into a single process. This way, people using the app can focus on the flow of their process, rather than on which table they’re working in, and easily navigate between related table rows.

### Multiple business process flows are available per table

Not every user in an organization follows the same process, and different conditions might require different processes. You can have up to 10 active business process flows per table to provide appropriate processes for different situations and users.
