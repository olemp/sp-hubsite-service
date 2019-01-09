export class HubSiteService {
    public async GetHubSiteById(webUrl: string, id: string): Promise<any> {
        const response: Response = await fetch(`${webUrl}/_api/HubSites/GetById('${id}')`, {
            method: 'GET',
            headers: {
                Accept: 'application/json;odata=nometadata'
            },
        });
        const json: any = await response.json();
        return json;
    }
}

export default new HubSiteService();