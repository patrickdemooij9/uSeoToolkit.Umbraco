import { UmbCollectionFilterModel, UmbCollectionRepository } from "@umbraco-cms/backoffice/collection";
import { UmbPagedModel, UmbRepositoryBase, UmbRepositoryResponse } from "@umbraco-cms/backoffice/repository";
import { RedirectSource } from "./RedirectSource";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { Redirect } from "../models/Redirect";

export default class RedirectRepository extends UmbRepositoryBase implements UmbCollectionRepository
{
    #source: RedirectSource;

    constructor(host: UmbControllerHost) {
        super(host);
        
        this.#source = new RedirectSource(host);
    }

    async requestCollection(filter?: UmbCollectionFilterModel | undefined): Promise<UmbRepositoryResponse<UmbPagedModel<Redirect>>> {
        const pageNumber = !filter ? 1 : (filter.skip! / filter.take!) + 1;
        const data = await this.#source.getRedirects(pageNumber, filter?.take ?? 10); 
        const result: UmbRepositoryResponse<UmbPagedModel<Redirect>> = {
            data: {
                total: data.data!.total,
                items: data.data!.items.map((item) => ({
                    unique: item.id.toString(),
                    entityType: 'st-redirect',
                    statusCode: 200,
                    ...item
                }))
            }
        }
        return result;
    }
    
}