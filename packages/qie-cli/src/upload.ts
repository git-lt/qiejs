import * as path from "path";
import AliossUpload from "./util/AliossUpload";
import { CONFIG_FILE_NAME } from "./util/constants";
import { checkConfigProp, isDirEmpty } from "./util";
import logger from "./util/logger";

const resolve = function(relativePath) {
  return path.resolve(process.cwd(), relativePath);
};

interface IUploadProps {
  record?: boolean;
  dir?: string | boolean;
  prefix?: string;
}

const isString = (v: any): boolean => typeof v === "string";

const upload = async (options: IUploadProps) => {
  const { dir, record, prefix } = options;
  const config = require(resolve(CONFIG_FILE_NAME));
  const uploadConfig = config.upload;

  // 检查 qie.config.js 中必填参数
  const check = checkConfigProp(uploadConfig);
  const access =
    check("accessKeyId") && check("accessKeySecret") && check("bucket");
  if (!access) return;

  if (isString(dir)) uploadConfig.dir = dir;
  if (isString(prefix)) uploadConfig.prefix = prefix;

  // 检查 是否指定目录
  if (!uploadConfig.dir) {
    logger.warn("请指定需要上传的目录");
    return;
  }

  // 检查 目录是否为空
  isDirEmpty(uploadConfig.dir);

  const alioss = new AliossUpload(uploadConfig);
  await alioss.start();

  if (record) {
    require("./publish")(config);
  }
};

export default upload;
