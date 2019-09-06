export declare type ILocalStorage = typeof window.localStorage;
export declare const isUndefined: (x: any) => boolean;
export declare function serialize(v: any): string;
export declare function deserialize(v: any, defaultVal?: any): any;
export declare function dealIncognito(): ILocalStorage;
