---
title: "Create a plan and refine the requirements"
url: "https://learn.microsoft.com/en-us/training/modules/turn-business-ideas-power-platform-solutions-plans/3-create-plan-refine-requirements"
uid: "learn.wwl.turn-business-ideas-power-platform-solutions-plans.create-plan-refine-requirements"
module: "turn-business-ideas-power-platform-solutions-plans"
moduleTitle: "Turn business ideas into Power Platform solutions with Plans"
learningPath: "learn.wwl.design-model-solutions-power-platform"
---
# Create a plan and refine the requirements

With a plan created, the first thing you do is describe your business problem. Plans uses that description to generate an initial set of requirements, which you then review, refine, and approve before the agents move on to building the data model. This unit walks you through each step of that process.

## Start with a clear prompt

Creating a plan starts with describing your business problem in the plans text box. The quality of your prompt directly affects the quality of the generated solution, so it's worth taking a moment to write a good one.

An effective prompt for plans:

*   **Describes the business problem**, not just the technology you want. Instead of "Create a canvas app with a form," write "Employees need to submit time-off requests and managers need to approve them."
*   **Identifies the people involved.** Mention the roles that interact with the process, so the Requirement Agent can generate accurate user roles.
*   **Includes enough context** about the workflow. Describe what happens step by step: who initiates the process, what decisions are made, and what the expected outcomes are.
*   **Stays focused on one business problem.** Plans works best when you describe a single, well-defined scenario rather than trying to cover multiple unrelated processes.

For Contoso's scenario, a good prompt might look like this:

> _"Employees need to log vacation days by submitting a time-off request with the dates and type of leave. Managers receive the request and approve or reject it. HR administrators need visibility into PTO balances across the company and the ability to set company-wide blackout dates when time off isn't available."_

## Add context with images

You can attach images to your prompt to give plans more context. Supported image types include:

*   **Process diagrams** showing existing workflows
*   **Data models** illustrating current table structures
*   **Screenshots of legacy apps** you're replacing

These images help the agents understand your current state and generate more accurate outputs. For example, if Contoso has an existing flowchart of their approval process, attaching it gives the agents a head start on understanding the workflow.

Important

If you add predefined process diagrams, Copilot might replicate them closely rather than generating a fresh design, limiting creativity and cause duplication. Consider whether you want the AI to follow your existing process exactly or suggest improvements.

## Generate the plan

After you enter your prompt, select **Generate** to start the process. The Requirement Agent begins analyzing your business problem and produces two outputs:

*   **User roles:** The people who interact with the solution, each with a description of their responsibilities
*   **User needs:** Specific requirements for each role, similar to user stories

For Contoso, the Requirement Agent might generate roles for Employee, Manager, and HR Administrator, with needs like "Employee needs to view their remaining PTO balance" and "Manager needs to see all pending requests from their team."

## Refine the requirements

The initial output is a starting point, not a final answer. There are multiple ways to refine what the Requirement Agent produced.

### Select "Looks good"

If the requirements match your expectations, select **Looks good** to accept them and move to the next phase. The Data Agent begins generating the data model.

### Edit inline

Select **Edit** to directly modify the requirements:

*   Select a user role to change its name or description
*   Add or delete user roles
*   Add, reorder, or delete user needs within a role

### Use Copilot feedback

Select **Copilot** to provide natural language instructions for changes. This approach works well for larger adjustments. For example:

*   _"Add a user role for HR admin to monitor PTO across teams and manage payroll."_
*   _"Add a user need for employees to view PTO blackout dates."_
*   _"Remove the user need for managers to view vacation history of team members."_

After making changes with Copilot, select **Keep** to apply the changes or **Review** to see what changed before accepting.

## Review the process diagram

Plans generates process diagrams automatically after user requirements are created. These diagrams appear on the right side of the plan and show two levels of detail:

*   **Process stages:** A high-level overview of all the processes needed to address the business problem
*   **Process maps:** Detailed steps, events, and decision points for each process, with the responsible user role shown for each activity

Process diagrams use three types of nodes:

Node type

Purpose

Example

**Events**

Mark the start, middle, or end of a process

A start event triggers when an employee submits a request

**Gateways**

Represent decisions with branching paths

An exclusive gateway routes to "approved" or "rejected"

**Activities**

Represent tasks performed by a user or system

Manager reviews the request details

You can edit process diagrams by adding steps, events, or decisions, deleting nodes, and connecting nodes by dragging from one anchor to another. Changes aren't saved until you validate them.

![Screenshot of the plans interface showing a process diagram with stages and decision points.](media/view-process.png)

Tip

For small adjustments, batch three to five manual changes at a time, then validate. For larger changes (more than five), use the natural language update first—it saves time and improves AI accuracy.
