---
title: "Classify data using sensitive information types"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-classify-data/using-sensitive-information-types"
uid: "learn-m365.m365-compliance-information-classify-data.using-sensitive-information-types"
module: "m365-compliance-information-classify-data"
moduleTitle: "Classify data for protection and governance"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Classify data using sensitive information types

Protecting sensitive data starts with knowing what exists in your organization's environment. Microsoft Purview provides **sensitive information types (SITs)** to help detect structured data, such as financial details, personal identifiers, and regulatory terms. By classifying this data accurately, organizations can apply the right protection and compliance measures.

Microsoft Purview classifies data using three methods:

*   **Manually by users**: Users apply labels based on their understanding of the data.
*   **Pattern-based classification**: SITs recognize predefined patterns, such as credit card numbers or Social Security numbers.
*   **AI-powered classification**: Trainable classifiers use AI models to recognize data based on meaning and context rather than predefined patterns.

SITs are a key part of classification, allowing organizations to automatically detect sensitive data and apply policies to prevent data loss, enforce retention rules, and strengthen compliance.

## Where are sensitive information types used?

SITs play a role in multiple Microsoft Purview solutions to help organizations manage and protect data:

*   **Data loss prevention (DLP)**: Identifies and prevents unauthorized sharing of sensitive data.
*   **Sensitivity labels**: Supports classification and protection through labeling policies.
*   **Retention labels**: Applies governance policies to structured data.
*   **Insider risk management**: Helps detect potential security violations based on identified data types.
*   **Communication compliance**: Monitors messages for sensitive data or policy violations.
*   **Auto-labeling policies**: Applies labels to content automatically based on detected SITs.

## Compare built-in and custom sensitive information types

Microsoft Purview provides both built-in and custom SITs to support different classification needs.

### Built-in sensitive information types

Built-in SITs detect common types of sensitive data and are ready to use without customization.

*   **Standard SITs**: Identify commonly recognized sensitive data, such as credit card numbers, bank account details, and government-issued IDs.
*   **Named entity SITs**: Detect predefined named entities, such as personal names, addresses, or medical terms.

Built-in SITs provide broad coverage and help organizations quickly classify regulated and sensitive data without additional configuration.

### Custom sensitive information types

Custom SITs allow organizations to create their own classifiers to detect data unique to their environment. Microsoft Purview provides several options:

*   **Keyword-based SITs**: Define sensitive data patterns using specific keywords, dictionaries, or regular expressions.
*   **Exact data match (EDM) SITs**: Classify data by referencing a structured dataset containing specific values, improving accuracy for structured records.
*   **Document fingerprinting**: Creates SITs based on document templates, allowing organizations to detect and classify content that follows a specific form.

Custom SITs provide greater flexibility for organizations with specialized classification requirements that built-in SITs don't cover.

## How sensitive information types identify data

SITs detect sensitive information based on predefined patterns and contextual evidence. Each SIT includes detection rules that define what it looks for and how confidently it can classify data. This structured approach ensures accuracy in applying policies across Microsoft Purview solutions. Microsoft Purview also provides a feedback mechanism to refine SIT detection, helping ensure classifications remain accurate over time.
