---
title: "Introduction to Microsoft Purview and data governance"
url: "https://learn.microsoft.com/en-us/training/modules/protect-govern-data-microsoft-365/2-introduction-microsoft-purview"
uid: "learn.wwl.protect-govern-data-microsoft-365.introduction-microsoft-purview"
module: "protect-govern-data-microsoft-365"
moduleTitle: "Protect and govern Microsoft 365 data"
learningPath: "learn.wwl.explore-microsoft-365-administration"
---
# Introduction to Microsoft Purview and data governance

In today’s data-driven organizations, the volume, velocity, and variety of information being generated, stored, and shared is exploding. Emails, documents, chat messages, logs, customer data, employee records, and other digital assets flow across local networks, cloud services, and non-Microsoft apps. While this data can be an invaluable asset, it also introduces significant risk, whether from data leaks, noncompliance with regulations like GDPR or HIPAA, or internal misuse of sensitive information.

![Diagram showing the top security and governance concerns about generative AI, including data oversharing and leaks, identification of risky AI use, and AI governance and risk visibility.](../../wwl/protect-govern-data-microsoft-365/media/security-concerns-about-ai.png)

For IT professionals and administrators, the challenge is clear: How do you keep this data secure, compliant, and manageable while still enabling users to collaborate effectively? This challenge is where Microsoft Purview enters the picture. Purview is Microsoft’s unified solution for data governance, information protection, and compliance management across Microsoft 365 and beyond. With Purview, administrators can automatically:

*   Discover sensitive data
*   Classify it based on risk or compliance needs
*   Apply labels and protection settings
*   Control the entire lifecycle of data, from creation to deletion

The goal of this training unit is to provide you with an understanding of what Microsoft Purview offers, and how its data governance features ensure that an organization’s data is accurate, consistent, secure, and appropriately managed across its lifecycle.

### What is Microsoft Purview?

Microsoft Purview is a cloud-based data governance and compliance platform. It provides a centralized suite of tools to help organizations manage their data across Microsoft 365 and other cloud or hybrid environments. It was designed in response to growing business needs for visibility, control, and accountability over sensitive and regulated data. At its core, Microsoft Purview unifies features that were once fragmented across different Microsoft services and presents them through a single, integrated portal. Microsoft Purview’s features fall into three primary categories: data security, data governance, and risk and compliance, as shown in the following diagram.

![Diagram showing the main areas addressed by Microsoft Purview, including data security, data governance, and risk and compliance.](../../wwl/protect-govern-data-microsoft-365/media/microsoft-purview-features.png)

Some of the key features of Microsoft Purview include:

*   **Information Protection**. Information Protection in Microsoft Purview empowers organizations to classify, label, and encrypt sensitive data across emails, documents, and collaboration platforms. Sensitivity labels, applied manually or automatically, ensure that confidential information is consistently protected, with controls that travel with the data wherever it goes. These labels can enforce encryption, restrict access, and apply visual markings, helping organizations meet regulatory requirements and reduce the risk of data leaks. Beyond labeling, Information Protection integrates with Microsoft Office and other productivity tools, allowing administrators to monitor how sensitive data is accessed and shared. Policy enforcement is seamless, and detailed reporting enables compliance audits and proactive risk management. Purview combines automated protection with user-driven controls, which helps organizations foster a culture of security and accountability.
    
*   **Data Loss Prevention (DLP)**. Data Loss Prevention (DLP) in Purview helps prevent the accidental or intentional sharing of sensitive information by scanning content for predefined patterns like credit card numbers or personal identifiers. DLP policies can block risky actions, notify users, and alert administrators, ensuring that sensitive data isn't leaked or mishandled across Microsoft 365 workloads. DLP is highly customizable, allowing organizations to define what constitutes sensitive data and specify the actions to take when such data is found. Policy tips educate users about compliance requirements, while robust reporting and analytics help administrators track incidents and refine policies. DLP works in concert with other Purview features to provide a comprehensive approach to data governance.
    
