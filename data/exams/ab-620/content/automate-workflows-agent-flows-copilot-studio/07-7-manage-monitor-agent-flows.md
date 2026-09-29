---
title: "Manage and monitor agent flows"
url: "https://learn.microsoft.com/en-us/training/modules/automate-workflows-agent-flows-copilot-studio/7-manage-monitor-agent-flows"
uid: "learn.wwl.automate-workflows-agent-flows-copilot-studio.manage-monitor-agent-flows"
module: "automate-workflows-agent-flows-copilot-studio"
moduleTitle: "Automate workflows using agent flows in Copilot Studio"
learningPath: "learn.wwl.automate-tasks-workflows-copilot-studio"
---
# Manage and monitor agent flows

When your agent flow has its trigger, actions, connectors, and control logic configured, it's ready to validate and publish. Before you publish, and long after it runs in production, Copilot Studio gives you tools to catch problems early, confirm the flow behaves as expected, and track the value it delivers over time. This unit covers those tools: version history, the flow checker, testing, and monitoring.

## Keep track of changes with version history

Every time you save an agent flow, Copilot Studio records a versioned snapshot in Microsoft Dataverse. Those snapshots are grouped by date, with labels that identify the latest version, the currently published version, and past-published versions.

Version history is especially valuable in a shared maker environment where flows get updated over time. If a change causes unexpected behavior in production, you don't have to reverse-engineer what changed. Open the history, find the version from before the problem, and restore it in seconds—without losing the work done between then and now. That's the difference between a recoverable mistake and a production incident.

To view and restore version history:

1.  Select **Version history** from the menu at the top of the canvas.
2.  Expand a dated group in the panel to see the versions recorded on that date.
3.  Select a version to display it in the designer.
4.  To revert to an earlier version, select the version, then select **Restore**.

![Screenshot of the version history pane in Copilot Studio showing dated version groups with Latest version, Published, and Past published labels.](media/agent-flow-version-history.png)

## Resolve errors with the flow checker

As you build a flow, errors appear as red indicators on any action card with a problem. Select the indicator directly on the card to see what's wrong with that specific action. To see every error and warning in the flow at once, select **Flow checker** from the menu at the top of the canvas. The Flow checker panel lists all issues; select any item in the list to open the affected action and correct it.

![Screenshot of the Flow checker panel in Copilot Studio showing a list of flow errors and warnings with links to the affected actions.](media/agent-flow-flow-checker.png)

Important

You can't publish a flow that contains errors. All errors must be resolved before the **Publish** option becomes available. Warnings don't block publishing, but review them: they often signal missing optional inputs or configuration gaps that can cause unexpected behavior at runtime.

## Test the flow

Passing the flow checker confirms the flow is correctly configured. It doesn't confirm the flow produces the outputs you expect. A condition might evaluate against edge-case data you didn't account for. An input field might receive an empty value when a real email arrives with no subject line. An expression that looks correct in isolation can produce the wrong format for a downstream action. Testing is how you close that gap.

To run a test:

1.  Save and publish your flow.
2.  Select **Test** from the menu at the top of the canvas to open the **Test Flow** panel.
3.  Select **Manually** to trigger the flow yourself, or select **Automatically** to replay a recent real-world trigger event.
4.  Select **Test**, then select **Run flow**. A green checkmark indicates the run succeeded.
5.  Expand each action to inspect its inputs and outputs to confirm each step produced the result you expected.
6.  Select **Done**.

Note

Testing standard actions in the designer doesn't consume Copilot Credits. However, actions that call Copilot-billed features (such as **Prompt builder**) do incur usage during a test run.

Tip

Test both branches of every condition in your flow, not just the success path. For example, if your flow checks whether a ticket already exists in ServiceNow before creating one, run one test where an open ticket is found and one where it isn't. The False branch is the most common place a flow fails quietly in production because it's the easiest branch to skip during testing.

## Monitor flow performance and value

After your agent flow is published and running, three monitoring tabs in Copilot Studio give you visibility into its reliability, runtime behavior, and value. These tabs appear once the flow has run history.

*   **Overview**: View and edit the flow's name, description, connections, and most recent runs. Turn off the flow or set up a savings rule to quantify the time or cost each successful run saves.
*   **Activity**: Lists every run with its status and duration. Select an individual run to step through each action's inputs and outputs for troubleshooting, using the same drill-through view available during testing.
*   **Analytics**: Displays performance trends over time, including total runs, failure rate, and average duration. A consistently high failure rate or growing run duration often signals that a connected system's API or data has changed and is worth investigating.

![Screenshot of the savings panel in Copilot Studio showing a savings rule configuration form and cumulative time and cost savings across successful runs.](media/agent-flow-savings.png)

The savings rule feature turns operational data into a business case. You define how much time or money each successful run saves, and Copilot Studio accumulates the total across all runs. For a flow that automates tasks that would otherwise require manual effort, that cumulative figure reflects real business value and supports conversations about ROI and further investment.

Note

Savings rules are available only for solution-based agent flows. Successful test runs don't generate savings; only production runs do.

## Convert an existing cloud flow to an agent flow

If you already have a Power Automate cloud flow that performs the steps you need, you can convert it to an agent flow. Converting lets you manage it in Copilot Studio and bill it through Copilot Credits instead of a Power Automate license.

Before converting, confirm that:

*   Copilot Credits are allocated to the Power Platform environment.
*   The cloud flow is in a solution.

To convert a cloud flow:

1.  Go to the [Power Automate portal](https://make.powerautomate.com/).
    
2.  Select the environment that contains the cloud flow.
    
3.  Select **My flows**.
    
4.  Open the cloud flow's detail page.
    
    Tip
    
    If no **Solutions** tile appears on the right side of the detail page, add the flow to a solution before proceeding.
    
5.  Select **Edit** in the **Details** section.
    
6.  Change the flow's plan to **Copilot Studio**.
    
    ![Screenshot of the Power Automate flow edit panel showing the Plan field set to Copilot Studio.](media/cloud-flow-convert.png)
    
7.  Select **Save**.
    
8.  Select **Confirm** to complete the conversion.
    

Important

Conversion is permanent and can't be reversed, because the change in billing plan can't be undone.

With version history, the flow checker, testing, monitoring, and the option to bring existing cloud flows into Copilot Studio, you're equipped to build and manage agent flows that are reliable, debuggable, and measurably valuable. Test your understanding of everything covered in this module in the knowledge check, from creating and configuring flows to applying control logic and tracking performance.
