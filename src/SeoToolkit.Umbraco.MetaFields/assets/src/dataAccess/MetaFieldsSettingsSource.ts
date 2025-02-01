import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import {
  DocumentTypeSettingsPostViewModel,
  SeoToolkitMetaFieldsService,
} from "../api";

export class MetaFieldsSettingsSource {
  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async get(contentTypeGuid: string) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitMetaFieldsService.getUmbracoSeoToolkitMetaFieldsSettingsMetaFieldsSettings(
        {
          nodeId: contentTypeGuid,
        }
      )
    );
  }

  async getAdditionalFields() {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitMetaFieldsService.getUmbracoSeoToolkitMetaFieldsSettingsMetaFieldsAdditionalFields()
    );
  }

  async save(model: DocumentTypeSettingsPostViewModel) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitMetaFieldsService.postUmbracoSeoToolkitMetaFieldsSettingsMetaFieldsSettings(
        {
          requestBody: model,
        }
      )
    );
  }
}