*   **Insider Risk Management**. Insider Risk Management monitors user activities for unusual or risky behavior. It uses behavioral analytics to detect and mitigate internal threats, such as data leaks or policy violations. Administrators can configure risk indicators and automated workflows to investigate and remediate incidents, helping organizations proactively address potential risks from within. This feature supports collaboration between IT, HR, and legal teams, ensuring investigations are handled appropriately and in compliance with privacy regulations. Detailed audit trails and case management tools enable both proactive risk mitigation and post-incident analysis, helping organizations protect their most valuable data assets.
    
*   **Communications Compliance**. Communications Compliance monitors and manages communications across email, Teams, and Yammer to ensure adherence to regulatory and organizational policies. Purview scans messages for inappropriate language, sensitive topics, or policy violations, flagging content for review and enabling organizations to maintain a safe, compliant, and respectful workplace. Administrators can define custom policies, set up automated workflows for escalation, and generate compliance reports to analyze trends and identify areas for improvement. Integration with other Purview features ensures a unified approach to data governance, reducing legal and reputational risks.
    
*   **DSPM for AI (Data Security Posture Management)**. DSPM for AI in Purview provides visibility and control over sensitive data used by artificial intelligence systems, helping organizations discover, classify, and secure data flows in AI workloads. DSPM assesses risks and enforces policies, which ensures that AI initiatives are both innovative and compliant with data protection requirements. Ongoing monitoring and auditing allow organizations to track how data is used by AI systems over time, generate reports, and adjust policies as needed. DSPM integrates with other Purview features to support responsible AI development while protecting sensitive data.
    
*   **Data Lifecycle Management (DLM)**. Data Lifecycle Management automates the retention, archiving, and deletion of data based on business, legal, or regulatory requirements. Through retention labels and policies, Purview ensures that information is kept only as long as necessary. Doing so reduces risk, saves storage costs, and supports compliance and eDiscovery needs. Administrators can configure rules to apply across Microsoft 365 workloads, track when and how retention labels are applied, and audit changes for compliance. DLM works alongside other Purview capabilities to streamline data management and maintain a strong governance posture.
    

At its core, data governance is about ensuring that data is accurate, consistent, secure, and appropriately managed across its lifecycle. Doing so involves both technical tools and organizational policies. In regulated industries, data governance is critical for compliance with standards like GDPR, HIPAA, SOX, and ISO 27001. But even in less-regulated environments, good governance helps reduce risk, improve decision-making, and streamline operations.

Microsoft Purview operationalizes data governance through a combination of classification, labeling, protection, retention, auditing, and policy enforcement. It provides granular control over who can access what data, under what conditions, and for how long. It also provides visibility into how data is used, such as when a document is shared externally, or when an unauthorized user accesses a sensitive file. As an admin, your role is to define the policies that align with business and legal requirements, then use Purview to implement and monitor them.

![Diagram showing the methods used to secure and govern Copilot use, including addressing oversharing concerns, protecting against data loss and insider risks, and governing AI use to meet regulations and policies.](../../wwl/protect-govern-data-microsoft-365/media/secure-and-govern-copilot-use.png)

The remainder of this unit focuses on three major data governance capabilities within Microsoft Purview:

*   **Data discovery and classification**. Identifying and tagging sensitive information.
*   **Sensitivity labels and information protection**. Enforcing access and usage controls.
*   **Data lifecycle management**. Controlling retention and deletion based on rules or events.

### Data discovery and classification

Data discovery and classification are foundational capabilities in Purview that enable you to understand what kind of data exists in your environment, where it resides, and how sensitive it is. Without visibility into your data landscape, it’s impossible to apply meaningful protection or retention policies. Data discovery involves scanning data sources (like SharePoint, Exchange, Teams, and so on) to identify sensitive or regulated content. Classification involves assigning categories or labels to that data based on its contents.

Purview uses a combination of pattern recognition, AI-based machine learning, and metadata inspection to classify data. For example, it can detect when a file contains a credit card number based on Luhn validation patterns, or it can recognize when a document contains resume information based on a classifier trained with sample resumes. Classification can happen in the following ways:

*   Manually, by user selection
*   Automatically, based on policy rules
*   Through a trainable classifier that is AI trained on specific document types

By automatically classifying data, you create a powerful foundation for labeling, protection, and compliance reporting. For example, if Purview classifies a file as containing personal data, you can automatically apply a retention label or block the file from being emailed externally. Classification is also important for auditing purposes, as it helps you understand where risk lies within your organization.

