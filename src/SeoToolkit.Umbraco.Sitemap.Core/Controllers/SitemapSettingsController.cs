using Microsoft.AspNetCore.Mvc;
using SeoToolkit.Umbraco.Sitemap.Core.Models.Business;
using SeoToolkit.Umbraco.Sitemap.Core.Models.PostModels;
using SeoToolkit.Umbraco.Sitemap.Core.Models.ViewModels;
using SeoToolkit.Umbraco.Sitemap.Core.Services.SitemapService;
using SeoToolkit.Umbraco.Common.Core.Controllers;
using Umbraco.Cms.Web.Common.Routing;

namespace SeoToolkit.Umbraco.Sitemap.Core.Controllers
{
    [ApiExplorerSettings(GroupName = "seoToolkitSitemap")]
    [BackOfficeRoute("seoToolkitSitemap")]
    public class SitemapSettingsController : SeoToolkitControllerBase
    {
        private readonly ISitemapService _sitemapService;

        public SitemapSettingsController(ISitemapService sitemapService)
        {
            _sitemapService = sitemapService;
        }

        [HttpGet("sitemapSettings")]
        [ProducesResponseType(typeof(SitemapPageTypeSettingsViewModel), 200)]
        public IActionResult GetPageTypeSettings(int contentTypeId)
        {
            var settings = _sitemapService.GetPageTypeSettings(contentTypeId) ?? new SitemapPageSettings();
            return new JsonResult(new SitemapPageTypeSettingsViewModel
            {
                HideFromSitemap = settings.HideFromSitemap,
                ChangeFrequency = settings.ChangeFrequency,
                Priority = settings.Priority
            });
        }

        [HttpPost("sitemapSettings")]
        public IActionResult SetPageTypeSettings(SitemapPageTypeSettingsPostModel model)
        {
            _sitemapService.SetPageTypeSettings(new SitemapPageSettings
            {
                ContentTypeId = model.ContentTypeId,
                HideFromSitemap = model.HideFromSitemap,
                ChangeFrequency = model.ChangeFrequency,
                Priority = model.Priority
            });
            return Ok();
        }
    }
}
