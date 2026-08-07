---
title: "Describe the value of connectors to integrate services and data for apps and flows"
url: "https://learn.microsoft.com/en-us/training/modules/describe-business-value-microsoft-power-platform/8-describe-value-connectors-integrate-services-data"
uid: "learn.wwl.describe-business-value-microsoft-power-platform.describe-value-connectors-integrate-services-data"
module: "describe-business-value-microsoft-power-platform"
moduleTitle: "Describe the business value of Microsoft Power Platform"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe the value of connectors to integrate services and data for apps and flows

Very few business processes live entirely within a single system. An order might originate in a customer portal, get fulfilled by a warehouse management system, trigger a notification in Teams, update a record in Dynamics 365, and generate an invoice in an ERP system—all in the course of a single transaction. Making those systems communicate with each other is where connectors come in.

Connectors are the integration layer of Power Platform. They're pre-built interfaces that allow Power Apps, Power Automate flows, and other platform components to read data from, write data to, and trigger actions in external services—without requiring custom API development.

[![Screenshot of Power Automate standard connectors list for Excel, SharePoint, and more.](media/power-automate-connectors-list.png)](media/power-automate-connectors-list.png#lightbox)

## How connectors work

Each connector represents a connection to a specific service—Microsoft SharePoint, Salesforce, SAP ERP, ServiceNow, Outlook, Adobe Sign, Dropbox, and many more. Within each connector, there are:

*   **Actions:** things your app or flow can do, such as "create a record" or "send an email."
*   **Triggers:** events in the external service that can start a flow, such as "when a new item is added to a SharePoint list."

When you add a connector to a Power Apps canvas app or a Power Automate flow, you authenticate with the target service using your credentials or a service account. From that point forward, the connector handles the communication between Power Platform and the external service, including authentication, data formatting, and error handling.

There are more than 1,800 prebuilt connectors available for Power Platform today, covering Microsoft services, major enterprise platforms, and specialized third-party tools. Connectors are organized into two categories:

*   **Standard connectors:** included with most Power Platform licenses and cover the most widely used services.
*   **Premium connectors:** available with premium licenses, covering specialized enterprise services such as SAP ERP, Salesforce, ServiceNow, and more.

## Custom connectors

If a service you need isn't already covered by a prebuilt connector, you can build a custom connector. Custom connectors are defined using OpenAPI specifications and allow Power Platform to communicate with any service that exposes an API—whether that's an internal system built by your IT team or a niche third-party tool specific to your industry.
