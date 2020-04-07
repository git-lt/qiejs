import * as inquirer from 'inquirer';
import logger from './util/logger';

// import { writePublishToken } from '../utils/token';
// const env = process.env.MUM_PUBLISH_ENV as string;

// const tokenSchema = {
//   properties: {
//     token: {
//       require: true,
//       message: '请输入你申请到的Token'
//     }
//   }
// }

// cli 取消TS编译

// login逻辑

// 检测是否用户目录是否有文件夹 .qiejs 是否有文件 .key
// 是否有内容
// 内容是否有 accessKeyId 和 accessKeySecret
// 是否有相关项目配置 ‘xxx-xxx’
// 都有，则显示登录成功 + 配置文件位置
// 没有，则生成，显示登录成功 + 配置文件位置
// 如果生成的信息有误，请手动修改配置文件

const prompts = [
  { name: 'accessKeyId', type: 'input', message: `keyId: ` },
  { name: 'accessKeySecret', type: 'input', message: `keySecret: ` }
];

const login = async () => {
  try {
    const data = await inquirer.prompt(prompts);
    let { keyId, keySecret } = data;
    keyId = keyId.trim();
    keySecret = keySecret.trim();
    if (keyId && keySecret) {
    } else {
      console.log('');
      logger.warn('请输入完整的 keyId 或 keySecret');
    }
  } catch (e) {
    console.log('');
    logger.fatal('登录失败');
  }
};

export default login;

// export const eevee = () => {
//   prompt.start();
//   prompt.get(tokenSchema, (err, result) => {
//     if (err && err.message != 'canceled') {
//       console.log('\n');
//       console.log(err.message);
//     }
//     if (result && result.token) {
//       writePublishToken(result.token, env === 'development' ? '' : env);
//       console.log('登录eevee成功');
//     }
//   })
// }

// 第一次生成项目 登录 qie-cli login 进行登录操作

// 必填
// oss_key_id;
// oss_key_secret;

// // 非必填
// dev_key;
// pro_key;

// 生成文件 .qiejs/.key
// {
//   accessKeyId：'',
//   accessKeySecret: '',
//   projects: {
//     'qie-admin-pad': {dev: '', pro: ''},
//   }
// }
