import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { GetUmbracoSeoToolkitRedirectsRedirectsResponse, SaveRedirectPostModel, SeoToolkitRedirectsService } from "../api";
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
    };

    async get(id: number){
        return await tryExecuteAndNotify(this.#host, SeoToolkitRedirectsService.getUmbracoSeoToolkitRedirectsRedirect({
            id: id
        }));
    }

    async save(redirect: SaveRedirectPostModel){
        await tryExecuteAndNotify(this.#host, SeoToolkitRedirectsService.postUmbracoSeoToolkitRedirectsRedirect({
            requestBody: redirect
        }));
    };

    async delete(ids: number[]){
        await tryExecuteAndNotify(this.#host, SeoToolkitRedirectsService.deleteUmbracoSeoToolkitRedirectsRedirect({
            requestBody: {
                ids: ids
            }
        }))
    }

    async getDomains(){
        return await tryExecuteAndNotify(this.#host, SeoToolkitRedirectsService.getUmbracoSeoToolkitRedirectsDomains());
    }
}