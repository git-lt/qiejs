const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const inquirer = require('inquirer');
const downloadGit = require('download-git-repo');
const validateProjectName = require('validate-npm-package-name');
const { run, canUseCmd, getPreset, setPreset } = require('./util');

const proInfoPmt = [
  {
    type: 'list',
    name: 'template',
    message: '项目模板: ',
    choices: ['react-antd-ts', 'vue-vant-ts']
  },
  {
    type: 'input',
    name: 'description',
    message: '项目介绍: '
  }
];

const pmlist = {
  name: 'packageManager',
  type: 'list',
  message: '选择一个包管理器，用来安装依赖: ',
  choices: [
    {
      name: 'Use Yarn',
      value: 'yarn'
    },
    {
      name: 'Use NPM',
      value: 'npm'
    },
    {
      name: 'Use CNPM',
      value: 'cnpm'
    }
  ]
};

const checkProNameExistsPmt = {
  type: 'input',
  name: 'projectName',
  message: '当前已存在同名项目，请换一个: ',
  validate(input) {
    if (!input) {
      return '项目名不能为空';
    }
    if (fs.existsSync(input)) {
      return '项目名依然重复';
    }
    return true;
  }
};

const checkProNameFormatPmt = {
  type: 'input',
  name: 'projectName',
  message: '项目名称格式有误，请换一个: ',
  validate(input) {
    if (!input) return '项目名称不能为空';

    result = validateProjectName(input);
    if (!result.validForNewPackages) {
      return '项目名称格式有误，请参考 https://https://www.npmjs.com/package/validate-npm-package-name';
    }
    return true;
  }
};

// 下载模板
const tplMap = {
  'react-antd-ts': 'direct:https://github.com/git-lt/react-antd-ts-boilerplate.git',
  'vue-vant-ts': 'direct:https://github.com/git-lt/vue-vant-ts-boilerplate.git'
};

module.exports = async function create(projectName, options) {
  const inCurrent = projectName === '.';
  const name = inCurrent ? path.relative('../', cwd) : projectName;

  // 检查 appname 格式是否正确、是否存在同名目录, 如果不合法，引导输入合法名称
  projectName = await checkAppName(name, inCurrent);

  // 目标目录
  const targetDir = path.resolve(process.cwd(), projectName || '.');

  // 获取 项目模板名称 与 项目介绍
  const { template, description = '' } = await inquirer.prompt(proInfoPmt);

  // 下载地址
  const tplApi = tplMap[template];

  // 下载模板
  await downloadTemplate(tplApi, targetDir);

  // 更新 package.json
  const pkgjsonPath = path.resolve(targetDir, 'package.json');
  await updateJsonFile(pkgjsonPath, { name: projectName, description });

  // 选择包管理器
  // 先从本地预设获取，没有则询问，然后存到本地预设
  const qieConfig = await getPreset();
  let packageManager = qieConfig.packageManager;
  if (!packageManager) {
    const pkgRes = await inquirer.prompt([pmlist]);
    packageManager = pkgRes.packageManager;
  }
  // 保存选项
  if (packageManager !== qieConfig.packageManager) {
    qieConfig.packageManager = packageManager;
    await setPreset(qieConfig);
  }

  // npm install
  if (canUseCmd(packageManager)) {
    let installSpinner;
    try {
      const installCmd = packageManager === 'yarn' ? 'yarn' : `${packageManager} install`;
      installSpinner = ora(`${chalk.cyan.bold(installCmd)} 正在安装依赖, 请稍等...`).start();
      await run(installCmd, null, targetDir);
      installSpinner.succeed('依赖安装完成');
    } catch (e) {
      installSpinner.fail(chalk.red('依赖安装失败，请手动安装'));
    }
  } else {
    console.log(chalk.red(`依赖安装失败，包管理器 ${packageManager} 未安装，请手动安装`));
  }

  // git init
  if (options.git && canUseCmd('git')) {
    const msg = typeof options.git === 'string' ? options.git : 'first push';
    const gitSpinner = ora(`初始化 git 仓库`).start();
    await run('git init', null, targetDir);
    await run('git add .', null, targetDir);
    await run(`git commit -m ${msg}`, [], targetDir);
    gitSpinner.succeed('git 初始化完成');
  }

  console.log();
  console.log(`${chalk.green('✔ ')}${chalk.green(`项目创建成功: ${chalk.yellow(projectName)}`)} 🎉`);

  !inCurrent && console.log(`    ${chalk.gray(`cd ${projectName}`)}`);
  console.log(`    ${chalk.gray(`npm start`)}`);
  process.exit(0);
};

async function checkAppName(name, inCurrent) {
  let projectName = name;

  // 检查是否已经存在
  if (!inCurrent && fs.existsSync(name)) {
    const res = await inquirer.prompt([checkProNameExistsPmt]);
    projectName = res.projectName;
  }

  // 格式错误
  let result = validateProjectName(projectName);
  if (!result.validForNewPackages) {
    const res = await inquirer.prompt([checkProNameFormatPmt]);
    projectName = res.projectName;

    // 检查是否重名
    if (!inCurrent && fs.existsSync(projectName)) {
      const res = await inquirer.prompt([checkProNameExistsPmt]);
      projectName = res.projectName;
    }
  }
  return projectName;
}

// 项目模板远程下载
async function downloadTemplate(api, targetPath) {
  let loading = ora(`正在从 ${api.replace('direct:', '')} 拉取模板...`).start();
  return new Promise((resolve, reject) => {
    downloadGit(api, targetPath, { clone: true }, async err => {
      console.log(err);
      if (err) {
        loading.color = 'red';
        loading.fail(chalk.red('模板拉取失败!'));
        process.exit(0);
      }
      loading.color = 'green';
      loading.succeed(chalk.grey('模板拉取成功！'));
      resolve();
    });
  });
}

// 更新json配置文件
async function updateJsonFile(filePath, obj) {
  try {
    const pkgData = (await fs.readJson(filePath, { throws: false })) || {};
    Object.keys(obj).forEach(key => (pkgData[key] = obj[key]));
    await fs.writeJson(filePath, pkgData, { spaces: 2 });
    return;
  } catch (e) {
    console.error(chalk.red(`更新 package.json 失败`));
    process.exit(0);
  }
}
