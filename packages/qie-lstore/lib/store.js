"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class Store {
    constructor() {
        this.storage = util_1.dealIncognito();
    }
    set(key, val) {
        if (util_1.isUndefined(val)) {
            this.remove(key);
        }
        else {
            this.storage.setItem(key, util_1.serialize(val));
        }
        return this;
    }
    get(key) {
        const v = this.storage.getItem(key);
        return util_1.deserialize(v);
    }
    clear() {
        this.storage.clear();
        return this;
    }
    remove(key) {
        const v = this.get(key);
        this.storage.removeItem(key);
        return v;
    }
}
exports.default = Store;
