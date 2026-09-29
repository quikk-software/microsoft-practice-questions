---
title: "Design informational Adaptive Cards for agent responses"
url: "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/3-design-informational-adaptive-cards"
uid: "learn.wwl.deliver-rich-agent-responses-adaptive-cards-copilot-studio.design-informational-adaptive-cards"
module: "deliver-rich-agent-responses-adaptive-cards-copilot-studio"
moduleTitle: "Deliver rich agent responses using Adaptive Cards in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Design informational Adaptive Cards for agent responses

In the previous unit, you learned how to configure the message node's formatting toolkit: bolding key terms, adding images, and guiding employees with quick replies. Those tools work well for structured text responses. But when the Contoso HR agent needs to display a leave balance summary — showing leave type, total entitlement, and remaining days side by side — a plain message node can't arrange that information into a labeled, scannable layout. A sentence describing the numbers works; a card that presents them in organized columns makes them instantly readable.

**Adaptive Cards** solve this problem. Adaptive Cards are an open card format from Microsoft — supported across Teams, Outlook, Power Apps, and other Microsoft surfaces — that let you define a visual layout in JSON and have any supporting host render it natively. In Copilot Studio, you build Adaptive Cards using a visual designer, and, when needed, refine them by editing the JSON directly. Once the layout is right, you bind topic variable data to card fields using Power Fx, so the card content reflects real runtime values rather than hardcoded text.

This unit uses the Contoso HR leave balance card as a concrete example to illustrate each concept, from building the card structure in the designer to binding topic variable data to card fields with Power Fx.

## Two ways Adaptive Cards appear in topics

Before building, it helps to understand the two distinct roles Adaptive Cards can play in a Copilot Studio topic:

*   **Informational (message node)**: The card is embedded in a **Send a message** node. It displays rich content and the conversation continues automatically. No user input is collected from the card.
*   **Interactive (Ask with Adaptive Card node)**: The card functions as an input form with text fields, dropdowns, and date pickers. User entries map directly to topic variables.

This unit focuses on the informational pattern. You'll learn to configure the interactive counterpart in the next unit.

## Build a card in the Adaptive Card designer

The Adaptive Card designer is built directly into Copilot Studio. It's a visual drag-and-drop editor that generates valid JSON behind the scenes, so starting there avoids syntax errors and gives you a correctly structured card quickly.

Adding an Adaptive Card starts in the topic's authoring canvas. With the message node selected, you choose **Add** from the node's menu bar, select **Adaptive Card**, and then select **Edit adaptive card** to open the designer.

The designer provides three core areas: a **card preview** that shows how the card renders as you build it, an **element toolbox** where you browse and select card elements to add, and a **properties panel** where you configure the selected element.

### Adaptive Card element types

Adaptive Card elements fall into two categories.

**Layout elements** control card structure:

*   **Container**: groups related elements and applies shared spacing or a background style
*   **ColumnSet**: divides content into a horizontal row of columns
*   **Column**: holds one portion of a ColumnSet row

**Content elements** display data:

*   **TextBlock**: renders text with configurable size, weight, and wrapping behavior
*   **Image**: renders a photo or icon from a URL

For the Contoso HR leave balance card, a card structure might look like this:

*   A **Container** that groups all card content and applies consistent padding
*   A **ColumnSet** with two **Column** elements: one for the leave type label and entitlement total, another for the remaining balance
*   **TextBlock** elements inside each column for the text content
*   An optional **Image** element at the top of the container for a leave category icon

![Screenshot of a sample leave balance summary Adaptive Card.](media/leave-balance-summary-card.png)

Elements are added by dragging them from the toolbox into position on the canvas. Selecting any element in the preview opens its properties panel, where values like **Text** for a TextBlock or **URL** for an Image are configured, along with size, weight, and color.

A key design principle: limit each card to three to five data points. A card that tries to show everything becomes unreadable, especially on mobile. For the Contoso HR leave balance card, that means leave type, total entitlement, and remaining balance. Nothing more.

Tip

