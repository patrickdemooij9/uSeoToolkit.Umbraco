import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { DocumentTypeValuePostViewModel, MetaFieldsSettingsViewModel } from "../api";
import { UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { MetaFieldsContentRepository } from "../dataAccess/MetaFieldsContentRepository";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";

export default class MetaFieldsContentContext extends UmbContextBase<DocumentTypeValuePostViewModel> implements UmbWorkspaceContext{
    workspaceAlias: string = "Umb.Workspace.Document";

    #repository: MetaFieldsContentRepository;

    #model = new UmbObjectState<MetaFieldsSettingsViewModel>({});
    public readonly model = this.#model.asObservable();

    constructor(host: UmbControllerHost){
        super(host, ST_METAFIELDS_CONTENT_TOKEN_CONTEXT.toString());

        this.#repository = new MetaFieldsContentRepository(host);

        this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (instance) => {
            instance.unique.subscribe((unique) => {
                this.#repository.get(unique!).then((resp) => {
                    this.#model.update(resp.data!);
                })
            })
        })
    }

    getEntityType(): string {
        return "st-metafield";
    }
}

export const ST_METAFIELDS_CONTENT_TOKEN_CONTEXT =
  new UmbContextToken<MetaFieldsContentContext>(
    "ST-MetaFieldsContent-Context"
  );
