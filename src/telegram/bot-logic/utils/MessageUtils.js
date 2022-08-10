"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var MessageUtils = /** @class */ (function () {
    function MessageUtils() {
        this.client = new telegraf_1.Telegraf(process.env.TOKEN_TG
            ? process.env.TOKEN_TG
            : 'null');
        this.onLaunch();
        this.onMessage();
    }
    MessageUtils.prototype.sendDmMessage = function (chatId, message) {
        this.client.telegram.sendMessage(chatId, message)
            .catch(function (err) { return console.error(err); });
    };
    MessageUtils.prototype.onMessage = function () {
        this.client.on('message', function () {
            console.log('Incoming msg');
        });
    };
    MessageUtils.prototype.onLaunch = function () {
        this.client.launch()
            .then(function () { return console.log('TG app started'); })
            .catch(function (err) { return console.error(err); });
    };
    return MessageUtils;
}());
exports.default = new MessageUtils();
