import { Web } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';

export interface IHubSite {
    url: string;
    web: Web;
}

export class HubSiteService {
    public async GetHubSite(pageContext: PageContext): Promise<IHubSite> {
        try {
            const response = await fetch(`${pageContext.web.absoluteUrl}/_api/HubSites/GetById('${pageContext.legacyPageContext.hubSiteId}')`, {
                method: 'GET',
                headers: { Accept: 'application/json;odata=nometadata' },
                credentials: 'include',
            });
            const { SiteUrl } = await response.json();
            return { url: SiteUrl, web: new Web(SiteUrl) };
        } catch (err) {
            throw err;
        }
    }
}

export default new HubSiteService();