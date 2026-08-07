---
title: "Create cloud flows with Copilot"
url: "https://learn.microsoft.com/en-us/training/modules/identify-microsoft-power-automate-components/create-cloud-flows-copilot"
uid: "learn.wwl.identify-microsoft-power-automate-components.create-cloud-flows-copilot"
module: "identify-microsoft-power-automate-components"
moduleTitle: "Identify Microsoft Power Automate components"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Create cloud flows with Copilot

Copilot in Power Automate changes how flows are created and edited. Instead of starting with a blank canvas and manually connecting triggers, actions, and conditions, you describe what you want in plain language and Copilot generates a working flow structure. This unit walks through using Copilot throughout the cloud flow lifecycle—from first creation to ongoing modification.

## How Copilot works in cloud flows

Copilot in Power Automate is embedded directly in the flow creation and editing experience. It can:

*   Understand your intent from a natural language description and generate a proposed flow with triggers, actions, and connections.
*   Automatically set up connections to the required services on your behalf.
*   Apply the right parameters to each trigger and action based on your description.
*   Respond to follow-up prompts to modify, extend, or simplify the generated flow.
*   Answer questions about how the flow works, what specific steps do, or how to accomplish something in Power Automate.

Copilot uses a conversational interface—you describe what you want, Copilot proposes a flow structure, you provide feedback, and Copilot updates the proposal. This conversation continues until you're satisfied with the flow, at which point you accept it and Copilot creates it in the designer for final review.

## Step 1: Describe your automation

Sign in to Power Automate at [https://make.powerautomate.com](https://make.powerautomate.com). On the home page, you see the **Create your automation with Copilot** field at the top of the screen. Type a description of the automation you want to create.

Copilot works best with descriptions that follow the pattern "When X happens, do Y." Be specific about which services are involved and what data should flow between them. For example, a Contoso IT administrator might type:

> _"When a new item is added to the IT Service Requests list in SharePoint, send an approval request to the IT manager in Teams. If approved, send a confirmation email to the requester. If rejected, update the Status field in SharePoint to Rejected and notify the requester."_

Select **Generate**. Copilot processes your description and proposes a flow structure.

[![Screenshot of Power Automate home page showing the Create your automation with Copilot field with a natural language prompt entered.](media/create-copilot.png)](media/create-copilot.png#lightbox)

## Step 2: Review and refine the proposed flow

Copilot displays a proposed flow structure showing the trigger, the sequence of actions, and any conditions or branching it detected from your description. Review the proposal carefully:

*   Confirm that the trigger matches the event you described.
*   Verify that the sequence of actions is in the right order.
*   Check that the conditions and branching logic reflect your intent.

If the proposal isn't quite right, continue the conversation by describing what needs to change. For example:

*   "Add a step to get the requester's employee profile from Microsoft 365 before sending the email."
*   "The approval should also go to the department head, not just the IT manager."
*   "Add a step to log the outcome in a Dataverse table after the approval is completed."

[![Screenshot of Power Automate showing a proposed flow structure with Copilot Chat panel open and a refinement prompt entered.](media/edit-with-copilot.png)](media/edit-with-copilot.png#lightbox)

Copilot updates the proposed flow after each prompt. Continue refining until the structure matches your requirements.

## Step 3: Accept and open in the designer

When the proposed flow meets your requirements, select **Create flow**. Copilot creates the flow and opens it in the cloud flow designer. At this point, you can:

*   Review each step's configuration—verify that the correct SharePoint list, Teams channel, email addresses, and field mappings are configured.
*   Make manual edits using the designer's visual interface for any details that require specific configuration.
*   Continue using Copilot through the designer's Copilot panel to make additional changes.
*   Test the flow using the **Test** button before enabling it for production use.

## Modifying existing flows with Copilot

Copilot is equally valuable for modifying existing flows. To edit an existing flow with Copilot, open the flow in the designer and select the Copilot icon in the upper-right corner to open the Copilot Chat panel.

In the Copilot panel, describe changes using natural language:

*   "Delete the Send email action and replace it with a Post message in Teams action."
*   "Add a condition after the approval action—if the approval is rejected, also notify the department head."
*   "Change the recurrence from daily to every weekday at 8:00 AM."
*   "Add an Apply to each loop around the Create item action to process multiple records at once."

[![Screenshot of cloud flow designer showing the Copilot Chat panel open with a natural language modification prompt and the updated flow steps.](media/adjust-flow-with-copilot.png)](media/adjust-flow-with-copilot.png#lightbox)

Copilot applies each change to the flow and shows you the result. You can also use Copilot to ask questions about your flow—such as "What does this flow do?" or "What happens if the approval isn't responded to within 24 hours?"

## Writing effective Copilot prompts

The quality of the flow Copilot generates is directly related to the specificity and clarity of your prompt:

*   **Use the "When X happens, do Y" pattern**: Start with the trigger event and then describe each subsequent action in sequence.
*   **Name the specific services**: Say "SharePoint" rather than "a list," "Microsoft Teams" rather than "a chat tool," and "Dataverse" rather than "a database."
*   **Describe conditions explicitly**: Spell out branching logic—"If the total exceeds $5,000, send to the VP for approval. Otherwise, send to the department manager."
*   **Specify the data that should flow between steps**: For example, "Include the form submitter's name, the submitted date, and the request description in the approval message."

Tip

If Copilot's initial proposal is close but not perfect, it's often faster to accept the proposal, open it in the designer, and continue refining with follow-up prompts than to start over with a new initial description.
