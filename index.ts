import { dateAdd, PnPClientStorage } from '@pnp/core'
import { spfi, SPFx } from '@pnp/sp'
import { IHubSiteContext } from './types'
import '@pnp/sp/search'

export default new class HubSiteService {
    storage: PnPClientStorage

    constructor() {
        this.storage = new PnPClientStorage()
    }
    /**
     * Get hub site
     * 
     * @param spfxContext - SPFx content
     * @param expire - Optional, if provided the expiration of the item, otherwise the default (1 year) is used
     */
    public async GetHubSite(spfxContext: any, expire: Date = dateAdd(new Date(), 'year', 1)): Promise<IHubSiteContext> {
        try {
            let sp = spfi().using(SPFx(spfxContext))
            const hubSiteId = spfxContext.pageContext.legacyPageContext.hubSiteId || ''
            try {
                const { SiteUrl } = await (await fetch(`${spfxContext.pageContext.web.absoluteUrl}/_api/HubSites/GetById('${hubSiteId}')`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json;odata=nometadata'
                    },
                    credentials: 'include',
                })).json()
                sp = spfi(SiteUrl).using(SPFx(spfxContext))
                return { url: SiteUrl, sp, web: sp.web }
            } catch (error) { }
            const url = await this.storage.local.getOrPut(`hubsite_${hubSiteId.replace(/-/g, '')}_url`, async () => (await sp.search({
                Querytext: `SiteId:${hubSiteId} contentclass:STS_Site`,
                SelectProperties: ['Path'],
            })).PrimarySearchResults[0]?.Path ?? '', expire)
            sp = spfi(url).using(SPFx(spfxContext))
            return { url, sp, web: sp.web }
        } catch (err) {
            throw err
        }
    }
}

export * from './types'
