---
title: 与Native交互
---

## 与 Native 交互

```js
import * as bridge from "@qiejs/jsbridge";

// 获取Native用户登录后的数据
bridge.getUserInfo().then(user => {
  console.log(user);
});

// 通知Native更新用户信息
bridge.updateUser();
```
