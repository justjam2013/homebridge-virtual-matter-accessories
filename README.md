<div>
    <a href="https://www.npmjs.com/package/homebridge-virtual-matter-accessories"><img src="https://img.shields.io/github/package-json/v/justjam2013/homebridge-virtual-matter-accessories?color=F99211" /></a>
    <a href="https://www.npmjs.com/package/homebridge-virtual-matter-accessories"><img src="https://img.shields.io/github/v/release/justjam2013/homebridge-virtual-matter-accessories?color=FFd461" /></a>
    <!-- a href="https://github.com/homebridge/homebridge/wiki/Verified-Plugins"><img src="https://img.shields.io/badge/homebridge-verified-blueviolet?color=%23491F59&style=flat" /></a -->
    <a href="https://github.com/justjam2013/homebridge-virtual-matter-accessories"><img src="https://img.shields.io/badge/_homebridge_v2.0_-_ready_-4CAF50" /></a>
    <a href="https://discord.gg/Z8jmyvb"><img src="https://img.shields.io/badge/discord-%23virtual--accessories-737CF8" /></a>
</div>

<br/><br/>
<p align="center" vertical-align="middle">
    <a href="https://github.com/justjam2013/homebridge-virtual-matter-accessories"><img src="assets/icon/VirtualMatterAccessories.png" height="180" /></a>
    <a href="https://github.com/homebridge/homebridge"><img src="https://raw.githubusercontent.com/homebridge/branding/master/logos/homebridge-color-round-stylized.png" height="180" /></a>
</p>

<span align="center">

# Virtual Matter Accessories For Homebridge

</span>

### Plugin for Homebridge that provides the ability to create virtual Matter accessories.

## <!-- Thin separator line -->

#### UI Languages

