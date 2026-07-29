---
title: "Configure settings for endpoint DLP"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/configure-endpoint-dlp-settings"
uid: "learn-m365.purview-implement-endpoint-dlp.configure-endpoint-dlp-settings"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Configure settings for endpoint DLP

Configure endpoint data loss prevention (DLP) settings before creating policies. These settings control what gets classified, which apps and domains are trusted, how the system responds to violations, and what users see when a policy triggers. Getting them right first prevents two frequent deployment problems: policies that block too aggressively and policies that miss real risks.

## Access endpoint DLP settings

In the Microsoft Purview portal:

1.  Sign in to the [Microsoft Purview portal](https://purview.microsoft.com?azure-portal=true), navigate to **Data loss prevention** > **Overview**.
    
2.  Select the **settings gear icon** in the upper right corner.
    
3.  On the **Settings** page, select **Data Loss Prevention** > **Endpoint DLP settings**:
    
    [![Screenshot showing the settings for endpoint DLP.](../../wwl/purview-implement-endpoint-dlp/media/endpoint-dlp-settings.png)](../../wwl/purview-implement-endpoint-dlp/media/endpoint-dlp-settings.png#lightbox)
    

## Activities endpoint DLP can restrict

Endpoint DLP can restrict specific activities involving sensitive files: uploading to cloud services, copying to USB or network shares, printing, pasting to browsers, copying via Bluetooth or Remote Desktop Protocol (RDP), and access by restricted apps. Each can be set to audit, warn, block with override, or block.

Not every activity is supported on every platform. Copy via RDP and Windows Recall snapshot detection (preview) aren't available on macOS, for example. Review the [full activity support matrix](/en-us/purview/endpoint-dlp-learn-about?azure-portal=true) before creating policies.

## What to configure before your first policy

For your first deployment, focus on three areas: **file path exclusions**, **restricted apps and app groups**, and **browser and domain restrictions**. These three have the most influence on whether your first policies work as intended. The remaining settings matter but are less likely to cause immediate problems.

### Advanced classification scanning and protection

This setting enables endpoint DLP to use trainable classifiers, exact data matches, and named entities beyond basic sensitive information types. Turn it on if your policies reference custom classifiers for things like engineering schematics or patient records. It increases CPU usage during file scans.

### When files are classified

Endpoint DLP classifies files under two conditions:

*   **Creation or modification**: A full scan for sensitive information types (SITs) and sensitivity labels runs every time a file is created or saved. The creation or modification scan is when content is extracted and analyzed.
*   **Reading an already classified file**: When a previously classified file is opened, endpoint DLP checks for changes to policies, rules, or SIT definitions. If the DLP configuration has changed since the last classification, rules are reevaluated. However, the original content extraction persists until the next save.

Note

Endpoint DLP can't detect sensitivity labels from another tenant on a document. Cross-tenant label detection isn't supported.

The practical effect: updating a SIT definition to be more precise won't reclassify existing files until someone edits them. Files that are only opened get reevaluated against new policy rules, but the underlying content classification stays the same.

### File path exclusions

Exclude directories with nonsensitive data or temporary system files. Without exclusions, endpoint DLP scans every file access event in those paths. Common exclusions include `C:\Temp\*` on Windows and `/Users/*/Library/Caches` on macOS. Excluding too many paths creates uncertainties. Excluding none creates performance problems.

### Restricted apps and app groups

Define which applications can't open or transfer sensitive files. You can list individual apps or organize them into groups (up to 50 apps per group, 10 groups), with per-activity controls for copy to clipboard, USB, network share, and print.

A "block all except allowed" approach is more secure but requires identifying every legitimate application in advance. Common background processes like `svchost.exe` and `teamsupdate.exe` are preconfigured to bypass enforcement.

### Browser and domain restrictions

Control where users can upload sensitive files through browsers. You define allowed and blocked domains, and endpoint DLP can redirect restricted uploads from Chrome or Firefox to Microsoft Edge, where native DLP enforcement applies.

For more granular control, **sensitive service domain groups** let you group cloud service domains by category and assign different policy actions. Each group supports matching by URL, IP address, or IP address range, with wildcards for subdomains (`*.contoso.com` covers `hr.contoso.com` and `finance.contoso.com`).

A built-in **Generative AI Websites** group is preconfigured for Data Security Posture Management for AI and can't be edited or deleted. Without domain groups, you can only apply the same action to every cloud upload.

### File types, extensions, and server support

Endpoint DLP scans files across categories like Office documents, PDFs, archives, text and code files, HTML, JSON, XML, and email formats. Supported types differ between Windows and macOS. Renaming a file doesn't bypass detection because endpoint DLP uses MIME type detection for common Office and PDF formats. System binaries and temporary files are never scanned.

Use **file extension groups** to assign policy actions by group when specific file types need different handling. Engineering formats (`.dwg`, `.step`, `.iges`) might warrant block actions for cloud uploads while standard Office documents only need audit. Don't include the `.` when adding extensions. To restrict activities on file types endpoint DLP doesn't normally scan, use the **Apply restrictions to only unsupported file extensions** feature, which blocks based on extension without content inspection.

Endpoint DLP policies can also extend to supported Windows Server versions for file server coverage. For requirements and setup, see [Configure endpoint DLP settings](/en-us/purview/dlp-configure-endpoint-settings?azure-portal=true). For supported and unsupported file extensions by platform, see [Learn about endpoint data loss prevention](/en-us/purview/endpoint-dlp-learn-about?azure-portal=true).

## Controls that affect user experience

These settings shape what happens when a policy triggers. Start with less restrictive settings and tighten after you understand the volume and types of policy matches.

### Autoquarantine

Autoquarantine moves files that trigger a violation into a quarantine folder and replaces them with a placeholder explaining why. It's the strictest endpoint DLP enforcement action and effective for high-severity scenarios. However, users lose immediate access until an administrator reviews the incident. Use it selectively for your highest-risk conditions.

### Override justifications

Control how users provide business justifications when overriding a block-with-override action. Preconfigured options are faster and easier to report on. Freeform text captures context that predefined categories miss. You can require either or both.

### Device and group management

Define which physical devices and destinations are trusted:

*   **Printer groups** control which printers handle sensitive documents. Restricting print to department-approved devices keeps sensitive pages off shared printers in public areas.
*   **Removable USB device groups** limit USB interaction with sensitive files. Encrypted corporate drives might be allowed while personal ones are blocked.
*   **Network share groups** apply different actions to different shares based on sensitivity.

### Bluetooth and VPN controls

Bluetooth is an egress path easy to overlook on laptops where it's enabled by default. Use **Unallowed Bluetooth apps** to block or audit data transfers through specific Bluetooth applications. For remote workers on a virtual private network (VPN), the risk profile of activities like USB copies or cloud uploads can change. Configure VPN-specific enforcement if your remote workforce handles sensitive data regularly.

## Audit and investigation settings

These settings provide visibility without restricting users.

### Evidence collection for file activities

Evidence collection stores copies of matched files in an Azure storage account, creating a forensic trail for incident investigations or compliance audits. The evidence repository itself needs access controls since it contains copies of your most sensitive files.

### Always audit file activity for devices

Continuous auditing generates detailed logs in Activity Explorer for opening, copying, or moving sensitive files, regardless of whether a policy action triggers. Valuable during initial deployment for building a baseline of how data actually moves.

### Network share coverage and exclusions

Without exclusions, policies evaluate every file operation on every accessible network share. Identify which shares hold regulated or confidential content and keep coverage there. Exclude shares with only nonsensitive data to reduce unnecessary evaluation.

### Always-on diagnostics

When enabled under **Additional settings**, always-on diagnostics automatically records comprehensive trace logs on devices without requiring manual collection. When an issue surfaces, the logs are already there.

For more information, see [Always-on diagnostics for endpoint DLP](/en-us/purview/dlp-always-on-diagnostics?azure-portal=true).
