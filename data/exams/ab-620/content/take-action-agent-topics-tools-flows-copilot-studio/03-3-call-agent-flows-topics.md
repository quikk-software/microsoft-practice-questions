---
title: "Call agent flows from agent topics"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/3-call-agent-flows-topics"
uid: "learn.wwl.take-action-agent-conversations-topics-tools-copilot-studio.call-agent-flows-topics"
module: "take-action-agent-topics-tools-flows-copilot-studio"
moduleTitle: "Take action from agent conversations using topics and tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Call agent flows from agent topics

The previous unit showed how Adatum's customer service agent calls a Microsoft Dataverse connector to look up a live order status in a single step. That pattern works well for direct, one-step lookups. But when a customer qualifies for a refund, the required action isn't a lookup. It's a process: validate the order, initiate the refund in Dynamics 365, send the customer a confirmation email, and return a result code back to the topic so the conversation can route correctly. A single connector action can't coordinate all of that. An agent flow can.

## When to use an agent flow instead of a connector tool

An agent flow is the right choice when an integration requires multiple coordinated steps, conditional branching between them, or logic that needs to be callable from more than one topic. Unlike a connector tool, which executes a single action and returns a result, an agent flow runs an entire workflow then returns a structured response when it's done.

### Understand the difference between agent flows and cloud flows

Agent flows live natively in Copilot Studio. They aren't the same as cloud flows you create in Power Automate. Cloud flows are designed for general automation scenarios and are licensed and managed separately through Power Automate. Flows that were created in Power Automate must be managed in Power Automate, unless you convert them to agent flows.

Agent flows are designed specifically for use with agents. They're billed through your Copilot Studio consumption, not through a Power Automate license, and they appear on the **Flows** page inside Copilot Studio.

For Adatum's refund scenario, the team already built an agent flow that handles the full refund process. This unit shows how that flow is called from the topic using a Tool node, how the topic passes in the data the flow needs, and how it acts on what the flow returns.

## What a callable agent flow requires

Before you add an agent flow to a topic, the flow must meet these requirements:

*   **`When an agent calls the flow` trigger**: This trigger makes the flow callable from a topic or the agent orchestrator. A flow without this trigger doesn't appear in the tool picker.
*   **`Respond to the agent` action**: The flow must include this action to return values to the topic. It marks the synchronous boundary where the topic receives the flow's output parameters and continues. Actions placed after it run asynchronously.
*   **Asynchronous response disabled**: In the `Respond to the agent` action settings, under **Networking**, the **Asynchronous response** toggle must be set to **Off**. Setting **Asynchronous response** to **Off** ensures the topic waits for the flow to finish and receive its outputs before continuing.
*   **Declared input and output parameters**: Any data the flow needs from the topic, and any data it returns, must be declared in the flow. The topic can only map to what the flow explicitly exposes.
*   **Solution flow**: The flow must be a solution flow to appear in Copilot Studio.

When you create an agent flow in Copilot Studio as a **new tool** added to an agent, the required flow trigger and response action are added for you. See [Create an agent flow as a tool](/en-us/microsoft-copilot-studio/advanced-flow-create) for more info.

The rest of this unit assumes the flow already exists and meets these requirements.

## Use the Add a Tool node to call an agent flow

Adding an agent flow to a topic uses the same **Add a tool** pattern from the previous unit. The difference is what you select in the tool picker.

For example, in Adatum's refund scenario the topic already has a condition node that confirms the customer's eligibility. The agent flow node is added immediately after that condition, and the topic passes the order and customer details to the flow as inputs. Here's how you'd configure this agent flow in practice:

1.  In Copilot Studio, select **Topics** and open the topic where the refund logic should run.
2.  On the authoring canvas, position the cursor at the point where the flow should run — after the condition node that confirmed the customer's eligibility.
3.  Select **Add node** (**+**), then select **Add a tool**.
4.  In the tool picker, find and select the agent flow for the refund process.
5.  Select **Add**. An **Action** node appears on the canvas at the position you selected.

With the **Action** node on the canvas, the next step is to configure the inputs and outputs.

**Inputs**: In the **Action** node, map each flow input parameter to the topic variable that holds the corresponding value. For the refund scenario, `OrderID` maps to `Topic.OrderNumber` and `CustomerEmail` maps to `Topic.CustomerEmail`. At runtime, when the topic reaches the **Action** node, it passes these values to the flow.

**Outputs**: The refund flow returns a `RefundStatus` string (`success` or `failure`) and a `ConfirmationCode`. These are assigned to topic variables: `Topic.RefundStatus` and `Topic.ConfirmationCode`. The condition node that follows uses `Topic.RefundStatus` to route the conversation, and the message node composes the response using `Topic.ConfirmationCode`.

Note

Pass only the variables the topic actually needs. If the flow returns additional fields your topic doesn't use, there's no need to capture them. Keeping the input and output schema minimal makes the flow easier to maintain and reduces the chance of type mismatches.

This input and output mapping pattern is consistent across all tool types. Whether you're calling a connector, an agent flow, or an HTTP endpoint, you always identify what you send in and what you capture on the way out.

## Understand the 100-second limit

Agent flows must complete and respond within 100 seconds. The topic pauses at the **Action** node and waits for the flow's response. If the flow doesn't respond in time, the action times out.

For most integrations (updating a record, sending an email, or returning a status code), 100 seconds is more than enough. The constraint becomes relevant for long-running operations: document generation, multi-stage approval chains, or any process that depends on a human completing a step before the flow can continue.

For those scenarios, design the flow to start the background operation and immediately return a job ID or tracking reference to the topic. The `Respond to the agent` action marks the synchronous boundary — it's the point where the topic receives its outputs and continues — but it doesn't have to be the flow's last node. Any actions placed after it run asynchronously, up to Power Automate's flow duration limit of 30 days. The topic receives its response quickly (the job ID) and can use a separate polling topic or a follow-up message to surface the final outcome when it's ready.

For Adatum's refund flow, the steps all complete within the 100-second window. For a more complex workflow — say, one that triggers a document generation service and awaits its output — the async split pattern keeps the conversation moving without forcing the customer to wait inline.

Agent flows give you the full capability of Power Platform connectors and multi-step automation when a single action won't do. The requirement is that the flow exists and is correctly configured with the right trigger and response action. Sometimes the data you need is available directly from a REST API, with no connector or flow required. The next unit explores that scenario using the HTTP request node.