Currently Virtual Matter Accessories For Homebridge offers Spanish and Dutch translations for the UI. This can be accessed by changing the Language setting in Homebridge UI. The plugin will use this setting. Please vote in this ticket for which language you would like to see the UI translated to: [Looking for people interested in translating the plugin UI into other languages](https://github.com/justjam2013/homebridge-virtual-matter-accessories/issues/703)

You do not have to volunteer to translate it, but hopefully will provide feedback if there are issues with the translations.

## <!-- Thin separator line -->

<details>
  <summary>
    
  ## 📝 Table Of Contents

  </summary>

  - [About Virtual Matter Accessories For Homebridge](#about-virtual-matter-accessories-for-homebridge)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Accessory Configurations](#accessory-configurations)
    - [Switch](#switch)
      - [Switch with reset timer](#switch-with-reset-timer)
      - [Switch with random reset timer](#switch-with-random-reset-timer)
      - [Switch with companion sensor (sensor triggered on \& off by switch state)](#switch-with-companion-sensor-sensor-triggered-on--off-by-switch-state)
  - [Known Issues](#known-issues)
    - [Issues with Homebridge UI:](#issues-with-homebridge-ui)
    - [Issues with underlying frameworks:](#issues-with-underlying-frameworks)
  - [What if I run into a problem?](#what-if-i-run-into-a-problem)
</details>

## <!-- Thin separator line -->

## About Virtual Matter Accessories For Homebridge

This plugin is a Matter version of the [`Virtual Matter Accessories For Homebridge`](https://github.com/justjam2013/homebridge-virtual-matter-accessories) plugin.

The purpose of this plugin is to be able to create different types of Matter virtual accessories. I am slowly moving my smart home setup to Matter, so I wanted to have my virtual accessories exposed as Matter devices also.

This is work in progress so I will be releasing bug fixes and updates. Also, I will slowly add new accessories and functionality, either as I need them, or, more likely, in response to requests by users who find this plugin useful.

Currently, these are the implemented virtual accessories:

-   **Switch.** Allows you to create a number of different types of virtual switches.
    - **Plain old switches.** What it says on the label.
    - **Normally on/off switches.** The default state of the switch can be set to "on" or "off". This is also the default state when Homebridge restarts. If you pair it with a timer, the switch will revert back to the default state when the timer expires.
    - **Stateful switches.** The state of the switch persists across restarts of Homebridge. This includes timed switches.
    - **Switches with companion sensors.** The switch will trigger a companion sensor when it changes state, generating an Apple Home-native notification in the Home app. Selecting a critical sensor type will allow notifications to bypass Focuses like "Do Not Disturb". This is just the easier way of implementing a switch triggered sensor.
    - **Timed switches.** This is a way to introduce timers into Apple Home. The switch will revert back to its default state when the timer expires. If the switch is stateful, the timer will be restored after a restart of Homebridge. While care is taken to restore the timer with the appropriate time correction, **absolute accuracy is not guaranteed and should not be expected**. The accuracy of the restored timer will be affected, among other things, by the hardware and software Homebridge is running on, the number of plugins installed, the order with which the plugins are restored, etc. (see note below)
 
- **Timer.** To create a timer, create a timed switch.

> [!NOTE]
> When a timed switch is restored after a restart, if the the time remaining on the timer after correction is 0 seconds (i.e. the timer expired while Homebridge was not running), this would leave the switch in a bad state. So the timer will always be restored to at least 1 second, thus allowing the timer to end, reset the switch to its default state, and the switch flip event to occur for any automations depending on it. This is a tradeoff wherein a late event is preferred to a lost event.

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>

## Installation

You can install this plugin via the Homebridge UI or from the command line by typing:

```
npm install -g homebridge-virtual-matter-accessories
```

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>

## Configuration

You can configure the plugin from the Homebridge UI, or by ediiting the JSON configuration directly in the Homebridge JSON Config editor.
In the UI, required fields will be marked with an asterisk (*) and you will not be allowed to save the configuration if the required fields are not filled in.

`accessoryID`, `accessoryName`, and `accessoryType` are required fields for all the accessories.

The configuration is validated on startup, so if an accessory is misconfigured, you will see error entries in the logs to help you correct the configuration. The log entries will indicate the misconfigured fields and look something like this:

```
[12/21/2024, 12:35:38 AM] [Virtual Matter Accessories Platform] Skipping accessory. Configuration is invalid: { "accessoryID": "12345", "accessoryName": "My Switch", ... }
[12/21/2024, 12:35:38 AM] [Virtual Matter Accessories Platform] Invalid fields: [switchDefaultState]
```

> [!IMPORTANT]
> `accessoryID` uniquely identifies an accessory and each accessory must have a different value. This is because Apple Home requires a unique and unmodifiable serial number to identify an accessory. The accessory ID acts as a virtual serial number for each accessory that must be unique and unmodifiable. If you do assign the same accessory ID to multiple accessories by mistake, on startup the plugin will skip any accessory that has a duplicate ID and output a message in the logs alerting you to the issue. If you change the value of `accessoryID` after saving the config, Apple Home will interpret the change as the "old" accessory having been deleted and a "new" one added. This will cause the Home app to delete any scenes and automations that use the deleted accessory. Some plugins use the accessory name as the unique ID, which means that you cannot easily change the name. Virtual Matter Accessories For Homebridge uses a dedicated field as the unique ID, allowing you to modify the accessory name, if you so choose to.<p>
I use [random.org](https://www.random.org/) to generate unique IDs. While the plugin only requires 5 digits for the IDs, I use 7-digit values between 1,000,000 and 10,000,000. This provides a range of 9 million possible IDs, which greatly reduces the chances of a duplicate.

> [!NOTE]
> `acccessoryName` is the name that will apppear on the Apple Home tile for the accessory, as well as the accessory header in the plugin config. While a unique name is not required, it is recommended to assign different names to each accessory. As Vitual Accessories For Homebridge uses `accessoryID` as the unique identifier, **you can change the accessory name at any time**, if you so choose to. The name change will be propagated to the Home app.

It is recommended to use the Homebridge UI to configure this plugin, as the requirements may vary based on the property value selections. If you choose to manually create or modify the accessory JSON configurations, the following configurations are references and do not cover all of the different value permutations. Please adjust for your requirements.

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>

## Accessory Configurations

These are example configurations of the virtual accessories and provided for reference only. They are not intended to be exhaustive of all the different permutations and it is recommended that you use the UI to fully explore each accessory's setup.

### Switch

```json
{
    "name": "Virtual Matter Accessories Platform",
    "devices": [
        {
            "accessoryID": "1234567",
            "accessoryName": "My Switch",
            "accessoryType": "switch",
            "accessoryIsStateful": false,
            "switch": {
                "defaultState": "off",
                "muteLogging": false
            }
        }
    ],
    "platform": "VirtualAccessoriesForHomebridge"
}
```

### Switch with reset timer

```json
{
    "name": "Virtual Matter Accessories Platform",
    "devices": [
        {
            "accessoryID": "1234567",
            "accessoryName": "My Switch",
            "accessoryType": "switch",
            "accessoryIsStateful": false,
            "switch": {
                "defaultState": "off",
                "hasResetTimer": true
            },
            "resetTimer": {
                "duration": {
                    "days": 0,
                    "hours": 0,
                    "minutes": 0,
                    "seconds": 10
                },
                "isResettable": true
            }
        }
    ],
    "platform": "VirtualAccessoriesForHomebridge"
}
```

### Switch with random reset timer

```json
{
    "name": "Virtual Matter Accessories Platform",
    "devices": [
        {
            "accessoryID": "1234567",
            "accessoryName": "My Switch",
            "accessoryType": "switch",
            "accessoryIsStateful": false,
            "switch": {
                "defaultState": "off",
                "hasResetTimer": true
            },
            "resetTimer": {
                "durationIsRandom": true,
                "durationRandomMin": {
                    "days": 0,
                    "hours": 0,
                    "minutes": 5,
                    "seconds": 0
                },
                "durationRandomMax": {
                    "days": 0,
                    "hours": 0,
                    "minutes": 20,
                    "seconds": 0
                },
                "isResettable": true
            }
        }
    ],
    "platform": "VirtualAccessoriesForHomebridge"
}
```

### Switch with companion sensor (sensor triggered on & off by switch state)

```json
{
    "name": "Virtual Matter Accessories Platform",
    "devices": [
        {
            "accessoryID": "1234567",
            "accessoryName": "My Switch",
            "accessoryType": "switch",
            "accessoryIsStateful": false,
            "switch": {
                "defaultState": "off",
                "hasCompanionSensor": true
            },
            "companionSensor": {
                "name": "My Companion Sensor",
                "type": "contact"
            }
        }
    ],
    "platform": "VirtualAccessoriesForHomebridge"
}
```

## <!-- Thin separator line -->

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>

## Known Issues

#### Issues with Homebridge UI:

-   None currently.

#### Issues with underlying frameworks:

-   There is an issue with checkboxes requiring two clicks to uncheck. A bug report has been opened on the framework repo.

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>

## What if I run into a problem?

Check the [Wiki](https://github.com/justjam2013/homebridge-virtual-matter-accessories/wiki). Here you will find entries with instructions in the event of breaking updates. I will also post detailed  instructions for using certain functionalities, like the webhook service.

If the Wiki entries do not provide answers to your problem, you can [check the #virtual matter accessories channel on Discord](https://discord.gg/Z8jmyvb) for any notifications, or [open a bug report or a support request here on GitHub](https://github.com/justjam2013/homebridge-virtual-matter-accessories/issues). Please include log outputs and configuration details to the issue, making sure to remove any sensitive information such as passwords, tokens, etc. The more information you provide, the better I can investigate the issues.

Please open a [Feature Request issue](https://github.com/justjam2013/homebridge-virtual-matter-accessories/issues/new/choose) if you have any enhancement suggestions or any additional functionality that you would like to see added, or comment on an existing issue if one is already open. If the enhancement suggestion fits within the scope of the plugin, I will consider adding it in a future release.

<span align="right">
  <h6>
    
  [Back to top](#top)

  </h6>
</span>
