import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_WORKSPACE_CONTEXT, UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";

export default class MetaFieldsDocumentContext extends UmbControllerBase implements UmbWorkspaceContext {
    workspaceAlias: string = "Umb.Workspace.DocumentType";

    constructor(host: UmbControllerHost){
        super(host);

        this.provideContext(ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT, this);
        this.provideContext(UMB_WORKSPACE_CONTEXT, this);
    }

    getEntityType(): string {
        return "st-metafield";
    }
}

export const ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT = new UmbContextToken<MetaFieldsDocumentContext>(
    'ST-MetaFieldsDocument-Context',
);