import url from 'url-parse';
/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 * @example getUrlParam('name') // 'aaa'
 */
declare function getUrlParam(key: string, path?: string): string;
declare function getUrlParam(key?: string, path?: string): string | Record<string, string>;
/**
 * url 拼接
 * @param href url地址
 * @param path 路径
 * @example resolve('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
declare function resolve(href: string, path: string): string;
declare function urlToList(url: string): string[];
/**
 * 删除 查询参数 (hash路径不适用)
 * @param keys 要删除的 key 的集合
 * @param path 地址，默认为当前地址
 */
declare function removeParam(keys: string[], path?: string): string;
/**
 * 添加 查询参数(hash路径不适用)
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
declare function addParam(params: Record<string, any>, path?: string): string;
/**
 * 更新 查询参数(hash路径不适用)
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
declare function updateParam(params: Record<string, any>, path?: string): string;
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
interface RouterOption {
    path: string;
    query?: Record<string, any>;
}
/**
 * location.href
 * @param options {path: '', query: {}} | url: string
 * @example push('/login') 或 push('/login',{name: 'a'})
 */
declare function push(options: RouterOption | string): void;
/**
 * location.replace
 * @param options {path: '', query: {}} | url: string
 * @example replace('/login') 或 replace('/login',{name: 'a'})
 */
declare function replace(options: RouterOption | string): void;
/**
 * history.go
 * @param num
 * @example 回退：go(-1)
 */
declare function go(num: number): void;
/**
 * 微信网页授权
 * @param appId
 * @example if(!sessionStorage.getItem('code')) doWxAuth('xxxx')
 */
declare function doWxAuth(appid: string): void;
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
    push: typeof push;
    replace: typeof replace;
    go: typeof go;
    doWxAuth: typeof doWxAuth;
};
export default _default;
