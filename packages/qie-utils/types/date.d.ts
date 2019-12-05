/**
 * 日期格式化
 * @param dateValue 时间戳 | 日期字符串
 * @param formatString yyyyMMdd mm:hh:ss
 * @example formatDate(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss') // "2019/11/06 15:31:50"
 */
declare function formatDate(dateValue: string | number, formatString: string): string;
/**
 * 确保等到一个时间对象
 * @param date
 */
declare function insureDate(date: number | string | Date): Date;
declare const _default: {
    formatDate: typeof formatDate;
    formatISODate: (date: string | number | Date) => string;
    formatISOTime: (date: string | number | Date) => string;
    formatISODateTime: (date: string | number | Date) => string;
    insureDate: typeof insureDate;
};
export default _default;
