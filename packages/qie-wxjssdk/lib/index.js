"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wechat_jssdk_ts_1 = __importDefault(require("wechat-jssdk-ts"));
/**
 * JS-SDK初始化
 * @param config 配置
 * @example wx.readyAsync().then()
 */
var readyAsync = function (config) {
    return new Promise(function (resolve, reject) {
        wechat_jssdk_ts_1.default.config(config);
        wechat_jssdk_ts_1.default.ready(resolve);
        wechat_jssdk_ts_1.default.error(reject);
    });
};
/**
 * 微信分享
 * @param types 类型 ['timeline', 'appMessage']
 * @param option
 */
var shareAsync = function (types, option) {
    var wxShareMessage = wechat_jssdk_ts_1.default.onMenuShareAppMessage || wechat_jssdk_ts_1.default.updateAppMessageShareData;
    var wxShareTimeline = wechat_jssdk_ts_1.default.onMenuShareTimeline || wechat_jssdk_ts_1.default.updateTimelineShareData;
    var title = option.title, desc = option.desc, link = option.link, imgUrl = option.imgUrl;
    return new Promise(function (resolve, reject) {
        var options = {
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: resolve,
            cancel: reject,
        };
        types.indexOf('appMessage') > -1 && wxShareMessage(options);
        types.indexOf('timeline') > -1 && wxShareTimeline(options);
    });
};
/**
 * Promise版本 支付
 * @param option
 */
var payAsync = function (option) {
    if (typeof window.WeixinJSBridge === 'undefined')
        return Promise.reject('fail');
    return new Promise(function (resove, reject) {
        window.WeixinJSBridge.invoke('getBrandWCPayRequest', option, function (res) {
            // get_brand_wcpay_request:ok
            var msg = res.err_msg ? res.err_msg.split(':')[1] : 'fail';
            msg === 'ok' ? resove(msg) : reject(msg);
        });
    });
};
/**
 * 隐藏分享按钮(不需要 initConfig)
 */
var hideShareMenus = function () {
    if (typeof window.WeixinJSBridge === 'undefined')
        return;
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        window.WeixinJSBridge.call('hideOptionMenu');
    });
};
/**
 * 隐藏底部导航栏
 */
var hideToolbar = function () {
    if (typeof window.WeixinJSBridge === 'undefined')
        return;
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        window.WeixinJSBridge.call('hideToolbar');
    });
};
exports.default = __assign({ readyAsync: readyAsync, shareAsync: shareAsync, payAsync: payAsync, hideShareMenus: hideShareMenus, hideToolbar: hideToolbar }, wechat_jssdk_ts_1.default);
