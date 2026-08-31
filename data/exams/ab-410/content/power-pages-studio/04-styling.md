---
title: "Site styling and templates"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-studio/styling"
uid: "learn-bizapps.power-pages-studio.styling"
module: "power-pages-studio"
moduleTitle: "Explore Power Pages design studio"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Site styling and templates

A theme describes the colors, fonts, section margins, and other design elements of a Power Pages site. Each site is provisioned with a theme defined by the selected template. By using **Styling** workspace elements, you can customize the theme to align the site appearance with design requirements such as specific corporate branding.

## Styling

Choose a theme from several available presets and then apply customizations. You see any customization immediately on the page, making it easy to work with the basic styling.

![Screenshot of Using Styling workspace to select and modify a theme.](media/4-power-pages-theme.png)

You can also use Copilot to generate a new theme. Describe your brand or the look you want, and Copilot creates a custom AI-generated theme that you can review and apply. This feature is available in the Styling workspace.

## Custom CSS

For more complex styling requirements, Power Pages design studio allows makers to upload custom CSS files.

![Screenshot of custom CSS upload interface.](media/4-power-pages-upload-css.png)

Once you upload the custom CSS file, it applies to all themes, and the page canvas reflects the applicable styles. You can upload multiple CSS files and set their order as required. For more information about custom CSS, see [Manage CSS files in Power Pages](/en-us/power-pages/configure/manage-css) in product documentation.

You can also apply styling to individual pages by using Visual Studio Code for the Web editor. When you open a page in the editor, three files load: HTML, CSS, and JavaScript. Any changes in the CSS file apply to the selected page only.

## Templates

For complex sites, standard layouts available in Power Pages design studio might not be sufficient. For these scenarios, Power Pages supports creating pages by using custom layouts.

For advanced scenarios, custom layouts can be created as page templates in the Portal Management app. When you define a new page template, it becomes available in the design studio as a custom layout.

![Screenshot of Custom page template available as layout in Power Pages design studio.](media/4-power-pages-custom-layout.png)

For detailed information on how to create custom page templates, see [Create and manage page templates](/en-us/power-apps/maker/portals/configure/page-templates) and [Store source content by using web templates](/en-us/power-apps/maker/portals/liquid/store-content-web-templates) in the Power Apps documentation.
