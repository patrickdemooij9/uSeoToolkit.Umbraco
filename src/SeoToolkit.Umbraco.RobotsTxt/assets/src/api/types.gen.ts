// This file is auto-generated by @hey-api/openapi-ts

export type EventMessageTypeModel = 'Default' | 'Info' | 'Error' | 'Success' | 'Warning';

export const EventMessageTypeModel = {
    DEFAULT: 'Default',
    INFO: 'Info',
    ERROR: 'Error',
    SUCCESS: 'Success',
    WARNING: 'Warning'
} as const;

export type NamedEntityTreeItemResponseModel = {
    hasChildren: boolean;
    id: string;
    parent?: ((ReferenceByIdModel) | null);
    name: string;
};

export type NotificationHeaderModel = {
    message: string;
    category: string;
    type: EventMessageTypeModel;
};

export type PagedNamedEntityTreeItemResponseModel = {
    total: number;
    items: Array<(NamedEntityTreeItemResponseModel)>;
};

export type ReferenceByIdModel = {
    id: string;
};

export type RobotsTxtSavePostModel = {
    skipValidation: boolean;
    content?: (string) | null;
};

export type RobotsTxtSaveResponseModel = {
    content?: (string) | null;
    errors?: Array<(RobotsTxtValidationViewModel)> | null;
};

export type RobotsTxtValidationViewModel = {
    readonly lineNumber: number;
    readonly error?: (string) | null;
};

export type SeoToolkitModule = {
    title: string;
    alias: string;
    icon: string;
    link: string;
    status: SeoToolkitModuleStatus;
};

export type SeoToolkitModuleStatus = 'NotInstalled' | 'Installed' | 'Disabled';

export const SeoToolkitModuleStatus = {
    NOT_INSTALLED: 'NotInstalled',
    INSTALLED: 'Installed',
    DISABLED: 'Disabled'
} as const;

export type GetUmbracoSeoToolkitModulesResponse = (Array<(SeoToolkitModule)>);

export type GetUmbracoSeoToolkitRobotsTxtResponse = (string);

export type PostUmbracoSeoToolkitRobotsTxtData = {
    requestBody?: (RobotsTxtSavePostModel);
};

export type PostUmbracoSeoToolkitRobotsTxtResponse = ((RobotsTxtSaveResponseModel));

export type GetUmbracoSeoToolkitTreeInfoAncestorsData = {
    descendantId?: string;
};

export type GetUmbracoSeoToolkitTreeInfoAncestorsResponse = (Array<(NamedEntityTreeItemResponseModel)>);

export type GetUmbracoSeoToolkitTreeInfoChildrenData = {
    parentId?: string;
    skip?: number;
    take?: number;
};

export type GetUmbracoSeoToolkitTreeInfoChildrenResponse = ((PagedNamedEntityTreeItemResponseModel));

export type GetUmbracoSeoToolkitTreeInfoRootData = {
    skip?: number;
    take?: number;
};

export type GetUmbracoSeoToolkitTreeInfoRootResponse = ((PagedNamedEntityTreeItemResponseModel));