import { UmbDefaultCollectionContext } from "@umbraco-cms/backoffice/collection";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UMB_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/workspace";
import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { Redirect } from "../models/Redirect";
import { SEOTOOLKIT_REDIRECT_ENTITY } from "../Constants";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import RedirectRepository from "../dataLayer/RedirectRepository";
import { RedirectModalData } from "../models/RedirectModalData";

export default class RedirectModuleContext extends UmbDefaultCollectionContext<Redirect, any> {
    workspaceAlias = 'seoToolkit.collections.redirects';

    constructor(host: UmbControllerBase) {
        super(host, UMB_WORKSPACE_CONTEXT.toString());

        this.provideContext(ST_REDIRECT_MODULE_TOKEN_CONTEXT, this);
    }

    openCreateModal() {
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, async (instance) => {
            const modal = instance.open(this._host, 'seoToolkit.modal.redirect.create', {
                modal: { type: 'sidebar', size: 'medium' },
                data: {
                    redirect: {
                        domain: '',
                        isEnabled: true
                    }
                }
            });

            await modal.onSubmit();

            const data = (modal.getValue() as RedirectModalData).redirect;
            
            await new RedirectRepository(this).save({
                id: 0,
                domain: data.domain,
                customDomain: '',
                isEnabled: data.isEnabled,
                isRegex: data.isRegex,
                oldUrl: data.oldUrl,
                newUrl: data.newUrl,
                newNodeId: data.newNodeId,
                newCultureId: data.newCultureIso,
                redirectCode: 301
            });

            this.requestCollection();
        })
    }

    getEntityType(): string {
        return SEOTOOLKIT_REDIRECT_ENTITY;
    }
}

export const ST_REDIRECT_MODULE_TOKEN_CONTEXT = new UmbContextToken<RedirectModuleContext>(
    'redirectsModuleContext',
);