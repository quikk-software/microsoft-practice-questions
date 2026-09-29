---
title: "Author and configure custom prompts in topics"
url: "https://learn.microsoft.com/en-us/training/modules/generate-ai-powered-responses-generative-answers-copilot-studio/5-author-custom-prompts-topics"
uid: "learn.wwl.generate-ai-powered-responses-generative-answers-copilot-studio.author-custom-prompts-topics"
module: "generate-ai-powered-responses-generative-answers-copilot-studio"
moduleTitle: "Generate AI-powered agent responses using generative answers in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Author and configure custom prompts in topics

Generative answers nodes and custom instructions handle knowledge retrieval and response shaping well. But some agent tasks require the AI to perform structured reasoning on content the topic provides — not retrieve from a knowledge base, but analyze, classify, or extract from a specific input. Custom prompts are designed for exactly this. In the Woodgrove Bank scenario, the client advisor agent needs to analyze agreement clauses and classify each one as standard, non-standard, or flagged with a brief rationale, illustrating how custom prompts handle tasks that generative answers nodes aren't designed for. This unit covers how to build a prompt in Prompt builder, select the right model, and add the prompt to a topic as a tool node.

## When to use a custom prompt instead of a generative answers node

The **generative answers node** and custom prompts both bring AI into a topic, but they serve different jobs.

The **generative answers node** is designed for knowledge retrieval and synthesis. When the node runs, it searches the knowledge sources you've configured, generates a response grounded in what it finds, and, when configured, returns citations. The question driving the node is: _What does our content say about this?_

**Custom prompts** perform specific, structured reasoning tasks on input the topic provides. A custom prompt doesn't search anything. It executes instructions you define: classify this clause, summarize this document in four bullets, extract these fields from this input. The question a custom prompt answers is: _What task should the AI perform on this data?_

Three signals indicate a custom prompt is the right choice:

*   The output needs a specific structure: a classification label, a fixed number of bullets, or a defined set of extracted fields
*   The reasoning should be isolated from knowledge retrieval: the AI operates on what the topic supplies, not on retrieved source content
*   A particular model capability matters: advanced reasoning, a domain-specific model, or a frontier model not available through the generative answers node

For the Woodgrove Bank legal review scenario, classifying agreement clauses with a rationale is structured task-based reasoning. The agent isn't searching anything. It's analyzing text the topic provides. A custom prompt fits this job precisely. The generative answers node doesn't.

Learn more: [Overview of prompts in Copilot Studio](/en-us/microsoft-copilot-studio/prompts-overview)

## Build a prompt in Prompt builder

Prompt builder is the authoring environment where you create, test, and save reusable custom prompts. These prompts are available across agents, topics, workflows, and apps.

To create the clause classification prompt for Woodgrove Bank:

1.  In your agent, select the **Tools** tab, then select **Add a tool** > **New tool** > **Prompt**. Prompt builder opens.
2.  At the top of the screen, enter a name for the prompt (for example, **Clause Classifier**).
3.  Under **Instructions**, write the prompt text. Be specific about what the AI should do and how it should format the output:
    
    ```
    You are a legal review assistant. Analyze the following contract clause and classify it as exactly one of: Standard, Non-standard, or Flagged. After the label, provide a one-sentence rationale.
    
    Clause:
    {clauseText}
    ```
    
4.  Select **Add input** and name the variable `clauseText`. This input variable holds the clause text the topic passes in at runtime.
5.  In the **Test your prompt** panel, enter a sample clause in the `clauseText` field and select **Run**.
6.  Review the output. If the format or classification logic doesn't match your expectations, refine the instructions and test again.
7.  When the output consistently meets your requirements, select **Save**.

Tip

Test your prompt with representative samples before adding it to a topic. Problems caught in Prompt builder are far easier to diagnose than problems surfaced during a live conversation. Include edge cases (ambiguous clauses, unusually short inputs, text in unexpected formats) and not just ideal examples.

Input variables are what make a prompt reusable. The `clauseText` variable acts as a placeholder for whatever clause the topic passes in. The instructions stay fixed. Only the input changes at runtime.

