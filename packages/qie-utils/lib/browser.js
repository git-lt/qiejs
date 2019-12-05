"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ua = window.navigator.userAgent;
exports.isAndroid = /android/gi.test(ua);
exports.isIphone = /iphone|ipod/gi.test(ua);
exports.isIpad = /ipad/gi.test(ua);
exports.isWx = /MicroMessenger/gi.test(ua);
exports.isAli = /AlipayClient/gi.test(ua);
exports.isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(ua);
