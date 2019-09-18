"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var detector_1 = __importDefault(require("detector"));
var os = detector_1.default.os, engine = detector_1.default.engine, browser = detector_1.default.browser, device = detector_1.default.device;
var context = {
    os: os.name + "/" + os.version,
    browser: browser.name + "/" + browser.version,
    engine: engine.name + "/" + engine.version,
    device: device.name + "/" + device.version,
    level: "info" /* INFO */,
    type: "default" /* DEFAULT */,
    environment: "",
    message: ""
};
// Tracker
function createHttpRequest() {
    if (window.ActiveXObject) {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
var AliLogTracker = /** @class */ (function () {
    function AliLogTracker(options) {
        var enable = options.enable, environment = options.environment, project = options.project, endpoint = options.endpoint, logstore = options.logstore;
        var PROTOCOL = window.location.protocol;
        this.enable = enable;
        this.environment = environment;
        this.uri_ = PROTOCOL + "//" + project + "." + endpoint + "/logstores/" + logstore + "/track?APIVersion=0.6.0";
        this.params_ = new Array();
        this.httpRequest_ = createHttpRequest();
    }
    AliLogTracker.prototype.push = function (key, value) {
        if (!this.enable)
            return;
        if (!key || !value) {
            return;
        }
        try {
            value = JSON.stringify(value);
        }
        catch (e) { }
        this.params_.push(key);
        this.params_.push(value);
    };
    AliLogTracker.prototype.logger = function (type, level) {
        if (!this.enable)
            return;
        if (type)
            context.type = type;
        if (level)
            context.level = level;
        context.environment = this.environment;
        for (var k_1 in context) {
            this.push(k_1, context[k_1]);
        }
        var url = this.uri_;
        var k = 0;
        while (this.params_.length > 0) {
            if (k % 2 == 0) {
                url += "&" + encodeURIComponent(this.params_.shift());
            }
            else {
                url += "=" + encodeURIComponent(this.params_.shift());
            }
            ++k;
        }
        try {
            this.httpRequest_.open("GET", url, true);
            this.httpRequest_.send(null);
        }
        catch (ex) {
            if (window &&
                window.console &&
                typeof window.console.log === "function") {
                console.log("Failed to log to ali log service because of this exception:\n" + ex);
                console.log("Failed log data:", url);
            }
        }
    };
    AliLogTracker.prototype.setUser = function (customerInfo) {
        if (!this.enable)
            return;
        Object.assign(context, customerInfo || {});
    };
    AliLogTracker.prototype.setMessage = function (msg) {
        if (!this.enable)
            return;
        try {
            msg = JSON.stringify(msg);
        }
        catch (e) { }
        this.push("message", msg);
    };
    AliLogTracker.prototype.setExtra = function (msg) {
        if (!this.enable)
            return;
        try {
            msg = JSON.stringify(msg);
        }
        catch (e) { }
        this.push("remark", msg);
    };
    return AliLogTracker;
}());
exports.default = AliLogTracker;
