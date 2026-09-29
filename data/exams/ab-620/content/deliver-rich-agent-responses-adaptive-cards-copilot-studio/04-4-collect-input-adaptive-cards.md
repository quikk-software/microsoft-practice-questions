---
title: "Collect user input with interactive Adaptive Cards"
url: "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/4-collect-input-adaptive-cards"
uid: "learn.wwl.deliver-rich-agent-responses-adaptive-cards-copilot-studio.collect-input-adaptive-cards"
module: "deliver-rich-agent-responses-adaptive-cards-copilot-studio"
moduleTitle: "Deliver rich agent responses using Adaptive Cards in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Collect user input with interactive Adaptive Cards

Informational Adaptive Cards display structured data and let the conversation continue automatically, but the Contoso HR agent needs more than a display. When an employee wants to submit a leave request, the agent needs to collect four related fields: leave type, start date, end date, and reason. Walking through each field one at a time with separate **Question** nodes within the topic adds four turns to the conversation. The **Ask with Adaptive Card** node handles all four fields in a single topic step instead. It presents a card with built-in input elements, like dropdowns and text fields, that map directly to topic variables when the employee submits the form.

## Choose the right user input node for the job

There are two node types that can collect input from a user in a topic. The **Question** node works well for collecting one value at a time, such as a short text response, a number, or a yes-or-no confirmation. Each Question node adds one turn to the conversation, and for straightforward branching scenarios that's perfectly fine.

When you need several related values up front — such as the leave type, start date, end date, and reason for a leave request — the **Ask with Adaptive Card** node gives you a better approach. The employee sees a single card with all the fields at once, fills them in, and submits. The agent receives all values in one response, reducing four exchanges to one. For employees submitting routine requests, this consolidation makes the agent feel faster and more purposeful.

For the Contoso HR scenario, you'd use Ask with Adaptive Card for the leave request form and keep the Question node for standalone confirmations and simple follow-ups where a single value is all you need.

## Add input elements to your card

The Ask with Adaptive Card node opens the same Adaptive Card designer described in the previous unit, with one key addition: **input elements** are now available in the element toolbox. Adaptive Cards supports six input element types:

*   **Input.Text**: A single-line or multiline text field for open-ended text responses.
*   **Input.Number**: A numeric input field with optional min and max constraints.
*   **Input.Date**: A date picker that returns a date string in `YYYY-MM-DD` format.
*   **Input.Time**: A time picker that returns a time string in `HH:MM` format.
*   **Input.Toggle**: A checkbox that returns `true` or `false`. Use this element for boolean fields.
*   **Input.ChoiceSet**: Renders as a dropdown list or a set of radio buttons. Use this element type when the user should select from a predefined set of options rather than entering free text.

For the Contoso HR leave request form, a typical card uses the following:

![Screenshot of a sample leave request form Adaptive Card.](media/leave-request-form-card.png)

*   An **Input.ChoiceSet** for leave type, configured with choices for Annual Leave, Sick Leave, and Parental Leave
*   **Input.Date** fields for start date and end date
*   An **Input.Text** field with **Multiline** enabled for the reason

The start and end date fields are marked as **Required** in the properties panel, which prevents the form from being submitted without dates.

## Configure the Submit button

Every Ask with Adaptive Card form needs an **Action.Submit** element—the button that sends the employee's entries back to the agent. Copilot Studio adds a default Submit button automatically, but you should customize the label to match your scenario.

Selecting the Submit button in the designer opens its properties, where the **Title** field controls the button label. For the leave request form, `Submit request` is more specific and actionable than the default `Submit`.

When the employee selects the button, all populated input fields are packaged and sent to the agent as a single payload. Copilot Studio then maps each `id` to its corresponding topic variable and makes those variables available to every node that follows in the topic flow.

## Work with output variables

Each input element used within the Adaptive Card has an **ID** property. Once a user submits the card, Copilot Studio automatically creates a topic variable for each input element based on its `id`. If you leave the default IDs (`input1`, `input2`, `input3`, `input4`), the resulting variables are `Topic.input1`, `Topic.input2`, and so on, which are technically correct but hard to work with in subsequent nodes.

Instead, set descriptive camelCase IDs. For the leave request card with IDs `leaveType`, `startDate`, `endDate`, and `leaveReason`, the variables are:

*   `Topic.leaveType`: the selected leave type string
*   `Topic.startDate`: the entered start date
*   `Topic.endDate`: the entered end date
*   `Topic.leaveReason`: the employee's reason text

These variables could be referenced in a subsequent **Send a message** node to confirm the request before passing the data to a connector. For example: "Your **Annual Leave** request from **2027-01-11** to **2027-01-15** has been submitted." They can also be passed directly to an agent flow or tool call that creates the leave record in the HR system, with no manual parsing or transformation required.

## Handle unsubmitted cards

Not every employee who sees the leave request form completes it. If an employee closes the card without selecting Submit, the output variables remain empty; Copilot Studio doesn't generate any value from an unsubmitted card.

Important

Always add a **Condition** node immediately after an Ask with Adaptive Card node to check whether the required variables contain values. For a leave request form, you'd check that the leave type field isn't blank as a minimum condition. When the variable is empty, the conversation would route to a handling branch — such as a message offering to restart the form — rather than continuing to downstream nodes that expect the variables to be populated. Skipping this check causes errors that are difficult to trace back to the dismissed card.

## Handle submissions with consecutive cards

If your agent sends multiple Adaptive Cards in a conversation (for example, consecutive cards, retries, or interruptions), users might select Submit on an earlier card. To help your agent or custom client distinguish which card and action a response came from, include a unique identifier in each submit action's data payload and validate it when processing the response.

Example:

```
{
  "type": "Action.Submit",
  "title": "Confirm",
  "data": {
    "actionSubmitId": "booking_confirm_card_v3_confirm"
  }
}
```

## Populate a dropdown dynamically with Power Fx

The leave type choices in this example are hardcoded in the card designer, which works well for a stable list that rarely changes. In some scenarios, the available options come from an earlier step in the topic—for example, an HTTP request that retrieves valid leave categories from the HR system at runtime. Power Fx lets you bind a topic variable directly to an Input.ChoiceSet's `choices` property.

In the card's JSON, replace the hardcoded choices array with a Power Fx expression:

```
{
  "type": "Input.ChoiceSet",
  "id": "leaveType",
  "label": "Leave type",
  "choices": "=Topic.AvailableLeaveTypes"
}
```

`Topic.AvailableLeaveTypes` must be a table with `title` and `value` columns—the format that Input.ChoiceSet expects. This follows the same Power Fx binding pattern for the Ask with Adaptive Card node: a `=` expression substituted in place of a literal value in the card JSON. This pattern works well for scenarios where the option list genuinely varies by user, region, or policy. For stable lists like Contoso's three leave categories, hardcoded choices are simpler and less prone to runtime errors.

## Next step

You can now both display data with informational Adaptive Cards and collect structured input with interactive forms, covering the full range of what Adaptive Cards offer in a Copilot Studio topic. The remaining question is whether these cards render consistently everywhere employees access the Contoso HR agent. In the next unit, you explore how Adaptive Card schema versions and channel-specific behavior affect rendering in Microsoft Teams, the web chat surface, and other deployment environments, so that you can design cards that work well regardless of where your agent is deployed.
