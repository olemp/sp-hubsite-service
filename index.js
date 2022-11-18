"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@pnp/core");
var sp_1 = require("@pnp/sp");
require("@pnp/sp/search");
exports.default = new /** @class */ (function () {
    function HubSiteService() {
        this.storage = new core_1.PnPClientStorage();
    }
    /**
     * Get hub site
     *
     * @param spfxContext - SPFx content
     * @param expire - Optional, if provided the expiration of the item, otherwise the default (1 year) is used
     */
    HubSiteService.prototype.GetHubSite = function (spfxContext, expire) {
        if (expire === void 0) { expire = (0, core_1.dateAdd)(new Date(), 'year', 1); }
        return __awaiter(this, void 0, void 0, function () {
            var sp_2, hubSiteId_1, SiteUrl, error_1, url, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        sp_2 = (0, sp_1.spfi)().using((0, sp_1.SPFx)(spfxContext));
                        hubSiteId_1 = spfxContext.pageContext.legacyPageContext.hubSiteId || '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(spfxContext.pageContext.web.absoluteUrl, "/_api/HubSites/GetById('").concat(hubSiteId_1, "')"), {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/jsonodata=nometadata'
                                },
                                credentials: 'include',
                            })];
                    case 2: return [4 /*yield*/, (_a.sent()).json()];
                    case 3:
                        SiteUrl = (_a.sent()).SiteUrl;
                        sp_2 = (0, sp_1.spfi)(SiteUrl).using((0, sp_1.SPFx)(spfxContext));
                        return [2 /*return*/, { url: SiteUrl, sp: sp_2, web: sp_2.web }];
                    case 4:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.storage.local.getOrPut("hubsite_".concat(hubSiteId_1.replace(/-/g, ''), "_url"), function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, sp_2.search({
                                            Querytext: "SiteId:".concat(hubSiteId_1, " contentclass:STS_Site"),
                                            SelectProperties: ['Path'],
                                        })];
                                    case 1: return [2 /*return*/, (_b = (_a = (_c.sent()).PrimarySearchResults[0]) === null || _a === void 0 ? void 0 : _a.Path) !== null && _b !== void 0 ? _b : ''];
                                }
                            });
                        }); }, expire)];
                    case 6:
                        url = _a.sent();
                        sp_2 = (0, sp_1.spfi)(url).using((0, sp_1.SPFx)(spfxContext));
                        return [2 /*return*/, { url: url, sp: sp_2, web: sp_2.web }];
                    case 7:
                        err_1 = _a.sent();
                        throw err_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return HubSiteService;
}());
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map