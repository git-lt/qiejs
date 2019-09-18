"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ua = window.navigator.userAgent;
exports.isAndroid = Boolean(ua.match(/android/gi));
exports.isIphone = Boolean(ua.match(/iphone|ipod/gi));
exports.isIpad = Boolean(ua.match(/ipad/gi));
exports.isWx = Boolean(ua.match(/MicroMessenger/gi));
exports.isAli = Boolean(ua.match(/AlipayClient/gi));
exports.isPhone = Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(ua));
