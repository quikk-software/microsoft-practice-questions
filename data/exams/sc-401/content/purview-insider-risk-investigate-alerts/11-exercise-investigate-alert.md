---
title: "Exercise - Investigate potential data theft using Insider Risk Management"
url: "https://learn.microsoft.com/en-us/training/modules/purview-insider-risk-investigate-alerts/exercise-investigate-alert"
uid: "learn.wwl.purview-insider-risk-investigate-alerts.exercise-investigate-alert"
module: "purview-insider-risk-investigate-alerts"
moduleTitle: "Investigate insider risk alerts and related activity"
learningPath: "learn.wwl.purview-implement-insider-risk-management"
---
# Exercise - Investigate potential data theft using Insider Risk Management

In this exercise, you investigate activity related to a departing employee who may have copied and archived sensitive content before their account was disabled. You'll review the alert, evaluate the user's actions, escalate the case, and examine the broader context in Microsoft Defender.

Note

The environment for this exercise is a simulation generated from the product. As a limited simulation, links on a page might not be enabled and text-based inputs that fall outside of the specified script might not be supported. A pop-up message displays stating, "**This feature is not available within the simulation.**" When this occurs, select **OK** and continue the exercise steps.

![Screenshot of pop-up screen indicating that this feature isn't available within the simulation.](../../wwl-sci/purview-insider-risk-investigate-alerts/media/simulation-pop-up-error.png)

**Tasks:**

1.  Investigate alert details and user activity
2.  Create and escalate a case
3.  Correlate incident data in Microsoft Defender

## Task 1 - Investigate alert details and user activity

In this task, you'll open a simulated version of Microsoft Purview to investigate an insider risk alert. You'll review the alert, examine user activity, and use built-in tools to summarize key behaviors.

Complete this task in the simulation: **[Open simulated Microsoft Purview portal](https://app.highlights.guide/start/d3e09027-0dbb-40cf-a5b9-8a08308a7350?token=16d48b6c-eace-4a1f-8050-098d29d23a89&link=0&azure-portal=true)**.

1.  In the [simulated Microsoft Purview portal](https://app.highlights.guide/start/d3e09027-0dbb-40cf-a5b9-8a08308a7350?token=16d48b6c-eace-4a1f-8050-098d29d23a89&link=0&azure-portal=true), go to **Solutions** > **Insider Risk Management** > **Alerts**.
    
2.  Select the alert titled _Potential data theft - Employee Departure_ (Alert ID `4bdf001f`) at the top of the list.
    
3.  On the **Alert details** page, review the risk indicators in the **All risk factors** tab. Select the cards to filter and explore activity in **Activity explorer**.
    
4.  Select the **Activity explorer** tab. Use filters and the activity sequence to examine the user's actions, such as copying files, archiving data, or accessing personal services.
    
5.  Select the **User activity** tab. Use the timeline filters and scatterplot to evaluate when activity occurred. Select activity bubbles or event links to view associated actions in **Activity explorer**.
    
6.  In the Copilot pane, select:
    
    *   **Show key actions performed by the user in the last 10 days**
    *   **Summarize user's last 30 days of activity**

You have successfully reviewed the alert, explored user activity, and gathered context using both visual tools and Copilot summaries.

## Task 2 - Create and escalate a case

In this task, you organize your findings by creating a case and escalating it for further review in eDiscovery.

1.  From the alert page, select **Confirm all alerts & create case**.
    
2.  Enter the case name: `Employee departure - Data exfiltration`
    
3.  Enter the case description: `Sensitive data copied and archived pre-departure. Theft suspected.`
    
4.  Select **Done** to create the case.
    
5.  Go to the **Cases** tab and select the new case.
    
6.  On the **Case overview** page, review case details and alert context.
    
7.  Select the **Alerts**, **User activity**, and **Content detected** tabs to review evidence. These tabs show the triggering activity, affected files, and detected information types.
    
8.  Select **Case actions** > **Escalate for investigation**.
    
9.  Enter the escalation case name: `Employee departure exfiltration investigation`
    
10.  Enter the escalation note: `Sensitive data exfiltrated before departure. HR to review.`
     
11.  Select **Save**, then select **Done** to complete the escalation.
     
12.  Select **Resolve case**.
     
13.  Set the resolution to **Confirmed policy violation**.
     
14.  For **Action taken**, enter: `Confirmed exfiltration before departure. HR notified.`
     

You have successfully created, escalated, and resolved the insider risk case based on your investigation.

## Task 3 - Correlate incident data in Microsoft Defender

In this task, you'll switch to a simulated version of Microsoft Defender to review how the insider risk alert is connected to a larger incident. You'll explore the attack timeline, related alerts, and additional evidence across Microsoft 365 services.

Complete this task in the simulation: **[Open simulated Microsoft Defender portal](https://app.highlights.guide/start/d3e09027-0dbb-40cf-a5b9-8a08308a7350?token=16d48b6c-eace-4a1f-8050-098d29d23a89&link=1&azure-portal=true)**.

1.  In the [simulated Microsoft Defender portal](https://app.highlights.guide/start/d3e09027-0dbb-40cf-a5b9-8a08308a7350?token=16d48b6c-eace-4a1f-8050-098d29d23a89&link=1&azure-portal=true), go to **Incidents & response** > **Incidents & alerts** > **Incidents**.
    
2.  Select **Add filter** > **Service/detection sources**, choose **Microsoft Insider Risk Management**, then select **Apply**.
    
3.  In the search bar, enter `4bdf001f` and press **Enter**.
    
4.  Select the incident titled **Exfiltration incident involving one user alert**.
    
5.  On the **Attack story** tab, select **Play** to view the sequence of events. Select individual steps to explore how the incident progressed.
    
6.  Select the **Alerts** tab to review related alerts tied to this user.
    
7.  Explore the **Assets**, **Investigation**, **Evidence**, **Response**, **Summary**, and **Similar incidents** tabs to understand the scope and details of the incident.
    

You have successfully correlated the insider risk alert with a broader incident in Microsoft Defender, validating your investigation and supporting response actions across teams.
