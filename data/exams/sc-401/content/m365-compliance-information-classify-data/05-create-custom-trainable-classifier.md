---
title: "Create a custom trainable classifier"
url: "https://learn.microsoft.com/en-us/training/modules/m365-compliance-information-classify-data/create-custom-trainable-classifier"
uid: "learn-m365.m365-compliance-information-classify-data.create-custom-trainable-classifier"
module: "m365-compliance-information-classify-data"
moduleTitle: "Classify data for protection and governance"
learningPath: "learn.wwl.purview-implement-information-protection"
---
# Create a custom trainable classifier

Organizations often need to classify unstructured data that doesn't follow predictable patterns. **Custom trainable classifiers** allow you to train Microsoft Purview to recognize unique content by providing sample documents for AI-based analysis. Once trained, classifiers can be used to autolabel content, apply retention policies, and support communication compliance.

## How trainable classifiers work

Trainable classifiers use machine learning to detect content based on meaning and context rather than predefined patterns. Unlike sensitive information types (SITs), which rely on keywords or pattern-based detection, trainable classifiers improve classification accuracy by analyzing real-world examples.

Creating a classifier involves training a model with sample content, including both relevant and irrelevant documents. This process helps the model distinguish between data that belongs to a classification category and data that doesn't.

## Requirements

Before creating a classifier, ensure that you meet the licensing and permission requirements.

### Licensing

Trainable classifiers in Microsoft Purview require one of the following license combinations:

*   Microsoft 365 E5
*   Microsoft 365 E5 Compliance
*   Microsoft 365 E3 with the Microsoft Purview Information Protection and Governance add-on

These licenses include access to advanced classification features like trainable classifiers, exact data match, named entities, and contextual analysis.

### Permissions

To create and manage trainable classifiers, users must have the appropriate role permissions. The required permissions depend on where the classifier will be used.

Scenario

Required role permissions

Retention label policy

Record Management, Retention Management

Sensitivity label policy

Security Administrator, Compliance Administrator, Compliance Data Administrator

Communication compliance policy

Insider Risk Management Administrator, Supervisory Review Administrator

Important

By default, only the user who creates a custom classifier can train and review predictions made by that classifier.

## Steps to create a trainable classifier

Creating a classifier follows a structured process that includes training, testing, and publishing.

### Step 1: Collect training data

To train the classifier, you must provide **two sets of sample data** manually selected by users:

*   **Positive examples** (50–500 items): Documents that belong to the category.
*   **Negative examples** (150–1500 items): Documents that don't belong in the category.

Tip

The more diverse and well-selected the training data, the more accurate the classifier.

### Step 2: Store data in SharePoint

Store the **positive** and **negative** samples in separate **SharePoint** folders. Ensure these folders contain only the respective training data.

Note

If creating new folders, wait at least one hour for indexing before using them in the classifier setup.

### Step 3: Create the trainable classifier

1.  Sign in to the [Microsoft Purview](https://purview.microsoft.com/) portal.
2.  Navigate to **Information Protection** > **Classifiers** > **Trainable classifiers**.
3.  Select **Create trainable classifier**.
4.  Enter a **name** and **description**.
5.  Add the SharePoint folder URL for **positive examples** and select **Next**.
6.  Add the SharePoint folder URL for **negative examples** and select **Next**.
7.  Review the settings and select **Create trainable classifier**.

Once created, the classifier starts processing the training data. Processing time varies but typically completes within **24 hours**.

### Step 4: Review and test the classifier

Once the classifier processes enough positive and negative samples, you must verify its predictions.

1.  Open the classifier and review its results.
2.  Confirm whether each prediction is **correct**, **incorrect**, or **uncertain**.
3.  Microsoft uses this feedback to refine the classification model.

Tip

At least 200 test items should be reviewed for best accuracy.

### Step 5: Publish the classifier

When satisfied with the classifier's accuracy:

1.  Select **Publish for use**.
2.  The classifier becomes available for:
    *   Autolabeling policies
    *   Retention policies
    *   Data loss prevention (DLP)
    *   Communication compliance

The classifier now automatically identifies and categorizes content based on your training.

## Best practices for custom trainable classifiers

*   **Ensure diverse training samples**: Include a range of content that accurately represents the classification category.
*   **Avoid overfitting**: Don't use too many similar documents; diversity improves classifier flexibility.
*   **Regularly review and retrain**: As content changes, update classifiers to maintain accuracy.
*   **Use at least 200 test items**: For best results, have at least 200 items in your test sample set that includes at least 50 positive examples and at least 150 negative examples. This improves confidence in predictions before publishing.
