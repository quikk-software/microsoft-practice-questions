---
title: "Integrate Insider Risk Management with data sources and tools"
url: "https://learn.microsoft.com/en-us/training/modules/purview-prepare-insider-risk-management/insider-risk-management-integrations"
uid: "learn.wwl.purview-prepare-insider-risk-management.insider-risk-management-integrations"
module: "purview-prepare-insider-risk-management"
moduleTitle: "Prepare for Microsoft Purview Insider Risk Management"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Integrate Insider Risk Management with data sources and tools

Microsoft Purview Insider Risk Management enables organizations to identify and manage insider risks by using data from various sources and security tools. Integrating these data sources helps refine risk detection, improve policy effectiveness, and support thorough investigations—while maintaining user privacy and respecting organizational policies.

## What are connectors?

Connectors allow Insider Risk Management to import data from internal and external systems. This data provides insights that support the creation of effective policies and the identification of relevant patterns or activities. The imported data is securely managed and used to align with organizational goals and compliance requirements.

**Examples include**:

*   **HR connectors**: Use employee lifecycle data, such as resignation or termination dates, to inform policies about departing employees.
*   **Healthcare connectors**: Import electronic health record (EHR) audit data to help identify unauthorized access or data handling.
*   **Cloud app connectors**: Bring in detections from non-Microsoft applications, such as Dropbox or Google Drive, to expand visibility into data usage.

These integrations focus on providing actionable insights, enabling organizations to respond to risks proactively while respecting privacy.

## Key integrations

Several tools and data sources enhance the capabilities of Insider Risk Management by providing additional signals or enabling centralized management. These include:

*   **HR and healthcare connectors**: Import employee and healthcare data to support policy creation and refine risk detection.
*   **Cloud app integrations**: Use detections from cloud apps like Amazon S3 or Salesforce to identify activities that could pose risks to sensitive data.
*   **Data loss prevention (DLP)**: Link high-severity DLP alerts to insider risk policies to help prevent unintentional or intentional data leaks.
*   **Microsoft Defender for Endpoint**: Integrate endpoint security alerts to provide additional context for risk assessments.
*   **SIEM and SOAR platforms**: Export alerts to solutions like Microsoft Sentinel for centralized alert management and automated responses.

These integrations provide flexible ways to enhance risk detection, align with organizational needs, and maintain compliance.

### Example use cases

Integrations can address common risk scenarios, such as:

*   **Departing employees**: Use HR connectors to include resignation data in policies that assess potential risks of data exfiltration.
*   **Healthcare privacy**: Apply healthcare connectors to analyze audit logs for unauthorized access to patient records, supporting compliance with privacy regulations.
*   **Centralized alert management**: Export alerts to SIEM systems like Microsoft Sentinel to unify risk alerts with other security data, enabling faster response times.

## Preparing for integration

Integrations require specific prerequisites to function effectively. Ensure the following steps are completed:

1.  **Verify licensing**: Ensure your organization holds the necessary licenses, such as Microsoft 365 E5 or equivalent, to access these features. For integrations with Microsoft Defender for Endpoint, confirm that your licensing includes this service.
    
2.  **Enable APIs**: Activate required APIs to facilitate secure data exchange. For instance, to export alert information to Security Information and Event Management (SIEM) solutions, enable the Office 365 Management Activity API.
    
3.  **Follow setup guides**: For more information on configuring connectors, see the following documentation:
    
    *   [Set up a connector to import HR data](/en-us/purview/import-hr-data?azure-portal=true)
    *   [Set up a connector to import healthcare EHR audit data (preview)](/en-us/purview/import-healthcare-data?azure-portal=true)
    *   [Set up a connector to import physical badging data](/en-us/purview/import-physical-badging-data?azure-portal=true)

With the right prerequisites in place, your organization can enhance Insider Risk Management with comprehensive insights while prioritizing privacy and security.
