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
var Logic_1 = require("./Logic");
var fs = require("fs");
var path = require("path");
var TempStore_1 = require("../database/TempStore");
var MessageUtils_1 = require("../telegram/bot-logic/utils/MessageUtils");
var checkDataItem = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var newHome, write;
    return __generator(this, function (_a) {
        newHome = function () {
            console.log("NewHome\n".concat(data.at(-1)));
            MessageUtils_1.default.sendDmMessage('978068405', data.join('\n'));
            TempStore_1.default.lastHome = data;
        };
        write = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.writeFile(path.join('src', 'database', 'avito_home.json'), JSON.stringify(data, null, 2), function (err) { return console.error(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        write().catch(function (err) { return console.error(err); });
        TempStore_1.default.lastHome.at(-1) === data.at(-1)
            ? console.log('Current')
            : newHome();
        return [2 /*return*/];
    });
}); };
var getFreshData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var driver, targetItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                driver = new Logic_1.default('ParsItem');
                return [4 /*yield*/, driver.get(process.env.ROOT_URL)];
            case 1:
                _a.sent();
                return [4 /*yield*/, driver.querySelector('[data-marker="item"]')
                        .then(function (webEl) { return __awaiter(void 0, void 0, void 0, function () {
                        var url;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, driver.querySelector('[data-marker="item-title"]')
                                        .then(function (webEl) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/, webEl.getAttribute('href')];
                                    }); }); })];
                                case 1:
                                    url = _a.sent();
                                    return [4 /*yield*/, Promise.all([url])];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, webEl.getText()
                                            .then(function (str) { return __awaiter(void 0, void 0, void 0, function () {
                                            var splitDescription;
                                            return __generator(this, function (_a) {
                                                splitDescription = str.split('\n');
                                                splitDescription.push(url);
                                                return [2 /*return*/, splitDescription];
                                            });
                                        }); })];
                                case 3: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            case 2:
                targetItem = _a.sent();
                return [4 /*yield*/, checkDataItem(targetItem)];
            case 3:
                _a.sent();
                return [4 /*yield*/, driver.getDriver().quit()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
setInterval(function () {
    getFreshData().catch(function (err) { return console.error(err); });
}, 3 * 60 * 1000);
