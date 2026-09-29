---
title: "Configure message formatting in agent topics"
url: "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/2-configure-message-formatting"
uid: "learn.wwl.deliver-rich-agent-responses-adaptive-cards-copilot-studio.configure-message-formatting"
module: "deliver-rich-agent-responses-adaptive-cards-copilot-studio"
moduleTitle: "Deliver rich agent responses using Adaptive Cards in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Configure message formatting in agent topics

Right now, the Contoso HR agent answers employee questions, but the responses arrive as blocks of unstyled text that take effort to read. Accurate content buried in a wall of text still creates friction. Before moving to Adaptive Cards, it's worth understanding what the **message node** can already do. Copilot Studio gives you a formatting toolbar, image and video support, message variations, and quick reply buttons, all within a single node and all without writing code.

## Format text in the message node

The message node includes a lightweight **formatting toolbar** that controls how text appears in the conversation.

![Screenshot of a message node in Copilot Studio.](media/message-node.png)

The toolbar lets you apply:

*   Bold and italic for emphasis on key terms
*   Bulleted and numbered lists to organize related information
*   Line breaks to control spacing and readability

Note

Text formatting renders differently across channels. Bold and italic work consistently in Microsoft Teams and the web chat surface, but some channels strip formatting entirely. You'll explore channel-specific rendering in detail in a later unit.

## Personalize messages using variables

Beyond text styling, the toolbar includes a **variable insertion** control — the **{x}** icon — that lets you personalize messages at runtime using topic variables, global variables, or system variables. Selecting it opens a variable picker; the chosen variable is inserted at the cursor and resolved to its runtime value when the topic runs.

For the Contoso HR agent, this might mean opening the leave policy response message and inserting `System.User.DisplayName` to greet the employee by name, applying bold to highlight entitlement totals, and a bulleted list for the policy conditions. The same content that took a paragraph to parse now takes a glance—without any change to the underlying information.

## Add images and videos to a message node

Text formatting improves readability, but a relevant visual can explain in seconds what text covers in paragraphs. For the Contoso HR agent, adding a diagram of the leave request process or a short walkthrough video removes ambiguity for employees who prefer visual guidance over written instructions.

Both images and videos are added through the message node's **Add** menu. Images require a publicly hosted URL; videos accept a direct MP4 link or a YouTube URL. Both support an optional title that appears alongside the media.

Images and videos appear as cards within the message. When you add more than one media card to a single node, they display in a **carousel** by default, showing one card at a time with navigation arrows. To display all cards at once, select one of the cards and switch to **List** view using the icon in the node's menu bar. List view is useful when you want the employee to compare all options without having to scroll through them one at a time.

Important

Images and videos must be hosted at publicly accessible URLs. The agent can't reach files stored on internal servers or behind authentication. For the Contoso HR scenario, this requirement means hosting assets in a SharePoint library with anonymous link sharing enabled, or in Azure Blob Storage with public read access.

## Keep responses fresh with message variations

An agent that says exactly the same thing every time feels mechanical, especially for employees who interact with the HR agent regularly. **Message variations** let you define multiple phrasings for a single message node. Each time the node runs, Copilot Studio randomly selects one variation to send, so the experience feels different on repeated visits.

Variations are added through the **Add** menu on the message node. Each variation appears as a separate text box where you enter the alternate phrasing; add as many as needed.

For the Contoso HR agent's greeting message, instead of always displaying "Hello! How can I help with your leave questions today?", you could add variations like "Hi there, what would you like to know about your leave?" or "Good to see you. What can I help with today?" The agent rotates through these variations randomly, which makes repeated interactions feel more natural over time.

Each variation supports the same features as the primary message, including bold, lists, variable insertion, and images. Variations should deliver the same core information in different words, not introduce different guidance. If one variation mentions submission deadlines, all variations should.

## Guide users with quick replies

Even a well-formatted message can leave employees uncertain about what to type next. **Quick replies** are tappable suggestion buttons that appear below a message and advance the conversation when selected. The employee selects a quick reply instead of typing freely, which reduces input errors and shortens the path to a resolution.

For the Contoso HR agent's opening message, quick replies like **Annual leave**, **Sick leave**, **Parental leave**, and **Submit a leave request** give employees an immediate, clear set of directions to choose from.

Quick replies are added through the **Add** menu. Replies can enable the user to send a message to the agent, open a URL, make a call, or send a hidden message. A standard "Send a message" quick reply has a **Title** property (the text displayed on the button), a **Text** property (the message sent to the agent when selected), and a **Type** that controls the action.

Quick replies differ from the multiple-choice options on a **Question** node in an important way: quick replies are suggestions, not requirements. An employee can ignore them and type freely at any time. The Question node enforces a choice—it doesn't advance the conversation until the employee selects or enters a recognized option. Use quick replies when you want to _guide_; use a Question node when you need to _constrain_.

Tip

On mobile surfaces, quick replies are especially effective. Tapping a button is faster and less error-prone than typing, making the use of quick replies a small design choice with real impact for mobile employees.

## Next step: Adaptive Cards

Text markup, images, videos, variations, and quick replies give you meaningful control over how information reaches employees. What these options don't provide is a way to present _structured, data-rich content_ in a genuinely visual layout. Displaying a leave balance, for example, ideally means labeled fields, entitlement totals, and remaining days arranged side by side, not just a sentence describing them.

That's where Adaptive Cards come in. In the next unit, you'll learn how to design an Adaptive Card that transforms the Contoso HR agent's leave policy response into a rich, scannable layout with labeled data fields.
