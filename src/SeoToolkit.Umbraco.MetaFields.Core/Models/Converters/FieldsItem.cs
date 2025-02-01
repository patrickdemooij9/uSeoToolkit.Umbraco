using SeoToolkit.Umbraco.MetaFields.Core.Enums;
using System.Text.Json.Serialization;

namespace SeoToolkit.Umbraco.MetaFields.Core.Models.Converters
{
    public class FieldsItem
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [JsonPropertyName("source")]
        public FieldSourceType Source { get; set; }
    }
}
