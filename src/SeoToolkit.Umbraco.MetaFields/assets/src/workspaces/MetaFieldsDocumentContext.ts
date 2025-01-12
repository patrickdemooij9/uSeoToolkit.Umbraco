import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { UmbWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import {
  DocumentTypeSettingsContentViewModel,
  DocumentTypeSettingsPostViewModel,
} from "../api";
import { MetaFieldsSettingsRepository } from "../dataAccess/MetaFieldsSettingsRepository";
import { UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document-type";

export default class MetaFieldsDocumentContext
  extends UmbContextBase<DocumentTypeSettingsPostViewModel>
  implements UmbWorkspaceContext
{
  workspaceAlias: string = "Umb.Workspace.DocumentType";

  #repository: MetaFieldsSettingsRepository;

  #model = new UmbObjectState<DocumentTypeSettingsContentViewModel>({});
  public readonly model = this.#model.asObservable();

  constructor(host: UmbControllerHost) {
    super(host, ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT.toString());

    this.#repository = new MetaFieldsSettingsRepository(host);

    this.consumeContext(UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT, (instance) => {
      instance.unique.subscribe((unique) => {
        this.fetchFromServer(unique!);
      });
      this.fetchFromServer("");
    });
  }

  fetchFromServer(unique: string) {
    this.#repository.get(unique!).then((metaFieldSettings) => {
      this.#model.update({
        fields: metaFieldSettings.data?.contentModel?.fields,
        inheritance: metaFieldSettings.data?.contentModel?.inheritance,
      });
    });
  }

  update(model: Partial<DocumentTypeSettingsContentViewModel>) {
    this.#model.update(model);
  }

  getEntityType(): string {
    return "st-metafield";
  }
}

export const ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT =
  new UmbContextToken<MetaFieldsDocumentContext>(
    "ST-MetaFieldsDocument-Context"
  );
