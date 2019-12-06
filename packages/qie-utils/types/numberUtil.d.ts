/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @example utilscore.randomNum(5,10) // => 5 || 6 || 7 || 8 || 9 || 10
 */
declare function randomNum(min: number, max: number): number;
/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 * @example utilscore.round(12.555,2) // => 12.56
 */
declare function toFixedNum(n: number, decimals?: number): number;
/**
 * 将数字转化为千分位格式,可以在数字前面加上符号
 * @param {Number|String} num
 * @param {String} mark
 * @returns {String}
 * @example utilscore.toDecimalMark(12345674654.123,'￥') // => "￥12,345,674,654.123"
 */
declare function toDecimalMark(num: number, mark?: string): string;
/**
 * 小数是否相等
 * @param x
 * @param y
 */
declare function epsEqDecimal(x: number, y: number): boolean;
/**
 * 单位转换 px 转 vw
 * @param v px数值
 * @param useUnit 是否添加 vw 单位
 */
declare function px2vw(v: number, useUnit?: boolean): string;
/**
 * 单位转换 vw 转 px
 * @param v vw数值
 * @param useUnit 是否添加 px 单位
 */
declare function vw2Px(v: number, useUnit?: boolean): string;
/**
 * 文件大小单位转换 kb 转 mb
 * @param num kb数值
 */
declare function kb2mb(num: number): string;
/**
 * 格式化为金额（传入分）
 * @param num
 * @param formatStr 字符串格式化
 */
declare function formatPrice(num: number, formatStr?: string): string;
/**
 * 去掉后面的0
 * @param num
 * @example 2.00 -> 2  2.10 -> 2.1
 */
declare function unFormat(num: number): number;
/**
 * 数字格式化
 * @param v
 * @param formatStr
 */
declare function formatNum(v: number, formatStr: string): string;
/**
 * 加
 * @param x
 * @param y
 */
declare function add(x: number, y: number): string;
/**
 * 减
 * @param x
 * @param y
 */
declare function sub(x: number, y: number): string;
/**
 * 乘
 * @param x
 * @param y
 */
declare function mul(x: number, y: number): string;
/**
 * 除
 * @param x
 * @param y
 */
declare function div(x: number, y: number): string;
declare const _default: {
    randomNum: typeof randomNum;
    toFixedNum: typeof toFixedNum;
    toDecimalMark: typeof toDecimalMark;
    epsEqDecimal: typeof epsEqDecimal;
    px2vw: typeof px2vw;
    vw2Px: typeof vw2Px;
    kb2mb: typeof kb2mb;
    formatPrice: typeof formatPrice;
    unFormat: typeof unFormat;
    formatNum: typeof formatNum;
    add: typeof add;
    sub: typeof sub;
    mul: typeof mul;
    div: typeof div;
};
export default _default;
