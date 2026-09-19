import { clusterNames, MatterAPI } from 'homebridge';

export class ClustersUtils {
  protected api: MatterAPI;

  private clusterNames: typeof clusterNames;

  constructor(
    matterAPI: MatterAPI,
  ) {
    this.api = matterAPI;
    this.clusterNames = this.api.clusterNames;
  }

  async getClusterValue(
    uuid: string,
    cluster: string,
    partId?: string,
  ): Promise<Record<string, unknown> | undefined> {
    return await this.api.getAccessoryState(uuid, cluster, partId);
  }

  async setClusterValue(
    uuid: string,
    cluster: string,
    attributes: Record<string, unknown>,
    partId?: string,
  ): Promise<Record<string, unknown> | undefined> {
    await this.api.updateAccessoryState(uuid, cluster, attributes, partId);
    const axxessoryState: Record<string, unknown> | undefined = await this.api.getAccessoryState(uuid, cluster, partId);
    return axxessoryState;
  }

  // ************************************************************************************************************************

  //
  // ****************************** Cluster methods ******************************
  //

  // On

  async getOn(
    uuid: string,
  ): Promise<boolean> {
    const clusterValue: Record<string, unknown> = (
      await this.getClusterValue(uuid, this.clusterNames.OnOff)
    ) as Record<string, unknown>;

    const attributeValue: boolean = clusterValue.onOff as boolean;

    return attributeValue;
  }

  async updateOn(
    uuid: string,
    value: boolean,
  ): Promise<boolean> {
    const clusterValue: Record<string, unknown> = (
      await this.setClusterValue(uuid, this.clusterNames.OnOff, { onOff: value })
    ) as Record<string, unknown>;

    const attributeValue: boolean = clusterValue.onOff as boolean;

    return attributeValue;
  }
}