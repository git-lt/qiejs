export declare const enum TrackerLevel {
    INFO = "info",
    ERROR = "error",
    WARNING = "warning",
    DEBUG = "debug",
    FATAL = "fatal"
}
export declare const enum TrackerType {
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
declare class AliLogTracker {
    uri_: string;
    params_: any;
    httpRequest_: any;
    enable: boolean;
    environment: string;
    constructor(options: ITracker);
    push(key: string, value: any): void;
    logger(type?: TrackerType, level?: TrackerLevel): void;
    setUser(customerInfo: any): void;
    setMessage(msg: string): void;
    setExtra(msg: any): void;
}
export default AliLogTracker;
