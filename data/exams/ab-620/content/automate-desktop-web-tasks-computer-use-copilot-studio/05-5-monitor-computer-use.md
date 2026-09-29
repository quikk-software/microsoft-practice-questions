---
title: "Monitor and supervise computer use execution"
url: "https://learn.microsoft.com/en-us/training/modules/automate-desktop-web-tasks-computer-use-copilot-studio/5-monitor-computer-use"
uid: "learn.wwl.automate-desktop-web-tasks-computer-use-copilot-studio.monitor-computer-use"
module: "automate-desktop-web-tasks-computer-use-copilot-studio"
moduleTitle: "Automate desktop and web tasks with computer use in Copilot Studio"
learningPath: "learn.wwl.automate-tasks-workflows-copilot-studio"
---
# Monitor and supervise computer use execution

Configuring a computer use tool is the first half of the work. Once an agent is running — whether it's entering attendance records in a legacy system like Contoso's or automating any other UI task — the next question is whether it executed as expected, and what to do when it didn't. This unit covers how to review run activity, investigate unexpected behavior, and configure logging to support production operations.

## Review run activity

After a computer use tool executes, the **Activity** section of your agent is the starting point for understanding what happened. Select a run to open its details page, where you can switch between two views: the **Activity map** and the **Transcript**.

The activity map presents a visual overview of the steps the agent took, including reasoning messages and tool invocations. The transcript view provides a step-by-step log of each action the computer use tool performed, complete with the model's reasoning and screenshots at each step. Together, these views give you a complete picture of the run: what the agent decided and what it actually did on screen.

For the Contoso HR team, reviewing a run after the agent enters attendance records confirms whether the tool navigated to the right screen, located the correct fields, and completed the submission. If a record wasn't saved, the transcript shows exactly where execution diverged from the expected path.

Tip

Use the transcript as an instruction refinement tool. When the model hesitates, makes an unexpected choice, or takes extra steps before reaching the target element, those moments indicate where instructions are ambiguous or incomplete. Refine the specific instruction that corresponds to that step and retest.

## Use the activity map side panel

When you select a computer use action on the activity map, a side panel opens with detailed session information. This panel is available when advanced Dataverse logging is enabled for the environment (the default configuration). The panel includes the following sections:

*   **Session replay** — A series of screenshots captured during the run, with navigation controls to step through them in sequence. This is the most direct way to see what the model observed on screen at each point during execution.
*   **Activity** — A log of each action the model performed, including action type, screen coordinates, user context, timestamp, and a screenshot per step. If the model selected the wrong element, the coordinates and screenshot pinpoint exactly what it targeted.
*   **Summary** — Run-level statistics: total duration, action count, average time per action, screenshot count, human escalation count, and machine name. A run that takes significantly longer than usual or has an unexpectedly high action count may indicate the model is encountering a UI state it wasn't designed for.
*   **Websites and applications** — Every website and desktop application the model accessed during the run. For the HR scenario, you'd expect to see only the attendance portal. Any additional destination is worth investigating.
*   **Credentials used** — Which credentials were accessed during the run, supporting auditing and confirming the expected service account was used.
*   **Export session logs** — Downloads the complete session log for offline review or sharing with administrators as part of an audit trail.

## Human supervision

During execution, the computer use agent may pause and send a review request to the configured reviewer when it needs confirmation or additional information — for example, when it encounters an unexpected dialog or an ambiguous field. The agent may also pause when it detects potentially harmful instructions that could alter its behavior, such as instructions embedded in web page content. When this happens, it sends a review request via Outlook email that includes:

*   The agent name and computer use tool name
*   A link to the activity map conversation
*   The specific question or information the model needs

The reviewer responds directly in the email or inline within the activity map side panel.

Inline review cards also appear in the activity side panel, where each card marks the step awaiting review, shows the model's question, and lets the reviewer submit a response without leaving Copilot Studio.

Important

Human supervision is based on probabilistic AI model behavior. Review requests may not trigger every time a pause is warranted, and they may trigger when a pause isn't necessary. Don't treat human supervision as a safety fail-safe or as a guarantee that the model always asks before proceeding. Reviewers should never submit sensitive information such as passwords, PINs, or personal identifiers in response to a review request. If review requests occur frequently, treat that as a design signal: the instructions are likely ambiguous, or the target system is presenting unexpected UI states.

For the Contoso HR team, frequent review requests during attendance entry might mean the legacy system occasionally presents a session timeout dialog, a validation message, or a confirmation prompt the instructions don't account for. Each review request identifies exactly where the instructions need to be more specific.

> **Synthesis prompt:** Consider two monitoring approaches: real-time session review using the activity map, and long-term audit logging through Dataverse. Which matters more in your current context, and why? If you're debugging a tool that behaves inconsistently, the activity map gives you the fastest feedback loop. If you're satisfying audit or compliance requirements, Dataverse logging with Purview integration provides the durable record you need. Most production deployments eventually require both, but which you prioritize first depends on where you are in the deployment lifecycle.

## Configure advanced logging

When **Store logs in Dataverse** is enabled in the Power Platform admin center (the default), computer use logs are written to Dataverse and the detailed side panel in the activity map becomes available. To configure or verify this setting, navigate to **Settings** > **Products** > **Features** in the Power Platform admin center, then scroll to the **Computer Use** section.

Three verbosity options control how much detail the logs capture:

*   **All data**: The complete set of advanced computer use logs, including screenshots
*   **Data without screenshots**: All log data except screenshots, which reduces storage consumption when visual replay isn't required
*   **Minimal**: Currently behaves the same as **Data without screenshots**, though this behavior may change in a future release

Note

The default log retention period is seven days (10,080 minutes). For HR or compliance-sensitive scenarios, seven days may not meet your organization's data retention policy. Configure the retention period before go-live rather than after an incident. To retain logs indefinitely, enter **0** or **\-1** as the retention value.

Logs consume a combination of Dataverse database capacity, log capacity, and file storage. Factor in your verbosity setting and retention period when planning storage for production deployments.

For regulated environments, the **Send audit logs to Microsoft Purview** option provides an additional audit trail. When enabled, computer use run logs appear in Purview under the activity term **CUAOperation**. This setting is independent of the verbosity and retention configuration, so you can enable Purview integration without changing how Dataverse stores the detailed logs.

For the Contoso HR scenario, a production-ready logging configuration might include full verbosity to support dispute resolution, a retention period matched to the organization's HR data retention policy, and Purview integration if compliance requirements extend to automated agent activity.

With your monitoring configuration in place, you're ready to check your understanding of the concepts covered in this module.
