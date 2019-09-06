## qie-lstore

对 store 进行一定的封装，用于简化 localstorage 的操作

### 安装

```
npm install @qiejs/qie-lstore
```

## 初始化

```js
// lstore.js

import LStore from "@qiejs/qie-lstore";

// 定义key的类型
interface IKeys {
  username: string;
}

// 注册key名
const keys = ["username"];
const prefix = "app/";

const lstore = new LStore() < IKeys > prefix;
const localstore = lstore.init(keys);

export default localstore;
```

### 使用

```js
import lstore from "./lstore";

// 存
lstore.username = "jack";

// 取
console.log(lstore.username);
```

微信 typescript 的定义

https://github.com/gushiaoke/wx-ts/blob/master/%40types/wx-app/index.d.ts
https://github.com/Gemicat/wxapp-typescript/blob/master/typings/wx/lib.wx.api.d.ts
https://github.com/Adherentman/Typescript-wxApi.d.ts/blob/master/wx.d.ts
