const os = require('os');
const path = require('path');

const CONFIG_FILE_NAME = '.qierc.js';
const OS_HOME_DIR = os.homedir();

exports.PAGE_TPL_REACT = path.join(exports.CLI_ROOT_PATH, 'templates/page-react');
exports.PAGE_TPL_VUE = path.join(exports.CLI_ROOT_PATH, 'templates/page-vue');

exports.CONFIG_FILE_NAME = '.qierc.js';
exports.QIEJS_DIR_NAME = '.qiejs';
exports.QIEJS_KEY_NAME = '.key';
exports.OS_USER = process.env.USER || OS_HOME_DIR;
exports.APP_ROOT_PATH = process.cwd();
exports.CLI_ROOT_PATH = path.resolve(__dirname, '../');
exports.QIERC_PATH = path.join(exports.APP_ROOT_PATH, CONFIG_FILE_NAME);
exports.QIERC_TPL_PATH = path.join(exports.CLI_ROOT_PATH, 'templates/.qierc.js');
