using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Mapping;
using SeoToolkit.Umbraco.MetaFields.Core.Collections;
using SeoToolkit.Umbraco.MetaFields.Core.Models.DocumentTypeSettings.Business;
using SeoToolkit.Umbraco.MetaFields.Core.Models.DocumentTypeSettings.PostModels;
using SeoToolkit.Umbraco.MetaFields.Core.Models.DocumentTypeSettings.ViewModels;
using SeoToolkit.Umbraco.MetaFields.Core.Models.SeoField.ViewModels;
using SeoToolkit.Umbraco.MetaFields.Core.Services.DocumentTypeSettings;
using SeoToolkit.Umbraco.Common.Core.Controllers;
using Umbraco.Cms.Web.Common.Routing;
using SeoToolkit.Umbraco.MetaFields.Core.Common.FieldProviders;

namespace SeoToolkit.Umbraco.MetaFields.Core.Controllers
{
    [ApiExplorerSettings(GroupName = "seoToolkitMetaFields")]
    [BackOfficeRoute("seoToolkitMetaFieldsSettings")]
    public class MetaFieldsSettingsController : SeoToolkitControllerBase
    {
        private readonly IMetaFieldsSettingsService _documentTypeSettingsService;
        private readonly SeoFieldCollection _seoFieldCollection;
        private readonly IUmbracoMapper _umbracoMapper;

        public MetaFieldsSettingsController(IMetaFieldsSettingsService documentTypeSettingsService,
            SeoFieldCollection seoFieldCollection,
            IUmbracoMapper umbracoMapper)
        {
            _documentTypeSettingsService = documentTypeSettingsService;
            _seoFieldCollection = seoFieldCollection;
            _umbracoMapper = umbracoMapper;
        }

        [HttpGet("metaFieldsSettings")]
        [ProducesResponseType(typeof(DocumentTypeSettingsViewModel), 200)]
        public IActionResult Get(int nodeId)
        {
            var model = _documentTypeSettingsService.Get(nodeId);
            var content = model != null ? 
                new DocumentTypeSettingsContentViewModel(model, _seoFieldCollection.GetAll().Select(it => new SeoFieldViewModel(it, model.Get(it.Alias))).ToArray()) :
                new DocumentTypeSettingsContentViewModel(_seoFieldCollection.GetAll().Select(it => new SeoFieldViewModel(it)).ToArray());
            return Ok(new DocumentTypeSettingsViewModel
            {
                ContentModel = content,
            });
        }

        [HttpGet("metaFieldsAdditionalFields")]
        [ProducesResponseType(typeof(FieldItemViewModel[]), 200)]
        public IActionResult GetAdditionalFields()
        {
            return Ok(_documentTypeSettingsService.GetAdditionalFieldItems());
        }

        [HttpPost("metaFieldsSettings")]
        public IActionResult Save(DocumentTypeSettingsPostViewModel postModel)
        {
            _documentTypeSettingsService.Set(_umbracoMapper.Map<DocumentTypeSettingsPostViewModel, DocumentTypeSettingsDto>(postModel));
            return Ok();
        }
    }
}
