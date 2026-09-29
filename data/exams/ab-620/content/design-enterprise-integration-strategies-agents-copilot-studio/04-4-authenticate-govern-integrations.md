---
title: "Authenticate and govern agent integrations"
url: "https://learn.microsoft.com/en-us/training/modules/design-enterprise-integration-strategies-agents-copilot-studio/4-authenticate-govern-integrations"
uid: "learn.wwl.design-integration-strategies-agents-copilot-studio.authenticate-govern-integrations"
module: "design-enterprise-integration-strategies-agents-copilot-studio"
moduleTitle: "Design integration strategies for agents in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Authenticate and govern agent integrations

With the action patterns mapped, the next question is how those connections are secured, and whether your organization even permits them. Every integration type has its own authentication model, and the model you choose affects more than just security: it determines which channels you can publish your agent to, whether your users need their own credentials, and whether governance policies in your environment allow the connection at all. Authentication and governance decisions need to happen at design time, not after you've built a working solution.

The Woodgrove Bank IT architecture team faces both dimensions of this challenge. The IT service desk agent must call the bank's IT service management system using a shared service account. Individual users don't have their own credentials for that system. The same agent also sends Teams notifications on behalf of the employee. Those messages should appear from the individual user's identity, not from a shared service account. Two integrations, two different authentication models. Meanwhile, when the maker tries to add a premium connector for the bank's software asset management system — needed to let the agent look up software license assignments during IT requests — they immediately hit a policy block. A reminder that governance constraints are as real as technical ones.

## User-provided vs. maker-provided credentials

When a user interacts with your agent and the agent calls a connector tool, that call needs a valid set of credentials. By default, connectors use **user-provided credentials**: each user authenticates to the connected service using their own account. This approach ensures the agent can only surface data the specific user is permitted to see — a key principle for data access control in enterprise environments.

In some scenarios, individual users don't have credentials for the target system, or all users should operate under a single shared identity. In these cases, you can switch to **maker-provided credentials**, where the agent uses the maker's own connection for all users. Because all calls run under a single identity, the maker's permissions govern what data everyone can access through the agent.

Important

Maker-provided credentials require the agent to be deployed on an **authenticated channel**. You can't publish an agent that uses maker credentials to anonymous channels.

The Woodgrove IT service desk agent illustrates why both models can coexist in the same agent. The bank's IT service management system uses a shared service account. No individual logins exist for users, so maker-provided credentials are the right choice for that integration. The Teams connector, by contrast, sends notifications on behalf of the employee. User-provided credentials keep that action tied to the current user's identity, ensuring messages appear to come from them rather than a shared service account.

> **Guiding question:** For each integration you're planning, ask: should the agent act on behalf of the current user, or always act with a shared service account? Your answer determines whether to use user-provided or maker-provided credentials, and whether your agent can be published to unauthenticated channels.

## Authentication models by integration type

The connector credential model is one dimension of authentication. Each integration type also supports specific authentication protocols. The following table maps authentication options across the primary integration types.

Integration type

Supported authentication options

**Power Platform connectors**

Microsoft Entra ID–based connections; user-provided or maker-provided credentials

**REST API tools**

None, API key (header or query parameter), OAuth 2.0

**MCP servers**

None, API key, OAuth 2.0 (three flows)

**Azure AI Search**

Access key, client certificate, service principal, Microsoft Entra ID Integrated

**Copilot connectors (knowledge)**

Require `ExternalItem.Read.All` scope when publishing to an authenticated channel

For MCP servers, the three OAuth 2.0 flows offer progressively more configuration control. **Dynamic discovery** is the simplest option: the client automatically discovers endpoints and registers with the identity provider using the discovery mechanism. **Dynamic** requires you to supply the authorization and token endpoints manually, but still handles client registration dynamically. **Manual** gives you full control, requiring explicit configuration of the client ID, client secret, authorization URL, token URL, refresh URL, and scopes.

REST API tool authentication is straightforward: choose none, an API key passed in a header or a query parameter, or OAuth 2.0. The authentication type must match what the target API supports.

## Governance through data loss prevention policies

Authentication at the integration level is only part of the picture. At the environment level, Power Platform data loss prevention (DLP) policies govern which connectors and connector actions are available at all. Admins configure DLP policies by classifying each connector into one of three data groups: **Business**, **Non-business**, and **Blocked**. Connectors classified as Blocked can't be used by any agent in that environment. Business and Non-business connectors can each be used individually, but they can't be combined — an agent can't use connectors from both groups together.

DLP enforcement in Copilot Studio operates in real time. When a maker attempts to add a blocked connector, they see an error immediately. This means a connector available in one environment may not be available in another. If you validate integration choices in a test environment, confirm those same connectors are permitted in the production environment before you build against them.

When a needed connector is blocked, the maker needs to work with their admin to reclassify it under the appropriate data group, or evaluate an alternative pattern. For example, if a prebuilt connector is blocked, a REST API tool or MCP server connecting to the same underlying service may be a viable alternative, depending on whether those patterns fall outside the restricted classification.

DLP policies govern connector availability, but admins have a second governance lever at the credential level: the **Control maker-provided credentials** setting in the Power Platform admin center. When this control is enforced across an environment, makers can no longer configure tools to use their own credentials. In this case, all tool connections must be authenticated by the end user at runtime, ensuring that the agent can only act within the bounds of each user's own account permissions. This control is especially relevant in environments where shared service accounts might otherwise give end users broader data access than their roles allow.

The Woodgrove Bank maker discovers the importance of governance considerations directly: their first attempt to add a premium connector for the software asset management system is blocked by the organization's DLP policy. Rather than discovering this limitation after building the solution, catching it at design time lets the team evaluate alternatives — such as a REST API tool pointing to the same service's API endpoint, depending on whether that pattern falls outside the restricted classification in their environment.

Note

Validate that your chosen connectors are permitted in the target environment before designing your integration. Finding a blocked connector after building a solution creates significant rework.

## Authentication and the Teams channel

One additional constraint applies specifically to agents deployed to Microsoft Teams. When an agent uses custom Active Directory (AD) authentication, single sign-on (SSO) isn't supported for connectors in that configuration. Users must authenticate to each connector manually, even if SSO is otherwise available in the chat interface.

If you're designing an agent for Teams deployment that also uses connectors, account for this during the design phase. Authentication that works as expected in the web chat channel may behave differently for Teams users.
