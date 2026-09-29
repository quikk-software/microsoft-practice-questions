---
title: "Summary"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/6-summary"
uid: "learn.wwl.take-action-agent-conversations-topics-tools-copilot-studio.summary"
module: "take-action-agent-topics-tools-flows-copilot-studio"
moduleTitle: "Take action from agent conversations using topics and tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Summary

Adatum's customer service agent can now do more than answer questions. It checks live order status from Dynamics 365, triggers a multi-step refund workflow, and retrieves real-time shipment tracking from a carrier API that has no prebuilt connector. Each capability came from connecting agent topics to external systems using three distinct integration patterns.

## What you learned

*   **Add tools to a topic**: Tools, like the connector tool, extend a topic to perform specific actions in external systems at a defined point in the conversation. The Adatum order status scenario illustrated how to map a customer's order number as a topic-level input and capture live order status in a topic variable the flow uses to route the customer.
*   **Call an agent flow from a topic**: Agent flows handle multi-step automation that a single connector action can't coordinate. The refund scenario illustrated how a topic passes order and customer data to a flow using a Tool node, then acts on the returned status code and confirmation number to close the conversation.
*   **Configure the HTTP request node**: The `Send HTTP Request` node handles integrations where no connector exists and a single API call is enough. The carrier tracking scenario illustrated how to call a REST API directly, define the response schema from sample JSON, and configure error handling so the topic responds gracefully when the API is unavailable.

## Learn more

*   [Add tools to a custom agent](/en-us/microsoft-copilot-studio/add-tools-custom-agent)
*   [Use connectors in Copilot Studio](/en-us/microsoft-copilot-studio/advanced-connectors)
*   [Call flows from topics](/en-us/microsoft-copilot-studio/advanced-use-flow)
*   [Create an agent flow as a tool](/en-us/microsoft-copilot-studio/advanced-flow-create)
*   [Use the HTTP request node](/en-us/microsoft-copilot-studio/authoring-http-node)
*   [Agent flows frequently asked questions](/en-us/microsoft-copilot-studio/flows-faqs)
