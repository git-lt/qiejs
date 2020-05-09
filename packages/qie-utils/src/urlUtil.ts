// https://github.com/unshiftio/url-parse/blob/master/test/test.js
import url from 'url-parse';

/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 * @example getUrlParam('name') // 'aaa'
 */
function getUrlParam(key?: string, path?: string) {
  const query = url(path || window.location.href, true).query;
  return !!key ? query[key] : query;
}

/**
 * url 拼接
 * @param href url地址
 * @param path 路径
 * @example resolve('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
function resolve(href: string, path: string) {
  return url(path, href).pathname;
}

function urlToList(url: string): string[] {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map((_item, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

/**
 * 删除 查询参数
 * @param path
 * @param key
 */
function removeParam(key: string, path?: string): string {
  const parse = url(path || window.location.href, true);
  delete parse.query[key];
  parse.set('query', parse.query);
  return parse.toString();
}

/**
 * 添加 查询参数
 * @param path
 * @param key
 */
function addParam(key: string, value: string, path?: string): string {
  const parse = url(path || window.location.href, true);
  parse.query[key] = value;
  parse.set('query', parse.query);
  return parse.toString();
}

/**
 * 更新 查询参数
 * @param path
 * @param key
 */
function updateParam(key: string, value: string, path?: string): string {
  return addParam(key, value, path);
}

/**
 * 对象转URL参数
 * @param obj JSON对象
 * @example {a:1, b:2} => a=1&b=2
 */
function obj2pms(obj: any) {
  return Object.keys(obj)
    .map((v) => `${v}=${obj[v]}`)
    .join('&');
}

/**
 * 构建跳转链接
 * @param path 路径
 * @param params JSON对象
 * @example buildUrl('/login', {from: 'home'}) => '/login?from=home'
 */
function buildUrl(path: string, params: any): string {
  const useAnd = path.indexOf('?') > -1;
  const pms = obj2pms(params);
  const url = `${path}${useAnd ? '&' : '?'}${pms}`;
  return url;
}

interface RouterOption {
  path: string;
  query?: Record<string, any>;
}

function createUrl(options: RouterOption | string) {
  let url = '';
  if (typeof options === 'string') {
    url = options;
  } else {
    url = buildUrl(options.path, options.query || {});
  }
  return url;
}

/**
 * location.href
 * @param options {path: '', query: {}} | url: string
 * @example push('/login') 或 push('/login',{name: 'a'})
 */
function push(options: RouterOption | string) {
  const url = createUrl(options);
  window.location.href = url;
}

/**
 * location.replace
 * @param options {path: '', query: {}} | url: string
 * @example replace('/login') 或 replace('/login',{name: 'a'})
 */
function replace(options: RouterOption | string) {
  const url = createUrl(options);
  window.location.replace(url);
}

/**
 * history.go
 * @param num
 * @example 回退：go(-1)
 */
function go(num: number) {
  window.history.go(num);
}

export default {
  url,
  getUrlParam,
  resolve,
  urlToList,
  removeParam,
  addParam,
  updateParam,
  obj2pms,
  buildUrl,
  push,
  replace,
  go,
};
