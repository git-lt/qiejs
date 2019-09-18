import url from "url-parse";
export { url };
/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 */
export declare function getUrlParam(key?: string, path?: string): string | {
    [key: string]: string;
};
/**
 * url 拼接
 * @param href url 地址
 * @param path 路径
 * @example ('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
export declare function resolve(href: string, path: string): string;
export declare function urlToList(url: string): string[];
/**
 * 删除 查询参数
 * @param path
 * @param key
 */
export declare function removeParam(key: string, path: string): string;
/**
 * 添加 查询参数
 * @param path
 * @param key
 */
export declare function addParam(key: string, value: string, path?: string): string;
/**
 * 更新 查询参数
 * @param path
 * @param key
 */
export declare function updateParam(key: string, value: string, path?: string): string;
export declare function obj2pms(obj: any): string;
export declare function buildUrl(path: string, params: any): string;
