---
title: "Describe building cloud flows"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/describe-building-cloud-flows"
uid: "learn.wwl.identify-microsoft-power-automate-components.describe-building-cloud-flows"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe building cloud flows

Understanding how cloud flows are structured in the designer helps you build, troubleshoot, and maintain your automations more effectively. This unit describes the key components of a cloud flow and the logical constructs—conditions, loops, and branching—that make flows intelligent and adaptable.

## The cloud flow designer

Cloud flows are built in the Power Automate cloud flow designer, accessible at make.powerautomate.com. The designer provides a visual, step-by-step canvas where triggers and actions are displayed as connected cards.

The designer offers two modes:

*   **Visual designer mode**: The default mode, where triggers and actions are displayed as cards on a canvas. Select cards to configure them, add steps using the **+** button between cards, and drag to reorder.
*   **Copilot-assisted mode**: The Copilot panel is available alongside the visual designer, allowing you to continue building or modifying the flow through natural language even after the initial creation.

[![Screenshot of cloud flow designer showing the visual canvas with connected action cards and the Copilot Chat panel open on the right side.](media/copilot-assisted-mode.png)](media/copilot-assisted-mode.png#lightbox)

## Anatomy of a cloud flow

Every cloud flow consists of the same basic structural elements:

*   **Trigger**: The first card in the flow. Defines the event that starts the flow. A flow has exactly one trigger.
*   **Actions**: Cards that appear after the trigger. Each card represents a specific task—sending an email, getting data, creating a record, posting a message. Actions execute in order from top to bottom.
*   **Dynamic content**: Data outputs from previous steps in the flow—such as the subject of the email that triggered the flow, or the ID of the SharePoint item that was created—that can be referenced in subsequent action configurations.
*   **Expressions**: Formulas written using the Power Automate expression language that perform calculations, data transformations, string operations, and logical evaluations on dynamic content values.
*   **Connections**: Authenticated links to external services. Each connector requires a connection to be established using the maker's credentials for that service.

## Adding logic with conditions

A Condition action splits a flow into two paths: a Yes path and a No path. The condition evaluates a logical expression—such as "Is the invoice total greater than $10,000?" or "Is the Status field equal to 'Pending'?"—and routes the flow down the corresponding path.

[![Screenshot of cloud flow designer showing a Condition action with Yes and No branches and actions configured in each branch.](media/controls.png)](media/controls.png#lightbox)

The **Switch** control provides an extension of the condition concept—it evaluates a single value against multiple possible cases, routing to a different set of actions for each case. This is more efficient than chaining multiple conditions when there are many possible discrete outcomes, such as routing a service request to different queues based on the Category field value.

## Processing collections with loops

Many business processes involve working with a collection of items—a list of customers, a set of attachments, an array of records retrieved from a database. Loop actions allow a flow to perform the same set of actions for every item in a collection.

Power Automate provides two loop types:

*   **Apply to each**: Iterates through every item in an array and executes the contained actions once per item. The current item's data is available as dynamic content within the loop. For example, a flow can loop through a list of survey respondents and send a personalized thank-you email to each one.
*   **Do until**: Repeats a set of actions until a specified condition becomes true. Useful for polling scenarios where the flow should retry an operation until it succeeds, or wait for a status to change before proceeding.

## Running actions concurrently with parallel branches

By default, cloud flow actions run sequentially. However, some automation scenarios require multiple independent tasks to happen at the same time. Parallel branches allow actions to run concurrently, reducing the total time the flow takes to complete.

For example, when a new customer is onboarded at Contoso, a flow might use parallel branches to simultaneously:

*   Create a customer record in Dataverse.
*   Add a row to the customer tracking Excel workbook in SharePoint.
*   Send a welcome email to the customer.
*   Post a notification to the sales team's Teams channel.

All four actions execute at the same time rather than sequentially, cutting the flow's execution time.

## Flow templates

Power Automate provides a large library of prebuilt flow templates that serve as starting points for common automation scenarios. Templates are available for popular connectors and use cases, including:

*   Save Outlook email attachments to OneDrive.
*   Get a notification when an item is added to a SharePoint list.
*   Send yourself a daily briefing with your Outlook calendar events.
*   Create a Planner task from a Teams message.
*   Trigger an approval when a SharePoint document is added.

[![Screenshot of Power Automate templates gallery showing a grid of prebuilt flow templates for popular connectors and use cases.](media/templates.png)](media/templates.png#lightbox)

Templates can be discovered through the Power Automate Templates gallery and customized after installation. Starting from a template is often faster than building from scratch, particularly for new makers who are still learning the available connectors and actions.

## Testing and monitoring cloud flows

Before enabling a flow for regular use, test it thoroughly. Power Automate provides built-in testing capabilities:

*   **Test button**: Available in the designer, lets you run the flow with either a manual trigger or using data from a previous run. The test run shows each step's execution status and the data that passed between steps.
*   **Run history**: The flow detail page shows a log of every run—successful and failed—with timestamps and the ability to drill into any individual run to see step-by-step execution details and the exact data at each step.
*   **Flow checker**: Validates the flow configuration before saving, identifying missing required fields, invalid expressions, or configuration errors that would cause the flow to fail.

[![Screenshot of Power Automate flow detail page showing the run history with successful and failed runs and drill-down test results.](media/test-flow.png)](media/test-flow.png#lightbox)

Tip

When testing a flow that sends emails or creates records, use a test SharePoint list or a dedicated test mailbox to avoid creating real records or sending real emails to customers during development.
