---
title: "Page components"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-studio/components"
uid: "learn-bizapps.power-pages-studio.components"
module: "power-pages-studio"
moduleTitle: "Explore Power Pages design studio"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Page components

After you create a page, add components to build the layout and include static and dynamic content. This simple design approach adds the corresponding HTML, CSS, or code to the page without requiring you to know the structure or syntax of these languages.

To add a section, select any existing section on the page, select the plus sign (**+**) or **Add a section**, and then choose from one of the available section layouts.

Tip

You can change the section layout later.

![Screenshot of Power Pages content editing.](media/3-power-pages-editing.png)

To add a component, select either an empty section or an existing element where you'd like to place the component. Use the plus sign (**+**) or the overflow button (**...**) to display all available components, and then select a component to insert.

![Screenshot of Insert a component interface.](media/3-power-pages-insert-component.png)

There are two types of components:

*   **Standard** components create the page layout and static content.
    
*   **Connected to data** components display dynamic and interactive content based on Dataverse data.
    

All sections and components support in-context editing. You can edit any section or component directly from the canvas. When you select a section or a component, a context menu appears. You can adjust properties of the selected element, such as alignment, style, color, size, and more. For more information, see [Customize webpages](/en-us/power-pages/getting-started/customize-pages#see-also) for more details about available components and their properties.

## Source code

Often, you need elements that aren't available as design studio components. A page might need a more complex layout and formatting, or it might need more CSS or JavaScript. You can create these requirements in Visual Studio Code for the Web. Makers and pro developers can use this editor to view and modify the source code of the page and associated CSS and JavaScript.

To view the source code of the page, select **Edit code** in the command bar.

![Screenshot of the Visual Studio Code for the Web editor access available in the design studio.](media/3-power-pages-source-code.png)

When you select **Edit code**, you're redirected to Visual Studio Code for the Web to make your edits to the page HTML, CSS, or JavaScript. After you save the source code, the changes synchronize and appear on the canvas.

![Screenshot of a prompt to synchronize page content after editing is complete in Visual Studio Code for the Web](media/3-sync-after-code-edit.png)

Warning

You can potentially damage the layout of your page by entering incorrect syntax in the source code. Create a copy of the original code before making any significant changes.

## Copilot in the Pages workspace

Copilot is integrated throughout the Pages workspace to help you build and populate content faster.

### AI-generated text

Select any text component on the canvas, and then select the Copilot button in the toolbar. Describe the text you want, and Copilot generates copy for you. This feature is generally available.

### AI-generated form

When adding a component, select **Form**, and then choose to create the form with Copilot. Describe the form in natural language, and Copilot creates the Dataverse table, form, and basic form component automatically. This feature is generally available in all regions except DoD.

### AI-generated multistep form (preview)

You can also use Copilot to create a multistep form. In the Copilot sidecar, describe the multistep form you need, and Copilot builds a form with one or more steps based on your description. A preview of the form appears on the canvas for you to review before adding it to the page. If relevant tables already exist in Dataverse, Copilot suggests using them; otherwise, a new table is created automatically.

### AI form fill assistance (preview)

When you add a form component to a page, you can enable AI form fill assistance to help site users fill out forms more easily. This feature extracts relevant information from uploaded attachments and automatically populates form fields. It also lets users rewrite multi-line text inputs using AI draft assistance. Enable this option in the form component settings.

### Add a section with Copilot

Use the Copilot sidecar to describe a section and have Copilot add it to the page.

### AI-generated code (preview)

When you open a page in Visual Studio Code for the Web using **Edit code**, you can use Copilot to generate HTML, JavaScript, and CSS code using natural language. Describe the behavior you want in the Copilot chat panel, and Copilot generates a code snippet you can copy or insert directly. You can also select existing code and use the **Explain** option to get a plain-language explanation of what it does.

Note

Copilot for code generation is tuned for Power Pages-supported languages (HTML, JavaScript, CSS) and frameworks like Bootstrap and jQuery. Verify that generated table and column names are correct before using the code in your site.

### Search component with generative AI (preview)

You can add a **Search** component to any page to let site users search your site using natural language queries. The component includes a search bar and an AI-generated summary of the results. To use the AI-powered version, you must first enable [Generative AI Search](/en-us/power-pages/configure/search/generative-ai) for the site. Add the component from the component panel in the Pages workspace.

### AI features in a list (preview)

Data list components support two AI-powered enhancements for site users:

*   **AI summary** — Automatically generates concise summaries and chart visualizations of the data in the list. Enable this option when adding a new list, or turn it on for an existing list by selecting **Edit List** and toggling **AI Summary for List**.
    
*   **Natural language search** — Allows users to filter and search list data using conversational queries. Enable this in the list settings under **More options** > **Enable search in this list** > **Search with natural language**.
    

For more information, see [Add AI features in a list](/en-us/power-pages/getting-started/add-ai-summary-list) in the Power Pages documentation.
