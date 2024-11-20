// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { GetUmbracoSeoToolkitModulesResponse, GetUmbracoSeoToolkitRobotsTxtResponse, PostUmbracoSeoToolkitRobotsTxtData, PostUmbracoSeoToolkitRobotsTxtResponse, GetUmbracoSeoToolkitTreeInfoAncestorsData, GetUmbracoSeoToolkitTreeInfoAncestorsResponse, GetUmbracoSeoToolkitTreeInfoChildrenData, GetUmbracoSeoToolkitTreeInfoChildrenResponse, GetUmbracoSeoToolkitTreeInfoRootData, GetUmbracoSeoToolkitTreeInfoRootResponse, GetUmbracoSeoToolkitRedirectsDomainsResponse, PostUmbracoSeoToolkitRedirectsImportResponse, DeleteUmbracoSeoToolkitRedirectsRedirectData, DeleteUmbracoSeoToolkitRedirectsRedirectResponse, GetUmbracoSeoToolkitRedirectsRedirectData, GetUmbracoSeoToolkitRedirectsRedirectResponse, PostUmbracoSeoToolkitRedirectsRedirectData, PostUmbracoSeoToolkitRedirectsRedirectResponse, GetUmbracoSeoToolkitRedirectsRedirectsData, GetUmbracoSeoToolkitRedirectsRedirectsResponse, PostUmbracoSeoToolkitRedirectsValidateData, PostUmbracoSeoToolkitRedirectsValidateResponse, GetUmbracoSeoToolkitScriptManagerDefinitionsResponse, DeleteUmbracoSeoToolkitScriptManagerScriptData, DeleteUmbracoSeoToolkitScriptManagerScriptResponse, GetUmbracoSeoToolkitScriptManagerScriptData, GetUmbracoSeoToolkitScriptManagerScriptResponse, PostUmbracoSeoToolkitScriptManagerScriptData, PostUmbracoSeoToolkitScriptManagerScriptResponse, GetUmbracoSeoToolkitScriptManagerScriptsResponse, GetUmbracoSeoToolkitSitemapSitemapSettingsData, GetUmbracoSeoToolkitSitemapSitemapSettingsResponse, PostUmbracoSeoToolkitSitemapSitemapSettingsData, PostUmbracoSeoToolkitSitemapSitemapSettingsResponse } from './types.gen';

export class SeoToolkitService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitModules(): CancelablePromise<GetUmbracoSeoToolkitModulesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkit/modules'
        });
    }
    
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitRobotsTxt(): CancelablePromise<GetUmbracoSeoToolkitRobotsTxtResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkit/robotsTxt'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitRobotsTxt(data: PostUmbracoSeoToolkitRobotsTxtData = {}): CancelablePromise<PostUmbracoSeoToolkitRobotsTxtResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkit/robotsTxt',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.descendantId
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitTreeInfoAncestors(data: GetUmbracoSeoToolkitTreeInfoAncestorsData = {}): CancelablePromise<GetUmbracoSeoToolkitTreeInfoAncestorsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkit/tree/info/ancestors',
            query: {
                descendantId: data.descendantId
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.parentId
     * @param data.skip
     * @param data.take
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitTreeInfoChildren(data: GetUmbracoSeoToolkitTreeInfoChildrenData = {}): CancelablePromise<GetUmbracoSeoToolkitTreeInfoChildrenResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkit/tree/info/children',
            query: {
                parentId: data.parentId,
                skip: data.skip,
                take: data.take
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.skip
     * @param data.take
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitTreeInfoRoot(data: GetUmbracoSeoToolkitTreeInfoRootData = {}): CancelablePromise<GetUmbracoSeoToolkitTreeInfoRootResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkit/tree/info/root',
            query: {
                skip: data.skip,
                take: data.take
            }
        });
    }
    
}

