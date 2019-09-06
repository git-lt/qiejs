import {
  serialize,
  deserialize,
  dealIncognito,
  isUndefined,
  ILocalStorage
} from "./util";

class Store {
  storage: ILocalStorage;
  constructor() {
    this.storage = dealIncognito();
  }
  set(key: string, val: any) {
    if (isUndefined(val)) {
      this.remove(key);
    } else {
      this.storage.setItem(key, serialize(val));
    }
    return this;
  }
  get(key: string) {
    const v = this.storage.getItem(key);

    return deserialize(v);
  }
  clear() {
    this.storage.clear();
    return this;
  }
  remove(key: string) {
    const v = this.get(key);
    this.storage.removeItem(key);
    return v;
  }
}

export default Store;
