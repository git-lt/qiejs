---
title: 对异步请求的封装
---

## qie-ajax

对 Axios 进行一定的封装，用于简化接口定义与调用方式

### 安装

```
npm install @qiejs/qie-ajax
```

## 初始化

```js
// ajax.js

import Ajax from "@qiejs/qie-ajax";
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

const createAjax = new Ajax({
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

```js
// api.js
import createAjax from "./ajax";

const apis = {
  login: "post /login",
  getUser: id => `get /user/${id}`
};

export default createAjax(apis, "/api");
```

### 使用

```js
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
