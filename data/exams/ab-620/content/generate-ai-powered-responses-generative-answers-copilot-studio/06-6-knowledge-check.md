---
title: "Module assessment"
url: "https://learn.microsoft.com/en-us/training/modules/generate-ai-powered-responses-generative-answers-copilot-studio/6-knowledge-check"
uid: "learn.wwl.generate-ai-powered-responses-generative-answers-copilot-studio.knowledge-check"
module: "generate-ai-powered-responses-generative-answers-copilot-studio"
moduleTitle: "Generate AI-powered agent responses using generative answers in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Module assessment

1.

A maker adds a generative answers node to a topic and configures a node-level SharePoint knowledge source. The agent also has an agent-level Dataverse knowledge source configured. Which knowledge source does the generative answers node use when generating a response?

The agent-level Dataverse source, because it's configured at the broader scope.

The node-level SharePoint source, because node-level sources override agent-level sources for that node.

Both sources are combined, merging their results into a single response.

2.

A maker configures an HTTP request to retrieve data from a proprietary internal API for use in a generative answers node. The API response returns a JSON array with fields named 'body', 'link', and 'name'. What must the maker do to make this data usable by the Generative answers node?

Configure the generative answers node's Data source panel to map the JSON field names to the node's expected inputs.

Increase the number of records returned by the API to at least 10 so the AI has sufficient context.

Transform the JSON response into a Table with columns named Content, ContentLocation, and Title before passing it to the node.

3.

A maker writes the custom instruction 'Be helpful and concise.' in a generative answers node. A second maker writes: 'Respond using a bulleted list with no more than five items. Do not answer questions outside the scope of the provided knowledge sources.' Which statement best describes the difference in effectiveness?

The first instruction is more effective because shorter instructions are easier for the AI to process and follow.

Both instructions are equally effective because the AI infers the maker's intent in either case.

The second instruction is more effective because it specifies observable output behaviors the AI can consistently apply.

4.

An agent topic needs to extract the start date, end date, and total contract value from a clause submitted by the user, then store those three values as separate topic variables. Which approach is most appropriate for this task?

A generative answers node with a custom instruction specifying which fields to extract from the clause.

A custom prompt configured with the clause as an input variable and instructions to return structured JSON with the three field values.

A condition node that uses Power Fx expressions to parse the clause text and extract the values.

5.

A maker wants to connect a specialized model from Microsoft Foundry to a custom prompt in Copilot Studio. What information does the maker need to enter in the Connect a model from Microsoft Foundry screen in Prompt builder?

The Microsoft Foundry resource group name and subscription ID.

The model deployment name and base model name, exactly as they appear in Azure AI Foundry.

The Azure region where the model is deployed and its REST API endpoint URL.

You must answer all questions before checking your work.

You must answer all questions before checking your work.
