# `qie-wxjssdk`

> 微信 JSSDK 的 TS 版本，封装了几个常用的 API，用于规范和简化 API 的使用

## Usage

```ts
import wx from '@qiejs/wxjssdk';

// SDK初始化
wx.readyAsync();

// 异步分享
wx.shareAsync();

// 异步支付
wx.payAsync();

// 隐藏功能菜单
wx.hideShareMenus();

// 隐藏底部导航
wx.hideToolbar();
```
