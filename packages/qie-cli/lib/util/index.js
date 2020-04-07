const path = require('path');
const fs = require('fs-extra');
const logger = require('./logger');
const ora = require('ora');
const execa = require('execa');

const { APP_ROOT_PATH, QIERC_PATH, PACKAGEJSON_PATH, QIEJS_KEY_PATH } = require('./constants');

function getPackageJson() {
  try {
    const data = fs.readJsonSync(PACKAGEJSON_PATH, { throws: false });
    return data || {};
  } catch (e) {
    logger.warn(`'package.json' 缺失，请检查`);
    process.exit(1);
  }
}

exports.getPackageJson = getPackageJson;

exports.isString = v => typeof v === 'string';
exports.resolveAppPath = name => path.resolve(APP_ROOT_PATH, name);

// 获取 package.json 中的版本号
exports.getPkgVersion = () => getPackageJson().version;
// require(path.join(APP_ROOT_PATH, 'package.json')).version;

exports.getAppName = () => getPackageJson().name;

// 获取 keys
exports.getKeys = () => {
  // 没有生成
  if (!fs.pathExistsSync(QIEJS_KEY_PATH)) {
    logger.warn(`缺少登录信息，请执行 'qie-cli login' 登录`);
    process.exit(0);
  }

  // 生成了，是空的
  try {
    const data = fs.readJsonSync(QIEJS_KEY_PATH, { throws: false });
    return data || {};
  } catch (e) {
    logger.warn(`缺少登录信息，请执行 'qie-cli login' 登录`);
    process.exit(0);
  }
};

exports.getPreset = async () => {
  // 先确保有 这个文件和目录
  await fs.ensureFile(QIEJS_KEY_PATH);
  const data = await fs.readJson(QIEJS_KEY_PATH, { throws: false });
  return data || {};
};

exports.setPreset = async jsonData => {
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
    logger.warn(`缺少 '.qierc.js' 文件, 请执行 'qie-cli init' 生成`);
    process.exit(0);
  }
};

// 检查是配置文件中的数据
exports.checkConfigProp = obj => {
  return function(key) {
    if (obj[key]) return true;

    logger.warn(`请在 ${CONFIG_FILE_NAME} 中设置 ${key}`);
    process.exit(0);
  };
};

// 是否为空的目录
exports.isDirEmpty = dirName => {
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
exports.getFirstFileName = dirName => {
  const dirPath = path.join(APP_ROOT_PATH, dirName);
  const files = fs.readdirSync(dirPath);
  return files[0] || '';
};

exports.checkConfigProp = obj => {
  return function(key) {
    if (obj[key] !== '' || typeof obj[key] !== 'undefined') return true;

    logger.warn(`缺少配置项: ${key}`);
    process.exit(0);
  };
};

// const run = (command, args) => {
//   if (!args) {
//     [command, ...args] = command.split(/\s+/);
//   }
//   return execa(command, args, { cwd: APP_ROOT_PATH });
// };
// exports.run = run;

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
exports.canUseCmd = async pmType => {
  const validate = ['cnpm', 'yarn', 'npm', 'git'].includes(pmType);
  if (validate) {
    try {
      await execa(pmType, ['--version']);
      return true;
    } catch (e) {}
  }
  return false;
};

// function getFirstFileName(dirName): string {
//   const dirPath = path.join(appPath, dirName);
//   const files = fs.readdirSync(dirPath);
//   return files[0] || '';
// }

// function deleteRemovedFiles(directory, newFiles, previousFiles) {
//   // get all files that are not in the new filesystem and are still existing
//   const filesToDelete = Object.keys(previousFiles).filter(filename => !newFiles[filename]);

//   // delete each of these files
//   return Promise.all(
//     filesToDelete.map(filename => {
//       return fs.unlink(path.join(directory, filename));
//     })
//   );
// }

// module.exports = async function writeFileTree(dir, files, previousFiles) {
//   if (previousFiles) {
//     await deleteRemovedFiles(dir, files, previousFiles);
//   }
//   Object.keys(files).forEach(name => {
//     const filePath = path.join(dir, name);
//     fs.ensureDirSync(path.dirname(filePath));
//     fs.writeFileSync(filePath, files[name]);
//   });
// };

// exports.exists = exists;

// // 检查是否存在 .qierc.js
// exports.existsQieConfigFile = () => {
//   if (!fs.existsSync(qieConfigPath)) {
//     logger.warn(`Missing configuration file ${CONFIG_FILE_NAME}, please execute 'qie-cli init'`);
//     process.exit(1);
//   }
// };

// {
//   return;
//   if (hasDir) return true;

//   // logger.warn(`Directory './${dirName}' does not exist, please check it`);
//   // process.exit(0);
// }

// exports.isDirEmpty = dirName => {
//   const dirPath = path.join(appPath, dirName);
//   existsDir(dirName);
//   const files = fs.readdirSync(dirPath);

//   return files.length !== 0;
// };

// // 检查目录是否为空
// function isDirEmpty(dirName: string) {
//   const dirPath = path.join(appPath, dirName);
//   console.log(dirPath);
//   existsDir(dirName);
//   const files = fs.readdirSync(dirPath);
//   const hasFile = files.length !== 0;
//   if (hasFile) return true;

//   logger.warn(`目录 ./${dirName} 为空，请检查`);
//   process.exit(1);
// }

// // 检查是配置文件中的数据
// function checkConfigProp(obj: any): Function {
//   return function(key: string): boolean {
//     if (obj[key]) return true;

//     logger.warn(`请在 ${CONFIG_FILE_NAME} 中设置 ${key}`);
//     return false;
//   };
// }

// // 获取目录中第一个文件
// function getFirstFileName(dirName): string {
//   const dirPath = path.join(appPath, dirName);
//   const files = fs.readdirSync(dirPath);
//   return files[0] || '';
// }

// exports = {
//   // 获取 用户根目录
//   homedir,
//   // 获取 命令执行环境 所在路径
//   getRootPath,
//   // 获取 系统用户名
//   getSystemUsername,
//   // 获取 package.json 中的版本号
//   getPkgVersion,
//   // 打印 版本号
//   printPkgVersion,
//   // 检查是否存在 qie.config.js
//   existsQieConfigFile,
//   // 检查  目录是否存在
//   existsDir,
//   // 检查 目录是否为空
//   isDirEmpty,
//   // 检查 属性是否存在
//   checkConfigProp,
//   // 获取 目录中第一个文件
//   getFirstFileName,
//   // 返回路径
//   resolve
// };
