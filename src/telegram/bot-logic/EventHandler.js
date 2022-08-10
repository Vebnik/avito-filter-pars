"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventHandler = /** @class */ (function () {
    function EventHandler() {
    }
    EventHandler.prototype.messageEvent = function (context) {
        //console.log(context.message)
    };
    EventHandler.prototype.commandEvent = function (context) {
        //console.log(context)
    };
    return EventHandler;
}());
exports.default = new EventHandler();
