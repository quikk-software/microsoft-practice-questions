---
title: "Retrieve and send data using the HTTP request node"
url: "https://learn.microsoft.com/en-us/training/modules/take-action-agent-topics-tools-flows-copilot-studio/4-configure-http-request-node"
uid: "learn.wwl.take-action-agent-conversations-topics-tools-copilot-studio.configure-http-request-node"
module: "take-action-agent-topics-tools-flows-copilot-studio"
moduleTitle: "Take action from agent conversations using topics and tools in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Retrieve and send data using the HTTP request node

Adatum's customer service agent can now check live order status using a Microsoft Dataverse connector (Unit 2) and trigger a multi-step refund workflow using an agent flow (Unit 3). The third scenario is different: a customer asks where their shipment is, and the agent needs to query the carrier's tracking API directly. No Power Platform connector exists for this carrier. The integration is a single request: send the tracking number, get the status back, display it. The `Send HTTP Request` node handles this entirely on the authoring canvas.

## When to use the HTTP request node

This module introduced three patterns for calling external systems from a topic. Each represents a different level of setup, reuse, and flexibility.

*   **Connector tools**: direct access to a prebuilt or custom Power Platform connector action — ideal when a connector already exists for the target system.
*   **Agent flows**: multi-step workflows with conditional branching and reusable logic callable from more than one topic.
*   **HTTP request node**: an ad-hoc REST API call built directly on the authoring canvas — suitable when no connector exists and the integration is a single, self-contained request within one topic.

Note

Copilot Studio also supports **MCP** and **REST API tools** (both in preview) as additional ways to call external services from a topic. MCP tools connect your agent to capabilities available from a Model Context Protocol server. REST API tools are configured from an OpenAPI specification.

For Adatum's carrier tracking scenario, the HTTP request node is the right choice. No Power Platform connector exists for the carrier's API. The carrier doesn't publish an OpenAPI specification or an MCP server, which rules out both of the preview options. The tracking number the customer provides becomes part of the URL, which the node builds dynamically using Power Fx. And the integration is contained within a single topic with no need for reuse elsewhere.

## Add and configure the Send HTTP Request node

The `Send HTTP Request` node is in the **Advanced** section of the **Add node** menu.

To add it to a topic:

1.  On the authoring canvas, select **Add node** (**+**) at the point where the API call should run.
2.  Point to **Advanced**, then select **Send HTTP request**. The node appears on the canvas.
3.  In the **URL** field, enter the API endpoint. For a static URL, type it directly. For a dynamic URL, where part of the address changes based on user input, use a Power Fx expression. In Adatum's case, the tracking number the customer provided becomes part of the URL: `"https://api.carrier.example/tracking/" & Topic.TrackingNumber`.
4.  From the **Method** dropdown, select the appropriate HTTP method. The node supports `GET`, `POST`, `PATCH`, `PUT`, and `DELETE`. Retrieving shipment status uses `GET`.

### Add request headers

Headers pass metadata to the API: authorization tokens, content type specifications, and any other values the API requires.

1.  Under **Headers and body** on the node, select **Edit**. The **HTTP Request properties** panel opens.
2.  Select **Add**, then enter the header name and its value.
3.  Repeat for each header the API requires.

Important

Never hardcode API keys, bearer tokens, or other credentials as literal strings in header fields. Any maker with access to the topic canvas can see those values. Store credentials in **environment variables** and reference the environment variable in the header value field. This keeps credentials out of the canvas and makes them manageable across environments.

### Configure the request body

For `GET` requests, the body is typically empty — the default **No Content** setting is correct. For `POST`, `PATCH`, and `PUT` requests, you send data to the API.

In the **HTTP Request properties** panel, find the **Body** section and select one of the available options:

*   **No Content**: use with `GET` requests; no body is sent
*   **JSON Content**: sends a JSON object in the body; supports static JSON or Power Fx formulas that include dynamic topic variables
*   **Raw content**: sends an arbitrary string when the API expects a non-JSON format

Tip

If you send a `POST` or `PATCH` request and the API silently rejects the body, check your headers. A missing `Content-Type: application/json` header might be the cause. The API receives the request but can't parse the body because it doesn't know the format.

## Configure the response schema

After the `Send HTTP Request` node receives a response from the API, you need to define the shape of that data so Copilot Studio can expose the response fields as usable variables.

1.  On the node, find **Response data type** and select **From Sample Data**.
    
2.  Select **Get schema from sample JSON**.
    
3.  Paste a sample JSON response from the API's documentation. For the carrier API, a sample response might look like this:
    
    ```
    {
      "trackingNumber": "1Z999AA10123456784",
      "status": "In transit",
      "estimatedDelivery": "2026-04-20",
      "lastLocation": "Chicago, IL"
    }
    ```
    
4.  Select **Confirm**. Copilot Studio generates a Power Fx variable schema from the sample. The response fields are now available with IntelliSense support in the Power Fx editor.
    
5.  Under **Save user response as**, assign the response to a variable. For example, `Topic.TrackingResponse`.
    

To reference specific fields downstream, use Power Fx dot notation: `Topic.TrackingResponse.status` for the shipment status, or `Topic.TrackingResponse.estimatedDelivery` for the expected delivery date. Capture only the fields your topic actually uses. Keeping the variable surface minimal makes the topic easier to maintain.

## Handle errors and protect the conversation

HTTP requests can fail: the API might be temporarily unavailable, the tracking number might not exist in the carrier's system, or the response might arrive in an unexpected format. How you configure error handling determines whether the customer gets a useful message or whether the conversation ends without explanation.

By default, the `Send HTTP Request` node uses **Raise an error** mode. When the request fails, the agent triggers the system **On Error** topic and stops the current flow. For internal or backend agents, this might be acceptable. For a customer-facing topic, it's not.

To configure error handling:

1.  Under **Headers and body** on the node, select **Edit**.
2.  Under **Error handling**, select **Continue on error**.
3.  Assign variables to capture the HTTP status code and error response body — for example, `Topic.StatusCode` and `Topic.ErrorResponse`. The topic continues executing after the node, regardless of whether the request succeeded.

After the `Send HTTP Request` node, add a condition that checks `Topic.StatusCode`. A value of `200` means the request succeeded — the topic displays the tracking result. Any other value routes the customer to a fallback message:

> "I'm unable to retrieve your shipment status right now. Please try again later or contact our support team."

Configuring **Continue on error** keeps the conversation moving, gives the customer a clear next step, and avoids exposing raw error details in the chat.

Note

The **HTTP Request properties** panel also includes a **Request timeout** setting, in milliseconds. The default is 30,000 ms (30 seconds). If the external API is known to respond slowly under load, increase this value to avoid premature timeouts during high-traffic periods.
