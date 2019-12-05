/**
 * 日期格式化
 * @param dateValue 时间戳 | 日期字符串
 * @param formatString yyyyMMdd mm:hh:ss
 * @example formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss') // "2019/11/06 15:31:50"
 */
function formatDate(dateValue: string | number, formatString: string) {
  let date = new Date();
  if (typeof dateValue === "string" || typeof dateValue === "number") {
    date = new Date(+dateValue);
  } else {
    date = dateValue;
  }
  if (/(y+)/.test(formatString)) {
    formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
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
      formatString = formatString.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return formatString;
}

/**
 * 获取标准日期
 * @param date 时间戳 | 日期字符串 | 日期对象
 * @example formatISODate(new Date()) // 2019-11-06
 */
const formatISODate = (date: number | string | Date): string => {
  const d = insureDate(date);
  return d.toISOString().slice(0, 10);
};

/**
 * 获取标准时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISOTime(new Date()) // 07:27:33
 */
const formatISOTime = (date: number | string | Date): string => {
  const d = insureDate(date);
  return d.toTimeString().slice(0, 8);
};

/**
 * 获取标准日期和时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISODateTime(new Date()) // 2019-11-06 07:27:33
 */
const formatISODateTime = (date: number | string | Date): string => {
  const d = insureDate(date);
  return `${d.toISOString().slice(0, 10)} ${d.toTimeString().slice(0, 8)}`;
};

/**
 * 确保等到一个时间对象
 * @param date
 */
function insureDate(date: number | string | Date): Date {
  if (date instanceof Date) return date;
  if (typeof date === "number") return new Date(date);
  if (typeof date === "string") return new Date(date.replace(/\-/g, "/"));

  return new Date();
}

export default {
  formatDate,
  formatISODate,
  formatISOTime,
  formatISODateTime,
  insureDate
};
