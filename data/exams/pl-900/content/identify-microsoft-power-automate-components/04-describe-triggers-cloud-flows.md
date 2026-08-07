---
title: "Describe triggers for cloud flows"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/describe-triggers-cloud-flows"
uid: "learn.wwl.identify-microsoft-power-automate-components.describe-triggers-cloud-flows"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe triggers for cloud flows

A trigger is the event that starts a cloud flow running. Every cloud flow begins with exactly one trigger, and all subsequent actions in the flow execute in response to that trigger event. Choosing the right trigger is the first and most important decision when designing any cloud flow.

## How triggers work

Triggers listen for specific events across connected services and platforms. When the defined event occurs, the trigger fires and passes any relevant data about the event—such as the email that arrived, the file that was created, or the form response that was submitted—to the flow as inputs. This data is then available for use in subsequent actions throughout the flow.

Power Automate retrieves trigger events in two ways:

*   **Polling triggers**: The Power Automate service regularly checks the connected system at a defined interval to see if the trigger condition has been met. Many SharePoint and SQL Server triggers use polling.
*   **Webhook triggers**: The connected service sends an instant notification to Power Automate the moment the trigger event occurs. Most modern Microsoft 365 connectors, Dataverse, and many third-party connectors use webhooks, resulting in near-instantaneous flow execution.

## Types of triggers

### Automated triggers

Automated triggers fire automatically when an event occurs in a connected service, without any user intervention required. These are the most commonly used trigger type for business process automation.

Examples of automated triggers include:

*   **When an email arrives (Outlook)**: Fires whenever a new email arrives in the specified Outlook mailbox. Can be filtered by sender, subject, or other properties.
*   **When a new item is created (SharePoint)**: Fires whenever a new item is added to a specified SharePoint list or library.
*   **When an item is created or modified (SharePoint)**: Fires whenever any item in a list is created or updated—useful for tracking changes to records.
*   **When a new response is submitted (Microsoft Forms)**: Fires whenever someone submits a response to the specified Microsoft Form.
*   **When a row is added (Dataverse)**: Fires whenever a new record is created in the specified Dataverse table.
*   **When a row is modified (Dataverse)**: Fires whenever an existing record in a Dataverse table is updated.

For example, at Contoso the HR team uses the **When a new response is submitted (Forms)** trigger to start their new employee onboarding flow. The moment a new hire submits the onboarding information form, the trigger fires and passes the response data to subsequent actions—creating an employee record in Dataverse, provisioning system access, and sending welcome information—without anyone on the HR team manually monitoring the form.

### Scheduled triggers

Scheduled triggers run a flow at a defined time or on a recurring schedule. They aren't event-driven—they run regardless of what has happened in connected systems.

The **Recurrence** trigger is the primary scheduled trigger. It allows makers to specify:

*   The interval and frequency—for example, every 1 day, every 7 days, every 1 hour.
*   The start time and time zone.
*   Specific days of the week or month on which the flow should run.

Common scheduled trigger use cases include generating daily, weekly, or monthly reports; running data cleanup and archival tasks on a fixed schedule; sending recurring reminders or digest notifications; and syncing data between systems at regular intervals.

### Instant triggers

Instant triggers allow a flow to be initiated manually. They're useful when the automation requires user judgment about when to execute rather than firing automatically.

Types of instant triggers include:

*   **Manually trigger a flow**: A button in the Power Automate app or web portal. The user selects the flow and selects **Run**.
*   **PowerApps trigger**: Allows a Power Apps canvas app to trigger a cloud flow. The app can pass values to the flow as inputs, enabling app-driven automation.
*   **For a selected file or item (SharePoint)**: Adds a flow to the SharePoint document library or list menu, allowing users to run it against a specific file or item.
*   **For a selected message (Outlook or Teams)**: Adds a flow to the message action menu in Outlook or Teams, allowing users to run it against a specific email or Teams message.

### HTTP triggers

For advanced scenarios, Power Automate supports HTTP-based triggers:

*   **When an HTTP request is received**: Creates a unique URL endpoint for the flow. Any system that can make an HTTP request can trigger the flow by calling that URL with a JSON payload. Commonly used to receive webhook events from external services that aren't natively supported by Power Automate connectors.

## Trigger filters and conditions

Many automated triggers support filtering at the trigger level—evaluating conditions before the flow runs to avoid processing events that don't meet the automation criteria. For example, the Outlook "When an email arrives" trigger supports filtering by the sender's email address, the presence of attachments, or the importance flag. Applying trigger filters reduces unnecessary flow runs and improves performance.

Tip

Use trigger conditions to filter events as early as possible in the flow, before any actions execute. This reduces unnecessary flow runs, conserves your daily action limit, and improves the overall responsiveness of the automation.
