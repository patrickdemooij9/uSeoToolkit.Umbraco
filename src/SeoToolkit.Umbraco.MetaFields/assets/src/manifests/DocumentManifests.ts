import { ManifestWorkspaceContext } from "@umbraco-cms/backoffice/extension-registry";

const documentView: any = {
  type: "seoDocumentView",
  alias: "seoToolkit.metaFields.documentView",
  name: "SeoToolkit MetaFields document view",
  js: () => import("../workspaces/MetaFieldsDocumentView.element"),
  weight: 300,
  meta: {
    label: "Meta Fields",
    pathname: "metaFields",
    icon: "icon-globe",
  },
};

const documentWorkspaceContext: ManifestWorkspaceContext = {
  type: "workspaceContext",
  alias: "seoToolkit.metaFields.documentWorkspaceContext",
  name: "SeoToolkit Meta Fields workspace context",
  api: () => import("../workspaces/MetaFieldsDocumentContext"),
  conditions: [
    {
      alias: "Umb.Condition.WorkspaceAlias",
      match: "Umb.Workspace.DocumentType",
    },
  ],
};

const contentView: any = {
  type: "seoContentView",
  alias: "seoToolkit.metaFields.contentView",
  name: "SeoToolkit MetaFields content view",
  js: () => import("../workspaces/MetaFieldsContentView.element"),
  weight: 300,
  meta: {
    label: "Meta Fields",
    pathname: "metaFields",
    icon: "icon-globe",
  },
};

const contentWorkspaceContext: ManifestWorkspaceContext = {
    type: "workspaceContext",
    alias: "seoToolkit.metaFields.contentWorkspaceContext",
    name: "SeoToolkit Meta Fields content workspace context",
    api: () => import("../workspaces/MetaFieldsContentContext"),
    conditions: [
      {
        alias: "Umb.Condition.WorkspaceAlias",
        match: "Umb.Workspace.Document",
      },
    ],
  };

export const DocumentManifests = [
  documentView,
  documentWorkspaceContext,
  contentView,
  contentWorkspaceContext
];
