"use strict";
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
var Logic_1 = require("./selenium/Logic");
var fs = require("fs");
var rootUrl = function (page) { return "https://www.avito.ru/irkutsk/kvartiry/prodam/2-komnatnye/vtorichka-ASgBAQICAUSSA8YQAkDmBxSMUsoIFIJZ?cd=1&district=391-392-393&f=ASgBAQECAUSSA8YQAkDmBxSMUsoIFIJZAUXGmgwdeyJmcm9tIjoxMDAwMDAwLCJ0byI6NDUwMDAwMH0&p=".concat(page, "&s=104"); };
var getItem = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var driver;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                driver = new Logic_1.default('getItem');
                return [4 /*yield*/, driver.get(rootUrl(page))];
            case 1:
                _a.sent();
                return [4 /*yield*/, driver.querySelectorAll('[data-marker="item"]')
                        .then(function (webEls) { return __awaiter(void 0, void 0, void 0, function () {
                        var urls, getDescription;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, driver.querySelectorAll('[data-marker="item-title"]')
                                        .then(function (webEls) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/, webEls.map(function (el) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, el.getAttribute('href')];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            }); }); })];
                                    }); }); })];
                                case 1:
                                    urls = _a.sent();
                                    return [4 /*yield*/, Promise.all(urls)];
                                case 2:
                                    _a.sent();
                                    getDescription = webEls.map(function (el, index) { return el.getText()
                                        .then(function (str) { return __awaiter(void 0, void 0, void 0, function () {
                                        var splitDescription, _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    splitDescription = str.split('\n');
                                                    _b = (_a = splitDescription).push;
                                                    return [4 /*yield*/, urls[index]];
                                                case 1:
                                                    _b.apply(_a, [_c.sent()]);
                                                    return [2 /*return*/, splitDescription];
                                            }
                                        });
                                    }); }); });
                                    return [4 /*yield*/, Promise.all(getDescription)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, getDescription];
                            }
                        });
                    }); })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getPages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var driver;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                driver = new Logic_1.default('getPages');
                return [4 /*yield*/, driver.get(rootUrl(1))];
            case 1:
                _a.sent();
                return [2 /*return*/, driver.querySelector('[data-marker="pagination-button"]')
                        .then(function (webEl) { return webEl.getText()
                        .then(function (str) { return str.split('.').at(-2).replace(/\D/gmi, ''); }); })];
        }
    });
}); };
var startApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPages()
                    .then(function (pages) { return __awaiter(void 0, void 0, void 0, function () {
                    var promiseArr, i, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                promiseArr = [];
                                i = 1;
                                _d.label = 1;
                            case 1:
                                if (!(i <= +pages)) return [3 /*break*/, 4];
                                _b = (_a = promiseArr.push).apply;
                                _c = [promiseArr];
                                return [4 /*yield*/, getItem(i)];
                            case 2:
                                _b.apply(_a, _c.concat([(_d.sent())]));
                                _d.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [4 /*yield*/, Promise.all(promiseArr)];
                            case 5:
                                _d.sent();
                                return [2 /*return*/, promiseArr];
                        }
                    });
                }); })
                    .then(function (fullField) { return __awaiter(void 0, void 0, void 0, function () {
                    var convertToArrayFromPromise, _i, fullField_1, el, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                convertToArrayFromPromise = [];
                                _i = 0, fullField_1 = fullField;
                                _c.label = 1;
                            case 1:
                                if (!(_i < fullField_1.length)) return [3 /*break*/, 4];
                                el = fullField_1[_i];
                                _b = (_a = convertToArrayFromPromise).push;
                                return [4 /*yield*/, el];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                _c.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [4 /*yield*/, fs.writeFile('avito_home.json', JSON.stringify(convertToArrayFromPromise, null, 2), function (err) { return console.error(err); })];
                            case 5:
                                _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
startApp().catch(function (err) { return console.error(err.message); });
