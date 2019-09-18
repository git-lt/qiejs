const ua = window.navigator.userAgent;

export const isAndroid = Boolean(ua.match(/android/gi));
export const isIphone = Boolean(ua.match(/iphone|ipod/gi));
export const isIpad = Boolean(ua.match(/ipad/gi));
export const isWx = Boolean(ua.match(/MicroMessenger/gi));
export const isAli = Boolean(ua.match(/AlipayClient/gi));
export const isPhone = Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(ua));
