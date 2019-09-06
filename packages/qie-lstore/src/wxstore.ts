import { isUndefined } from "./util";

class Store {
  storage: any;
  set(key: string, val: any) {
    if (isUndefined(val)) {
      wx.removeStorageSync(key);
    } else {
      wx.setStorageSync(key, val);
    }
    return this;
  }
  get(key: string) {
    return wx.getStorageSync(key);
  }
  clear() {
    wx.clearStorageSync();
    return this;
  }
  remove(key: string) {
    const v = wx.getStorageSync(key);
    wx.removeStorageSync(key);
    return v;
  }
}

export default Store;
