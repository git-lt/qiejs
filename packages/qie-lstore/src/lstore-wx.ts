import Store from "./wxstore";

const store = new Store();

class LStore<T> {
  lstore: T;
  prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  init = (keys: string[]): T => {
    const props = Object.keys(keys).reduce((pre: any, key) => {
      const keyName = `${this.prefix}${key}`;
      pre[key] = {
        enumerable: true,
        get() {
          return store.get(keyName);
        },
        set(value: any) {
          return store.set(keyName, value);
        }
      };
      return pre;
    }, {});

    this.lstore = Object.defineProperties({}, props);

    return this.lstore;
  };
}

export default LStore;
