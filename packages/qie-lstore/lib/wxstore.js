"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class Store {
    set(key, val) {
        if (util_1.isUndefined(val)) {
            wx.removeStorageSync(key);
        }
        else {
            wx.setStorageSync(key, val);
        }
        return this;
    }
    get(key) {
        return wx.getStorageSync(key);
    }
    clear() {
        wx.clearStorageSync();
        return this;
    }
    remove(key) {
        const v = wx.getStorageSync(key);
        wx.removeStorageSync(key);
        return v;
    }
}
exports.default = Store;
