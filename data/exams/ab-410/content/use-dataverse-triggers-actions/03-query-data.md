---
title: "Query data"
url: "https://learn.microsoft.com/en-us/training/modules/use-dataverse-triggers-actions/query-data"
uid: "learn-bizapps.use-dataverse-triggers-actions.query-data"
module: "use-dataverse-triggers-actions"
moduleTitle: "Use Dataverse triggers and actions in Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Query data

The Dataverse connector has some actions designed to retrieve data from your tables. In this unit, we cover two of the most common. The **Get a row by ID** action retrieves a single row with the unique ID that you provide. When you don't know the unique ID, you can use the **List rows** action, which returns zero to many rows that match your filter criteria.

Broadening the options for these actions, you also have the **...from selected environment** actions enabling you to use the same actions with an environment other than the one you're building in. Let's explore some of the options available for getting data.

### Select columns

The **Select columns** option limits the columns that are returned from the action. You should set up the list of columns based on the data that you need in your subsequent flow steps. Providing a list of columns helps your flow be more efficient. Make sure that you use the table column _logical_ name, which you can find on the **Advanced options** section of the column properties. For example, if you want to include the First name and Last name columns of the Contact table, you need to provide the following comma-separated list of columns:

```
firstname,lastname
```

Specifying a list of columns limits the columns that show in dynamic content when you're setting up subsequent steps in the flow. If the columns that you're expecting aren't visible, check your **Select columns** option on the action that's retrieving the data.

### Expand query

By default, when the retrieve data actions run, they only retrieve data from the primary table that's specified on the action. You can use the **Expand Query** option to provide an OData-style expression to include data from related tables. You can find this option under **Advanced parameters**.

For example, the Account table has a relationship with the Contact table to indicate the primary contact for the account. The following example shows the OData expression for including the full name column and ID of the primary contact in the output of the action.

```
primarycontactid($select=contactid,fullname)
```

While this expression includes data in the output of the actions, it doesn't include the data columns in the **Dynamic content** pane for selection. To use the related data, you need to use a workflow expression to access the data.

## Use the Get a row by ID action

Commonly, you would use the **Get a row by ID** action to retrieve extra Dataverse table data as part of a flow logic. For example, if the addition of a new _Account_ table row triggers your flow, you might use a **Get a row by ID** action to retrieve the email for the related primary contact. In that example, it's unnecessary to use a **Get a row by ID** action to retrieve the account because the data for the row is provided as output from the trigger.

Occasionally, you might want to use the **Get a row by ID** action again in your flow logic to ensure that you have the latest data. For example, if your flow paused for an approval step, a couple of days might pass since the last time you retrieved data. You might want to use the **Get a row by ID** action to get the latest data after the approval happens. This approach would prevent your flow from taking action based on stale data.

If the ID of the row that you plan to create on the step might be null, your best action would be to complete a conditional check on the value before running the **Get a row by ID** step. The step fails if the row ID is null. Another common error is if you don't have permission to read the data for the row.

## Use the List rows action

The **List rows** action is powerful because you can provide simple or complex criteria to determine which data rows it returns. The action supports two styles for how you specify this criteria: OData style expressions or Dataverse FetchXML. You can use both styles of criteria to compose simple and complex criteria. Mostly, your preference drives which style to use. However, FetchXML has some community tooling support that might make it easier for you to build more complex criteria.

### Retrieve more than 5,000 rows

By default, the action doesn't return more than 5,000 rows. You can turn on the **Pagination** feature from the **Settings** tab if you need to return more data. When you turn on pagination, you can specify a page size of up to 100,000 rows. When more than one page of data is possible, you need to manually handle the pages in your flow by getting the paging token and passing on retrieval of subsequent pages. For more information, see [Turn on pagination](/en-us/power-automate/dataverse/list-rows?tabs=classic-designer#turn-on-pagination-to-request-more-than-5000-rows_?azure-portal=true).

Make sure that you consider your future needs because reaching 5,000 rows doesn't produce an error. Additionally, you won't receive all data. When possible, compose your criteria to produce the smallest possible results for your flow to process.

### Use OData style criteria

In the **Filter rows** property on the action, you can provide an OData style filter to limit the rows that are returned to the rows that match the criteria. When you compose the expression for the **Filter rows** property, you need to use the column's logical name, which you can find in the column property's **Advanced options** section. The following logic is a simple example that filters Contacts to return all rows with the first name of John.

```
firstname eq 'John'
```

Also, you can use standard query filter operators and query functions. For example, the following logic would change the filter to use the **contain** function.

```
contains(firstname,'John')
```

For more information, see the examples in [standard filter operators and query functions](/en-us/power-apps/developer/data-platform/webapi/query/filter-rows).

You can use logical operators such as **and**, **or**, and **not**. For example, the following logic checks that the revenue column is within a range of 2001-99999.

```
revenue lt 100000 and revenue gt 2000
```

You can use parentheses () with logical operators to specify the precedence so that you can evaluate a complex expression, as follows:

```
(contains(name,'sample') or contains(name,'test')) and revenue gt 5000
```

You can also filter on related data. For example, the following expression would return account table rows that have a primary contact named Susanna.

```
primarycontactid/fullname eq 'Susanna (sample)'
```

Along with the **Filter rows** expression, the **Sort by** property helps determine the order of the rows' output from the action. The names should be a comma-separated list of logical column names. If only the column name is specified, the column is sorted in ascending order. You can specify an **asc** or a **desc** suffix to indicate ascending or descending order.

The **Row count** property can indicate how many rows to return. For example, if you want to check if matching rows exist, you don't need to return more than a single row.

Tip

When testing your flow, you can set the **Row count** to 1 (or another small number) to speed up testing. If your table has thousands of lines of data, using this parameter can really help you quickly troubleshoot your flow as you're developing it.

### Use FetchXML style criteria

FetchXML is a proprietary XML-based query language of Dataverse that you can use to query data. You can compose FetchXML and use it as a filter criteria for the rows' output from the **List rows** action. You can manually compose the XML, or you can use **Advanced find** from a Power Apps model-driven application to build your filter and then download the FetchXML.

FetchXML contains the equivalent of the **Select columns**, **Sort by**, **Expand Query**, and **Filter rows** features for the OData style criteria.

The following expression is an example of FetchXML to filter the Account table on rows with an active status and a name that contains Contoso. This example also returns the email of the primary contact that's related to the account row.

```
<fetch>
  <entity name="account">
    <attribute name="name"/>
    <attribute name="address1_city"/>
    <attribute name="primarycontactid"/>
    <attribute name="telephone1"/>
    <attribute name="accountid"/>
    <order attribute="name" descending="false"/>
    <filter type="and">
      <condition attribute="statecode" operator="eq" value="0"/>
      <condition attribute="name" operator="like" value="%Contoso%"/>
    </filter>
    <link-entity alias="accountprimarycontactidcontactcontactid" name="contact" from="contactid" to="primarycontactid" link-type="outer" visible="false">
      <attribute name="emailaddress1"/>
    </link-entity>
  </entity>
</fetch>
```

For more information, see [Use FetchXML to construct a query](/en-us/power-apps/developer/data-platform/fetchxml/overview).

Currently, aggregation queries aren't supported when you're using the **List rows** action with FetchXML criteria.
