import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { SeoToolkitMetaFieldsService } from "../api";

export class MetaFieldsContentSource {
  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async get(contentGuid: string) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitMetaFieldsService.getUmbracoSeoToolkitMetaFieldsMetaFields({
        nodeGuid: contentGuid,
      })
    );
  }
}
