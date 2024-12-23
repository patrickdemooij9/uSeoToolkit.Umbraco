import { tryExecuteAndNotify } from "@umbraco-cms/backoffice/resources";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { CreateAuditPostModel, SeoToolkitSiteAuditService } from "../api";

export class SiteAuditSource {
  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async getSiteAudits() {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitSiteAuditService.getUmbracoSeoToolkitSiteAuditSiteAudits()
    );
  }

  async get(id: number) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitSiteAuditService.getUmbracoSeoToolkitSiteAuditSiteAudit({
        id: id,
      })
    );
  }

  async save(model: CreateAuditPostModel) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitSiteAuditService.postUmbracoSeoToolkitSiteAuditSiteAudit({
        requestBody: model,
      })
    );
  }

  async delete(ids: number[]) {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitSiteAuditService.deleteUmbracoSeoToolkitSiteAuditSiteAudit({
        requestBody: {
          ids: ids,
        },
      })
    );
  }

  async getConfiguration() {
    return await tryExecuteAndNotify(
      this.#host,
      SeoToolkitSiteAuditService.getUmbracoSeoToolkitSiteAuditSiteAuditConfiguration()
    );
  }
}
