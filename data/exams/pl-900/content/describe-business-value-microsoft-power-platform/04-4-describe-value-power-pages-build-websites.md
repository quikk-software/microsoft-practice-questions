---
title: "Describe the value of Microsoft Power Pages to build websites"
url: "https://learn.microsoft.com/en-us/training/modules/describe-business-value-microsoft-power-platform/4-describe-value-power-pages-build-websites"
uid: "learn.wwl.describe-business-value-microsoft-power-platform.describe-value-power-pages-build-websites"
module: "describe-business-value-microsoft-power-platform"
moduleTitle: "Describe the business value of Microsoft Power Platform"
learningPath: "learn.wwl.pl-900-power-platform-fundamentals"
---
# Describe the value of Microsoft Power Pages to build websites

Organizations often need to engage with people outside of their internal systems—customers submitting service requests, partners uploading documents, vendors checking order status, or citizens accessing public services. Building a secure, professional external-facing website to support those interactions has traditionally required web developers and significant time investment.

Microsoft Power Pages is a low-code, software as a service (SaaS) platform for creating, hosting, and administering modern external-facing business websites. Whether you're a business maker or a professional developer, Power Pages enables you to design, configure, and publish websites that connect to your organization's data in Dataverse.

[![Screenshot of website building interface for Power Pages site templates.](media/power-pages-site-template-options.png)](media/power-pages-site-template-options.png#lightbox)

## What makes Power Pages different

Power Pages is built on the same data platform as the rest of Power Platform. This means a website built with Power Pages can read and write data from the same Dataverse tables that your Power Apps, Power Automate flows, and Copilot Studio agents use. You're not building a disconnected web presence—you're creating an integrated front door to your organization's systems.

Power Pages websites are secure by design. Role-based permissions control what each visitor can see and interact with. Authenticated users can access their own records, submit forms, and track the progress of their requests, while public visitors see only what you choose to make available.

## Business value: Creating secure self-service experiences outside the organization

The business value of Power Pages is that it gives organizations a secure way to extend business processes to people outside the company. Customers, suppliers, partners, applicants, members, and citizens often need to submit information, check status, upload documents, or complete forms. Without a portal, these interactions usually happen through email, phone calls, paper forms, shared inboxes, or manual data entry by internal employees.

Power Pages replaces those disconnected interactions with a governed digital front door. External users can sign in, view only the information they're allowed to see, submit structured requests, upload supporting documents, and track progress without waiting for someone inside the organization to respond. Because Power Pages connects to Dataverse, information entered through the site can immediately become part of the same trusted data used by Power Apps, Power Automate, Copilot Studio, and Power BI.

This creates practical value for the organization. Routine service volume goes down because users can answer common questions and complete common tasks themselves. Response times improve because form submissions can trigger Power Automate workflows immediately. Data quality improves because information is captured in a structured format at the source instead of being retyped from emails or attachments. Transparency improves because external users can check progress without sending follow-up messages.

Power Pages also reduces the time and cost required to deliver secure external-facing websites. Instead of starting with a custom web development project, makers can begin with templates, use the design studio to configure pages and forms, and apply authentication, web roles, table permissions, and page permissions to control access.

## Potential use cases that provide business value

Power Pages provides the most value when an organization needs to give people outside the company a secure, guided way to interact with business data and processes.

*   **Customer service portal:** Customers can submit support requests, upload screenshots or documents, view case status, and review previous service history. The business value is fewer inbound status calls, faster case intake, more complete service records, and a better customer experience.
*   **Supplier or vendor portal:** Suppliers can view purchase orders, submit invoices, confirm delivery dates, update contact information, and upload compliance documents. The business value is reduced procurement administration, fewer payment-status inquiries, cleaner supplier data, and faster invoice routing.
*   **Partner onboarding portal:** Channel partners, resellers, or implementation partners can register their organization, submit required documentation, complete onboarding tasks, and track approval status. The business value is a more consistent onboarding experience, reduced back-and-forth communication, and faster time to productive partnership.
*   **Application or registration portal:** Applicants, students, members, citizens, or event participants can complete forms, upload supporting documents, and check submission status. The business value is faster intake, fewer incomplete submissions, and less manual data entry for internal teams.
*   **Field service customer portal:** Customers can request service visits, confirm appointment windows, upload photos of an issue, and review completed work orders. The business value is improved scheduling accuracy, fewer missed appointments, and faster issue resolution.
*   **Community or public-sector services portal:** Residents or community members can apply for services, report issues, submit feedback, and track progress online. The business value is improved access to services, reduced call-center volume, and more transparent case tracking.
*   **Knowledge and self-service portal:** External users can search articles, review FAQs, download approved documents, and submit a request only when self-service content doesn't answer their question. The business value is deflection of routine inquiries and more consistent answers.

## Copilot in Power Pages

Copilot capabilities in Power Pages help you build sites faster by generating page layouts, forms, and site text from natural language descriptions. You can describe the purpose of a page—for example, "Create a customer registration form that collects name, company, and service interest"—and Copilot generates the form and the corresponding Dataverse table to store the submissions.

The business value of Copilot in Power Pages is that it helps teams move from a portal idea to a working website much faster. Instead of starting with a blank site structure, makers can describe the kind of site they need, the audience it serves, the information it should collect, and the actions users should complete. Copilot generates a starting point that includes suggested pages, page copy, layouts, and forms that the maker can review and refine.

Copilot also helps with data capture. When a maker describes a form, Copilot can suggest the fields needed, create the supporting Dataverse table structure, and place the form on the page. That means the portal isn't just a static website—it can immediately collect structured information that can be routed through Power Automate, reviewed in Power Apps, analyzed in Power BI, or used by a Copilot Studio agent.

### Example: Using Copilot to create a customer onboarding portal

Imagine a company wants to create a customer onboarding portal for new clients. The team needs a public-facing site where customers can learn about the onboarding process, submit required company information, upload supporting documents, and check the status of their onboarding request.

With Copilot in Power Pages, a maker could start with a prompt such as: _"Create a customer onboarding portal for new business clients. Include a welcome page, an onboarding checklist, a form to collect company profile information, a document upload section, and a status page where customers can track progress."_

Copilot can generate the initial page structure, draft the welcome and instruction text, suggest the form fields, and create the Dataverse table needed to store onboarding submissions. The maker can then refine the wording, add or remove fields, adjust the layout, and connect the submission process to a Power Automate flow for internal review and approval.

The business value is faster portal delivery and a better onboarding experience. Customers receive clear instructions and a guided way to provide information. Internal teams receive structured data instead of scattered emails and attachments.
