"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://juejin.im/post/5d245d4151882555300feb77#heading-27
exports.regMap = {
    // 手机号
    phone: /^1[3|4|5|7|8]\d{9}$/,
    // 价格
    price: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.0[1-9]$)|(^\d\.[1-9]{1,2}$)/,
    // 身份证号
    idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    chinese: /^[\u4e00-\u9fa5]{0,}$/,
    // 包含0的正整数
    int: /^0|([1-9]\d*)\b/,
    // 大于0的正整数
    gtZeroInt: /^[1-9]\d*$/,
    // 邮箱
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 座机号
    tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
    // 英文
    english: /^[a-zA-Z]+$/,
    // 数字或字母
    numberOrLetter: /^[A-Za-z0-9]+$/,
    // url地址
    url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
};
const rules = {
    phone: { pattern: exports.regMap.phone, message: "请输入正确的手机号码" },
    price: { pattern: exports.regMap.price, message: "请输入最多两位小数的金额" },
    idCard: { pattern: exports.regMap.idCard, message: "身份证格式不正确" },
    chinese: { pattern: exports.regMap.chinese, message: "请输入中文字符" },
    url: {
        pattern: exports.regMap.url,
        message: "请输入以 http: 或 https: 开头的链接地址"
    },
    numberOrLetter: {
        pattern: exports.regMap.numberOrLetter,
        message: "请输入数字或字母"
    },
    // 大于0的整数
    gtZeroInt: { pattern: exports.regMap.gtZeroInt, message: "请输入大于0的整数" }
};
exports.default = rules;
