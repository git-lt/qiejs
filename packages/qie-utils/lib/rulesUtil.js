"use strict";
// https://juejin.im/post/5d245d4151882555300feb77#heading-27
// https://any86.github.io/any-rule/
Object.defineProperty(exports, "__esModule", { value: true });
var regMap = {
    // 手机号
    phone: /^1[2-9]\d{9}$/,
    // 价格 最多保留两们小数
    price: /^[0-9]{1}\d*(.\d{1,2})?$|^0.\d{1,2}$/,
    // 身份证号
    idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    // 是否为中文字符
    chinese: /^[\u4e00-\u9fa5]{0,}$/,
    // 包含0的正整数
    int: /^0|([1-9]\d*)\b/,
    // 大于0的正整数
    gtZeroInt: /^[1-9]\d*$/,
    // 邮箱
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 座机号
    tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
    // 字母
    english: /^[a-zA-Z]+$/,
    // 数字或字母
    numberOrLetter: /^[A-Za-z0-9]+$/,
    // url地址
    url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
    // 是否有空格, 中间或两头有空格都算
    hasSpace: /\s/,
};
var rules = {
    phone: { pattern: regMap.phone, message: '请输入正确的手机号码' },
    price: { pattern: regMap.price, message: '请输入最多两位小数的金额' },
    idCard: { pattern: regMap.idCard, message: '身份证格式不正确' },
    chinese: { pattern: regMap.chinese, message: '请输入中文字符' },
    url: {
        pattern: regMap.url,
        message: '请输入以 http: 或 https: 开头的链接地址',
    },
    numberOrLetter: {
        pattern: regMap.numberOrLetter,
        message: '请输入数字或字母',
    },
    // 大于0的整数
    gtZeroInt: { pattern: regMap.gtZeroInt, message: '请输入大于0的整数' },
};
exports.default = { regMap: regMap, rules: rules };
