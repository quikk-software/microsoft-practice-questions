---
title: "Describe the monitoring and analytics capabilities of the Microsoft Power Platform"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-power-platform-administration-governance/describe-monitoring-analytics"
uid: "learn.wwl.describe-microsoft-power-platform-administration-governance.describe-monitoring-analytics"
module: "describe-microsoft-power-platform-administration-governance"
moduleTitle: "Describe Power Platform governance and administration"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe the monitoring and analytics capabilities of the Microsoft Power Platform

Understanding how your Power Platform resources are being used—and identifying problems before they impact users—requires effective monitoring and analytics. The Power Platform admin center provides a rich set of built-in analytics tools, and organizations with more advanced needs can extend monitoring using Azure Application Insights, Microsoft Purview, and the Center of Excellence Starter Kit.

For Contoso, this means being able to see which of the dozens of maker-built apps are actively used, which automated flows are failing, and whether any unusual activity—such as bulk data exports—warrants investigation.

## The Power Platform admin center

The **Power Platform admin center** (admin.powerplatform.microsoft.com) is the central administration interface for governing Power Platform environments, resources, and settings. It provides both environment-level and tenant-level analytics, giving administrators visibility into platform usage across their entire organization.

[![Screenshot of the Power Platform admin center showing the main navigation areas including Manage, Monitor, Security, and Actions.](media/admin-center.png)](media/admin-center.png#lightbox)

The admin center organizes its capabilities around several key areas:

*   **Manage**: Provides access to environment settings, resource inventory, capacity usage, and product-specific analytics for Power Apps, Power Automate, Power Pages, and Dataverse.
*   **Monitor**: A dedicated area for understanding the health of solutions and detecting performance degradations or failures in near real time.
*   **Security**: Includes a Security Overview page where administrators can view their organization's security score, identify policy gaps, and track progress toward security improvement recommendations.
*   **Actions**: Surfaces actionable recommendations to enhance security, reliability, and overall health of your Power Platform implementation, such as identifying unused apps, environments with no DLP policies, or environments that would benefit from Managed Environment features.
*   **Copilot**: A dedicated hub where administrators manage Copilot feature availability across environments, view adoption and usage insights, and configure governance controls for AI features in Power Apps, Power Automate, and Copilot Studio.
*   **Deployment**: A centralized view for managing Power Platform ALM workloads, monitoring all pipeline deployments across the tenant, approving deployment requests, and troubleshooting deployment issues at scale.

## Built-in analytics reports

The admin center provides dedicated analytics for Power Apps, Power Automate, and Dataverse, each with reports tailored to the needs of administrators and makers.

### Power Apps analytics

Power Apps analytics provide visibility into how canvas apps and model-driven apps are being used across your organization. Reports include:

*   **Usage reports**: Show the number of unique active users, session counts, and usage trends over time for apps within an environment. Tenant-level reports aggregate this data across all environments.
*   **Error reports**: Surface runtime errors that users encounter in apps, including error messages, affected apps, and frequency.
*   **Service performance reports**: Track the response times and availability of the Power Apps service.
*   **Inventory reports**: Provide a catalog of all apps and connectors in use across the tenant, including details about makers, sharing status, and last modified dates.

[![Screenshot of Power Apps usage analytics in the Power Platform admin center showing active users and session trends.](media/power-apps-usage.png)](media/power-apps-usage.png#lightbox)

### Power Automate analytics

Power Automate analytics give administrators visibility into cloud flow activity across their environments. Available reports include:

*   **Runs report**: Shows the volume of flow runs over time, broken down by success and failure rates.
*   **Usage report**: Tracks which flows are running most frequently and which connectors they use.
*   **Error report**: Identifies flows that encountered errors, including the error messages returned.
*   **Connectors report**: Provides visibility into which connectors are in active use across flows, useful for validating DLP policy coverage.

[![Screenshot of Power Automate analytics in the Power Platform admin center showing flow run volumes and error rates.](media/power-automate-usage.png)](media/power-automate-usage.png#lightbox)

### Dataverse analytics

For environments that include a Microsoft Dataverse database, Dataverse analytics provide deeper visibility into data platform health and usage. These reports include:

*   API call volumes and response times, helping administrators identify when custom applications or integrations are placing unusual load on the Dataverse API.
*   Storage consumption metrics, showing how much database, file, and log storage each environment is consuming relative to available capacity.
*   Plug-in execution statistics, which are useful for administrators managing custom Dataverse extensions built by professional developers.
*   Active users and table-level usage trends, providing insight into which Dataverse tables are most actively read and written.

## Extended monitoring and observability

For organizations that need deeper insights than the built-in admin center reports provide, Power Platform supports integration with Azure Application Insights and the Center of Excellence Starter Kit, as well as a self-service analytics export feature.

### Azure Application Insights integration

**Azure Application Insights** is a Microsoft Azure monitoring service that collects detailed telemetry including user interactions, response times, exceptions, API calls, and custom events. Administrators can configure Power Platform environments to export telemetry to an Application Insights resource, enabling:

*   Detailed trace logging for custom Dataverse plug-ins and API integrations.
*   Custom dashboards and alerts based on specific performance thresholds.
*   Long-term retention of telemetry data beyond the retention windows available in the built-in admin center reports.
*   Integration with Azure Monitor alerts and action groups for automated incident response.

### The Center of Excellence (CoE) Starter Kit

The **Microsoft Power Platform Center of Excellence (CoE) Starter Kit** is a collection of components and tools built on Power Platform itself that provides an advanced governance and observability solution for organizations that want deeper visibility and control.

The CoE Starter Kit includes:

*   **A Power BI dashboard**: Provides tenant-wide insights into app and flow inventory, maker activity, connector usage, and governance compliance status.
*   **Governance components**: Automate common governance workflows such as requesting business justifications from makers, identifying and archiving unused apps, and managing environment lifecycle requests.
*   **Nurture components**: Support maker onboarding, community building, and training programs to help organizations grow their internal Power Platform capability in a governed way.
*   **Audit components**: Help administrators track changes to the Power Platform environment and identify resources that may pose compliance risks.

### Self-service analytics export

Organizations with advanced analytics requirements can export Power Platform inventory and usage data to an Azure Data Lake Storage account using the self-service analytics export feature in the Power Platform admin center. Once data is in the data lake, it can be used to build custom Power BI reports, apply organization-specific data retention policies, and integrate Power Platform usage data with other operational datasets for cross-platform analysis.
