using SeoToolkit.Umbraco.MetaFields.Core.Common.Converters.EditorConverters;
using SeoToolkit.Umbraco.MetaFields.Core.Interfaces.SeoField;

namespace SeoToolkit.Umbraco.MetaFields.Core.Common.SeoFieldEditors
{
    public class DropdownFieldPropertyEditor : SeoFieldPropertyEditor, ISeoFieldEditorProcessor
    {

        public DropdownFieldPropertyEditor(string[] items) : base("Umb.PropertyEditorUi.Dropdown", new SingleDropdownValueConverter())
        {
            IsPreValue = true;
            Config.Add("items", items);
        }

        public object HandleValue(object value)
        {
            return value;
        }
    }
}
