---
title: "Test and validate an A2A agent connection"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/4-test-validate-a2a-connection"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.test-validate-a2a-connection"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Test and validate an A2A agent connection

With the A2A connection added to the orchestrator, the next step is to verify that it works correctly end-to-end. In this unit, you'll explore how to test A2A agent delegation in the Copilot Studio test canvas, examine the message payload the orchestrator sends to the external agent, and evaluate the integration from a responsible use standpoint before it goes to production.

## Test A2A delegation in the test canvas

The test canvas in Copilot Studio lets you interact with your orchestrator in real time and observe how it processes requests, including whether it delegates to a connected A2A agent.

Testing an A2A connection involves opening the orchestrator agent, selecting **Test your agent**, and sending a message that should be routed to the A2A agent. The activity log in the test panel shows how the orchestrator handled the request, including any delegation to connected agents and the response returned.

For the Fabrikam scenario, the maker sends: _"Where is my order with tracking number TRK-98765?"_ The orchestrator recognizes this as a shipment tracking query, delegates it to the Northwind A2A agent, and returns a response with the current status and estimated delivery date. The maker confirms the delegation occurred by reviewing the activity log, then checks that the response content is accurate and aligned with what a user would expect.

### Testing multiple prompt variations

One successful delegation test isn't enough to confirm the integration is working well. Testing with a variety of prompts helps identify routing gaps and ambiguities:

*   **Prompts that should route to the A2A agent**: test several phrasings of shipment tracking questions: current status, estimated delivery, and tracking event history
*   **Prompts that should not route to the A2A agent**: test related-sounding queries (returns, order history, billing questions) to confirm these route to the correct internal topics or agents
*   **Edge cases**: test partial information ("Where is my package?"), multi-turn follow-ups ("What does 'In transit' mean?"), and queries that fall outside the A2A agent's stated scope

If a prompt that should be handled internally is being routed to the A2A agent, refine the agent's description in Copilot Studio to be more specific about the scope of queries it handles.

During testing, Fabrikam's maker finds that "What's the status of my recent delivery?" sometimes routes to the Northwind A2A agent and sometimes to the internal order status child agent. After reviewing both agents' descriptions, the maker narrows the A2A agent's description further, specifying that it handles queries specifically for orders shipped via Northwind Traders, while orders fulfilled directly by Fabrikam are handled internally. This boundary clarifies routing and resolves the ambiguity.

## Understand the A2A message payload

When your orchestrator delegates a task to an A2A agent, it sends a structured message that contains more than just the user's latest utterance. Understanding this payload helps you evaluate what information is shared with the external agent.

Each A2A message includes:

*   **Context ID** (`contextId`): A unique identifier for the conversation session. The same context ID is used across all delegated tasks in a single user session, allowing the A2A agent to maintain continuity across multiple turns.
*   **Message IDs**: Unique identifiers for each individual message, enabling traceability and debugging.
*   **Locale**: The language and regional setting of the user's session, which the A2A agent can use to respond in the appropriate language.
*   **Conversation history**: By default, the orchestrator includes the full conversation history from the current session, not just the most recent user message. This gives the A2A agent context from earlier in the conversation when forming its response.
*   **Message content parts**: The structured content of the message, including text, metadata, and tool call results where applicable.

The conversation history component is particularly important from a responsible use perspective, especially when the A2A agent is owned by a different organization.

Note

The A2A message format follows the A2A protocol specification.

## Evaluate the integration for responsible use

Before enabling an A2A integration for live users, evaluate what data your orchestrator is sharing with the external agent and whether that sharing is appropriate.

**Questions to consider:**

*   **What's in the conversation history?** Review the full conversation history that would be sent to the A2A agent. Does it contain data captured earlier in the session, such as account numbers, personal information, or business-sensitive context, that the external agent doesn't actually need?
    
*   **What are the data processing terms?** When the A2A agent is owned by a different organization, confirm your data sharing is consistent with that organization's data processing agreement. Sensitive customer data shouldn't be sent to an external agent without explicit authorization.
    
*   **How reliable and accurate is the external agent?** The quality of your orchestrator's responses for delegated tasks depends on the A2A agent's quality. Test with a representative range of queries to assess whether the agent's responses meet your standards before exposing it to users.
    
*   **Is there adequate observability?** For production integrations, ensure you have logging and monitoring in place to track what's delegated and what's returned, especially for high-impact scenarios where the agent's responses inform consequential decisions.
    
*   **Is there a human oversight path?** For high-stakes delegations (for example, an agent that can also initiate returns or claim investigations), confirm there's a mechanism for escalating to a human when the A2A agent's response is uncertain or sensitive.
    

> **Synthesis prompt:** You've completed testing of the Northwind A2A connection and it's routing accurately. Before going to production, you review the message payload and discover the full conversation history sent to Northwind's agent includes a customer's Fabrikam account number captured during order lookup earlier in the session. Northwind's agent only needs the current shipment query. It doesn't need the account details. What responsible use considerations does this raise, and what steps would you take before enabling this integration for live users?

### Fabrikam's responsible use review

When reviewing the A2A payload during testing, Fabrikam's maker discovers that the full session history (including a customer's Fabrikam account number captured during the initial order lookup) is included in messages sent to Northwind's A2A agent. The maker flags this as a data governance concern and raises it with Northwind Traders' technical contact to confirm how their agent handles session history and what data it retains. The maker also reviews the data processing agreement between Fabrikam and Northwind Traders to confirm this level of data sharing is appropriately authorized. These findings are documented as design decisions in the orchestrator's governance record before the integration is enabled for live users.

## Troubleshoot common issues

If the A2A connection doesn't behave as expected, these common issues and resolutions can help:

Symptom

Likely cause

Resolution

No delegation occurs

Orchestrator isn't routing to the A2A agent

Refine the A2A agent's description to be more specific and distinct from other agents

Authentication error

Incorrect credentials or header configuration

Verify the header name, key value, or OAuth parameters. Confirm with the external agent's owner

Unexpected A2A agent responses

Full conversation history is causing the A2A agent to misinterpret requests

Refine the A2A agent description to scope routing more precisely. Review with the external agent's owner what context their agent uses

Agent card not discovered

Endpoint URL is incorrect or the agent card is missing

Navigate to `{endpoint}/.well-known/agent.json` directly to verify. Enter name and description manually if needed

Connection error

Network issue or gateway misconfiguration

Verify endpoint accessibility. Check on-premises data gateway configuration if applicable
