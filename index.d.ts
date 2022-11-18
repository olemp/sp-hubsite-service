import { PnPClientStorage } from '@pnp/core';
import { IHubSiteContext } from './types';
import '@pnp/sp/search';
declare const _default: {
    storage: PnPClientStorage;
    /**
     * Get hub site
     *
     * @param spfxContext - SPFx content
     * @param expire - Optional, if provided the expiration of the item, otherwise the default (1 year) is used
     */
    GetHubSite(spfxContext: any, expire?: Date): Promise<IHubSiteContext>;
};
export default _default;
export * from './types';
