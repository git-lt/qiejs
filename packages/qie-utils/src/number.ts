import numeral from "numeral";
numeral.defaultFormat("0.00");

/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @example utilscore.randomNum(5,10) // => 5 || 6 || 7 || 8 || 9 || 10
 */
const randomNum = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 * @example utilscore.round(12.555,2) // => 12.56
 */
const toFixedNum = (n: number, decimals = 0): number => {
  return Number(`${Math.round(Number(`${n}e${decimals}`))}e-${decimals}`);
};

/**
 * 将数字转化为千分位格式,可以在数字前面加上符号
 * @param {Number|String} num
 * @param {String} mark
 * @returns {String}
 * @example utilscore.toDecimalMark(12345674654.123,'￥') // => "￥12,345,674,654.123"
 */
const toDecimalMark = (num: number, mark = ""): string => num.toLocaleString("en-US").replace(/^/, mark);

/**
 * 小数是否相等
 * @param x
 * @param y
 */
function epsEqDecimal(x: number, y: number): boolean {
  return Math.abs(x - y) < Number.EPSILON;
}

/**
 * 单位转换 px 转 vw
 * @param v px数值
 * @param useUnit 是否添加 vw 单位
 */
function px2vw(v: number, useUnit = true): string {
  return toFixedNum((v / 750) * 100, 3) + (useUnit ? "vw" : "");
}

/**
 * 单位转换 vw 转 px
 * @param v vw数值
 * @param useUnit 是否添加 px 单位
 */
function vw2Px(v: number, useUnit = true): string {
  return toFixedNum(750 * (v / 100), 3) + (useUnit ? "px" : "");
}

/**
 * 文件大小单位转换 kb 转 mb
 * @param num kb数值
 */
function kb2mb(num: number): string {
  return (num / (1000 * 1000)).toFixed(2) + "M";
}

/**
 * 格式化为金额（传入分）
 * @param num
 * @param formatStr 字符串格式化
 */
function formatPrice(num: number, formatStr?: string): string {
  if (!num) return "0";
  return numeral(num)
    .clone()
    .divide(100)
    .format(formatStr || "0.00");
}
/**
 * 去掉后面的0
 * @param num
 * @example 2.00 -> 2  2.10 -> 2.1
 */
function unFormat(num: number) {
  if (!num) return 0.0;
  return parseFloat(formatPrice(num));
}

/**
 * 数字格式化
 * @param v
 * @param formatStr
 */
function formatNum(v: number, formatStr: string) {
  return numeral(v).format(formatStr || "0,0");
}

/**
 * 加
 * @param x
 * @param y
 */
function add(x: number, y: number) {
  return numeral(x).add(y);
}

/**
 * 减
 * @param x
 * @param y
 */
function sub(x: number, y: number) {
  return numeral(x).subtract(y);
}

/**
 * 乘
 * @param x
 * @param y
 */
function mul(x: number, y: number) {
  return numeral(x).multiply(y);
}

/**
 * 除
 * @param x
 * @param y
 */
function div(x: number, y: number) {
  return numeral(x).divide(y);
}
export default {
  numeral,
  randomNum,
  toFixedNum,
  toDecimalMark,
  epsEqDecimal,
  px2vw,
  vw2Px,
  kb2mb,
  formatPrice,
  unFormat,
  formatNum,
  add,
  sub,
  mul,
  div
};
