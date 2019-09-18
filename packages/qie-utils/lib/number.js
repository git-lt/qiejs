"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var numeral_1 = __importDefault(require("numeral"));
exports.numeral = numeral_1.default;
numeral_1.default.defaultFormat("0,0.00");
/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @example utilscore.randomNum(5,10) // => 5 || 6 || 7 || 8 || 9 || 10
 */
exports.randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 * @example utilscore.round(12.555,2) // => 12.56
 */
exports.toFixedNum = function (n, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return Number(Math.round(Number(n + "e" + decimals)) + "e-" + decimals);
};
/**
 * 将数字转化为千分位格式,可以在数字前面加上符号
 * @param {Number|String} num
 * @param {String} mark
 * @returns {String}
 * @example utilscore.toDecimalMark(12345674654.123,'￥') // => "￥12,345,674,654.123"
 */
exports.toDecimalMark = function (num, mark) {
    if (mark === void 0) { mark = ""; }
    return num.toLocaleString("en-US").replace(/^/, mark);
};
/**
 * 小数是否相等
 * @param x
 * @param y
 */
function epsEqDecimal(x, y) {
    return Math.abs(x - y) < Number.EPSILON;
}
exports.epsEqDecimal = epsEqDecimal;
/**
 * 单位转换 px 转 vw
 * @param v px数值
 * @param useUnit 是否添加 vw 单位
 */
function px2vw(v, useUnit) {
    if (useUnit === void 0) { useUnit = true; }
    return exports.toFixedNum((v / 750) * 100, 3) + (useUnit ? "vw" : "");
}
exports.px2vw = px2vw;
/**
 * 单位转换 vw 转 px
 * @param v vw数值
 * @param useUnit 是否添加 px 单位
 */
function vw2Px(v, useUnit) {
    if (useUnit === void 0) { useUnit = true; }
    return exports.toFixedNum(750 * (v / 100), 3) + (useUnit ? "px" : "");
}
exports.vw2Px = vw2Px;
/**
 * 文件大小单位转换 kb 转 mb
 * @param num kb数值
 */
function kb2mb(num) {
    return (num / (1000 * 1000)).toFixed(2) + "M";
}
exports.kb2mb = kb2mb;
/**
 * 格式化为金额（传入分）
 * @param num
 * @param formatStr 字符串格式化
 */
function formatPrice(num, formatStr) {
    if (!num)
        return "0";
    return numeral_1.default(num)
        .clone()
        .divide(100)
        .format(formatStr || "0,0.00");
}
exports.formatPrice = formatPrice;
/**
 * 数字格式化
 * @param v
 * @param formatStr
 */
function formatNum(v, formatStr) {
    return numeral_1.default(v).format(formatStr || "0,0");
}
exports.formatNum = formatNum;
/**
 * 加
 * @param x
 * @param y
 */
function add(x, y) {
    return numeral_1.default(x).add(y);
}
exports.add = add;
/**
 * 减
 * @param x
 * @param y
 */
function sub(x, y) {
    return numeral_1.default(x).subtract(y);
}
exports.sub = sub;
/**
 * 乘
 * @param x
 * @param y
 */
function mul(x, y) {
    return numeral_1.default(x).multiply(y);
}
exports.mul = mul;
/**
 * 除
 * @param x
 * @param y
 */
function div(x, y) {
    return numeral_1.default(x).divide(y);
}
exports.div = div;
