"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/unshiftio/url-parse/blob/master/test/test.js
var url_parse_1 = __importDefault(require("url-parse"));
exports.url = url_parse_1.default;
/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 */
function getUrlParam(key, path) {
    var query = url_parse_1.default(path || window.location.href).query;
    return !!key ? query[key] : query;
}
exports.getUrlParam = getUrlParam;
/**
 * url 拼接
 * @param href url 地址
 * @param path 路径
 * @example ('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
function resolve(href, path) {
    return url_parse_1.default(path, href).pathname;
}
exports.resolve = resolve;
function urlToList(url) {
    var urllist = url.split("/").filter(function (i) { return i; });
    return urllist.map(function (_item, index) {
        return "/" + urllist.slice(0, index + 1).join("/");
    });
}
exports.urlToList = urlToList;
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
exports.removeParam = removeParam;
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
exports.addParam = addParam;
/**
 * 更新 查询参数
 * @param path
 * @param key
 */
function updateParam(key, value, path) {
    return addParam(key, value, path);
}
exports.updateParam = updateParam;
// 对象转URL参数 {a:1, b:2} => a=1&b=2
function obj2pms(obj) {
    return Object.keys(obj)
        .map(function (v) { return v + "=" + obj[v]; })
        .join("&");
}
exports.obj2pms = obj2pms;
// 构建跳转链接
function buildUrl(path, params) {
    var useAnd = path.indexOf("?") > -1;
    var pms = obj2pms(params);
    var url = "" + path + (useAnd ? "&" : "?") + pms;
    return url;
}
exports.buildUrl = buildUrl;
