import wx from 'wechat-jssdk-ts';

export type ShareType = 'timeline' | 'appMessage';
export type PayResultType = 'ok' | 'cancel' | 'fail';

/**
 * JS-SDK初始化
 * @param config 配置
 * @example wx.readyAsync().then()
 */
const readyAsync = (config: wx.ConfigOptions) => {
  return new Promise((resolve, reject) => {
    wx.config(config);
    wx.ready(resolve);
    wx.error(reject);
  });
};

/**
 * 微信分享
 * @param types 类型 ['timeline', 'appMessage']
 * @param option
 */
const shareAsync = (types: ShareType[], option: wx.shareDataOptions) => {
  const wxShareMessage = wx.onMenuShareAppMessage || wx.updateAppMessageShareData;
  const wxShareTimeline = wx.onMenuShareTimeline || wx.updateTimelineShareData;

  const { title, desc, link, imgUrl } = option;

  return new Promise((resolve, reject) => {
    const options = {
      title,
      desc,
      link,
      imgUrl,
      success: resolve,
      cancel: reject,
    };
    types.indexOf('appMessage') > -1 && wxShareMessage(options);
    types.indexOf('timeline') > -1 && wxShareTimeline(options);
  });
};

/**
 * Promise版本 支付
 * @param option
 */
const payAsync = (option: wx.chooseWxPayOptions): Promise<PayResultType> => {
  if (typeof window.WeixinJSBridge === 'undefined') return Promise.reject('fail');

  return new Promise((resove, reject) => {
    window.WeixinJSBridge.invoke('getBrandWCPayRequest', option, (res: any) => {
      // get_brand_wcpay_request:ok
      const msg = res.err_msg ? res.err_msg.split(':')[1] : 'fail';
      msg === 'ok' ? resove(msg) : reject(msg);
    });
  });
};

/**
 * 隐藏分享按钮(不需要 initConfig)
 */
const hideShareMenus = () => {
  if (typeof window.WeixinJSBridge === 'undefined') return;
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.WeixinJSBridge.call('hideOptionMenu');
  });
};

/**
 * 隐藏底部导航栏
 */
const hideToolbar = () => {
  if (typeof window.WeixinJSBridge === 'undefined') return;
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.WeixinJSBridge.call('hideToolbar');
  });
};

export default { readyAsync, shareAsync, payAsync, hideShareMenus, hideToolbar, ...wx };
