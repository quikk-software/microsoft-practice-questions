---
title: "Introduction to approval flows"
url: "https://learn.microsoft.com/en-us/training/modules/build-approval-flows/1-introduction"
uid: "learn-bizapps.build-approval-flows.1-introduction"
module: "build-approval-flows"
moduleTitle: "Build approval flows with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Introduction to approval flows

Approval flows let you route work items to one or more reviewers, capture their decisions, and automatically take the next action, all without manual follow-up. Whether you're reviewing documents, processing requests, or enforcing a compliance step, approval flows replace email chains with a structured, auditable process.

## The Approvals connector

Power Automate includes a built-in **Approvals connector** that manages the full lifecycle of an approval request. It's a standard-tier connector, included in Microsoft 365 licenses at no extra cost.

Unlike most connectors, the Approvals connector has no trigger, so it can't start a flow on its own. Instead, you use approval _actions_ as steps inside a flow that's triggered by something else, such as a new file in SharePoint or a new row in Dataverse. Four actions are available:

*   **Create an approval**: starts an approval process without waiting for a response. Pair it with **Wait for an approval** when you need the flow to pause until the approval resolves.
*   **Start and wait for an approval**: starts the approval and pauses the flow until all required responses arrive. This is the most common action for straightforward approval scenarios.
*   **Start and wait for an approval of text**: similar to the previous action, but lets approvers view and edit a block of text before responding.
*   **Wait for an approval**: used with **Create an approval** to resume the flow once the approval is complete.

## Approval types and responses

When you configure an approval, you choose a response type:

*   **Approve/Reject**: approvers see Approve and Reject buttons. Require a unanimous decision with **Everyone must approve**, or accept the first response with **First to respond**.
*   **Custom responses**: define your own options, such as _Needs revision_ or _Escalate_, giving you more control over how the flow branches afterward.

After an approver responds, the flow resumes and the **Outcome** field becomes available as dynamic content. A condition step reads that outcome and routes the flow to the appropriate branch — for example, keeping an approved document in place or moving a rejected one to a separate folder.

## What you'll build

In this module, you build two types of process automation:

*   An **approval flow** that routes new SharePoint documents for review and moves rejected documents to a separate folder.
*   A **business process flow** that guides users through a structured, multi-stage process in a model-driven app, including a branching version that adapts based on conditions.
