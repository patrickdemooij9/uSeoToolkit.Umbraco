export interface Redirect { 
    unique: string;
    entityType: string;
    isEnabled: boolean;
    isRegex: boolean;
    domain?: number | null;
    oldUrl?: string | null;
    newUrl?: string | null;
    newNodeId?: string | null;
    newCultureIso?: string | null;
    statusCode: number;
    lastUpdated?: (string) | null;
}