const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const inquirer = require('inquirer');
const { PAGE_TPL_REACT, PAGE_TPL_VUE } = require('./util/constants');

const checkDirNameExistsPmt = {
  type: 'input',
  name: 'pageName',
  message: '当前目录已存在同名页面，请换一个: ',
  validate(input) {
    if (!input) {
      return '页面名称不能为空';
    }
    if (fs.existsSync(input)) {
      return '页面名称重复';
    }
    return true;
  }
};

module.exports = async function create(pageName, options) {
  // 判断当前目录是否有重名的文件夹
  if (fs.existsSync(pageName)) {
    const res = await inquirer.prompt([checkDirNameExistsPmt]);
    pageName = res.pageName;
  }

  // 格式验证（略）
  const { react, vue } = options;
  if (!react && !vue) {
    console.log('请指定生成页面类型，查看帮助: qie-cli page --help');
    process.exit(0);
  }

  const tplPath = react ? PAGE_TPL_REACT : PAGE_TPL_VUE;
  const targetPath = path.resolve(process.cwd(), pageName);

  const copySpinner = ora(`正在创建页面...`).start();
  try {
    await fs.copy(tplPath, targetPath);
    copySpinner.succeed('页面已创建: ' + chalk.yellow(pageName));
  } catch (e) {
    copySpinner.fail(chalk.red('页面创建失败，请手动创建'));
  }
  process.exit(0);
};
