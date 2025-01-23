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

import "./../components/MetaFieldsSettingsField.element";
import { UmbInputDocumentElement } from "@umbraco-cms/backoffice/document";

@customElement("st-metafield-document-view")
export default class MetaFieldsDocumentView extends UmbElementMixin(
  LitElement
) {
  #context?: MetaFieldsDocumentContext;

  @state()
  _fields: SeoFieldViewModel[] = [];

  @state()
  _content?: UmbPropertyValueData[] = [];

  @state()
  _hasInheritance: boolean = false;

  constructor() {
    super();

    this.consumeContext(ST_METAFIELDS_DOCUMENT_TOKEN_CONTEXT, (instance) => {
      this.#context = instance;

      instance.model.subscribe((value) => {
        console.log(value);
        this._fields = value.fields ?? [];

        this._hasInheritance = !!value.inheritance && !!value.inheritance.id;
        console.log(this._hasInheritance);
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
    const value = (e.target as UmbInputDocumentElement).value;
    this.#context?.setInheritance(value);
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

  #onInheritanceToggle(field: SeoFieldViewModel){
    this.#context?.toggleInheritance(field.alias!);
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
						.documentTypesOnly=${true}>
          </umb-input-document-type>

			  </umb-property-layout>
          </umb-property>
          ${repeat(
            this._fields,
            (field) => field.alias,
            (field) => html`
              <st-metafield-settingsfield
                .field=${field}
                .hasGlobalInheritance=${this._hasInheritance}
                @toggle-inheritance=${() => this.#onInheritanceToggle(field)}
              ></st-metafield-settingsfield>
            `
          )}
        </umb-property-dataset>
      </uui-box>
    `;
  }
}
