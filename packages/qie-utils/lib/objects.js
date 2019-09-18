"use strict";
// https://github.com/orbitjs/orbit/blob/master/packages/%40orbit/utils/src/objects.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;
var getObjectType = function (x) { return _toString.call(x).slice(8, -1); };
var isOfType = function (type) { return function (x) { return typeof x === type; }; }; // eslint-disable-line valid-typeof
var isObjectOfType = function (type) { return function (x) {
    return getObjectType(x) === type;
}; };
exports.isObject = function (obj) { return obj !== null && typeof obj === "object"; };
exports.isFunction = isOfType("function");
exports.isString = isOfType("string");
exports.isBoolean = isOfType("boolean");
exports.isPlainObject = isObjectOfType("Object");
exports.isUndefined = isOfType("undefined");
exports.isArray = isObjectOfType("Array");
exports.isNull = function (x) { return x === null; };
exports.isNullOrUndefined = function (x) { return exports.isUndefined(x) || exports.isNull(x); };
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
exports.deepClone = deepClone;
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
    var path = pathName.split(".");
    var index = -1;
    var result = obj;
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
    var path = pathName.split(".");
    path.shift();
    var ptr = obj;
    var prop = path.pop();
    var segment;
    for (var i = 0, l = path.length; i < l; i++) {
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
