import { UmbEntityBulkActionBase } from "@umbraco-cms/backoffice/entity-bulk-action";
import SiteAuditRepository from "../dataAccess/SiteAuditRepository";

export default class SiteAuditDeleteAction extends UmbEntityBulkActionBase<object>{
    async execute() {
        const repository = new SiteAuditRepository(this._host);
        await repository.delete(this.selection.map((item => Number.parseInt(item))));

        //const context = await this.getContext(ST_SCRIPTMANAGER_MODULE_TOKEN_CONTEXT);
        //context.requestCollection();
    }
}