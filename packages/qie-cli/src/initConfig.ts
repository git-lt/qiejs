import * as inquirer from "inquirer";
import * as path from "path";
import * as fs from "fs";
import * as figlet from "figlet";
import chalk from "chalk";
import logger from "./util/logger";
import { CONFIG_FILE_NAME } from "./util/constants";

const qieConfigFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

function copyConfigJs() {
  figlet("qie cli", function(err, data) {
    if (err) {
      logger.fatal(err);
    } else {
      console.log(chalk.yellow(data));
      let templatePath = path.join(
        __dirname,
        "../templates/" + CONFIG_FILE_NAME
      );
      let contents = fs.readFileSync(templatePath, "utf8");
      fs.writeFileSync(qieConfigFilePath, contents, "utf8");
      console.log();
      logger.success(`初始化配置文件 ${CONFIG_FILE_NAME} 成功`);
    }
    process.exit(0);
  });
}

function initConfig() {
  // 配置文件如果存在则提示是否覆盖
  if (fs.existsSync(qieConfigFilePath)) {
    const qus = [
      {
        name: "init-confirm",
        type: "confirm",
        message: `${CONFIG_FILE_NAME} 已经存在，是否覆盖?`,
        validate: function(input) {
          if (input.lowerCase !== "y" && input.lowerCase !== "n") {
            return "请输入 y/n !";
          } else {
            return true;
          }
        }
      }
    ];

    // 提问
    inquirer
      .prompt(qus)
      .then(answers => {
        answers["init-confirm"] ? copyConfigJs() : process.exit(0);
      })
      .catch(logger.warn);
  } else {
    copyConfigJs();
  }
}

export default initConfig;
