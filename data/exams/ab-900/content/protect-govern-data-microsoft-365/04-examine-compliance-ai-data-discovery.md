---
title: "Examine compliance, AI data discovery, and eDiscovery"
url: "https://learn.microsoft.com/en-us/training/modules/protect-govern-data-microsoft-365/4-examine-compliance-ai-data-discovery"
uid: "learn.wwl.protect-govern-data-microsoft-365.examine-compliance-ai-data-discovery"
module: "protect-govern-data-microsoft-365"
moduleTitle: "Protect and govern Microsoft 365 data"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Examine compliance, AI data discovery, and eDiscovery

In today’s digital landscape, organizations face increasing pressure to safeguard sensitive information, comply with regulatory requirements, and manage the risks associated with rapidly evolving technologies like artificial intelligence. For admins and IT professionals, understanding how compliance, data discovery, and eDiscovery intersect is essential for building a secure and resilient environment.

Microsoft Purview offers a unified platform for managing compliance, discovering sensitive and AI-impacted data, and executing legal holds and investigations. Admins who use Purview’s advanced capabilities can not only assess their organization’s compliance posture but also gain visibility into how data is used, shared, and accessed, especially as AI-driven workflows become more prevalent.

Admins new to Microsoft Purview can build a comprehensive foundation by exploring its tools and processes that underpin modern compliance management. Microsoft Purview Compliance Manager, Data Explorer, DSPM for AI, and eDiscovery are essential resources for proactively managing risk, supporting governance, and maintaining trust. These tools enable organizations to assess compliance posture, locate sensitive and AI-impacted data, and perform content discovery and legal hold using advanced compliance and discovery capabilities.

![Screenshot of the Microsoft Purview portal, which is the entry point for all compliance solutions.](../../wwl/protect-govern-data-microsoft-365/media/purview-portal.png)

### Compliance Manager

Compliance Manager is the cornerstone of Microsoft Purview’s compliance capabilities. It acts as a risk assessment and recommendations engine, helping organizations navigate complex regulatory landscapes such as GDPR, HIPAA, and ISO 27001. For admins, using Compliance Manager enables them to evaluate their organization’s current compliance status, identify gaps, and implement targeted improvements.

At its core, Compliance Manager provides structured assessments tailored to specific regulations. Each assessment is composed of controls—some managed by Microsoft, others by the customer—that define the requirements for compliance. Admins can map these controls to actionable improvement steps, which transforms compliance from a static checklist into a dynamic, ongoing process. The platform’s governance features allow you to assign owners and track the status of each action, making compliance a collaborative effort.

A key feature of Compliance Manager is the Compliance Score, which quantifies how well your organization meets regulatory requirements. This score is more than just a number; it’s a strategic tool for prioritizing remediation efforts and demonstrating progress to stakeholders. For example, if your organization is subject to government regulations, Compliance Manager might recommend enabling audit logging, deploying Data Loss Prevention (DLP) policies for personal data, and classifying content in Exchange. Each recommendation is mapped to an owner and tracked for completion, turning compliance into a manageable project.

Key features and examples of Compliance Manager include:

*   **Assessments based on regulations**. Compliance Manager offers prebuilt assessments for major regulations. For instance, a GDPR assessment includes controls for data protection, breach notification, and subject rights. Admins can use these assessments to identify which requirements are already met and which need attention. For example, if audit logging isn’t enabled, the assessment flags it as a gap and provides guidance on remediation.
    
*   **Controls (Microsoft-managed and customer-managed)**. Each assessment is divided into controls. Microsoft-managed controls are automatically monitored by the platform, such as encryption settings or service configurations. Customer-managed controls require manual verification, like ensuring staff training or documenting data processing activities. Admins can assign each control to a responsible party, track progress, and upload evidence of compliance.
    
*   **Improvement actions and Compliance Score**. Improvement actions are specific steps recommended by Compliance Manager to close compliance gaps. These actions might include enabling auditing, assigning sensitivity labels, or updating privacy notices. The Compliance Score reflects the percentage of controls that are satisfied, giving admins a clear view of their organization’s compliance posture. For example, after implementing DLP for personal data, the score should increase, signaling improved compliance.
    

