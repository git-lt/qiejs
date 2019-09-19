import qs from "qs";
import {
  AxiosRequestConfig,
  Method,
  CancelTokenSource,
  AxiosStatic
} from "axios";

export interface ILoadingProps {
  show: Function;
  hide: Function;
}

type RequestDataType = "json" | "default" | "form-data";

export interface IAjax {
  catch?: (err: any) => void;
  dataType?: RequestDataType;
  loading?: ILoadingProps;
  // 延迟多少ms 显示Loading
  loadingDelay?: number;
  axios: AxiosStatic;
}

export interface IRequestConfig {
  // 提交的数据
  data: any;
  // 请求的的数据类型 json / default(x-www-form-urlencoded) / form-data
  dataType: RequestDataType;
  // 是否捕获异常
  catchError: boolean;
  // 自定义的 headers
  headers: any[];
  // function 或 boolean
  loading: Function | boolean;
  // 额外的 axios 配置
  [propName: string]: any;
}

const REQUEST_HEADERS = {
  default: { "Content-Type": "application/x-www-form-urlencoded" },
  json: { "Content-Type": "application/json" },
  "form-data": { "Content-Type": "multipart/form-data" }
};

export class Request {
  catch?: (err: any) => void;
  dataType: "json" | "default" | "form-data";
  loading: ILoadingProps | undefined;
  axios: AxiosStatic;
  cancelSource: CancelTokenSource;
  loadingDelay: number;

  constructor(options: IAjax) {
    const { dataType = "json", loading, axios, loadingDelay } = options;
    this.dataType = dataType;
    this.loading = loading;
    this.catch = options.catch;
    this.axios = axios;
    this.cancelSource = axios.CancelToken.source();
    this.loadingDelay = loadingDelay || 300;
  }

  // 注册 api
  regist(apis: Record<string, string | Function>, servicePrefix = "") {
    Object.keys(apis).forEach(v => {
      const methodUrl = apis[v];

      if (typeof methodUrl === "function") {
        apis[v] = (...params: any[]) =>
          this._transfromToRequest(methodUrl(params), servicePrefix);
      } else {
        apis[v] = this._transfromToRequest(methodUrl, servicePrefix);
      }
    });
    return apis;
  }

  // 转成 api 方法
  _transfromToRequest(methodUrl: string, servicePrefix = "") {
    // 请求参数处理
    return (config: Partial<IRequestConfig>) => {
      let {
        data = {},
        dataType = this.dataType,
        catchError = true,
        headers = {},
        loading = false,
        ...others
      } = config || {};

      // 获取 方法 和 地址
      const pathInfo = methodUrl.split(" ");
      const url = servicePrefix + pathInfo[1];
      const method = pathInfo[0].toLowerCase() as Method;

      // 处理 get 请求参数
      const IS_GET = method === "get";
      let params = {};
      if (IS_GET && Object.keys(data).length) params = data;

      // body 类型为 x-www-form-urlencoded 的表单提交处理 post
      if (dataType === "default") {
        data = qs.stringify(data, { allowDots: true });
      }

      const reqConfig: AxiosRequestConfig = {
        url,
        method,
        params,
        data: IS_GET ? {} : data,
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { indices: false });
        },
        headers: {
          ...this.axios.defaults.headers,
          ...REQUEST_HEADERS[dataType]
        },
        cancelToken: this.cancelSource.token,
        ...others
      };

      const requestPromise = this.axios(reqConfig);

      const showLoadingPromise = new Promise(resolve =>
        setTimeout(() => resolve(this.loadingDelay), this.loadingDelay)
      );

      // 如果请求超过 260ms 则显示loading
      Promise.race([requestPromise, showLoadingPromise]).then(delay => {
        delay === this.loadingDelay && this._changeLoading(loading, true);
      });

      // 返回 promise
      return requestPromise
        .then((data: any) => {
          this._changeLoading(loading, false);
          return data;
        })
        .catch((err: any) => {
          this._changeLoading(loading, false);
          if (catchError) {
            this.catch && this.catch(err);
            return new Promise(() => {});
          }
          return Promise.reject(err);
        });
    };
  }

  // 更新 Loading 状态
  _changeLoading(loading: boolean | Function, state: boolean) {
    if (typeof loading === "boolean" && loading === true) {
      state ? this.loading!.show() : this.loading!.hide();
    } else if (typeof loading === "function") {
      loading(state);
    }
  }
}

export default (options: IAjax) => new Request(options);
