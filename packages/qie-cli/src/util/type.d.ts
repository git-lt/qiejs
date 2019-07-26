import { IAliossConfig } from "./AliossUpload";

interface IEnvConfig {
  name: string;
  key: string;
}

export interface IQieConfig {
  type: "SPA" | "MPA";
  publishApi: string;
  env: IEnvConfig[];
  cdnBaseUrl: string;
  upload: IAliossConfig;
}
