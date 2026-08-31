---
title: "Troubleshoot flows"
url: "https://learn.microsoft.com/en-us/training/modules/get-started-flows/9-troubleshoot-flows"
uid: "learn-bizapps.flow-get-started.9-troubleshoot-flows"
module: "get-started-flows"
moduleTitle: "Get started with Power Automate"
learningPath: "learn.wwl.automate-business-processes-power-automate"
---
# Troubleshoot flows

In this unit, you'll learn how to troubleshoot common issues that might occur while you run your flows.

## Identify the error

Before you can fix a flow, you must identify why it failed. Power Automate, by default, sends you an email with a list of failures each week. If you go to the Power Automate home page, you can view your _Cloud flow activity_. Here's how to do that.

1.  Select **My flows** from the left navigation, then select the failed flow.
    
2.  In the **28-day run history** section, select the date of the failed run.
    
3.  Expand the failed step (marked with a red exclamation point icon) and review the error message to understand what happened and how to fix your flow.
    

## Authentication failures

In many cases, flows fail because of an authentication error. If this type of error occurs, the error message includes the word "Unauthorized," or an error code of 401 or 403 appears. You can usually fix authentication errors by updating the connection.

1.  Select **My flows** from the left navigation, then select the failed flow.
2.  In the run history, select the failed run and expand the failed step.
3.  In the right pane under **How to fix**, select **View Connections**.
4.  Locate the unauthorized connection and select **Fix connection**.
5.  Verify your credentials by following the instructions that appear. Then return to your flow-run failure and select **Resubmit**.

The flow should now run as expected.

## Action configuration issues

Flows sometimes fail if a setting in one of the flow's actions doesn't work as expected. In this case, the error message includes the phrase "Bad request" or "Not found," or an error code 400 or 404 appears.

The error message should indicate how to fix the failure.

1.  Select the **Edit** button, and then fix the issues inside the flow definition.
2.  Save the updated flow, and then select **Resubmit** to try to run the flow again with the updated configuration.

## Temporary issues

If error code 500 or 502 appears, the failure is temporary or transient.

*   Select **Resubmit** to try to run the flow again.

## Issues with your pricing plan

Sometimes your flows might behave unexpectedly because you aren't using the correct plan.

*   To view your current license, in Power Automate select the **Settings** (gear icon) in the title bar, and then select **View My Licenses**.
    
    Learn more about [pricing and how to switch plans](https://make.powerautomate.com/pricing/).
    

## Issues with data usage

You might have run out of data that you can use.

*   For information about your current run and API request limits, see [Limits and configuration in Power Automate](/en-us/power-automate/limits-and-config).
    
*   If you're on a paid plan, runs are pooled across all users in your organization.
    

Important

If you exceed your data limit, Power Automate throttles your flow runs.

Learn more about [usage limits](/en-us/power-automate/limits-and-config).

## You might be running flows too often

Your plan determines how often your flows run. For example, your flows might run every 15 minutes if you're on the free plan. If a flow is triggered less than 15 minutes after its last run, it's queued until 15 minutes have passed.

Whenever a flow is triggered, whether by an automatic trigger or because you manually start it, the action counts as a run. Checks for new data don't count as runs.

Learn more about [usage limits](/en-us/power-automate/limits-and-config).

## You must use a work or school account

Power Automate requires a Microsoft work or school account. Personal Microsoft accounts (such as accounts ending in @outlook.com or @gmail.com) are no longer supported. To sign in, use your organizational email address or contact your IT administrator.

## Some flows run more often than expected

Some flows might run more often than you expect. For example, you create a flow that sends you a push notification whenever your manager sends you an email. That flow must run every time you get an email from anyone, because the flow must check whether the email came from your manager. This action counts as a run.

## Other issues that are based on limits, and caveats

You might have issues that are based on other limits:

*   Each account can have up to 600 flows. For the most current limits, see [Limits and configuration in Power Automate](/en-us/power-automate/limits-and-config).
    
*   You can install a gateway only in the default environment.
    
*   Some external connectors, like **X**, implement connection throttling to control the quality of service. Your flows might fail when throttling is in effect. If your flows are failing, review the details of the run that failed in the flow's run history.
