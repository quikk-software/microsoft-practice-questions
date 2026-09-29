---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/6-knowledge-check"
uid: "learn.wwl.deliver-rich-agent-responses-adaptive-cards-copilot-studio.knowledge-check"
module: "deliver-rich-agent-responses-adaptive-cards-copilot-studio"
moduleTitle: "Deliver rich agent responses using Adaptive Cards in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Module assessment

1.

A maker adds an image to a message node in Microsoft Copilot Studio, but the image doesn't appear when the agent is tested. What is the most likely cause?

The image file format isn't supported by Copilot Studio.

The image URL points to a file hosted on an internal server that requires authentication.

Images can only be added through the Adaptive Card designer, not directly in the message node.

2.

A maker configures an Ask with Adaptive Card node and gives each input element a generic ID such as 'field1', 'field2', and 'field3'. What problem does this create downstream in the topic?

Copilot Studio won't generate output variables for input elements with generic ID values.

The output variables are created with names like 'Topic.field1', which are difficult to identify and reference correctly in conditions and message nodes.

The card fails to render because input element IDs must follow a specific naming convention.

3.

A maker designs an Adaptive Card that renders correctly in the Copilot Studio test pane but fails to display in Microsoft Teams when the agent is published. What is the most likely explanation?

The card was designed in the built-in Adaptive Card designer, which produces a different JSON format than Teams expects.

The card uses element types or properties that the Teams channel doesn't support, so those elements fail silently or the card falls back to plain text.

Teams requires Adaptive Cards to be published through a separate Teams app before they can render in a deployed agent.

4.

A maker wants to display multiple product results as Adaptive Cards in a single message node. Each result should appear side by side so users can browse through them. Which layout option should the maker choose?

List layout, because it arranges multiple cards vertically for easy comparison.

Carousel layout, because it arranges multiple cards horizontally and lets users scroll through them one at a time.

The Adaptive Card designer doesn't support multiple cards in a single message node.

5.

A maker needs to collect three related fields from a user — leave type, start date, and end date — in a single topic interaction. Which node should the maker use?

Three separate Question nodes, one for each field.

An Ask with Adaptive Card node with three input elements and a Submit button.

A message node with an embedded Adaptive Card, because informational cards can also collect input.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
