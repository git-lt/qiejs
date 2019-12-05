/**
 * 深拷贝
 * @param obj 任意对象
 */
declare function deepClone(obj: any): any;
/**
 * 深合并
 * @param object
 * @param sources
 */
declare function deepMerge(object: any, ...sources: any[]): any;
declare const _default: {
    isAndroid: boolean;
    isIphone: boolean;
    isIpad: boolean;
    isWx: boolean;
    isAli: boolean;
    isPhone: boolean;
    isObject: (obj: any) => boolean;
    isFunction: (x: any) => boolean;
    isString: (x: any) => boolean;
    isBoolean: (x: any) => boolean;
    isPlainObject: (x: string) => boolean;
    isUndefined: (x: any) => boolean;
    isArray: (x: string) => boolean;
    isNull: (x: any) => boolean;
    isNullOrUndefined: (x: any) => boolean;
    isEmpty: (obj: any) => boolean;
    deepClone: typeof deepClone;
    deepMerge: typeof deepMerge;
};
export default _default;
