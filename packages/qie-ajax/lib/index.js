"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var REQUEST_HEADERS = {
    default: { "Content-Type": "application/x-www-form-urlencoded" },
    json: { "Content-Type": "application/json" },
    "form-data": { "Content-Type": "multipart/form-data" }
};
var Request = /** @class */ (function () {
    function Request(options) {
        var _a = options.dataType, dataType = _a === void 0 ? "json" : _a, loading = options.loading, axios = options.axios, loadingDelay = options.loadingDelay;
        this.dataType = dataType;
        this.loading = loading;
        this.catch = options.catch;
        this.axios = axios;
        this.cancelSource = axios.CancelToken.source();
        this.loadingDelay = loadingDelay || 300;
    }
    // 注册 api
    Request.prototype.regist = function (apis, servicePrefix) {
        var _this = this;
        if (servicePrefix === void 0) { servicePrefix = ""; }
        Object.keys(apis).forEach(function (v) {
            var methodUrl = apis[v];
            if (typeof methodUrl === "function") {
                apis[v] = function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return _this._transfromToRequest(methodUrl(params), servicePrefix);
                };
            }
            else {
                apis[v] = _this._transfromToRequest(methodUrl, servicePrefix);
            }
        });
        return apis;
    };
    // 转成 api 方法
    Request.prototype._transfromToRequest = function (methodUrl, servicePrefix) {
        var _this = this;
        if (servicePrefix === void 0) { servicePrefix = ""; }
        // 请求参数处理
        return function (config) {
            var _a = config || {}, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.dataType, dataType = _c === void 0 ? _this.dataType : _c, _d = _a.catchError, catchError = _d === void 0 ? true : _d, _e = _a.headers, headers = _e === void 0 ? {} : _e, _f = _a.loading, loading = _f === void 0 ? false : _f, others = __rest(_a, ["data", "dataType", "catchError", "headers", "loading"]);
            // 获取 方法 和 地址
            var pathInfo = methodUrl.split(" ");
            var url = servicePrefix + pathInfo[1];
            var method = pathInfo[0].toLowerCase();
            // 处理 get 请求参数
            var IS_GET = method === "get";
            var params = {};
            if (IS_GET && Object.keys(data).length)
                params = data;
            // body 类型为 x-www-form-urlencoded 的表单提交处理 post
            if (dataType === "default") {
                data = qs_1.default.stringify(data, { allowDots: true });
            }
            var reqConfig = __assign({ url: url,
                method: method,
                params: params, data: IS_GET ? {} : data, paramsSerializer: function (params) {
                    return qs_1.default.stringify(params, { indices: false });
                }, headers: __assign({}, _this.axios.defaults.headers, REQUEST_HEADERS[dataType]), cancelToken: _this.cancelSource.token }, others);
            var requestPromise = _this.axios(reqConfig);
            var showLoadingPromise = new Promise(function (resolve) { return setTimeout(function () { return resolve(_this.loadingDelay); }, _this.loadingDelay); });
            // 如果请求超过 260ms 则显示loading
            Promise.race([requestPromise, showLoadingPromise]).then(function (delay) {
                delay === _this.loadingDelay && _this._changeLoading(loading, true);
            });
            // 返回 promise
            return requestPromise
                .then(function (data) {
                _this._changeLoading(loading, false);
                return data;
            })
                .catch(function (err) {
                _this._changeLoading(loading, false);
                if (catchError) {
                    _this.catch && _this.catch(err);
                    return new Promise(function () { });
                }
                return Promise.reject(err);
            });
        };
    };
    // 更新 Loading 状态
    Request.prototype._changeLoading = function (loading, state) {
        if (typeof loading === "boolean" && loading === true) {
            state ? this.loading.show() : this.loading.hide();
        }
        else if (typeof loading === "function") {
            loading(state);
        }
    };
    return Request;
}());
exports.Request = Request;
exports.default = (function (options) { return new Request(options); });
