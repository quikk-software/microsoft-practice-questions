---
title: "Connect a Microsoft Fabric Data agent"
url: "https://learn.microsoft.com/en-us/training/modules/build-multi-agent-solutions-connected-agents-copilot-studio/5-connect-fabric-data-agent"
uid: "learn.wwl.build-multi-agent-solutions-connected-agents-copilot-studio.connect-fabric-data-agent"
module: "build-multi-agent-solutions-connected-agents-copilot-studio"
moduleTitle: "Build multi-agent solutions using connected agents in Copilot Studio"
learningPath: "learn.wwl.design-build-multi-agent-solutions-copilot-studio"
---
# Connect a Microsoft Fabric Data agent

Organizational data is often the difference between an agent that gives general answers and one that gives accurate, specific answers. Microsoft Fabric Data agents bridge conversational interfaces and enterprise data—translating natural language questions into database queries that return structured answers. This unit covers how to connect one to your orchestrator, what to configure for accurate routing, and what governance considerations to address before enabling it for users.

## What Fabric Data agents bring to your solution

A Fabric Data agent is a conversational analytics agent published in Microsoft Fabric. It translates natural language questions into queries against OneLake data sources (warehouses, lakehouses, Power BI semantic models, and KQL databases), executes those queries, and returns structured answers.

The translation uses three query languages depending on the data source:

*   **SQL**: for lakehouses and warehouses
*   **DAX**: for Power BI semantic models
*   **KQL**: for KQL databases

From the orchestrator's perspective, connecting to a Fabric Data agent means the solution can answer highly specific data questions (like total spend with a specific supplier across all business units this quarter) without the maker needing to build a SQL query tool or a custom data integration.

In the Fabrikam scenario, the Finance team has published a Fabric Data agent over Fabrikam's procurement spend and supplier performance data. Connecting it to the vendor management agent means the orchestrator can answer spend and supplier performance questions using natural language, with the Fabric Data agent handling all query translation and execution.

Note

Connecting to Microsoft Fabric Data agents is a preview feature not meant for production. Confirm feature availability in your environment before building production solutions that depend on this integration.

## Prerequisites

Before connecting a Fabric Data agent, the following must be in place:

*   **Microsoft Fabric connection**: A Fabric connection must exist in the Power Platform environment, or you'll create one during the connection flow. This connection authenticates Copilot Studio to Fabric.
*   **F2 or higher Fabric capacity**: The Fabric environment must be running on F2 or higher Fabric capacity, or Power BI Premium P1 or higher, with Fabric enabled on the capacity.
*   **Published Fabric Data agent**: A Fabric Data agent must already be published in Fabric. The agent must be accessible to the maker connecting to it.

## Connect a Fabric Data agent to the orchestrator

1.  Open the orchestrator agent in Copilot Studio.
2.  On the **Agents** page, select **Add an agent**.
3.  Select **Connect to an external agent**.
4.  Select **Microsoft Fabric** as the connection type.
5.  Create a new Fabric connection or select an existing one:
    *   To create a new connection, provide Fabric credentials to authenticate the connection.
    *   To use an existing connection, select it from the list.
6.  From the list of available Fabric Data agents, select the agent you want to connect to.
7.  Review and adjust the agent's **description** to accurately scope the data domain this agent covers. A precise description is especially important here, as covered in the next section.
8.  Select **Add agent** to complete the connection.

## Write descriptions for data-specific routing

Because a Fabric Data agent answers questions about a specific data domain, its description must reflect that domain's scope precisely. A description like "Answers data questions" is too broad and will attract queries that belong to other agents.

For the Fabrikam spend agent, a description like "Provides procurement spend totals, contract values, and supplier purchasing trends from Fabrikam's procurement data" sets a clear expectation: this agent answers questions about spend and supplier data, not contract terms, vendor risk ratings, or compliance history.

When writing descriptions for Fabric Data agents, consider:

*   **The data domain**: what subject area or business process does this data represent?
*   **The types of questions it can answer**: spend totals, supplier rankings, contract value summaries, and so on
*   **The scope boundaries**: what data does this agent _not_ cover that users might expect it to, which could cause routing overlap with other agents?

Precision in the description is particularly important for Fabric Data agents because of a routing constraint covered in the next section.

## Governance and data access considerations

Fabric Data agents enforce the requesting user's Fabric permissions. Users can only retrieve data they have access to, regardless of how the question is phrased. If a user's permissions don't include a data source the agent queries, the query returns no results or an access error, not unauthorized data.

Additionally, Microsoft Purview governance controls apply. Data Loss Prevention (DLP) policies and access restriction policies configured in Purview are respected by the Fabric Data agent. If data in a connected source is marked as confidential or restricted, Purview-enforced controls limit what the agent can surface.

For Fabrikam, the maker confirms before connecting: the procurement data warehouse is accessible from the service account used by the Fabric connection, no confidential salary or personnel data shares the same data sources as procurement spend, and Purview's policies are correctly configured to prevent accidental exposure of restricted financial data.

## Important constraint: generative orchestration only

Routing to a Fabric Data agent is only supported through generative orchestration—based on the agent's description and the orchestrator's AI evaluation of user intent. Directing users to a Fabric Data agent from a topic using an agent redirect node is not currently supported.

This constraint has a direct implication for how you design the orchestrator: any topic that currently handles spend or supplier data queries can't route to the Fabric Data agent through an explicit redirect node. Instead, those queries must reach the agent through description-based routing. This makes the description critical. It needs to be specific enough for the orchestrator to reliably match spend and supplier queries to this agent without topic-level assistance.
