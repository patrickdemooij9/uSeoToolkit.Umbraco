import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { html, LitElement } from "lit";

export class MetaFielsPreviewer extends UmbElementMixin(LitElement) {
    protected render() {
        return html`
        <h1>Hello world</h1>
        `
    }
}