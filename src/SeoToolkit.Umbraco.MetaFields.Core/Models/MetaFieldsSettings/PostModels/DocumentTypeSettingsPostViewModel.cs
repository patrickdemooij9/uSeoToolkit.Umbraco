using System;
using System.Collections.Generic;

namespace SeoToolkit.Umbraco.MetaFields.Core.Models.DocumentTypeSettings.PostModels
{
    public class DocumentTypeSettingsPostViewModel
    {
        public Guid NodeId { get; set; }
        public bool EnableSeoSettings { get; set; }
        public Dictionary<string, DocumentTypeValuePostViewModel> Fields { get; set; }
        public Guid? InheritanceId { get; set; }

        public DocumentTypeSettingsPostViewModel()
        {
            Fields = new Dictionary<string, DocumentTypeValuePostViewModel>();
        }
    }
}
