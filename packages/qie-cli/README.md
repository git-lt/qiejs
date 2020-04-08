---
title: 命令行工具
---

## qie

为前端项目发布提供配置文初始化、上传资源至阿里云、提交版本信息至数据库

### 安装

```bash
npm i -g @qiejs/cli
```

### 配置文件初始化

```
qie init
```

### 上传资源并提交版本信息

```
qie upload -r
```

## 更新日志

**2020/04/07**

- 去掉 `ts` 编译，使用原生 `node` 语法 (请确保 node 版本大于 10.0)
- 修改 `qie-cli` 简写成 `qie`
- 新增 `qie create <appName>` 基于模板创建项目
- 新增 `qie login` 初始化登录信息, 每个新项目需要执行一次
- 新增 `qie page <pageName>` 快速创建一个页面，加 -r 创建 react 页面，加 -v 创建 vue 页面
