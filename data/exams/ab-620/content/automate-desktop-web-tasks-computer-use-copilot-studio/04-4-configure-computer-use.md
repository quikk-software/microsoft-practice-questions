---
title: "Configure computer use as an agent tool"
url: "https://learn.microsoft.com/en-us/training/modules/automate-desktop-web-tasks-computer-use-copilot-studio/4-configure-computer-use"
uid: "learn.wwl.automate-desktop-web-tasks-computer-use-copilot-studio.configure-computer-use"
module: "automate-desktop-web-tasks-computer-use-copilot-studio"
moduleTitle: "Automate desktop and web tasks with computer use in Copilot Studio"
learningPath: "learn.wwl.automate-tasks-workflows-copilot-studio"
---
# Configure computer use as an agent tool

With a clear understanding of what computer use is, how it runs, and when it fits your scenario, you're ready to put it to work. This unit covers the configuration process for adding computer use as a tool in a Copilot Studio agent, from naming the tool through selecting a machine, managing credentials, and setting access controls.

## Add computer use to your agent

Computer use is added to a Copilot Studio agent from the agent's **Tools** section by selecting **Add tool** > **New tool** > **Computer use**. Initial instructions can be provided using the available templates or a custom description before selecting **Add and configure**, which opens the full configuration page.

The configuration page is organized into sections for name, description, model, instructions, inputs, machine, stored credentials, and access control. Each section shapes how the tool behaves at runtime.

For Contoso's HR team, the configuration goal is a tool that opens the attendance system, navigates to the data entry screen, and records attendance for a specific employee. The following sections step through each configuration decision and explain what makes a good choice.

## Configure the tool identity

Three fields define how the tool is identified and invoked:

*   **Name** — Use a specific, task-oriented name rather than a generic one. "Record attendance in legacy HR system" is easier to manage and helps both the orchestrator and human reviewers understand the tool's purpose at a glance. Generic names like "Computer use 1" become hard to distinguish as you add more tools.
*   **Description** — Write this for the orchestrator, not for humans. Copilot Studio uses AI-powered orchestration to decide which tool to invoke, and the description is what it reasons from. Be specific about what the tool does and the conditions under which it applies: "Use this tool to enter employee attendance records in the Contoso legacy HR attendance system when a user submits a daily attendance update."
*   **Model** — Choose based on task complexity and cost. More capable models handle complex or ambiguous UIs more reliably but consume more Copilot Credits per step. For the current list of available models and their status, see the [Computer use documentation](/en-us/microsoft-copilot-studio/computer-use).

Note

Model selection is also a cost decision. Each step the agent takes consumes **Copilot Credits**: 5 credits per step for standard models, and 15 credits per step for premium models. A 4-step task costs 20 credits at standard rates, or 60 at premium rates. For high-volume deployments, the difference adds up quickly.

> **Contoso HR example (tool identity):**
> 
> *   **Name:** Record attendance in legacy HR system
> *   **Description:** Use this tool to enter employee attendance records in the Contoso legacy HR attendance system when a user submits a daily attendance update.

## Write effective instructions

Instructions are the most critical configuration decision you'll make. The AI model uses them to reason about what to do on screen, step by step, starting from a clean machine state. Vague instructions produce unreliable results. Specific instructions with exact URLs, field labels, and action sequences produce consistent, repeatable outcomes.

Write instructions as if explaining the task to someone with no prior knowledge of the system:

*   Name every screen, button, and action in sequence
*   Include the full URL of any target website or the exact name of any desktop application
*   Format multistep tasks as a numbered list

When part of the task changes with each run (such as the employee ID or attendance date), define those values as **Inputs** rather than hardcoding them. Inputs are named values the model substitutes at runtime, so a single set of instructions can handle different employees or dates without any changes.

Two additional techniques improve reliability:

*   **Authorize the model to proceed** — End your instructions with "Proceed with each step without asking for confirmation." This reduces unnecessary human supervision pauses on steps where the agent has enough context to continue.
*   **Add fallback language** — Account for UI variability with conditional steps: "If the Submit button is not visible, scroll down until it appears and then select it." Instructions that handle variability produce more consistent results than instructions that assume a perfect screen state on every run.

> **Try it yourself:** Think of a repetitive task in your organization where someone opens an application and enters data the same way every day. Sketch out the instructions for that task. What's the URL or application name? What are the steps in sequence? What values change from run to run? Then compare your sketch to the Contoso HR example below.

> **Contoso HR example (instructions and inputs):**
> 
> **Instructions:**
> 
> 1.  Open `https://hr.contoso.com/attendance` and sign in.
> 2.  Select **New Entry** from the navigation menu.
> 3.  In the **Employee ID** field, enter {employeeId}.
> 4.  In the **Date** field, enter {attendanceDate}.
> 5.  Set the **Status** field to {attendanceStatus}.
> 6.  Select **Submit entry**.
> 
> **Inputs:** `employeeId`, `attendanceDate`, `attendanceStatus`

