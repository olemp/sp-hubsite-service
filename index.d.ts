import { SPRest } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';
import { PnPClientStorage } from '@pnp/common';
import { IHubSite } from './IHubSite';
declare const _default: {
    storage: PnPClientStorage;
    /**
     * Get hub site
     *
     * @param {SPRest} sp Sp
     * @param {PageContext} pageContext Page context
     * @param {Date} expire Expire
     */
    GetHubSite(sp: SPRest, pageContext: PageContext, expire?: Date): Promise<IHubSite>;
};
export default _default;
export { IHubSite };
