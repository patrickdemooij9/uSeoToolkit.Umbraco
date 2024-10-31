import { RedirectLinkType } from "../types/RedirectLinkType";

export interface RedirectSelectLinkData { 
    linkType?: RedirectLinkType;
    culture?: number;
    value: string;
}