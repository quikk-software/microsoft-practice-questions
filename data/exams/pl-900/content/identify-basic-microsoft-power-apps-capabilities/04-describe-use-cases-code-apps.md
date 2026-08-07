---
title: "Describe use cases of code apps"
url: "https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/describe-use-cases-code-apps"
uid: "learn.wwl.identify-basic-microsoft-power-apps-capabilities.describe-use-cases-code-apps"
module: "identify-basic-microsoft-power-apps-capabilities"
moduleTitle: "Identify basic Microsoft Power Apps capabilities"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe use cases of code apps

Canvas apps and model-driven apps meet the needs of most Power Apps scenarios, but some requirements go beyond what the low-code maker tools support. Power Apps code apps are designed for these situations—they bring the full capabilities of Power Platform into custom web applications built by professional developers using code-first IDEs such as Visual Studio Code.

## What are code apps?

A code app is a custom web application—built in HTML, TypeScript, JavaScript, or a modern web framework such as React or Vue—that uses the Power Apps client library to connect to Power Platform connectors and be hosted within a Power Platform environment. Code apps aren't built in the Power Apps maker portal. Developers build them locally on a workstation using standard developer tooling, version-control them in Git repositories, and publish them to Power Platform using the Power Platform command-line interface (CLI).

The key value of code apps is that they connect the flexibility of custom code with the governed, managed platform that Power Platform provides. A developer can build a fully custom web application with their preferred framework and tooling, while still benefiting from:

*   **Power Platform connectors**: Access to all 1,500+ Power Platform connectors, including custom connectors—without the developer needing to build their own authentication, API management, or connection handling.
    
*   **Managed platform governance**: Code apps run inside a Power Platform environment and inherit its governance controls, including Managed Environment policies, app sharing limits, conditional access, and Data Loss Prevention (DLP) policies.
    
*   **Simplified ALM**: Code apps can be packaged in Power Platform solutions and deployed through Power Platform Pipelines, using the same Application Lifecycle Management (ALM) practices as canvas and model-driven apps.
    
*   **Familiar development experience**: Developers work in Visual Studio Code with the tools and frameworks they already know, without needing to learn a new low-code designer.
    

## Key capabilities of code apps

*   **Framework flexibility**: Code apps support any web framework—React, Vue, Angular, or plain TypeScript/JavaScript. The Power Apps client library integrates with whatever approach the developer uses.
    
*   **Full UI control**: Unlike canvas apps, which operate within the Power Apps Studio designer, code apps give developers complete control over every aspect of the user interface, including custom layouts, animations, accessibility features, and third-party UI component libraries.
    
*   **Local development workflow**: Developers build and test code apps locally using standard browser-based debugging, and sync with Power Platform when ready to publish or share.
    
*   **Power Platform CLI integration**: The Power Platform CLI provides commands for creating, building, publishing, and managing code apps from the command line, integrating with CI/CD pipelines in Azure DevOps or GitHub Actions.
    
*   **Power Apps Component Framework (PCF)**: Professional developers can build custom PCF controls—reusable UI components built in TypeScript—that can be used in both canvas apps and model-driven apps across the organization.
    
*   **AI code generation tools (preview)**: Developers can use AI code generation tools such as GitHub Copilot to create and edit canvas app source code through natural language commands, generating the corresponding Power Apps YAML and Power Fx.
    

## Common use cases for code apps

*   **Complex custom UI requirements**: Apps that require advanced animations, custom accessibility implementations, non-standard layouts, or third-party UI component libraries that canvas app controls can't replicate.
    
*   **Legacy system modernization**: Organizations with existing web applications built in React, Angular, or Vue can migrate those applications to run on Power Platform as code apps, gaining platform governance without rewriting from scratch.
    
*   **Custom reusable controls**: Development teams building PCF controls for distribution across the organization or on Microsoft AppSource.
    
*   **Developer-led projects with strict code review requirements**: Enterprise development teams with established code review, source control branching, and quality gate requirements that are more easily enforced in a code-first workflow than in a visual maker tool.
    
*   **High-complexity data integration**: Applications requiring complex client-side data processing, custom authentication flows, or integration with systems that require non-standard SDK usage beyond what connector actions support.
    

## The Power Apps extensibility spectrum

Code apps are part of Power Apps' broader extensibility spectrum, which allows organizations to choose the right level of code involvement for each scenario.

Approach

Who builds it

When to use it

**Canvas apps with Copilot**

Citizen developers, business analysts

Task-specific apps, mobile experiences, multi-source data integration

**Model-driven apps with Copilot**

Business analysts, Power Platform makers

Data management, complex business processes, enterprise dashboards

**Power Apps Component Framework (PCF)**

Professional developers

Custom reusable controls for canvas and model-driven apps

**Code apps**

Professional developers

Fully custom web apps with Power Platform governance

**Power Platform CLI + AI tools**

Professional developers

Automated canvas app creation and editing from code
