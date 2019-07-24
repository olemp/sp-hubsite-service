import { Web } from '@pnp/sp';
import { PageContext } from '@microsoft/sp-page-context';
export interface IHubSite {
    url: string;
    web: Web;
}
export declare class HubSiteService {
    GetHubSite(pageContext: PageContext): Promise<IHubSite>;
}
declare const _default: HubSiteService;
export default _default;
