import { SPFI } from '@pnp/sp';
import { IWeb } from '@pnp/sp/webs';
export interface IHubSiteContext {
    url: string;
    sp: SPFI;
    web: IWeb;
}