export class SeoToolkitRedirectsService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitRedirectsDomains(): CancelablePromise<GetUmbracoSeoToolkitRedirectsDomainsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitRedirects/domains'
        });
    }
    
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitRedirectsImport(): CancelablePromise<PostUmbracoSeoToolkitRedirectsImportResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkitRedirects/import',
            responseHeader: 'Umb-Notifications',
            errors: {
                400: 'Bad Request',
                422: 'Unprocessable Content'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static deleteUmbracoSeoToolkitRedirectsRedirect(data: DeleteUmbracoSeoToolkitRedirectsRedirectData = {}): CancelablePromise<DeleteUmbracoSeoToolkitRedirectsRedirectResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/umbraco/seoToolkitRedirects/redirect',
            body: data.requestBody,
            mediaType: 'application/json',
            responseHeader: 'Umb-Notifications'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitRedirectsRedirect(data: GetUmbracoSeoToolkitRedirectsRedirectData = {}): CancelablePromise<GetUmbracoSeoToolkitRedirectsRedirectResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitRedirects/redirect',
            query: {
                id: data.id
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitRedirectsRedirect(data: PostUmbracoSeoToolkitRedirectsRedirectData = {}): CancelablePromise<PostUmbracoSeoToolkitRedirectsRedirectResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkitRedirects/redirect',
            body: data.requestBody,
            mediaType: 'application/json',
            responseHeader: 'Umb-Notifications'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.pageNumber
     * @param data.pageSize
     * @param data.orderBy
     * @param data.orderDirection
     * @param data.search
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitRedirectsRedirects(data: GetUmbracoSeoToolkitRedirectsRedirectsData = {}): CancelablePromise<GetUmbracoSeoToolkitRedirectsRedirectsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitRedirects/redirects',
            query: {
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                orderBy: data.orderBy,
                orderDirection: data.orderDirection,
                search: data.search
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.fileExtension
     * @param data.domain
     * @param data.formData
     * @returns string OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitRedirectsValidate(data: PostUmbracoSeoToolkitRedirectsValidateData = {}): CancelablePromise<PostUmbracoSeoToolkitRedirectsValidateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkitRedirects/validate',
            query: {
                fileExtension: data.fileExtension,
                domain: data.domain
            },
            formData: data.formData,
            mediaType: 'multipart/form-data',
            responseHeader: 'Umb-Notifications',
            errors: {
                400: 'Bad Request',
                422: 'Unprocessable Content'
            }
        });
    }
    
}

export class SeoToolkitScriptManagerService {
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitScriptManagerDefinitions(): CancelablePromise<GetUmbracoSeoToolkitScriptManagerDefinitionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitScriptManager/definitions'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown OK
     * @throws ApiError
     */
    public static deleteUmbracoSeoToolkitScriptManagerScript(data: DeleteUmbracoSeoToolkitScriptManagerScriptData = {}): CancelablePromise<DeleteUmbracoSeoToolkitScriptManagerScriptResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/umbraco/seoToolkitScriptManager/script',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitScriptManagerScript(data: GetUmbracoSeoToolkitScriptManagerScriptData = {}): CancelablePromise<GetUmbracoSeoToolkitScriptManagerScriptResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitScriptManager/script',
            query: {
                id: data.id
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitScriptManagerScript(data: PostUmbracoSeoToolkitScriptManagerScriptData = {}): CancelablePromise<PostUmbracoSeoToolkitScriptManagerScriptResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkitScriptManager/script',
            body: data.requestBody,
            mediaType: 'application/json'
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitScriptManagerScripts(): CancelablePromise<GetUmbracoSeoToolkitScriptManagerScriptsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitScriptManager/scripts'
        });
    }
    
}

export class SeoToolkitSitemapService {
    /**
     * @param data The data for the request.
     * @param data.contentTypeId
     * @returns unknown OK
     * @throws ApiError
     */
    public static getUmbracoSeoToolkitSitemapSitemapSettings(data: GetUmbracoSeoToolkitSitemapSitemapSettingsData = {}): CancelablePromise<GetUmbracoSeoToolkitSitemapSitemapSettingsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/seoToolkitSitemap/sitemapSettings',
            query: {
                contentTypeId: data.contentTypeId
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static postUmbracoSeoToolkitSitemapSitemapSettings(data: PostUmbracoSeoToolkitSitemapSitemapSettingsData = {}): CancelablePromise<PostUmbracoSeoToolkitSitemapSitemapSettingsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/seoToolkitSitemap/sitemapSettings',
            body: data.requestBody,
            mediaType: 'application/json',
            responseHeader: 'Umb-Notifications'
        });
    }
    
}