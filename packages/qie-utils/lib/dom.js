"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollTop = function (el, from, to, duration, endCallback) {
    if (from === void 0) { from = 0; }
    if (duration === void 0) { duration = 500; }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
    }
    var difference = Math.abs(from - to);
    var step = Math.ceil((difference / duration) * 50);
    var scroll = function (start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }
        var d = start + step > end ? end : start + step;
        if (start > end) {
            d = start - step < end ? end : start - step;
        }
        if (el === window) {
            window.scrollTo(d, d);
        }
        else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(function () { return scroll(d, end, step); });
    };
    scroll(from, to, step);
};
