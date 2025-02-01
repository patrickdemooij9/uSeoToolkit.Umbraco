import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement } from "@umbraco-cms/backoffice/external/lit";
import { html, LitElement } from "lit";
import { ST_METAFIELDS_CONTENT_TOKEN_CONTEXT } from "./MetaFieldsContentContext";

@customElement("st-metafield-content-view")
export default class MetaFieldsContentView extends UmbElementMixin(LitElement){

    constructor(){
        super();

        this.consumeContext(ST_METAFIELDS_CONTENT_TOKEN_CONTEXT, (instance) => {
            instance.model.subscribe((value) => {
                console.log(value);
            })
        })
    }

    override render() {
        return html`
        <h1>Hello world</h1>
        `
    }
}