---
title: "Extend model-driven apps with custom pages"
url: "https://learn.microsoft.com/en-us/training/modules/configure-model-driven-apps-customer-engagement-apps/custom-pages"
uid: "learn-dynamics.configure-model-driven-apps-customer-engagement.custom-pages"
module: "configure-model-driven-apps-customer-engagement-apps"
moduleTitle: "Configure forms, charts, and dashboards in model-driven apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Extend model-driven apps with custom pages

## Custom pages

A custom page is a new page type within a model-driven app that brings the power of canvas apps into model-driven apps. Custom pages increase the convergence of model-driven and canvas apps and can be used to add full pages, dialogs, or side panes with the flexibility of Power Apps Studio. Custom pages support a low-code authoring experience with expressions, connectors, and custom Power Apps component framework controls.

A custom page is more flexible than a model-driven app form, view, or dashboard page. You can include one or more tables, then define the data and component interactions. Unlike embedded canvas apps, custom pages are more tightly integrated with the model-driven app, offering better performance and deeper context awareness.

Custom pages can be displayed in three ways:

*   **Full page** — displayed inline within the model-driven app as a main page
*   **Center dialog** — opened as a centered dialog over the current page
*   **Side dialog / app side pane** — opened on the right side of the app

Note

Don't exceed 25 custom pages in a model-driven app. Adding more can increase the wait time users experience on the first app launch after the last publish.

Custom pages must be created from a solution, either from the modern app designer or the **Solutions** area in Power Apps using **New > Page**. For more information, see [Add a custom page to your model-driven app](/en-us/power-apps/maker/model-driven-apps/add-page-to-model-app).

### Custom pages vs. embedded canvas apps

Both custom pages and embedded canvas apps use canvas capabilities, but custom pages provide a more integrated experience. Embedded canvas apps can only be placed on a model-driven form, acting like a low-code component. Custom pages address integration limits of embedded canvas apps and are the recommended approach in most cases.

## Generative pages

Generative pages are an AI-driven experience that lets makers build fully functional pages in model-driven apps by describing what they need in natural language. The app agent interprets the description and generates React code that covers both the front-end user experience and the corresponding business logic. Through a conversational experience, makers can refine the page design in real time.

### Create a generative page

1.  Sign in to [Power Apps](https://make.powerapps.com/) and open a model-driven app for editing.
2.  In the app designer, select **Add a page** > **Describe a page**.
3.  In the text box, type a description of the page you want to create — include functional requirements and optionally UX specifications.
4.  Optionally, add Dataverse tables (up to 6) by selecting **Add data** > **Add table**, or attach an image to guide the UI layout.
5.  Select **Generate page**. The agent streams its thought process, generates code, and renders the page.
6.  Review the output. Iterate by chatting with the agent or manually editing the code on the **Code** tab.
7.  When satisfied, select **Save and Publish**.

Important

While the agent makes a best-effort attempt to generate production-ready code, you are responsible for validating the output meets your organization's standards and compliance requirements.

### Availability and limitations

*   Available in Power Apps maker studio for environments in: United States, Great Britain, Australia, and Singapore. Worldwide availability is supported via AI code generation tools.
*   Pages can connect to Dataverse tables only (up to 6 per page).
*   Generative pages are solution-aware and can be exported with the app for deployment across environments.

For more information, see [Generate a page using natural language](/en-us/power-apps/maker/model-driven-apps/generative-pages).
