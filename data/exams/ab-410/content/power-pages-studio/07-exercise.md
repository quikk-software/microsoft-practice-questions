---
title: "Exercise - Edit pages"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-studio/exercise"
uid: "learn-bizapps.power-pages-studio.exercise"
module: "power-pages-studio"
moduleTitle: "Explore Power Pages design studio"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Exercise - Edit pages

The purpose of this hands-on-lab is to create a web page and edit source code by using Power Pages design studio.

At the end of these exercises, you can:

*   Open Power Pages design studio to edit your portal.
*   Create new page using a standard template.
*   View the source code of the page.
*   Add custom HTML code directly.

For this exercise, you need the following items:

*   A provisioned Power Pages site in your environment. If you don't have a Power Pages site available, follow the [Create and manage Power Pages sites](/en-us/power-pages/getting-started/create-manage) instructions to create one.

## Scenario

To enhance the website experience for visitors, sometimes you need to add custom HTML content to a page. In this exercise, you add HTML code that creates a dismissible alert. The code also includes a small fragment in [Liquid language](/en-us/power-apps/maker/portals/liquid/liquid-overview) creating a dynamic greeting for the visitor.

### High-level steps

1.  Open your portal in Power Pages design studio.
2.  Create a new landing webpage.
3.  Edit page, add a spacer and content placeholder then add HTML code.
4.  Save the page and browse the site to view the results.

## Detailed steps

### Launch Power Pages design studio

1.  Sign in to [Power Pages](https://make.powerpages.microsoft.com/?azure-portal=true).
    
2.  Select a target environment by using the environment selector in the upper-right corner.
    
3.  Select your site, and then select **Edit** to launch the design studio.
    
4.  Make sure **Pages** workspace is selected.
    
    ![Screenshot of Power Pages design studio with a site in edit mode and Pages workspace selected.](media/exercise-select-workspace.png)
    

### Create a web page

1.  Select **\+ Page**.
2.  Enter a page name.
3.  Select **Landing Page** standard layout, and then select **Add**. ![Screenshot of page created with the landing page layout.](media/exercise-create-page.png)

### Edit page

1.  Select the first button on the page. Press the plus sign (**+**), and then select **Spacer** element. This command adds a small space before your custom content.
    
2.  Select the spacer, press the plus sign (**+**), and then select **Text** element. This command adds a placeholder for your custom content.
    
3.  Your page should look like this:
    
    ![Screenshot of the placeholder text for custom content.](media/exercise-placeholder.png)
    
4.  Press **Edit code** to open the page in Visual Studio Code for the Web editor.
    
5.  When prompted, select **Open Visual Studio Code**: ![Screenshot of the dialog to open Visual Studio Code.](media/exercise-launch-studio.png)
    
6.  This selection opens a new window or a tab with Visual Studio Code for the Web. Locate the text element you created earlier with the words `Enter text`: ![Screenshot of page content opened in Visual Studio Code for the Web editor with paragraph of text highlighted.](media/exercise-editor.png)
    
7.  Copy the following code and paste it into the page source, replacing the `<p>Enter text</p>` content:
    
    ```
    <div role="alert" class="alert alert-info alert-dismissible">
      <button type="button" data-bs-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
      <strong>Happy <span>{{ now | date: 'MMMM' }}</span>!</strong>
      Get your unlimited free education at 
      <a href="https://learn.microsoft.com/">Microsoft Learn</a>
    </div>
    ```
    
8.  Your content should now look like this: ![Screenshot of page content opened in Visual Studio Code for the Web editor with new content highlighted.](media/exercise-editor-text-placed.png)
    
9.  Press **Ctrl-S** (**⌘-S** on macOS) to save the file.
    
10.  Switch to design studio window. Press **Sync** button to synchronize the editors and show the updated content on the canvas: ![Screenshot of a dialog prompt to synchronize the page content between Visual Studio Code for the Web editor and design studio canvas.](media/exercise-editor-sync.png)
     
11.  The changes appear on the design studio canvas. Press **Preview** button in the top right corner, and then select **Desktop**.
     
12.  Your custom page with a dismissible alert opens. ![Screenshot of a Power Pages page rendering miscellaneous bootstrap content.](media/exercise-page.png)
     
13.  Check that the greeting includes current month.
     
14.  Press cross (x) icon to dismiss the alert.
