/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} str 字符串
 * @param {number} startIndex 起始索引
 * @param {number} endIndex 结束索引
 * @param {string} _mask 遮蔽字符
 * @example utilscore.mask('12398765432',3,7) // => "123****5432"
 */
export declare const numberMask: (str: string, startIndex?: number, endIndex?: number, _mask?: string) => string;
/**
 * 生成一个随机的十六进制颜色代码
 * @example utilscore.randomHexColorCode() // => "#c4aabc"
 */
export declare const randomHexColorCode: () => string;
/**
 * 获取中文字符长度
 * @param str 字符串
 * @example getCNStrLength('aa中文') // 3
 */
export declare function getCNStrLength(str: string): number;
/**
 * 获取文件后缀
 * @param fileName 文件名
 * @example getFileSuffix('1.jpg') // .jpg
 */
declare function getFileSuffix(fileName: string): string;
/**
 * 根据id 获取 对象列表中相同id 对应的 name
 * @param list
 * @param id
 * @example getNameById([{id: 1, name: 'a'},{id: 2, name: 'b'},{id: 3, name: 'c'}], 1) // a
 */
declare function getNameById(list: any[], id: number | string): string;
/**
 * 按指定数量生成给定字符串字符
 * @param {string|number} ch 输入字符串,如'我是测试的字符串', 或 输入数字如 220022
 * @param {number} repeatTimes 输入数字,如 '6'
 * @returns {string} 指定数量的给定字符串
 *
 * @example
 *  repeat('AB ',6); // 'AB AB AB AB AB AB '
 *  repeat('C  D',3); //'C  DC  DC  D'
 *  repeat('20', 3); //'202020'
 */
declare function repeat(ch: string | number, repeatTimes: number): string;
/**
 * 去除字符串中的空格
 * @param {string} input 输入字符串,如'我是 测试 的 字符串  '
 * @returns {string} 去除空格后的字符串
 *
 * @example
 *  deleteWhitespace('我是 测试 的 字符串  '); // '我是测试的字符串'
 *  deleteWhitespace(''); //''
 */
declare function delWhitespace(input: string): string;
/**
 * 判断字符串是否为空
 * @param {String} input 输入字符串，如'我是测试的字符串'
 * @returns {boolean} 是/否
 *
 * @example
 *  isEmpty('我是测试的字符串'); // false
 *  isEmpty(''); // true
 */
declare function isEmpty(input: string): boolean;
/**
 * 统计含有的子字符串的个数
 * @param {string} input 输入字符串,如'abcdeabcdeabcde',
 * @param {string} sub 输入字符串,如'ab',
 * @returns {number} 统计后字符串的个数
 *
 * @example
 *  countMatches('dabddadb', 'da'); // 3
 *  countMatches('abcdeabcdeabcde','ab'); // 6
 */
declare function countMatches(input: string, sub: string): number;
/**
 * 创建指定长度的ID，可添加前缀
 * @param length id的长度，不包含前缀长度
 * @param prefix 前缀，默认为空
 * @example randomId() // 05bbfd
 */
declare function randomId(length?: number, prefix?: string): string;
declare const _default: {
    getFileSuffix: typeof getFileSuffix;
    getNameById: typeof getNameById;
    repeat: typeof repeat;
    delWhitespace: typeof delWhitespace;
    isEmpty: typeof isEmpty;
    countMatches: typeof countMatches;
    randomId: typeof randomId;
};
export default _default;
