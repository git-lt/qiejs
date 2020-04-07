const inquirer = require('inquirer');
const fs = require('fs-extra');
const figlet = require('figlet');
const chalk = require('chalk');
const { QIERC_NAME, QIERC_TPL_PATH, QIERC_PATH } = require('./util/constants');

const qus = [
  {
    name: 'ok',
    type: 'confirm',
    message: `配置文件 ${chalk.cyan(QIERC_NAME)} 已存在，是否覆盖?`,
    default: false
  }
];

module.exports = async function initConfig() {
  if (fs.existsSync(QIERC_PATH)) {
    const { ok } = await inquirer.prompt(qus);
    ok ? copyConfigJs() : process.exit(0);
  } else {
    copyConfigJs();
  }
};

// 生成配置到项目
function copyConfigJs() {
  // 打印 LOGO
  figlet('qie cli', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(0);
    }

    console.log(chalk.yellow(data));
    // 读取模板
    let contents = fs.readFileSync(QIERC_TPL_PATH, 'utf8');
    // 生成文件
    fs.writeFileSync(QIERC_PATH, contents, 'utf8');

    console.log();
    console.log(chalk.green(`✔ 配置文件 ${QIERC_NAME} 已生成`));
    process.exit(0);
  });
}
