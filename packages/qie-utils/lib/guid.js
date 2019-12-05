"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lut = [];
for (var i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
/**
 * 创建唯一ID
 * @example uuid() // "5de77f38-3e1b-4aca-9561-2a18165a77d9"
 */
function uuid() {
    var d0 = (Math.random() * 0xffffffff) | 0;
    var d1 = (Math.random() * 0xffffffff) | 0;
    var d2 = (Math.random() * 0xffffffff) | 0;
    var d3 = (Math.random() * 0xffffffff) | 0;
    return (lut[d0 & 0xff] +
        lut[(d0 >> 8) & 0xff] +
        lut[(d0 >> 16) & 0xff] +
        lut[(d0 >> 24) & 0xff] +
        "-" +
        lut[d1 & 0xff] +
        lut[(d1 >> 8) & 0xff] +
        "-" +
        lut[((d1 >> 16) & 0x0f) | 0x40] +
        lut[(d1 >> 24) & 0xff] +
        "-" +
        lut[(d2 & 0x3f) | 0x80] +
        lut[(d2 >> 8) & 0xff] +
        "-" +
        lut[(d2 >> 16) & 0xff] +
        lut[(d2 >> 24) & 0xff] +
        lut[d3 & 0xff] +
        lut[(d3 >> 8) & 0xff] +
        lut[(d3 >> 16) & 0xff] +
        lut[(d3 >> 24) & 0xff]);
}
exports.uuid = uuid;
/**
 * 创建指定长度的ID，可添加前缀
 * @param length id的长度，不包含前缀长度
 * @param prefix 前缀，默认为空
 * @example randomId() // 05bbfd
 */
function randomId(length, prefix) {
    if (length === void 0) { length = 6; }
    if (prefix === void 0) { prefix = ""; }
    // 随机指定个数-1个字符，再加一个随几数
    return (prefix +
        Math.random()
            .toString(16)
            .slice(2, length + 1) +
        String((Math.random() * 10) << 0));
}
exports.randomId = randomId;
