// https://github.com/staven630/webpack-oss
const logger = require('./logger');
const path = require('path');
const fs = require('fs');
const OSS = require('ali-oss');
const ora = require('ora');

class AliossUpload {
  constructor(options) {
    this.config = Object.assign(
      {
        prefix: '',
        exclude: null,
        removeMode: true,
        // 清空时忽略的文件
        deleteExlude: null,
        dir: 'zip',
        bucket: 'qie-test',
        region: 'oss-cn-hangzhou'
      },
      options
    );
    this.client = new OSS({
      accessKeyId: options.accessKeyId,
      accessKeySecret: options.accessKeySecret,
      bucket: options.bucket,
      region: options.region
    });
  }

  async start() {
    if (this.config.deleteAll) {
      await this.delAllAssets();
      return await this.uploadLocale(this.config.dir);
    } else {
      return await this.uploadLocale(this.config.dir);
    }
  }

  async asyncForEach(arr, cb) {
    for (let i = 0; i < arr.length; i++) {
      await cb(arr[i], i);
    }
  }

  async delAllAssets() {
    try {
      const { prefix, deleteExclude } = this.config;
      let result = await this.client.list({
        prefix,
        'max-keys': 1000
      });

      if (result.objects) {
        result = result.objects.map(file => file.name);
      }

      // 排除不需要删除的文件
      if (Array.isArray(deleteExclude)) {
        result = result.filter(v => {
          return !deleteExclude.some(i => v.startsWith(i));
        });
      }

      if (Array.isArray(result)) {
        result = await this.client.deleteMulti(result, { quiet: true });
      }
      return;
    } catch (error) {
      return;
    }
  }

  filterFile(name) {
    const { exclude } = this.config;
    return (
      !exclude || (Array.isArray(exclude) && !exclude.some(item => item.test(name))) || (!Array.isArray(exclude) && !exclude.test(name))
    );
  }

  getFileName(name) {
    const { config } = this;
    const prefix = config.prefix;
    return path.join(prefix, name).replace(/\\/g, '/');
  }

  async update(name, content) {
    const fileName = this.getFileName(name);
    const spinner = ora(`Uploading resources...`).start();
    try {
      const result = await this.client.put(fileName, content);
      if (+result.res.statusCode === 200) {
        spinner.succeed(`${fileName} upload successed`);
      } else {
        spinner.fail(`${fileName} upload failed`);
        process.exit(0);
      }
    } catch (error) {
      spinner.fail(`${fileName} upload failed`);
      logger.error(error);
      process.exit(0);
    }
  }

  async uploadLocale(dir) {
    const result = fs.readdirSync(dir);
    await this.asyncForEach(result, async file => {
      const filePath = path.join(dir, file);
      if (this.filterFile(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          return await this.uploadLocale(filePath);
        } else {
          const fileName = filePath.slice(this.config.dir.length);
          return await this.update(fileName, filePath);
        }
      }
    });
  }
}

module.exports = AliossUpload;
