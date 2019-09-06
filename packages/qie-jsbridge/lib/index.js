"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 初始化
const onReady = (callback) => {
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
const registerNativeMethod = (actionType, params) => {
    return new Promise(resolve => {
        onReady(bridge => {
            console.warn(actionType, params);
            bridge.callHandler(actionType, params, resolve);
        });
    });
};
// 注册 JS 方法
const registerMethod = (methodName, methodFunc) => {
    onReady(bridge => {
        bridge.registerHandler(methodName, methodFunc);
    });
};
exports.registerMethod = registerMethod;
// 获取用户信息
const getUserInfo = () => registerNativeMethod("getUserInfo" /* GET_USER_INFO */, null);
exports.getUserInfo = getUserInfo;
const routerTo = (params) => registerNativeMethod("routerTo" /* ROUTER_TO */, params);
exports.routerTo = routerTo;
// 调用 Native 跳转至 H5
const routerToH5 = (url, title) => {
    const params = { pageName: "webview", data: { url, title } };
    registerNativeMethod("routerTo" /* ROUTER_TO */, params);
};
exports.routerToH5 = routerToH5;
// 登录
const login = () => registerNativeMethod("routerTo" /* ROUTER_TO */, { pageName: "login" /* LOGIN */ });
exports.login = login;
// 更新用户信息
const updateUser = () => registerNativeMethod("updateUser" /* UPDATE_USER */, null);
exports.updateUser = updateUser;
// 更新用户信息
const goHome = () => registerNativeMethod("routerTo" /* ROUTER_TO */, { pageName: "home" /* HOME */ });
exports.goHome = goHome;
const privewFiles = (params) => {
    const pms = { pageName: "filesBrowser" /* FILES_BROWSER */, data: params };
    registerNativeMethod("routerTo" /* ROUTER_TO */, pms);
};
exports.privewFiles = privewFiles;
// 微信分享
const wxShare = (params) => registerNativeMethod("wxShare" /* WX_SHARE */, params);
exports.wxShare = wxShare;
const wxShareImg = (params) => registerNativeMethod("wxShareImg" /* WX_SHARE_IMG */, params);
exports.wxShareImg = wxShareImg;
const setNavRight = (params) => registerNativeMethod("setNavRight" /* SET_NAV_RIGHT */, params);
exports.setNavRight = setNavRight;
const appleIAP = (params) => registerNativeMethod("appleIAP" /* APPLE_IAP */, params);
exports.appleIAP = appleIAP;
const goBack = () => registerNativeMethod("goBack" /* GO_BACK */, null);
exports.goBack = goBack;
const getImage = (params) => registerNativeMethod("getImage" /* GET_IMAGE */, params);
exports.getImage = getImage;
