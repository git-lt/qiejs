"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 日期格式化
 * @param dateValue 时间戳 | 日期字符串
 * @param formatString yyyyMMdd mm:hh:ss
 * @example formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss') // "2019/11/06 15:31:50"
 */
function formatDate(date, format) {
    if (!date)
        return '';
    var d = insureDate(date);
    var formatStr = format || 'yyyy-MM-dd HH:mm:ss';
    var obj = {
        y: d.getFullYear(),
        M: d.getMonth() + 1,
        d: d.getDate(),
        q: Math.floor((d.getMonth() + 3) / 3),
        w: d.getDay(),
        H: d.getHours(),
        h: d.getHours() % 12 === 0 ? 12 : d.getHours() % 12,
        m: d.getMinutes(),
        s: d.getSeconds(),
        S: d.getMilliseconds(),
    };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    var _loop_1 = function (i) {
        formatStr = formatStr.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = obj[i] + '';
            if (i === 'w') {
                return (m.length > 2 ? '星期' : '周') + week[Number(val)];
            }
            for (var j = 0, len = val.length; j < m.length - len; j++) {
                val = '0' + val;
            }
            return m.length === 1 ? val : val.substring(val.length - m.length);
        });
    };
    for (var i in obj) {
        _loop_1(i);
    }
    return formatStr;
}
/**
 * 获取标准日期
 * @param date 时间戳 | 日期字符串 | 日期对象
 * @example formatISODate(new Date()) // 2019-11-06
 */
function formatISODate(date) {
    if (!date)
        return '';
    var d = insureDate(date);
    return d.toISOString().slice(0, 10);
}
/**
 * 获取标准时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISOTime(new Date()) // 07:27:33
 */
function formatISOTime(date) {
    if (!date)
        return '';
    var d = insureDate(date);
    return d.toTimeString().slice(0, 8);
}
/**
 * 获取标准日期和时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISODateTime(new Date()) // 2019-11-06 07:27:33
 */
function formatISODateTime(date) {
    if (!date)
        return '';
    var d = insureDate(date);
    return d.toISOString().slice(0, 10) + " " + d.toTimeString().slice(0, 8);
}
/**
 * 确保得到一个时间对象
 * @param date
 */
function insureDate(date) {
    if (date instanceof Date)
        return date;
    if (typeof date === 'number')
        return new Date(date);
    if (typeof date === 'string')
        return new Date(date.replace(/\-/g, '/'));
    return new Date();
}
exports.default = {
    formatDate: formatDate,
    formatISODate: formatISODate,
    formatISOTime: formatISOTime,
    formatISODateTime: formatISODateTime,
    insureDate: insureDate,
};
