---
title: "Configure child agent inputs, outputs, and trigger behavior"
url: "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/4-configure-child-agent-inputs-outputs-triggers"
uid: "learn.wwl.delegate-agent-tasks-child-agents-copilot-studio.configure-child-agent-inputs-outputs-triggers"
module: "delegate-agent-tasks-child-agents-copilot-studio"
moduleTitle: "Delegate agent tasks using child agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Configure child agent inputs, outputs, and trigger behavior

With a child agent created and its invocation configured, the next step is defining what it does once invoked and what flows back to the parent. In this unit, you'll learn how to write effective instructions, scope tools and knowledge, configure inputs and outputs for structured data exchange, and control what happens after the child agent finishes.

## Write effective instructions

Instructions guide the child agent's behavior once the orchestrator delegates a task to it. They're distinct from the description: while the description controls routing (when the agent is called), instructions control execution (how it behaves once it's called).

Instructions for the "Order Status" child agent should reflect its specific scope: look up order details, respond with tracking information, and handle edge cases like an order that can't be found. They don't need to address return requests or delivery problems; those are handled by the Returns and Exchanges and Delivery Issues child agents.

### Reference tools from child agent instructions

Use `/` in the instructions field to reference tools, variables, or Power Fx formulas inline. This is useful when you want the agent to call a specific tool as part of its default handling, for example always retrieving order details when invoked, rather than leaving that decision to the AI each time.

**Watch for tool conflicts.** If a tool like "Get order details" is added to the child agent but is also visible to the orchestrator, the orchestrator may call the tool directly instead of delegating to the child agent. The result is a raw tool response that bypasses the child agent's instructions, and routing starts behaving unpredictably.

To prevent this, open the tool's detail page and clear the **Allow agent to decide dynamically when to use this tool** property in **Additional details**. This restricts the tool to explicit invocation: it can only be called when an agent or topic specifically references it in its instructions. With that setting cleared, the orchestrator routes to the "Order Status" child agent, which then calls the tool exactly as intended.

## Scope knowledge and tools to the child agent

Knowledge sources and tools you add exclusively to a child agent are available only to that child agent; the parent orchestrator won't call them independently, and other child agents can't access them. This is the default behavior when you add a tool directly in the child agent's **Tools** section without also adding it to the parent.

Adding the order lookup tool and an order tracking knowledge source directly to the "Order Status" child agent, and only there, means the orchestrator's own tool and knowledge list stays focused. A focused orchestrator tool list improves routing accuracy: the AI matches user intent against a smaller, better-defined set of options, with fewer opportunities for confusion.

As a default practice, scope resources to the most specific agent that needs them. Only add knowledge or tools to the parent orchestrator if they genuinely need to be available across all domains. Most domain-specific resources don't.

## Define the child agent's inputs

By default, when the parent agent calls a child agent, it passes the user's natural language message as the task. That works for some agents, but the Order Status agent needs a specific value to perform a lookup. A message like "where's my order?" doesn't include an order number, and the agent can't retrieve status without one.

That's where **inputs** come in. Inputs let you specify the exact structured values your child agent requires before running. Each input has four core properties:

*   **Display name**: A label that identifies the input, such as "Order Number."
*   **Description**: A natural language explanation of what this input represents. The parent agent reads this when deciding what value to supply.
*   **Data type**: The expected format: text, number, boolean, table, or other supported types.
*   **Required**: Whether the agent must have a value for this input before it can run.

When you mark an input as required, the agent treats that value as a prerequisite. Description quality matters here just as it does for the agent's top-level description. A specific, well-written description (such as "The customer's order number, formatted as ORD- followed by six digits") helps the parent recognize relevant context and supply the right value. A vague description increases the risk of incorrect matches or missed values.

## Control how missing inputs are collected

When you need more explicit control over how an input is filled at runtime, use the **Advanced** section for that input. Use it when:

*   The parent agent can't reliably supply the value from conversation context, and the child agent should ask the user directly
*   The input needs validation — for example, an order number that must match a specific format
*   You want to control what happens when the user provides an invalid value repeatedly, or when no valid value can be collected at all

These settings include:

*   **Should prompt user**: whether the child agent asks the user directly when the parent can't supply the value
*   **Condition / Condition not met prompt**: a validation rule and the message shown when the user's input fails it
*   **How many reprompts**: how many times to retry before giving up on collecting a valid value
*   **Action if no entity found**: what to do when all retries are exhausted — escalate, use a default, or continue empty

> **Guiding question:** Consider the inputs your own child agent needs. For which can the parent reliably supply a value from conversation context? For which inputs might the user need to provide a value directly? That distinction determines which inputs warrant advanced configuration.

## Define what the child agent returns: outputs

Inputs let you control what goes into the child agent; outputs define what comes back out. Outputs are the structured values the child agent passes to the parent when it finishes. Like inputs, each output has a display name, description, and data type. The description communicates to the parent what each output represents so it can use the values appropriately in the next step.

For the Order Status agent, relevant outputs might include the current order status and an estimated delivery date. Once the child agent returns these values, the parent has structured data it can use to craft a response, evaluate a condition, or pass into another child agent as input.

When a child agent is called via a topic redirect, the output values are automatically available as topic variables in the parent after the child completes. This means you can reference those values directly in subsequent topic nodes without any additional mapping step.

## Configure what happens after the child agent completes

Returning structured outputs is only part of the completion picture. You also need to decide what action the parent takes immediately after the child finishes. The **After running** setting controls this, with four options:

*   **Don't respond** (the default): The parent continues its orchestration plan without sending a message to the user. This is the right choice when the child's outputs feed into the next step: another child agent call, a condition check, or a further action.
*   **Write the response with generative AI**: The parent generates a natural language reply using the child's outputs as context. For Fabrikam, this means the parent crafts a message like "Your order is on its way and is expected by Friday" rather than surfacing raw status data.
*   **Send specific response**: The parent sends a fixed, pre-written message regardless of what the child returned. This works well for templated responses where the content is always the same, such as a confirmation after a standard action.
*   **Send an adaptive card**: The parent sends a structured card using the child's output values. This is well-suited to tabular or detailed output, such as a list of recent orders with status and estimated delivery displayed in a structured layout.

The choice between these options depends on the nature of the output and the experience you want to deliver. Generative AI responses are flexible and natural-sounding; specific responses are consistent and predictable; adaptive cards are ideal when the output contains structured data that benefits from a visual layout.
