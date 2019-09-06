"use strict";
// https://github.com/orbitjs/orbit/blob/master/packages/%40orbit/utils/src/objects.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString;
const getObjectType = (x) => _toString.call(x).slice(8, -1);
const isOfType = (type) => (x) => typeof x === type; // eslint-disable-line valid-typeof
const isObjectOfType = (type) => (x) => getObjectType(x) === type;
exports.isObject = (obj) => obj !== null && typeof obj === "object";
exports.isFunction = isOfType("function");
exports.isString = isOfType("string");
exports.isBoolean = isOfType("boolean");
exports.isPlainObject = isObjectOfType("Object");
exports.isUndefined = isOfType("undefined");
exports.isArray = isObjectOfType("Array");
exports.isNull = (x) => x === null;
exports.isNullOrUndefined = (x) => exports.isUndefined(x) || exports.isNull(x);
function deepClone(obj) {
    if (obj === undefined || obj === null || typeof obj !== "object") {
        return obj;
    }
    let dup;
    let type = Object.prototype.toString.call(obj);
    if (type === "[object Date]") {
        dup = new Date();
        dup.setTime(obj.getTime());
    }
    else if (type === "[object RegExp]") {
        dup = obj.constructor(obj);
    }
    else if (type === "[object Array]") {
        dup = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            if (obj.hasOwnProperty(i)) {
                dup.push(deepClone(obj[i]));
            }
        }
    }
    else {
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
exports.deepClone = deepClone;
function deepMerge(object, ...sources) {
    sources.forEach(source => {
        Object.keys(source).forEach(field => {
            if (source.hasOwnProperty(field)) {
                let a = object[field];
                let b = source[field];
                if (exports.isObject(a) &&
                    exports.isObject(b) &&
                    !Array.isArray(a) &&
                    !Array.isArray(b)) {
                    deepMerge(a, b);
                }
                else if (b !== undefined) {
                    object[field] = deepClone(b);
                }
            }
        });
    });
    return object;
}
exports.deepMerge = deepMerge;
function deepGet(obj, pathName) {
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
exports.deepGet = deepGet;
function deepSet(obj, pathName, value) {
    let path = pathName.split(".");
    path.shift();
    let ptr = obj;
    let prop = path.pop();
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
    }
    else {
        ptr[prop] = value;
        return true;
    }
}
exports.deepSet = deepSet;
