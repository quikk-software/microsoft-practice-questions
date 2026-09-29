---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/5-knowledge-check"
uid: "learn.wwl.take-action-agent-conversations-topics-tools-copilot-studio.knowledge-check"
module: "take-action-agent-topics-tools-flows-copilot-studio"
moduleTitle: "Take action from agent conversations using topics and tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Module assessment

1.

A maker wants their Copilot Studio agent to retrieve live account data from a system that already has a Power Platform connector. The data lookup should occur at a specific, defined point in the conversation flow. Which approach is correct?

Add the connector as a tool at the agent level so the AI orchestrator invokes it automatically when relevant.

Add the connector tool inside the topic using the Add a tool node, selecting the connector action at the exact step where the data is needed.

Use the Send HTTP Request node to call the connector's underlying API endpoint directly.

2.

A maker builds an agent flow that validates an order, updates a record in Dataverse, and sends an email confirmation. Testing shows the full process takes about three minutes. How should the flow be structured so it can be called from a topic without errors?

Chain all actions before the Respond to the agent action so the topic waits for the complete result before continuing.

Place the long-running actions after the Respond to the agent action so the flow returns a response immediately and continues the remaining steps in the background.

Break the flow into three separate agent flows and call each one sequentially from the topic.

3.

A maker configures the Send HTTP Request node to call a REST API using a POST request, but the API consistently returns a response indicating the operation failed, with no error code. The URL and authentication are confirmed correct. What is the most likely cause?

The HTTP method should be PATCH rather than POST for this type of operation.

The Content-Type: application/json header is missing from the request configuration.

The response schema was generated from a sample JSON that doesn't match the actual API response format.

4.

A maker needs to configure an HTTP request node that calls a REST API requiring an API key in the request header. Which approach correctly handles the API key?

Enter the API key as a literal string directly in the header value field on the topic canvas.

Store the API key in a Power Platform environment variable and reference it in the header value field.

Use a Question node to collect the API key from the end user at the start of the conversation.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
