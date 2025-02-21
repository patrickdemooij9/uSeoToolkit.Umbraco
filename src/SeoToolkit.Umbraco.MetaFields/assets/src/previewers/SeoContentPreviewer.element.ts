import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { umbExtensionsRegistry } from "@umbraco-cms/backoffice/extension-registry";
import {
  customElement,
  property,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { css, html, LitElement } from "lit";
import { SeoContentPreviewerManifest } from "../manifests/SeoContentPreviewerManifest";
import {
  createExtensionElement,
  UmbExtensionsManifestInitializer,
} from "@umbraco-cms/backoffice/extension-api";
import { ISeoContentPreviewer } from "./ISeoContentPreviewer";
import { SeoSettingsFieldViewModel } from "../api";

@customElement("st-contentpreviewer")
export default class SeoContentPreviewer extends UmbElementMixin(LitElement) {
  
  @property({ type: String })
  public set group(value: string | undefined) {
    this._group = value;
    this.observePropertyView();
  }
  public get group() {
    return this._group;
  }
  private _group?: string;

  @property({ type: Array })
  public set fields(value: SeoSettingsFieldViewModel[] | undefined) {
    this._fields = value ?? [];

    if (this._element) {
      this._element.value = value;
    }
  }
  private _fields: SeoSettingsFieldViewModel[] = [];

  @state()
  private _element?: ISeoContentPreviewer;

  private observePropertyView() {
    if (!this._group) {
      return;
    }

    new UmbExtensionsManifestInitializer(
      this,
      umbExtensionsRegistry,
      "seoContentPreviewer",
      null,
      (documents) => {
        documents.forEach((document) => {
          const manifest =
            document.manifest as unknown as SeoContentPreviewerManifest;

          if (!manifest || manifest.group !== this._group) {
            return;
          }
          this._gotPreviewer(manifest);
        });
      }
    );
  }

  private async _gotPreviewer(
    manifest?: SeoContentPreviewerManifest | null
  ): Promise<void> {
    if (!manifest) {
      return;
    }

    const el = await createExtensionElement(manifest);
    if (el) {
      this._element = el;
      this._element.value = this._fields;
    }
  }

  protected render() {
    return html`<div class="previewer">${this._element}</div>`;
  }

  static styles = [
    css`
      .previewer {
        position: sticky;
        top: 10px;
      }
    `
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    "st-contentpreviewer": SeoContentPreviewer;
  }
}
