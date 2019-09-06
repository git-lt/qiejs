declare namespace wx {
  export function setStorageSync(key: string, data: any): void;
  export function getStorageSync(key: string): any;
  export function clearStorageSync(): void;
  export function removeStorageSync(key: string): void;
}
