const chalk = require('chalk');
const AliossUpload = require('./util/AliossUpload');
const { isDirEmpty, getPreset, getQieConfig } = require('./util');

module.exports = async function update(options) {
  const { dir, record, region, bucket, prefix } = options;

  // 检查 .qierc/config 中 oss key 是否存在
  const keys = getPreset();
  const config = getQieConfig();
  const updateDir = dir || 'zip';

  if (!keys.keyId || !keys.keySecret) {
    console.log(chalk.red('缺少登录信息，请执行 qie login 初始化'));
    process.exit(0);
  }

  // 检查 上传目录是否为空
  isDirEmpty(updateDir);

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
    dir: updateDir
  };

  // 上传资源
  await new AliossUpload(uploadConfig).start();

  if (record) {
    config.dir = uploadConfig.dir;
    config.prefix = uploadConfig.prefix;
    config.app = keys.app;
    require('./publish')(config);
  }
};
