import { RedirectLinkType } from "../types/RedirectLinkType";

export interface RedirectSelectLinkData { 
    linkType?: RedirectLinkType;

    url?: string;

    contentKey?: string;
    culture?: string;

    mediaKey?: string;
}