![Diagram showing how data governance and compliance is built upon the data classification foundation.](../../wwl/protect-govern-data-microsoft-365/media/data-classification.png)

The following sections examine the key types of classification in Microsoft Purview.

##### Sensitive information types

Purview includes a large library of predefined sensitive information types, such as:

*   Credit card numbers
*   Social Security numbers
*   Health Insurance Claim Numbers
*   U.S. or international passport numbers

These information types are recognized using regex patterns, checksums, keyword evidence, and confidence scoring. For example, consider the scenario where a spreadsheet uploaded to OneDrive contains a column labeled "SSN" with values like 123-45-6789. Purview detects the pattern, checks the formatting, and matches it against the "U.S. Social Security Number" SIT. This triggers a classification tag.

##### Trainable classifiers

Trainable classifiers are machine learning-based models that you train with examples of documents that fall into a specific category. Microsoft includes several built-in classifiers, such as:

*   Resumes
*   Source code
*   Healthcare templates

You can also build custom classifiers by uploading at least 50 sample documents. Purview learns the characteristics of those documents and applies classification when it sees new documents with similar structure or content. For example, consider the scenario in which your HR department stores job applicant resumes. You train a classifier on 50 resumes. Once trained, Purview begins to identify resumes across SharePoint and Outlook, even if the term "resume" isn’t explicitly mentioned.

##### Exact data match (EDM)

EDM is a way to help Microsoft Purview find and protect specific pieces of sensitive information, such as Social Security numbers, employee IDs, or customer account numbers. Instead of looking for patterns or keywords, EDM checks if the data exactly matches entries in a secure list that your organization provides. For example, if you upload a list of employee IDs, EDM can scan emails, documents, and other content to find those exact IDs and apply protection rules. This process helps reduce mistakes and makes sure only the right data is flagged. EDM is especially useful when you need high accuracy and want to avoid false alarms.

EDM-based sensitive information types can be integrated into data loss prevention (DLP) policies, auto-labeling, eDiscovery, and other compliance solutions across Microsoft 365. The EDM workflow involves defining a schema, creating a rule package, hashing and uploading the source data, and validating the classifier, all of which can be managed through the Microsoft Purview portal or PowerShell.

For example, consider the scenario in which your HR team uploads a CSV of all employee ID numbers. You configure a policy to detect when any of those IDs appear in a document or email. This process ensures highly accurate detection without false positives, since EDM only triggers if the exact value is found.

EDM offers greater precision than pattern-based tools like regular expressions (regex) in scenarios where identifying specific, known sensitive data is critical. While regex is useful for detecting general patterns in text, EDM reduces false positives by matching against a secure, predefined dataset.

For example, if you wanted to find Social Security numbers in a document, you could use a regex pattern like \\d{3}-\\d{2}-\\d{4} to match any text that looks like an SSN. However, regex only looks at the _format_ of the data, not whether the value is _actually valid or sensitive_. In doing so, it can sometimes flag false positives, such as a random number that happens to match the pattern but isn’t a real SSN. In contrast, EDM only triggers when the content matches a specific value from a secure list your organization provides, making it much more accurate.

### Sensitivity labels and Information protection

Sensitivity labels are at the core of Microsoft Purview’s information protection capabilities. These labels allow you to classify and protect data based on its sensitivity level. Once a label is applied, it can enforce encryption, restrict access, add visual markings (like headers/watermarks), and control external sharing. Sensitivity labels travel with the data, meaning that even if a document is downloaded and emailed outside the organization, the label’s protection still applies.

Labels can be applied in several ways: users can apply them manually, the system can apply them automatically based on content detection, or labels can be recommended to users as suggestions. For example, if a user types a credit card number into an Excel file, a label can automatically apply, or a policy tip can prompt the user to apply the correct label. Administrators can also enforce mandatory labeling, ensuring that no document is saved without an appropriate label.

Once a label is applied, the protection settings are embedded into the file’s metadata. Microsoft Office applications like Word, Excel, and Outlook have built-in support for Purview labels, so protections are enforced at the application level, including when offline.

Label components and behavior include:

