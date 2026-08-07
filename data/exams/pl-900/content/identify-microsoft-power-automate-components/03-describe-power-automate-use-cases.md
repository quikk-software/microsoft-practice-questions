---
title: "Describe Power Automate use cases"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/describe-power-automate-use-cases"
uid: "learn.wwl.identify-microsoft-power-automate-components.describe-power-automate-use-cases"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe Power Automate use cases

Power Automate's most impactful use cases involve connecting the Microsoft 365 tools that organizations use every day—Teams, Outlook, SharePoint, and Forms—with structured automation logic, approval workflows, and AI-powered document processing.

## Approval workflows

Approvals are one of the most common and high-value automation use cases in any organization. Processes that require human review and sign-off—expense reports, purchase requisitions, contract reviews, leave requests, content publication—typically involve back-and-forth communication, manual tracking, and delayed decisions. Power Automate's built-in approval actions formalize and accelerate this process.

[![Screenshot of the Power Automate Add an action screen listing the four approval action types available.](media/approval.png)](media/approval.png#lightbox)

The primary approval action is **Start and wait for an approval**, which sends an approval request to one or more approvers and waits for a response before the flow continues. Within this action, you choose one of four approval types:

*   **Approve/Reject - Everyone must approve**: All named approvers must review and approve before the process moves forward. If any approver rejects, the request is rejected. Used for compliance reviews, legal document sign-offs, or any scenario requiring unanimous agreement.
*   **Approve/Reject - First to respond**: The first approver to respond determines the outcome. Useful when speed is the priority and any one of multiple approvers is sufficient to authorize the action.
*   **Custom Responses - Wait for one response**: Allows the maker to define response options beyond Approve and Reject—such as "Approve," "Request More Information," and "Escalate to Director." Ideal for workflows that need more nuanced decision paths.
*   **Custom Responses - Wait for all responses**: Uses custom response options and requires every approver to respond before the flow continues. Ideal for scenarios that need documented input from all parties.

Approvers can respond from multiple surfaces:

*   **Outlook email**: The approval request arrives as an actionable email with Approve and Reject buttons embedded directly in the message body.
*   **Microsoft Teams**: The approval request appears as an Adaptive Card in the Teams Approvals app or in a Teams chat or channel.
*   **Power Automate mobile app**: Approvers can review pending requests and respond with a single tap from their phone.
*   **Power Automate web app**: The Approvals hub in Power Automate lists all pending, sent, and received approval requests in one place.

## Microsoft Teams integration

Teams is the collaboration hub for most modern organizations. Power Automate integrates with it deeply—Teams flows can be triggered by events in Teams and can post messages, send notifications, create channels, and create approval requests within Teams.

Common Teams automation use cases include:

*   **Posting notifications to channels**: When a project milestone is reached, a new record is created in Dataverse, or a specific email arrives, a flow automatically posts a formatted notification to the relevant Teams channel—keeping the team informed without anyone manually sharing updates.
*   **Creating approval requests in Teams**: When an employee submits a leave request or a purchase order, Power Automate creates an approval request that appears as an Adaptive Card in the manager's Teams Approvals app—allowing them to approve or reject without leaving Teams.
*   **Responding to Teams messages**: Flows can be triggered when a specific keyword appears in a Teams channel message, automatically routing the message to a queue, tagging it for follow-up, or responding with a standard reply.
*   **Creating Teams channels and meetings**: When a new project is created in Dataverse or a new client is onboarded in SharePoint, a flow automatically creates a dedicated Teams channel, adds the relevant members, and schedules a kickoff meeting.

## Outlook integration

Outlook is where much of an organization's communication and notification traffic flows. Power Automate can both respond to Outlook events and send emails as part of automated processes.

Key Outlook automation scenarios include:

*   **Email-triggered workflows**: When an email arrives from a specific sender, contains a specific subject keyword, or has an attachment, a flow can automatically save the attachment to SharePoint, forward the email to a team member, log the contact in a CRM, or trigger an approval process.
*   **Automated email notifications**: Flows send formatted email notifications when business events occur—a new record is created, a deadline approaches, an approval decision is made, or a report is ready.
*   **Calendar management**: Flows can create calendar events, send meeting invitations, and update calendar entries in response to triggers from other systems.
*   **Approval response emails**: Approval requests sent through Power Automate include actionable buttons in the email body, so approvers can click Approve or Reject directly from their Outlook inbox.

## SharePoint integration

SharePoint is one of the most commonly automated services in Power Automate, because SharePoint lists and document libraries are widely used as lightweight databases and document management systems.

Common SharePoint automation scenarios include:

*   **New item approval routing**: When a new item is added to a SharePoint list—such as a vendor onboarding request, an expense report submission, or a content publishing request—a flow automatically routes it for approval, updates the item's status field, and notifies relevant stakeholders.
*   **Document lifecycle management**: When a document is uploaded to a SharePoint library, a flow can classify it using AI Builder, extract metadata, move it to the correct folder, update document properties, and notify the document owner.
*   **List item change notifications**: When an item in a SharePoint list is modified—for example, a project status changes to "At Risk" or a deadline field passes—a flow sends a notification to the project manager or posts an alert in Teams.
*   **Scheduled list maintenance**: Scheduled flows run against SharePoint lists to archive old items, delete expired records, generate summary reports, or synchronize data with other systems.

## Microsoft Forms integration

Microsoft Forms is widely used to collect structured input from employees and customers—surveys, registrations, feedback forms, and data collection forms. Power Automate connects Forms responses to downstream systems and workflows automatically.

Common Forms automation use cases include:

*   **Response routing and processing**: When a form is submitted, a flow captures the response data and routes it to the appropriate system—creating a record in Dataverse, adding a row to an Excel workbook, sending the submitter a confirmation email, and notifying a team member to follow up.
*   **Conditional response handling**: A flow evaluates specific answers in the form response and takes different actions based on what was submitted—for example, routing a high-priority support request to a senior technician while routing standard requests to the general queue.
*   **Event registration**: When someone submits a training registration form, a flow adds them to a SharePoint list, sends a calendar invitation to their Outlook, posts a welcome message in Teams, and adds them to a distribution group.

## Document automation with AI Builder

One of Power Automate's most impactful capabilities is automating document-centric workflows using AI Builder's Intelligent Document Processing (IDP). Businesses receive large volumes of structured documents—invoices, purchase orders, contracts, insurance forms, tax documents—that contain information that must be extracted and entered into business systems. Doing this manually is slow, error-prone, and expensive.

AI Builder document processing models use machine learning to extract specific fields from documents—such as invoice numbers, totals, dates, vendor names, and line items—and make that data available for use in Power Automate flows.

The key steps in a document automation solution are:

1.  **Train a document processing model**: In AI Builder, upload at least five examples of the documents you want to automate. Tag the fields you want to extract—for example, Invoice Number, Vendor Name, Total Amount, and Due Date. AI Builder trains a model that can recognize these fields in new documents with that layout.
2.  **Use the model in a Power Automate flow**: Add the **Process documents** action to a cloud flow. When a document arrives—via email attachment, SharePoint upload, or Forms submission—the flow passes it to the AI Builder model, which extracts the tagged fields and returns them as structured data.
3.  **Act on the extracted data**: Use the extracted field values to create records in Dataverse, update a SharePoint list, post approval requests, or write data to external systems through connectors.

For example, at Contoso the accounts payable team receives over 200 vendor invoices per month by email. A Power Automate flow monitors the AP Outlook inbox, detects emails with PDF attachments, passes each PDF to an AI Builder document processing model, extracts the invoice number, vendor name, line items, and total amount, creates a pending invoice record in Dataverse, sends an approval request to the appropriate cost center manager, and—after approval—creates the corresponding payable entry in the financial system.

Note

AI Builder document processing models require AI Builder credits, which are separate from standard Power Automate licensing. Consult the Power Platform licensing guide for current capacity details.
