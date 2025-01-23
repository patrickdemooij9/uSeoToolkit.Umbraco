import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import {
  customElement,
  property,
  state,
  when,
} from "@umbraco-cms/backoffice/external/lit";
import { html, LitElement } from "lit";
import { SeoFieldViewModel } from "../api";
import {
  ManifestPropertyEditorUi,
  umbExtensionsRegistry,
} from "@umbraco-cms/backoffice/extension-registry";
import { createExtensionElement } from "@umbraco-cms/backoffice/extension-api";

@customElement("st-metafield-settingsfield")
export class MetaFieldsSettingsField extends UmbElementMixin(LitElement) {
  @property({ type: Object })
  public set field(value: SeoFieldViewModel | undefined) {
    this._field = value;
    this.observePropertyView();
  }
  public get field() {
    return this._field;
  }
  private _field?: SeoFieldViewModel;

  @property({ type: Boolean })
  public hasGlobalInheritance: boolean = false;

  @state()
  private _element?: ManifestPropertyEditorUi["ELEMENT_TYPE"];

  private observePropertyView() {
    this.observe(
      umbExtensionsRegistry.byTypeAndAlias(
        "propertyEditorUi",
        this.field!.editor!.view!
      ),
      (manifest) => {
        this._gotEditorUI(manifest);
      },
      "_observePropertyEditorUI"
    );
  }

  private async _gotEditorUI(
    manifest?: ManifestPropertyEditorUi | null
  ): Promise<void> {
    if (!manifest) {
      return;
    }

    const el = await createExtensionElement(manifest);
    if (el) {
      this._element = el;

      this._element.value = this.field?.value;
    }
  }

  private toggleInheritance() {
    const event = new Event("toggle-inheritance", { bubbles: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <umb-property-layout
        .label=${this.field!.title!}
        .description=${this.field!.description!}
      >
        <div slot="editor">
          ${when(
            this.field!.useInheritedValue,
            () => html` <uui-tag>
                <span
                  >This field uses the value of the inherited component.</span
                >
              </uui-tag>
              <uui-button look="placeholder" @click=${this.toggleInheritance}
                >Override</uui-button
              >`,
            () => html`
              ${this._element}
              ${when(
                this.hasGlobalInheritance,
                () => html`
                  <uui-button
                    look="placeholder"
                    @click=${this.toggleInheritance}
                    >Set to inherited</uui-button
                  >
                `
              )}
            `
          )}
        </div>
      </umb-property-layout>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-metafield-settingsfield": MetaFieldsSettingsField;
  }
}
