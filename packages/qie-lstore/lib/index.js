"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const store = new store_1.default();
class LStore {
    constructor(prefix) {
        this.init = (keys) => {
            const props = Object.keys(keys).reduce((pre, key) => {
                const keyName = `${this.prefix}${key}`;
                pre[key] = {
                    enumerable: true,
                    get() {
                        return store.get(keyName);
                    },
                    set(value) {
                        return store.set(keyName, value);
                    }
                };
                return pre;
            }, {});
            this.lstore = Object.defineProperties({}, props);
            return this.lstore;
        };
        this.prefix = prefix;
    }
}
exports.default = LStore;
