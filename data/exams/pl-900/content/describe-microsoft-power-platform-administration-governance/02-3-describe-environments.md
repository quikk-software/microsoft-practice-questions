---
title: "Describe Power Platform environments"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-power-platform-administration-governance/3-describe-environments"
uid: "learn.wwl.describe-microsoft-power-platform-administration-governance.describe-environments"
module: "describe-microsoft-power-platform-administration-governance"
moduleTitle: "Describe Power Platform governance and administration"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe Power Platform environments

Power Platform environments are one of the foundational concepts for governing how resources are organized, secured, and managed across your organization. Before building any app, flow, or agent, it helps to understand what environments are, why they matter, and how different types of environments serve different purposes.

## Understand the concept of Power Platform environments

A Power Platform environment is a container that holds your organization's business data, apps, flows, agents, and other resources. Environments allow you to organize and separate resources based on roles, security requirements, target audiences, or stages of development. For example, you might maintain separate environments for a development team working on a new solution, a testing team validating that solution before release, and a production environment where end users interact with the finalized app.

Each environment is created under a Microsoft Entra tenant and is tied to a specific geographic location. Resources within an environment are accessible only to users within the same tenant, ensuring that data remains secure and isolated by default. Many environments optionally include a Microsoft Dataverse database, which adds a rich, structured data layer along with additional governance and security features.

Consider how Contoso might structure their environments. Their IT team might maintain three primary environments within their Microsoft Entra tenant: one for North America, one for Europe, and one for Asia-Pacific. Each environment contains its own apps, flows, and Dataverse database, ensuring that data is stored in the appropriate geographic region for regulatory compliance and that each regional team can work independently without interfering with others.

[![Diagram showing three Power Platform environments within a tenant, each with its own apps, flows, and Dataverse database.](media/environments.png)](media/environments.png#lightbox)

## Identify different types of Power Platform environments

Power Platform offers several environment types, each designed for a specific purpose. Understanding which type to use—and when—is an important part of effective governance.

Type

Description

Security

Production

Used for permanent, live workloads in an organization. Requires at least 1 GB of available database capacity.

Full control. Administrators manage access explicitly.

Default

Automatically created for each tenant and shared by all licensed users. Used for personal productivity scenarios.

Limited control. All licensed users receive the Environment Maker role automatically.

Sandbox

Non-production environments intended for development and testing. Can be reset or copied without impacting production.

Full control. Developers require the Environment Maker role.

Trial

Temporary environments for short-term testing and evaluation. Expire after 30 days.

Full control. Resources are deleted when the trial expires.

Developer

Created by users with a Developer Plan license for personal, non-commercial development use.

Limited control. Security groups cannot be assigned.

Microsoft Dataverse for Teams

Automatically provisioned when a Power Apps app or agent is built or installed within a Microsoft Teams team.

Limited control. Teams membership determines access.

## Managed Environments

Managed Environments is a premium governance feature that provides enhanced administrative controls on top of standard environments. When an environment is designated as a Managed Environment, administrators gain access to a set of tools specifically designed to simplify oversight, improve security, and ensure consistent policy enforcement at scale.

Key features of Managed Environments include:

*   **Limit sharing**: Administrators can restrict how broadly users share canvas apps, preventing sharing with the entire organization or limiting sharing to specific security groups.
*   **Weekly usage insights**: Administrators receive automated weekly analytics emails highlighting the most-used apps, the most active makers, and resources that have been inactive and may be candidates for cleanup.
*   **Data policies**: Managed Environments enforce Data Loss Prevention (DLP) policies that control which connector data can interact with, ensuring uniform protection across the environment.
*   **Solution checker enforcement**: The Solution Checker can be configured to automatically run best-practice analysis on solutions before they are deployed, blocking deployments that violate defined quality rules.
*   **Environment routing**: Automatically directs makers who visit make.powerapps.com to their personal developer environments instead of the shared default environment, reducing clutter and improving governance in the default environment.
*   **Pipelines integration**: Target environments used in Power Platform Pipelines must be Managed Environments, ensuring that all automated deployments occur in properly governed spaces.
*   **IP Firewall**: Restricts access to Power Platform resources based on allowed IP address ranges, helping prevent data exfiltration from unrecognized networks.
*   **Customer Managed Key (CMK)**: Allows organizations to supply their own encryption keys for Dataverse data rather than relying solely on Microsoft-managed keys, providing greater control over data security.
*   **Extended backup**: Managed production environments support backup retention of up to 28 days, compared to 7 days for standard environments.
*   **Maker welcome content**: Administrators can configure custom onboarding messages shown to makers when they first sign in to Power Apps within the environment.
*   **Environment groups**: Multiple environments can be grouped together, enabling administrators to apply policies, settings, and Managed Environment features consistently across the group.

Managed Environments are designed to grow with your organization's Power Platform adoption. As more makers build more solutions, the need for consistent oversight becomes more important, and Managed Environments provide the tooling to scale governance without proportionally scaling administrative effort.

## Environment security

Think of environments in Power Platform as separate rooms, each designed for a specific purpose. They help you organize and manage resources like apps, flows, and data while keeping everything secure and under control. By separating environments, you can safely manage projects, teams, or business units without overlap or disruption.

Each environment operates independently, with its own settings and rules. For example, one environment might serve as a testing ground for new apps, while another runs live apps for your team or customers. This separation ensures experiments don't interfere with critical operations.

Key features of environment security include:

*   **Access control**: Administrators decide who can access each environment and what actions they can perform.
*   **Data segmentation**: Sensitive data is kept isolated, meeting compliance requirements like storing patient data separately in healthcare.
*   **Policy enforcement**: Rules like Data Loss Prevention (DLP) policies ensure sensitive data stays protected.
*   **Lifecycle management**: Environments support stages like development, testing, and production, so you can test safely before going live.
*   **Integration with Dataverse**: Many environments use Microsoft Dataverse, adding extra security like row-level permissions to control data access.

Environments provide structure, security, and flexibility, allowing you to experiment freely while protecting critical systems and data.
