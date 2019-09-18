/**
 * 日期格式化
 */
export function formatDate(dateValue: string | number, formatString: string) {
  let date = new Date();
  if (typeof dateValue === "string" || typeof dateValue === "number") {
    date = new Date(+dateValue);
  } else {
    date = dateValue;
  }
  if (/(y+)/.test(formatString)) {
    formatString = formatString.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o: Record<string, number> = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  function padLeftZero(str: string) {
    return ("00" + str).substr(str.length);
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(formatString)) {
      let str = o[k] + "";
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return formatString;
}
