import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { createExtensionElement, UmbExtensionsManifestInitializer } from "@umbraco-cms/backoffice/extension-api";
import { umbExtensionsRegistry } from "@umbraco-cms/backoffice/extension-registry";
import { customElement, repeat, state } from "@umbraco-cms/backoffice/external/lit";
import { css, html, LitElement, nothing } from "lit";
import { UmbRoute, UmbRouterSlotChangeEvent, UmbRouterSlotInitEvent } from "@umbraco-cms/backoffice/router";
import { SeoDocumentViewManifest } from "../manifests/seoDocumentViewManifest";

@customElement("st-document-view")
export default class SeoToolkitDocumentViewElement extends UmbElementMixin(LitElement) {

    @state()
	private _documentViews: Array<SeoDocumentViewManifest> = [];

	@state()
	private _routes?: UmbRoute[];

    @state()
	private _routerPath?: string;

	@state()
	private _activePath?: string;

    constructor(){
        super();

        new UmbExtensionsManifestInitializer(this, umbExtensionsRegistry, 'seoDocumentView', null, (documentViews) => {
			this._documentViews = documentViews.map((view) => view.manifest as unknown as SeoDocumentViewManifest);
            console.log(documentViews);
			this._createRoutes();
		});
    }

    private _createRoutes() {
		let newRoutes: UmbRoute[] = [];

		if (this._documentViews.length > 0) {
			newRoutes = this._documentViews.map((manifest) => {
				return {
					path: `view/${manifest.meta.pathname}`,
					component: () => createExtensionElement(manifest),
					setup: (component) => {
						if (component) {
							(component as any).manifest = manifest;
						}
					},
				} as UmbRoute;
			});

			newRoutes.push({ ...newRoutes[0], path: '' });
		}

		this._routes = newRoutes;
	}

    render(){
        return html`
            ${this.#renderViews()}

            ${this.#renderRoutes()}
        `
    }

    #renderViews() {
		return html`
			<uui-tab-group class="navigation">
                ${repeat(
                    this._documentViews,
                        (view) => view.alias,
                        (view, index) =>
							html`
								<uui-tab
									href="${this._routerPath}/view/${view.meta.pathname}"
											.label="${view.meta.label ? this.localize.string(view.meta.label) : view.name}"
											?active=${'view/' + view.meta.pathname === this._activePath ||
											(index === 0 && this._activePath === '')}>
											${view.meta.label ? this.localize.string(view.meta.label) : view.name}
								</uui-tab>
							`,
				)}
			</uui-tab-group>
		`;
	}

    #renderRoutes() {
		if (!this._routes || this._routes.length === 0) return nothing;
		return html`
			<umb-body-layout>
				<umb-router-slot
					id="router-slot"
					.routes=${this._routes}
					@init=${(event: UmbRouterSlotInitEvent) => {
						this._routerPath = event.target.absoluteRouterPath;
					}}
					@change=${(event: UmbRouterSlotChangeEvent) => {
						this._activePath = event.target.localActiveViewPath;
					}}></umb-router-slot>
			</umb-body-layout>
		`;
	}

	static override styles = [
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}

			.navigation {
				height: 50px;
				padding: 0 20px;
				background-color: white;
			}

			#router-slot {
				display: flex;
				flex-direction: column;
				height: 100%;
			}
		`
	]
}