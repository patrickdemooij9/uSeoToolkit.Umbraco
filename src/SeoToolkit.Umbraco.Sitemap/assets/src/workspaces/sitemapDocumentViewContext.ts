import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { SitemapPageTypeSettingsPostModel } from "../api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import PageSettingsRepository from "../repositories/pageSettingsRepository";
import { UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document-type";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";

export default class SitemapDocumentViewContext extends UmbContextBase<SitemapPageTypeSettingsPostModel> implements UmbWorkspaceContext {
    workspaceAlias: string = "Umb.Workspace.DocumentType";

    #repository: PageSettingsRepository;

    #model = new UmbObjectState<SitemapPageTypeSettingsPostModel>({
        contentTypeGuid: '',
        hideFromSitemap: false
    });
    public readonly model = this.#model.asObservable();

    constructor(host: UmbControllerHost) {
        super(host, ST_SITEMAP_DOCUMENT_TOKEN_CONTEXT.toString());

        this.#repository = new PageSettingsRepository(this);

        this.consumeContext(UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT, (instance) => {
            instance.unique.subscribe((unique) => {
                this.#repository.getPageSettings(unique!).then((pageSettings) => {
                    this.#model.update({
                        contentTypeGuid: unique,
                        hideFromSitemap: pageSettings.data?.hideFromSitemap,
                        changeFrequency: pageSettings.data?.changeFrequency,
                        priority: pageSettings.data?.priority
                    });
                })
            });
        });
    }

    update(model: Partial<SitemapPageTypeSettingsPostModel>) {
        this.#model.update(model);
    }

    public save() {
        this.#repository.setPageSettings(this.#model.getValue());
    }

    getEntityType(): string {
        return "st-sitemap"
    }
}

export const ST_SITEMAP_DOCUMENT_TOKEN_CONTEXT = new UmbContextToken<SitemapDocumentViewContext>(
    'ST-SitemapDocument-Context',
);