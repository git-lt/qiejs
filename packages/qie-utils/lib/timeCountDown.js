"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var noop = function () { };
var TimeCountDown = /** @class */ (function () {
    function TimeCountDown(config) {
        var ms = config.ms, onTick = config.onTick, interval = config.interval, onFinshed = config.onFinshed;
        this.ms = ms;
        this.onTick = onTick || noop;
        this.onFinshed = onFinshed || noop;
        this.interval = interval || 1000;
        this.timmer = null;
        this.count = 0;
        this.endTime = new Date().getTime();
        this.start();
    }
    TimeCountDown.prototype.start = function () {
        var _this = this;
        this.count++;
        var offset = new Date().getTime() - (this.endTime + this.count * this.interval);
        var nextTime = this.interval - offset;
        if (nextTime < 0) {
            nextTime = 0;
        }
        this.ms -= this.interval;
        if (this.ms < 0) {
            window.clearTimeout(this.timmer);
            this.timmer = null;
            this.onFinshed();
        }
        else {
            var d = Math.floor(this.ms / (24 * 60 * 60 * 1000));
            var h = Math.floor(this.ms / (60 * 60 * 1000) - d * 24);
            var m = Math.floor(this.ms / (60 * 1000) - d * 24 * 60 - h * 60);
            var s = Math.floor((this.ms / 1000) % 60);
            this.onTick({
                days: d,
                hours: h,
                minutes: m,
                seconds: s,
                milliseconds: this.ms
            });
            this.timmer = window.setTimeout(function () { return _this.start(); }, nextTime);
        }
    };
    TimeCountDown.prototype.stop = function () {
        window.clearTimeout(this.timmer);
        this.timmer = null;
    };
    return TimeCountDown;
}());
var timeCountDown = function (config) { return new TimeCountDown(config); };
exports.default = timeCountDown;
