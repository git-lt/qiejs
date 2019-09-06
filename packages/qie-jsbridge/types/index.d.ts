declare const enum FileTypes {
    IMAGE = "1",
    AUDIO = "2",
    VIDEO = "3"
}
export interface IRouterTo {
    pageName: string;
    data?: any;
}
export declare type IFileInfo = {
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
    orderNo: number | string;
    productId: string;
}
declare const onReady: (callback: (bridge: any) => void) => any;
declare const registerMethod: (methodName: string, methodFunc: (data: any, callback?: Function | undefined) => void) => void;
declare const getUserInfo: () => Promise<unknown>;
declare const routerTo: (params: IRouterTo) => Promise<unknown>;
declare const routerToH5: (url: string, title?: string | undefined) => void;
declare const login: () => Promise<unknown>;
declare const updateUser: () => Promise<unknown>;
declare const goHome: () => Promise<unknown>;
declare const privewFiles: (params: IPreviewFiles) => void;
declare const wxShare: (params: IWxShare) => Promise<unknown>;
declare const wxShareImg: (params: IWxShareImg) => Promise<unknown>;
declare const setNavRight: (params: ISetNavRight & IRouterTo) => Promise<unknown>;
declare const appleIAP: (params: IAppleIAP) => Promise<unknown>;
declare const goBack: () => Promise<unknown>;
declare const getImage: (params: any) => Promise<unknown>;
export { onReady, getUserInfo, routerTo, routerToH5, login, updateUser, goHome, goBack, setNavRight, wxShare, wxShareImg, privewFiles, appleIAP, registerMethod, getImage };
