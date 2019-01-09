import { Web } from '@pnp/sp';
export interface IHubSite {
    url: string;
    web: Web;
}
export declare class HubSiteService {
    GetHubSiteById(webUrl: string, id: string): Promise<IHubSite>;
}
declare const _default: HubSiteService;
export default _default;