### Microsoft Purview Data Explorer

Data Explorer is designed to help admins discover where sensitive data resides across the organization. In environments where data is scattered across emails, documents, chats, and cloud storage, visibility is crucial for effective governance. Data Explorer provides powerful tools to visualize, filter, and analyze sensitive information. These tools enable admins to understand data exposure and take proactive measures.

The Microsoft Purview platform enables you to search for sensitive info types—such as credit card numbers, Social Security Numbers (SSNs), and health data—across multiple locations, including SharePoint, Teams, and OneDrive. By applying filters based on location, sensitivity label, or content type, admins can quickly pinpoint areas of concern. This capability is especially valuable before implementing new security policies, as it reveals potential risks and informs decision-making.

Data Explorer’s visualization features make it easy to see patterns and trends in data usage. For example, an admin might want to know where all “Confidential – Finance” documents are stored and whether any are shared externally. Data Explorer can display the files, their owners, and sharing status, providing a comprehensive view of data exposure. This insight is essential for protecting sensitive information and ensuring compliance with internal and external requirements.

Key features and examples of Data Explorer include:

*   **Discover where sensitive data is stored**. Data Explorer scans your organization’s digital assets to locate sensitive information. For example, it can identify all documents containing credit card numbers stored in SharePoint and flag those documents that are also accessible to external users. Doing so helps admins assess the risk of data leakage and prioritize remediation efforts.
    
*   **Visualize sensitive information types**. The tool categorizes data by info type, making it easy to see how much sensitive information exists and where it’s concentrated. For instance, an admin might discover that health data is primarily stored in a specific Teams channel, prompting a review of access controls and sharing policies.
    
*   **Filter by location, sensitivity label, and content type**. Admins can apply filters to narrow down search results. If you’re concerned about “Confidential – Finance” documents, you can filter by sensitivity label and location to see only relevant files. Data Explorer shows who owns each file, how it’s shared, and whether it’s at risk of unauthorized access.
    

### Discover and manage AI activity using Data Security Posture Management

With the rise of AI-powered tools like Microsoft 365 Copilot and non-Microsoft generative AI applications, managing your organization’s data security posture has become more complex than ever. Microsoft Purview Data Security Posture Management (DSPM) provides a unified experience that helps organizations discover, monitor, and protect sensitive data across both traditional data environments and AI-driven workflows.

DSPM extends data security visibility into AI interactions—enabling admins to understand how AI apps and agents access, process, and generate content using organizational data. This unified approach helps organizations confidently adopt AI while maintaining strong security, compliance, and governance practices.

#### Understand AI activity and data exposure risks

DSPM enables admins to track how AI interacts with sensitive data across the organization, such as identifying where AI-generated content is stored, how it’s labeled, and who has access to it. For example, DSPM can surface scenarios where Microsoft 365 Copilot summarizes legal contracts or generates reports using regulated data. Admins who monitor these interactions can identify potential risks, such as oversharing, inappropriate access, and unintended exposure of sensitive information.

DSPM also helps organizations detect and manage shadow AI usage, which is the use of unapproved AI tools or services outside of IT governance. Shadow AI usage refers to the unauthorized use of AI technologies—such as generative AI apps, machine learning tools, or browser extensions—without formal approval or oversight. Similar to shadow IT, shadow AI introduces risks related to data leakage, compliance violations, and lack of visibility into how organizational data is being used.

When DSPM identifies these types of patterns, admins can take appropriate action, such as restricting access, applying policies, or guiding users toward approved tools.

#### Apply controls to protect sensitive data in AI scenarios

Admins who use DSPM can define and enforce policies that help protect sensitive data when it’s accessed or processed by AI. For example:

*   Restrict access to sensitive content types, such as legal case files or HR records
*   Apply encryption or sensitivity labels to AI-generated content
*   Adjust access controls based on the sensitivity of the underlying data

If DSPM detects that AI tools are interacting with regulated data in ways that could introduce risk, it provides recommendations to help admins strengthen protection and reduce exposure. This approach enables organizations to balance productivity and protection, which supports AI adoption while maintaining control over sensitive information.

