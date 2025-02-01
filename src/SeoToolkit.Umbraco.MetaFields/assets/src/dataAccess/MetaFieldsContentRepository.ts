import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MetaFieldsContentSource } from "./MetaFieldsContentSource";

export class MetaFieldsContentRepository extends UmbControllerBase {
  #source: MetaFieldsContentSource;

  constructor(host: UmbControllerHost) {
    super(host);

    this.#source = new MetaFieldsContentSource(host);
  }

  async get(contentGuid: string) {
    return this.#source.get(contentGuid);
  }
}
