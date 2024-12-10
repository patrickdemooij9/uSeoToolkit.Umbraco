import { ManifestWorkspaceAction, ManifestWorkspaceView } from "@umbraco-cms/backoffice/extension-registry";
import { SeoDocumentViewManifest } from "./seoDocumentViewManifest";

const workSpaceView: ManifestWorkspaceView = {
    type: 'workspaceView',
    alias: 'seoToolkit.common.document.edit',
    name: 'SeoToolkit Common Document Edit',
    js: () => import('../workspaces/seoToolkitDocumentView.element'),
    weight: 300,
    meta: {
        label: 'SEO',
        pathname: 'seo',
        icon: 'icon-globe',
    },
    conditions: [
        {
            alias: 'Umb.Condition.WorkspaceAlias',
            match: 'Umb.Workspace.DocumentType'
        }
    ]
}

const overwriteSaveAction: ManifestWorkspaceAction = {
    type: 'workspaceAction',
    kind: 'default',
    overwrites: 'Umb.WorkspaceAction.DocumentType.Save',
    alias: 'seoToolkit.common.document.save',
    name: 'SeoToolkit Common Document Save',
    api: () => import("../actions/saveDocumentAction"),
    meta: {
        label: '#buttons_save',
        look: 'primary',
        color: 'positive',
    },
    conditions: [
        {
            alias: 'Umb.Condition.WorkspaceAlias',
            match: 'Umb.Workspace.DocumentType'
        }
    ]
}

const documentView: SeoDocumentViewManifest = {
    type: 'seoDocumentView',
    alias: 'seoToolkit.common.test',
    name: 'Test SEO element',
    js: () => import('../workspaces/testDocumentView.element'),
    weight: 300,
    meta: {
        label: 'Test',
        pathname: 'test',
        icon: 'icon-globe'
    },
}

export const Manifests = [workSpaceView, documentView, overwriteSaveAction];