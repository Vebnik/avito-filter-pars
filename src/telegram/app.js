"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var StartApp_1 = require("./bot-logic/StartApp");
var client = new telegraf_1.Telegraf(process.env.TOKEN_TG
    ? process.env.TOKEN_TG
    : 'null');
StartApp_1.default.launchApp(client);
