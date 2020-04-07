// 带 * 为必填项
module.exports = {
  // * 应用类型 SPA: 单页应用 / MPA: 多页应用
  type: 'SPA',
  // * 环境配置 (环境类型 type: dev/pro)
  env: [
    { name: '', type: 'dev', pubApi: '' },
    { name: '', type: 'pro', pubApi: '' }
  ],
  // * cdn 地址 例: https://cdn.xxx.com/ (上传空间的域名信息)
  cdnBaseUrl: ''
};
