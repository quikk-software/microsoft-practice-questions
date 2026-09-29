---
title: "Generative AI"
url: "https://learn.microsoft.com/en-us/training/modules/implement-power-virtual-agents/generative-ai"
uid: "learn-bizapps.implement-power-virtual-agents.generative-ai"
module: "implement-power-virtual-agents"
moduleTitle: "Manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Generative AI

As AI technology advances, it's providing organizations with multiple opportunities to provide more and better ways to enhance productivity and guide employees. One way this is done is with Generative AI. Microsoft Copilot Studio allows you to use Generative answers in multiple ways. Once you are in Copilot Studio, generative AI capabilities can be accessed by selecting **Generative AI** from the **Settings** menu.

With Copilot Studio, you can use Generative AI capabilities to do the following:

*   **Use generative answers as fallback**: Allows you to use generative answers as a fallback in instances where your agent is unable to find a relevant answer to the user’s question.
    
*   **Insert generative answers into Topics**: Allows you to integrate Generative AI into your topics by using the generative answer node.
    
*   **Use Copilot to create agents and topics**: Copilot allows you to provide a brief description of the agent or topic that you want to create, and it builds it out for you.
    

## Use generative answers as a fallback

In the past, if an agent were unable to determine a user's intent, it would ask them to rephrase their question. If the agent were unable to identify a topic after two prompts, it would escalate to a live agent.

With generative answers, Microsoft Copilot Studio allows your agent to find and present information from multiple sources, internal or external, without created topics. This allows you to use generative answers as primary information sources or as a fallback source when authored topics can't answer a user's query. As a result, this dramatically reduces the time it takes to create and deploy a functional agent, removing the need to manually author multiple topics that might not address all customer questions.

All agents include a Conversational boosting topic. This topic runs when your agent is unable to identify a topic that addresses the user's question.

The first thing you need to identify when using generative AI is the knowledge sources that are used to populate your answers. You can define the knowledge sources you want to use, on the Knowledge tab.

As of the publication of this course the following knowledge sources are available.

External resources:

*   **Public websites**: Allows you to connect to public websites as a source for real-time answers.
    
*   **Files**: Allows you to upload different files as knowledge sources. The contents of the uploaded files are searched for results.
    
*   **SharePoint**: Allows you to connect your organizations SharePoint site as a knowledge sources.
    
*   **Dataverse (Preview)**: Allow you to connect to your organizations Microsoft Dataverse instance as a source of knowledge.
    

Important

Additional enterprise data sources such as Azure SQL, Salesforce, ServiceNow, and more are currently in Preview.

The **Generative AI** page in Copilot Studio allows you to tailor the generative capabilities of your agent. It provides you with different options for configuring Generative AI in your agent. You can access the Generative AI configuration page by going to **Settings > Generative AI**.

On the Generative AI settings page, you can define the following:

*   **How your agent interacts with people**: This defines how you want answers to be populated for people who are interacting with your agent. You can select from the following:
    
    *   **Classic**: This uses topics that you build to respond to trigger phrases. Actions that can only be called from inside a topic.
        
    *   **Generative (preview)**: This uses generative AI to respond to the users’ questions with the best combination of defined actions, topics, and knowledge
        
*   **How strict should the content moderation be**: Allows you to specify how relevant you want the answers that are generated to be. You can choose from the following options:
    
    *   **Low – More creative**: The answers generated are pooled from more sources, and may not be the most relevant answers.
        
    *   **Medium – More balanced**: The answers generated come from a smaller more relevant pool of data.
        
    *   **High – More precise**: This provides the most relevant and precise answers. This option also increases the likely hood that it's unable to find a relevant answer.
        
*   **Image input** - Allows users to upload images the agent can analyze.
    
*   **Enhanced search results** - Provides improved search performance for Microsoft 365 Copilot tenants.
    

[![Screenshot of a computer Description automatically generated.](media/generative-ai.png)](media/generative-ai.png#lightbox)

To learn more about generative answers, see: [Generative answers as a fallback.](/en-us/microsoft-copilot-studio/nlu-boost-conversations#generative-answers-as-a-fallback)

To learn more about content moderation, see: [Content moderation](/en-us/microsoft-copilot-studio/nlu-boost-conversations#content-moderation).
