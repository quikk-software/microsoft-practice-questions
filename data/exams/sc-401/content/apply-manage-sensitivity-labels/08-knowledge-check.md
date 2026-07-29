---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/apply-manage-sensitivity-labels/knowledge-check"
uid: "learn.wwl.apply-manage-sensitivity-labels.knowledge-check"
module: "apply-manage-sensitivity-labels"
moduleTitle: "Apply sensitivity labels for data protection"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Module assessment

A global consultancy firm is rolling out sensitivity labels across Microsoft 365. The project team uses a Teams team for collaboration, a SharePoint site to store client deliverables, and Power BI dashboards that combine financial projections with competitive analysis. Team members use Microsoft 365 Copilot to draft proposals from labeled source documents. A confidential board strategy meeting is scheduled for next week. The IT admin has published sensitivity labels from the Microsoft Purview portal, including **General**, **Confidential**, and **Highly Confidential**, with encryption configured on the two higher-priority labels.

Use what you learned in this module to answer questions about the firm's label rollout.

## Check your knowledge

1.

The admin applies a **Confidential** sensitivity label to the project's SharePoint site. A team member uploads an unlabeled Word document to the site's document library. What protection does that document have?

The document inherits the site's Confidential label and its encryption settings.

The document is encrypted by default because it's stored in a labeled site.

The document has no sensitivity label or encryption. Container labels protect the site, not the files inside it.

2.

A team member sends a labeled and encrypted proposal to an external client using Outlook. The client uses Gmail. What can the external recipient expect?

The client sees the label name and can open the document without restriction.

The encryption protects the content regardless of whether the client can see the label name. The client needs the right permissions to open it.

The label and encryption are stripped during transit because the client uses a non-Microsoft email provider.

3.

A consultant uses Copilot in Word to draft a summary by referencing two documents: one labeled **General** and one labeled **Highly Confidential** with encryption that includes the Extract right. What label does the generated summary receive?

The summary receives the Highly Confidential label because Copilot inherits the highest-priority label from the source content.

The summary receives the General label because it was created in a new document.

Copilot refuses to generate the summary because the source documents have different sensitivity levels.

4.

The organizer schedules the board strategy meeting in Teams and applies a **Highly Confidential** label with end-to-end encryption enabled. What operational tradeoff should the organizer be aware of?

Encryption requires all participants to have a Teams Premium license or they can't join.

Encryption prevents the meeting from being forwarded but has no other effect on features.

Encryption for meeting video and audio disables some features like recording, live captions, and breakout rooms.

5.

The IT admin needs to apply sensitivity labels to 200 existing SharePoint sites across the organization. What is the most appropriate surface for this task?

The SharePoint admin center, because it provides a central view for labeling sites at scale.

The Teams desktop client, because all sites are connected to Teams.

Outlook on the web, because Microsoft 365 Groups connect to SharePoint sites.

6.

A Power BI report builder creates a new report from a semantic model labeled **Confidential**. The builder doesn't manually apply a sensitivity label to the report. What label does the report have?

The report receives a default label from the workspace's label policy.

The report has no label because the builder didn't apply one manually.

The report automatically inherits the **Confidential** label from the semantic model.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
