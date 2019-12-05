---
title: 对异步请求的封装
---

## qie-ajax

对 Axios 进行一定的封装，用于简化接口定义与调用方式

### 安装

```
npm install @qiejs/ajax
```

## 初始化

```ts
// ajax.js

import Ajax from "@qiejs/ajax";
import axios from "axios";

axios.defaults.timeout = 60 * 1000;
axios.defaults.baseURL = "https://api.example.com";

// ----------------- 拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const createAjax = Ajax({
  axios: axios,
  // post请求的数据类型
  dataType: "json",
  // 根据不同框架来显示和隐藏 Loading
  loading: {
    show: () => {
      Toast.loading();
    },
    hide: () => {
      Toast.clear();
    }
  },
  // 统一的异常处理
  catch: err => {
    alert(err.message);
  }
});

export default createAjax;
```

### 定义 API

```ts
// api.js
import createAjax from "./ajax";
import { ITransApiResult } from "@qiejs/ajax";

// api 配置
const apis = {
  login: "post /login",
  getUser: id => `get /user/${id}`
};

// 类型定义
type ApiNames = "login" | "gettUser";
type IApiConfig = Record<ApiNames, ITransApiResult>;

export default createAjax.regist<IApiConfig>(apis, "/api");
```

### 使用

```ts
import api from './api'

api.login({
  data: {userName: 'jack', passwrod: '12111' }
  loading: true
}).then(res => {
  console.log(res)
})

api.getUser(userId)({
  data:{ a: 1},
  loading: true,
  catchError: false,
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

### API

Ajax(options)

- `options.catch`: 自定义的全局异常处理
- `options.dataType`: 请求的数据类型，默认为 `json`
- `options.loading`: 自定义的全局 `loading` 对象， `{ show: Function, hide: Function }`
- `options.axios`: 引入的 axios 对象
- `options.loadingDelay`: 延迟多少毫秒显示 loading，默认 300ms, 如果 300ms 内返回请求结果，则不显示 loading

api.xxx(options)

- `options.data`: 请求的数据对象
- `options.loading`: Boolean 是否显示 `loading`，默认 false, 为函数时，为自定义的 Loading 处理函数
- `options.catchError`: 是否全局捕获异常，默认全局捕获
- `options.dataType`: 请求的数据类型，默认为 `Ajax` 初始化的 `dataType`
