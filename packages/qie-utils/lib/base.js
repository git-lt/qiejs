"use strict";
// https://github.com/orbitjs/orbit/blob/master/packages/%40orbit/utils/src/objects.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;
var getObjectType = function (x) { return _toString.call(x).slice(8, -1); };
var isOfType = function (type) { return function (x) { return typeof x === type; }; }; // eslint-disable-line valid-typeof
var isObjectOfType = function (type) { return function (x) { return getObjectType(x) === type; }; };
var ua = window.navigator.userAgent;
var isAndroid = /android/gi.test(ua);
var isIphone = /iphone|ipod/gi.test(ua);
var isIpad = /ipad/gi.test(ua);
var isWx = /MicroMessenger/gi.test(ua);
var isAli = /AlipayClient/gi.test(ua);
var isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(ua);
var isObject = function (obj) { return obj !== null && typeof obj === "object"; };
var isFunction = isOfType("function");
var isString = isOfType("string");
var isBoolean = isOfType("boolean");
var isPlainObject = isObjectOfType("Object");
var isUndefined = isOfType("undefined");
var isArray = isObjectOfType("Array");
var isNull = function (x) { return x === null; };
var isNullOrUndefined = function (x) { return isUndefined(x) || isNull(x); };
/**
 * 判断是否为空，包括空对象，空数组，空字符串，null，undefined
 * @param obj 任意对象
 */
var isEmpty = function (obj) {
    if (obj === void 0 || obj === null)
        return true;
    if (isObject(obj))
        return !Object.keys(obj).length;
    if (isArray(obj))
        return !obj.length;
    if (isString(obj))
        return !obj;
    return obj.toString().length == 0;
};
/**
 * 深拷贝
 * @param obj 任意对象
 */
function deepClone(obj) {
    if (obj === undefined || obj === null || typeof obj !== "object") {
        return obj;
    }
    var dup;
    var type = Object.prototype.toString.call(obj);
    if (type === "[object Date]") {
        dup = new Date();
        dup.setTime(obj.getTime());
    }
    else if (type === "[object RegExp]") {
        dup = obj.constructor(obj);
    }
    else if (type === "[object Array]") {
        dup = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            if (obj.hasOwnProperty(i)) {
                dup.push(deepClone(obj[i]));
            }
        }
    }
    else {
        var val = void 0;
        dup = {};
        for (var key in obj) {
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
function deepMerge(object) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        Object.keys(source).forEach(function (field) {
            if (source.hasOwnProperty(field)) {
                var a = object[field];
                var b = source[field];
                if (isObject(a) && isObject(b) && !Array.isArray(a) && !Array.isArray(b)) {
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
exports.default = {
    isAndroid: isAndroid,
    isIphone: isIphone,
    isIpad: isIpad,
    isWx: isWx,
    isAli: isAli,
    isPhone: isPhone,
    isObject: isObject,
    isFunction: isFunction,
    isString: isString,
    isBoolean: isBoolean,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isArray: isArray,
    isNull: isNull,
    isNullOrUndefined: isNullOrUndefined,
    isEmpty: isEmpty,
    deepClone: deepClone,
    deepMerge: deepMerge
};
