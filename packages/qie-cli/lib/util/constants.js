const os = require('os');
const path = require('path');

const OS_HOME_PATH = os.homedir();
const APP_ROOT_PATH = process.cwd();
const CLI_ROOT_PATH = path.resolve(__dirname, '../../');
const QIEJS_DIR_NAME = '.qierc';
const QIEJS_KEY_NAME = 'config';
const QIERC_NAME = '.qierc.js';

// 名称
exports.QIERC_NAME = QIERC_NAME;
exports.OS_USER_NAME = process.env.USER || path.basename(OS_HOME_PATH);

// 两个绝对路径
exports.APP_ROOT_PATH = APP_ROOT_PATH;
exports.CLI_ROOT_PATH = CLI_ROOT_PATH;

// 路径
exports.OS_HOME_PATH = OS_HOME_PATH;
exports.PACKAGEJSON_PATH = path.join(APP_ROOT_PATH, 'package.json');
exports.PACKAGEJSON_PATH_CLI = path.join(CLI_ROOT_PATH, 'package.json');

// 项目配置
exports.QIERC_PATH = path.join(APP_ROOT_PATH, QIERC_NAME);
exports.QIERC_TPL_PATH = path.join(CLI_ROOT_PATH, 'templates/.qierc.js');

// 系统配置
exports.QIEJS_DIR_PATH = path.join(OS_HOME_PATH, QIEJS_DIR_NAME);
exports.QIEJS_KEY_PATH = path.join(OS_HOME_PATH, `${QIEJS_DIR_NAME}/${QIEJS_KEY_NAME}`);

// 页面模板路径
exports.PAGE_TPL_REACT = path.join(CLI_ROOT_PATH, 'templates/page-react');
exports.PAGE_TPL_VUE = path.join(CLI_ROOT_PATH, 'templates/page-vue');
