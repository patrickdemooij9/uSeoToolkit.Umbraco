﻿using SeoToolkit.Umbraco.MetaFields.Core.Interfaces.Converters;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;

namespace SeoToolkit.Umbraco.MetaFields.Core.Common.Converters.EditorConverters
{
    //TODO: I need to write a migration to move everything to this format....
    public class UmbracoMediaConverter : IEditorValueConverter
    {
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        public UmbracoMediaConverter(IUmbracoContextFactory umbracoContextFactory)
        {
            _umbracoContextFactory = umbracoContextFactory;
        }

        public object ConvertDatabaseToObject(object value)
        {
            if (!Guid.TryParse(value?.ToString(), out var id))
                return null;

            var ctx = _umbracoContextFactory.EnsureUmbracoContext();
            return ctx.UmbracoContext.Media.GetById(id);
        }

        public object ConvertEditorToDatabaseValue(object value)
        {
            if (value is not JsonElement element || element.ValueKind != JsonValueKind.Array)
                return null;

            var images = JsonSerializer.Deserialize<MediaEditorModel[]>(element);
            if (images.Length == 0)
                return null;

            return images[0].MediaKey;
        }

        public object ConvertObjectToEditorValue(object value)
        {
            if (value is not IPublishedContent content)
                return null;

            return new MediaEditorModel[]
            {
                new MediaEditorModel
                {
                    Key = Guid.NewGuid(),
                    MediaKey = content.Key
                }
            };
        }

        public bool IsEmpty(object value)
        {
            return value != null;
        }

        private class MediaEditorModel
        {
            [JsonPropertyName("key")]
            public Guid Key { get; set; }

            [JsonPropertyName("mediaKey")]
            public Guid MediaKey { get; set; }
        }
    }
}
