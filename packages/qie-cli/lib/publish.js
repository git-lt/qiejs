const ora = require('ora');
const axios = require('axios');
const inquirer = require('inquirer');
const chalk = require('chalk');
const logger = require('./util/logger');
const { getFirstFileName, getPkgVersion, getAppName, checkConfigProp, loadCmd } = require('./util');
const { QIERC_NAME, OS_USER_NAME } = require('./util/constants');

axios.defaults.timeout = 30 * 1000;
axios.defaults.responseType = 'json';

module.exports = async function(config) {
  const { type, env, dir, prefix, cdnBaseUrl, app } = config;

  const check = checkConfigProp(config);
  check('type') && check('env') && check('cdnBaseUrl');

  const appName = getAppName();
  const fileName = getFirstFileName(dir);
  const regDomain = /([a-z0-9][a-z0-9\-]*?\.(?:com|cn|net|org|gov|info|la|cc|co)(?:\.(?:cn|jp))?)$/;

  // 检查域名是否正确
  const envName = fileName.split('__')[0];
  if (!regDomain.test(envName)) {
    logger.error(`${envName} 格式错误，例：www.xxx.com / dev.xxx.com`);
    process.exit(0);
  }

  // 是否有 env 配置
  if (!Array.isArray(env) || !env.length) {
    logger.error(`${QIERC_NAME} 缺少环境配置`);
    process.exit(0);
  }

  // 检查环境配置 env: { pubAPi,type, name }
  const envInfo = env.filter(v => v.name === envName)[0];
  if (!envInfo || !envInfo.pubApi || !envInfo.type) {
    logger.error(`${QIERC_NAME} 缺少 ${envName} 的环境配置`);
    process.exit(0);
  }

  const { type: envType, pubApi } = envInfo;

  // 检查上传 key
  let key = app[appName] ? app[appName][envType] : '';
  if (!key) {
    logger.error(`${envName} 的 key 不存在，请执行 'qie-cli login' 生成`);
    process.exit(0);
  }

  const version = getPkgVersion();

  // 版本说明
  const prompts = [{ name: 'desc', type: 'input', message: `[${envName}] - 请输入版本说明:  ` }];
  const { desc } = await inquirer.prompt(prompts);

  // 提交到 git 仓库
  // await loadCmd('git add .', '执行 git add');
  // try {
  //   await loadCmd(`git commit -m ${desc}`, '执行 git commit');
  //   await loadCmd('git pubsh', '执行 git push');
  // } catch (e) {
  //   logger.warn('git 提交失败，请稍后手动执行');
  // }

  // 提交版本到DB
  const params = {
    key,
    cdnPrefix: prefix,
    zipName: fileName,
    type: type.toLowerCase(),
    cdnBaseUrl,
    desc: desc.trim(),
    envName,
    version,
    userName: OS_USER_NAME
  };

  console.log(JSON.stringify(params, null, 2));
  console.log();
  const spinner = ora(`正在提交版本信息至 ${chalk.cyan.bold(envName)} ...`).start();

  try {
    const result = await axios.post(pubApi, params).then(res => res.data);

    if (result.success) {
      console.log();
      spinner.color = 'green';
      spinner.succeed(chalk.green(`版本提交成功 🎉`));
      console.log();
    } else {
      spinner.stop();
      logger.error('提交失败，请重试');
      logger.log(result);
    }
  } catch (err) {
    spinner.stop();
    logger.error(err);
  }

  process.exit(0);
};
