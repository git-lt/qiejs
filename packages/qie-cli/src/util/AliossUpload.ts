// https://github.com/staven630/webpack-oss
import * as path from "path";
import * as fs from "fs";
import * as OSS from "ali-oss";
import logger from "./logger";

export interface IAliossConfig {
  accessKeyId: string;
  accessKeySecret: string;
  region: string;
  bucket: string;

  prefix: string;
  exclude: RegExp[] | RegExp;
  deleteAll: boolean;
  deleteExclude: String[];
  dir: string;
}

class AliossUpload {
  config: IAliossConfig;
  client: any;
  constructor(options: IAliossConfig) {
    this.config = Object.assign(
      {
        prefix: "",
        exclude: null,
        removeMode: true,
        deleteExlude: null,
        dir: ""
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
      await this.uploadLocale(this.config.dir);
    } else {
      await this.uploadLocale(this.config.dir);
    }
    return;
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
        "max-keys": 1000
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

  filterFile(name: string) {
    const { exclude } = this.config;
    return (
      !exclude ||
      ((Array.isArray(exclude) && !exclude.some(item => item.test(name))) ||
        (!Array.isArray(exclude) && !exclude.test(name)))
    );
  }

  getFileName(name: string): string {
    const { config } = this;
    const prefix = config.prefix;
    return path.join(prefix, name).replace(/\\/g, "/");
  }

  async update(name: string, content: string) {
    const fileName = this.getFileName(name);
    try {
      const result = await this.client.put(fileName, content);
      if (+result.res.statusCode === 200) {
        logger.success(`${fileName} [上传成功]`);
      } else {
        logger.error(`${fileName} [上传失败]`);
      }
    } catch (error) {
      logger.error(`${fileName} [上传失败]`);
    }
  }

  async uploadLocale(dir: string) {
    const result = fs.readdirSync(dir);
    await this.asyncForEach(result, async file => {
      const filePath = path.join(dir, file);
      if (this.filterFile(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          await this.uploadLocale(filePath);
        } else {
          const fileName = filePath.slice(this.config.dir.length);
          await this.update(fileName, filePath);
        }
      }
    });
  }
}

export default AliossUpload;
