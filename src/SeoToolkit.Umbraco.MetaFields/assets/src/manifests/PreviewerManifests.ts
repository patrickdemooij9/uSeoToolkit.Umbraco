const MetaFieldsPreviewer: any = {
  type: "seoContentPreviewer",
  alias: "seoToolkit.previewer.metaFields",
  name: "SeoToolkit Previewer MetaFields",
  element: () => import("../previewers/MetaFieldsPreviewer.element"),
  group: "metaFields",
};

const OpenGraphPreviewer: any = {
  type: "seoContentPreviewer",
  alias: "seoToolkit.previewer.openGraph",
  name: "SeoToolkit Previewer OpenGraph",
  element: () => import("../previewers/OpenGraphPreviewer.element"),
  group: "socialMedia",
};

export const PreviewerManifests = [MetaFieldsPreviewer, OpenGraphPreviewer];
