import * as path from "path";
import * as os from "os";
import { CONFIG_FILE_NAME } from "./constants";
import * as fs from "fs-extra";
import logger from "./logger";
// import * as child_process from "child_process";

const homedir = os.homedir;
const appPath = process.cwd();
const qieConfigPath = path.join(appPath, CONFIG_FILE_NAME);

export {
  // 获取 用户根目录
  homedir,
  // 获取 命令执行环境 所在路径
  getRootPath,
  // 获取 系统用户名
  getSystemUsername,
  // 获取 package.json 中的版本号
  getPkgVersion,
  // 打印 版本号
  printPkgVersion,
  // 判断 是否为空对象
  isEmptyObject,
  // 检查是否存在 qie.config.js
  existsQieConfigFile,
  // 检查  目录是否存在
  existsDir,
  // 检查 目录是否为空
  isDirEmpty,
  // 检查 属性是否存在
  checkConfigProp,
  // 获取 目录中第一个文件
  getFirstFileName
};

// 获取 命令执行环境 所在路径
function getRootPath(): string {
  return path.resolve(__dirname, "../../");
}

// 获取系统用户名
function getSystemUsername(): string {
  const userHome = homedir();
  const systemUsername = process.env.USER || path.basename(userHome);
  return systemUsername;
}

// 获取 package.json 中的版本号
function getPkgVersion(): string {
  return require(path.join(getRootPath(), "package.json")).version;
}

// 打印 版本号
function printPkgVersion() {
  const taroVersion = getPkgVersion();
  console.log(`🐧  Qie v${taroVersion}`);
  console.log();
}

// 是否为空对象
function isEmptyObject(obj: any): boolean {
  if (obj == null) {
    return true;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// 检查是否存在 qie.config.js
function existsQieConfigFile() {
  if (!fs.existsSync(qieConfigPath)) {
    logger.warn(`缺少配置文件 ${CONFIG_FILE_NAME}, 请执行 qie-cli init 初始化`);
    process.exit(1);
  }
  return true;
}

// 检查目录是否存在
function existsDir(dirName: string) {
  const dirPath = path.join(appPath, dirName);
  const hasDir = fs.existsSync(dirPath);
  if (hasDir) return true;
  logger.warn(`目录 ./${dirName} 不存在，请检查`);
  process.exit(1);
}

// 检查目录是否为空
function isDirEmpty(dirName: string) {
  const dirPath = path.join(appPath, dirName);
  console.log(dirPath);
  existsDir(dirName);
  const files = fs.readdirSync(dirPath);
  const hasFile = files.length !== 0;
  if (hasFile) return true;

  logger.warn(`目录 ./${dirName} 为空，请检查`);
  process.exit(1);
}

// 检查是配置文件中的数据
function checkConfigProp(obj: any): Function {
  return function(key: string): boolean {
    if (obj[key]) return true;

    logger.warn(`请在 ${CONFIG_FILE_NAME} 中设置 ${key}`);
    return false;
  };
}

// 获取目录中第一个文件
function getFirstFileName(dirName): string {
  const dirPath = path.join(appPath, dirName);
  const files = fs.readdirSync(dirPath);
  return files[0] || "";
}
