import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbDefaultCollectionContext } from "@umbraco-cms/backoffice/collection";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/workspace";
import { SEOTOOLKIT_SITEAUDIT_ENTITY } from "../Constants";

export default class SiteAuditModuleContext extends UmbDefaultCollectionContext<any, any>{
    workspaceAlias = 'seoToolkit.collections.siteAudits'

    constructor(host: UmbControllerBase) {
        super(host, UMB_WORKSPACE_CONTEXT.toString());

        this.provideContext(ST_SITEAUDIT_MODULE_TOKEN_CONTEXT, this);
    }

    getEntityType(): string {
        return SEOTOOLKIT_SITEAUDIT_ENTITY;
    }
}

export const ST_SITEAUDIT_MODULE_TOKEN_CONTEXT = new UmbContextToken<SiteAuditModuleContext>(
	'siteAuditModuleContext',
);