import { customElement, property, css, html, LitElement, nothing } from "@umbraco-cms/backoffice/external/lit";

@customElement("st-redirect-name-column-layout")
export class RedirectNameLayout extends LitElement {
    @property({ attribute: false })
	value?: { unique: string; name: string };

	override render() {
		if (!this.value) return nothing;

		return html`<a href=${'/umbraco/section/SeoToolkit/workspace/st-script/edit/' + this.value.unique}>${this.value.name}</a>`;
	}

	static override styles = [
		css`
			:host {
				white-space: nowrap;
			}

            a {
                color: var(--uui-color-interactive);
            }

            a:hover{
                color: var(--uui-color-interactive-emphasis);
            }
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'st-redirect-name-column-layout': RedirectNameLayout;
	}
}