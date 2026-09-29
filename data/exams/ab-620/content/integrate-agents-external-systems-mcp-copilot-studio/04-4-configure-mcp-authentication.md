---
title: "Configure authentication for MCP server connections"
url: "https://learn.microsoft.com/en-us/training/modules/integrate-agents-external-systems-mcp-copilot-studio/4-configure-mcp-authentication"
uid: "learn.wwl.integrate-agents-external-systems-mcp-copilot-studio.configure-mcp-authentication"
module: "integrate-agents-external-systems-mcp-copilot-studio"
moduleTitle: "Integrate agents with external systems via MCP in Microsoft Copilot Studio"
learningPath: "learn.wwl.integrate-agents-enterprise-systems-copilot-studio"
---
# Configure authentication for MCP server connections

After completing the server name, description, and URL in the onboarding wizard, the maker at Woodgrove Bank faces the next decision: how the agent authenticates with WoodgroveCore. Authentication determines not just whether the connection succeeds, but how credentials are scoped — whether each user authenticates independently or a shared credential is used. The right authentication type depends on what the server supports and what your security requirements are.

## Choosing an authentication type

Copilot Studio offers three authentication types for MCP server connections: **None**, **API key**, and **OAuth 2.0**. These options represent a spectrum from no credential check to identity provider–enforced per-user authorization.

Authentication type

How it works

When to use

**None**

The agent connects without credentials.

Fully trusted or internal servers where network-level controls are sufficient. Not appropriate for servers exposing sensitive or regulated data.

**API key**

Each user provides their own key on first use; the agent reuses it for the session. Credentials are user-scoped, not embedded in the configuration.

Servers requiring a secret key, where per-user credential scoping is acceptable.

**OAuth 2.0**

Authentication is delegated to an identity provider. Users sign in through an authorization flow; the agent receives a user-scoped token.

Production workloads requiring strong identity guarantees and integration with existing access management infrastructure.

Think of the three options as a trust hierarchy: **None** trusts the network perimeter, **API key** trusts the user's own secret, and **OAuth 2.0** trusts the identity provider to verify who the user is. For production workloads with sensitive data, API key or OAuth 2.0 is appropriate. OAuth 2.0 is the stronger choice when the server and identity provider support it.

## API key authentication

When you select **API key**, two configuration fields appear. Together, they tell the agent how to deliver the key. They don't contain the key itself.

The **Type** field controls where the key is sent with each request:

*   **Header**: The key is included in the HTTP request header. This is the more common option and is typically more secure than query parameters.
*   **Query**: The key is sent as a URL query parameter. Use this when the server's documentation requires it.

The **Parameter name** field specifies the name of the header or query parameter where the key should appear. If the server expects the key in a header named `x-api-key`, enter `x-api-key`. The parameter name must match exactly what the server expects.

The security principle behind this design is worth understanding: **you're not embedding a credential in the configuration**. The actual key value is never set by the maker in the connection settings. When users interact with the agent for the first time, they're prompted to provide their own API key. The agent uses that user-scoped key for subsequent calls. Each user authenticates independently. The agent doesn't hold a single credential that returns all users' data under one identity.

For WoodgroveCore, the server owner has documented the requirement: API key authentication, delivered via a request header named `x-cs-apikey`. The maker selects **API key** as the authentication type, selects **Header**, and enters `x-cs-apikey` as the parameter name. Every Woodgrove Bank user who invokes the account opening agent provides their own key on first use, and the agent reuses it throughout their session.

## OAuth 2.0 authentication

When you select **OAuth 2.0**, you choose a sub-type that matches what your server and identity provider support. The sub-type isn't a preference. It's determined by the server you're connecting to.

### Dynamic discovery

**Dynamic discovery** is the simplest OAuth 2.0 sub-type. Select it when the MCP server supports **OAuth 2.0 Dynamic Client Registration (DCR)** with a discovery endpoint. The agent uses that endpoint to automatically locate the authorization and token endpoints, and registers itself with the identity provider without manual input from the maker.

This eliminates the need to know the server's specific OAuth endpoint addresses in advance. For teams deploying MCP servers that support DCR with discovery, this is the preferred OAuth 2.0 path, as it minimizes configuration and removes the dependency on the identity provider's administrator during setup.

### Dynamic

Select **Dynamic** when the server supports DCR but doesn't expose a discovery endpoint. The maker manually provides the **Authorization URL** and **Token URL template**. After you select **Create**, a callback URL may appear. This callback URL is the address Copilot Studio generates for the identity provider to return the authorization code after the user signs in. If it appears, copy it and provide it to your identity provider administrator for registration.

Dynamic requires slightly more configuration than dynamic discovery, but the agent still handles client registration automatically. It's the right option when your server supports DCR without a discovery endpoint.

### Manual

Select **Manual** when the identity provider doesn't support Dynamic Client Registration. The maker provides: **Client ID**, **Client secret**, **Authorization URL**, **Token URL template**, **Refresh URL**, and optionally, **Scopes**. These are the credentials and endpoint addresses the agent needs to authenticate users on behalf of the registered application.

Manual configuration requires coordination with the identity provider's administrator before you begin. The administrator registers the application, issues the client ID and client secret, and provides the endpoint addresses. After you select **Create**, a callback URL appears — register it with your identity provider. Without this step, the authorization flow won't complete.

Use this hierarchy to choose among the three sub-types:

1.  Start with **Dynamic discovery** if the server supports DCR with a discovery endpoint.
2.  Use **Dynamic** if the server supports DCR without a discovery endpoint.
3.  Use **Manual** only when the identity provider doesn't support DCR.

> **Guiding question:** When evaluating an MCP server for production use, what authentication requirements should you ask the server owner about before you begin configuration? Consider what information you'd need to select among the three types (and among the three OAuth 2.0 sub-types) before opening the onboarding wizard.

## Creating the connection

Once you've selected and configured the authentication type, select **Create** to finalize the MCP server configuration. Copilot Studio then presents the **Add tool** dialog, where you create a new connection or select an existing one for this server.

The connection represents the authenticated link between your agent and the MCP server. When you deploy the agent to end users, each user is typically prompted to authenticate with their own credentials the first time they invoke an MCP tool. Users can provide their API key or complete the OAuth authorization flow at that point.

Select **Add to agent** to complete the process. The server now appears in the agent's **Tools** list, and the tools it exposes are available for the orchestrator to invoke.
