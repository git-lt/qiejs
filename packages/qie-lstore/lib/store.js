"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Store = /** @class */ (function () {
    function Store() {
        this.storage = util_1.dealIncognito();
    }
    Store.prototype.set = function (key, val) {
        if (util_1.isUndefined(val)) {
            this.remove(key);
        }
        else {
            this.storage.setItem(key, util_1.serialize(val));
        }
        return this;
    };
    Store.prototype.get = function (key) {
        var v = this.storage.getItem(key);
        return util_1.deserialize(v);
    };
    Store.prototype.clear = function () {
        this.storage.clear();
        return this;
    };
    Store.prototype.remove = function (key) {
        var v = this.get(key);
        this.storage.removeItem(key);
        return v;
    };
    return Store;
}());
exports.default = Store;
