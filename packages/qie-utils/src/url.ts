// https://github.com/unshiftio/url-parse/blob/master/test/test.js
import url from "url-parse";

export { url };

/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 */
export function getUrlParam(key?: string, path?: string) {
  const query = url(path || window.location.href).query;
  return !!key ? query[key] : query;
}

/**
 * url 拼接
 * @param href url 地址
 * @param path 路径
 * @example ('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
export function resolve(href: string, path: string) {
  return url(path, href).pathname;
}

export function urlToList(url: string): string[] {
  const urllist = url.split("/").filter(i => i);
  return urllist.map((_item, index) => {
    return `/${urllist.slice(0, index + 1).join("/")}`;
  });
}

/**
 * 删除 查询参数
 * @param path
 * @param key
 */
export function removeParam(key: string, path: string): string {
  const parse = url(path || window.location.href);
  delete parse.query[key];
  parse.set("query", parse.query);
  return parse.toString();
}

/**
 * 添加 查询参数
 * @param path
 * @param key
 */
export function addParam(key: string, value: string, path?: string): string {
  const parse = url(path || window.location.href);
  parse.query[key] = value;
  parse.set("query", parse.query);
  return parse.toString();
}

/**
 * 更新 查询参数
 * @param path
 * @param key
 */
export function updateParam(key: string, value: string, path?: string): string {
  return addParam(key, value, path);
}

// 对象转URL参数 {a:1, b:2} => a=1&b=2
export function obj2pms(obj: any) {
  return Object.keys(obj)
    .map(v => `${v}=${obj[v]}`)
    .join("&");
}

// 构建跳转链接
export function buildUrl(path: string, params: any): string {
  const useAnd = path.indexOf("?") > -1;
  const pms = obj2pms(params);
  const url = `${path}${useAnd ? "&" : "?"}${pms}`;
  return url;
}
