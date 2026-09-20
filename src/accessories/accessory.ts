/* eslint-disable @typescript-eslint/no-explicit-any */

import { EndpointType, Service } from 'homebridge';

import { VirtualMatterAccessoriesPlatform } from '../platform.js';
import { AccessoryConfiguration } from '../configuration/configurationAccessory.js';

import { MatterPlatformAccessory } from '../matterPlatformAccessory.js';
import { ClustersUtils } from '../clustersUtils.js';
import { VirtualLogger } from '../utils/virtualLogger.js';

import fs from 'fs';

/**
 * Abstract Accessory
 */
export abstract class Accessory extends ClustersUtils {

  readonly platform: VirtualMatterAccessoriesPlatform;
  readonly accessory: MatterPlatformAccessory;

  readonly accessoryConfiguration: AccessoryConfiguration;
  readonly log: VirtualLogger;

  protected accessoryName: string = '';
  protected defaultState!: number | boolean;

  protected storagePath: string;

  protected accessoryInformationService?: Service;

  constructor(
    platform: VirtualMatterAccessoriesPlatform,
    accessory: MatterPlatformAccessory,
    accessoryConfiguration: AccessoryConfiguration,
    deviceType: EndpointType,
  ) {
    super(platform.api.matter!);

    this.accessory = accessory;
    this.platform = platform;

    // MatterAccessory interface properties
    this.accessory.manufacturer = 'Virtual Matter Accessories';
    this.accessory.model = `VMA4H - ${deviceType.name}`;
    this.accessory.serialNumber = accessoryConfiguration.accessoryID.substring(0, 35);  // Truncate to 35 characters
    this.accessory.firmwareRevision = this.accessory.context.firmwareVersion;

    this.accessory.displayName = accessoryConfiguration.accessoryName;
    this.accessory.deviceType = deviceType;

    // Set context with all metadata
    this.accessory.context = {
      serialNumber: this.accessory.serialNumber,
      manufacturer: this.accessory.manufacturer,
      model: this.accessory.model,
      firmwareRevision: this.accessory.firmwareRevision,
      ...this.accessory.context,
    };

    // The accessory configuration is stored in the context in VirtualAccessoryPlatform.discoverDevices()
    this.accessoryConfiguration = accessoryConfiguration;
    this.accessoryName = this.accessoryConfiguration.accessoryName;

    this.log = this.platform.log;    


    console.log(JSON.stringify(accessory, null, 2));


    this.log.debug(`[${this.accessoryName}] Accessory context: ${JSON.stringify(accessory.context)}`);

    this.storagePath = accessory.context.storagePath;

    if (!this.accessoryConfiguration.accessoryIsStateful) {
      this.deleteState(this.storagePath);
    }
  }

  private readonly EMPTY_ACCESSORY_STATE = '{}';

  protected isEmptyAccessoryState(json: any) {
    return JSON.stringify(json) === this.EMPTY_ACCESSORY_STATE;
  }

  protected loadAccessoryState(
    storagePath: string,
  ): any {
    let contents = this.EMPTY_ACCESSORY_STATE;
    if (fs.existsSync(storagePath)) {
      contents = fs.readFileSync(storagePath, 'utf8');
    }

    const json = JSON.parse(contents);

    this.log.debug(`[${this.accessoryName}] Loading state: ${JSON.stringify(json)}`);
    return json;
  }

  private saveAccessoryState(
    storagePath: string,
    stateJson: string,
  ): void {
    // Overwrite the existing persistence file
    this.log.debug(`[${this.accessoryName}] Saving state: ${stateJson}`);
    try {
      fs.writeFileSync(
        storagePath,
        stateJson,
        { encoding: 'utf8', flag: 'w' },
      );

      this.log.debug(`[${this.accessoryName}] Saved state: ${stateJson}`);
    }
    catch (error) {
      this.log.error(`[${this.accessoryName}] Error saving state: ${error}`);
    }
  }

  protected deleteState(
    storagePath: string,
  ) {
    this.log.debug(`[${this.accessoryName}] Deleting state file ${storagePath}`);
    if (fs.existsSync(storagePath)) {
      try {
        fs.unlinkSync(storagePath); 
      }
      catch (err) {
        this.log.error(`[${this.accessoryName}] Error deleting state file ${storagePath}`);
      }
    }
  }

  // Store device state if stateful
  protected saveState() {
    if (this.accessoryConfiguration.accessoryIsStateful) {
      this.saveAccessoryState(this.storagePath, this.getJsonState());
    }
  }

  /**
   * Update the accessory state
   */
  // protected async updateAccessoryState<K extends keyof ClusterStateMap>(cluster: K, attributes: Partial<ClusterStateMap[K]>, partId?: string): Promise<void>
  // protected async updateAccessoryState(cluster: string, attributes: Record<string, unknown>, partId?: string): Promise<void>
  // protected async updateAccessoryState(cluster: string, attributes: Record<string, unknown>, partId?: string): Promise<void> {
  //   await this.api.updateAccessoryState(this.UUID, cluster, attributes, partId)

  //   this.log.debug(`[${this.accessoryName}] Updated ${cluster} state: ${JSON.stringify(attributes)}`);
  // }

  /**
   * Read the current accessory state
   */
  // protected async readAccessoryState<K extends keyof ClusterStateMap>(cluster: K, partId?: string): Promise<Partial<ClusterStateMap[K]> | undefined>
  // protected async readAccessoryState(cluster: string, partId?: string): Promise<Record<string, unknown> | undefined>
  // protected async readAccessoryState(cluster: string, partId?: string): Promise<Record<string, unknown> | undefined> {
  //   const accessoryState: Record<string, unknown> | undefined = await this.api.getAccessoryState(this.UUID, cluster, partId)

  //   this.log.debug(`[${this.accessoryName}] Read ${cluster} state: ${JSON.stringify(accessoryState)}`);

  //   return accessoryState;
  // }

  // Absract methods

  protected abstract getJsonState(): string;
}
