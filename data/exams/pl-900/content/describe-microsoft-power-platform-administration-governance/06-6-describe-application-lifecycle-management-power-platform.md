---
title: "Describe application lifecycle management with Power Platform Pipelines"
url: "https://learn.microsoft.com/en-us/training/modules/describe-microsoft-power-platform-administration-governance/6-describe-application-lifecycle-management-power-platform"
uid: "learn.wwl.describe-microsoft-power-platform-administration-governance.describe-application-lifecycle-management-power-platform"
module: "describe-microsoft-power-platform-administration-governance"
moduleTitle: "Describe Power Platform governance and administration"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe application lifecycle management with Power Platform Pipelines

Application Lifecycle Management (ALM) is the practice of managing the complete journey of an application—from initial design and development through testing, deployment, maintenance, and eventual retirement. When multiple makers are building solutions simultaneously across multiple environments, ALM provides the structure, processes, and automation needed to ensure that solutions are delivered reliably and consistently.

Consider Contoso, where teams across manufacturing, HR, and supply chain are simultaneously building solutions. As those solutions mature, Contoso needs a repeatable, auditable process to move them from development to production—one that doesn't rely on manual file transfers or informal handoffs between teams.

## Understanding ALM in Power Platform

In the Power Platform context, ALM relies on the concept of **solutions**. A solution is a container that packages all the components of a Power Platform application—tables, apps, flows, agents, connection references, environment variables, and more—into a single deployable unit. By placing all components in a solution before development begins, makers ensure that every artifact is tracked, versioned, and movable between environments.

A well-structured ALM process in Power Platform typically involves three environments aligned to the stages of the application lifecycle:

*   **Development environment**: Where makers build and iterate on solutions. Changes are made in an unmanaged solution that allows full editing capability.
*   **Test environment**: Where completed solutions are validated by quality assurance teams, integration testers, and business stakeholders before being approved for production.
*   **Production environment**: Where end users interact with the live, approved version of the solution. Managed solutions deployed to production prevent unauthorized modifications.

[![Diagram illustrating the three-environment ALM process in Power Platform: development, test, and production, connected by Power Platform Pipelines.](media/application-lifecycle-management-graphic.png)](media/application-lifecycle-management-graphic.png#lightbox)

Without automation, moving solutions between these environments requires makers or administrators to manually export solutions from the development environment, import them into the test environment, validate, export again, and import into production. This manual process is time-consuming, error-prone, and difficult to track and audit. Power Platform Pipelines automate and standardize this process.

## Power Platform Pipelines

**Pipelines** in Power Platform are the built-in, in-product ALM capability that automates solution deployments between environments. Pipelines aim to democratize ALM by making deployment automation accessible to all makers, administrators, and professional developers—not just those with DevOps expertise.

### How Pipelines work

An administrator sets up a pipeline by configuring a host environment and associating it with a set of environments that represent the stages of the deployment path—for example, a development environment as the starting point, a test environment as the first deployment target, and a production environment as the final deployment target.

Once the pipeline is configured, makers can initiate deployments directly from their development environment using a guided interface. The deployment process follows these steps:

1.  The maker navigates to their solution in the development environment and selects the pipeline to use.
2.  The pipeline validates the solution using **preflight checks**—running the Solution Checker to identify best-practice violations and confirming that the solution can be successfully imported into the target environment.
3.  If validation passes, the solution is deployed to the next stage. If approval is required, the deployment is held until an approver confirms it.
4.  After validation in the test environment, the maker can advance the solution to the next stage using the same guided interface.
5.  All deployment activities are logged automatically in the pipeline host, creating a full audit trail of what was deployed, when, and by whom.

### Key benefits of Pipelines

Audience

Benefit

Administrators

Configure automated deployment pipelines in minutes. Gain centralized visibility into all pipeline deployments across the organization.

Makers

Deploy solutions using an intuitive, wizard-driven interface with no prior ALM or DevOps knowledge required.

Professional developers

Extend and customize pipelines using the Power Platform CLI and Power Automate for advanced automation scenarios.

Compliance teams

Access complete, automatically generated audit logs for every deployment, including who initiated it, what was deployed, and when.

### Delegated deployments and approval gates

For organizations that require human review before solutions are promoted to sensitive environments, Pipelines support **delegated deployments**. When a delegated deployment is configured for a pipeline stage, the deployment is carried out using a service principal or pipeline stage owner's identity rather than the requesting maker's identity. This means makers can request deployments to sensitive environments without needing direct access to those environments, supporting the principle of least privilege.

When an approval gate is added to a delegated deployment stage, the deployment is held until a designated approver explicitly approves it. This ensures that quality assurance teams have confirmed the solution meets acceptance criteria before it reaches production, and that a documented record of who approved each deployment exists in the pipeline audit log.

### Integration with Azure DevOps and GitHub

Organizations with established DevOps practices can extend Power Platform Pipelines by integrating them with external CI/CD platforms. **Power Platform Build Tools for Azure DevOps** and **GitHub Actions for Power Platform** allow professional development teams to incorporate Power Platform solution deployments into broader automated release pipelines alongside other application code.

## Solutions as the foundation of ALM

Regardless of which ALM approach or tooling an organization uses, solutions remain the fundamental unit of ALM in Power Platform. Best practices for working with solutions include:

*   Always develop in a dedicated development environment, never directly in the production environment.
*   Include all dependent components—tables, connection references, environment variables, security roles—in the solution from the beginning of development.
*   Use **environment variables** to store environment-specific configuration values so that the same solution can be deployed across development, test, and production without manual configuration changes.
*   Use **managed solutions** in test and production environments to prevent unauthorized modifications to deployed components.
*   Use the Solution Checker regularly during development to identify and address best-practice violations before they become deployment blockers.
