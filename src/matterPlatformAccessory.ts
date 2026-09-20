import type {
  EndpointType,
  MatterAccessory,
} from 'homebridge';

/**
 * NOTE: this class should not be used as an instance of MatterAccessory
 * due to Homebridge code using object spread. So this class would cause
 * that code to fail.
 * 
 * The 'implements MatterAccessory' is solely to ensure that this class
 * fully wraps MatterAccessory
 */
export class MatterPlatformAccessory implements MatterAccessory {
  private static readonly MAXIMUM_BASIC_INFORMATION_LENGTH = 32;
  private static readonly MAXIMUM_VERSION_LENGTH = 64;

  private readonly matterAccessory: MatterAccessory;

  constructor(
    displayName: string,
    uuid: string,
    deviceType: EndpointType,
  );
  constructor(matterAccessory: MatterAccessory);

  constructor(
    displayNameOrMatterAccessory: string | MatterAccessory,
    uuid?: string,
    deviceType?: EndpointType,
  ) {
    if (typeof displayNameOrMatterAccessory === 'string') {
      this.matterAccessory = {
        UUID: uuid!,
        displayName: displayNameOrMatterAccessory,
        deviceType: deviceType!,
        serialNumber: '',
        manufacturer: 'Virtual Matter Accessories',
        model: `VMA4H - ${deviceType!.name}`,
        context: {},
      };
    }
    else {
      this.matterAccessory = displayNameOrMatterAccessory;
    }

    this.validate();
  }

  getMatterAccessory(): MatterAccessory {
    return this.matterAccessory;
  }

  get UUID(): string {
    return this.matterAccessory.UUID;
  }

  set UUID(value: string) {
    this.matterAccessory.UUID = value;
  }

  get displayName(): string {
    return this.matterAccessory.displayName;
  }

  set displayName(value: string) {
    this.validateString(
      'displayName',
      value,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.matterAccessory.displayName = value;
  }

  get deviceType(): EndpointType {
    return this.matterAccessory.deviceType;
  }

  set deviceType(value: EndpointType) {
    this.matterAccessory.deviceType = value;
  }

  get serialNumber(): string {
    return this.matterAccessory.serialNumber;
  }

  set serialNumber(value: string) {
    this.validateString(
      'serialNumber',
      value,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.matterAccessory.serialNumber = value;
  }

  get manufacturer(): string {
    return this.matterAccessory.manufacturer;
  }

  set manufacturer(value: string) {
    this.validateString(
      'manufacturer',
      value,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.matterAccessory.manufacturer = value;
  }

  get model(): string {
    return this.matterAccessory.model;
  }

  set model(value: string) {
    this.validateString(
      'model',
      value,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.matterAccessory.model = value;
  }

  get firmwareRevision(): string | undefined {
    return this.matterAccessory.firmwareRevision;
  }

  set firmwareRevision(value: string | undefined) {
    if (value !== undefined) {
      this.validateString(
        'firmwareRevision',
        value,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }

    this.matterAccessory.firmwareRevision = value;
  }

  get hardwareRevision(): string | undefined {
    return this.matterAccessory.hardwareRevision;
  }

  set hardwareRevision(value: string | undefined) {
    if (value !== undefined) {
      this.validateString(
        'hardwareRevision',
        value,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }

    this.matterAccessory.hardwareRevision = value;
  }

  get softwareVersion(): string | undefined {
    return this.matterAccessory.softwareVersion;
  }

  set softwareVersion(value: string | undefined) {
    if (value !== undefined) {
      this.validateString(
        'softwareVersion',
        value,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }

    this.matterAccessory.softwareVersion = value;
  }

  get context(): MatterAccessory['context'] {
    return this.matterAccessory.context;
  }

  set context(value: MatterAccessory['context']) {
    this.matterAccessory.context = value;
  }

  get clusters(): MatterAccessory['clusters'] {
    return this.matterAccessory.clusters;
  }

  set clusters(value: MatterAccessory['clusters']) {
    this.matterAccessory.clusters = value;
  }

  get handlers(): MatterAccessory['handlers'] {
    return this.matterAccessory.handlers;
  }

  set handlers(value: MatterAccessory['handlers']) {
    this.matterAccessory.handlers = value;
  }

  get getState(): MatterAccessory['getState'] {
    return this.matterAccessory.getState;
  }

  set getState(value: MatterAccessory['getState']) {
    this.matterAccessory.getState = value;
  }

  get parts(): MatterAccessory['parts'] {
    return this.matterAccessory.parts;
  }

  set parts(value: MatterAccessory['parts']) {
    this.matterAccessory.parts = value;
  }

  private validate(): void {
    this.validateString(
      'displayName',
      this.matterAccessory.displayName,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.validateString(
      'serialNumber',
      this.matterAccessory.serialNumber,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.validateString(
      'manufacturer',
      this.matterAccessory.manufacturer,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    this.validateString(
      'model',
      this.matterAccessory.model,
      MatterPlatformAccessory.MAXIMUM_BASIC_INFORMATION_LENGTH,
    );

    if (this.matterAccessory.firmwareRevision !== undefined) {
      this.validateString(
        'firmwareRevision',
        this.matterAccessory.firmwareRevision,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }

    if (this.matterAccessory.hardwareRevision !== undefined) {
      this.validateString(
        'hardwareRevision',
        this.matterAccessory.hardwareRevision,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }

    if (this.matterAccessory.softwareVersion !== undefined) {
      this.validateString(
        'softwareVersion',
        this.matterAccessory.softwareVersion,
        MatterPlatformAccessory.MAXIMUM_VERSION_LENGTH,
      );
    }
  }

  private validateString(
    property: string,
    value: string,
    maximumLength: number,
  ): void {
    if (value.length > maximumLength) {
      throw new RangeError(
        `${property} cannot exceed ${maximumLength} characters`,
      );
    }
  }
}
