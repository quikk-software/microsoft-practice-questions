---
title: "Shape AI responses with custom instructions"
url: "https://learn.microsoft.com/en-us/training/modules/generate-ai-powered-responses-generative-answers-copilot-studio/4-shape-responses-custom-instructions"
uid: "learn.wwl.generate-ai-powered-responses-generative-answers-copilot-studio.shape-responses-custom-instructions"
module: "generate-ai-powered-responses-generative-answers-copilot-studio"
moduleTitle: "Generate AI-powered agent responses using generative answers in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Shape AI responses with custom instructions

The generative answers node now knows _what_ to search — knowledge sources you configured in the previous units. But knowing what to search doesn't control _how_ the AI presents its findings. Without additional guidance, the AI generates responses in whatever format and tone it determines is appropriate, which may not match your agent's voice, the expectations of your audience, or the compliance requirements of your organization.

Custom instructions close that gap.

## What custom instructions are and where to find them

Custom instructions are free-form text you enter in the **Data source** panel of a generative answers node. They instruct the AI on tone, structure, and scope before it generates a response. Think of them as a brief policy the AI reads before writing each answer.

In the Woodgrove Bank scenario, the investment product topic serves relationship managers who advise clients during live conversations. The compliance team requires that every response be formal, structured, and grounded strictly in approved product content. A three-line custom instruction handles all three requirements at once, without an extra topic, a separate dialog branch, or any code.

To access the custom instruction field:

1.  On the topic canvas, select the three dots (**…**) on the **Create generative answers** node.
2.  Select **Properties** to open the properties pane.
3.  Select **Data source**.
4.  Enter your instructions in the text field at the bottom of the pane.
5.  Select **Save**.

The field accepts up to 8,000 characters. You can also include topic variables and Power Fx expressions to make instructions dynamic. For example, you might adjust the response language based on a variable set earlier in the conversation.

## What custom instructions control

Custom instructions shape three aspects of the AI's output: tone, format, and scope.

**Tone** defines how the AI sounds. A formal tone suits professional audiences like relationship managers advising clients on regulated products. A conversational or empathetic tone may fit a support scenario better. Without instruction, the AI uses a neutral tone that may not match your agent's persona or your organization's communication standards.

**Format** defines how information is arranged. You can instruct the AI to use bullet points, numbered steps, prose paragraphs, or a combination. For the Woodgrove Bank investment topic, multi-step answers (like how to initiate a portfolio review) should appear as numbered steps so relationship managers can guide clients through each action in sequence.

**Scope** defines the boundaries of the response. This is one of the most consequential uses of custom instructions. By instructing the AI not to speculate beyond the provided knowledge sources, you prevent it from drawing on its general-purpose training data to fill gaps in retrieved content. For a regulated financial services environment, responses that introduce uncited claims or general knowledge could create compliance exposure. A scope constraint makes the boundary explicit.

Learn more:

*   [Use prompt modification to provide custom instructions](/en-us/microsoft-copilot-studio/nlu-generative-answers-prompt-modification)
*   [Optimize prompts and topic configuration](/en-us/microsoft-copilot-studio/guidance/optimize-prompts-topic-configuration)

## Write effective custom instructions

The most important principle for custom instructions is specificity. Effective instructions describe observable, measurable output behaviors. Instructions that describe a desired quality rather than a specific behavior have little measurable effect on output.

Consider what the Woodgrove Bank team needs from the investment product topic: formal tone, bullet points for multi-step answers, and no speculation beyond approved sources. Here's an instruction set that achieves all three:

```
Respond using a formal professional tone. Use bullet points for any answer that contains multiple steps or items. Do not speculate or infer information beyond the provided knowledge sources; if the answer is not found in the sources, state that the information is not available.
```

Compare that to a vague alternative:

```
Be helpful and professional.
```

The first version gives the AI three specific, verifiable behaviors: use a formal tone, use bullet points for multi-step answers, and don't speculate. The AI can evaluate its own draft against each one before finalizing the response. The second version describes a quality ("helpful and professional") but provides the AI with nothing observable to target. The output looks the same with or without it.

This distinction matters when results are inconsistent. If an agent sometimes uses bullet points and sometimes doesn't, the instruction probably doesn't specify a format. Rewrite it to define exactly when bullet points apply. For example: "use bullet points whenever the answer includes more than one item or step."

Tip

Think of custom instructions as a checklist the AI runs through before generating each response. If an instruction doesn't specify something the AI can observe in its own output, it won't change behavior. Rewrite vague qualities as observable behaviors: instead of "be clear," write "use short sentences and define technical terms the first time they appear."

Important

Always test your custom instructions using **Test your agent** in the Copilot Studio designer. Submit questions that cover the full range of topics the node might handle, and verify that the output consistently reflects your instructions. Vague instructions often produce inconsistent results across question types. Test your instructions before the agent goes live.

## How custom instructions differ from custom prompts

Custom instructions and custom prompts both influence AI behavior in Copilot Studio, but they serve different purposes and operate at different levels.

Custom instructions are lightweight response-shaping text inside an existing generative answers node. They influence how the AI presents the answer it generates from the configured knowledge sources. The node still searches sources, still generates a grounded response, and still returns citations. Custom instructions adjust only the tone, format, and scope of that output — they don't change what the node does.

Custom prompts, covered in the next unit, are a separate node type that instructs the AI to perform a specific reasoning task: classify a document, extract key entities from user input, or evaluate a response against defined criteria. A custom prompt isn't anchored to knowledge source retrieval. It defines the entire task the AI performs. You also select the model that runs the prompt from the Microsoft Foundry model catalog, giving you direct control over which AI executes the task.

The practical distinction: use custom instructions when you need to control how a generative answers node presents its output. Use custom prompts when you need the AI to perform a reasoning task that isn't knowledge retrieval.

## Instruction scope: one node at a time

Custom instructions apply only to the generative answers node where you configure them. They don't affect other nodes in the same topic, other topics in the agent, or the agent's conversational boosting behavior.

This scope is intentional. Different topics often serve different audiences with different response requirements. Woodgrove Bank's investment product topic requires formal, bullet-pointed responses with strict source constraints. A support topic in the same agent might use a warmer, more empathetic tone. Both topics can share the same agent and the same knowledge sources, but their custom instructions remain independent.
