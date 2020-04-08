const path = require('path');
const fs = require('fs-extra');
const logger = require('./logger');
const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');

const { APP_ROOT_PATH, QIERC_PATH, PACKAGEJSON_PATH, PACKAGEJSON_PATH_CLI, QIEJS_KEY_PATH, QIERC_NAME } = require('./constants');

function getPackageJson() {
  try {
    const data = fs.readJsonSync(PACKAGEJSON_PATH, { throws: false });
    return data || {};
  } catch (e) {
    console.log(chalk.red('package.json 缺失，请检查'));
    process.exit(0);
  }
}

exports.getPackageJson = getPackageJson;

exports.isString = (v) => typeof v === 'string';
exports.resolveAppPath = (name) => path.resolve(APP_ROOT_PATH, name);

exports.getCliVersion = () => {
  return require(PACKAGEJSON_PATH_CLI).version;
};

// 获取项目 package.json 中的版本号
exports.getPkgVersion = () => getPackageJson().version;
// require(path.join(APP_ROOT_PATH, 'package.json')).version;

exports.getAppName = () => getPackageJson().name;

// 获取 keys
exports.getKeys = () => {
  // 没有生成
  if (!fs.pathExistsSync(QIEJS_KEY_PATH)) {
    logger.warn(`缺少登录信息，请执行 'qie login' 登录`);
    process.exit(0);
  }

  // 生成了，是空的
  try {
    const data = fs.readJsonSync(QIEJS_KEY_PATH, { throws: false });
    return data || {};
  } catch (e) {
    logger.warn(`缺少登录信息，请执行 'qie login' 登录`);
    process.exit(0);
  }
};

exports.getPreset = async () => {
  // 先确保有 这个文件和目录
  await fs.ensureFile(QIEJS_KEY_PATH);
  const data = await fs.readJson(QIEJS_KEY_PATH, { throws: false });
  return data || {};
};

exports.setPreset = async (jsonData) => {
  return await fs.writeJson(QIEJS_KEY_PATH, jsonData, { spaces: 2 });
};

exports.getQieConfig = () => {
  // 检查文件是否有
  // 有，则
  if (fs.pathExistsSync(QIERC_PATH)) {
    try {
      const data = require(QIERC_PATH);
      return data || {};
    } catch (e) {
      logger.error(e);
      process.exit(0);
    }
  } else {
    logger.warn(`缺少 '.qierc.js' 文件, 请执行 'qie init' 生成`);
    process.exit(0);
  }
};

// 是否为空的目录
exports.isDirEmpty = (dirName) => {
  const dirPath = path.join(APP_ROOT_PATH, dirName);

  if (!fs.existsSync(dirPath)) {
    logger.warn(`上传目录 ./${dirName} 不存在，请检查`);
    process.exit(0);
  }

  const files = fs.readdirSync(dirPath);
  const hasFile = files.length !== 0;
  if (hasFile) return true;

  logger.warn(`目录 ./${dirName} 为空，请检查`);
  process.exit(1);
};

// 获取目录中第一个文件
exports.getFirstFileName = (dirName) => {
  const dirPath = path.join(APP_ROOT_PATH, dirName);
  const files = fs.readdirSync(dirPath);
  return files[0] || '';
};

exports.checkConfigProp = (obj) => {
  return function (key) {
    if (obj[key] !== '' || typeof obj[key] !== 'undefined') return true;

    logger.error(`请在 ${QIERC_NAME} 中设置 ${key}`);
    process.exit(0);
  };
};

// 执行命令
exports.loadCmd = async (cmd, desc) => {
  let loading = ora();
  loading.start(`${desc}: 命令执行中...`);
  await execa(cmd);
  loading.succeed(`${desc}: 命令执行完成`);
  return;
};

exports.run = async (command, args, context) => {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args, { cwd: context || './' });
};

// 检查包管理器是否可用
exports.canUseCmd = async (pmType) => {
  const validate = ['cnpm', 'yarn', 'npm', 'git'].includes(pmType);
  if (validate) {
    try {
      await execa(pmType, ['--version']);
      return true;
    } catch (e) {}
  }
  return false;
};
