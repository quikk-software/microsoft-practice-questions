---
title: "Understand computer use in Copilot Studio"
url: "https://learn.microsoft.com/en-us/training/modules/automate-desktop-web-tasks-computer-use-copilot-studio/2-understand-computer-use"
uid: "learn.wwl.automate-desktop-web-tasks-computer-use-copilot-studio.understand-computer-use"
module: "automate-desktop-web-tasks-computer-use-copilot-studio"
moduleTitle: "Automate desktop and web tasks with computer use in Copilot Studio"
learningPath: "learn.wwl.automate-tasks-workflows-copilot-studio"
---
# Understand computer use in Copilot Studio

Before you configure computer use capabilities, it helps to understand what computer use is and how it operates at runtime.

## What computer use is

Computer use gives agents the ability to interact with web browsers and desktop applications the way a person would. Rather than connecting to an API, the agent reads the screen, reasons about what to do, and uses a virtual mouse and keyboard to select buttons, navigate menus, and type into fields.

You describe the task in natural language — no code required. The underlying AI model interprets what it sees on screen, including layouts, labels, and input fields, then decides how to proceed and carries out the actions needed to complete the task. Because it works visually, computer use doesn't require changes to the target application, special access, or integration work on the system side.

The agent works in a continuous loop: it captures a screenshot of the current screen state, reasons about what it sees and what the instructions require, and takes an action (a click, a keystroke, or a navigation step). This loop repeats until the task is complete or the agent needs human input. Because each cycle starts fresh from a new screenshot, the agent can adapt when a page layout shifts or an unexpected dialog appears, rather than failing when a specific element isn't where a recorded script expects it.

## How computer use runs

Computer use operates within an agent's orchestration layer. Once triggered, it runs on a configured Windows machine and executes through a perception-reasoning-action loop until the task is complete or requires human input. Two deployment patterns shape how visible that execution is to end users.

### Autonomous and conversational execution

Computer use works best in **autonomous agent scenarios**, where the agent performs tasks in the background without direct user interaction. The agent receives its instructions, runs the task on a configured machine, and logs its activity without requiring someone to be present.

You can also use computer use in conversational scenarios, where users interact with the agent through a channel like Microsoft Teams. In that case, the agent shares its reasoning messages and screenshots of the machine's activity directly in the chat. This visibility can add transparency, but it requires careful design consideration, especially around what users see during execution and how credentials and access are managed.

For recurring automation tasks like data entry, form submission, and cross-system workflows, the autonomous approach is the more practical choice.

### Human oversight during a run

When the computer use agent needs confirmation or additional information during a run, it can pause and send a review request to the configured reviewer via Outlook email. The reviewer can respond by email or inline through the agent's activity map.

Important

Human review requests are triggered by probabilistic AI model behavior. They may not trigger in every situation where a pause would be appropriate, and they may trigger when one isn't needed. Don't rely on human supervision as a safety guarantee. Reviewers should apply judgment and avoid submitting sensitive information such as usernames, passwords, or other credentials in response to review requests.

Human supervision is useful for edge cases, moments when the agent needs more context to proceed correctly. It's a support mechanism, not a failsafe, and shouldn't substitute for clear instructions and appropriate access controls.

## Model options

Computer use is powered by vision-language AI models that interpret screenshots and translate that understanding into actions. When you configure a computer use tool, you select which model drives the agent's reasoning. Multiple models are available, spanning both generally available and experimental options. Models differ in capability and cost — more capable models may handle complex or ambiguous tasks more reliably, but consume more Copilot Credits per step. For the current list of supported models and their status, see [Computer use in Microsoft Copilot Studio](/en-us/microsoft-copilot-studio/computer-use).

Note

Some models require your administrator to enable [access to external models](/en-us/power-platform/admin/allow-llm-generative-responses) for your Power Platform environment.

With a clear picture of what computer use is and how it operates at runtime, the next step is evaluating whether it's the right tool for a given scenario.