Learn more: [Optimize prompts and topic configuration](/en-us/microsoft-copilot-studio/guidance/optimize-prompts-topic-configuration)

## Select the right model

Prompt builder uses **GPT-4.1 mini** by default. For many structured tasks (classification, extraction, summarization), this model performs well and consumes Copilot Credits at the basic rate.

To change the model, select **Model** at the top of Prompt builder. The managed models available fall into three categories:

*   **Mini**: Cost-effective for moderately complex tasks where speed matters. GPT-4.1 mini is the default and falls into this category, billed at the basic rate.
*   **General**: Better performance for complex or multimodal tasks, including image and document analysis, and advanced content creation. GPT-4.1 is in this category, billed at the standard rate.
*   **Deep**: Suited for reasoning-intensive tasks, including nuanced decision-making, data analysis, and sophisticated problem-solving. GPT-5 reasoning is in this category, billed at the premium rate.

For the Woodgrove Bank clause classification task, a general or deep model may produce more consistent and defensible classifications on complex legal language than the mini default. Testing the prompt with each candidate model is the reliable way to determine which delivers the quality the legal team needs.

Learn more: [Change the model version and settings](/en-us/microsoft-copilot-studio/prompt-model-settings)

## Connect a model from Microsoft Foundry

If the managed models don't meet your task requirements (for example, a specific open-source model, a domain-specialized model, or a frontier model not available in the standard catalog), you can connect a model from Microsoft Foundry directly in Prompt builder.

This integration gives you access to more than 1,800 models from the Microsoft Foundry model catalog, including GPT-4.5, Llama, and DeepSeek, all within the Prompt builder experience.

To connect a Microsoft Foundry model:

1.  In Prompt builder, select **Model**, then select the **+** (plus sign) in the model dropdown.
2.  In the **Connect a model from Microsoft Foundry** screen, enter:
    *   **Model deployment name**: the deployment name exactly as it appears in your Microsoft Foundry resource
    *   **Base model name**: the base model name exactly as it appears in Microsoft Foundry
3.  Select **Connect**. The connected model appears in the **Model** dropdown and is ready to select.

Once connected, whenever this prompt runs, it always uses the selected model.

Important

Connecting a model from Microsoft Foundry introduces costs associated with your Microsoft Foundry deployment. Review your Microsoft Foundry resource billing and consumption before using a connected model in production, and confirm the cost model with your Azure administrator.

Note

Microsoft Foundry connections are governed by Power Platform data loss prevention (DLP) policies in the [Power Platform admin center](https://admin.powerplatform.microsoft.com). Work with your Power Platform administrator to ensure the appropriate governance policies are in place.

Learn more: [Bring your own model for prompts](/en-us/microsoft-copilot-studio/bring-your-own-model-prompts)

## Add the prompt to a topic and map variables

With the prompt saved and tested, add it to the topic as a tool node.

1.  Open the topic where the prompt should run.
2.  Select **+** (Add node) at the point in the conversation flow where the classification should occur.
3.  Select **Add a tool**, then select your saved prompt from the list (for example, **Clause Classifier**).
4.  In the tool node that appears on the canvas, map the topic variable that holds the clause text to the prompt's `clauseText` input parameter. If the topic stores the clause in a variable called `Topic.ClauseInput`, select that variable for `clauseText`.
5.  The prompt returns its output as a new topic variable. Name the output variable (for example, `Topic.ClassificationResult`) so downstream nodes can reference it.

The output is plain text by default. For the Woodgrove Bank scenario, `Topic.ClassificationResult` holds the classification label and the one-sentence rationale the model generated.

Place a **Condition** node after the tool node to branch the conversation based on the classification value. If `Topic.ClassificationResult` contains "Flagged," route to an escalation path. If it contains "Standard," route to an automated acknowledgment. If it contains "Non-standard," route to a human review queue. The topic handles the routing automatically, with no manual triage required from the relationship manager.

Learn more: [Generate a response by using AI prompts](/en-us/microsoft-copilot-studio/guidance/agent-tools#generate-a-response-by-using-ai-prompts)
