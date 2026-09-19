import { MatterAccessory, EndpointType } from 'homebridge';

export class MatterFactory {

  constructor(
  ) {
    // 
  }

  static matterAccessory(
    displayName: string,
    uuid: string,
    accessoryType: string,
  ): MatterAccessory {

    const accessory: MatterAccessory = {
      UUID: uuid,
      displayName: displayName,
      deviceType: undefined as unknown as EndpointType,
      serialNumber: uuid,
      manufacturer: 'Virtual Matter Accessories For Homebridge',
      model: `Virtual Accessory - ${accessoryType}`,
      context: {},
    };

    return accessory;
  }
}
