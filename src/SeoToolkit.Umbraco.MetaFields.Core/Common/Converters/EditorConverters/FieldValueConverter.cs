using System;
using System.Linq;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using SeoToolkit.Umbraco.MetaFields.Core.Interfaces.Converters;
using SeoToolkit.Umbraco.MetaFields.Core.Models.Converters;

namespace SeoToolkit.Umbraco.MetaFields.Core.Common.Converters.EditorConverters
{
    public class FieldValueConverter : IEditorValueConverter
    {
        public object ConvertEditorToDatabaseValue(object value)
        {
            if (value is not JsonElement element || element.ValueKind != JsonValueKind.Array)
                return null;

            return new FieldsModel
            {
                Fields = JsonSerializer.Deserialize<FieldsItem[]>(element)
            };
        }

        public object ConvertObjectToEditorValue(object value)
        {
            if (value is null || value is not FieldsModel fieldModel)
                return Array.Empty<string>();

            return fieldModel.Fields ?? [];
        }

        public object ConvertDatabaseToObject(object value)
        {
            if (value is JObject jsonObject)
            {
                return jsonObject.ToObject<FieldsModel>();
            }

            return null;
        }

        public bool IsEmpty(object value)
        {
            return value is null || (value as FieldsModel)?.Fields?.Any() != true;
        }
    }
}
