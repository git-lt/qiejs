---
title: 与Native交互
---

## 与 Native 交互

基于 `WebViewJavascriptBridge` 的封装，提供与 `Native` 交互的 API

### 使用

```js
import * as bridge from "@qiejs/jsbridge";

// 获取Native用户登录后的数据
bridge.getUserInfo().then(user => {
  console.log(user);
});

// 通知Native更新用户信息
bridge.updateUser();
```

### API

```js
// 初始回调
onReady;
// 获取登录信息
getUserInfo;
// 跳转到某页面
routerTo;
// 跳转到H5页面
routerToH5;
// 到登录
login;
// 更新用户信息
updateUser;
// 回首页
goHome;
// 返回
goBack;
// 设置导航栏右侧内容
setNavRight;
// 微信分享
wxShare;
// 海报图片分享
wxShareImg;
// 预览文件
privewFiles;
// appleIAP
appleIAP;
// 注册JS回调
registerMethod;
// 安卓端获取图片
getImage;
```
