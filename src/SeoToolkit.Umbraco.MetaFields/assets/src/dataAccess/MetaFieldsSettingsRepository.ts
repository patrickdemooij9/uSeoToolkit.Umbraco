import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MetaFieldsSettingsSource } from "./MetaFieldsSettingsSource";

export class MetaFieldsSettingsRepository extends UmbControllerBase {
  #source: MetaFieldsSettingsSource;

  constructor(host: UmbControllerHost) {
    super(host);

    this.#source = new MetaFieldsSettingsSource(host);
  }

  async get(contentTypeGuid: string) {
    return this.#source.get(contentTypeGuid);
  }
}
