import wx from 'wechat-jssdk-ts';
export declare type ShareType = 'timeline' | 'appMessage';
export declare type PayResultType = 'ok' | 'cancel' | 'fail';
declare const _default: {
    config(config: wx.ConfigOptions): void;
    ready(success: () => void): void;
    error(error: (res: object) => void): void;
    updateAppMessageShareData(options: wx.shareDataOptions): void;
    updateTimelineShareData(options: wx.shareDataOptions): void;
    onMenuShareTimeline(options: wx.shareDataOptions): void;
    onMenuShareAppMessage(options: wx.shareAppDataOptions): void;
    onMenuShareQQ(options: wx.shareDataOptions): void;
    onMenuShareWeibo(options: wx.shareDataOptions): void;
    onMenuShareQZone(options: wx.shareDataOptions): void;
    checkJsApi(options: wx.checkJsAPIOptions): void;
    chooseImage(options: wx.chooseImageOptions): void;
    previewImage(options: wx.previewImageOptions): void;
    uploadImage(options: wx.uploadImageOptions): void;
    downloadImage(options: wx.downloadImageOptions): void;
    getLocalImgData(options: wx.getLocalImgDataOptions): void;
    startRecord(): void;
    stopRecord(options: wx.callback): void;
    onVoiceRecordEnd(options: wx.callback): void;
    playVoice(options: wx.playVoiceOptions): void;
    pauseVoice(options: wx.pauseVoiceOptions): void;
    stopVoice(options: wx.stopVoiceOptions): void;
    onVoicePlayEnd(options: wx.callback): void;
    uploadVoice(options: wx.uploadVoiceOptions): void;
    downloadVoice(options: wx.downloadVoiceOptions): void;
    translateVoice(options: wx.translateVoiceOptions): void;
    getNetworkType(options: wx.callback): void;
    openLocation(options: wx.openLocationOptions): void;
    getLocation(options: wx.getLocationOptions): void;
    startSearchBeacons(options: wx.startSearchBeaconsOptions): void;
    stopSearchBeacons(options: wx.callback): void;
    onSearchBeacons(options: wx.callback): void;
    closeWindow(): void;
    hideMenuItems(options: wx.hideMenuItemsOptions): void;
    showMenuItems(options: wx.showMenuItemsOptions): void;
    hideAllNonBaseMenuItem(options: wx.callback): void;
    showAllNonBaseMenuItem(options: wx.callback): void;
    scanQRCode(options: wx.scanQRCodeOptions): void;
    openProductSpecificView(options: wx.openProductSpecificViewOptions): void;
    chooseCard(options: wx.chooseCardOptions): void;
    addCard(options: wx.addCardOptions): void;
    openCard(options: wx.openCardOptions): void;
    chooseWXPay(options: wx.chooseWxPayOptions): void;
    openAddress(options: wx.callback): void;
    readyAsync: (config: wx.ConfigOptions) => Promise<unknown>;
    shareAsync: (types: ShareType[], option: wx.shareDataOptions) => Promise<unknown>;
    payAsync: (option: wx.chooseWxPayOptions) => Promise<PayResultType>;
    hideShareMenus: () => void;
    hideToolbar: () => void;
};
export default _default;
