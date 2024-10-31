import { customElement, html, state, when } from "@umbraco-cms/backoffice/external/lit";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { RedirectModalData } from "../models/RedirectModalData";
import { Redirect } from "../models/Redirect";
import { UmbPropertyDatasetElement, UmbPropertyValueData } from "@umbraco-cms/backoffice/property";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { UmbPropertyTypeAppearanceModel } from "@umbraco-cms/backoffice/content-type";
import { UUIInputEvent, UUISelectEvent } from "@umbraco-cms/backoffice/external/uui";
import { RedirectLinkType } from "../types/RedirectLinkType";
import { RedirectSelectLinkData } from "../models/RedirectSelectLinkData";

@customElement("st-create-redirect-modal")
export default class CreateRedirectModal extends UmbModalBaseElement<RedirectModalData, RedirectModalData> {

    #options: Array<Option> = [];
    #oldUrl?: string;
    #newUrlData?: RedirectSelectLinkData;

    @state()
    redirect?: UmbObjectState<Redirect>

    @state()
    _content: UmbPropertyValueData[] = [];

    propertyAppearance: UmbPropertyTypeAppearanceModel = {
        labelOnTop: true
    };

    override connectedCallback(): void {
        super.connectedCallback();

        this.redirect = new UmbObjectState(this.data!.redirect);
        this.observe(this.redirect.asObservable(), (value) => {
            this._content = [
                {
                    alias: 'domain',
                    value: value.domain
                },
                {
                    alias: 'isEnabled',
                    value: value.isEnabled
                },
                {
                    alias: 'toUrl',
                    value: value.newUrl
                },
                {
                    alias: 'statusCode',
                    value: value.statusCode
                }
            ];
            this.#options = [
                {
                    name: 'URL',
                    value: 'url',
                    selected: !value.isRegex
                },
                {
                    name: 'Regex',
                    value: 'regex',
                    selected: value.isRegex
                }
            ];
            this.#oldUrl = value.oldUrl ?? '';

            if (value.newUrl || value.newNodeId) {
                let linkType = undefined;
                if (value.newUrl) {
                    linkType = RedirectLinkType.Url;
                }
                if (value.newNodeId) {
                    if (value.newCultureId) {
                        linkType = RedirectLinkType.Content;
                    } else {
                        linkType = RedirectLinkType.Media;
                    }
                }
                this.#newUrlData = {
                    linkType: linkType,
                    culture: value.newCultureId ?? undefined,
                    value: linkType === RedirectLinkType.Url ? value.newUrl! : value.newNodeId!.toString()
                };
            }
        });
    }

    #onPropertyDataChange(e: Event) {
        const value = (e.target as UmbPropertyDatasetElement).value;

        const newValue = value.find((item) => item.alias === 'robotsTxt')?.value as string;
        if (newValue) {
            //this.#context?.setContent(newValue);
        }
    }

    #onRegexOptionChange(e: UUISelectEvent) {
        this.redirect!.update({
            isRegex: e.target.value === 'regex'
        });
    }

    #onOldUrlChange(e: UUIInputEvent) {
        this.redirect!.update({
            oldUrl: e.target.value.toString()
        })
    }

    #onSetLinkClick() {
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, async (instance) => {
            const modal = instance.open(this, 'seoToolkit.modal.redirect.link', {
                modal: { type: 'sidebar', size: 'medium' },
                data: {
                    linkType: RedirectLinkType.Url,
                    culture: '',
                    value: '',
                }
            });
            await modal.onSubmit();
            const value = modal.getValue() as RedirectSelectLinkData;
            this.redirect?.update({
                newUrl: value.linkType === RedirectLinkType.Url ? value.value : undefined,
                newCultureId: value.culture,
                newNodeId: value.linkType !== RedirectLinkType.Url ? Number.parseInt(value.value) : undefined
            });
        })
    }

    #handleClose() {
        this.modalContext?.reject();
    }

    #handleSubmit() {
        this.modalContext?.submit();
    }

    render() {
        return html`
            <umb-body-layout headline="Create redirect">
                <uui-box>
                    <umb-property-dataset
                        .value=${this._content!}
                        @change=${this.#onPropertyDataChange}>
                        <umb-property 
                            alias='domain'
                            label='Domain'
                            description='Choose the domain set within Umbraco or use a custom domain'
                            property-editor-ui-alias='Umb.PropertyEditorUi.Dropdown'
                            val
                            required
                            .appearance=${this.propertyAppearance}
                            .config=${[{
                alias: 'items',
                value: ['All Sites', 'test2']
            }]}>
                        </umb-property>
                        <umb-property 
                            alias='isEnabled'
                            label='Enabled'
                            description='Uncheck this box to stop the redirect from functioning'
                            property-editor-ui-alias='Umb.PropertyEditorUi.Toggle'
                            val
                            .appearance=${this.propertyAppearance}>
                        </umb-property>
                        <umb-property-layout 
                            label="From url"
                            description="Relative url of where the redirect starts"
                            orientation="vertical">
                            <div slot="editor">
                                <uui-input
                                    .value=${this.#oldUrl}
                                    @change=${this.#onOldUrlChange}>
                                </uui-input>
                                <uui-select
                                    .options=${this.#options}
						            @change=${this.#onRegexOptionChange}>
                                </uui-select>
                            </div>
                        </umb-property-layout>
                        <umb-property-layout
                            label="New Url"
                            description="The url where the redirect is going to"
                            orientation="vertical">
                            <div slot="editor">
                                <uui-button  look="placeholder" @click=${this.#onSetLinkClick}>
                                    <span>Set link</span>
                                </uui-button>
                                ${when(this.#newUrlData?.linkType === RedirectLinkType.Url, () => html`
                                    <p>This is an url</p>
                                `)}
                            </div>
                        </umb-property-layout>
                        <umb-property
                            alias='statusCode'
                            label='Status code'
                            description='Status code of the redirect'
                            property-editor-ui-alias='Umb.PropertyEditorUi.RadioButtonList'
                            val
                            .appearance=${this.propertyAppearance}
                            .config=${[{
                alias: 'items',
                value: ['Permanent (301)', 'Temporary (302)']
            }]}>
                        </umb-property>
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