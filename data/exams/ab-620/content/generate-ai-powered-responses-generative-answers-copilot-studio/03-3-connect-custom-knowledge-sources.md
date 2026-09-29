---
title: "Connect custom knowledge sources to a generative answers node"
url: "https://learn.microsoft.com/en-us/training/modules/generate-ai-powered-responses-generative-answers-copilot-studio/3-connect-custom-knowledge-sources"
uid: "learn.wwl.generate-ai-powered-responses-generative-answers-copilot-studio.connect-custom-knowledge-sources"
module: "generate-ai-powered-responses-generative-answers-copilot-studio"
moduleTitle: "Generate AI-powered agent responses using generative answers in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Connect custom knowledge sources to a generative answers node

Not every knowledge source fits neatly into SharePoint or uploaded documents. Many organizations maintain critical information in proprietary APIs, internal databases, or legacy systems that don't surface through standard connectors. The generative answers node supports a **Custom data** option for exactly these situations: you retrieve the data yourself, reshape it into a structure the node understands, and the AI synthesizes a grounded response from what you supply.

In the Woodgrove Bank scenario, the compliance team maintains regulatory requirements in a proprietary regulatory API that's updated whenever rules change, making static uploaded documents an impractical basis for accurate compliance answers. This unit explores how to configure custom data sources, including HTTP requests and Power Automate flows, to connect the generative answers node to systems like this one.

## Understand the required Table format

Custom data must be provided as a Power Fx **Table** with three specific columns. The AI uses the values in these columns to synthesize a response and construct citations.

Column

Required

Description

`Content`

Yes

The text the AI uses to generate the response

`ContentLocation`

No

A URL used as a citation link in the response

`Title`

No

A display label shown alongside the citation

Important

Only the first three records in the Table are used to generate the response. If your HTTP request or flow returns more results, the additional records are ignored. The selection is positional, not relevance-based. Design your data retrieval to filter and rank results before returning them, so only the three most relevant records reach the node.

The three-record limit means the quality of the response depends on what you return, not on how many records are available. For the Woodgrove Bank regulatory scenario, the HTTP request includes the user's question as a query parameter so the API returns the three regulation summaries most relevant to that specific question, rather than a full catalog of hundreds of regulations.

Here's how the required Table format looks in Power Fx:

```
[
  {
    Content: "Regulation 2024-31 requires that all client communications referencing investment projections include a risk disclosure. Disclosures must be approved by the compliance officer before distribution.",
    ContentLocation: "https://woodgrovebank-regulatory.internal/regs/2024-31",
    Title: "Reg 2024-31: Investment communication standards"
  },
  {
    Content: "Article 7 of the financial conduct framework prohibits advisors from making projected return guarantees in any written or verbal client communication.",
    ContentLocation: "https://woodgrovebank-regulatory.internal/framework/article-7",
    Title: "Financial conduct framework, Article 7"
  },
  {
    Content: "The compliance manual chapter 12 outlines the review and sign-off process for all client-facing materials that include performance data.",
    ContentLocation: "https://woodgrovebank-regulatory.internal/manual/ch12",
    Title: "Compliance manual, Chapter 12"
  }
]
```

With this Table in the **Custom data** field, the generative answers node synthesizes a response grounded in the `Content` values and uses the `ContentLocation` URLs as citation links alongside the `Title` labels.

## Configure an HTTP request as a custom data source

When your API returns data in a structure you can reshape with a single call and a Power Fx expression, an HTTP request node is the most direct approach. You add an HTTP request node earlier in the topic flow, call the API, parse the JSON response into the required Table format, and store the result in a topic variable. That variable then goes into the generative answers node's **Custom data** field.

To configure Custom data using an HTTP request:

1.  In the topic, add an **HTTP request** node upstream of the generative answers node. Configure it to call your data API and store the response in a topic variable (for example, `Topic.RegResponse`).
2.  Add a **Set variable** node to transform the raw JSON response into a Power Fx Table. Use a `ForAll` expression to map your API's fields to `Content`, `ContentLocation`, and `Title`.
3.  Select the **Create generative answers** node, then select **Edit** under **Data sources**.
4.  Select **Classic data**.
5.  In the **Custom data** field, enter the variable that holds the formatted Table — for example, `Topic.RegData`.
6.  Select **Save**.

Tip

Use an HTTP request when the API is straightforward and returns data you can reshape with a single call and a Power Fx `ForAll` expression. If the logic is more complex (aggregating data from multiple sources, handling pagination, or applying business rules), a Power Automate flow is easier to build and maintain.

For the Woodgrove Bank compliance scenario, the HTTP request node calls the regulatory API with the user's question as a query parameter. A **Set variable** node then maps the API response fields (`regulationText` to `Content`, `sourceUrl` to `ContentLocation`, and `regulationTitle` to `Title`) and passes the formatted variable to the generative answers node.

## Configure a Power Automate flow as a custom data source

When your data retrieval involves aggregating records from multiple systems, applying complex filtering logic, or using Power Platform connectors that aren't practical to call with raw HTTP, a Power Automate flow is the better option. The flow handles the complexity of data assembly and returns a Table in the required format to the topic.

The flow accepts input from the topic (typically the user's query or other topic variables) and returns a Table as its output. Copilot Studio maps the flow's return value to a topic variable, which you then pass to the **Custom data** field in the generative answers node, the same way you do with an HTTP request approach.

Regardless of whether you use an HTTP request or a flow, the variable that reaches the **Custom data** field must be a Table with `Content`, `ContentLocation`, and `Title` columns. The node doesn't accept other structures.

Learn more: [Use a custom data source for generative answers nodes](/en-us/microsoft-copilot-studio/nlu-generative-answers-custom-data)
