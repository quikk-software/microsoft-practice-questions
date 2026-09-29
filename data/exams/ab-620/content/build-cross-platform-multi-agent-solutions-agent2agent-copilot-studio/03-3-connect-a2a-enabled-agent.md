---
title: "Connect a Copilot Studio agent to an A2A-enabled agent"
url: "https://learn.microsoft.com/en-us/training/modules/build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio/3-connect-a2a-enabled-agent"
uid: "learn.wwl.build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio.connect-a2a-enabled-agent"
module: "build-cross-platform-multi-agent-solutions-agent2agent-copilot-studio"
moduleTitle: "Build cross-platform multi-agent solutions using the Agent2Agent protocol in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Connect a Copilot Studio agent to an A2A-enabled agent

With a clear understanding of when A2A is the right integration choice, you're ready to explore how a Copilot Studio orchestrator is connected to an A2A-enabled agent. In this unit, you'll walk through the configuration process, from entering the endpoint URL and reviewing agent card metadata, to setting up authentication and writing an effective agent description. Fabrikam's maker uses this process to connect to Northwind Traders' shipment tracking agent.

## What you need before connecting

To add an A2A connection to your orchestrator, you need one piece of information from the external agent's owner: the **endpoint URL**. This is the communication endpoint for the agent (the address your orchestrator sends tasks to). The agent card discovery URL (`/.well-known/agent.json`) is derived from this endpoint automatically. You don't need to provide it separately.

Before adding an A2A connection, verify that:

*   The A2A agent is publicly accessible, or reachable via an on-premises data gateway if it's hosted within a private network
*   You have permissions to create solutions and agents in your Power Platform environment
*   The external agent supports the A2A protocol and has a valid agent card published at the expected path

In Fabrikam's case, Northwind's technical contact provides the endpoint URL and an API key for authentication. The maker has both pieces of information before opening Copilot Studio.

## Add an A2A connection to your orchestrator

Here's how an A2A connection is added to a Copilot Studio agent:

1.  Open the orchestrator agent in Copilot Studio and select **Agents** in the left navigation.
2.  Select **Add an agent**.
3.  Select **Connect to an external agent**, then select **Agent2Agent**.
4.  Enter the A2A agent's **endpoint URL**. Copilot Studio automatically retrieves the agent card from `{endpoint}/.well-known/agent.json` and, if the card is valid, populates the agent's name and description in the form.
5.  Review the name and description, and edit the description to be as specific as possible about the types of queries this agent should handle: this directly affects how the orchestrator routes requests.
6.  Select the appropriate **authentication method** from the **Authentication** dropdown: **None**, **API key**, or **OAuth 2.0**.
7.  Select **Create**.
8.  Select the desired connection from the list of available connections, or create a new connection.
9.  Select **Add and configure**.

After configuring, the A2A agent appears on the **Agents** page alongside any other connected agents in the orchestrator. It's now available for the orchestrator to delegate tasks to during conversations.

### If auto-population doesn't work

If Copilot Studio can't retrieve the agent card after you enter the endpoint URL, the name and description fields won't be populated automatically. To diagnose the issue:

*   Verify the endpoint URL is correct and the A2A agent is reachable
*   Navigate directly to `{endpoint}/.well-known/agent.json` in a browser to confirm the agent card exists and is valid JSON
*   If the agent card is missing or malformed, enter the name and description manually and ask the external agent's owner to resolve the agent card issue

When Fabrikam's maker enters Northwind's endpoint URL, the agent card is discovered automatically and the name "Northwind Shipment Tracker" and a short description are pre-populated. The maker reviews the description and makes it more specific, changing it from "Handles shipment queries" to "Handles live shipment tracking for orders fulfilled by Northwind Traders, including current status, estimated delivery dates, and tracking event history for externally shipped orders."

## Configure authentication

A2A connections support three authentication options. The right choice depends on how the external agent is secured.

**None**: No authentication is applied. Appropriate only for sample, sandbox, or development scenarios where the endpoint is intentionally unprotected. Don't use this option for production integrations.

**API key**: Used when the external agent requires a shared secret passed in a specific HTTP header or query parameter. Enter:

*   The **header name** or **query parameter name** where the key is sent (for example, `X-Partner-Key`)
*   The **key value** provided by the external agent's owner

**OAuth 2.0**: Used for enterprise scenarios that require standard token-based authentication. Enter:

*   Client ID
*   Client secret
*   Authorization URL
*   Token URL
*   Refresh URL

Northwind Traders requires the API key to be sent in a header named `X-Northwind-Key`. Fabrikam's maker selects **API key**, enters `X-Northwind-Key` as the header name, and provides the key value from Northwind's technical contact. Copilot Studio includes this header in every request sent to the A2A agent.

Important

Treat API keys and client secrets as sensitive credentials. Store them securely and follow your organization's policies for managing shared secrets. Don't include them in topics, flows, or other locations where they could be exposed or logged.

## Write an effective agent description

The description you assign to an A2A agent in your orchestrator is one of the most important configuration decisions in the connection setup. The orchestrator uses this description to determine when to delegate a request to this agent versus handling it with its own topics or routing to another connected agent.

An effective description is:

*   **Specific**: it clearly identifies the types of queries this agent handles and, where appropriate, scopes them to a domain or data source
*   **Distinct**: it differentiates this agent from other agents in the orchestrator with similar-sounding purposes
*   **Action-oriented**: it describes what the agent does, not just what it is

For example:

*   **Too broad**: "Handles shipment queries"
*   **More effective**: "Handles live shipment tracking for orders fulfilled by Northwind Traders, including current status, estimated delivery dates, and tracking event history for externally shipped orders"

The more specific the description, the more reliably the orchestrator routes user requests to the right agent. Refine the description after testing: it's a normal part of the testing and validation process, not a one-time setup step.
