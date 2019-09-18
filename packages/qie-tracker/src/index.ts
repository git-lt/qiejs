import detector from "detector";
const { os, engine, browser, device } = detector;

export const enum TrackerLevel {
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
  DEBUG = "debug",
  FATAL = "fatal"
}

export const enum TrackerType {
  DEFAULT = "default",
  HTTP = "http",
  ERROR = "error",
  VIDEO = "video",
  DEVICE = "device",
  LIMITBUY = "limitbuy"
}

export interface ITracker {
  enable: boolean;
  environment: string;
  project: string;
  endpoint: string;
  logstore: string;
}

let context: Record<string, string> = {
  os: `${os.name}/${os.version}`,
  browser: `${browser.name}/${browser.version}`,
  engine: `${engine.name}/${engine.version}`,
  device: `${device.name}/${device.version}`,
  level: TrackerLevel.INFO,
  type: TrackerType.DEFAULT,
  environment: "",
  message: ""
};

// Tracker
function createHttpRequest() {
  if (window.ActiveXObject) {
    return new window.ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

class AliLogTracker {
  uri_: string;
  params_: any;
  httpRequest_: any;
  enable: boolean;
  environment: string;

  constructor(options: ITracker) {
    const { enable, environment, project, endpoint, logstore } = options;
    const PROTOCOL = window.location.protocol;

    this.enable = enable;
    this.environment = environment;
    this.uri_ = `${PROTOCOL}//${project}.${endpoint}/logstores/${logstore}/track?APIVersion=0.6.0`;
    this.params_ = new Array();
    this.httpRequest_ = createHttpRequest();
  }

  push(key: string, value: any) {
    if (!this.enable) return;

    if (!key || !value) {
      return;
    }
    try {
      value = JSON.stringify(value);
    } catch (e) {}

    this.params_.push(key);
    this.params_.push(value);
  }

  logger(type?: TrackerType, level?: TrackerLevel) {
    if (!this.enable) return;

    if (type) context.type = type;
    if (level) context.level = level;
    context.environment = this.environment;

    for (let k in context) {
      this.push(k, context[k]);
    }

    var url = this.uri_;
    var k = 0;
    while (this.params_.length > 0) {
      if (k % 2 == 0) {
        url += "&" + encodeURIComponent(this.params_.shift());
      } else {
        url += "=" + encodeURIComponent(this.params_.shift());
      }
      ++k;
    }
    try {
      this.httpRequest_.open("GET", url, true);
      this.httpRequest_.send(null);
    } catch (ex) {
      if (
        window &&
        window.console &&
        typeof window.console.log === "function"
      ) {
        console.log(
          "Failed to log to ali log service because of this exception:\n" + ex
        );
        console.log("Failed log data:", url);
      }
    }
  }

  setUser(customerInfo: any) {
    if (!this.enable) return;
    Object.assign(context, customerInfo || {});
  }

  setMessage(msg: string) {
    if (!this.enable) return;

    try {
      msg = JSON.stringify(msg);
    } catch (e) {}
    this.push("message", msg);
  }

  setExtra(msg: any) {
    if (!this.enable) return;

    try {
      msg = JSON.stringify(msg);
    } catch (e) {}
    this.push("remark", msg);
  }
}

export default AliLogTracker;
