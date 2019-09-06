const enum ActionType {
  GET_USER_INFO = "getUserInfo",
  ROUTER_TO = "routerTo",
  UPDATE_USER = "updateUser",
  WX_SHARE = "wxShare",
  WX_SHARE_IMG = "wxShareImg",
  SET_NAV_RIGHT = "setNavRight",
  APPLE_IAP = "appleIAP",
  GET_IMAGE = "getImage",
  GO_BACK = "goBack"
}

// Native 页面
const enum NativePage {
  LOGIN = "login",
  HOME = "home",
  SUBMIT_HOMEWORK = "submitHomework",
  FILES_BROWSER = "filesBrowser"
}

const enum FileTypes {
  IMAGE = "1",
  AUDIO = "2",
  VIDEO = "3"
}

// 页面跳转
export interface IRouterTo {
  pageName: string;
  data?: any;
}
export type IFileInfo = {
  fileUrl: string;
  fileType: FileTypes;
  fileTime?: number;
};
export interface IPreviewFiles {
  fileIndex: number;
  data: IFileInfo[];
}

export interface IWxShare {
  title: string;
  description: string;
  thumb: string;
  webpageUrl: string;
  scene: "WXSceneSession" | "WXSceneTimeline" | "WXSceneFavorite";
}

export interface IWxShareImg {
  picture: string;
  scene: "WXSceneSession" | "WXSceneTimeline";
}

export interface ISetNavRight {
  text: string;
  callbackAction?: string;
}

export interface IAppleIAP {
  orderNo: number | string; // 订单号
  productId: string; // 苹果配置的 productid
}

// 初始化
const onReady = (callback: (bridge: any) => void) => {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];

  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "qiebridge://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};

// 注册 Native 方法
const registerNativeMethod = (actionType: ActionType, params: any) => {
  return new Promise(resolve => {
    onReady(bridge => {
      console.warn(actionType, params);
      bridge.callHandler(actionType, params, resolve);
    });
  });
};

// 注册 JS 方法
const registerMethod = (
  methodName: string,
  methodFunc: (data: any, callback?: Function) => void
) => {
  onReady(bridge => {
    bridge.registerHandler(methodName, methodFunc);
  });
};

// 获取用户信息
const getUserInfo = () => registerNativeMethod(ActionType.GET_USER_INFO, null);

const routerTo = (params: IRouterTo) =>
  registerNativeMethod(ActionType.ROUTER_TO, params);

// 调用 Native 跳转至 H5
const routerToH5 = (url: string, title?: string) => {
  const params: IRouterTo = { pageName: "webview", data: { url, title } };
  registerNativeMethod(ActionType.ROUTER_TO, params);
};

// 登录
const login = () =>
  registerNativeMethod(ActionType.ROUTER_TO, { pageName: NativePage.LOGIN });

// 更新用户信息
const updateUser = () => registerNativeMethod(ActionType.UPDATE_USER, null);

// 更新用户信息
const goHome = () =>
  registerNativeMethod(ActionType.ROUTER_TO, { pageName: NativePage.HOME });

const privewFiles = (params: IPreviewFiles) => {
  const pms = { pageName: NativePage.FILES_BROWSER, data: params };
  registerNativeMethod(ActionType.ROUTER_TO, pms);
};

// 微信分享
const wxShare = (params: IWxShare) =>
  registerNativeMethod(ActionType.WX_SHARE, params);

const wxShareImg = (params: IWxShareImg) =>
  registerNativeMethod(ActionType.WX_SHARE_IMG, params);

const setNavRight = (params: ISetNavRight & IRouterTo) =>
  registerNativeMethod(ActionType.SET_NAV_RIGHT, params);

const appleIAP = (params: IAppleIAP) =>
  registerNativeMethod(ActionType.APPLE_IAP, params);

const goBack = () => registerNativeMethod(ActionType.GO_BACK, null);

const getImage = (params: any) =>
  registerNativeMethod(ActionType.GET_IMAGE, params);

// 注册方法
export {
  // 初始回调
  onReady,
  // 获取登录信息
  getUserInfo,
  // 跳转到某页面
  routerTo,
  // 跳转到H5页面
  routerToH5,
  // 到登录
  login,
  // 更新用户信息
  updateUser,
  // 回首页
  goHome,
  // 返回
  goBack,
  // 设置导航栏右侧内容
  setNavRight,
  // 微信分享
  wxShare,
  // 海报图片分享
  wxShareImg,
  // 预览文件
  privewFiles,
  // appleIAP
  appleIAP,
  // 注册JS回调
  registerMethod,
  // 安卓端获取图片
  getImage
};
