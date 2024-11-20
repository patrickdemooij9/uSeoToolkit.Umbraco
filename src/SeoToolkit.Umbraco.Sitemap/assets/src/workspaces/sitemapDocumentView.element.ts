import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement } from "@umbraco-cms/backoffice/external/lit";
import { html, LitElement } from "lit";

@customElement("st-sitemap-document-view")
export default class SitemapDocumentViewElement extends UmbElementMixin(LitElement) {
    render(){
        return html`
            <h1>Sitemap here</h1>
        `
    }
}