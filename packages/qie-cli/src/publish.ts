import * as ora from "ora";
import axios from "axios";
import * as path from "path";
import * as inquirer from "inquirer";
import chalk from "chalk";
import { getFirstFileName } from "./util";
import { CONFIG_FILE_NAME } from "./util/constants";
import logger from "./util/logger";
import { IQieConfig } from "./util/type";

axios.defaults.timeout = 30 * 1000;
axios.defaults.responseType = "json";

const resolve = function(relativePath) {
  return path.resolve(process.cwd(), relativePath);
};

module.exports = (config: IQieConfig) => {
  const { type, publishApi, env, upload: uploadConfig } = config;

  const fileName = getFirstFileName(uploadConfig.dir);
  const regDomain = /([a-z0-9][a-z0-9\-]*?\.(?:com|cn|net|org|gov|info|la|cc|co)(?:\.(?:cn|jp))?)$/;

  const envName = fileName.split("__")[0];
  if (!regDomain.test(envName)) {
    logger.fatal(`${envName} 格式错误，例：www.xxx.com / dev.xxx.com`);
  }
  if (!Array.isArray(env) || !env.length) {
    logger.fatal(`${CONFIG_FILE_NAME} 缺少环境配置`);
  }
  if (!publishApi) {
    logger.fatal(`${CONFIG_FILE_NAME} 缺少 发布API 配置`);
  }

  const envInfo = env.filter(v => v.name === envName)[0];
  if (!envInfo) {
    logger.fatal(`${CONFIG_FILE_NAME} 缺少 ${envName} 环境配置`);
  }

  const version = require(resolve("package.json")).version;
  const key = envInfo.key || "";
  const prefix = uploadConfig.prefix;
  const prompts = [
    { name: "desc", type: "input", message: `[${envName}] - 请输入版本说明:  ` }
  ];

  inquirer.prompt(prompts).then(({ desc }) => {
    const params = {
      key,
      cdnPrefix: prefix,
      zipName: fileName,
      type: type.toLowerCase(),
      desc,
      envName,
      version
    };

    console.log(JSON.stringify(params));
    console.log();
    const spinner = ora(`正在提交版本至 ${envName}`).start();
    axios
      .post(publishApi, params)
      .then(res => res.data)
      .then(res => {
        if (res.success) {
          console.log();
          spinner.color = "green";
          spinner.succeed(chalk.green(`提交成功：${JSON.stringify(res.data)}`));
          console.log();
        } else {
          throw res;
        }
        process.exit(0);
      })
      .catch(err => {
        spinner.stop();
        logger.fatal(err.message);
      });
  });

  return;
};
