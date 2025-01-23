import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import {
  customElement,
  property,
  repeat,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { css, html, LitElement } from "lit";
import { MetaFieldsSettingsRepository } from "../dataAccess/MetaFieldsSettingsRepository";
import { UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document-type";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { ItemGroupPickerConfig } from "../popups/ItemGroupPicker.element";
import { UmbSorterController } from "@umbraco-cms/backoffice/sorter";

interface FieldData {
  name: string;
  value: string;
  onlyShowIfInherited: boolean;
  source: number;
  group: string;
}

@customElement("st-fieldseditor-propertyeditor")
export default class FieldsEditorPropertyEditor
  extends UmbElementMixin(LitElement)
  implements UmbPropertyEditorUiElement
{
  #repository: MetaFieldsSettingsRepository;
  #sorter: UmbSorterController<string>;

  @property({ type: Array })
  public value: string[] = [];

  @state()
  additionalFields: FieldData[] = [];

  @state()
  contentTypeFields: FieldData[] = [];

  constructor() {
    super();

    this.#sorter = new UmbSorterController<string>(this, {
      itemSelector: ".field-item",
      containerSelector: ".field-container",
      getUniqueOfElement: (element) => element.dataset.sortId,
      getUniqueOfModel: (model) => model,
      onChange: (model) => {
        this.value = model.model;
      },
    });

    this.#sorter.setModel(this.value);

    this.#repository = new MetaFieldsSettingsRepository(this);

    this.consumeContext(UMB_DOCUMENT_TYPE_WORKSPACE_CONTEXT, (instance) => {
      instance.structure.contentTypes.subscribe((value) => {
        const contentTypeFields: FieldData[] = [];

        value.forEach((field) => {
          field.properties.forEach((prop) => {
            contentTypeFields.push({
              name: prop.name,
              value: prop.alias,
              source: 1,
              group:
                field.containers.find((con) => con.id === prop.container!.id)
                  ?.name ?? "",
              onlyShowIfInherited: false,
            });
          });
        });
        this.contentTypeFields = contentTypeFields;
      });
    });

    this.#repository.getAdditionalFields().then((resp) => {
      this.additionalFields = resp.data!.map<FieldData>((item) => ({
        name: item.name!,
        value: item.value!,
        onlyShowIfInherited: item.onlyShowIfInherited,
        source: 2,
        group: "SEO Toolkit",
      }));
    });
  }

  getFields() {
    return [...this.additionalFields, ...this.contentTypeFields];
  }

  onItemsAddHandler() {
    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, async (instance) => {
      console.log(this.getFields());
      const modal = instance.open<ItemGroupPickerConfig, string[]>(
        this,
        "seoToolkit.modal.itemGroupPicker",
        {
          modal: { type: "sidebar", size: "medium" },
          data: {
            items: this.getFields(),
          },
          value: this.value ?? [],
        }
      );
      await modal.onSubmit();
      this.value = modal.getValue();
      this.#sorter.setModel(this.value);
    });
  }

  render() {
    return html`
      <div class="field-container">
        ${repeat(
          this.value ?? [],
          (item) => item,
          (item) =>
            html` <div data-sort-id=${item} class="field-item">${item}</div> `
        )}
      </div>
      <div>
        <uui-button
          class="add-button"
          look="placeholder"
          @click="${this.onItemsAddHandler}"
        >
          Add fields
        </uui-button>
      </div>
      <small class="control-description">
        Fields to determine the meta field will be checked from top to bottom.
      </small>
    `;
  }

  static styles = [
    css`
      .add-button {
        width: 100%;
      }
      .field-item {
        border: 1px solid gray;
        border-radius: 4px;
        margin-bottom: 4px;
        padding: 8px 6px;
        text-align: center;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "st-fieldseditor-propertyeditor": FieldsEditorPropertyEditor;
  }
}
