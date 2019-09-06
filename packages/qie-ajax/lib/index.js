"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const REQUEST_HEADERS = {
    default: { "Content-Type": "application/x-www-form-urlencoded" },
    json: { "Content-Type": "application/json" },
    "form-data": { "Content-Type": "multipart/form-data" }
};
class Request {
    constructor(options) {
        const { dataType = "json", loading, axios } = options;
        this.dataType = dataType;
        this.loading = loading;
        this.catch = options.catch;
        this.axios = axios;
    }
    // 注册 api
    regist(apis, servicePrefix = "") {
        Object.keys(apis).forEach(v => {
            const methodUrl = apis[v];
            if (typeof methodUrl === "function") {
                apis[v] = (...params) => this._transfromToRequest(methodUrl(params), servicePrefix);
            }
            else {
                apis[v] = this._transfromToRequest(methodUrl, servicePrefix);
            }
        });
        return apis;
    }
    // 转成 api 方法
    _transfromToRequest(methodUrl, servicePrefix = "") {
        // 请求参数处理
        return (config) => {
            let { data = {}, dataType = this.dataType, catchError = true, headers = {}, loading = false, ...others } = config || {};
            // 获取 方法 和 地址
            let [method, url] = methodUrl.split(" ");
            url = servicePrefix + url;
            method = method.toLowerCase();
            // 处理 get 请求参数
            const IS_GET = method === "get";
            let params = {};
            if (IS_GET && Object.keys(data).length)
                params = data;
            // body 类型为 x-www-form-urlencoded 的表单提交处理 post
            if (dataType === "default") {
                data = qs_1.default.stringify(data, { allowDots: true });
            }
            // 设置 loading 状态
            this._changeLoading(loading, true);
            // 返回 Promise 请求类型结果
            return this.axios({
                url,
                method,
                params,
                data: IS_GET ? {} : data,
                headers: {
                    ...this.axios.defaults.headers,
                    ...REQUEST_HEADERS[dataType]
                },
                ...others
            })
                .then((data) => {
                this._changeLoading(loading, false);
                return data;
            })
                .catch((err) => {
                this._changeLoading(loading, false);
                if (catchError) {
                    this.catch && this.catch(err);
                    return new Promise(() => { });
                }
                return Promise.reject(err);
            });
        };
    }
    // 更新 Loading 状态
    _changeLoading(loading, state) {
        if (typeof loading === "boolean" && loading === true) {
            state ? this.loading.show() : this.loading.hide();
        }
        else if (typeof loading === "function") {
            loading(state);
        }
    }
}
exports.Request = Request;
exports.default = (options) => new Request(options);