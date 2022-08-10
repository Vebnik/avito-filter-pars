"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cp = require("child_process");
var path = require("path");
var parsApp = function () {
    var worker = cp.fork(path.join('src', 'selenium', 'ParsItem.js'));
    worker.on('exit', function (code, signal) {
        console.log("worker stop\nCode".concat(code, "\nSignal").concat(signal));
    });
};
parsApp();
