---
title: "Build pages with generative AI"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-model-driven-apps-in-powerapps/generative-pages"
uid: "learn-bizapps.powerapps-design-model-driven-apps.generative-pages"
module: "get-started-with-model-driven-apps-in-powerapps"
moduleTitle: "Get started with model-driven apps in Power Apps"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Build pages with generative AI

Generative pages let you build a fully functional page in your model-driven app by describing what you want in plain language. Instead of configuring layouts and controls by hand, you type a description of the data and design you need, and an AI agent generates the underlying React code for you.

## What is a generative page?

A generative page is an AI-generated, React-based page that lives inside a model-driven app. You interact with an app agent in the app designer using a conversational experience: describe the page you want, optionally attach an image of the layout, and the agent generates working code in real time. You can refine the page by continuing the conversation — asking the agent to adjust the layout, add columns, or fix errors — and publish when you're satisfied.

Generative pages are solution-aware, which means they can be packaged into a solution and moved between environments like any other app component.

Note

The maker experience for generative pages is currently available in environments located in the United States, Great Britain, Australia, and Singapore. Makers in other regions can create and edit generative pages using AI code generation tools.

## Create a generative page

1.  Sign in to [Power Apps](https://make.powerapps.com/) and open a model-driven app for editing.
    
2.  In the app designer, select **Add a page** > **Describe a page**. A full-page conversational experience opens.
    
3.  In the text box, describe the page you want. Be specific about the data, layout, and behavior. For example:
    
    _Build a page showing Account records as a gallery of cards. Include the account name, email, and phone number. Make the gallery scrollable._
    
4.  Optionally, select **Add data** > **Add table** to link up to six Dataverse tables, or **Add data** > **Attach image** to upload a sketch or wireframe to guide the layout.
    
5.  Select **Generate page**. The agent processes your prompt, writes the code, and renders a preview.
    
6.  Review the result in the **Preview** tab. To refine the page, continue chatting with the agent or select **Edit** on the **Code** tab to modify the code directly.
    
7.  When satisfied, select **Save and Publish** to publish the app and make the page available to users.
    

Important

The agent makes a best-effort attempt to generate production-ready code, but you're responsible for validating the output. Review the generated code to confirm it meets your organization's security and compliance requirements.

## Iterate on your page

After the initial generation, you have several ways to refine the page:

*   **Chat**: Continue the conversation to adjust layout, add functionality, or fix issues.
*   **Edit code**: Select **Edit** on the **Code** tab to modify the generated code manually.
*   **Compare iterations**: After two or more iterations, select **Compare** on the **Code** tab to see a diff between versions.
*   **Accessibility assistant**: After each generation, the accessibility assistant scans the code for issues and offers an **Auto fix** option to resolve them automatically.

Next, you'll learn how to control security and share your model-driven app with other users.
