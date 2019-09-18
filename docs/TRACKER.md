---
title: 业务埋点
---

## 业务埋点

基于 阿里云日志服务 的埋点工具

### 初始化

```js
import Tracker, { TrackerType } from "@qiejs/tracker";

const tracker = new Tracker({
  enable: true,
  environment: "production",
  project: "app-xxx",
  endpoint: "xxx-xxx-xxx",
  logstore: "xxx"
});

export default tracker;
```

### 使用

```ts
import tracker from "./trakcer";
import { TrackerType } from "@qiejs/tracker";

// 设置用户上下文
tracker.setUser(userInfo);
// 消息
tracker.setMessage(err.message);
// 扩展信息
tracker.setExtra(pageUrl);
// 提交数据
tracker.logger(TrackerType.HTTP, TrackerLevel.ERROR);
```
