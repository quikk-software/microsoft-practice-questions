---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/delegate-agent-tasks-child-agents-copilot-studio/6-knowledge-check"
uid: "learn.wwl.delegate-agent-tasks-child-agents-copilot-studio.knowledge-check"
module: "delegate-agent-tasks-child-agents-copilot-studio"
moduleTitle: "Delegate agent tasks using child agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Module assessment

1.

A maker is building a customer service agent that handles product returns, shipping support, and loyalty program inquiries — all owned and maintained by the same team, with no need to publish any component separately. The agent now exceeds 35 tools and routing accuracy is declining. Which architectural approach best addresses this problem?

Create child agents for each domain to organize tools by scope and reduce the orchestrator's routing surface.

Split the solution into three separately published connected agents, each maintained by the same team.

Add more topics to the existing single agent to give the AI more guidance on how to route each domain.

2.

A maker writes this description for an Order Status child agent: 'Assists customers with any questions about purchases made on the website.' After testing, billing queries about recent charges are sometimes being routed to this agent. What change would most directly fix the routing problem?

Add more tools to the Order Status child agent so it can handle the billing queries it's receiving.

Rewrite the description to explicitly scope it to order tracking and delivery status, removing language that also describes billing activity.

Enable the 'Allow agent to decide dynamically when to use this tool' property on all tools in the Order Status child agent.

3.

A child agent that looks up account balances requires an account ID before it can run. The parent orchestrator doesn't always have the account ID available from the current conversation. Which input configuration ensures the child agent collects the account ID directly from the user when the parent can't supply it?

Configure the account ID input as required and set 'Leave empty' as the action when no value is found.

Enable 'Should prompt user' on the account ID input so the child agent asks the user directly when the parent can't provide the value.

Add a validation condition with a reprompt message on the account ID input so the child agent retries until a valid value is entered.

4.

A topic in a Copilot Studio orchestrator first verifies a customer's identity and collects their account number. After verification, the topic needs to pass the account number to a specific child agent for further processing. Which approach guarantees that the correct child agent receives the account number and handles the request?

Add an agent redirect node at the point in the topic where the handoff should occur, select the target child agent, and pass the account number as an input.

Use matching keywords in both the topic's trigger phrases and the child agent's description so the orchestrator connects them when the topic ends.

Configure the child agent's trigger to 'Message received' so it activates when the topic sends the user a message after verification is complete.

5.

A child agent in a customer service orchestrator depends on an external inventory API for product recommendations. The API will be unavailable for 48 hours due to scheduled maintenance. Which action should the maker take?

Delete the child agent to prevent errors while the API is unavailable.

Disable the child agent using the Enabled toggle on the Agents page until the maintenance window ends.

Update the child agent's description to exclude all inventory-related terms so the orchestrator stops routing product queries to it.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
