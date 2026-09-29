---
title: "Export and import agents"
url: "https://learn.microsoft.com/en-us/training/modules/implement-power-virtual-agents/export-import-bots"
uid: "learn-bizapps.implement-power-virtual-agents.export-import-bots"
module: "implement-power-virtual-agents"
moduleTitle: "Manage agents in Microsoft Copilot Studio"
learningPath: ""
---
# Export and import agents

You can export and import agents using solutions to move your agents across multiple environments. For example, you might build your agent in a development environment, then move it to a different environment for testing purposes. Once the testing is complete, you can move it to a production environment for the agent to be deployed to end users.

Solutions are the mechanism for implementing application lifecycle management (ALM). The solution acts as a carrier for the agents. You use solutions to export the agent from one environment and import it into another. For more information, see [Solutions.](/en-us/power-apps/maker/data-platform/solutions-overview/?azure-portal=true)

## Export your agent

You can add an agent to an existing solution or create a new solution for your agent from Power Apps Solutions.

1.  In your browser navigate to the Power Apps maker portal, [make.powerapps.com.](https://make.powerapps.com/)
    
2.  On the left-hand side, select **Solutions**.
    
    [![Screenshot of Power Apps Solutions highlighted.](media/solutions.svg)](media/solutions.svg#lightbox)
    
3.  Select the solution you would like to add the agent to.
    
    [![Screenshot of Power Apps Solutions page with the New solution button and Customer service agent highlighted.](media/solution-select.svg)](media/solution-select.svg#lightbox)
    
4.  Within the solution, choose the agents you would like to add by clicking **Add existing** > **Agent**. Multiple agents can be added to a single solution.
    
    Note
    
    It is also possible to create a new agent from solutions.
    
    [![Screenshot of Power Apps solution with the Add existing menu expanded and agent selected.](media/add-existing.png)](media/add-existing.png#lightbox)
    
    [![Screenshot of Power Apps Add existing agents dialog showing the list of existing agents.](media/existing.png)](media/existing.png#lightbox)
    
    Note
    
    Subcomponents of the agent will be added to the solution, such as topics, entities, and cloud flows. You shouldn't remove or change any of the agent subcomponents from Power Apps as this can cause the export to fail.
    
    [![Screenshot of Power Apps showing a list of all the customer service agent's subcomponents.](media/components.png)](media/components.png#lightbox)
    
    Note
    
    If you add more components to your agent, such as creating new topics, you can add these to the solution by selecting **Add required objects** from the agent in the solution as shown here.
    
    [![Screenshot of the list of customer service agent components with the customer support component selected to show the Add required objects option.](media/add-required.png)](media/add-required.png#lightbox)
    
5.  Once your solution is ready, you can export the package. Go back to all solutions by selecting the **Back to solutions** arrow on the left pane.
    
    [![Screenshot of the back to solutions button.](media/back-solutions.svg)](media/back-solutions.svg#lightbox)
    
6.  Select the circle next to the solution name that you would like to export.
    
7.  Select the **Export** button at the top.
    
8.  Select **Next** on the export pane, and then select **Export.**
    

This downloads a .zip file of the solution, which is used for importing the agent into another environment. If you're moving your agent to a test or production environment, you should export as a managed solution.

For more information, see [Export solutions](/en-us/power-apps/maker/data-platform/export-solutions/?azure-portal=true).

[![Screenshot of Power Apps solutions list showing customer service agent selected and the export button highlighted.](media/export.svg)](media/export.svg#lightbox)

[![Screenshot of Power Apps showing the message Solution "customer service agent" exported successfully and will download soon, and the downloads dialog.](media/download.svg)](media/download.svg#lightbox)

## Import your agent

You use the solution package downloaded at the export stage to import your agent into the desired environment. It imports from Power Apps Solutions.

1.  In the top right, select your environment name and change to the desired environment to import the solution and agent.
    
2.  On the left-hand side, select **Solutions**
    
    [![Screenshot of Power Apps Solutions.](media/solutions.svg)](media/solutions.svg#lightbox)
    
3.  Select **Import solution**, then choose your solution .zip file.
    
4.  Select **Next** and then **Import solution**.
    

For more information, see [Import solutions](/en-us/power-apps/maker/data-platform/import-update-export-solutions/?azure-portal=true).

[![Screenshot of Power Apps solutions page with the import button highlighted.](media/import.svg)](media/import.svg#lightbox)

Once the import is complete, you see it appear in your solutions list. You can access your imported agent from Microsoft Copilot Studio as it now appears in your list of agents in the new environment.

[![Screenshot of Power Apps with the message Solution "Customer service agent" imported successfully.](media/imported.svg)](media/imported.svg#lightbox)