#### Key DSPM capabilities for AI-related scenarios

DSPM includes the following built-in capabilities that help organizations secure data across AI interactions:

*   **Discover AI-generated content and apply labels**. DSPM helps identify files and messages created using AI tools and ensures they're protected with appropriate sensitivity labels. For example, a Copilot-generated summary of a financial report can be automatically labeled “Confidential” and stored securely.
    
*   **Detect AI interactions with sensitive data**. DSPM provides visibility into how AI tools access and process sensitive information. For example, if AI is used to analyze regulated content, DSPM surfaces this activity and recommends actions such as restricting access or applying other protections.
    
*   **Monitor data access patterns and identify shadow AI usage**. DSPM tracks how apps and services interact with organizational data, including both Microsoft and non-Microsoft AI tools. For example, if an unauthorized app attempts to access sensitive data, DSPM can flag the activity and guide remediation.
    

#### Gain visibility through integrated reporting and analytics

DSPM includes built-in reporting and analytics capabilities that provide centralized visibility into how sensitive data is accessed, processed, and exposed across AI-driven workflows. These capabilities are integrated into the DSPM experience and serve as the foundation for monitoring, investigation, and policy enforcement.

Key reporting features include:

*   **Activity Explorer views**. Provide visibility into AI interactions, including prompts and responses, along with associated sensitivity labels and policy matches.
*   **Audit logs**. Capture detailed records of user and AI activity, supporting investigation and compliance scenarios.
*   **Oversharing assessments**. Help identify where sensitive data might be overexposed and guide remediation efforts.
*   **Data risk assessment reports**. Summarize patterns of sensitive data usage and user behavior across the organization, including AI-related interactions.

Together, these capabilities enable admins to monitor AI usage, detect risks, and apply protection controls based on real-time insights, all within a single, unified DSPM experience.

### Content Search and eDiscovery in Microsoft Purview

Legal and compliance investigations often require searching for specific content across the organization’s digital assets. Microsoft Purview’s Content Search and eDiscovery tools provide robust capabilities for locating, reviewing, and preserving information in response to legal requests, audits, or internal investigations. For admins, effectively using these tools is essential for supporting compliance and mitigating risk.

Content Search enables admins to search across mailboxes, SharePoint sites, OneDrive, and Teams using keywords, sender information, dates, and sensitivity labels. The platform supports both Keyword Query Language (KQL) and graphical user interface (GUI) filters, making it accessible to users with varying levels of technical expertise. Results can be exported for review or archiving, ensuring that relevant information is preserved.

eDiscovery in Microsoft Purview comes in two editions, Standard and Premium.

*   eDiscovery (Standard) offers basic search, export, and legal hold features.
*   eDiscovery (Premium) adds advanced capabilities such as case management, review sets, analytics, and redaction.

For example, in a legal case, a compliance officer might use eDiscovery Premium to place a hold on a departing employee’s mailbox and OneDrive, review conversations in Teams, and export findings for legal review.

Key features and examples of Content Search and eDiscovery in Microsoft Purview include:

*   **Content Search across Microsoft 365**. Admins can search for emails, documents, and chats using keywords, sender/recipient details, and date ranges. For example, if an investigation requires all communications related to a specific project, Content Search can quickly locate relevant messages and files across multiple platforms.
    
*   **eDiscovery (Standard and Premium)**. eDiscovery (Standard) provides essential tools for searching and exporting content, and placing legal holds to prevent data deletion. eDiscovery (Premium) enhances these capabilities with case management, analytics (such as identifying near-duplicate documents and common themes), and redaction features. In practice, a compliance officer might use Premium to manage a complex legal case, ensuring all relevant data is preserved, reviewed, and protected.
    
*   **Legal hold and review sets**. Legal hold prevents data from being altered or deleted during an investigation. Review sets allow admins to organize and analyze collected content, making it easier to identify key evidence. For example, during a legal dispute, placing a hold on an employee’s mailbox and OneDrive ensures that all relevant communications and files are available for review.