Use **ColumnSet** to arrange comparable data side by side. For the HR leave balance card, this means leave type in the left column and remaining days in the right, aligned and scannable at a glance, rather than stacked across separate paragraphs. The same pattern applies equally to other data-rich scenarios, such as a product catalog agent showing a product image, name, and price in a single card.

## Refine the card in JSON view

The designer exposes the most common element properties, but some styling options are only available in the JSON directly. Switching to JSON is the right move for targeted manual adjustments—not for building the card structure from scratch.

Selecting **Edit JSON** in the designer opens the full card definition in an editor. After making targeted changes, selecting **Save** returns to the preview with the updates applied.

Common reasons to edit JSON directly include:

*   Setting `"wrap": true` on a TextBlock so long text wraps instead of truncating with an ellipsis
*   Applying `"spacing"` properties to control padding between elements
*   Setting `"style"` on a Container; for example, `"emphasis"` adds a subtle background that visually groups related content
*   Adjusting `"minHeight"` on containers to keep card sizes consistent across a carousel

When you save JSON edits, the designer updates the preview immediately. If the JSON contains a syntax error, the preview pane shows a warning, making it straightforward to identify problems before the topic runs in a channel.

Tip

The [Adaptive Cards Hub](https://adaptivecards.microsoft.com/) is Microsoft's reference site for Adaptive Cards. Its [designer](https://adaptivecards.microsoft.com/designer) supports Microsoft-specific elements and is a useful companion for drafting and previewing card JSON outside of Copilot Studio before you add it to a topic.

## Bind topic variables to card fields with Power Fx

A card with hardcoded text works well for fixed content like a standard policy overview that never changes. But when card content comes from a connector action, HTTP request, or earlier step in the topic flow, the card needs to reflect runtime values. Copilot Studio supports Power Fx for this purpose.

The recommended approach is to compute the needed values into topic variables earlier in the topic flow, then reference those variables when configuring the card's text-type properties. For the Contoso HR leave balance card, suppose an earlier topic step stores the employee's remaining annual leave days in `Topic.AnnualLeaveBalance`. You'd reference this variable when setting the TextBlock's text value, so the card reflects the actual balance at runtime rather than a hardcoded number. At render time, Copilot Studio evaluates the expression and substitutes the variable value before displaying the card.

If you need to manipulate a value before displaying it, such as formatting a number with a unit label, compute the result into a topic variable earlier in the topic flow and reference that variable in the card rather than attempting the transformation inline.

Note

The next unit covers Power Fx variable binding in more detail for the **Ask with Adaptive Card** node, which includes a dedicated formula mode for referencing topic variables directly in card properties.

## Show multiple cards in a carousel or list

When a message node contains more than one Adaptive Card, Copilot Studio renders them in a layout you control:

*   **Carousel**: Cards display side by side with navigation arrows. The user sees one card at a time and navigates horizontally. This layout works well when each card describes a distinct item and the expected interaction is to act on one result at a time.
*   **List**: All cards stack vertically in the conversation. The user sees every result by scrolling down. This layout is better when the user needs to compare all options at once, or when the response includes only two or three cards.

To switch between layouts, select any Adaptive Card in the message node and use the layout toggle in the node's menu bar.

For the Contoso HR agent displaying annual, sick, and parental leave summaries, list layout is the right choice. Employees need to compare all three leave types at once, and stacking the cards vertically lets them scroll through the full picture without navigating card by card. Carousel layout suits a different pattern: when an agent returns multiple distinct items that the user acts on one at a time, such as a product catalog agent showing individual product results.

Note

Carousel rendering varies by channel. Microsoft Teams renders carousels with horizontal navigation as expected. Some channels stack cards vertically regardless of the layout setting. You'll explore channel-specific rendering behavior in the final unit of this module.

## Next step

Informational Adaptive Cards let you present structured data—product results, leave balances, policy summaries—in a layout that's scannable, visually organized, and dynamically populated from topic variables. The card surfaces the data and the conversation moves on. But what if you need the card to do more than display information? In the next unit, you configure an **Ask with Adaptive Card** node that transforms a card into an interactive form, letting employees submit a leave request in a single step, directly in the conversation.
