// https://github.com/orbitjs/orbit/blob/master/packages/%40orbit/utils/src/objects.ts

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;
const getObjectType = (x: any) => _toString.call(x).slice(8, -1);
const isOfType = (type: string) => (x: any) => typeof x === type; // eslint-disable-line valid-typeof
const isObjectOfType = (type: string) => (x: any) => getObjectType(x) === type;
const ua = window.navigator.userAgent;

const isAndroid = /android/gi.test(ua);
const isIphone = /iphone|ipod/gi.test(ua);
const isIpad = /ipad/gi.test(ua);
const isWx = /MicroMessenger/gi.test(ua);
const isAli = /AlipayClient/gi.test(ua);
const isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(ua);
const isObject = (obj: any) => obj !== null && typeof obj === "object";
const isFunction = isOfType("function");
const isString = isOfType("string");
const isNumber = isObjectOfType("Number");
const isBoolean = isOfType("boolean");
const isPlainObject = isObjectOfType("Object");
const isUndefined = isOfType("undefined");
const isArray = isObjectOfType("Array");
const isDate = isObjectOfType("Date");
const isNull = (x: any) => x === null;
const isNullOrUndefined = (x: any) => isUndefined(x) || isNull(x);

/**
 * 判断是否为空，包括空对象，空数组，空字符串，null，undefined
 * @param obj 任意对象
 */
const isEmptyObj = (obj: any) => {
  if (obj === void 0 || obj === null) return true;
  if (isObject(obj)) return !Object.keys(obj).length;
  if (isArray(obj)) return !obj.length;
  if (isString(obj)) return !obj;
  return obj.toString().length == 0;
};

/**
 * 深拷贝
 * @param obj 任意对象
 */
function deepClone(obj: any): any {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    return obj;
  }

  let dup: any;
  let type = Object.prototype.toString.call(obj);

  if (type === "[object Date]") {
    dup = new Date();
    dup.setTime(obj.getTime());
  } else if (type === "[object RegExp]") {
    dup = obj.constructor(obj);
  } else if (type === "[object Array]") {
    dup = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      if (obj.hasOwnProperty(i)) {
        dup.push(deepClone(obj[i]));
      }
    }
  } else {
    let val;

    dup = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key];
        if (typeof val === "object") {
          val = deepClone(val);
        }
        dup[key] = val;
      }
    }
  }
  return dup;
}

/**
 * 深合并
 * @param object
 * @param sources
 */
function deepMerge(object: any, ...sources: any[]): any {
  sources.forEach(source => {
    Object.keys(source).forEach(field => {
      if (source.hasOwnProperty(field)) {
        let a = object[field];
        let b = source[field];
        if (isObject(a) && isObject(b) && !Array.isArray(a) && !Array.isArray(b)) {
          deepMerge(a, b);
        } else if (b !== undefined) {
          object[field] = deepClone(b);
        }
      }
    });
  });
  return object;
}

export default {
  isAndroid,
  isIphone,
  isIpad,
  isWx,
  isAli,
  isPhone,
  isObject,
  isFunction,
  isString,
  isBoolean,
  isPlainObject,
  isUndefined,
  isDate,
  isNumber,
  isArray,
  isNull,
  isNullOrUndefined,
  isEmptyObj,
  deepClone,
  deepMerge
};
