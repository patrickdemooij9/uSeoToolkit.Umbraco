import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import {
  customElement,
  repeat,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { html, LitElement } from "lit";
import MetaFieldsDocumentContext, {
  ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT,
} from "./MetaFieldsDocumentContext";
import {
  UmbPropertyDatasetElement,
  UmbPropertyValueData,
} from "@umbraco-cms/backoffice/property";
import { SeoFieldViewModel } from "../api";

@customElement("st-metafield-document-view")
export default class MetaFieldsDocumentView extends UmbElementMixin(
  LitElement
) {
  #context?: MetaFieldsDocumentContext;

  @state()
  _fields: SeoFieldViewModel[] = [];

  @state()
  _content?: UmbPropertyValueData[] = [];

  constructor() {
    super();

    this.consumeContext(ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT, (instance) => {
      this.#context = instance;

      instance.model.subscribe((value) => {
        this._fields = value.fields ?? [];
        this._content = [
          {
            alias: "inheritedBy",
            value: value.inheritance?.id,
          },
        ];
      });
    });
  }

  #onInheritanceSelect(e: Event) {
    console.log(e);
  }

  #onPropertyDataChange(e: Event) {
    const value = (e.target as UmbPropertyDatasetElement).value;

    const newValue = {} as any;
    value.forEach((item) => {
      const itemValue = item.value as any;
      switch (item.alias) {
        case "hideFromSitemap":
          newValue[item.alias] = itemValue;
          break;
      }
    });
    this.#context?.update(newValue);
  }

  render() {
    return html`
      <uui-box>
        <umb-property-dataset
          .value=${this._content!}
          @change=${this.#onPropertyDataChange}
        >
          <umb-property-layout
				label='Inheritance'
				description="Control from which type this should be inherited. It'll then use the values from that type.">
				<umb-input-document-type
						slot="editor"
						@change=${this.#onInheritanceSelect}
						.selection=${[]}
                        .max=${1}
						.documentTypesOnly=${true}></umb-input-document-type>
			</umb-property-layout>
          </umb-property>
          ${repeat(
            this._fields,
            (field) => field.alias,
            (field) => html`
              <!--<umb-property-layout
                .label=${field.title!}
                .description=${field.description!}
              >
                <div slot="editor">${JSON.stringify(field)}</div>
              </umb-property-layout>-->
              <umb-property
              .label=${field.title!}
                .description=${field.description!}
                .propertyEditorUiAlias=${field.editor!.view!}>

              </umb-property>
            `
          )}
        </umb-property-dataset>
      </uui-box>
    `;
  }
}