*   **Encryption settings**. Labels can enforce encryption that restricts who can open a document and what they can do (read, edit, print, copy). Encryption is enforced using Azure Rights Management. For example, a label called “Confidential – HR Only” encrypts documents so that only members of the “HR” security group can open them. Even if the document is downloaded to a USB drive and opened on a home PC, it remains encrypted and inaccessible to unauthorized users.
    
*   **Content markings**. Labels can apply visual markings to documents and emails, such as headers, footers, and watermarks. The purpose of the markings is to alert users to the sensitivity of the content. For example, a document labeled “Top Secret” includes a red header saying “CONFIDENTIAL – INTERNAL USE ONLY” and a diagonal watermark across each page. These markings remind users to treat the content carefully.
    
*   **Access restrictions and sharing controls**. Labels can control whether content can be, shared externally, copied or printed, and accessed by unmanaged devices. For example, a sensitivity label applied to a financial report might block external sharing via OneDrive and prevent users from printing the file at home.
    
*   **Label policies**. Sensitivity labels are deployed to users through label policies. These policies determine:
    
    *   Which labels are available to which users or groups
    *   Whether labeling is optional or mandatory
    *   Whether users can override automatic labeling
    *   Whether justification is required for changing labels
    
    For example, you create a policy for the Legal department that includes four labels: Public, Internal, Confidential, Legal Only. You make labeling mandatory and require users to justify any change from a more restrictive label to a less restrictive one.
    

### Data lifecycle management

Data lifecycle management (DLM) is the process of controlling how long data is retained, how it’s stored, and when it’s deleted or archived. In Microsoft Purview, this functionality allows organizations to automatically enforce data retention policies and deletion rules based on regulatory, legal, or business requirements. The goal is to ensure that information is retained for as long as it's needed, and no longer. This goal is vital not only for compliance, such as GDPRs “right to be forgotten,” but also for reducing data risk, saving storage costs, and simplifying eDiscovery processes.

Without proper DLM, organizations often accumulate large volumes of outdated or redundant data, making it harder to manage and protect sensitive content. Keeping everything "just in case" is no longer viable from a legal or operational standpoint. Microsoft Purview provides centralized tools to automatically retain, archive, or delete content across Microsoft 365 workloads, including Exchange, SharePoint, OneDrive, Microsoft Teams, Yammer, and more.

The following sections examine the key components of data lifecycle management.

##### Retention labels

Retention labels define the retention behavior for specific content. A retention label might instruct the system to retain content for a fixed period, to delete content after a specified number of days, or to retain and then delete content after a defined period.

For example, consider the scenario in which you create a retention label called “7-Year Legal Hold” that retains any content it's applied to for exactly seven years. During this time, even if a user tries to delete the file or email, Purview preserves it in the background. After seven years, the content is automatically deleted unless it's subject to a legal hold.

Users can manually apply retention labels (for example, through the ribbon in Outlook or SharePoint), or the system can automatically apply labels based on conditions such as:

*   Content type (email, document, Teams message)
*   Keywords or sensitive data types
*   Metadata (for example, “Document Type = Contract”)

Labels offer fine-grained control and support auditing, so you can track when and how a label was applied or changed.

##### Retention policies

Retention policies are broader than labels. These policies are typically used to apply rules across locations or content types without needing to label each item individually.

For example, consider the scenario in which you configure a retention policy to delete all Teams chat messages older than 90 days across the organization. This policy applies regardless of whether a label is present and doesn't require user interaction.

Retention policies are useful for scenarios where:

*   You want to apply uniform rules to all users or content types.
*   You’re dealing with legacy or unlabeled content.
*   You want to ensure a baseline data hygiene standard.

Unlike retention labels, retention policies are location-based, meaning you select the target services (such as SharePoint, Exchange) and let Purview manage content across them.

##### Auto-apply rules

Purview allows retention labels to be automatically applied based on content conditions. These rules use the same classification engines as sensitivity labeling, including:

*   Keywords or phrases, such as "contract” and “termination”
*   Sensitive information types, such as SSNs and credit card numbers
*   Trainable classifiers, such as resumes and non-disclosure agreements

For example, consider the scenario in which you create a rule that applies a 5-year retention label to any document containing credit card numbers. This process ensures that financial data is retained only as long as legally necessary and then deleted to minimize exposure.

Automatically applied rules remove reliance on users to apply the correct label, which improves consistency and compliance.
