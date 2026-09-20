import type { EndpointType, MatterAccessory } from 'homebridge';

export class MatterPlatformAccessory {

  private static readonly MAXIMUM_STRING_LENGTH: number = 35;

  private readonly matterAccessory: MatterAccessory;

  constructor(
    displayName: string,
    uuid: string,
    accessoryType: string,
  );

  constructor(
    matterAccessory: MatterAccessory,
  );

  constructor(
    displayNameOrMatterAccessory: string | MatterAccessory,
    uuid?: string,
    accessoryType?: string,
  ) {
    if (typeof displayNameOrMatterAccessory === 'string') {
      this.matterAccessory = {
        UUID: uuid!,
        displayName: displayNameOrMatterAccessory,
        deviceType: undefined as unknown as EndpointType,
        serialNumber: '',
        manufacturer: 'Virtual Matter Accessories',
        model: `VMA4H - ${accessoryType!}`,
        context: {},
      };
    }
    else {
      this.matterAccessory = displayNameOrMatterAccessory;
    }

    // Validate existing values.
    this.validateString(
      'serialNumber',
      this.matterAccessory.serialNumber,
    );

    this.validateString(
      'manufacturer',
      this.matterAccessory.manufacturer,
    );

    this.validateString(
      'model',
      this.matterAccessory.model,
    );
  }

  //
  // MatterAccessory
  //

  getMatterAccessory(): MatterAccessory {
    return this.matterAccessory;
  }

  //
  // Identity
  //

  get UUID(): string {
    return this.matterAccessory.UUID;
  }

  get displayName(): string {
    return this.matterAccessory.displayName;
  }

  set displayName(value: string) {
    this.matterAccessory.displayName =
    this.validateString('displayName', value);
  }

  get deviceType(): EndpointType {
    return this.matterAccessory.deviceType;
  }

  set deviceType(value: EndpointType) {
    this.matterAccessory.deviceType = value;
  }

  //
  // Basic Information
  //

  get serialNumber(): string {
    return this.matterAccessory.serialNumber;
  }

  set serialNumber(value: string) {
    this.matterAccessory.serialNumber =
      this.validateString('serialNumber', value);
  }

  get manufacturer(): string {
    return this.matterAccessory.manufacturer;
  }

  set manufacturer(value: string) {
    this.matterAccessory.manufacturer =
      this.validateString('manufacturer', value);
  }

  get model(): string {
    return this.matterAccessory.model;
  }

  set model(value: string) {
    this.matterAccessory.model =
      this.validateString('model', value);
  }

  get firmwareRevision(): string | undefined {
    return this.matterAccessory.firmwareRevision;
  }

  set firmwareRevision(value: string | undefined) {
    this.matterAccessory.firmwareRevision = value;
  }

  //
  // Context
  //

  get context(): MatterAccessory['context'] {
    return this.matterAccessory.context;
  }

  set context(value: MatterAccessory['context']) {
    this.matterAccessory.context = value;
  }

  //
  // Clusters
  //

  get clusters(): MatterAccessory['clusters'] {
    return this.matterAccessory.clusters;
  }

  set clusters(value: MatterAccessory['clusters']) {
    this.matterAccessory.clusters = value;
  }

  //
  // Handlers
  //

  get handlers(): MatterAccessory['handlers'] {
    return this.matterAccessory.handlers;
  }

  set handlers(value: MatterAccessory['handlers']) {
    this.matterAccessory.handlers = value;
  }

  //
  // Validation
  //

  private validateString(
    property: string,
    value: string,
  ): string {
    if (value.length > MatterPlatformAccessory.MAXIMUM_STRING_LENGTH) {
      throw new RangeError(
        `${property} cannot exceed ` +
        `${MatterPlatformAccessory.MAXIMUM_STRING_LENGTH} characters`,
      );
    }

    return value;
  }
}
