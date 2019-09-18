"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 日期格式化
 */
function formatDate(dateValue, formatString) {
    var date = new Date();
    if (typeof dateValue === "string" || typeof dateValue === "number") {
        date = new Date(+dateValue);
    }
    else {
        date = dateValue;
    }
    if (/(y+)/.test(formatString)) {
        formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    function padLeftZero(str) {
        return ("00" + str).substr(str.length);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatString)) {
            var str = o[k] + "";
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return formatString;
}
exports.formatDate = formatDate;
