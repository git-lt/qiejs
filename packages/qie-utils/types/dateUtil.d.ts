/**
 * 日期格式化
 * @param dateValue 时间戳 | 日期字符串
 * @param formatString yyyyMMdd mm:hh:ss
 * @example formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss') // "2019/11/06 15:31:50"
 */
declare function formatDate(date: Date | number | string, format?: string): string;
/**
 * 获取标准日期
 * @param date 时间戳 | 日期字符串 | 日期对象
 * @example formatISODate(new Date()) // 2019-11-06
 */
declare function formatISODate(date: number | string | Date): string;
/**
 * 获取标准时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISOTime(new Date()) // 07:27:33
 */
declare function formatISOTime(date: number | string | Date): string;
/**
 * 获取标准日期和时间
 * @param date  时间戳 | 日期字符串 | 日期对象
 * @example formatISODateTime(new Date()) // 2019-11-06 07:27:33
 */
declare function formatISODateTime(date: number | string | Date): string;
/**
 * 确保等到一个时间对象
 * @param date
 */
declare function insureDate(date: number | string | Date): Date;
declare const _default: {
    formatDate: typeof formatDate;
    formatISODate: typeof formatISODate;
    formatISOTime: typeof formatISOTime;
    formatISODateTime: typeof formatISODateTime;
    insureDate: typeof insureDate;
};
export default _default;
