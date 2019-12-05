"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} str 字符串
 * @param {number} startIndex 起始索引
 * @param {number} endIndex 结束索引
 * @param {string} _mask 遮蔽字符
 * @example utilscore.mask('12398765432',3,7) // => "123****5432"
 */
exports.numberMask = function (str, startIndex, endIndex, _mask) {
    if (startIndex === void 0) { startIndex = 0; }
    if (endIndex === void 0) { endIndex = 0; }
    if (_mask === void 0) { _mask = "*"; }
    var reg = new RegExp("^(.{" + startIndex + "})(.{" + (endIndex - startIndex) + "})(." + (endIndex >= str.length ? "?" : "+") + ")$");
    return str.replace(reg, function (_$0, $1, $2, $3) { return $1 + $2.replace(/./g, _mask) + $3; });
};
/**
 * 生成一个随机的十六进制颜色代码
 * @example utilscore.randomHexColorCode() // => "#c4aabc"
 */
exports.randomHexColorCode = function () {
    var n = ((Math.random() * 0xfffff) | 0).toString(16);
    return "#" + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};
/**
 * 获取中文字符长度
 * @param str 字符串
 * @example getCNStrLength('aa中文') // 3
 */
function getCNStrLength(str) {
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length / 2;
}
exports.getCNStrLength = getCNStrLength;
/**
 * 获取文件后缀
 * @param fileName 文件名
 * @example getFileSuffix('1.jpg') // .jpg
 */
function getFileSuffix(fileName) {
    var pos = fileName.lastIndexOf(".");
    return pos > -1 ? fileName.substring(pos) : "";
}
/**
 * 根据id 获取 对象列表中相同id 对应的 name
 * @param list
 * @param id
 * @example getNameById([{id: 1, name: 'a'},{id: 2, name: 'b'},{id: 3, name: 'c'}], 1) // a
 */
function getNameById(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i]["id"] === id)
            return list[i].name;
    }
    return "";
}
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
function repeat(ch, repeatTimes) {
    var res = "";
    for (var i = 0; i < repeatTimes; i++) {
        res += ch;
    }
    return res;
}
/**
 * 去除字符串中的空格
 * @param {string} input 输入字符串,如'我是 测试 的 字符串  '
 * @returns {string} 去除空格后的字符串
 *
 * @example
 *  deleteWhitespace('我是 测试 的 字符串  '); // '我是测试的字符串'
 *  deleteWhitespace(''); //''
 */
function delWhitespace(input) {
    return input.replace(/\s+/g, "");
}
/**
 * 判断字符串是否为空
 * @param {String} input 输入字符串，如'我是测试的字符串'
 * @returns {boolean} 是/否
 *
 * @example
 *  isEmpty('我是测试的字符串'); // false
 *  isEmpty(''); // true
 */
function isEmpty(input) {
    return input === null || input === "" || /^\s*$/.test(input);
}
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
function countMatches(input, sub) {
    if (isEmpty(input) || isEmpty(sub)) {
        return 0;
    }
    var count = 0;
    var index = 0;
    while (input.indexOf(sub, index) !== -1) {
        index = input.indexOf(sub, index) + sub.length;
        count++;
    }
    return count;
}
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
exports.default = {
    getFileSuffix: getFileSuffix,
    getNameById: getNameById,
    repeat: repeat,
    delWhitespace: delWhitespace,
    isEmpty: isEmpty,
    countMatches: countMatches,
    randomId: randomId
};
