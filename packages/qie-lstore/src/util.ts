const isOfType = (type: string) => (x: any) => typeof x === type;

export type ILocalStorage = typeof window.localStorage;

export const isUndefined = isOfType("undefined");

// 序列化
export function serialize(v: any) {
  return v === undefined || typeof v === "function"
    ? v + ""
    : JSON.stringify(v);
}

export function deserialize(v: any, defaultVal?: any) {
  if (!v) {
    return defaultVal;
  }

  let val = "";
  try {
    val = JSON.parse(v);
  } catch (e) {
    val = v;
  }

  return val !== undefined ? val : defaultVal;
}

// https://github.com/jaywcjlove/store.js/pull/8
// Error: QuotaExceededError
export function dealIncognito(): ILocalStorage {
  let storage = window.localStorage;

  const _KEY = "_Is_Incognit";
  const _VALUE = "yes";

  try {
    storage.setItem(_KEY, _VALUE);
  } catch (e) {
    // 无痕模式下，防止报错
    if (e.name === "QuotaExceededError") {
      const noop = function() {};
      storage.__proto__ = {
        setItem: noop,
        getItem: noop,
        removeItem: noop,
        clear: noop,
        key: noop
      };
    }
  } finally {
    if (storage.getItem(_KEY) === _VALUE) storage.removeItem(_KEY);
  }
  return storage;
}
