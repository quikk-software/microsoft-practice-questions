---
title: "Deploy the Microsoft Purview browser extension"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/deploy-purview-extension"
uid: "learn-m365.purview-implement-endpoint-dlp.deploy-purview-extension"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Deploy the Microsoft Purview browser extension

Endpoint data loss prevention (DLP) enforcement in browsers depends on which browsers your organization uses. Microsoft Edge and Safari handle it natively. On Windows, Chrome and Firefox require the Microsoft Purview browser extension before endpoint DLP can enforce policies on uploads, paste actions, and printing.

## What your browser mix means for deployment

**Edge only**: No extension needed. Microsoft Edge enforces endpoint DLP restrictions natively on Windows and macOS.

**Safari only (macOS)**: No extension needed. Safari supports endpoint DLP natively, including uploads to restricted cloud services, printing, copying to clipboard, copying to removable storage, and copying to network shares. Paste-to-browser (preview) is available on macOS across all supported browsers.

**Chrome or Firefox (Windows)**: Deploy the Microsoft Purview browser extension to each browser. Without it, endpoint DLP can't enforce policies on browser-based activities. The extension is only available on Windows. On macOS, Chrome and Firefox receive DLP enforcement through the endpoint agent without a separate extension.

**Mixed environment**: Deploy extensions to Chrome and Firefox on Windows devices while Microsoft Edge and Safari handle enforcement natively. Many organizations have a mix. The risk is inconsistent enforcement if the extension isn't deployed on every Windows device where users browse with Chrome or Firefox.

If your organization allows browsers not listed here, endpoint DLP can't enforce through them. Consider configuring browser restrictions in your endpoint DLP settings to redirect sensitive activities to supported browsers.

## Browser comparison

Browser

Platform

Extension required

Supported activities

Microsoft Edge

Windows, macOS

No

Upload to cloud, Print, Copy to clipboard, Copy to USB/removable storage, Copy to network share, Paste to browser

Safari

macOS

No

Upload to cloud, Print, Copy to clipboard, Copy to USB/removable storage, Copy to network share, Paste to browser (preview)

Google Chrome

Windows

Yes

Upload to cloud, Print, Copy to clipboard, Copy to USB/removable storage, Copy to network share, Paste to browser

Mozilla Firefox

Windows

Yes

Upload to cloud, Print, Copy to clipboard, Copy to USB/removable storage, Copy to network share, Paste to browser

All supported browsers enforce **Audit**, **Block with override**, and **Block** actions. The difference is deployment effort, not capability. Chrome and Firefox with the extension match Microsoft Edge for all activities on Windows. Paste-to-browser on macOS (preview) is available across all supported browsers.

## Deploy extensions for Chrome and Firefox

For a handful of devices, users can install the extension manually from the Chrome Web Store or by downloading the Firefox add-on. For organization-wide deployment, use Intune or Group Policy. Deploying through management tools also prevents users from disabling or uninstalling the extension.

For deployment instructions, see [Get started with the Microsoft Purview Extension for Chrome](/en-us/purview/dlp-chrome-get-started?azure-portal=true) and [Get started with the Microsoft Purview Extension for Firefox](/en-us/purview/dlp-firefox-extension-get-started?azure-portal=true).

## Verify enforcement is working

After deploying the extension:

1.  Open a file that matches one of your organization's sensitive information types or sensitivity labels.
2.  In Chrome or Firefox, attempt a restricted action such as uploading the file to a restricted cloud service, printing it, or copying its content.
3.  Confirm that a DLP notification appears. The notification should indicate whether the action is blocked, requires override, or has been audited according to your policy.

If the notification doesn't appear, check that the extension is installed and enabled. Verify the device is onboarded and the file matches an active policy condition. Review **Activity explorer** and the **DLP Alerts dashboard** to confirm whether the event was logged.
