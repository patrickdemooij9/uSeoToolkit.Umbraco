import { ManifestPropertyEditorUi } from "@umbraco-cms/backoffice/extension-registry";

const fieldsEditorPropertyEditor: ManifestPropertyEditorUi = {
  type: "propertyEditorUi",
  alias: "SeoToolkit.FieldsEditor",
  name: "SeoToolkit FieldsEditor",
  element: () =>
    import("../propertyEditors/FieldsEditorPropertyEditor.element"),
  meta: {
    label: "Suggestions",
    icon: 'icon-code',
    group: 'common',
    propertyEditorSchemaAlias: "Umbraco.Plain.String",
  },
};

export const PropertyEditorManifests = [ fieldsEditorPropertyEditor ];