import url from "url-parse";
/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 * @example getUrlParam('name') // 'aaa'
 */
declare function getUrlParam(key?: string, path?: string): string | {
    [key: string]: string;
};
/**
 * url 拼接
 * @param href url地址
 * @param path 路径
 * @example resolve('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
declare function resolve(href: string, path: string): string;
declare function urlToList(url: string): string[];
/**
 * 删除 查询参数
 * @param path
 * @param key
 */
declare function removeParam(key: string, path?: string): string;
/**
 * 添加 查询参数
 * @param path
 * @param key
 */
declare function addParam(key: string, value: string, path?: string): string;
/**
 * 更新 查询参数
 * @param path
 * @param key
 */
declare function updateParam(key: string, value: string, path?: string): string;
/**
 * 对象转URL参数
 * @param obj JSON对象
 * @example {a:1, b:2} => a=1&b=2
 */
declare function obj2pms(obj: any): string;
/**
 * 构建跳转链接
 * @param path 路径
 * @param params JSON对象
 * @example buildUrl('/login', {from: 'home'}) => '/login?from=home'
 */
declare function buildUrl(path: string, params: any): string;
declare const _default: {
    url: {
        (address: string, parser?: boolean | url.QueryParser): url;
        (address: string, location?: string | object, parser?: boolean | url.QueryParser): url;
        new (address: string, parser?: boolean | url.QueryParser): url;
        new (address: string, location?: string | object, parser?: boolean | url.QueryParser): url;
        extractProtocol(url: string): {
            slashes: boolean;
            protocol: string;
            rest: string;
        };
        location(url: string): object;
        qs: {
            parse: url.QueryParser;
            stringify: url.StringifyQuery;
        };
    };
    getUrlParam: typeof getUrlParam;
    resolve: typeof resolve;
    urlToList: typeof urlToList;
    removeParam: typeof removeParam;
    addParam: typeof addParam;
    updateParam: typeof updateParam;
    obj2pms: typeof obj2pms;
    buildUrl: typeof buildUrl;
};
export default _default;
