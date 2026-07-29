---
title: "Classify data using trainable classifiers"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-classify-data/using-trainable-classifiers"
uid: "learn-m365.m365-compliance-information-classify-data.using-trainable-classifiers"
module: "m365-compliance-information-classify-data"
moduleTitle: "Classify data for protection and governance"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Classify data using trainable classifiers

Trainable classifiers use AI to identify and categorize data that can't be classified with predefined patterns or keywords. Unlike **sensitive information types (SITs)**, which detect structured data like credit card numbers or Social Security numbers, trainable classifiers analyze content based on meaning and context. This makes them useful for detecting unstructured data, such as contracts, financial reports, or HR records.

## Why use trainable classifiers?

Many organizations have sensitive content that doesn't follow a predictable format. Trainable classifiers help:

*   Identify complex data that SITs can't detect.
*   Reduce reliance on manual classification.
*   Improve compliance and security by automatically recognizing content that should be protected.

## Types of trainable classifiers

Microsoft Purview provides two types of trainable classifiers:

*   **Pretrained classifiers**: Built-in classifiers that are ready to use for common content types such as resumes, source code, and offensive language. Microsoft regularly updates these classifiers to improve accuracy.
*   **Custom trainable classifiers**: Organizations can train their own classifiers using real-world examples to detect data unique to their business. Custom classifiers require manual training and refinement to improve accuracy over time.

### Pretrained classifiers

Pretrained classifiers help organizations identify common types of unstructured data without requiring manual setup. They're designed to detect categories of content that are difficult to classify with traditional pattern-based methods.

Microsoft provides pretrained classifiers for specific types of content, such as:

*   **Offensive language**: Detects profane or inappropriate content.
*   **Resumes**: Identifies job applicant resumes for HR data management.
*   **Source code**: Helps track and protect proprietary or sensitive code.

Pretrained classifiers are built and refined by Microsoft using AI and machine learning. They're periodically updated to improve accuracy and adapt to evolving content types.

## Where trainable classifiers are used

Trainable classifiers integrate with several Microsoft Purview solutions, allowing organizations to classify and govern data effectively:

*   **Auto-labeling policies**: Apply sensitivity labels automatically based on classifier results.
*   **Retention policies**: Identify and retain important content while disposing of obsolete data.
*   **Data loss prevention (DLP)**: Prevent sensitive information from being shared outside the organization.
*   **Communication compliance**: Monitor messages for policy violations, including inappropriate content.

## Limitations of trainable classifiers

While trainable classifiers provide powerful AI-driven classification, they have some limitations:

*   They require an initial **training and review** process to improve accuracy.
*   They **don't work on encrypted content**.
*   They **only classify content in supported locations** (such as SharePoint, OneDrive, and Exchange).

## Compare trainable classifiers and sensitive information types

Feature

Trainable Classifiers

Sensitive Information Types (SITs)

Detection method

AI-based analysis

Pattern-based (for example, regex, keywords)

Best for

Unstructured data

Structured data

Requires training?

Yes

No (built-in SITs)

Works with autolabeling, DLP, and compliance?

Yes

Yes

Detects encrypted content?

No

No
