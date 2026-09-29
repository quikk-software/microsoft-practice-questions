---
title: "Evaluate whether computer use fits your scenario"
url: "https://learn.microsoft.com/en-us/training/modules/automate-desktop-web-tasks-computer-use-copilot-studio/3-evaluate-computer-use-scenarios"
uid: "learn.wwl.automate-desktop-web-tasks-computer-use-copilot-studio.evaluate-computer-use-scenarios"
module: "automate-desktop-web-tasks-computer-use-copilot-studio"
moduleTitle: "Automate desktop and web tasks with computer use in Copilot Studio"
learningPath: "learn.wwl.automate-tasks-workflows-copilot-studio"
---
# Evaluate whether computer use fits your scenario

With a foundation in how computer use works, the question is whether it's the right tool for a given scenario. This unit covers where computer use fits best, the limitations and security considerations that should shape every deployment decision, and the framework for choosing between computer use and other automation options.

## Use cases for computer use

Computer use is well-suited for tasks where UI interaction is the only automation path:

*   **Legacy ERP and CRM data entry**: Systems built before modern APIs that store business-critical data but lack integration options
*   **Web forms without APIs**: External portals, vendor sites, or government services that require form submission through a browser
*   **Internal portals**: Ticketing systems, HR platforms, and attendance tools that your organization controls but can't expose via API
*   **Installed desktop applications**: Line-of-business apps, accounting software, or specialized tools that run locally on a Windows machine. Standard Windows application types (WinForms, WPF, Win32) are supported. Some types, including Citrix-hosted and Java-based apps, have limited support for features like automatic credential injection.
*   **Cross-system workflows**: Processes that move data between modern SaaS applications and legacy tools in a single end-to-end task

The common thread across these scenarios is the absence of a programmatic interface. If a person can complete the task by interacting with an application's UI, computer use can too.

For a real-world example of how this kind of automation is already being applied in production, see a [Microsoft customer story on automating enterprise workflows with Copilot Studio computer use](https://www.microsoft.com/en/customers/story/26190-graebel-dynamics-365-finance).

### Success rates and limitations

Computer use is not deterministic. The same task can yield different results on different runs, depending on how the model interprets the current screen state. Microsoft's documentation benchmarks success rates at approximately 80% for web-based tasks and 35% for desktop applications. These figures reflect the current state of the technology and are worth factoring into scenario selection.

Complex or non-standard UI elements, such as custom date pickers, dynamic dropdowns, and content that loads asynchronously, are common sources of failure. Desktop applications also have broader surface variation than web browsers, which contributes to the lower desktop success rate.

Specific, detailed instructions and thorough testing are the primary tools for improving reliability. The monitoring tools covered later in this module give you visibility into exactly where a run diverges from the expected path.

Warning

**Prompt injection is a security risk for computer use agents.** Hidden instructions embedded in web page content, form fields, or other on-screen material can attempt to redirect the agent's behavior. Because the agent reasons from what it sees on screen, it may follow instructions encountered on a visited page rather than the instructions you configured. This is a security consideration, not just a reliability concern. Configuring an access control allow list (covered in the next unit) is a primary defense, limiting the surfaces the agent can interact with and reducing the potential impact of malicious content.

## Choose between computer use and other automation options

Computer use isn't the only automation tool available in Copilot Studio. Agent flows and workflows, the preferred integration pattern for most scenarios, execute a predefined sequence of actions using Power Platform connectors and low-code logic.

The decision between them isn't about preference. It's about fit:

Scenario

Recommended approach

A connector or API exists for the target system

Agent flow or workflow

Task requires deterministic, high-throughput execution

Agent flow or workflow

No connector or API is available

Computer use

Target system requires UI interaction

Computer use

Process involves legacy applications or proprietary portals

Computer use

Workflow crosses modern SaaS tools and legacy systems

Computer use

Agent flows and workflows are faster, more reliable, and easier to maintain. When a connector exists, an agent flow or workflow is almost always the better choice. Computer use is right when UI interaction is the only path, when there's no programmatic way to reach the system.

That's the situation in Contoso's HR department. The legacy attendance system has no API and no connector. A human employee opens the application, navigates to the right screen, and types in attendance records. Computer use lets the Copilot Studio agent follow exactly that same path.

> **Reflection:** Think of a repetitive, manual process in your organization that involves opening an application and entering or retrieving data. Apply the criteria from this unit: Is there a connector or API available, or is UI interaction the only path? Is the task web-based or desktop-based, and how does that affect your confidence in the success rate? Are there sensitive credentials or web-facing surfaces that would require careful access control? Is the task well-defined and consistent enough to support reliable instructions? Based on your answers, is computer use the right fit — or would a different automation approach serve better?

With a clear sense of where computer use fits in your automation toolkit, you're ready to configure it as a tool in a Copilot Studio agent.
