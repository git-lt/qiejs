"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/unshiftio/url-parse/blob/master/test/test.js
var url_parse_1 = __importDefault(require("url-parse"));
function getUrlParam(key, path) {
    var query = url_parse_1.default(path || window.location.href, true).query;
    return !!key ? query[key] : query;
}
/**
 * url 拼接
 * @param href url地址
 * @param path 路径
 * @example resolve('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
function resolve(href, path) {
    return url_parse_1.default(path, href).pathname;
}
function urlToList(url) {
    var urllist = url.split('/').filter(function (i) { return i; });
    return urllist.map(function (_item, index) {
        return "/" + urllist.slice(0, index + 1).join('/');
    });
}
/**
 * 删除 查询参数
 * @param keys 要删除的 key 的集合
 * @param path 地址，默认为当前地址
 */
function removeParam(keys, path) {
    var parse = url_parse_1.default(path || window.location.href, true);
    keys.forEach(function (v) {
        delete parse.query[v];
    });
    parse.set('query', parse.query);
    return parse.toString();
}
/**
 * 添加 查询参数
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
function addParam(params, path) {
    var parse = url_parse_1.default(path || window.location.href, true);
    Object.keys(params).forEach(function (v) {
        parse.query[v] = params[v];
    });
    parse.set('query', parse.query);
    return parse.toString();
}
/**
 * 更新 查询参数
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
function updateParam(params, path) {
    return addParam(params, path);
}
/**
 * 对象转URL参数
 * @param obj JSON对象
 * @example {a:1, b:2} => a=1&b=2
 */
function obj2pms(obj) {
    return Object.keys(obj)
        .map(function (v) { return v + "=" + obj[v]; })
        .join('&');
}
/**
 * 构建跳转链接
 * @param path 路径
 * @param params JSON对象
 * @example buildUrl('/login', {from: 'home'}) => '/login?from=home'
 */
function buildUrl(path, params) {
    var useAnd = path.indexOf('?') > -1;
    var pms = obj2pms(params);
    var url = "" + path + (useAnd ? '&' : '?') + pms;
    return url;
}
function createUrl(options) {
    var url = '';
    if (typeof options === 'string') {
        url = options;
    }
    else {
        url = buildUrl(options.path, options.query || {});
    }
    return url;
}
/**
 * location.href
 * @param options {path: '', query: {}} | url: string
 * @example push('/login') 或 push('/login',{name: 'a'})
 */
function push(options) {
    var url = createUrl(options);
    window.location.href = url;
}
/**
 * location.replace
 * @param options {path: '', query: {}} | url: string
 * @example replace('/login') 或 replace('/login',{name: 'a'})
 */
function replace(options) {
    var url = createUrl(options);
    window.location.replace(url);
}
/**
 * history.go
 * @param num
 * @example 回退：go(-1)
 */
function go(num) {
    window.history.go(num);
}
/**
 * 微信网页授权
 * @param appId
 * @example if(!sessionStorage.getItem('code')) doWxAuth('xxxx')
 */
function doWxAuth(appId) {
    var code = getUrlParam('code');
    if (code) {
        window.sessionStorage.setItem('code', code);
        var originUrl = removeParam(['code', 'state']);
        window.location.replace(originUrl);
        return;
    }
    var pms = {
        appId: appId,
        redirect_uri: encodeURIComponent(window.location.href),
        response_type: 'code',
        connect_redirect: 1,
        state: 'STATE',
        scope: 'snsapi_userinfo',
    };
    var authPath = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    var url = buildUrl(authPath, pms) + '#wechat_redirect';
    window.location.replace(url);
}
exports.default = {
    url: url_parse_1.default,
    getUrlParam: getUrlParam,
    resolve: resolve,
    urlToList: urlToList,
    removeParam: removeParam,
    addParam: addParam,
    updateParam: updateParam,
    obj2pms: obj2pms,
    buildUrl: buildUrl,
    push: push,
    replace: replace,
    go: go,
    doWxAuth: doWxAuth,
};
