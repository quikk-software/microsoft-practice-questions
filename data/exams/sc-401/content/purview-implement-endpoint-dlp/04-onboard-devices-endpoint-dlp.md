---
title: "Onboard devices for endpoint DLP"
url: "https://learn.microsoft.com/en-us/training/modules/purview-implement-endpoint-dlp/onboard-devices-endpoint-dlp"
uid: "learn-m365.purview-implement-endpoint-dlp.onboard-devices-endpoint-dlp"
module: "purview-implement-endpoint-dlp"
moduleTitle: "Implement endpoint data loss prevention (DLP) with Microsoft Purview"
learningPath: "learn.wwl.purview-implement-manage-dlp"
---
# Onboard devices for endpoint DLP

Endpoint data loss prevention (DLP) can only protect devices that are onboarded and communicating with the Purview service. Before choosing an onboarding method, think about how your target devices are managed today. Cloud-managed through Intune? Domain-joined through Active Directory? A mix? Running as virtual desktops? The answer determines which method to use.

## Choose your onboarding method

Use the method that matches your existing management tooling. If devices are managed through multiple systems, you'll likely need more than one method.

Environment

Recommended method

Why

**Cloud-managed (Intune/MDM)**

Intune

Devices are already enrolled. Intune pushes the onboarding package as a configuration profile.

**Domain-joined (Active Directory)**

Group Policy

Applies the onboarding package through existing Group Policy infrastructure.

**Mixed (Intune + on-premises)**

Intune for cloud-managed, Group Policy or Configuration Manager for domain-joined

Use both methods in parallel. Devices won't be onboarded twice.

**Configuration Manager**

Configuration Manager

Deploys the onboarding package through task sequences or compliance baselines.

**Virtual desktops (Azure Virtual Desktop, Citrix, Windows 365)**

Virtual desktop infrastructure (VDI) onboarding script

Handles non-persistent environments where standard packages might not survive session resets.

**Testing or small deployments**

Local script

Runs on individual devices. Useful for proof-of-concept but doesn't scale.

**macOS (Intune-managed)**

Intune

Deploys the onboarding configuration profile. Use the MDE-specific variant if Defender for Endpoint is already installed.

**macOS (JAMF-managed)**

JAMF Pro

Deploys the onboarding package through JAMF policies. Use the MDE-specific variant if Defender for Endpoint is already installed.

If devices are already onboarded to Microsoft Defender for Endpoint (MDE), they appear automatically in the Purview device list. No need to onboard them again.

## Proxy and connectivity

Devices must reach the Purview cloud service to receive policies and report activity. Incorrect proxy settings are a frequent reason onboarded devices fail to enforce policies. If a device appears onboarded but isn't enforcing anything, start with proxy configuration. For details, see [Configure device proxy and internet connection settings for Information Protection](/en-us/purview/device-onboarding-configure-proxy?azure-portal=true).

## Enable device onboarding in the portal

Before onboarding devices with any method, enable device onboarding in Microsoft Purview.

1.  Sign in to the [Microsoft Purview portal](https://purview.microsoft.com?azure-portal=true), then navigate to **Settings**.
    
2.  Expand **Device onboarding**, then select **Devices**.
    
3.  Select **Turn on device onboarding**.
    
4.  Once enabled, select **Onboarding** on the left sidebar and choose the target operating system and deployment method.
    

[![Screenshot showing the onboarding options in endpoint DLP for Windows devices.](../../wwl/purview-implement-endpoint-dlp/media/endpoint-dlp-onboard-options-windows.png)](../../wwl/purview-implement-endpoint-dlp/media/endpoint-dlp-onboard-options-windows.png#lightbox)

## Onboard Windows and macOS devices

Windows devices must run one of the three latest released versions of Windows 10 or Windows 11. macOS devices must run one of the three latest released versions and must be enrolled in Intune or JAMF Pro before onboarding. macOS doesn't have a Group Policy or local script option.

For macOS, the distinction between standard and MDE onboarding variants matters: if Defender for Endpoint is already installed, the MDE-specific method integrates with the existing agent rather than deploying a separate one.

For step-by-step instructions for each platform and method, see [Onboard devices into Microsoft Purview solutions](/en-us/purview/device-onboarding-overview?azure-portal=true).

## Onboard virtualized environments

Endpoint DLP supports virtual desktops, hosted workspaces, and non-persistent environments. The onboarding process is the same as for physical devices, with a few limitations:

*   **Copy to Clipboard** and **Enforcing Endpoint DLP** aren't supported on Azure Virtual Desktop through browsers. The same egress operation is still protected through **Endpoint DLP for actions via Remote Desktop Session (RDP)**.
*   Citrix XenApp doesn't support access by restricted app enforcement.
*   USB storage devices in virtualized environments are treated as network shares. Include the **Copy to network share** activity in your policies to cover USB copy events.

For supported virtualization platforms and version requirements, see [Onboard devices into Microsoft Purview solutions](/en-us/purview/device-onboarding-overview?azure-portal=true).

## Offline devices

When a Windows device goes offline, previously synced policies continue to enforce on files that have already been classified. New policy updates won't sync until the device reconnects, and enforcement events won't appear in Activity Explorer until it's back online. Users who frequently work offline still receive protection from synced policies. Ensure devices connect periodically to pick up changes.

Important

Offline device enforcement isn't supported on macOS. It's a Windows-only capability.
