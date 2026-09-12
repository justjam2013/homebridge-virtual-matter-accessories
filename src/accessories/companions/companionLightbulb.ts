import { PlatformAccessory } from 'homebridge';

import { VirtualMatterAccessoriesPlatform } from '../../platform.js';
import { AccessoryConfiguration } from '../../configuration/configurationAccessory.js';

import { Lightbulb } from '../virtualAccessoryLightbulb.js';

/**
 * CompanionLightbulb - Companion accessory
 */
export class CompanionLightbulb extends Lightbulb {

  private companionName: string;

  constructor(
    platform: VirtualMatterAccessoriesPlatform,
    accessory: PlatformAccessory,
    accessoryConfiguration: AccessoryConfiguration,
    companionName: string,
  ) {
    super(platform, accessory, accessoryConfiguration);

    this.companionName = companionName;
  }
}
