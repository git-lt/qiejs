"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __importDefault(require("./store"));
var store = new store_1.default();
var LStore = /** @class */ (function () {
    function LStore(prefix) {
        var _this = this;
        this.init = function (keys) {
            var props = Object.keys(keys).reduce(function (pre, key) {
                var keyName = "" + _this.prefix + key;
                pre[key] = {
                    enumerable: true,
                    get: function () {
                        return store.get(keyName);
                    },
                    set: function (value) {
                        return store.set(keyName, value);
                    }
                };
                return pre;
            }, {});
            _this.lstore = Object.defineProperties({}, props);
            return _this.lstore;
        };
        this.prefix = prefix;
    }
    return LStore;
}());
exports.default = LStore;
