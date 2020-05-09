/**
 * 日期格式化
 * @param dateValue 时间戳 | 日期字符串
 * @param formatString yyyyMMdd mm:hh:ss
 * @example formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss') // "2019/11/06 15:31:50"
 */
function formatDate(date: Date | number | string, format?: string): string {
  if (!date) return '';
  const d = insureDate(date);

  let formatStr = format || 'yyyy-MM-dd HH:mm:ss';

  const obj: any = {
    y: d.getFullYear(), // 年份，注意必须用getFullYear
    M: d.getMonth() + 1, // 月份，注意是从0-11
    d: d.getDate(), // 日期
    q: Math.floor((d.getMonth() + 3) / 3), // 季度
    w: d.getDay(), // 星期，注意是0-6
    H: d.getHours(), // 24小时制
    h: d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, // 12小时制
    m: d.getMinutes(), // 分钟
    s: d.getSeconds(), // 秒
    S: d.getMilliseconds(), // 毫秒
  };
  const week = ['天', '一', '二', '三', '四', '五', '六'];
  for (const i in obj) {
    formatStr = formatStr.replace(new RegExp(i + '+', 'g'), (m) => {
      let val: string = obj[i] + '';
      if (i === 'w') {
        return (m.length > 2 ? '星期' : '周') + week[Number(val)];
      }
      for (let j = 0, len = val.length; j < m.length - len; j++) {
        val = '0' + val;
      }
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return formatStr;
}

/**
 * 获取标准日期
 * @param date 时间戳 | 日期字符串 | 日期对象
 * @example formatISODate(new Date()) // 2019-11-06
 */
function formatISODate(date: number | string | Date): string {
  if (!date) return '';
  const d = insureDate(date);
  return d.toISOString().slice(0, 10);
}

/**
 * 获取标准时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISOTime(new Date()) // 07:27:33
 */
function formatISOTime(date: number | string | Date): string {
  if (!date) return '';
  const d = insureDate(date);
  return d.toTimeString().slice(0, 8);
}

/**
 * 获取标准日期和时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISODateTime(new Date()) // 2019-11-06 07:27:33
 */
function formatISODateTime(date: number | string | Date): string {
  if (!date) return '';
  const d = insureDate(date);
  return `${d.toISOString().slice(0, 10)} ${d.toTimeString().slice(0, 8)}`;
}

/**
 * 确保得到一个时间对象
 * @param date
 */
function insureDate(date: number | string | Date): Date {
  if (date instanceof Date) return date;
  if (typeof date === 'number') return new Date(date);
  if (typeof date === 'string') return new Date(date.replace(/\-/g, '/'));

  return new Date();
}

export default {
  formatDate,
  formatISODate,
  formatISOTime,
  formatISODateTime,
  insureDate,
};
