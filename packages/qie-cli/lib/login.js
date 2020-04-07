const inquirer = require('inquirer');
const logger = require('./util/logger');
const { QIEJS_KEY_PATH } = require('./util/constants');
const { getAppName, getPreset, setPreset } = require('./util');

const qusOSS = [
  { name: 'keyId', type: 'input', message: `keyId: ` },
  { name: 'keySecret', type: 'input', message: `keySecret: ` }
];

const qusKEY = [
  { name: 'dev', type: 'input', message: `dev_key: ` },
  { name: 'pro', type: 'input', message: `pro_key: ` }
];

module.exports = async function login() {
  // 获取 项目名称
  let ans = {};
  let data = await getPreset();
  const appName = getAppName();

  if (data.keyId && data.keySecret) {
    ans = await inquirer.prompt(qusKEY);
  } else {
    ans = await inquirer.prompt(qusOSS.concat(qusKEY));
  }

  const { keyId, keySecret, dev, pro } = ans;

  if (keyId) data.keyId = keyId;
  if (keySecret) data.keySecret = keySecret;

  data.app = data.app || {};
  data.app[appName] = { dev: dev, pro: pro };

  // 确认生成
  const qus = [{ name: 'ok', type: 'confirm', message: `请确认 Key 是否正确?`, default: false }];
  const { ok } = await inquirer.prompt(qus);
  if (!ok) process.exit(0);

  // 写入系统文件
  try {
    await setPreset(data);
    logger.done('登录成功 !');
    logger.log(`登录信息保存于 ${QIEJS_KEY_PATH}`);
  } catch (e) {
    logger.error(e);
  }

  process.exit(0);
};
