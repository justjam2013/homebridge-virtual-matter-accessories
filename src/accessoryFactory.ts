import { VirtualMatterAccessoriesPlatform } from './platform.js';
import { MatterPlatformAccessory } from './matterPlatformAccessory.js';

import { Accessory } from './accessories/accessory.js';

import { Switch } from './accessories/virtualAccessorySwitch.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AccessoryType, BinarySensorType, MeasurementSensorType, TriggerType } from './configuration/schema.js';
import { AccessoryConfiguration } from './configuration/configurationAccessory.js';

/**
 * Virtual Accessory Factory
 * Factory class to create virtual accessories
 */
export abstract class AccessoryFactory {

  constructor(
  ) {
    // 
  }

  static createVirtualAccessory(
    platform: VirtualMatterAccessoriesPlatform,
    accessory: MatterPlatformAccessory,
    accessoryConfiguration: AccessoryConfiguration,
  ): Accessory | undefined {
    let virtualAccessory: Accessory | undefined;

    const accessoryType: string = accessoryConfiguration.accessoryType;

    switch (accessoryType) {
    case AccessoryType.Switch:
      try {
        virtualAccessory = new Switch(platform, accessory, accessoryConfiguration);
      }
      catch (error) {
        AccessoryFactory.handleError(error, platform, accessoryConfiguration);
      }
      break;
    default:
      platform.log.error(`Error creating accessory. Invalid accessory type: ${accessoryType}`);
    }

    return virtualAccessory;
  }

  private static handleError(
    error: unknown,
    platform: VirtualMatterAccessoriesPlatform,
    accessoryConfiguration: AccessoryConfiguration,
  ): void {
    if (!(error instanceof RangeError)) {
      throw error;
    }

    platform.log.error(`Error creating accessory for ${accessoryConfiguration.accessoryName}: '${error}'`);
  }

  // static createVirtualBinarySensor(
  //   platform: VirtualMatterAccessoriesPlatform,
  //   accessory: MatterAccessory,
  //   accessoryConfiguration: AccessoryConfiguration,
  // ): BinarySensor | undefined {
  //   const sensorType: string = accessoryConfiguration.sensor.type;

  //   let virtualSensor: BinarySensor | undefined;

  //   switch (sensorType) {
  //   case BinarySensorType.CarbonDioxide:
  //     virtualSensor = new CarbonDioxideSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.CarbonMonoxide:
  //     virtualSensor = new CarbonMonoxideSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.Contact:
  //     virtualSensor = new ContactSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.Leak:
  //     virtualSensor = new LeakSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.Motion:
  //     virtualSensor = new MotionSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.Occupancy:
  //     virtualSensor = new OccupancySensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case BinarySensorType.Smoke:
  //     virtualSensor = new SmokeSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   default:
  //     platform.log.error(`Error creating sensor. Invalid sensor type: ${sensorType}`);
  //   }

  //   return virtualSensor;
  // }

  // static createVirtualMeasurementSensor(
  //   platform: VirtualMatterAccessoriesPlatform,
  //   accessory: MatterAccessory,
  //   accessoryConfiguration: AccessoryConfiguration,
  // ): MeasurementSensor | undefined {
  //   const sensorType: string = accessoryConfiguration.measurement.type;

  //   let virtualSensor: MeasurementSensor | undefined;

  //   switch (sensorType) {
  //   case MeasurementSensorType.Humidity:
  //     virtualSensor = new HumiditySensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   case MeasurementSensorType.Temperature:
  //     virtualSensor = new TemperatureSensor(platform, accessory, accessoryConfiguration);
  //     break;
  //   default:
  //     platform.log.error(`Error creating sensor. Invalid sensor type: ${sensorType}`);
  //   }

  //   return virtualSensor;
  // }

  // static createTrigger(
  //   sensor: BinarySensor,
  //   triggerType: string,
  //   name: string,
  // ): Trigger | undefined {
  //   let trigger: Trigger | undefined;

  //   switch (triggerType) {
  //   case TriggerType.Cron:
  //     trigger = new CronTrigger(sensor, name);
  //     break;
  //   case TriggerType.IkeaMatterStock:
  //     trigger = new IkeaMatterStockTrigger(sensor, name);
  //     break;
  //   case TriggerType.Ping:
  //     trigger = new PingTrigger(sensor, name);
  //     break;
  //   case TriggerType.Startup:
  //     trigger = new StartupTrigger(sensor, name);
  //     break;
  //   case TriggerType.SunEvents:
  //     trigger = new SunEventsTrigger(sensor, name);
  //     break;
  //   case TriggerType.Webhook:
  //     trigger = new WebhookTrigger(sensor, name);
  //     break;
  //   default:
  //     sensor.log.error('Error creating trigger. Invalid trigger type:', [triggerType]);
  //   }

  //   return trigger;
  // }
}
