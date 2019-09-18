/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} cc
 * @param {number} num1
 * @param {number} num2
 * @param {string} _mask
 * @example utilscore.mask('12398765432',3,7) // => "123****5432"
 */
export declare const numberMask: (cc: string, num1?: number, num2?: number, _mask?: string) => string;
/**
 * 生成一个随机的十六进制颜色代码
 * @example utilscore.randomHexColorCode() // => "#c4aabc"
 */
export declare const randomHexColorCode: () => string;
/**
 * 全局唯一标识符 UUID
 * @param {number} len 长度
 * @param {number} radix 基数 62
 * @example utilscore.uuid(10,62) // => "e424F79HP8"
 */
export declare const uuid: (len: number, radix?: number) => string;
export declare function getStrLen(str: string): number;
export declare function getFileSuffix(fileName: string): string;
export declare function getNameById(list: any[], id: number | string): string;
