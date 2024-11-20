import type { ManifestWithView } from '@umbraco-cms/backoffice/extension-api';
import { MetaWorkspaceView, UmbWorkspaceViewElement } from '@umbraco-cms/backoffice/extension-registry';

export interface SeoDocumentViewManifest<MetaType extends MetaWorkspaceView = MetaWorkspaceView> extends ManifestWithView<UmbWorkspaceViewElement> {
    type: 'seoDocumentView';
    meta: MetaType;
}