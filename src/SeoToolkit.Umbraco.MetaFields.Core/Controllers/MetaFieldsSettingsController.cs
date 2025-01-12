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
using System;
using Umbraco.Cms.Core.Web;

namespace SeoToolkit.Umbraco.MetaFields.Core.Controllers
{
    [ApiExplorerSettings(GroupName = "seoToolkitMetaFields")]
    [BackOfficeRoute("seoToolkitMetaFieldsSettings")]
    public class MetaFieldsSettingsController : SeoToolkitControllerBase
    {
        private readonly IMetaFieldsSettingsService _documentTypeSettingsService;
        private readonly SeoFieldCollection _seoFieldCollection;
        private readonly IUmbracoMapper _umbracoMapper;
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        public MetaFieldsSettingsController(IMetaFieldsSettingsService documentTypeSettingsService,
            SeoFieldCollection seoFieldCollection,
            IUmbracoMapper umbracoMapper,
            IUmbracoContextFactory umbracoContextFactory)
        {
            _documentTypeSettingsService = documentTypeSettingsService;
            _seoFieldCollection = seoFieldCollection;
            _umbracoMapper = umbracoMapper;
            _umbracoContextFactory = umbracoContextFactory;
        }

        [HttpGet("metaFieldsSettings")]
        [ProducesResponseType(typeof(DocumentTypeSettingsViewModel), 200)]
        public IActionResult Get(Guid? nodeId)
        {
            DocumentTypeSettingsContentViewModel content = null;
            if (nodeId != null)
            {
                using var ctx = _umbracoContextFactory.EnsureUmbracoContext();
                var contentType = ctx.UmbracoContext.Content.GetContentType(nodeId.Value);
                if (contentType != null)
                {
                    var model = _documentTypeSettingsService.Get(contentType.Id);
                    if (model != null)
                    {
                        content = new DocumentTypeSettingsContentViewModel(model, _seoFieldCollection.GetAll().Select(it => new SeoFieldViewModel(it, model.Get(it.Alias))).ToArray());
                    }
                }
            }
            if (content is null)
            {
                content = new DocumentTypeSettingsContentViewModel(_seoFieldCollection.GetAll().Select(it => new SeoFieldViewModel(it)).ToArray());
            }

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
