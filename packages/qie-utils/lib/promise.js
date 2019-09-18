"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 暂停执行 多少毫秒
 * @param ms 毫秒
 */
function sleep(ms) {
    return new Promise(function (r) { return setTimeout(r, ~~ms); });
}
exports.sleep = sleep;
