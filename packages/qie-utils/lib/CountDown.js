"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var domUtil_1 = require("./domUtil");
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
/**
 * 数字补0
 * @param num 数字
 * @param targetLength 长度
 * @example padZero(2) -> '02'
 */
function padZero(num, targetLength) {
    if (targetLength === void 0) { targetLength = 2; }
    var str = num + '';
    while (str.length < targetLength) {
        str = '0' + str;
    }
    return str;
}
/**
 * 传入毫秒数，计算剩余 天时分秒数
 * @param time 毫秒数
 * @example parseTimeData(60*1000) -> {days, hours, minutes, seconds, milliseconds}
 */
function parseTimeData(time) {
    var days = Math.floor(time / DAY);
    var hours = Math.floor((time % DAY) / HOUR);
    var minutes = Math.floor((time % HOUR) / MINUTE);
    var seconds = Math.floor((time % MINUTE) / SECOND);
    var milliseconds = Math.floor(time % SECOND);
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
    };
}
/**
 * 格式化为 天时分秒
 * @param format 例：DD:HH:mm:ss:SSS
 * @param timeData 天时分秒数据对象
 * @example parseFormat('DD 天 HH 时', {}) -> 01 天 04 时
 */
function parseFormat(format, timeData) {
    var days = timeData.days;
    var hours = timeData.hours, minutes = timeData.minutes, seconds = timeData.seconds, milliseconds = timeData.milliseconds;
    if (format.indexOf('DD') === -1) {
        hours += days * 24;
    }
    else {
        format = format.replace('DD', padZero(days));
    }
    if (format.indexOf('HH') === -1) {
        minutes += hours * 60;
    }
    else {
        format = format.replace('HH', padZero(hours));
    }
    if (format.indexOf('mm') === -1) {
        seconds += minutes * 60;
    }
    else {
        format = format.replace('mm', padZero(minutes));
    }
    if (format.indexOf('ss') === -1) {
        milliseconds += seconds * 1000;
    }
    else {
        format = format.replace('ss', padZero(seconds));
    }
    if (format.indexOf('S') !== -1) {
        var ms = padZero(milliseconds, 3);
        if (format.indexOf('SSS') !== -1) {
            format = format.replace('SSS', ms);
        }
        else if (format.indexOf('SS') !== -1) {
            format = format.replace('SS', ms.slice(0, 2));
        }
        else {
            format = format.replace('S', ms.charAt(0));
        }
    }
    return format;
}
/**
 * 判断两个毫秒数是否相等
 * @param time1 毫秒数1
 * @param time2 毫秒数1
 */
function isSameSecond(time1, time2) {
    return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
var CountDown = /** @class */ (function () {
    function CountDown(options) {
        var _this = this;
        // 开始
        this.start = function () {
            if (_this.isCounting)
                return;
            _this.isCounting = true;
            _this.endTime = Date.now() + _this.time;
            _this.tick();
        };
        var time = options.time, format = options.format, autoStart = options.autoStart, millisecond = options.millisecond, onFinish = options.onFinish, onChange = options.onChange;
        this.time = time || 0;
        this.format = format || 'HH:mm:ss';
        this.autoStart = autoStart !== false;
        this.millisecond = !!millisecond;
        this.onFinish = onFinish;
        this.onChange = onChange;
        this.remain = 0;
        this.endTime = 0;
        this.isCounting = false;
        this.autoStart && this.start();
    }
    // 停止
    CountDown.prototype.pause = function () {
        this.isCounting = false;
        domUtil_1.cancelRaf(this.rafId);
    };
    // 重置
    CountDown.prototype.reset = function () {
        this.pause();
        this.remain = +this.time;
        this.autoStart && this.start();
    };
    // 更新
    CountDown.prototype.tick = function () {
        this.millisecond ? this.microTick() : this.macroTick();
    };
    // 毫秒级的更新
    CountDown.prototype.microTick = function () {
        var _this = this;
        this.rafId = domUtil_1.raf(function () {
            if (!_this.isCounting)
                return;
            var remain = _this.getRemain();
            _this.setRemain(remain);
            _this.remain > 0 && _this.microTick();
        });
    };
    // 秒级更新
    CountDown.prototype.macroTick = function () {
        var _this = this;
        this.rafId = domUtil_1.raf(function () {
            if (!_this.isCounting)
                return;
            var remain = _this.getRemain();
            if (!isSameSecond(remain, _this.remain) || remain === 0) {
                _this.setRemain(remain);
            }
            if (_this.remain > 0) {
                _this.macroTick();
            }
        });
    };
    // 获取剩余的毫秒
    CountDown.prototype.getRemain = function () {
        return Math.max(this.endTime - Date.now(), 0);
    };
    // 设置剩余的毫秒
    CountDown.prototype.setRemain = function (remain) {
        this.remain = remain;
        this.timeData = parseTimeData(this.remain);
        this.formattedTime = parseFormat(this.format, this.timeData);
        // 触发更新回调
        this.onChange(this.formattedTime, this.timeData);
        if (remain === 0) {
            this.pause();
            // 触发结束
            this.onFinish();
        }
    };
    return CountDown;
}());
exports.default = CountDown;
