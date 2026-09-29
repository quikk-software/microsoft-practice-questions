---
title: "Apply channel-specific considerations for Adaptive Cards"
url: "https://learn.microsoft.com/en-us/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/5-adaptive-cards-channel-considerations"
uid: "learn.wwl.deliver-rich-agent-responses-adaptive-cards-copilot-studio.adaptive-cards-channel-considerations"
module: "deliver-rich-agent-responses-adaptive-cards-copilot-studio"
moduleTitle: "Deliver rich agent responses using Adaptive Cards in Microsoft Copilot Studio"
learningPath: "learn.wwl.design-agent-conversations-responses-topics-copilot-studio"
---
# Apply channel-specific considerations for Adaptive Cards

Picture this scenario: an Adaptive Card for the Contoso HR leave balance summary looks perfect in the designer preview, with a clean multi-column structure, styled containers, and everything in place. Testing in the web chat surface confirms it renders correctly. Then the same agent is opened in Microsoft Teams, and the card is gone, replaced with a plain text fallback or a blank space where the card should appear. What happened?

**Schema version incompatibility.** Versioned schemas are used to describe the features available to Adaptive Cards. Each channel that renders cards supports a maximum schema version. Elements you reference from a newer schema version don't render in channels that aren't implementing that version yet. Understanding this incompatibility before you design, not after, saves significant rework.

## Adaptive Card schema support by channel

Copilot Studio supports different maximum Adaptive Card schema versions depending on where your agent is deployed:

Channel

Maximum schema version

Microsoft Teams

**v1.5**

Live Chat (Omnichannel)

**v1.5**

Web channel

**v1.6**

Warning

If your card JSON references **v1.6** features — such as certain layout properties or element types introduced in that version — and the agent is deployed to Microsoft Teams or Live Chat, those elements either fail silently or cause the entire card to fall back to plain text. The Adaptive Card designer doesn't warn you about this incompatibility during design time.

Note

The web channel has an additional restriction: it doesn't support `Action.Execute`. If your card uses `Action.Execute` for button actions, use `Action.Submit` instead to ensure compatibility on the web channel.

The practical implication: a card that looks correct in the web channel test pane might behave much differently when the same agent surfaces in Teams. For the Contoso HR agent, which targets both Teams and the company's internal web portal, this version mismatch is a real risk that requires deliberate attention.

## Check and set the schema version in JSON

Every Adaptive Card JSON definition includes a `version` property that declares which schema version the card uses. In the card's JSON view, the `version` property appears near the top of the definition alongside `$schema`. To target Teams and Live Chat compatibility, set the value to `"1.5"`. The JSON structure looks like this:

```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  ...
}
```

If you copied a card from the Adaptive Cards Hub or another external source, always verify the `version` field before embedding it in your topic. Using a card without checking the version is one of the most common causes of rendering failures in production deployments.

## Test in the actual target channel

The test pane in Copilot Studio renders Adaptive Cards using the web channel engine, which supports schema version 1.6. This makes it a reasonable proxy for web channel behavior, but not for Teams or Live Chat, where only v1.5 is supported. In addition, the authoring canvas itself does not render v1.6 cards at all — only the test pane does. A card using v1.6 features may therefore look correct in the test pane while failing entirely in Teams.

Tip

Always test your Adaptive Card in the actual target channel before considering the design complete. For the Contoso HR agent, that means publishing a test version and opening it in both Microsoft Teams and the web portal. A card that renders correctly in the Copilot Studio test pane may still surface layout differences or silent omissions in Teams.

Testing in Teams requires publishing the agent, then triggering the topic that renders the card directly in the Teams client. For the web channel, use the web chat surface embedded in Copilot Studio or a test page. Comparing both outputs side by side reveals rendering differences before the card reaches employees.

## Choose a design strategy for cross-channel agents

When your agent targets more than one channel, you have two practical approaches to Adaptive Card design.

**Option 1: Design to v1.5 (recommended)**

Use only schema elements available in **v1.5** for all cards. This approach ensures consistent rendering across Teams, Live Chat, and the web channel without any special handling. You give up the small set of layout improvements introduced in **v1.6**, but you gain predictability and simplicity. In many cases, including for the Contoso HR agent, limiting the design to schema elements available in v1.5 is the right default choice.

Important

If your agent is deployed to Microsoft Teams or Live Chat for any part of its audience, design all cards to **v1.5**. This design choice eliminates an entire category of rendering bugs and is the most common approach in production deployments.

**Option 2: Apply channel detection with card variants**

For agents where the v1.6 layout improvements are genuinely valuable for web users, topic-level conditions can route each channel to a different card version. This adds maintenance overhead with two card definitions to keep in sync, so it's best reserved for scenarios where the visual difference justifies the complexity.

For the Contoso HR agent, the added complexity of maintaining two card variants isn't justified. Option 1 remains the better fit.

## Channel considerations apply to quick replies too

Quick replies, introduced earlier in the module, are also subject to channel limitations.

Important

Some channels don't support quick replies at all. In those channels, the quick reply buttons simply don't appear. The message is still delivered, but without the suggestion buttons. Other channels support quick replies but limit how many can be displayed at once, silently hiding any that exceed the limit.

The practical implication for the Contoso HR agent is the same as with Adaptive Cards: don't design a response that _relies_ on quick replies as the only way to advance the conversation. Employees on unsupported channels need another path forward, such as clear message text that prompts them to type a response. Testing in each target channel is always recommended.

## Next step

With a clear picture of schema compatibility and channel-specific rendering behavior, you're ready to test your understanding. The next unit covers the key concepts from this module: Adaptive Card patterns, designer usage, Power Fx data binding, and the channel considerations explored here.
