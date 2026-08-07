---
title: "Describe actions for cloud flows"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/describe-actions-cloud-flows"
uid: "learn.wwl.identify-microsoft-power-automate-components.describe-actions-cloud-flows"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe actions for cloud flows

Actions are the tasks a cloud flow performs after the trigger fires. Every cloud flow has at least one action, and complex flows may contain dozens of actions organized into conditions, loops, and parallel branches.

## How actions work

Actions execute sequentially in a cloud flow by default. Each action runs after the previous one completes, and each action's output can be used as an input to subsequent actions. For example, a flow might start with a trigger that receives a form submission, then use an action to get the submitter's employee profile, then use a second action to create an approval request, then use a third action to send a confirmation email using the approval outcome.

## Categories of actions

### Connector-specific actions

Connector-specific actions interact with a particular service or application through its connector. These are the most commonly used actions in cloud flows. Examples include:

*   **Send an email (Outlook)**: Sends an email from the connected Outlook account to specified recipients with a subject, body, and optional attachments.
*   **Create item (SharePoint)**: Creates a new item in a SharePoint list with values mapped from previous steps in the flow.
*   **Post a message in a chat or channel (Teams)**: Posts a formatted message or Adaptive Card to a Teams channel or direct message chat.
*   **Get rows (Excel Online)**: Retrieves rows from an Excel table stored in OneDrive or SharePoint for processing within the flow.
*   **Create a record (Dataverse)**: Creates a new row in a Dataverse table with field values populated from the flow.

At Contoso, a purchase request flow chains connector-specific actions in sequence: **Get user profile (Microsoft 365)** retrieves the submitter's manager, **Create item (SharePoint)** logs the request to the procurement tracking list, and **Post a message in a chat or channel (Teams)** notifies the procurement team—each action using output from the previous step to complete its task.

### Approval actions

Approval actions initiate and manage approval workflow processes. The **Start and wait for an approval** action sends an approval request to one or more approvers and pauses the flow until responses are received. The flow can then branch based on the approval outcome—taking one path if approved and another if rejected.

### Control actions

Control actions manage the flow's logic and execution path rather than interacting with external services. They're what make cloud flows intelligent and adaptive:

*   **Condition**: Evaluates a true/false condition and splits the flow into Yes and No branches.
*   **Switch**: Evaluates a single value against multiple possible cases and executes the matching case's actions. More efficient than chained Condition actions when there are many possible discrete outcomes.
*   **Apply to each**: Loops through every item in a collection and performs the same set of actions on each item.
*   **Do until**: Repeats a set of actions until a specified condition becomes true—for example, retrying an API call until it succeeds.
*   **Parallel branch**: Runs multiple action sequences simultaneously, reducing total flow execution time when actions are independent of each other.
*   **Scope**: Groups actions together for organizational clarity and to enable error handling at the group level.
*   **Terminate**: Ends the flow immediately with a specified status (Succeeded, Failed, or Cancelled).

### Data operation actions

Data operation actions allow flows to manipulate data structures within the flow itself, without calling an external service:

*   **Compose**: Evaluates an expression and stores the result as a named output for use in later actions.
*   **Select**: Transforms an array of objects into a new array with a different shape.
*   **Filter array**: Returns only the items in an array that match a specified condition.
*   **Create HTML table**: Converts an array of data into an HTML table that can be included in an email body or Teams message.
*   **Join**: Concatenates all values in an array into a single string separated by a specified delimiter.
*   **Parse JSON**: Parses a JSON string and makes its individual properties available as dynamic content tokens for use in subsequent actions.

### AI Builder actions

AI Builder actions bring machine learning capabilities directly into cloud flows:

*   **Process documents**: Passes a document to a trained AI Builder document processing model and extracts specified fields.
*   **Run a prompt**: Generates text using a custom or prebuilt AI Builder prompt—for example, summarizing an email thread, drafting a response, or classifying customer feedback.
*   **Analyze positive or negative sentiment in text**: Evaluates whether text is positive, negative, or neutral—useful for routing customer feedback or survey responses.
*   **Extract entities from text**: Identifies and extracts named entities from unstructured text—such as names, dates, locations, and amounts—using standard or custom entity extraction models.

### HTTP action

The HTTP action allows a flow to call any REST API endpoint, enabling integration with services that don't have a prebuilt Power Automate connector. The flow can send GET, POST, PUT, PATCH, or DELETE requests with custom headers, authentication, and body content—and use the API's response data in subsequent actions.

## The role of connectors

Connectors are the bridges that connect Power Automate to external services. Each connector encapsulates the authentication, endpoint configuration, and available operations (triggers and actions) for a specific service. Power Automate provides two types of connectors:

*   **Standard connectors**: Available to all Power Automate license tiers. Includes connectors for common services like Outlook, Teams, SharePoint, OneDrive, and more.
*   **Premium connectors**: Require a Power Automate Premium or per-flow license. Includes connectors for enterprise services like Dataverse, SQL Server, Salesforce, SAP, ServiceNow, and custom connectors.

Organizations with systems not covered by existing connectors can build **custom connectors** that define their API's authentication, endpoints, and operations as a reusable connector available to all makers in the environment.
