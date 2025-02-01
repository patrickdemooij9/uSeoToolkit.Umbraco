import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MetaFieldsSettingsSource } from "./MetaFieldsSettingsSource";
import { DocumentTypeSettingsPostViewModel } from "../api";

export class MetaFieldsSettingsRepository extends UmbControllerBase {
  #source: MetaFieldsSettingsSource;

  constructor(host: UmbControllerHost) {
    super(host);

    this.#source = new MetaFieldsSettingsSource(host);
  }

  async get(contentTypeGuid: string) {
    return this.#source.get(contentTypeGuid);
  }

  async getAdditionalFields() {
    return this.#source.getAdditionalFields();
  }

  async save(model: DocumentTypeSettingsPostViewModel) {
    return this.#source.save(model);
  }
}
