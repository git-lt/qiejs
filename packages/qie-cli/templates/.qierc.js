// 带 * 为必填项
module.exports = {
  // * 应用类型 SPA: 单页应用 / MPA: 多页应用
  type: "SPA",
  // * 环境配置
  env: [{ name: "", key: "", pubApi: "" }],
  // * cdn 地址 例: https://cdn.xxx.com/ (上传空间的域名信息)
  cdnBaseUrl: "",
  // * alioss 上传配置
  upload: {
    // * 阿里云accessKeyId
    accessKeyId: "",
    // * 阿里云accessKeySecret
    accessKeySecret: "",
    // * 阿里云region
    region: "",
    // * 阿里云bucket
    bucket: "",

    // * 文件前缀，用于划分目录
    prefix: "",
    // 过滤不上传的文件
    exclude: [],
    // 上传前是否清空bucket
    deleteAll: false,
    // 清空时忽略的文件
    deleteExclude: [],
    // * 本地要上传的目录名
    dir: ""
  }
};
