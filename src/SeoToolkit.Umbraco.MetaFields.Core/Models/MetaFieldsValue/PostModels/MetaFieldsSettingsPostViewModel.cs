using System;
using System.Collections.Generic;

namespace SeoToolkit.Umbraco.MetaFields.Core.Models.SeoSettings.PostModels
{
    public class MetaFieldsSettingsPostViewModel
    {
        public Guid NodeId { get; set; }
        public string Culture { get; set; }
        public Dictionary<string, object> UserValues { get; set; }
    }
}
