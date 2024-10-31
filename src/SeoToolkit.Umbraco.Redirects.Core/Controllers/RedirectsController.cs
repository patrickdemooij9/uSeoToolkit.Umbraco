﻿using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SeoToolkit.Umbraco.Redirects.Core.Constants;
using SeoToolkit.Umbraco.Redirects.Core.Enumerators;
using SeoToolkit.Umbraco.Redirects.Core.Helpers;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using SeoToolkit.Umbraco.Redirects.Core.Interfaces;
using SeoToolkit.Umbraco.Redirects.Core.Models.Business;
using SeoToolkit.Umbraco.Redirects.Core.Models.PostModels;
using SeoToolkit.Umbraco.Redirects.Core.Models.ViewModels;
using Umbraco.Cms.Core.Security;
using Umbraco.Extensions;
using SeoToolkit.Umbraco.Common.Core.Controllers;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using System.Threading.Tasks;

namespace SeoToolkit.Umbraco.Redirects.Core.Controllers
{
    [ApiExplorerSettings(GroupName = "seoToolkitRedirects")]
    [BackOfficeRoute("seoToolkitRedirects")]
    public class RedirectsController : SeoToolkitControllerBase
    {
        private readonly IRedirectsService _redirectsService;
        private readonly IUmbracoContextFactory _umbracoContextFactory;
        private readonly ILanguageService _languageService;
        private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
        private readonly RedirectsImportHelper _redirectsImportHelper;


        public RedirectsController(IRedirectsService redirectsService,
            IUmbracoContextFactory umbracoContextFactory,
            ILanguageService languageService,
            IBackOfficeSecurityAccessor backOfficeSecurityAccessor, RedirectsImportHelper redirectsImportHelper)
        {
            _redirectsService = redirectsService;
            _umbracoContextFactory = umbracoContextFactory;
            _languageService = languageService;
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
            _redirectsImportHelper = redirectsImportHelper;
        }

        [HttpPost("redirect")]
        public async Task<IActionResult> Save(SaveRedirectPostModel postModel)
        {
            using var ctx = _umbracoContextFactory.EnsureUmbracoContext();

            var redirect = new Redirect
            {
                Id = postModel.Id,
                CustomDomain = postModel.CustomDomain,
                IsEnabled = postModel.IsEnabled,
                IsRegex = postModel.IsRegex,
                OldUrl = postModel.OldUrl,
                NewUrl = postModel.NewUrl,
                RedirectCode = postModel.RedirectCode
            };

            if (postModel.Domain != null)
            {
                var foundDomain = ctx.UmbracoContext.Domains.GetAll(false).FirstOrDefault(it => it.Id == postModel.Domain);
                if (foundDomain is null)
                    return new BadRequestResult();
                redirect.Domain = foundDomain;
            }

            if (postModel.NewNodeId != null)
            {
                redirect.NewNode = postModel.NewCultureId != null
                    ? ctx.UmbracoContext.Content.GetById(postModel.NewNodeId.Value)
                    : ctx.UmbracoContext.Media.GetById(postModel.NewNodeId.Value);
                if (redirect.NewNode is null)
                    return new BadRequestResult();
            }

            if (postModel.NewCultureId != null)
            {
                var languages = await _languageService.GetAllAsync();
                redirect.NewNodeCulture = languages.FirstOrDefault(it => it.Id == postModel.NewCultureId);
                if (redirect.NewNodeCulture is null)
                    return new BadRequestResult();
            }

            if (postModel.Id == 0)
            {
                redirect.CreatedBy = -1;
                var getUserAttempt = _backOfficeSecurityAccessor.BackOfficeSecurity?.GetUserId();
                if (getUserAttempt?.Success is true)
                {
                    redirect.CreatedBy = getUserAttempt.Value.Result;
                }
            }

            _redirectsService.Save(redirect);
            return Ok();
        }

        [HttpGet("redirects")]
        [ProducesResponseType(typeof(PagedViewModel<RedirectViewModel>), 200)]
        public IActionResult GetAll(int pageNumber, int pageSize, string orderBy = null, string orderDirection = null, string search = "")
        {
            var redirectsPaged = _redirectsService.GetAll(pageNumber, pageSize, orderBy, orderDirection, search);
            var viewModels = redirectsPaged.Items.Select(it =>
            {
                var domain = it.Domain?.Name ?? it.CustomDomain;
                if (domain?.StartsWith("/") is true)
                    domain = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}{domain}";
                return new RedirectViewModel(it);
            });
            return Ok(new PagedViewModel<RedirectViewModel>() { Total = redirectsPaged.TotalItems, Items = viewModels });
        }

        [HttpGet("redirect")]
        [ProducesResponseType(typeof(RedirectViewModel), 200)]
        public IActionResult Get(int id)
        {
            var redirect = _redirectsService.Get(id);
            if (redirect is null)
                return NotFound();
            return Ok(new RedirectViewModel(redirect));
        }

        [HttpGet("domains")]
        [ProducesResponseType(typeof(DomainViewModel), 200)]
        public IActionResult GetDomains()
        {
            using var ctx = _umbracoContextFactory.EnsureUmbracoContext();
            return Ok(ctx.UmbracoContext.Domains.GetAll(false).Select(it => new DomainViewModel
            {
                Id = it.Id,
                Name = it.Name.StartsWith("/") ? $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}{it.Name}" : it.Name
            }));
        }

        [HttpDelete("redirect")]
        public IActionResult Delete(DeleteRedirectsPostModel postModel)
        {
            _redirectsService.Delete(postModel.Ids);
            return Ok();
        }

        [HttpPost("validate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Validate(ImportRedirectsFileExtension fileExtension, string domain, IFormFile file)
        {
            if (file.Length == 0)
            {
                return BadRequest("Please select a file");
            }

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);

            var result = _redirectsImportHelper.Validate(fileExtension, memoryStream, domain);
            if (result.Success)
            {

                // Storing the file contents in session for later import
                HttpContext.Session.Set(ImportConstants.SessionAlias, memoryStream.ToArray());
                HttpContext.Session.SetString(ImportConstants.SessionFileTypeAlias, fileExtension.ToString());
                HttpContext.Session.SetString(ImportConstants.SessionDomainId, domain);

                return Ok();
            }

            return UnprocessableEntity(!string.IsNullOrWhiteSpace(result.Status) ? result.Status : "Something went wrong during the validation");
        }

        [HttpPost("import")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Import()
        {
            var fileContent = HttpContext.Session.Get(ImportConstants.SessionAlias);
            var fileExtensionString = HttpContext.Session.GetString(ImportConstants.SessionFileTypeAlias);
            var domain= HttpContext.Session.GetString(ImportConstants.SessionDomainId);

            if (fileContent == null || fileExtensionString == null || domain == null)
            {
                return BadRequest("Something went wrong during import, please try again");
            }

            if (!Enum.TryParse(fileExtensionString, out ImportRedirectsFileExtension fileExtension))
            {
                return UnprocessableEntity("Invalid file extension.");
            }

            using var memoryStream = new MemoryStream(fileContent);
            var result = _redirectsImportHelper.Import(fileExtension, memoryStream, domain);
            if (result.Success)
            {
                return Ok();
            }

            return UnprocessableEntity(!string.IsNullOrWhiteSpace(result.Status) ? result.Status : "Something went wrong during the import");
        }
    }
}
