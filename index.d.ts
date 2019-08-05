import { SPRest } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';
import { IHubSite } from './IHubSite';
export declare class HubSiteService {
    private storage;
    constructor();
    /**
     * Get hub site
     *
     * @param {SPRest} sp Sp
     * @param {PageContext} pageContext Page context
     * @param {Date} expire Expire
     */
    GetHubSite(sp: SPRest, pageContext: PageContext, expire?: Date): Promise<IHubSite>;
}
export { IHubSite };
declare const _default: HubSiteService;
export default _default;
