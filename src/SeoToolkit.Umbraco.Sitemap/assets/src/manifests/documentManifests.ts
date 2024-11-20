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

export const DocumentManifests = [documentView];