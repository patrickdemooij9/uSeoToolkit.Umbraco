import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { GetUmbracoSeoToolkitRedirectsRedirectsResponse, SeoToolkitRedirectsService } from "../api";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

export class RedirectSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getRedirects(pageNumber: number, pageSize: number, orderBy?: string, orderDirection?: string, search?: string): Promise<UmbDataSourceResponse<GetUmbracoSeoToolkitRedirectsRedirectsResponse>>
    {
        return await tryExecuteAndNotify(this.#host, SeoToolkitRedirectsService.getUmbracoSeoToolkitRedirectsRedirects({
            pageNumber,
            pageSize,
            orderBy,
            orderDirection,
            search
        }));
    } 
}