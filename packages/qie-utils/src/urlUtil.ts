// https://github.com/unshiftio/url-parse/blob/master/test/test.js
import url from 'url-parse';

/**
 * 获取url中查询参数的值
 * @param key 获取对应key的值，不传则获取所有
 * @example getUrlParam('name') // 'aaa'
 */
function getUrlParam(key: string, path?: string): string;
function getUrlParam(key?: string, path?: string): string | Record<string, string>;
function getUrlParam(key?: string, path?: string) {
  let p = path || window.location.href;
  p = p.indexOf('#') > -1 ? p.split('#')[1] : p;
  const query = url(p, true).query;
  return !!key ? query[key] : query;
}

/**
 * url 拼接
 * @param href url地址
 * @param path 路径
 * @example resolve('http://foo.com/a/', 'b/c') => http://foo.com/a/b/c
 */
function resolve(href: string, path: string): string {
  return url(path, href).href;
}

function urlToList(url: string): string[] {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map((_item, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

/**
 * 删除 查询参数 (hash路径不适用)
 * @param keys 要删除的 key 的集合
 * @param path 地址，默认为当前地址
 */
function removeParam(keys: string[], path?: string): string {
  const parse = url(path || window.location.href, true);
  keys.forEach((v) => {
    delete parse.query[v];
  });
  parse.set('query', parse.query);
  return parse.toString();
}

/**
 * 添加 查询参数(hash路径不适用)
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
function addParam(params: Record<string, any>, path?: string): string {
  const parse = url(path || window.location.href, true);
  Object.keys(params).forEach((v) => {
    parse.query[v] = params[v];
  });
  parse.set('query', parse.query);
  return parse.toString();
}

/**
 * 更新 查询参数(hash路径不适用)
 * @param params 要添加的键值对
 * @param path 地址，默认为当前地址
 */
function updateParam(params: Record<string, any>, path?: string): string {
  return addParam(params, path);
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

/**
 * 微信网页授权
 * @param appId
 * @example if(!sessionStorage.getItem('code')) doWxAuth('xxxx')
 */
function doWxAuth(appid: string) {
  const code = getUrlParam('code');
  if (code) {
    window.sessionStorage.setItem('code', code);
    const originUrl = removeParam(['code', 'state']);
    window.location.replace(originUrl);
    return;
  }

  const pms = {
    appid,
    redirect_uri: encodeURIComponent(window.location.href),
    response_type: 'code',
    connect_redirect: 1,
    state: 'STATE',
    scope: 'snsapi_userinfo',
  };

  const authPath = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const url = buildUrl(authPath, pms) + '#wechat_redirect';
  window.location.replace(url);
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
  doWxAuth,
};
