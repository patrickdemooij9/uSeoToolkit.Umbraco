import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import {
  customElement,
  property,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { html, LitElement } from "lit";
import {
  UmbPropertyEditorConfigCollection,
  UmbPropertyValueChangeEvent,
} from "@umbraco-cms/backoffice/property-editor";

interface CheckboxItem {
  label: string;
  value: string | undefined;
  checked: boolean;
}

type UmbInputCheckboxListElement = {
  selection: string[];
};

@customElement("st-selectheckbox-propertyeditor")
export default class SelectCheckboxList
  extends UmbElementMixin(LitElement)
  implements UmbPropertyEditorUiElement
{
  @property({ type: Array })
  public value: string[];

  @state()
  public list: CheckboxItem[] = [];

  constructor() {
    super();

    this.value = [];
  }

  public set config(config: UmbPropertyEditorConfigCollection | undefined) {
    if (!config) {
      return;
    }

    const items = config.getValueByAlias<CheckboxItem[]>("items");
    if (!items) {
      return;
    }

    this.list = [...items];

    if (config.getValueByAlias<boolean>("includeNone")) {
      this.list.push({
        label: "None",
        value: undefined,
        checked: false,
      });
    }
  }

  getList() {
    if (!this.list) {
      return [];
    }
    return this.list.map((item) => ({
      ...item,
      checked: this.value?.includes(item.value!),
    }));
  }

  #onChange(event: CustomEvent & { target: UmbInputCheckboxListElement }) {
    this.value = event.target.selection;
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
  }

  override render() {
    return html`
      <umb-input-checkbox-list
        .list=${this.getList()}
        .selection=${this.value ?? []}
        @change=${this.#onChange}
      ></umb-input-checkbox-list>
    `;
  }
}
