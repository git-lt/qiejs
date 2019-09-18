"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 初始化
var onReady = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "qiebridge://__bridge_loaded__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe);
    }, 0);
};
exports.onReady = onReady;
// 注册 Native 方法
var registerNativeMethod = function (actionType, params) {
    return new Promise(function (resolve) {
        onReady(function (bridge) {
            console.warn(actionType, params);
            bridge.callHandler(actionType, params, resolve);
        });
    });
};
// 注册 JS 方法
var registerMethod = function (methodName, methodFunc) {
    onReady(function (bridge) {
        bridge.registerHandler(methodName, methodFunc);
    });
};
exports.registerMethod = registerMethod;
// 获取用户信息
var getUserInfo = function () { return registerNativeMethod("getUserInfo" /* GET_USER_INFO */, null); };
exports.getUserInfo = getUserInfo;
var routerTo = function (params) {
    return registerNativeMethod("routerTo" /* ROUTER_TO */, params);
};
exports.routerTo = routerTo;
// 调用 Native 跳转至 H5
var routerToH5 = function (url, title) {
    var params = { pageName: "webview", data: { url: url, title: title } };
    registerNativeMethod("routerTo" /* ROUTER_TO */, params);
};
exports.routerToH5 = routerToH5;
// 登录
var login = function () {
    return registerNativeMethod("routerTo" /* ROUTER_TO */, { pageName: "login" /* LOGIN */ });
};
exports.login = login;
// 更新用户信息
var updateUser = function () { return registerNativeMethod("updateUser" /* UPDATE_USER */, null); };
exports.updateUser = updateUser;
// 更新用户信息
var goHome = function () {
    return registerNativeMethod("routerTo" /* ROUTER_TO */, { pageName: "home" /* HOME */ });
};
exports.goHome = goHome;
var privewFiles = function (params) {
    var pms = { pageName: "filesBrowser" /* FILES_BROWSER */, data: params };
    registerNativeMethod("routerTo" /* ROUTER_TO */, pms);
};
exports.privewFiles = privewFiles;
// 微信分享
var wxShare = function (params) {
    return registerNativeMethod("wxShare" /* WX_SHARE */, params);
};
exports.wxShare = wxShare;
var wxShareImg = function (params) {
    return registerNativeMethod("wxShareImg" /* WX_SHARE_IMG */, params);
};
exports.wxShareImg = wxShareImg;
var setNavRight = function (params) {
    return registerNativeMethod("setNavRight" /* SET_NAV_RIGHT */, params);
};
exports.setNavRight = setNavRight;
var appleIAP = function (params) {
    return registerNativeMethod("appleIAP" /* APPLE_IAP */, params);
};
exports.appleIAP = appleIAP;
var goBack = function () { return registerNativeMethod("goBack" /* GO_BACK */, null); };
exports.goBack = goBack;
var getImage = function (params) {
    return registerNativeMethod("getImage" /* GET_IMAGE */, params);
};
exports.getImage = getImage;
