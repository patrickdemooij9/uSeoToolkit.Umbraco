import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api"
import { customElement } from "@umbraco-cms/backoffice/external/lit"
import { html, LitElement } from "lit"

@customElement("st-test-element")
export default class TestDocumentViewElement extends UmbElementMixin(LitElement){
    render(){
        return html`
            <h1>Hello world again</h1>
        `
    }
}