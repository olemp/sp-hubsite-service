import { SPRest, Web } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';
import { PnPClientStorage, dateAdd } from '@pnp/common';
import { IHubSite } from './IHubSite';

export class HubSiteService {
    private storage: PnPClientStorage;

    constructor() {
        this.storage = new PnPClientStorage();
    }
    /**
     * Get hub site
     * 
     * @param {SPRest} sp Sp
     * @param {PageContext} pageContext Page context
     * @param {Date} expire Expire
     */
    public async GetHubSite(sp: SPRest, pageContext: PageContext, expire: Date = dateAdd(new Date(), 'year', 1)): Promise<IHubSite> {
        try {
            const { hubSiteId } = pageContext.legacyPageContext;
            try {
                const { SiteUrl } = await (await fetch(`${pageContext.web.absoluteUrl}/_api/HubSites/GetById('${hubSiteId}')`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json;odata=nometadata'
                    },
                    credentials: 'include',
                })).json();
                return ({ url: SiteUrl, web: new Web(SiteUrl) });
            } catch (error) { }
            let url = await this.storage.local.getOrPut(`hubsite_${hubSiteId.replace(/-/g, '')}_url`, async () => {
                let { PrimarySearchResults } = await sp.search({
                    Querytext: `SiteId:${hubSiteId} contentclass:STS_Site`,
                    SelectProperties: ['Path'],
                });
                return PrimarySearchResults[0] ? PrimarySearchResults[0].Path : '';
            }, expire);
            return ({ url, web: new Web(url) });
        } catch (err) {
            throw err;
        }
    }
}

export { IHubSite };
export default new HubSiteService();