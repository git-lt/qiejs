declare global {
  interface Window {
    ActiveXObject: any;
    XMLHttpRequest: any;
  }
}

export {};
