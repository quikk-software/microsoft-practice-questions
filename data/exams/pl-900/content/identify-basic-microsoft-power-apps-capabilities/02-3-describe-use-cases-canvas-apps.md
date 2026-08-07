---
title: "Describe use cases and capabilities of canvas apps"
url: "https://learn.microsoft.com/en-us/training/modules/identify-basic-microsoft-power-apps-capabilities/3-describe-use-cases-canvas-apps"
uid: "learn.wwl.identify-basic-microsoft-power-apps-capabilities.describe-use-cases-canvas-apps"
module: "identify-basic-microsoft-power-apps-capabilities"
moduleTitle: "Identify basic Microsoft Power Apps capabilities"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe use cases and capabilities of canvas apps

Canvas apps are Power Apps' most flexible app type. When you build a canvas app, you start with a blank canvas—just like working in a presentation tool—and place controls, images, forms, galleries, and other elements exactly where you want them. You connect the app to one or more data sources and add logic using Power Fx, a formula language that feels familiar to anyone who has used Microsoft Excel. The result is an app that looks and behaves exactly the way you designed it, running in any browser or on any mobile device.

## What problems do canvas apps solve?

Organizations have countless scenarios where people need to perform tasks or complete duties. For example, a nurse at a hospital may need to triage a patient coming in for surgery. A field technician working at a customer location may discover they don't have a specific part and need to order it. It could also be as simple as an employee having trouble connecting to audio or video equipment in a conference room.

Canvas apps are a great option for organizations to build apps designed to perform specific tasks. They give the app maker complete control over the entire app—including the user interface and the data it connects to. Canvas apps can interact with data from a wide variety of Microsoft and third-party data sources in a single application. App designers can drag and drop controls into their application and add functionality by writing Power Fx formulas. These Excel-like expressions specify how to work with the data. Once created, canvas apps can be shared with users so they can run them in a browser or on a mobile device. Canvas apps can also be embedded into SharePoint sites, Power BI reports, model-driven apps, or Microsoft Teams.

Canvas apps can be created from existing data. For example, you can create them from Excel spreadsheets, SharePoint sites, and more. With Copilot, you can describe the app you want to build in natural language, and Copilot builds the app with you. If you're unhappy with something, describe what you want changed, and Copilot adjusts your app.

## Key capabilities of canvas apps

*   **Complete design freedom**: Unlike other app types where the layout is determined by the data model, canvas apps give makers precise control over the user interface. Every element on every screen can be positioned, sized, colored, and styled as needed.
    
*   **Power Fx formulas**: Logic in canvas apps is written using Power Fx, an Excel-like formula language designed to be readable and writable by non-developers. Power Fx covers everything from simple conditional visibility rules to complex data filtering, aggregation, and multi-step navigation.
    
*   **Mobile-first and offline support**: Canvas apps run on iOS and Android through the Power Apps mobile app, and support offline mode for scenarios where internet connectivity is unreliable—such as field inspections, warehouse operations, or remote service calls.
    
*   **Embedding and integration**: Canvas apps can be embedded into SharePoint sites, Power BI dashboards, Teams channels, and model-driven apps, making it easy to surface app functionality within the tools users already work in.
    
*   **Rapid creation from existing data**: Makers can generate a canvas app from an existing Excel spreadsheet, SharePoint list, or Dataverse table—getting a working app with browse, detail, and edit screens in minutes.
    
*   **Reusable components**: Canvas apps support reusable components that can be shared across multiple apps, ensuring consistent design and behavior across an organization's app portfolio.
    

## Common use cases for canvas apps

Canvas apps work well in scenarios where a tailored user experience is important and data may come from multiple sources. Common examples include:

*   **Field inspection and reporting**: Technicians, inspectors, and field workers use canvas apps on mobile devices to capture structured data, photos, signatures, and GPS locations.
    
*   **IT and facilities service requests**: Employees use canvas apps to report equipment issues, request software access, or submit facilities maintenance tickets.
    
*   **Inventory management**: Warehouse and logistics teams use canvas apps to look up stock levels, record transfers, and process orders from their mobile devices.
    
*   **Event and project tracking**: Project managers use canvas apps to capture milestone updates, track action items, and review status across multiple workstreams.
    
*   **Customer-facing interactions**: Customer service agents use canvas apps embedded in SharePoint or Teams to access customer records and log interactions without switching between multiple systems.
    

## Ways to create a canvas app

### Start from design

A blank canvas app gives you an empty design surface where you decide which screens to add, which controls to use, and how the app connects to data. When creating from blank, choose the app size that fits your scenario: Responsive, Tablet size, or Phone size. This option works well for custom scenarios with unique layouts.

[![Power Apps showing six app template cards including Create from blank, Split-screen, Sidebar, Describe your page, and Blank page with navigation.](media/start-from-design.png)](media/start-from-design.png#lightbox)

### Build from data

Rather than starting from scratch, you can point Power Apps at an existing data source and let it generate a three-screen app (browse, detail, edit) automatically.

Supported starting points include:

*   **Microsoft Dataverse**: Start with an existing Dataverse table, create new Dataverse tables and generate an app, or build a blank app and connect it to Dataverse yourself.
*   **SharePoint and Microsoft Lists**: Create a canvas app directly from a list in SharePoint or Lists. Power Apps Studio opens and shows an app with three screens: a browse screen, a details screen, and an edit screen.
*   **Excel**: Create an app from an Excel workbook stored in OneDrive or SharePoint.
*   **SQL Server or Azure SQL**: Connect directly to a SQL database to auto-generate an app.

[![Power Apps showing six data source options: Create new data, SharePoint, Dataverse, Excel Online (Business), SQL, and Upload file.](media/start-from-data.png)](media/start-from-data.png#lightbox)

### Build through conversation with Copilot

You can use Copilot to build apps through natural language conversations. Describe the app you want in plain language, and Copilot generates screens, controls, and data connections. You can continue refining through the conversation interface from within Power Apps Studio.

## Copilot capabilities in canvas apps

Copilot is integrated into the canvas app authoring experience at two levels: building the app and using the app.

### Building a canvas app with Copilot

When you create a new canvas app, describe what you want in natural language. Copilot interprets the description, generates one or more Dataverse tables to store the data, populates the tables with representative sample data, and builds a functional canvas app with browse, detail, and edit screens. This conversation-driven creation process is covered in the "Create a canvas app through conversations" unit later in this module.

[![Power Apps Create new tables workspace with a Get started with Copilot dialog showing a natural language prompt and a Generate button.](media/start-with-copilot.png)](media/start-with-copilot.png#lightbox)

### Copilot for app users in canvas apps

Note

Microsoft 365 Copilot for app users in canvas apps is currently in preview. Preview features aren't meant for production use and may not be available in all regions.

Once a canvas app is deployed, Microsoft 365 Copilot can be enabled to give app users a conversational AI experience within the app. App users can open the Copilot pane and ask natural language questions about the Dataverse or SharePoint list data the app works with—for example, "Show me all open maintenance requests submitted this week" or "How many requests are assigned to the North team?"—and receive immediate answers without navigating through views or running manual searches.
