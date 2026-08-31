---
title: "Explore plans and the AI agents that power them"
url: "https://learn.microsoft.com/en-us/training/modules/turn-business-ideas-power-platform-solutions-plans/2-explore-plans-ai-agents"
uid: "learn.wwl.turn-business-ideas-power-platform-solutions-plans.explore-plans-ai-agents"
module: "turn-business-ideas-power-platform-solutions-plans"
moduleTitle: "Turn business ideas into Power Platform solutions with Plans"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Explore plans and the AI agents that power them

Plans is a Copilot-first development tool in Power Apps that lets you create comprehensive business solutions from a natural language description. Rather than starting with a blank app or an empty data model, you describe what your business needs and Plans generates the building blocks of a complete solution. To use Plans, your environment needs a Dataverse database, enabled Copilot features, and an eligible locale.

![Screenshot of the Plans landing page in Power Apps.](media/plans-overview-landing-page.png)

The tool can generate:

*   **Microsoft Dataverse tables** with columns, data types, and relationships
*   **Canvas apps** for task-focused user experiences
*   **Model-driven apps** for data-heavy management scenarios
*   **Power Pages sites** for external-facing portals
*   **Power Automate flows** for automation and approvals
*   **Copilot Studio agents** for conversational interfaces

For Contoso's PTO scenario, this means describing the time-off request problem once and getting a proposed set of tables, an employee-facing app, a manager approval flow, and an HR dashboard—all generated from that single description.

## Meet the three AI agents

Plans uses three specialized AI agents that work in sequence to analyze your business problem and design a solution. Each agent focuses on a different aspect of the solution.

### Requirement Agent

The Requirement Agent is the first to run after you enter your prompt. It examines your business problem and generates **user roles** and **user needs** (similar to user stories). For Contoso's scenario, the Requirement Agent might identify roles like Employee, Manager, and HR Administrator, each with specific needs such as "Employee needs to submit a time-off request" or "Manager needs to approve or reject requests from direct reports."

![Screenshot of the Plans interface showing generated user roles and user needs.](media/requirements-generated.png)

### Data Agent

After requirements are defined, the Data Agent suggests a set of **Dataverse tables** to store the business information. It recommends columns, data types, and relationships between tables. For the PTO scenario, the Data Agent might propose tables for Time Off Requests, Employees, and PTO Balances, with relationships linking requests to the employees who submitted them.

![Screenshot of the Plans interface showing the Data Agent's proposed tables with the Show details option.](media/data-agent-show-details.png)

### Solution Agent

The Solution Agent evaluates the requirements, processes, and data model to create a **technology proposal**. It recommends which Power Platform components to use and maps them to the user roles and data tables. For Contoso, the Solution Agent might propose a canvas app for employees, a model-driven app for HR, a cloud flow for the approval process, and a Copilot Studio agent for answering PTO balance questions.

![Screenshot of the Plans interface showing the Solution Agent's technology proposal tiles.](media/technology-proposed.png)

At each step, you review the output and can refine it, either through inline editing or by giving natural language feedback to Copilot. The agents also appear in the command bar alongside any human collaborators, so you can see which agent is currently working.
