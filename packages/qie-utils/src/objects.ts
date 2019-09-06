// https://github.com/orbitjs/orbit/blob/master/packages/%40orbit/utils/src/objects.ts

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;

const getObjectType = (x: any) => _toString.call(x).slice(8, -1);
const isOfType = (type: string) => (x: any) => typeof x === type; // eslint-disable-line valid-typeof
const isObjectOfType = (type: string) => (x: string) =>
  getObjectType(x) === type;

export const isObject = (obj: any) => obj !== null && typeof obj === "object";
export const isFunction = isOfType("function");
export const isString = isOfType("string");
export const isBoolean = isOfType("boolean");
export const isPlainObject = isObjectOfType("Object");
export const isUndefined = isOfType("undefined");
export const isArray = isObjectOfType("Array");
export const isNull = (x: any) => x === null;
export const isNullOrUndefined = (x: any) => isUndefined(x) || isNull(x);

export function deepClone(obj: any): any {
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

export function deepMerge(object: any, ...sources: any[]): any {
  sources.forEach(source => {
    Object.keys(source).forEach(field => {
      if (source.hasOwnProperty(field)) {
        let a = object[field];
        let b = source[field];
        if (
          isObject(a) &&
          isObject(b) &&
          !Array.isArray(a) &&
          !Array.isArray(b)
        ) {
          deepMerge(a, b);
        } else if (b !== undefined) {
          object[field] = deepClone(b);
        }
      }
    });
  });
  return object;
}

export function deepGet(obj: any, pathName: string): any {
  let path = pathName.split(".");
  let index = -1;
  let result = obj;

  path.shift();
  while (++index < path.length) {
    result = result[path[index]];
    if (!result) {
      return result;
    }
  }

  return result;
}

export function deepSet(obj: any, pathName: string, value: any): boolean {
  let path = pathName.split(".");
  path.shift();
  let ptr = obj;
  let prop = path.pop() as string;
  let segment;
  for (let i = 0, l = path.length; i < l; i++) {
    segment = path[i];
    if (ptr[segment] === undefined) {
      ptr[segment] = typeof segment === "number" ? [] : {};
    }
    ptr = ptr[segment];
  }
  if (ptr[prop] === value) {
    return false;
  } else {
    ptr[prop] = value;
    return true;
  }
}
