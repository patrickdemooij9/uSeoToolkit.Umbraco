import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { RedirectSelectLinkData } from "../models/RedirectSelectLinkData";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { customElement, html, state, when } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyDatasetElement, UmbPropertyValueData } from "@umbraco-cms/backoffice/property";
import { UmbPropertyTypeAppearanceModel } from "@umbraco-cms/backoffice/content-type";
import { RedirectLinkType } from "../types/RedirectLinkType";

@customElement("st-create-redirect-link-modal")
export default class CreateRedirectLinkModal extends UmbModalBaseElement<RedirectSelectLinkData, RedirectSelectLinkData> {
    
    model?: UmbObjectState<RedirectSelectLinkData>;

    @state()
    linkType: RedirectLinkType = RedirectLinkType.Url;

    @state()
    _content: UmbPropertyValueData[] = [];

    propertyAppearance: UmbPropertyTypeAppearanceModel = {
        labelOnTop: true
    };

    override connectedCallback(): void {
        super.connectedCallback();

        this.model = new UmbObjectState(this.data!);
        this.observe(this.model.asObservable(), (value) => {
            this._content = [
                {
                    alias: 'linkType',
                    value: value.linkType
                },
                {
                    alias: 'url',
                    value: value.value
                }
            ];
            this.linkType = value.linkType ?? RedirectLinkType.Url;
        })
    }

    #onPropertyDataChange(e: Event) {
        const value = (e.target as UmbPropertyDatasetElement).value;

        const newValue = {} as any;
        const modelKeys = Object.keys(this.model!.getValue());
        console.log(value);
        value.forEach((item) => {
            if (modelKeys.includes(item.alias)){
                newValue[item.alias] = item.value
            }
            if (item.alias === 'url'){
                newValue['value'] = item.value;
            }
        });
        this.model?.update(newValue);
    }

    #handleClose() {
        this.modalContext?.reject();
    }

    #handleSubmit() {
        this.value = this.model!.getValue();
        this.modalContext?.submit();
    }

    render() {
        return html`
            <umb-body-layout headline="Set link">
                <uui-box>
                    <umb-property-dataset
                        .value=${this._content!}
                        @change=${this.#onPropertyDataChange}>
                        <umb-property 
                            alias='linkType'
                            label='Link type'
                            description='Choose the type of link that you want to redirect to'
                            property-editor-ui-alias='Umb.PropertyEditorUi.RadioButtonList'
                            val
                            required
                            .appearance=${this.propertyAppearance}
                            .config=${[{
                                alias: 'items',
                                value: ['Url', 'Content', 'Media']
                            }]}>
                        </umb-property>
                        ${when(this.linkType === RedirectLinkType.Url, () => html`
                            <umb-property 
                                alias='url'
                                label='Url'
                                description='Choose the url that you want to redirect to'
                                property-editor-ui-alias='Umb.PropertyEditorUi.TextBox'
                                val
                                .appearance=${this.propertyAppearance}>
                            </umb-property>
                        `)}
                        ${when(this.linkType === RedirectLinkType.Content, () => html`
                            <umb-input-content
                                .selection=${[]}
                                type='content'
                                max=1></umb-input-content>
                        `)}
                        ${when(this.linkType === RedirectLinkType.Media, () => html`
                            <h1>Hello media</h1>    
                        `)}
                    </umb-property-dataset>
                </uui-box>

                <div class="actions">
                    <uui-button slot="actions" id="close" label="Close"
                        look='primary' color='danger'
                        @click="${this.#handleClose}">Close</uui-button>
                    <uui-button slot="actions" id="save" label="Submit"
                        look='primary' color='positive'
                        @click="${this.#handleSubmit}">Submit</uui-button>
                </div>
            </umb-body-layout>
        `
    }
}