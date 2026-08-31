---
title: "Dual-write vs. virtual tables"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-powerapps-common-data-service/2b-dual-write-vs-virtual-table"
uid: "learn-bizapps.powerapps-common-data-service.2b-dual-write-vs-virtual-table"
module: "get-started-with-powerapps-common-data-service"
moduleTitle: "Create tables in Dataverse"
learningPath: "learn.wwl.build-data-model-microsoft-dataverse"
---
# Dual-write vs. virtual tables

Microsoft Dataverse supports multiple methods to connect with external data sources. Dual-write and virtual tables enable Dataverse to interact with this external data and write changes back to the original data source. This unit explains these capabilities and their appropriate use cases.

## Dual-write

Dual-write is a built-in integration feature that provides near-real-time synchronization between customer engagement apps and finance and operations apps. By enabling data to flow seamlessly across applications, Dual-write supports unified experiences across departments.

Dual-write delivers tightly coupled, bidirectional integration between finance and operations apps and Dataverse. Changes made in finance and operations apps are automatically written to Dataverse, and vice versa. This bidirectional sync enables a consistent and integrated user experience across applications.

Additional capabilities include:

*   Support for both online and offline scenarios
*   Alignment with low-code/no-code development principles

For more information, see [Dual-write](/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/dual-write/dual-write-home-page/?azure-portal=true).

## Virtual tables

Finance and operations apps are exposed in Dataverse as a virtual data source, allowing full create, read, update, and delete (CRUD) operations from within Dataverse and the Microsoft Power Platform. By design, virtual table data remains in the source application and isn't duplicated in Dataverse.

To use virtual tables for finance and operations data, tables must first be made available as virtual tables. Once configured, these tables support CRUD operations from Dataverse and any connected Power Platform components.

Key facts about virtual tables:

*   All Open Data Protocol (OData) tables in finance and operations apps are available as virtual tables in Dataverse.
*   Makers can use this external data to build customer engagement experiences without duplicating data.
*   Full CRUD capabilities are supported directly on the source data.
*   Power Pages can use virtual tables to power external-facing websites for collaboration scenarios.
*   Virtual tables can participate in relationships with native Dataverse tables (one-to-many/many-to-one), enabling lookups from native tables into virtual data.
*   Virtual tables can also be related to other virtual tables, allowing external data sources to be connected within a unified data model.

For more information, see [Virtual entities](/en-us/dynamics365/fin-ops-core/dev-itpro/power-platform/virtual-entities-overview/?azure-portal=true).

## When to use Dual-write vs. virtual tables

Dual-write and virtual tables are part of the shared data layer that supports integration between finance and operations apps and Dataverse. These technologies are complementary and can be used together depending on your integration needs.

Use **Dual-write** when:

*   You need near-real-time synchronization of data across Dataverse and finance and operations apps.
*   Your scenario requires full offline capabilities.
*   You want a tightly integrated and replicated dataset across environments.

Use **virtual tables** when:

*   You want to access external data in real time without duplicating it in Dataverse.
*   You're working with large datasets and want to minimize storage usage in Dataverse.
*   Your use case involves read-heavy scenarios or light CRUD operations that don’t require local data storage.

The decision between dual-write and virtual tables depends on the data ownership model, the need for replication, and offline requirements specific to your solution.
