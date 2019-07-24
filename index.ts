import { Web } from '@pnp/sp';

export interface IHubSite {
    url: string;
    web: Web;
}

export class HubSiteService {

    public async GetHubSiteById(webUrl: string, id: string): Promise<IHubSite> {
        try {
            const response = await fetch(`${webUrl}/_api/HubSites/GetById('${id}')`, {
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