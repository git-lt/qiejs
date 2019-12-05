---
title: 对本地存储的封装
---

## qie-lstore

对 store 进行一定的封装，用于简化 localstorage 的操作

### 安装

```
npm install @qiejs/lstore
```

## 初始化

```ts
// lstore.js
import LStore from "@qiejs/lstore";

// 注册key名
const keys = ["username"];
const prefix = "app/";

// 定义key的类型
interface IKeys {
  username: string;
}
const lstore = new LStore<IKeys>(prefix);
const localstore = lstore.init(keys);

export default localstore;
```

### 使用

```ts
import lstore from "./lstore";

// 存
lstore.username = "jack";

// 取
console.log(lstore.username);
```
