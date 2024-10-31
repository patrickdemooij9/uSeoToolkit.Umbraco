// This file is auto-generated by @hey-api/openapi-ts

export const CreateScriptPostModelSchema = {
    required: ['id'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        name: {
            type: 'string',
            nullable: true
        },
        definitionAlias: {
            type: 'string',
            nullable: true
        },
        fields: {
            type: 'object',
            additionalProperties: {
                type: 'string',
                nullable: true
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const DeleteRedirectsPostModelSchema = {
    type: 'object',
    properties: {
        ids: {
            type: 'array',
            items: {
                type: 'integer',
                format: 'int32'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const DeleteScriptPostModelSchema = {
    type: 'object',
    properties: {
        ids: {
            type: 'array',
            items: {
                type: 'integer',
                format: 'int32'
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const DomainViewModelSchema = {
    required: ['id'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        name: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const EventMessageTypeModelSchema = {
    enum: ['Default', 'Info', 'Error', 'Success', 'Warning'],
    type: 'string'
} as const;

export const ImportRedirectsFileExtensionSchema = {
    enum: ['Csv', 'Excel'],
    type: 'string'
} as const;

export const NamedEntityTreeItemResponseModelSchema = {
    required: ['hasChildren', 'id', 'name'],
    type: 'object',
    properties: {
        hasChildren: {
            type: 'boolean'
        },
        id: {
            type: 'string',
            format: 'uuid'
        },
        parent: {
            oneOf: [
                {
                    '$ref': '#/components/schemas/ReferenceByIdModel'
                }
            ],
            nullable: true
        },
        name: {
            type: 'string'
        }
    },
    additionalProperties: false
} as const;

export const NotificationHeaderModelSchema = {
    required: ['category', 'message', 'type'],
    type: 'object',
    properties: {
        message: {
            type: 'string'
        },
        category: {
            type: 'string'
        },
        type: {
            '$ref': '#/components/schemas/EventMessageTypeModel'
        }
    },
    additionalProperties: false
} as const;

export const PagedNamedEntityTreeItemResponseModelSchema = {
    required: ['items', 'total'],
    type: 'object',
    properties: {
        total: {
            type: 'integer',
            format: 'int64'
        },
        items: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/NamedEntityTreeItemResponseModel'
                    }
                ]
            }
        }
    },
    additionalProperties: false
} as const;

export const PagedRedirectModelSchema = {
    required: ['items', 'total'],
    type: 'object',
    properties: {
        total: {
            type: 'integer',
            format: 'int64'
        },
        items: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/RedirectViewModel'
                    }
                ]
            }
        }
    },
    additionalProperties: false
} as const;

export const RedirectViewModelSchema = {
    required: ['id', 'isEnabled', 'isRegex', 'redirectCode'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        domain: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        customDomain: {
            type: 'string',
            nullable: true
        },
        isEnabled: {
            type: 'boolean'
        },
        isRegex: {
            type: 'boolean'
        },
        oldUrl: {
            type: 'string',
            nullable: true
        },
        newUrl: {
            type: 'string',
            nullable: true
        },
        newNodeId: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        newCultureId: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        redirectCode: {
            type: 'integer',
            format: 'int32'
        }
    },
    additionalProperties: false
} as const;

export const ReferenceByIdModelSchema = {
    required: ['id'],
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        }
    },
    additionalProperties: false
} as const;

export const RobotsTxtSavePostModelSchema = {
    required: ['skipValidation'],
    type: 'object',
    properties: {
        skipValidation: {
            type: 'boolean'
        },
        content: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const RobotsTxtSaveResponseModelSchema = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
            nullable: true
        },
        errors: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/RobotsTxtValidationViewModel'
                    }
                ]
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const RobotsTxtValidationViewModelSchema = {
    required: ['lineNumber'],
    type: 'object',
    properties: {
        lineNumber: {
            type: 'integer',
            format: 'int32',
            readOnly: true
        },
        error: {
            type: 'string',
            nullable: true,
            readOnly: true
        }
    },
    additionalProperties: false
} as const;

export const SaveRedirectPostModelSchema = {
    required: ['id', 'isEnabled', 'isRegex', 'redirectCode'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        domain: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        customDomain: {
            type: 'string',
            nullable: true
        },
        isEnabled: {
            type: 'boolean'
        },
        isRegex: {
            type: 'boolean'
        },
        oldUrl: {
            type: 'string',
            nullable: true
        },
        newUrl: {
            type: 'string',
            nullable: true
        },
        newNodeId: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        newCultureId: {
            type: 'integer',
            format: 'int32',
            nullable: true
        },
        redirectCode: {
            type: 'integer',
            format: 'int32'
        }
    },
    additionalProperties: false
} as const;

export const ScriptDefinitionViewModelSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            nullable: true,
            readOnly: true
        },
        alias: {
            type: 'string',
            nullable: true,
            readOnly: true
        },
        fields: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        '$ref': '#/components/schemas/ScriptField'
                    }
                ]
            },
            nullable: true,
            readOnly: true
        }
    },
    additionalProperties: false
} as const;

export const ScriptDetailViewModelSchema = {
    required: ['id'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        name: {
            type: 'string',
            nullable: true
        },
        definitionAlias: {
            type: 'string',
            nullable: true
        },
        config: {
            type: 'object',
            additionalProperties: {
                type: 'string',
                nullable: true
            },
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const ScriptFieldSchema = {
    type: 'object',
    properties: {
        key: {
            type: 'string',
            nullable: true
        },
        name: {
            type: 'string',
            nullable: true
        },
        description: {
            type: 'string',
            nullable: true
        },
        propertyAlias: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const ScriptListViewModelSchema = {
    required: ['id'],
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int32'
        },
        name: {
            type: 'string',
            nullable: true
        },
        definitionName: {
            type: 'string',
            nullable: true
        }
    },
    additionalProperties: false
} as const;

export const SeoToolkitModuleSchema = {
    required: ['alias', 'icon', 'link', 'status', 'title'],
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        alias: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        link: {
            type: 'string'
        },
        status: {
            '$ref': '#/components/schemas/SeoToolkitModuleStatus'
        }
    },
    additionalProperties: false
} as const;

export const SeoToolkitModuleStatusSchema = {
    enum: ['NotInstalled', 'Installed', 'Disabled'],
    type: 'string'
} as const;