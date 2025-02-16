import type { ManifestElement } from '@umbraco-cms/backoffice/extension-api';
import { ISeoContentPreviewer } from '../previewers/ISeoContentPreviewer';

export interface SeoContentPreviewerManifest extends ManifestElement<ISeoContentPreviewer> {
    type: 'seoContentPreviewer';
    group: string;
}