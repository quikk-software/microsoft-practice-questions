---
title: "Describe how Microsoft Power Platform supports data privacy and accessibility guidelines"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-power-platform-administration-governance/5-describe-power-platform-data-privacy-accessibility-guidelines"
uid: "learn.wwl.describe-microsoft-power-platform-administration-governance.describe-power-platform-data-privacy-accessibility-guidelines"
module: "describe-microsoft-power-platform-administration-governance"
moduleTitle: "Describe Power Platform governance and administration"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe how Microsoft Power Platform supports data privacy and accessibility guidelines

Microsoft is committed to the highest levels of trust, transparency, standards conformance, and regulatory compliance across all of its products and services. Power Platform is built on the same infrastructure and compliance commitments that underpin Microsoft Azure and Microsoft 365, giving organizations confidence that their solutions meet applicable regulatory requirements.

## Compliance and data privacy

Organizations operating in regulated industries—healthcare, financial services, government, education—must ensure that the platforms they use meet specific legal and regulatory requirements for data collection, processing, and storage. Microsoft provides a comprehensive set of resources to help organizations understand and demonstrate their compliance when using Power Platform.

### Microsoft Trust Center

The **Microsoft Trust Center** is the central hub for information about Microsoft's security, privacy, compliance, and transparency commitments. It provides access to compliance documentation, audit reports, certifications, and whitepapers related to Power Platform and the underlying Microsoft cloud infrastructure. Organizations can use these resources to evaluate how Power Platform aligns with their compliance requirements and to generate evidence for internal and external audits.

### Data residency and geographic data locations

When an organization establishes a Microsoft Entra tenant, it selects a default geographic region for its data. Environments created within that tenant can also target specific geographic regions, and data stored in Dataverse within those environments remains within the designated region. This **data residency** capability is critical for organizations subject to regulations that require data to be stored in specific countries or regions, such as regional data protection regulations in the European Union or data localization requirements in specific jurisdictions.

For Contoso, whose European operations are hosted in an EU-based Power Platform environment, this means that customer and manufacturing data collected in that region is guaranteed to remain in the EU without requiring additional configuration.

### Data subject rights and regulatory compliance

Many data protection regulations grant individuals significant rights over their personal data, including the right to access, correct, and delete data held about them. Microsoft provides extensive resources and tooling to help organizations meet these obligations when using Power Platform:

*   The Microsoft Trust Center provides documentation on regulatory compliance, including data processing agreements, data impact assessment templates, and breach notification procedures.
*   The Service Trust Portal provides information about how Power Platform supports compliance obligations across a range of regulatory frameworks.
*   Power Platform administrators can use **Microsoft Purview** to conduct data subject requests (DSRs)—locating and exporting or deleting personal data stored in Dataverse and other Power Platform data stores.

### Microsoft Purview and activity logging

**Microsoft Purview** provides a unified compliance and data governance experience that integrates with Power Platform. Activity logging for Power Apps, Power Automate, Power Pages, Copilot Studio, Dataverse and model-driven apps, Power Platform connectors, and administrative actions is available through the Microsoft Purview portal. Activity logs capture events such as when an app is launched, when a flow is run, and when administrative configuration changes are made.

These logs enable security and compliance teams to:

*   Detect and investigate unusual usage patterns or potential security incidents.
*   Demonstrate audit trails for regulatory reporting.
*   Track changes to Power Platform configuration and administrative settings.

## Accessibility in Microsoft Power Platform

Microsoft is committed to building products that are accessible to all users, including those with vision, hearing, cognitive, and motor impairments. Power Platform incorporates accessibility features across its components to ensure that the apps and workflows built on the platform can be used effectively by everyone.

### Power Apps accessibility

Makers building canvas apps in Power Apps have access to an **Accessibility Checker** tool that automatically reviews the app design for potential accessibility issues. The checker identifies problems such as missing alt text on images, insufficient color contrast ratios, and controls that are not reachable via keyboard navigation. Resolving these issues helps ensure that apps meet accessibility standards such as Web Content Accessibility Guidelines (WCAG) 2.2.

Canvas apps also support keyboard navigation, enabling users who cannot use a mouse to navigate through all interactive controls using the keyboard alone. Screen reader support allows users with visual impairments to use compatible assistive technologies to interact with Power Apps interfaces.

### Power BI accessibility

Power BI supports accessibility through improved keyboard navigation, screen reader compatibility, and high-contrast display modes. Reports built in Power BI can be configured to include alternative text for visuals, making data visualizations understandable to users who rely on screen readers. Tabular representations of chart data can also be exposed for keyboard and screen reader users, ensuring that insights are accessible even when visual charts cannot be perceived.

### Platform-wide accessibility standards

Across Power Platform, Microsoft targets conformance with WCAG 2.2 AA standards, which are the most widely recognized accessibility guidelines for web-based technology. WCAG 2.2 is backward-compatible with WCAG 2.1 and adds criteria for mobile and cognitive accessibility. Organizations building solutions on Power Platform are encouraged to use the accessibility features and checkers available in each tool to validate their own solutions before deployment, ensuring that all users in their organization can benefit from the apps and workflows they create.
