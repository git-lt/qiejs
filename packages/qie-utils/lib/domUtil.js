"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prev = Date.now();
var root = (typeof window === 'undefined' ? global : window);
function fallback(fn) {
    var curr = Date.now();
    var ms = Math.max(0, 16 - (curr - prev));
    var id = setTimeout(fn, ms);
    prev = curr + ms;
    return id;
}
var iRaf = root.requestAnimationFrame || fallback;
var iCancel = root.cancelAnimationFrame || root.clearTimeout;
function raf(fn) {
    return iRaf.call(root, fn);
}
exports.raf = raf;
function cancelRaf(id) {
    iCancel.call(root, id);
}
exports.cancelRaf = cancelRaf;
function scrollTop(el, from, to, duration, endCallback) {
    if (from === void 0) { from = 0; }
    if (duration === void 0) { duration = 500; }
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
        if (el === root) {
            root.scrollTo(d, d);
        }
        else {
            el.scrollTop = d;
        }
        raf(function () { return scroll(d, end, step); });
    };
    scroll(from, to, step);
}
exports.scrollTop = scrollTop;
exports.default = {
    scrollTop: scrollTop,
    raf: raf,
    cancelRaf: cancelRaf,
};
