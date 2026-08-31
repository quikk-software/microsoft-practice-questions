---
title: "Create a plan from an existing solution"
url: "https://learn.microsoft.com/en-us/training/modules/turn-business-ideas-power-platform-solutions-plans/6-create-plan-existing-solution"
uid: "learn.wwl.turn-business-ideas-power-platform-solutions-plans.create-plan-existing-solution"
module: "turn-business-ideas-power-platform-solutions-plans"
moduleTitle: "Turn business ideas into Power Platform solutions with Plans"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Create a plan from an existing solution

So far in this module, you followed Contoso's journey from a business problem to a new solution. But what if you already have a solution deployed in your environment? Plans can work in reverse, generating a plan document from an existing solution.

This reverse workflow is useful when you need to:

*   **Understand** what an existing solution contains and how its components fit together
*   **Document** a solution for stakeholders who need to review it without opening Power Apps
*   **Improve** an existing solution by using the plan as a starting point for enhancements

For Contoso, imagine a different team already built an expense management solution months ago. A new functional consultant joins the project and needs to understand what's in the solution before making changes. Creating a plan from the existing solution generates a comprehensive document covering the business problem, user requirements, data model, and technologies, saving hours of manual discovery.

## Create the plan

To create a plan from an existing solution:

1.  Sign in to Power Apps at [make.powerapps.com](https://make.powerapps.com).
2.  In the left navigation pane, select **Solutions**.
3.  Select **Create plan from a solution**. You can also select a specific solution first, then choose **Commands** > **Create a plan**.
4.  Select **Select solution** and choose the solution you want to document.
5.  Select **Create plan**.

Plans analyzes the solution's components and generates a detailed plan document describing the business problem the solution addresses, the user roles involved, the data model, and the technologies used.

## What the generated plan includes

The plan document that plans creates from your solution mirrors the same structure you see when building a plan from scratch:

*   **Business problem:** a description of what the solution addresses, inferred from the components and their configuration
*   **User requirements:** the user roles and needs identified from the apps, tables, and flows in the solution
*   **Data model:** the Dataverse tables, columns, and relationships already present in the solution
*   **Technology proposal:** a summary of the apps, flows, agents, and other components that make up the solution

This generated document gives stakeholders a single reference point for understanding the solution's purpose and structure. For Contoso's expense management solution, the plan might reveal that the solution includes a canvas app for expense submission, a model-driven app for finance review, an approval flow, and three Dataverse tables — information that would otherwise require opening each component individually to piece together.

## Save the generated plan

After the plan is created, save it. Where the plan is saved depends on the solution type:

*   **Unmanaged solution**: The plan saves in the same solution it was created from.
*   **Managed solution**: The plan saves in a new unmanaged solution by default, since managed solutions can't be modified directly.

## Use the plan to improve the solution

Once you have a plan generated from an existing solution, you can use it as a starting point for improvements. The plan gives you the same editing capabilities as a plan you created from scratch — you can refine the requirements, adjust the data model, and modify the technology proposal.

For example, if Contoso's expense management solution doesn't include a Copilot Studio agent for answering employee questions about expense policies, the functional consultant can add that to the technology proposal and build it from the plan. This approach lets you enhance existing solutions with the same AI-assisted workflow you'd use to build something new.

## Limitations to keep in mind

Creating a plan from an existing solution has a few constraints:

*   The solution needs **at least one app and one associated table** for plans to generate a meaningful document.
*   Creating a plan from a **default solution** isn't recommended because default solutions contain a broad mix of components that may not represent a single coherent business process.

Tip

Use this feature during solution handoffs between teams or when onboarding new makers to an existing project. The generated plan gives newcomers a structured overview without requiring them to explore every component individually.
