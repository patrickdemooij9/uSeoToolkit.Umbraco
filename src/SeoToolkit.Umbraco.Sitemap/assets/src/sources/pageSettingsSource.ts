import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { SeoToolkitSitemapService, SitemapPageTypeSettingsPostModel } from "../api";

export class PageSettingsSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getPageSettings(contentTypeGuid: string) {
        return await tryExecuteAndNotify(this.#host, SeoToolkitSitemapService.getUmbracoSeoToolkitSitemapSitemapSettings({
            contentTypeGuid: contentTypeGuid
        }));
    };

    async setPageSettings(settings: SitemapPageTypeSettingsPostModel){
        await tryExecuteAndNotify(this.#host, SeoToolkitSitemapService.postUmbracoSeoToolkitSitemapSitemapSettings({
            requestBody: settings
        }));
    };
}