---
title: "Get started with Power Pages"
url: "https://learn.microsoft.com/en-us/training/modules/power-pages-intro/get-started"
uid: "learn-bizapps.power-pages-intro.get-started"
module: "power-pages-intro"
moduleTitle: "Core components of Power Pages"
learningPath: "learn.wwl.build-apps-portals-power-apps"
---
# Get started with Power Pages

A Power Pages website can be provisioned in a Power Platform environment with Dataverse database. Power Pages comes with a variety of rich, customizable templates targeting specific business scenarios. You can select the template, and specify the name, default address, and language for the website.

Important

To provision a site, you must be assigned to the System Administrator role in the Dataverse environment selected for the site.

## Provision a website

Note

A Power Pages site is always created as a trial that can later be converted to a production site.

To provision a Power Pages website:

1.  Sign in to [Power Pages](https://make.powerpages.microsoft.com/?azure-portal=true).
    
2.  Select a target environment by using the environment selector in the upper-right corner.
    
3.  Select **\+ Create a site**.
    
4.  Select a template then select **Choose this template**. ![Screenshot of Select Power Pages template.](media/1-2-pages-template.png)
    
5.  Provide a site name and a unique web address.
    
6.  If your Dataverse environment has more than one language provisioned, expand **Show more details** section and select a site language.
    
    ![Screenshot of Specify website details.](media/1-2-site-details.png)
    
7.  Select **Done**.
    
    Note
    
    It might take a few moments for your new site to be provisioned.You'll be able to modify the name and web address later.
    
8.  Once provisioning is complete, select **Preview** then select **Desktop** to preview your new website. ![Screenshot of Select site preview.](media/1-2-site-preview.png)
    

## Dynamics 365 templates

Power Pages is evolution of [Power Apps portals](/en-us/power-apps/maker/portals/). It's built on the Power Apps portals platform used by thousands of customers today, providing the same robust capabilities and pro developer experiences.

In an environment that contains Dynamics 365 customer engagement apps (Dynamics 365 Sales, Dynamics 365 Customer Service, Dynamics 365 Field Service, Dynamics 365 Customer Insights - Journeys, or Dynamics 365 Project Service Automation) you can continue to use [Dynamics 365 templates](/en-us/power-pages/templates/dynamics-365-templates) to accelerate development and deployment. These templates target diverse audiences such as communities, customers, partners, and employees and can provide a preconfigured environment that is immediately suitable for a number of scenarios:

*   Community and Modern Community
*   Customer, Employee, and Partner self-service
*   Field Service
*   Supply Chain Management Customer and Intelligent Order Management

Important

Available starter templates depend on the Dynamics 365 solutions provisioned in the environment. For example, Intelligent Order Management portal requires [Dynamics 365 Intelligent Order Management](/en-us/dynamics365/intelligent-order-management/?azure-portal=true) solution provisioned.

## Provision a Dynamics 365 site

To provision a portal in an environment with Dynamics 365 customer engagement apps:

1.  Sign in to [Power Pages](https://make.powerpages.microsoft.com/?azure-portal=true).
    
2.  Select a target environment by using the environment selector in the upper-right corner.
    
    Important
    
    Make sure selected environment contains Dynamics 365 applications, otherwise no Dynamics 365 templates will be available. If you do not have an environment with a Dynamics 365 app installed, you could [sign up for a Dynamics 365 trial environment](https://go.microsoft.com/fwlink/?linkid=2208427).
    
3.  Select **\+ Create a site**.
    
4.  Select **Dynamics 365** tab. ![Screenshot of the Dynamics 365 portal templates in Power Pages.](media/portal-dynamics365.png)
    
5.  Select a template then select **Choose this template**.
    
6.  Provide a site name and a unique web address.
    
7.  If your Dataverse environment has more than one language provisioned, expand **Show more details** section and select a site language.
    
    Tip
    
    To create a portal in a different language, you must first [enable the language in the environment](/en-us/power-platform/admin/enable-languages#enable-the-language) so that it becomes available in the language drop-down list.
    
8.  If Partner portal template is selected, you can additionally include Field Service or Project Service add-ons. These options are enabled if you have Dynamics 365 Field Service or Dynamics 365 Project Service Automation installed, respectively. ![Screenshot of the Partner portal provisioning.](media/partner-provisioning.png)
    
9.  Select **Done** to start the portal provisioning process. After portal provisioning has completed, the portal will appear in the list of Power Pages sites.
    

## Create a site with Copilot

Instead of starting from a template, you can describe the site you want in natural language and let Copilot generate it for you. Copilot creates a site name, web address, home page layout, and additional pages based on your description.

Note

Copilot for site creation is generally available in all regions except DoD. You must have the enhanced data model enabled in your environment to use this feature.

To create a site with Copilot:

1.  Sign in to [Power Pages](https://make.powerpages.microsoft.com/).
    
2.  In the text box on the home page, enter a description of the site you want to build. For example: _Build a website for customers to submit support requests and track their status._
    
3.  Press **Enter** or select the send icon. Copilot generates a suggested site name and web address — edit these as needed, then select **Next**.
    
4.  Review the generated home page layout. Select **Try again** to generate a new layout, or **Next** to accept it.
    
5.  Review the additional pages Copilot suggests. Select any pages you want to include, then select **Done**.
    

Site creation takes a few minutes. When complete, the site opens in Power Pages design studio where you can continue customizing it.

Next, you'll explore the core components of Power Pages, including the design studio workspaces and admin tools.
