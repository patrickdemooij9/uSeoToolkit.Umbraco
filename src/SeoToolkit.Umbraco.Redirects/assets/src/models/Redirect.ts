export interface Redirect { 
    unique: string;
    entityType: string;
    isEnabled: boolean;
    isRegex: boolean;
    domain?: number | null;
    oldUrl?: string | null;
    newUrl?: string | null;
    newNodeId?: number | null;
    newCultureId?: number | null;
    statusCode: number;
    lastUpdated?: (string) | null;
}