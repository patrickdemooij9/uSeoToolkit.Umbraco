import { UMB_COLLECTION_ALIAS_CONDITION } from "@umbraco-cms/backoffice/collection";
import { ManifestCollection, ManifestCollectionAction, ManifestCollectionView, ManifestRepository } from "@umbraco-cms/backoffice/extension-registry";

const RedirectCollection: ManifestCollection = {
    type: 'collection',
    kind: 'default',
    alias: 'seoToolkit.collections.redirects',
    name: 'Redirects Collection',
    api: () => import('../workspaces/RedirectModuleContext'),
    meta: {
        repositoryAlias: 'seoToolkit.repositories.redirects'
    }
}

const RedirectCollectionView: ManifestCollectionView = {
    type: 'collectionView',
    alias: 'seoToolkit.collections.redirects.overview',
    name: 'Redirects overview',
    js: () => import("../collections/RedirectCollection.element"),
    meta: {
        label: 'Overview',
        icon: 'icon-list',
        pathName: 'overview',
    },
    conditions: [
        {
            alias: UMB_COLLECTION_ALIAS_CONDITION,
            match: 'seoToolkit.collections.redirects',
        }
    ]
}

const RedirectCollectionCreateAction: ManifestCollectionAction = {
    type: 'collectionAction',
    kind: 'button',
    name: 'Redirect Collection Overview Create',
    alias: 'seoToolkit.collections.redirects.createAction',
    api: () => import('../actions/CreateRedirectAction'),
    meta: {
        label: '#general_create',
    },
    conditions: [
        {
            alias: UMB_COLLECTION_ALIAS_CONDITION,
            match: 'seoToolkit.collections.redirects',
        },
    ],
}

/*const ScriptManagerCollectionTrashBulkAction: ManifestEntityBulkAction = {
    type: 'entityBulkAction',
	alias: 'seoToolkit.collections.script.trashAction',
	name: 'ScriptManager Collection Overview Trash',
	weight: 10,
    api: () => import('../actions/ScriptManagerDeleteAction'),
	forEntityTypes: [SEOTOOLKIT_SCRIPTMANAGER_ENTITY],
	meta: {
		label: 'Delete'
	},
	conditions: [
		{
			alias: UMB_COLLECTION_ALIAS_CONDITION,
			match: 'seoToolkit.collections.scripts',
		}
	],
}*/

const RedirectRepository: ManifestRepository = {
    type: 'repository',
    alias: 'seoToolkit.repositories.redirects',
    name: 'Redirects Repository',
    api: () => import('../dataLayer/RedirectRepository')
}

export const CollectionManifests = [RedirectCollection, RedirectCollectionView, RedirectCollectionCreateAction, RedirectRepository];