"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var sp_1 = require("@pnp/sp");
var common_1 = require("@pnp/common");
exports.default = new /** @class */ (function () {
    function HubSiteService() {
        this.storage = new common_1.PnPClientStorage();
    }
    /**
     * Get hub site
     *
     * @param {SPRest} sp Sp
     * @param {PageContext} pageContext Page context
     * @param {Date} expire Expire
     */
    HubSiteService.prototype.GetHubSite = function (sp, pageContext, expire) {
        if (expire === void 0) { expire = common_1.dateAdd(new Date(), 'year', 1); }
        return __awaiter(this, void 0, void 0, function () {
            var hubSiteId_1, SiteUrl, error_1, url, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        hubSiteId_1 = pageContext.legacyPageContext.hubSiteId || '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(pageContext.web.absoluteUrl + "/_api/HubSites/GetById('" + hubSiteId_1 + "')", {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json;odata=nometadata'
                                },
                                credentials: 'include',
                            })];
                    case 2: return [4 /*yield*/, (_a.sent()).json()];
                    case 3:
                        SiteUrl = (_a.sent()).SiteUrl;
                        return [2 /*return*/, ({ url: SiteUrl, web: new sp_1.Web(SiteUrl) })];
                    case 4:
                        error_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.storage.local.getOrPut("hubsite_" + hubSiteId_1.replace(/-/g, '') + "_url", function () { return __awaiter(_this, void 0, void 0, function () {
                            var PrimarySearchResults;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sp.search({
                                            Querytext: "SiteId:" + hubSiteId_1 + " contentclass:STS_Site",
                                            SelectProperties: ['Path'],
                                        })];
                                    case 1:
                                        PrimarySearchResults = (_a.sent()).PrimarySearchResults;
                                        return [2 /*return*/, PrimarySearchResults[0] ? PrimarySearchResults[0].Path : ''];
                                }
                            });
                        }); }, expire)];
                    case 6:
                        url = _a.sent();
                        return [2 /*return*/, ({ url: url, web: new sp_1.Web(url) })];
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
//# sourceMappingURL=index.js.map