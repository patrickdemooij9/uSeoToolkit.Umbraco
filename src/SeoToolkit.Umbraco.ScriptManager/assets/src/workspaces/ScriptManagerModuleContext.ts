import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { SEOTOOLKIT_SCRIPTMANAGER_ENTITY } from "../Constants";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbDefaultCollectionContext } from "@umbraco-cms/backoffice/collection";
import { UMB_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/workspace";

export default class ScriptManagerModuleContext extends UmbDefaultCollectionContext<any, any> {
    workspaceAlias = 'seoToolkit.collections.scripts'

    constructor(host: UmbControllerBase) {
        super(host, UMB_WORKSPACE_CONTEXT.toString());

        this.provideContext(ST_SCRIPTMANAGER_MODULE_TOKEN_CONTEXT, this);
    }

    getEntityType(): string {
        return SEOTOOLKIT_SCRIPTMANAGER_ENTITY;
    }
}

export const ST_SCRIPTMANAGER_MODULE_TOKEN_CONTEXT = new UmbContextToken<ScriptManagerModuleContext>(
	'scriptManagerModuleContext',
);