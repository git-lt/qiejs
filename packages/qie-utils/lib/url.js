"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/unshiftio/url-parse/blob/master/test/test.js
var url_parse_1 = __importDefault(require("url-parse"));
/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 * @example getUrlParam('name') // 'aaa'
 */
function getUrlParam(key, path) {
    var query = url_parse_1.default(path || window.location.href).query;
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
    var urllist = url.split("/").filter(function (i) { return i; });
    return urllist.map(function (_item, index) {
        return "/" + urllist.slice(0, index + 1).join("/");
    });
}
/**
 * 删除 查询参数
 * @param path
 * @param key
 */
function removeParam(key, path) {
    var parse = url_parse_1.default(path || window.location.href);
    delete parse.query[key];
    parse.set("query", parse.query);
    return parse.toString();
}
/**
 * 添加 查询参数
 * @param path
 * @param key
 */
function addParam(key, value, path) {
    var parse = url_parse_1.default(path || window.location.href);
    parse.query[key] = value;
    parse.set("query", parse.query);
    return parse.toString();
}
/**
 * 更新 查询参数
 * @param path
 * @param key
 */
function updateParam(key, value, path) {
    return addParam(key, value, path);
}
/**
 * 对象转URL参数
 * @param obj JSON对象
 * @example {a:1, b:2} => a=1&b=2
 */
function obj2pms(obj) {
    return Object.keys(obj)
        .map(function (v) { return v + "=" + obj[v]; })
        .join("&");
}
/**
 * 构建跳转链接
 * @param path 路径
 * @param params JSON对象
 * @example buildUrl('/login', {from: 'home'}) => '/login?from=home'
 */
function buildUrl(path, params) {
    var useAnd = path.indexOf("?") > -1;
    var pms = obj2pms(params);
    var url = "" + path + (useAnd ? "&" : "?") + pms;
    return url;
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
    buildUrl: buildUrl
};
