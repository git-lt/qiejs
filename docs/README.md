---
title: QIE 介绍
---

## 简介

**Qie** 是 一系列前端工具集合

- `qie-cli` SPA、MPA 前端项目部署工具，支持 Nginx、OSS CDN 两种部署方式，支持构建不同环境压缩包，同步备份至 OSS，并记录版本信息至数据库。

- `qie-ajax` 对 `axios` 的封装，简化 `axios` 的使用
- `qie-jsbridge` 基于 `WebViewJavascriptBridge` 的封装，提供与 `Native` 交互的 API
- `qie-lstore` 对 `localstorage` 的封装，用于简化使用
- `qie-tracker` 基于阿里云日志服务的封装，用于业务埋点
- `qie-utils` 各种常用的 JS 工具集

## 特性

✅ 支持上传任何文件至阿里云 OSS

✅ 支持上传站点压缩包并记录站点版本信息提交到数据库

✅ 支持部署 SPA、MPA 前端项目至 Nginx 或 CDN