Testing and refining instructions is an iterative process. Start with a first draft, run a test, observe where the model hesitates or makes an unexpected choice, and tighten the language to close those gaps.

Important

**Computer use is not idempotent**: if the tool runs twice for the same task, it may submit data twice. For tools that write to a system — creating records, submitting forms, or sending data — build a pre-check into the instructions: "Before entering data, check whether an entry with this employee ID and date already exists. Only proceed if no matching entry is found." For high-stakes or irreversible submissions, use the human supervision feature as a confirmation gate before the final submit action.

## Select a machine

Computer use requires a Windows machine. Three options are available.

The **hosted browser** is a quick-start option for early experimentation. It's a Microsoft-managed browser environment that requires no setup and supports basic web automation using Microsoft Edge. It isn't designed for production use and doesn't support custom desktop applications or organization-specific resources.

Tip

**Cloud PC pool** (powered by Windows 365 for Agents) is the recommended option for most scenarios. Cloud PC pools provision automatically without any infrastructure setup, are Entra joined and Intune enrolled, and support work or school account access to organizational resources like Microsoft 365 and SharePoint. To evaluate Cloud PC pools before committing to a billing plan, each tenant receives up to two free pools and 50 hours of free usage for published agents running autonomously.

Note that Cloud PC pools are currently in preview and not recommended for production use.

When you create a Cloud PC pool from the **Machines** section of the tool configuration, provisioning can take up to 30 minutes. Use the **Refresh** button to check its status.

Also in the **Machines** section, the **Credentials to use** setting determines whose credentials are used when the tool runs. The default, **Maker-provided credentials**, uses the maker's connection for all runs. If the agent is shared, all users can act with the maker's machine access, which may not be appropriate depending on the scenario. **End user credentials** require each user to have their own access to the configured machine.

### Bring your own machine

If the task requires a specific machine environment (for example, installed line-of-business software, existing registered infrastructure, or specific compliance configurations), you can register an existing Windows machine instead. The machine must have Power Automate for desktop version 2.61.132.25266 or later installed. After registering the machine through the Power Automate portal, navigate to the machine's settings and turn on **Enable for computer use**.

Important

Enabling computer use on a machine disables its desktop flow functionality. Any existing desktop flow automation running on that machine will stop. Dedicate a machine to computer use rather than enabling it on a machine that already runs desktop flows.

One key difference with a registered machine is run scheduling. When the machine is already running a computer use task, subsequent run requests queue and execute sequentially. For the Contoso HR scenario, a Cloud PC pool is the simpler starting point: the attendance system is a web portal, so no specialized installed software or existing machine registration is required.

## Secure credentials and control access

### Credentials

If the target website or application requires a sign-in, configure credentials in the **Stored credentials** section. When a sign-in prompt appears during a run, computer use uses the stored credentials to authenticate automatically.

Note

Keep credentials out of instruction text. Instructions are visible in logs and test output. Configure sign-in details in **Stored credentials** instead.

Two storage options are available:

*   **Power Platform internal storage** — No preconfiguration required. Provide a username, password, and the login domain (for websites) or application name (for desktop apps). The password is encrypted and stored in Power Platform.
*   **Azure Key Vault** — The better choice for production scenarios where credentials need central management and independent rotation. Configure the Azure subscription, resource group, and key vault details first, then reference secret names instead of storing password values directly.

For the Contoso HR scenario, the service account credentials for the attendance portal at `hr.contoso.com` can be configured using either approach. In a production deployment, Azure Key Vault keeps the credentials independently managed and auditable.

### Access control

By default, computer use can interact with any website or application on the machine. Access control lets you define an allow list of specific URLs and application names that the model is permitted to interact with.

Important

Configure access control as part of every tool setup. If the model navigates to an unexpected page during execution, access control limits the potential impact by preventing interactions outside the allow list. Enter website addresses using wildcards for subdomains (for example, `*.contoso.com` covers all Contoso subdomains). Note that access control restricts interaction, not navigation: the model can still open an unlisted site, but any attempt to interact with it fails.

For the Contoso HR scenario, you'd add `hr.contoso.com` to the website allow list. This ensures the agent interacts only with the attendance system, even if screen navigation takes it elsewhere.

## Test and refine the tool

After saving the configuration, select **Test** to launch the test experience. The left panel displays a step-by-step log of the tool's reasoning and actions. The right panel shows a preview of what's happening on the machine. When the run completes, a **Test completed** message appears.

If the result doesn't match your expectations, return to the configuration page and update the instructions. Add more specificity where the model hesitated or made an unexpected choice. Testing and refining is an iterative process. Each round produces a more reliable tool.

With the tool configured and tested, the next unit covers how to monitor execution once the agent is published.
