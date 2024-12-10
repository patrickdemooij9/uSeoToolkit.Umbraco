import { ManifestWorkspaceContext } from '@umbraco-cms/backoffice/extension-registry';

const documentView: any = {
    type: 'seoDocumentView',
    alias: 'seoToolkit.sitemap.documentView',
    name: 'SeoToolkit Sitemap document view',
    js: () => import('../workspaces/sitemapDocumentView.element'),
    weight: 300,
    meta: {
        label: 'Sitemap',
        pathname: 'sitemap',
        icon: 'icon-globe'
    },
}

const documentWorkspaceContext: ManifestWorkspaceContext = {
    type: 'workspaceContext',
    alias: 'seoToolkit.sitemap.documentWorkspaceContext',
    name: 'SeoToolkit Sitemap workdpsace context',
    api: () => import('../workspaces/sitemapDocumentViewContext'),
    conditions: [
        {
            alias: 'Umb.Condition.WorkspaceAlias',
            match: 'Umb.Workspace.DocumentType'
        }
    ]
};

export const DocumentManifests = [documentView, documentWorkspaceContext];