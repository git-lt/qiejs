const AliossUpload = require('./util/AliossUpload');
const { REG_DOMAIN } = require('./util/constants');
const logger = require('./util/logger');
const { isDirEmpty, getPreset, getQieConfig, getAppName, getFirstFileName } = require('./util');

module.exports = async function update(options) {
  const { dir, record, region, bucket, prefix } = options;

  // 检查 .qierc/config 中 oss key 是否存在
  const keys = await getPreset();
  // 当前项目配置 .qierc.js
  const config = getQieConfig();
  const updateDir = dir || 'zip';
  // 应用名称
  const appName = getAppName();

  if (!keys.keyId || !keys.keySecret || !keys.app) {
    logger.error('缺少登录信息，请执行 qie login 初始化');
    process.exit(0);
  }

  // 检查 上传目录是否为空
  isDirEmpty(updateDir);

  // 检查 文件名 中的域名 格式是否正确
  const fileName = getFirstFileName(updateDir);
  // 检查域名是否正确
  const envName = fileName.split('__')[0];
  if (!REG_DOMAIN.test(envName)) {
    logger.error(`${envName} 格式错误，例：www.xxx.com / dev.xxx.com`);
    process.exit(0);
  }

  const uploadConfig = {
    // * 阿里云accessKeyId & accessKeySecret
    accessKeyId: keys.keyId,
    accessKeySecret: keys.keySecret,
    region: region || 'oss-cn-hangzhou',
    bucket: bucket || 'qie-test',
    // * 文件前缀，用于划分目录
    prefix: prefix || '_web_backup',
    // 过滤不上传的文件
    exclude: [],
    // 上传前是否清空bucket
    deleteAll: false,
    // 清空时忽略的文件
    deleteExclude: [],
    // * 本地要上传的目录名
    dir: updateDir,
  };

  // 上传资源
  await new AliossUpload(uploadConfig).start();

  if (record) {
    config.dir = uploadConfig.dir;
    config.prefix = uploadConfig.prefix;
    config.app = keys.app[appName] || {};
    config.appName = appName;
    config.envName = envName;
    config.fileName = fileName;
    require('./publish')(config);
  }
};
