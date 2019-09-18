"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.prototype.set = function (key, val) {
        if (util_1.isUndefined(val)) {
            wx.removeStorageSync(key);
        }
        else {
            wx.setStorageSync(key, val);
        }
        return this;
    };
    Store.prototype.get = function (key) {
        return wx.getStorageSync(key);
    };
    Store.prototype.clear = function () {
        wx.clearStorageSync();
        return this;
    };
    Store.prototype.remove = function (key) {
        var v = wx.getStorageSync(key);
        wx.removeStorageSync(key);
        return v;
    };
    return Store;
}());
exports.default = Store;
