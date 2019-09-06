declare global {
  interface Window {
    WebViewJavascriptBridge: any;
    WVJBCallbacks: any;
  }
}

export {};
