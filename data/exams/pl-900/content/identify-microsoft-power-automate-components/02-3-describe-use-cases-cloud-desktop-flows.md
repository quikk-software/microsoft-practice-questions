---
title: "Describe use cases for cloud and desktop flows"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/3-describe-use-cases-cloud-desktop-flows"
uid: "learn.wwl.identify-microsoft-power-automate-components.describe-use-cases-cloud-desktop-flows"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe use cases for cloud and desktop flows

Power Automate provides two primary automation capabilities—cloud flows and desktop flows—each designed for different types of automation scenarios. Understanding the distinction between them, and when to use each, is the foundation for building effective automation solutions.

## Cloud flows

Cloud flows automate workflows and perform one or more tasks after a triggering event occurs. They connect cloud-based services, applications, and platforms, enabling seamless communication between different tools without manual intervention. Whether you're automating email responses, syncing files across platforms, routing approvals, or triggering actions based on data changes, cloud flows provide a flexible and powerful solution.

Cloud flows come in three types, each suited to different automation needs:

*   **Automated flows**: Triggered automatically when a specific event occurs in a connected service—such as receiving an email, a new item being added to a SharePoint list, or a record being updated in Dataverse. These flows require no user action to run.
*   **Instant flows**: Triggered manually by the user, typically through a button click in the Power Automate app, a Power Apps canvas app, or a Teams message. Instant flows are ideal for tasks that require user judgment about when to run them.
*   **Scheduled flows**: Run at a specific time or on a recurring interval—hourly, daily, weekly, or on a custom schedule. These flows work well for tasks that must happen regularly, such as generating a weekly summary report or cleaning up files on the first day of every month.

Cloud flows offer several core advantages:

*   **Cross-platform integration**: Power Automate connects to over 1,400 services through prebuilt connectors, including Microsoft 365, Dynamics 365, Salesforce, ServiceNow, SAP, and many more.
*   **Event-driven automation**: Flows respond immediately to events in connected systems, eliminating the delay of manual monitoring and action.
*   **Scalability**: Cloud flows scale from personal productivity automation to organization-wide workflows that process thousands of records and notifications per day.

## Desktop flows

Desktop flows bring automation to your local computer—automating tasks that involve installed applications, legacy systems, and desktop interfaces that don't have APIs or cloud connectors. Desktop flows use Robotic Process Automation (RPA) technology to simulate human actions on the screen: clicking buttons, filling in forms, reading data from spreadsheets, navigating menus, and interacting with applications exactly as a person would.

Desktop flows work well for scenarios where:

*   The system to be automated is a legacy or on-premises application with no modern API or cloud connector.
*   The automation requires interacting with a user interface through mouse clicks, keyboard input, or screen reading.
*   Data must be extracted from websites, government portals, or older database interfaces.
*   Files must be organized, renamed, or moved across local folders based on defined rules.

Common desktop flow use cases include:

*   **Legacy system data entry**: Automatically entering data into an older ERP system that requires keyboard and mouse interaction, eliminating hours of manual data entry each day.
*   **Web data extraction**: Navigating to government or supplier websites, extracting specific data, and saving it to a spreadsheet—eliminating manual copy-and-paste.
*   **File organization**: Automatically sorting downloaded files into named folders based on file type, date, or naming convention.
*   **Report generation**: Opening an application, running a report, exporting it, and saving it to a shared network location—without human involvement.

## Combining cloud flows and desktop flows

Cloud flows and desktop flows are most powerful when combined into end-to-end automation solutions. A cloud flow can serve as the orchestrator that monitors events in the cloud, passes data to a desktop flow that performs work in a local or legacy application, and then receives results back to continue the cloud-side workflow.

[![Diagram that shows how a cloud flow orchestrates a desktop flow to bridge cloud and on-premises automation.](media/cloud-desktop-process.png)](media/cloud-desktop-process.png#lightbox)

For example, at Contoso the accounts payable team receives supplier invoices by email. A cloud flow monitors the Outlook inbox, detects incoming invoices, and extracts the attachment. It then triggers a desktop flow that opens the legacy accounting application, enters the invoice data into the correct form, and confirms the entry. The cloud flow then sends a confirmation email to the supplier and updates a SharePoint tracking list—all without anyone touching a keyboard.

Tip

Desktop flows run on a machine that must be available when the flow executes. For unattended scenarios where the flow should run in the background without a logged-in user, use an unattended desktop flow. Attended flows require the user to be logged in but can run interactively alongside the user's work.
